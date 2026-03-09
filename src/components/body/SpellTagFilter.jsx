import { useRef } from 'react';
import './SpellTagFilter.css';

import SpellFilterGroup from './SpellFilterGroup/SpellFilterGroup.jsx';

const SpellTagFilter = ({
  activeSpellTagFilters,
  setActiveSpellTagFilters,
  spellLevels,
}) => {
  const activeSpellTagFiltersRef = useRef({ ...activeSpellTagFilters });
  const filterButtonRef = useRef(null);

  const filterClickHandler = (element, filterType) => {
    const type = element.dataset.type;
    const level = element.dataset.level;
    const filterValue = type || level;
    const isActive = element.classList.contains('active');

    const newRef = { ...activeSpellTagFiltersRef.current };
    const isAllTrue =
      Object.entries(newRef[filterType])
        .map(([_, value]) => value)
        .indexOf(false) === -1;

    Object.keys(activeSpellTagFiltersRef.current[filterType]).forEach((key) => {
      if (isAllTrue) {
        key === filterValue
          ? (newRef[filterType][key] = true)
          : (newRef[filterType][key] = false);
      } else {
        key === filterValue
          ? (newRef[filterType][key] = !isActive)
          : (newRef[filterType][key] =
              activeSpellTagFiltersRef.current[filterType][key]);
      }
    });

    const isAllFalseAfterSet =
      Object.entries(newRef[filterType])
        .map(([_, value]) => value)
        .indexOf(true) === -1;

    if (isAllFalseAfterSet) {
      Object.keys(activeSpellTagFiltersRef.current[filterType]).forEach(
        (key) => {
          newRef[filterType][key] = true;
        },
      );
    }

    activeSpellTagFiltersRef.current = newRef;
    element.classList.toggle('active', !isActive);
  };

  const filterButtonClickHandler = () => {
    if (filterButtonRef.current) {
      filterButtonRef.current.classList.toggle('open');
      document.body.classList.toggle('no-scroll');
    }
  };

  const updateFilterState = () => {
    if (activeSpellTagFiltersRef.current) {
      setTimeout(() => {
        setActiveSpellTagFilters(activeSpellTagFiltersRef.current);
      }, 200);
    }
  };

  return (
    <div className='extra-spell-filter-wrapper' ref={filterButtonRef}>
      <i
        id='extra-spell-filter-open-btn'
        className='fa-solid fa-filter'
        onClick={filterButtonClickHandler}
      ></i>
      <div
        className='extra-spell-filter-backdrop'
        onClick={() => {
          filterButtonClickHandler();
          updateFilterState();
        }}
      ></div>
      <div className='extra-spell-filter-panel'>
        <div className='spell-filter-panel-title'>Filter Spells</div>
        <div className='spell-filter-option-groups'>
          <SpellFilterGroup
            groupName='Spell Types'
            groupClassName='spell-tag-filters'
            filterType='type'
            options={[
              'Control',
              'Defense',
              'Offense',
              'Social',
              'Support',
              'Utility',
            ]}
            activeSpellFilters={activeSpellTagFiltersRef.current.type}
            filterClickHandler={(e) => {
              filterClickHandler(e.target, 'type');
            }}
          />
          <SpellFilterGroup
            groupName='Spell Levels'
            groupClassName='spell-level-filters'
            filterType='level'
            options={spellLevels}
            activeSpellFilters={activeSpellTagFiltersRef.current.level}
            filterClickHandler={(e) => {
              filterClickHandler(e.target, 'level');
            }}
          />
        </div>
        <div
          className='apply-filters-button'
          onClick={() => {
            filterButtonClickHandler();
            updateFilterState();
          }}
        >
          {' '}
          Apply Filters
        </div>
      </div>
    </div>
  );
};

export default SpellTagFilter;
