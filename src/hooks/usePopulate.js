import { useState } from 'react';

// Populates an object with a stateful field
// given an array of objects, a default value, and an optional key (name).
// Returns a stateful array with a set function
export const usePopulate = (content, value, key) => {

  const [ values, setValues ] = useState(Array(content.length).fill(value));

  content = content.map((elem, index) => {
    if (key) {
      elem[key] = values[index];
    } else {
      elem.value = values[index];
    }
    return elem;
  });

  return [ values, setValues ];
};