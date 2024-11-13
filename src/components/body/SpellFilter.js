import './SpellFilter.css';

const SpellFilter = ({
  activeSpellFilter,
  setActiveSpellFilter,
  spellsPrepared,
  spellsToPrepare,
  extraSpells
}) => {

  const filterClickHandler = (e) => {
    const type = e.target.dataset.type
    
    setActiveSpellFilter(type);
  }

  return (
    <div className='spell-filter-wrapper'>
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
  );
}
 
export default SpellFilter;