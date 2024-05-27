import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ActivityIndicator, View} from 'react-native';
import Login from "../screen/auth/Login";

import OrderCreation from '../screen/customerdetails/OrderCreation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dashboard from '../screen/dashboard/Dashboard';
import DealerList from '../screen/dealer/DealerList';
import SelectVehicle from '../screen/dealer/SelectVehicle';
import CustomPhotoComponent from '../screen/auth/CustomPhotoComponent';
import TakePhotoScreen from '../screen/auth/TakePhotoScreen';

const Stack = createStackNavigator();

export default function ScreenList() {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const LoadingIndicator = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log(token, 'token jjh');
        setToken(token);
      } catch (error) {
        console.error('Error retrieving token:', error);
      } finally {
        setIsLoading(false); // Set loading to false regardless of success or failure
      }
    };
    checkToken();
  }, []);

  // If loading, you can show a loading indicator
  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={token ? 'VideoList' : 'Login'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard}/>
        <Stack.Screen name="DealerList" component={DealerList} />
        <Stack.Screen name="SelectVehicle" component={SelectVehicle} />
         <Stack.Screen name="OrderCreation" component={OrderCreation} />
         <Stack.Screen name="take" component={TakePhotoScreen}/>
         <Stack.Screen name="CustomPhotoComponent" component={CustomPhotoComponent} />
        {/* <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />    */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
