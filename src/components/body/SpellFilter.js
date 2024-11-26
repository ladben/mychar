import './SpellFilter.css';
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import SpellTagFilter from './SpellTagFilter.js';

const SpellFilter = ({
  selectedAbility,
  activeSpellFilter,
  setActiveSpellFilter,
  spellsPrepared,
  spellsToPrepare,
  extraSpells,
  activeSpellTagFilters,
  setActiveSpellTagFilters
}) => {

  const spellFilterRef = useRef(null);
  const stickySpellFilterRef = useRef(null);

  useEffect(() => {
    const currentRef = spellFilterRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (stickySpellFilterRef.current && selectedAbility === 'spells') {
          entry.isIntersecting
          ? stickySpellFilterRef.current.classList.remove('active')
          : stickySpellFilterRef.current.classList.add('active');
        }
      },
      { threshold: 0.5 }
    );

    if (spellFilterRef.current) {
      observer.observe(spellFilterRef.current);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [selectedAbility]);

  const StickySpellFilterComponent = ({ children }) => {
    const portalRoot = document.getElementById("portal-root");
  
    return ReactDOM.createPortal(
      <div className="portal-content">
        {children}
      </div>,
      portalRoot
    );
  };

  const ExtraSpellFilterPortalComponent = ({children}) => {
    const extraSpellFilterPortalRoot = document.getElementById("extra-spell-filter-container");

    return ReactDOM.createPortal(
      <>
        {children}
      </>,
      extraSpellFilterPortalRoot
    );
  };

  const filterClickHandler = (e) => {
    const type = e.target.dataset.type
    
    setActiveSpellFilter(type);
  }

  return (
    <>
      <StickySpellFilterComponent>
        <div className='spell-filter-wrapper sticky' ref={stickySpellFilterRef}>
          <div
            className={`spell-filter ${activeSpellFilter === 'prepared' && 'active'}`}
            data-type='prepared'
            onClick={filterClickHandler}
          >
            Prepared {'(' + spellsPrepared} + {extraSpells + ')'}
          </div>
          <div
            className={`spell-filter ${activeSpellFilter === 'selectable' && 'active'}`}
            data-type='selectable'
            onClick={filterClickHandler}
          >
            Selectable {'(' + spellsPrepared} / {spellsToPrepare + ')'}
          </div>
        </div>
      </StickySpellFilterComponent>
      <div className='spell-filter-wrapper' ref={spellFilterRef}>
        <div
          className={`spell-filter ${activeSpellFilter === 'prepared' && 'active'}`}
          data-type='prepared'
          onClick={filterClickHandler}
        >
          Prepared {'(' + spellsPrepared} + {extraSpells + ')'}
        </div>
        <div
          className={`spell-filter ${activeSpellFilter === 'selectable' && 'active'}`}
          data-type='selectable'
          onClick={filterClickHandler}
        >
          Selectable {'(' + spellsPrepared} / {spellsToPrepare + ')'}
        </div>
      </div>
      {selectedAbility === 'spells' && activeSpellFilter === 'selectable' && (
        <ExtraSpellFilterPortalComponent>
          <SpellTagFilter activeSpellTagFilters={activeSpellTagFilters} setActiveSpellTagFilters={setActiveSpellTagFilters}/>
        </ExtraSpellFilterPortalComponent>
      )}
    </>
  );
}
 
export default SpellFilter;