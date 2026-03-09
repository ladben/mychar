const SpellFilterGroup = ({
  groupName,
  groupClassName,
  filterType,
  options,
  activeSpellFilters,
  filterClickHandler,
}) => {
  const isAllTrue =
    Object.entries(activeSpellFilters)
      .map(([_, value]) => value)
      .indexOf(false) === -1;

  return (
    <div className={`extra-spell-filter-group ${groupClassName}`}>
      <div className='extra-spell-filter-title'>{groupName}</div>
      <div className='extra-spell-filter-options'>
        {options.map((option, index) => {
          const activeClass = isAllTrue
            ? ''
            : activeSpellFilters && activeSpellFilters[option.toLowerCase()]
              ? 'active'
              : '';
          return (
            <div
              key={index}
              className={`extra-spell-filter-btn spell-${filterType}-filter ${activeClass}`}
              {...{ [`data-${filterType}`]: option.toLowerCase() }}
              onClick={filterClickHandler}
            >
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpellFilterGroup;
