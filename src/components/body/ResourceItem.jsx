import './ResourceItem.css';
import { parseExpression } from '../../functions/dynamicContentParser';
import parse from 'html-react-parser';
import Counter from './Resource/Counter';
import Values from './Resource/Values';
import Text from './Resource/Text';
import { useState } from 'react';

function ResourceItem({
  resource,
  character,
  shortRestTriggered,
  longRestTriggered,
}) {
  const [settingValues, setSettingValues] = useState(false);

  const maxValueFormula =
    resource.max_value_formula || resource.base_max_value_formula;
  let maxValue = null;

  if (maxValueFormula) {
    maxValue = parseExpression(maxValueFormula, character);
  }

  const resetAt = resource.reset_at || resource.base_reset_at;

  let resourceValues = resource.values;
  if (resource.type === 'values') {
    resourceValues = JSON.parse(resource.values);
  }

  const handleResourceNameClick = () => {
    if (resource.type === 'counter') {
      return;
    }

    if (resource.type === 'values' || resource.type === 'text') {
      setSettingValues((prevState) => !prevState);
    }
  };

  return (
    <div className='resource-item flex-column-centered'>
      <div
        className={`resource-name${settingValues ? ' setting' : ''}`}
        onClick={handleResourceNameClick}
      >
        {resource.name}
      </div>
      <div className='resource-body flex-column-centered'>
        {resource.type === 'counter' && (
          <Counter
            resourceId={resource.id}
            characterId={character.id}
            currentValue={resource.current_value}
            maxValue={maxValue}
            shortRestTriggered={shortRestTriggered}
            longRestTriggered={longRestTriggered}
            resetAt={resetAt}
          />
        )}
        {resource.type === 'values' && (
          <Values
            resourceId={resource.id}
            characterId={character.id}
            resourceValues={resourceValues}
            shortRestTriggered={shortRestTriggered}
            longRestTriggered={longRestTriggered}
            resetAt={resetAt}
            settingValues={settingValues}
          />
        )}
        {resource.type === 'text' && (
          <Text
            resourceId={resource.id}
            characterId={character.id}
            value={resourceValues}
            shortRestTriggered={shortRestTriggered}
            longRestTriggered={longRestTriggered}
            resetAt={resetAt}
            settingValues={settingValues}
          />
        )}
      </div>
    </div>
  );
}

export default ResourceItem;
