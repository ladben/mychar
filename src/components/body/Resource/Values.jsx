import { useEffect, useState } from 'react';
import { supabase } from '../../../client';
import ValueSetter from './ValueSetter';

const Values = ({
  resourceId,
  characterId,
  resourceValues,
  shortRestTriggered,
  longRestTriggered,
  resetAt,
  settingValues,
}) => {
  const [currValues, setCurrValues] = useState(resourceValues);

  const resetValues = async () => {
    const newValues = currValues.map(() => ({ value: 0, status: 0 }));

    const { error } = await supabase
      .from('characterHasResource')
      .update({ values: JSON.stringify(newValues) })
      .eq('id', resourceId)
      .eq('characterId', characterId);

    if (!error) {
      setCurrValues(newValues);
    }
  };

  const handleUsage = async (index) => {
    const newValues = currValues.map((val, i) => {
      if (i === index) {
        return { ...val, status: val.status ? 0 : 1 };
      }

      return { ...val };
    });

    const { error } = await supabase
      .from('characterHasResource')
      .update({ values: JSON.stringify(newValues) })
      .eq('id', resourceId)
      .eq('characterId', characterId);

    if (!error) {
      setCurrValues(newValues);
    }
  };

  useEffect(() => {
    if (shortRestTriggered > 0 && resetAt === 'short_rest') {
      resetValues();
    }
  }, [shortRestTriggered]);

  useEffect(() => {
    if (longRestTriggered > 0) {
      resetValues();
    }
  }, [longRestTriggered]);

  return (
    <div className='resource-values'>
      {currValues?.map((valueObj, i) => {
        const value = valueObj.value;

        if (value !== 0 && !settingValues) {
          return (
            <div
              key={`resource-value-${i}`}
              className={`resource-value${!valueObj.status ? ' inactive' : ''}`}
              onClick={() => {
                handleUsage(i);
              }}
            >
              {value}
            </div>
          );
        }

        return (
          <div key={`resource-value-${i}`} className='resource-value'>
            <ValueSetter
              valueIndex={i}
              currValues={currValues}
              value={value}
              setCurrValues={setCurrValues}
              resourceId={resourceId}
              characterId={characterId}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Values;
