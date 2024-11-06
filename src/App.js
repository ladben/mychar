import './App.css';

import { useState, useEffect } from 'react';
import { supabase } from './client';

import Heading from './components/header/Heading.js';
import Body from './components/body/Body.js';

function App() {
  let defaultSelectedChar = {id: 1, name: "Elenor"};
  const lsSelectedChar = window.localStorage.getItem('_selectedChar');

  if (lsSelectedChar) {
    defaultSelectedChar = JSON.parse(lsSelectedChar);
  }

  const [selectedChar, setSelectedChar] = useState(defaultSelectedChar);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchCharacters();
  }, []);

  async function fetchCharacters() {
    const { data } = await supabase.from('characters').select();
    setCharacters(data);
  }

  window.localStorage.setItem('_selectedChar', JSON.stringify({id: selectedChar.id, name: selectedChar.name}));

  const updateSelectedChar = (id, name) => {
    setSelectedChar({id, name});
    window.localStorage.setItem('_selectedChar', JSON.stringify({id, name}));
  }

  return (
    <div className='outer-wrapper flex-column-centered'>
      <Heading selectedChar={{...selectedChar}} characters={[...characters]} updateSelectedCharHandler={updateSelectedChar}/>
      <Body selectedChar={{...selectedChar}} />
    </div>
  );
}

export default App;
