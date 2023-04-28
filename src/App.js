import './App.css';
import {characters, characterAbilities} from './sources';
import { useState } from 'react';

import Heading from './components/header/Heading.js';
import Body from './components/body/Body.js';

function App() {
  let defaultSelectedChar = characters[0];
  const lsSelectedChar = window.localStorage.getItem('_selectedChar');

  if (lsSelectedChar) {
    defaultSelectedChar = JSON.parse(lsSelectedChar);
  }

  const [selectedChar, setSelectedChar] = useState(defaultSelectedChar);

  window.localStorage.setItem('_selectedChar', JSON.stringify({id: selectedChar.id, name: selectedChar.name}));

  const updateSelectedChar = (id, name) => {
    setSelectedChar({id, name});
    window.localStorage.setItem('_selectedChar', JSON.stringify({id, name}));
  }

  return (
    <div className='outer-wrapper flex-column-centered'>
      <Heading selectedChar={{...selectedChar}} characters={[...characters]} updateSelectedCharHandler={updateSelectedChar}/>
      <Body characterAbilities={[...characterAbilities]} selectedChar={{...selectedChar}}/>
    </div>
  );
}

export default App;
