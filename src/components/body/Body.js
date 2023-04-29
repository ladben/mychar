import './Body.css';
import { useRef, useState, useEffect } from 'react';
import { register } from 'swiper/element/bundle';

import Navigation from './Navigation.js';
import FeatureItem from './FeatureItem';
import SpellItem from './SpellItem';

function Body(props) {
  register();
  const swiperElRef = useRef(null);

  const {selectedChar, characterAbilities} = props;

  const [selectedAbility, setSelectedAbility] = useState('features');
  const [concentration, setConcentraton] = useState({active: false, spellId: 0});

  useEffect(() => {
    if (selectedAbility === 'features') {
      swiperElRef.current.swiper.slidePrev();
    }

    if (selectedAbility === 'spells') {
      swiperElRef.current.swiper.slideNext();
    }
  }, [selectedAbility]);

  useEffect(() => {
    swiperElRef.current.addEventListener('slidechange', (e) => {
      if (e.detail[0].activeIndex === 0) {
        setSelectedAbility('features');
      }

      if (e.detail[0].activeIndex === 1) {
        setSelectedAbility('spells');
      }
    });
  }, []);

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
      <div className='swiper-wrapper-div'>
        <swiper-container
          ref={swiperElRef}
          slides-per-view="1"
          navigation="false"
          pagination="false"
          threshold="10">
          <swiper-slide>
            <div className='ability-wrapper features-wrapper'>
              {featureList.map((feature, i) => <FeatureItem key={"feature-" + i} featureId={feature}/>)}
            </div>
          </swiper-slide>
          <swiper-slide>
          <div className='ability-wrapper spells-wrapper'>
            {spellList.map((spell, i) => <SpellItem key={"spell-" + i} spellId={spell} concentration={{...concentration}} updateConcentration={setConcentraton}/>)}
          </div>
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  );
}

export default Body