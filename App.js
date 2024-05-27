
import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Logo from './assets/images/logo.svg';
import ScreenList from "./src/navigation/ScreenList";


const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Logo width={'80%'} height={'80%'} resizeMode="contain" />
    </View>
  );
};

export default function App({navigation}) {
  const [loading, setLoading] = useState(true);

 

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // 2 seconds delay
  }, []);

  return loading ? <SplashScreen /> : <ScreenList />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
  },
});
// //  android:screenOrientation="portrait"

//2526
