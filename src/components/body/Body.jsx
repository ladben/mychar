import './Body.css';
import { useRef, useState, useEffect } from 'react';
import { supabase } from '../../client.js';

import Navigation from './Navigation.jsx';
import FeatureItem from './FeatureItem.jsx';
import SpellItem from './SpellItem.jsx';
import ResourceItem from './ResourceItem.jsx';
import FeatureFilter from './FeatureFilter.jsx';
import SpellFilter from './SpellFilter.jsx';

function Body({ selectedChar }) {
  const swiperElRef = useRef(null);

  const [selectedAbility, setSelectedAbility] = useState(
    window.localStorage.getItem('_selected-ability') || 'features',
  );
  const [concentration, setConcentraton] = useState({
    active: false,
    spellId: 0,
  });
  const [spellList, setSpellList] = useState([]);
  const [spellsPrepared, setSpellsPrepared] = useState(0);
  const [featureList, setFeatureList] = useState([]);
  const [resourceList, setResourceList] = useState([]);
  const [shortRestTriggered, setShortRestTriggered] = useState(0);
  const [longRestTriggered, setLongRestTriggered] = useState(0);
  const [activeFeatureFilters, setActiveFeatureFilters] = useState({
    race: true,
    class: true,
    background: true,
    feat: true,
  });
  const [activeSpellFilter, setActiveSpellFilter] = useState(
    window.localStorage.getItem('_active-spell-filter') || 'prepared',
  );
  const [activeSpellTagFilters, setActiveSpellTagFilters] = useState({
    type: { utility: true, combat: true, support: true },
    level: { '1st-level': true, '2nd-level': true, '3rd-level': true },
  });

  const spellsToPrepare = useRef(0);
  const extraSpells = useRef(0);

  if (selectedChar.druid_lvl > 0) {
    spellsToPrepare.current = selectedChar.druid_lvl + selectedChar.wisdom_mod;
  }

  if (selectedChar.paladin_lvl > 0) {
    spellsToPrepare.current =
      Math.floor(selectedChar.paladin_lvl / 2) + selectedChar.charisma_mod;
  }

  if (selectedChar.wizard_lvl > 0) {
    spellsToPrepare.current =
      selectedChar.wizard_lvl + selectedChar.intelligence_mod;
  }

  window.supabase = supabase;

  const setSelectedAbilityFunction = (ability) => {
    setSelectedAbility(ability);
    window.localStorage.setItem('_selected-ability', ability);
  };

  const setActiveSpellFilterFunction = (spellFilter) => {
    setActiveSpellFilter(spellFilter);
    window.localStorage.setItem('_active-spell-filter', spellFilter);
  };

  useEffect(() => {
    if (selectedAbility === 'features') {
      swiperElRef.current.swiper.slideTo(0);
    }

    if (selectedAbility === 'spells') {
      swiperElRef.current.swiper.slideTo(1);
    }

    if (selectedAbility === 'resources') {
      swiperElRef.current.swiper.slideTo(2);
    }
  }, [selectedAbility]);

  useEffect(() => {
    const swiperEl = swiperElRef.current;
    if (!swiperEl) return;

    const handler = (e) => {
      const activeIndex = e.detail[0].activeIndex;
      if (activeIndex === 0) setSelectedAbilityFunction('features');
      if (activeIndex === 1) setSelectedAbilityFunction('spells');
      if (activeIndex === 2) setSelectedAbilityFunction('resources');
    };

    swiperEl.addEventListener('swiperslidechange', handler);

    return () => {
      swiperEl.removeEventListener('swiperslidechange', handler);
    };
  }, []);

  useEffect(() => {
    fetchSpellList(selectedChar.id);
    fetchFeatureList(selectedChar.id);
    fetchResourceList(selectedChar.id);
  }, [selectedChar.id]);

  async function fetchSpellList(characterId) {
    const { data } = await supabase
      .from('characterHasSpell')
      .select(
        'prepared, spells!inner(id, name, level, castingTime, range, duration, description, tag_utility, tag_combat, tag_support)',
      )
      .eq('characterId', characterId);

    const spellData = data
      .map((row) => ({ ...row.spells, prepared: row.prepared }))
      .sort((a, b) => {
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

    const preparedSpellsNum = spellData.filter(
      (spell) => spell.prepared === true,
    ).length;
    const extraSpellsNum = spellData.filter(
      (spell) => spell.prepared === null,
    ).length;

    setSpellList(spellData);
    setSpellsPrepared(preparedSpellsNum);
    extraSpells.current = extraSpellsNum;
  }

  const handleSpellUpdate = () => {
    fetchSpellList(selectedChar.id);
  };

  async function fetchFeatureList(characterId) {
    const { data } = await supabase
      .from('characterHasFeature')
      .select('features!inner(id, name, description, source)')
      .eq('characterId', characterId);

    const order = ['race', 'feat', 'class', 'background'];

    const orderedData = data
      .map((row) => row.features)
      .sort((a, b) => {
        return order.indexOf(a.source) - order.indexOf(b.source);
      });

    setFeatureList(orderedData);
  }

  async function fetchResourceList(characterId) {
    const { data } = await supabase
      .from('characterHasResource')
      .select(
        '*, resources:resourceId (base_max_value_formula, base_reset_at, created_at, name, toggleable, type)',
      )
      .eq('characterId', characterId);

    const orderedData = data
      .map((res) => {
        return {
          characterId: res.characterId,
          current_value: res.current_value,
          id: res.id,
          max_value_formula: res.max_value_formula,
          reset_at: res.reset_at,
          resourceId: res.resourceId,
          values: res.values,
          base_max_value_formula: res.resources.base_max_value_formula,
          base_reset_at: res.resources.base_reset_at,
          name: res.resources.name,
          toggleable: res.resources.toggleable,
          type: res.resources.type,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    setResourceList(orderedData);
  }

  return (
    <div className='body-wrapper'>
      <Navigation
        selectedAbility={selectedAbility}
        updateSelectedAbilityHandler={setSelectedAbilityFunction}
        concentration={concentration.active}
      />
      <div className='swiper-wrapper-div'>
        <swiper-container
          ref={swiperElRef}
          slides-per-view={1}
          navigation={false}
          pagination={false}
          init='true'
          threshold={10}
        >
          <swiper-slide>
            <FeatureFilter
              activeFeatureFilters={activeFeatureFilters}
              setActiveFeatureFilters={setActiveFeatureFilters}
            />
            <div className='ability-wrapper features-wrapper'>
              {featureList.map((feature, i) => (
                <FeatureItem
                  key={'feature-' + i}
                  feature={feature}
                  character={selectedChar}
                  activeFeatureFilters={activeFeatureFilters}
                />
              ))}
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
                    key={'spell-' + i}
                    spell={spell}
                    concentration={{ ...concentration }}
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
          <swiper-slide>
            <div className='ability-wrapper resources-wrapper'>
              {resourceList.map((resource, i) => (
                <ResourceItem
                  key={`resource-${i}`}
                  resource={resource}
                  character={selectedChar}
                  shortRestTriggered={shortRestTriggered}
                  longRestTriggered={longRestTriggered}
                />
              ))}
              <div className='rest-triggers'>
                <div
                  onClick={() => {
                    setShortRestTriggered((prevState) => prevState + 1);
                  }}
                  className='rest-trigger'
                >
                  Make short rest
                </div>
                <div
                  onClick={() => {
                    setLongRestTriggered((prevState) => prevState + 1);
                  }}
                  className='rest-trigger'
                >
                  Make long rest
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  );
}

export default Body;
