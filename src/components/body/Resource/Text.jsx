import { useEffect, useState } from 'react';
import TextValueSetter from './TextValueSetter';

const Text = ({
  resourceId,
  characterId,
  value,
  shortRestTriggered,
  longRestTriggered,
  resetAt,
  settingValues,
}) => {
  const [currValue, setCurrValue] = useState(value);

  const resetValue = async () => {
    const { error } = await supabase
      .from('characterHasResource')
      .update({ values: '' })
      .eq('id', resourceId)
      .eq('characterId', characterId);

    if (!error) {
      setCurrValue('');
    }
  };

  useEffect(() => {
    if (shortRestTriggered > 0 && resetAt === 'short_rest') {
      resetValue();
    }
  }, [shortRestTriggered]);

  useEffect(() => {
    if (longRestTriggered > 0) {
      resetValue();
    }
  }, [longRestTriggered]);

  return (
    <div className='resource-text-value'>
      {!!currValue && !settingValues && currValue}
      {(!currValue || settingValues) && (
        <TextValueSetter
          value={currValue}
          setCurrValue={setCurrValue}
          resourceId={resourceId}
          characterId={characterId}
        />
      )}
    </div>
  );
};

export default Text;
