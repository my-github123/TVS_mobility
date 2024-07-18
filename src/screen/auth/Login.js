import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  
  Alert,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
} from 'react-native';

import CustomButton from '../../components/customTextButton';
import Logo from '../../../assets/images/logo.svg';
import Password from '../../../assets/images/password.svg';
import CustomTextInput from '../../components/customTextInput';
import {apiPostWithoutToken} from '../../services/apiService';
import {getItem, setItem, deleteItem} from '../../utils/asyncStorageUtils';

// Call the function to store the data

export default function Login({navigation}) {
  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordDisabled, setIsPasswordDisabled] = useState(false);


  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    setIsPasswordDisabled(!isPasswordDisabled);
  };

  const handlePress = async () => {
    // Trim the username and password
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
  
    // Check if either username or password is empty
    if (!trimmedUsername || !trimmedPassword) {
      ToastAndroid.show("Username and password cannot be empty", ToastAndroid.LONG);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedUsername)) {
      ToastAndroid.show("Invalid email format", ToastAndroid.LONG);
      return;
    }
  
    const params = {
      username: trimmedUsername,
      password: trimmedPassword,
    };
  
    try {
      const data = await apiPostWithoutToken('fitAuthenticate', params);
      console.log(data, 'DATA IS THERE......');
  
      // if (data.data[0]?.error === "User Not Found.") {
      //   ToastAndroid.show("User Not Found", ToastAndroid.LONG);
      // } else {
        const flattenedData = data?.data?.data.map(item => {
          return item.userData.map(user => ({
            token: item.token,
            name: item.name,
            user_name: user.user_name,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
            user_type: user.user_type,
            locationId: user.locationId
          }));
        }).flat();
  
        // Extract the token and role
        const { token, user_name, role, locationId } = flattenedData[0];
  
        console.log(user_name, "username is there");
  
        await setItem('username', user_name);
        await setItem('locationId', locationId);
        await setItem('role', role);
        await setItem('token', token);
  
        setUsername("");
        setPassword("");
  
        // Navigate to the dashboard or handle the successful response
        navigation.navigate('Dashboard');
      }
    catch (error) {
      // Check if the error message matches the invalid credentials error
      if (error.message === 'Invalid Credentials. Please try again.') {
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      } else {
        console.error('Request failed:', error);
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.imageContainer}>
        {/* <Image source={images.logo} /> */}
        <Image
          source={require('../../../assets/images/tvs_fit.png')}
          style={{width: 165, height: 55, right: 10}}
          resizeMode="contain"
        />
        <Text style={styles.wrapperText}>Certified Cars</Text>
        <Text style={styles.wrapperLoginText}>Login</Text>
      </View>

      <View style={styles.loginContainer}>
        <CustomTextInput
          value={username}
          onChangeText={value => setUsername(value)}
          placeholder="Enter your email"
        />

        <CustomTextInput
          value={password}
          onChangeText={value => setPassword(value)}
          placeholder="Enter your password"
          secureTextEntry={!isPasswordVisible}
        //  editable={!isPasswordDisabled}
        />

        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={togglePasswordVisibility}>
          <Password style={{width: 24, height: 24}} />
        </TouchableOpacity>

        {/* <Text style={styles.forgotPassword}>Forgot Password?</Text> */}

        <CustomButton title="Login" onPress={handlePress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapperText: {
    fontSize: 18,
    color: '#22240f',
    // marginTop: 50.6,
    fontFamily: 'DMSans-Medium',
    right: 10,
    // lineHeight: 18,
    // fontWeight: '600',
  },
  imageContainer: {
    marginTop: 50,
    paddingHorizontal: 30,
  },
  wrapperLoginText: {
    fontSize: 20,
    color: '#22240f',
    marginTop: 100,
    fontFamily: 'DMSans-Medium',
    right: 10,
    //  lineHeight: 18,
  },
  loginContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  forgotPassword: {
    color: '#6a707c',
    marginTop: 14,
    textAlign: 'right',
    fontFamily: 'DMSans-Bold',
  },
  eyeIcon: {
    position: 'absolute',
    bottom: 100,
    right: 30,
  },
});
