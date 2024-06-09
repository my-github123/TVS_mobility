// asyncStorageUtils.js

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Sets an item in AsyncStorage.
 * @param {string} key - The key for the item to set.
 * @param {string} value - The value to store.
 */
export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log(`Item with key "${key}" set successfully.`);
  } catch (error) {
    console.error(`Error setting item with key "${key}":`, error);
  }
};

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error storing data: ', e);
  }
};

/**
 * Gets an item from AsyncStorage.
 * @param {string} key - The key for the item to get.
 * @returns {Promise<string|null>} The value of the item, or null if the item does not exist.
 */
export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log(`Item with key "${key}" retrieved successfully.`);
      return value;
    } else {
      console.log(`Item with key "${key}" does not exist.`);
      return null;
    }
  } catch (error) {
    console.error(`Error getting item with key "${key}":`, error);
    return null;
  }
};

/**
 * Deletes an item from AsyncStorage.
 * @param {string} key - The key for the item to delete.
 */
export const deleteItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Item with key "${key}" deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting item with key "${key}":`, error);
  }
};
