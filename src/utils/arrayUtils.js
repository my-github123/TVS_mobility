// src/utils/arrayUtils.js

export const removeDuplicates = (arr) => {
    return [...new Set(arr)];
  };
  
  // src/utils/arrayUtils.js

export const arrayIntersection = (arr1, arr2) => {
    return arr1.filter(value => arr2.includes(value));
  };

  // src/utils/arrayUtils.js

export const flattenArray = (arr) => {
    return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flattenArray(val) : val), []);
  };
  


//   import { removeDuplicates, arrayIntersection, flattenArray } from './utils/arrayUtils';
// import { mergeObjects, deepMergeObjects } from './utils/objectUtils';
// import { truncateString, toCamelCase } from './utils/stringUtils';
// import { getRandomNumber, formatCurrency } from './utils/numberUtils';
// import { formatDate, dateDiffInDays } from './utils/dateUtils';
// import { debounce, throttle } from './utils/miscUtils';

// // Example usage
// const uniqueArray = removeDuplicates([1, 2, 2, 3, 4, 4]);
// const commonElements = arrayIntersection([1, 2, 3], [2, 3, 4]);
// const flattenedArray = flattenArray([1, [2, [3, [4]]]]);
// const mergedObject = mergeObjects({ a: 1 }, { b: 2 });
// const deeplyMergedObject = deepMergeObjects({ a: { b: 1 } }, { a: { c: 2 } });
// const truncated = truncateString('This is a very long string', 10);
// const camelCaseString = toCamelCase('hello_world');
// const randomNum = getRandomNumber(1, 100);
// const currency = formatCurrency(1234.56);
// const formattedDate = formatDate('2024-05-21', 'YYYY-MM-DD');
// const daysDiff = dateDiffInDays(new Date('2024-05-21'), new Date('2024-06-21'));
// const debouncedFunction = debounce(() => console.log('Debounced!'), 300);
//const throttledFunction = throttle(() => console.log('Throttled!'), 300);
