import './Body.css';
import { useRef, useState, useEffect } from 'react';
import { supabase } from '../../client.js';

import Navigation from './Navigation.jsx';
import FeatureItem from './FeatureItem.jsx';
import SpellItem from './SpellItem.jsx';
import FeatureFilter from './FeatureFilter.jsx';
import SpellFilter from './SpellFilter.jsx';

function Body({selectedChar}) {
  const swiperElRef = useRef(null);

  const [selectedAbility, setSelectedAbility] = useState(window.localStorage.getItem('_selected-ability') || 'features');
  const [concentration, setConcentraton] = useState({active: false, spellId: 0});
  const [spellList, setSpellList] = useState([]);
  const [spellsPrepared, setSpellsPrepared] = useState(0);
  const [featureList, setFeatureList] = useState([]);
  const [activeFeatureFilters, setActiveFeatureFilters] = useState({race: true, class: true, background: true, feat: true});
  const [activeSpellFilter, setActiveSpellFilter] = useState(window.localStorage.getItem('_active-spell-filter') || 'prepared');
  const [activeSpellTagFilters, setActiveSpellTagFilters] = useState({
    type: {utility: true, combat: true, support: true},
    level: {'1st-level': true, '2nd-level': true, '3rd-level': true}
  });

  const spellsToPrepare = useRef(0);
  const extraSpells = useRef(0);
  spellsToPrepare.current = selectedChar.druid_lvl + selectedChar.wisdom_mod;

  window.supabase = supabase;

  const setSelectedAbilityFunction = (ability) => {
    setSelectedAbility(ability);
    window.localStorage.setItem('_selected-ability', ability);
  }

  const setActiveSpellFilterFunction = (spellFilter) => {
    setActiveSpellFilter(spellFilter);
    window.localStorage.setItem('_active-spell-filter', spellFilter);
  }

  useEffect(() => {
    if (selectedAbility === 'features') {
      swiperElRef.current.swiper.slidePrev();
    }

    if (selectedAbility === 'spells') {
      swiperElRef.current.swiper.slideNext();
    }
  }, [selectedAbility]);

  useEffect(() => {
    const swiperEl = swiperElRef.current;
    if (!swiperEl) return;

    const handler = (e) => {
      const activeIndex = e.detail[0].activeIndex;
      if (activeIndex === 0) setSelectedAbilityFunction('features');
      if (activeIndex === 1) setSelectedAbilityFunction('spells');
    };

    swiperEl.addEventListener('swiperslidechange', handler);

    return () => {
      swiperEl.removeEventListener('swiperslidechange', handler);
    };
  }, []);

  useEffect(() => {
    fetchSpellList(selectedChar.id);
    fetchFeatureList(selectedChar.id);
  }, [selectedChar.id]);

  async function fetchSpellList(characterId) {
    const { data } = await supabase
    .from('characterHasSpell')
    .select('prepared, spells!inner(id, name, level, castingTime, range, duration, description, tag_utility, tag_combat, tag_support)')
    .eq('characterId', characterId);

    const spellData = data.map(row => ({...row.spells, prepared: row.prepared})).sort((a, b) => {
      // Convert level to sortable number
      const levelOrder = (level) => {
        if (level === 'cantrip') return 0;
        return parseInt(level, 10); // "1st-level" -> 1, etc.
      };

      const levelA = levelOrder(a.level);
      const levelB = levelOrder(b.level);

      // sort by level first
      if (levelA !== levelB) {
        return levelA - levelB;
      }

      // sort by name second
      return a.name.localeCompare(b.name);
    });
    
    const preparedSpellsNum = spellData.filter(spell => spell.prepared === true).length;
    const extraSpellsNum = spellData.filter(spell => spell.prepared === null).length;

    setSpellList(spellData);
    setSpellsPrepared(preparedSpellsNum);
    extraSpells.current = extraSpellsNum;
  }

  const handleSpellUpdate = () => {
    fetchSpellList(selectedChar.id);
  }

  async function fetchFeatureList(characterId) {
    const { data } = await supabase
    .from('characterHasFeature')
    .select('features!inner(id, name, description, source)')
    .eq('characterId', characterId);

    const order = ['race', 'feat', 'class', 'background'];

    const orderedData = data.map(row => row.features).sort((a, b) => {
      return order.indexOf(a.source) - order.indexOf(b.source);
    });

    setFeatureList(orderedData);
  }

  return (
    <div className='body-wrapper'>
      <Navigation selectedAbility={selectedAbility} updateSelectedAbilityHandler={setSelectedAbilityFunction} concentration={concentration.active}/>
      <div className='swiper-wrapper-div'>
        <swiper-container
          ref={swiperElRef}
          slides-per-view={1}
          navigation={false}
          pagination={false}
          init="true"
          threshold={10}>
          <swiper-slide>
            <FeatureFilter activeFeatureFilters={activeFeatureFilters} setActiveFeatureFilters={setActiveFeatureFilters}/>
            <div className='ability-wrapper features-wrapper'>
              {featureList.map((feature, i) => <FeatureItem key={"feature-" + i} feature={feature} character={selectedChar} activeFeatureFilters={activeFeatureFilters}/>)}
            </div>
          </swiper-slide>
          <swiper-slide>
            <SpellFilter
              selectedAbility={selectedAbility}
              activeSpellFilter={activeSpellFilter}
              setActiveSpellFilter={setActiveSpellFilterFunction}
              spellsPrepared={spellsPrepared}
              spellsToPrepare={spellsToPrepare.current}
              extraSpells={extraSpells.current}
              activeSpellTagFilters={activeSpellTagFilters}
              setActiveSpellTagFilters={setActiveSpellTagFilters}
            />
          <div className='ability-wrapper spells-wrapper'>
            {spellList.map((spell, i) => {
              return (
                <SpellItem
                  key={"spell-" + i}
                  spell={spell}
                  concentration={{...concentration}}
                  updateConcentration={setConcentraton}
                  character={selectedChar}
                  activeSpellFilter={activeSpellFilter}
                  spellsToPrepare={spellsToPrepare.current}
                  spellsPrepared={spellsPrepared}
                  onUpdate={handleSpellUpdate}
                  activeSpellTagFilters={activeSpellTagFilters}
                />
              );
            })}
          </div>
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  );
}

export default Body