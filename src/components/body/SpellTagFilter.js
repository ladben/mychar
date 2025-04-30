import { useRef } from 'react';
import './SpellTagFilter.css';

import SpellFilterGroup from './SpellFilterGroup/SpellFilterGroup.js';

const SpellTagFilter = ({
  activeSpellTagFilters,
  setActiveSpellTagFilters
}) => {
  const activeSpellTagFiltersRef = useRef({...activeSpellTagFilters});
  const filterButtonRef = useRef(null);

  const tagFilterClickHandler = (e) => {
    const type = e.target.dataset.type

    const newRef = {...activeSpellTagFiltersRef.current};
    newRef.type[type] = !activeSpellTagFiltersRef.current.type[type];

    activeSpellTagFiltersRef.current = newRef;

    e.target.classList.toggle('active');
  }

  const levelFilterClickHandler = (e) => {
    const level = e.target.dataset.level

    const newRef = {...activeSpellTagFiltersRef.current};
    newRef.level[level] = !activeSpellTagFiltersRef.current.level[level];

    activeSpellTagFiltersRef.current = newRef;

    e.target.classList.toggle('active');
  }

  const filterButtonClickHandler = () => {
    if (filterButtonRef.current) {
      filterButtonRef.current.classList.toggle('open');
    }
  }

  const updateFilterState = () => {
    if (activeSpellTagFiltersRef.current) {
      setTimeout(() => {
        setActiveSpellTagFilters(activeSpellTagFiltersRef.current)
      }, 200);
    }
  }

  return (
    <div className='extra-spell-filter-wrapper' ref={filterButtonRef}>
      <i id="extra-spell-filter-open-btn" className="fa-solid fa-filter" onClick={filterButtonClickHandler}></i>
      <i id="extra-spell-filter-close-btn" className="fa-solid fa-arrow-right" onClick={() => {
        filterButtonClickHandler();
        updateFilterState();
      }}></i>
      <div className='extra-spell-filter-backdrop' onClick={() => {
        filterButtonClickHandler();
        updateFilterState();
      }}></div>
      <div className="extra-spell-filter-panel">
        <SpellFilterGroup
          groupName="Spell Types"
          groupClassName="spell-tag-filters"
          filterType="type"
          options={["Support", "Combat", "Utility"]}
          activeSpellFilters={activeSpellTagFiltersRef.current.type}
          filterClickHandler={tagFilterClickHandler}
        />
        <SpellFilterGroup
          groupName="Spell Levels"
          groupClassName="spell-level-filters"
          filterType="level"
          options={["1st-level", "2nd-level", "3rd-level"]}
          activeSpellFilters={activeSpellTagFiltersRef.current.level}
          filterClickHandler={levelFilterClickHandler}
        />
      </div>
    </div>
  );
}
 
export default SpellTagFilter;