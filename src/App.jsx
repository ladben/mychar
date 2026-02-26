import './App.css';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from './client.js';

import Heading from './components/header/Heading.jsx';
import Body from './components/body/Body.jsx';
import spellSlots from './references/spellSlots.js';

function App() {
  const defaultSelectedChar = {
    id: 1,
  };

  const [selectedChar, setSelectedChar] = useState(defaultSelectedChar);
  const [characters, setCharacters] = useState([]);

  const calculateStats = useCallback((char) => {
    const profBonusTresholds = {
      1: 2,
      5: 3,
      9: 4,
      13: 5,
      17: 6,
    };

    const charClass = Object.entries(char)
      .filter(
        ([key, value]) =>
          key.endsWith('_lvl') && key !== 'overall_lvl' && !!value,
      )
      .map(([key]) => key.replace('_lvl', ''))[0];
    const overall_lvl = char[`${charClass}_lvl`] || null;
    const proficiency_bonus =
      Object.entries(profBonusTresholds)
        .filter(([lvl]) => overall_lvl > Number(lvl))
        .pop()?.[1] ?? 2;
    const spell_ability_mod = char[`${char.spellcasting_ability}_mod`] || null;
    const spell_save_dc = spell_ability_mod
      ? 8 + proficiency_bonus + spell_ability_mod
      : null;
    const max_spell_slots = spellSlots[charClass]?.[overall_lvl] || null;

    return {
      overall_lvl,
      spell_ability_mod,
      spell_save_dc,
      proficiency_bonus,
      max_spell_slots,
    };
  }, []);

  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    const lsSelectedChar = window.localStorage.getItem('_selectedChar');

    if (lsSelectedChar) {
      fetchCharacterById(JSON.parse(lsSelectedChar)).then((character) => {
        const extraStats = calculateStats(character);
        setSelectedChar({ ...character, ...extraStats });
      });
    } else {
      fetchCharacterById(1).then((character) => {
        const extraStats = calculateStats(character);
        setSelectedChar({ ...character, ...extraStats });
        window.localStorage.setItem(
          '_selectedChar',
          JSON.stringify(character.id),
        );
      });
    }
  }, []);

  async function fetchCharacterById(id) {
    const { data } = await supabase.from('characters').select().eq('id', id);
    return data[0];
  }

  async function fetchCharacters() {
    const { data } = await supabase.from('characters').select();
    setCharacters(data);
  }

  const updateSelectedChar = (character) => {
    const extraStats = calculateStats(character);
    setSelectedChar({ ...character, ...extraStats });
    window.localStorage.setItem('_selectedChar', JSON.stringify(character.id));
  };

  return (
    <div className='outer-wrapper flex-column-centered'>
      <Heading
        selectedChar={selectedChar}
        characters={characters}
        updateSelectedCharHandler={updateSelectedChar}
      />
      <Body selectedChar={selectedChar} />
    </div>
  );
}

export default App;
