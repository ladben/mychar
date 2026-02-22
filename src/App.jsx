import './App.css';

import { useState, useEffect } from 'react';
import { supabase } from './client.js';

import Heading from './components/header/Heading.jsx';
import Body from './components/body/Body.jsx';

function App() {
  const defaultSelectedChar = {
    id: 1,
  };

  const [selectedChar, setSelectedChar] = useState(defaultSelectedChar);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    const lsSelectedChar = window.localStorage.getItem('_selectedChar');

    if (lsSelectedChar) {
      fetchCharacterById(JSON.parse(lsSelectedChar)).then((character) => {
        setSelectedChar({ ...character });
      });
    } else {
      fetchCharacterById(1).then((character) => {
        setSelectedChar({ ...character });
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
    setSelectedChar({ ...character });
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
