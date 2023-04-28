import './App.css';
import { useState } from 'react';

import Heading from './components/header/Heading.js';

function App() {
  const characters = [{
    id: 1,
    name: 'Jörmungandr'
  }, {
    id: 2,
    name: 'Rex Erectio'
  }];

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
      <div className='body'>BODY</div>
      <div className='footer'>FOOTER</div>
    </div>
  );
}

export default App;
