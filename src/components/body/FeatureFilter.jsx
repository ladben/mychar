import './FeatureFilter.css';

const FeatureFilter = ({activeFeatureFilters, setActiveFeatureFilters}) => {

  const filterClickHandler = (e) => {
    const type = e.target.dataset.type
    
    setActiveFeatureFilters((prevState) => {
      const newState = {...prevState};
      newState[type] = !prevState[type];

      return newState;
    });
  }

  return (
    <div className='ability-filter-wrapper'>
      <div
        className={`ability-filter ${activeFeatureFilters.race && 'active'}`}
        data-type='race'
        onClick={filterClickHandler}
      >
        Race
      </div>
      <div
        className={`ability-filter ${activeFeatureFilters.class && 'active'}`}
        data-type='class'
        onClick={filterClickHandler}
      >
        Class
      </div>
      <div
        className={`ability-filter ${activeFeatureFilters.background && 'active'}`}
        data-type='background'
        onClick={filterClickHandler}
      >
        Background
      </div>
    </div>
  );
}
 
export default FeatureFilter;