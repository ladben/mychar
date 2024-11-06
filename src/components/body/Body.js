import './Body.css';
import { useRef, useState, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import { supabase } from '../../client';

import Navigation from './Navigation.js';
import FeatureItem from './FeatureItem';
import SpellItem from './SpellItem';

function Body({selectedChar}) {
  register();
  const swiperElRef = useRef(null);

  const [selectedAbility, setSelectedAbility] = useState('features');
  const [concentration, setConcentraton] = useState({active: false, spellId: 0});
  const [spellList, setSpellList] = useState([]);
  const [featureList, setFeatureList] = useState([]);

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

  useEffect(() => {
    fetchSpellList(selectedChar.id);
    fetchFeatureList(selectedChar.id);
  }, [selectedChar.id]);

  async function fetchSpellList(characterId) {
    const { data } = await supabase
    .from('characterHasSpell')
    .select('spells!inner(id, name, level, castingTime, range, duration, description)')
    .eq('characterId', characterId);

    setSpellList(data.map(row => row.spells));
  }

  async function fetchFeatureList(characterId) {
    const { data } = await supabase
    .from('characterHasFeature')
    .select('features!inner(id, name, description)')
    .eq('characterId', characterId);

    setFeatureList(data.map(row => row.features));
  }

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
              {featureList.map((feature, i) => <FeatureItem key={"feature-" + i} feature={feature}/>)}
            </div>
          </swiper-slide>
          <swiper-slide>
          <div className='ability-wrapper spells-wrapper'>
            {spellList.map((spell, i) => <SpellItem key={"spell-" + i} spell={spell} concentration={{...concentration}} updateConcentration={setConcentraton} character={selectedChar}/>)}
          </div>
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  );
}

export default Body