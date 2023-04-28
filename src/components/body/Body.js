import './Body.css';
import { useState } from 'react';

import Navigation from './Navigation.js';

function Body(props) {
  const {selectedChar, characterAbilities} = props;

  const [selectedAbility, setSelectedAbility] = useState('features');



  return (
    <div className='body-wrapper'>
      <Navigation selectedAbility={selectedAbility} updateSelectedAbilityHandler={setSelectedAbility}/>
      <div className='ability-wrapper features-wrapper active'>
        <div className='feature-item'>Feature one</div>
        <div className='feature-item'>Feature two</div>
      </div>
      <div className='ability-wrapper spells-wrapper'>
        <div className='spell-item'>Spell one</div>
        <div className='spell-item'>Spell two</div>
      </div>
    </div>
  );
}

export default Body