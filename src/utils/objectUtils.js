// src/utils/objectUtils.js

export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };
  

  // src/utils/arrayUtils.js

export const flattenArray = (arr) => {
    return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flattenArray(val) : val), []);
  };

  
  // src/utils/objectUtils.js

export const deepMergeObjects = (target, source) => {
    const output = { ...target };
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = deepMergeObjects(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  };
  
  const isObject = (item) => {
    return item && typeof item === 'object' && !Array.isArray(item);
  };
  