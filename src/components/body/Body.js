import './Body.css';
import { useState } from 'react';

import Navigation from './Navigation.js';
import FeatureItem from './FeatureItem';

function Body(props) {
  const {selectedChar, characterAbilities} = props;

  const [selectedAbility, setSelectedAbility] = useState('features');

  const selectedCharId = selectedChar.id;
  let featureList = [];
  characterAbilities.forEach(characterAbility => {
    if (characterAbility.characterId === selectedCharId) {
      featureList = [...characterAbility.featureList];
    }
  });

  return (
    <div className='body-wrapper'>
      <Navigation selectedAbility={selectedAbility} updateSelectedAbilityHandler={setSelectedAbility}/>
      <div className='ability-wrapper features-wrapper active'>
        {featureList.map((feature, i) => <FeatureItem key={"feature-" + i} featureId={feature}/>)}
      </div>
      <div className='ability-wrapper spells-wrapper'>
        <div className='spell-item'>Spell one</div>
        <div className='spell-item'>Spell two</div>
      </div>
    </div>
  );
}

export default Body