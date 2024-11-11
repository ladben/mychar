import './Body.css';
import { useRef, useState, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import { supabase } from '../../client';

import Navigation from './Navigation.js';
import FeatureItem from './FeatureItem';
import SpellItem from './SpellItem';
import FeatureFilter from './FeatureFilter.js';
import SpellFilter from './SpellFilter.js';

function Body({selectedChar}) {
  register();
  const swiperElRef = useRef(null);

  const [selectedAbility, setSelectedAbility] = useState('features');
  const [concentration, setConcentraton] = useState({active: false, spellId: 0});
  const [spellList, setSpellList] = useState([]);
  const [featureList, setFeatureList] = useState([]);
  const [activeFeatureFilters, setActiveFeatureFilters] = useState({race: true, class: true, background: true});
  const [activeSpellFilter, setActiveSpellFilter] = useState('prepared');

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
    .select('spells!inner(id, name, level, castingTime, range, duration, description, prepared)')
    .eq('characterId', characterId);

    const spellData = data.map(row => row.spells).sort((a, b) => {
      const levelA = a.level;
      const levelB = b.level;

      // Place "cantrip" first
      if (levelA === 'cantrip') return -1;
      if (levelB === 'cantrip') return 1;

      // Extract the number part from levels like "1st-level", "2nd-level", etc.
      const numA = parseInt(levelA);
      const numB = parseInt(levelB);

      return numA - numB;
    });

    const cantripRows = spellData.filter(row => row.source === 'cantrip');
    const otherRows = spellData.filter(row => row.source !== 'cantrip');

    setSpellList([...cantripRows, ...otherRows]);
  }

  async function fetchFeatureList(characterId) {
    const { data } = await supabase
    .from('characterHasFeature')
    .select('features!inner(id, name, description, source)')
    .eq('characterId', characterId);

    const order = ['race', 'class', 'background'];

    const orderedData = data.map(row => row.features).sort((a, b) => {
      return order.indexOf(a.source) - order.indexOf(b.source);
    });

    setFeatureList(orderedData);
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
            <FeatureFilter activeFeatureFilters={activeFeatureFilters} setActiveFeatureFilters={setActiveFeatureFilters}/>
            <div className='ability-wrapper features-wrapper'>
              {featureList.map((feature, i) => <FeatureItem key={"feature-" + i} feature={feature} character={selectedChar} activeFeatureFilters={activeFeatureFilters}/>)}
            </div>
          </swiper-slide>
          <swiper-slide>
            <SpellFilter activeSpellFilter={activeSpellFilter} setActiveSpellFilter={setActiveSpellFilter}/>
          <div className='ability-wrapper spells-wrapper'>
            {spellList.map((spell, i) => <SpellItem key={"spell-" + i} spell={spell} concentration={{...concentration}} updateConcentration={setConcentraton} character={selectedChar} activeSpellFilter={activeSpellFilter}/>)}
          </div>
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  );
}

export default Body