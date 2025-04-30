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
          filterType="tag"
          options={["Support", "Combat", "Utility"]}
          activeSpellFilters={activeSpellTagFiltersRef.current.type}
          filterClickHandler={tagFilterClickHandler}
        />
        {/* <div className='extra-spell-filter-group spell-tag-filters'>
          <div className='extra-spell-filter-title'>Spell Types</div>
          <div
            className={`extra-spell-filter-btn spell-tag-filter ${activeSpellTagFiltersRef.current?.support && 'active'}`}
            data-type='support'
            onClick={tagFilterClickHandler}
          >
            Support
          </div>
          <div
            className={`extra-spell-filter-btn spell-tag-filter ${activeSpellTagFiltersRef.current?.combat && 'active'}`}
            data-type='combat'
            onClick={tagFilterClickHandler}
          >
            Combat
          </div>
          <div
            className={`extra-spell-filter-btn spell-tag-filter ${activeSpellTagFiltersRef.current?.utility && 'active'}`}
            data-type='utility'
            onClick={tagFilterClickHandler}
          >
            Utility
          </div>
        </div> */}
      </div>
    </div>
  );
}
 
export default SpellTagFilter;