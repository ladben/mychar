import './ResourceItem.css';
import { parseExpression } from '../../functions/dynamicContentParser';
import parse from 'html-react-parser';
import Counter from './Resource/Counter';
import Values from './Resource/Values';

function ResourceItem({
  resource,
  character,
  shortRestTriggered,
  longRestTriggered,
}) {
  const maxValueFormula =
    resource.max_value_formula || resource.base_max_value_formula;
  let maxValue = null;

  if (maxValueFormula) {
    maxValue = parseExpression(maxValueFormula, character);
  }

  const resetAt = resource.reset_at || resource.base_reset_at;

  let resourceValues = null;
  if (resource.values) {
    resourceValues = JSON.parse(resource.values);
  }

  return (
    <div className='resource-item flex-column-centered'>
      <div className='resource-name'>{resource.name}</div>
      <div className='resource-body flex-column-centered'>
        {!!maxValue && (
          <Counter
            resourceId={resource.id}
            currentValue={resource.current_value}
            maxValue={maxValue}
            shortRestTriggered={shortRestTriggered}
            longRestTriggered={longRestTriggered}
            resetAt={resetAt}
          />
        )}
        {!!resourceValues && (
          <Values
            resourceId={resource.id}
            resourceValues={resourceValues}
            shortRestTriggered={shortRestTriggered}
            longRestTriggered={longRestTriggered}
            resetAt={resetAt}
          />
        )}
      </div>
    </div>
  );
}

export default ResourceItem;
