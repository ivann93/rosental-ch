const setLocalStorage = (key, value) => {
  let processedValue = value;

  if (typeof value === 'object') {
    processedValue = JSON.stringify(value);
  }

  if (typeof processedValue !== 'string') {
    throw new Error('Can not store unrecognized format value');
  }

  localStorage.setItem(key, processedValue);
};

const getLocalStorage = key => localStorage.getItem(key);
