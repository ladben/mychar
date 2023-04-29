import './Body.css';
import { useState, useEffect } from 'react';

import Navigation from './Navigation.js';
import FeatureItem from './FeatureItem';
import SpellItem from './SpellItem';

function Body(props) {
  const {selectedChar, characterAbilities} = props;

  const [selectedAbility, setSelectedAbility] = useState('features');
  const [concentration, setConcentraton] = useState({active: false, spellId: 0});

  useEffect(() => {
    const abilityWrapperList = document.querySelectorAll('.ability-wrapper');
    abilityWrapperList.forEach(abilityWrapper => {
      if (abilityWrapper.classList.contains(selectedAbility + '-wrapper')) {
        abilityWrapper.classList.add('active');
      }

      if (!abilityWrapper.classList.contains(selectedAbility + '-wrapper')) {
        abilityWrapper.classList.remove('active');
      }
    })
  }, [selectedAbility]);

  const selectedCharId = selectedChar.id;
  let featureList = [];
  let spellList = [];
  characterAbilities.forEach(characterAbility => {
    if (characterAbility.characterId === selectedCharId) {
      featureList = [...characterAbility.featureList];
      spellList = [...characterAbility.spellList];
    }
  });

  return (
    <div className='body-wrapper'>
      <Navigation selectedAbility={selectedAbility} updateSelectedAbilityHandler={setSelectedAbility} concentration={concentration.active}/>
      <div className='ability-wrapper features-wrapper active'>
        {featureList.map((feature, i) => <FeatureItem key={"feature-" + i} featureId={feature}/>)}
      </div>
      <div className='ability-wrapper spells-wrapper'>
        {spellList.map((spell, i) => <SpellItem key={"spell-" + i} spellId={spell} concentration={{...concentration}} updateConcentration={setConcentraton}/>)}
      </div>
    </div>
  );
}

export default Body