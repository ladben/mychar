import './ResourceItem.css';
import { parseExpression } from '../../functions/dynamicContentParser';
import parse from 'html-react-parser';

function ResourceItem({ resource, character }) {
  const maxValueFormula =
    resource.max_value_formula || resource.base_max_value_formula;
  let maxValue = null;

  if (maxValueFormula) {
    maxValue = parseExpression(maxValueFormula, character);
  }

  let resourceValues = {};
  if (resource.values) {
    console.log('resourcevalues: ', resource.values);
    resourceValues = JSON.parse(resource.values);
  }

  return (
    <div className='resource-item flex-column-centered'>
      <div className='resource-name'>{resource.name}</div>
      <div className='resource-current-value'>{resource.current_value}</div>
      {!!maxValue && (
        <>
          <div className='resource-max-value'>max: {maxValue}</div>
          <div className='resource-actions'>
            <button type='button' className='reduce'>
              -
            </button>
            <button type='button' className='increase'>
              +
            </button>
          </div>
        </>
      )}
      {!!resourceValues && (
        <div className='resource-values'>
          {resourceValues?.map((valueObj, i) => (
            <div
              key={`resource-value-${i}`}
              className={`resource-value${!valueObj.state ? ' inactive' : ''}`}
            >
              {valueObj.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResourceItem;
