import { useEffect, useState } from 'react';
import { supabase } from '../../../client';
import ValueSetter from './ValueSetter';

const Values = ({
  resourceId,
  resourceValues,
  shortRestTriggered,
  longRestTriggered,
  resetAt,
}) => {
  const [currValues, setCurrValues] = useState(resourceValues);

  const resetValues = async () => {
    const newValues = currValues.map(() => ({ value: 0, status: 0 }));

    const { error } = await supabase
      .from('characterHasResource')
      .update({ values: JSON.stringify(newValues) })
      .eq('id', resourceId);

    if (!error) {
      setCurrValues(newValues);
    }
  };

  const doOnShortRest = async () => {
    if (resetAt === 'short_rest') {
      resetValues();
    }
  };

  const doOnLongRest = async () => {
    if (resetAt === 'long_rest') {
      resetValues();
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
      .eq('id', resourceId);

    if (!error) {
      setCurrValues(newValues);
    }
  };

  useEffect(() => {
    if (shortRestTriggered > 0) {
      doOnShortRest();
    }
  }, [shortRestTriggered]);

  useEffect(() => {
    if (longRestTriggered > 0) {
      doOnLongRest();
      doOnShortRest();
    }
  }, [longRestTriggered]);

  return (
    <div className='resource-values'>
      {currValues?.map((valueObj, i) => {
        if (valueObj.value !== 0) {
          return (
            <div
              key={`resource-value-${i}`}
              className={`resource-value${!valueObj.status ? ' inactive' : ''}`}
              onClick={() => {
                handleUsage(i);
              }}
            >
              {valueObj.value}
            </div>
          );
        }

        return (
          <div key={`resource-value-${i}`} className='resource-value'>
            <ValueSetter
              valueIndex={i}
              currValues={currValues}
              setCurrValues={setCurrValues}
              resourceId={resourceId}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Values;
