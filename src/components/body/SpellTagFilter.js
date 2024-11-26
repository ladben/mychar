import { useRef } from 'react';
import './SpellTagFilter.css';

const SpellTagFilter = ({
  activeSpellTagFilters,
  setActiveSpellTagFilters
}) => {
  const filterButtonRef = useRef(null);

  const tagFilterClickHandler = (e) => {
    const type = e.target.dataset.type
    
    setActiveSpellTagFilters((prevState) => {
      const newState = {...prevState};
      newState[type] = !prevState[type];

      return newState;
    });
  }

  const filterButtonClickHandler = () => {
    if (filterButtonRef.current) {
      filterButtonRef.current.classList.toggle('open');
    }
  }

  return (
    <div className='extra-spell-filter-wrapper' ref={filterButtonRef}>
      <i id="extra-spell-filter-open-btn" className="fa-solid fa-filter" onClick={filterButtonClickHandler}></i>
      <i id="extra-spell-filter-close-btn" className="fa-solid fa-arrow-right" onClick={filterButtonClickHandler}></i>
      <div className='extra-spell-filter-backdrop' onClick={filterButtonClickHandler}></div>
      <div className="extra-spell-filter-panel">
        <div className='extra-spell-filter-group spell-tag-filters'>
          <div className='extra-spell-filter-title'>Spell Types</div>
          <div
            className={`extra-spell-filter-btn spell-tag-filter ${activeSpellTagFilters.support && 'active'}`}
            data-type='support'
            onClick={tagFilterClickHandler}
          >
            Support
          </div>
          <div
            className={`extra-spell-filter-btn spell-tag-filter ${activeSpellTagFilters.combat && 'active'}`}
            data-type='combat'
            onClick={tagFilterClickHandler}
          >
            Combat
          </div>
          <div
            className={`extra-spell-filter-btn spell-tag-filter ${activeSpellTagFilters.utility && 'active'}`}
            data-type='utility'
            onClick={tagFilterClickHandler}
          >
            Utility
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default SpellTagFilter;