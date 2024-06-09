import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {isCancel, AxiosError} from 'axios';
import { getItem, setItem, deleteItem } from "../utils/asyncStorageUtils";


const BASE_URL = 'https://tvscertified.in:8083/';
const apiKey="c7a18912-4821-4b4d-9a91-c2f4bfb21842";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiGetWithToken = async endpoint => {
  try {
    const token = await getItem('token');
    console.log('Retrieved token:', token);
    const response = await axiosInstance.get(endpoint, {
      headers: {
        Authorization:token,
        apiKey:apiKey
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const apiGetWithoutToken = async endpoint => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const apiPutWithoutToken = async (endpoint, body) => {
  try {
    const response = await axiosInstance.put(endpoint, body);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const apiPostWithToken = async (endpoint, body) => {
  try {
    const token = await getItem('token');
    const response = await axiosInstance.post(endpoint, body, {
      headers: {
        Authorization:token,
        apiKey:apiKey
      },
    });
   
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const apiPostWithoutToken = async (endpoint, body) => {
  try {
    const response = await axiosInstance.post(endpoint, body);
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(response.data.message || 'Something went wrong');
    }
    console.log(response.data, "data is there");
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Similarly, implement apiPutWithToken and apiDeleteWithToken functions

export const apiPutWithToken = async (endpoint, body) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.put(endpoint, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const apiDeleteWithToken = async endpoint => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
