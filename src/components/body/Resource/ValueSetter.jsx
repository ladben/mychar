import { useState } from 'react';
import { supabase } from '../../../client';

const ValueSetter = ({ valueIndex, currValues, setCurrValues, resourceId }) => {
  const [inputValue, setInputValue] = useState(0);

  const handleChange = (e) => {
    const num = Number(e.target.value);
    console.log(num);
    setInputValue(num);
  };

  const handleBlur = async () => {
    const newValues = currValues.map((val, i) => {
      if (i === valueIndex) {
        return { value: inputValue, status: 1 };
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

  return (
    <input
      type='number'
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default ValueSetter;
