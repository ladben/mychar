import { useCallback, useEffect } from 'react';
import { supabase } from '../../../client.js';

const SlotTracker = ({
  lvl,
  maxValue,
  currentValue,
  resetAt,
  setCurrentSpellSlots,
  characterId,
  shortRestTriggered,
  longRestTriggered,
}) => {
  const handleSlotClick = useCallback(
    (direction) => {
      const updateObj = {};
      updateObj[lvl] = currentValue + direction;
      supabase
        .from('characterHasSpellSlots')
        .update(updateObj)
        .eq('characterId', characterId)
        .then((res) => {
          if (!res.error) {
            setCurrentSpellSlots((prevState) => ({
              ...prevState,
              ...updateObj,
            }));
          }
        });
    },
    [currentValue],
  );

  const fillSlots = useCallback(() => {
    const updateObj = {};
    updateObj[lvl] = maxValue;

    supabase
      .from('characterHasSpellSlots')
      .update(updateObj)
      .eq('characterId', characterId)
      .then((res) => {
        if (!res.error) {
          setCurrentSpellSlots((prevState) => ({ ...prevState, ...updateObj }));
        }
      });
  }, [characterId]);

  useEffect(() => {
    if (shortRestTriggered > 0) {
      if (resetAt === 'short_rest') {
        fillSlots();
      }
    }
  }, [shortRestTriggered]);

  useEffect(() => {
    if (longRestTriggered > 0) {
      fillSlots();
    }
  }, [longRestTriggered]);

  return (
    <div className='slot-tracker'>
      {Array.from({ length: maxValue }).map((_, i) => {
        const isFilled = i < currentValue;
        return (
          <div
            key={`${lvl}-slot-${i}`}
            className={isFilled ? 'filled' : 'empty'}
            onClick={() => handleSlotClick(isFilled ? -1 : 1)}
          />
        );
      })}
    </div>
  );
};

export default SlotTracker;
