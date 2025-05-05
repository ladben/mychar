const SpellFilterGroup = ({groupName, groupClassName, filterType, options, activeSpellFilters, filterClickHandler}) => {
    return (
        <div className={`extra-spell-filter-group ${groupClassName}`}>
          <div className='extra-spell-filter-title'>{groupName}</div>
          <div className='extra-spell-filter-options'>
            {options.map((option, index) => (
              <div
                  key={index}
                  className={`extra-spell-filter-btn spell-${filterType}-filter ${activeSpellFilters && activeSpellFilters[option.toLowerCase()] ? 'active' : ''}`}
                  {...{[`data-${filterType}`]: option.toLowerCase()}}
                  onClick={filterClickHandler}
              >
                  {option}
              </div>
            ))}
          </div>
        </div>
    );
}
 
export default SpellFilterGroup;