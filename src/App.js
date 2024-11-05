import './App.css';

import { useState, useEffect } from 'react';
import { supabase } from './client';

import Heading from './components/header/Heading.js';
import Body from './components/body/Body.js';

function App() {
  let defaultSelectedChar = {id: 1, name: "Elenor"};
  const lsSelectedChar = window.localStorage.getItem('_selectedChar');

  console.log('debug');

  if (lsSelectedChar) {
    defaultSelectedChar = JSON.parse(lsSelectedChar);
  }

  const [selectedChar, setSelectedChar] = useState(defaultSelectedChar);
  const [characters, setCharacters] = useState([]);
  const [characterAbilities, setCharacterAbilities] = useState({
    characterId: defaultSelectedChar.id,
    featureList: [],
    spellList: []
  });

  useEffect(() => {
    fetchCharacters();
    buildCharacterAbilities()
  }, []);

  async function fetchCharacters() {
    const { data } = await supabase.from('characters').select();
    setCharacters(data);
  }

  async function fetchCharFeatures(charId) {
    const { data } = await supabase.from('characterHasFeature').select('id').eq('characterId', charId);
    return data;
  }

  async function fetchCharSpells(charId) {
    const { data } = await supabase.from('characterHasSpell').select('id').eq('characterId', charId);
    return data;
  }

  async function buildCharacterAbilities() {

    const charId = selectedChar.id;
    const featureObjList = await fetchCharFeatures(charId);
    const spellObjList = await fetchCharSpells(charId);

    const characterAbilities = {
      characterId: charId,
      featureList: featureObjList.map(obj => obj.id),
      spellList: spellObjList.map(obj => obj.id)
    };

    setCharacterAbilities(characterAbilities);
  }

  window.localStorage.setItem('_selectedChar', JSON.stringify({id: selectedChar.id, name: selectedChar.name}));

  const updateSelectedChar = (id, name) => {
    setSelectedChar({id, name});
    window.localStorage.setItem('_selectedChar', JSON.stringify({id, name}));
  }

  return (
    <div className='outer-wrapper flex-column-centered'>
      <Heading selectedChar={{...selectedChar}} characters={[...characters]} updateSelectedCharHandler={updateSelectedChar}/>
      <Body characterAbilities={{...characterAbilities}} />
    </div>
  );
}

export default App;
