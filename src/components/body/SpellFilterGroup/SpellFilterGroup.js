const SpellFilterGroup = ({groupName, groupClassName, filterType, options, activeSpellFilters, filterClickHandler}) => {
    return (
        <div className={`extra-spell-filter-group ${groupClassName}`}>
          <div className='extra-spell-filter-title'>{groupName}</div>
          {options.map((option, index) => (
            <div
                key={index}
                className={`extra-spell-filter-btn spell-${filterType}-filter ${activeSpellFilters && activeSpellFilters[option.toLowerCase()] ? 'active' : ''}`}
                data-type={option.toLowerCase()}
                onClick={filterClickHandler}
            >
                {option}
            </div>
          ))}
        </div>
    );
}
 
export default SpellFilterGroup;