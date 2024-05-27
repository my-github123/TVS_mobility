// src/utils/numberUtils.js

export const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  
  // src/utils/numberUtils.js

export const formatCurrency = (num, locale = 'en-US', currency = 'USD') => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(num);
  };
  