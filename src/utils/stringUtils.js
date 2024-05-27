// src/utils/stringUtils.js

export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  // src/utils/stringUtils.js

export const truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  };
  
  // src/utils/stringUtils.js

export const toCamelCase = (str) => {
    return str
      .replace(/([-_][a-z])/gi, (match) => {
        return match.toUpperCase()
          .replace('-', '')
          .replace('_', '');
      });
  };
  