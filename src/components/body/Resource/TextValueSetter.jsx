import { useState } from 'react';
import { supabase } from '../../../client';

const TextValueSetter = ({ value, setCurrValue, resourceId, characterId }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleBlur = async () => {
    const newValue = inputValue;

    const { error } = await supabase
      .from('characterHasResource')
      .update({ values: newValue })
      .eq('id', resourceId)
      .eq('characterId', characterId);

    if (!error) {
      setCurrValue(newValue);
    }
  };

  return (
    <input
      type='text'
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default TextValueSetter;
