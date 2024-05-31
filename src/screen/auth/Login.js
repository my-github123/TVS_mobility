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

// Call the function to store the data

export default function Login({navigation}) {
  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const handlePress = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.imageContainer}>
        {/* <Image source={images.logo} /> */}
        <Image
          source={require('../../../assets/images/tvs_fit.png')}
          style={{width:165, height:55,right:10}}
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
    fontSize:18,
    color: '#22240f',
   // marginTop: 50.6,
    fontFamily: 'DMSans-Medium',
    right:10,
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
    marginTop:100,
    fontFamily: 'DMSans-Medium',
    right:10,
    //  lineHeight: 18,
  },
  loginContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop:10,
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
