import { useEffect, useState } from 'react';
import { supabase } from '../../../client';

const Counter = ({
  resourceId,
  currentValue,
  maxValue,
  shortRestTriggered,
  longRestTriggered,
  resetAt,
}) => {
  const [currValue, setCurrValue] = useState(currentValue);

  const doOnShortRest = async () => {
    if (resetAt === 'short_rest') {
      const { error } = await supabase
        .from('characterHasResource')
        .update({ current_value: maxValue })
        .eq('id', resourceId);

      if (!error) {
        setCurrValue(maxValue);
      }
    }
  };

  const doOnLongRest = async () => {
    if (resetAt === 'long_rest') {
      const { error } = await supabase
        .from('characterHasResource')
        .update({ current_value: maxValue })
        .eq('id', resourceId);

      if (!error) {
        setCurrValue(maxValue);
      }
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

  const handleIncrease = async () => {
    const canIncrease = currValue < maxValue;

    if (canIncrease) {
      const { error } = await supabase
        .from('characterHasResource')
        .update({ current_value: currValue + 1 })
        .eq('id', resourceId);

      if (!error) {
        setCurrValue((prevState) => prevState + 1);
      }
    }
  };

  const handleDecrease = async () => {
    const canDecrease = currValue > 0;

    if (canDecrease) {
      const { error } = await supabase
        .from('characterHasResource')
        .update({ current_value: currValue - 1 })
        .eq('id', resourceId);

      if (!error) {
        setCurrValue((prevState) => prevState - 1);
      }
    }
  };
  return (
    <>
      <div className='resource-current-value'>{currValue}</div>
      <div className='resource-counter-footer'>
        <div className='resource-max-value'>Max: {maxValue}</div>
        <div className='resource-actions'>
          <button type='button' className='reduce' onClick={handleDecrease}>
            <i className='fa-solid fa-minus'></i>
          </button>
          <button type='button' className='increase' onClick={handleIncrease}>
            <i className='fa-solid fa-plus'></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Counter;
