
import React, {useState, useEffect} from 'react';
import {StyleSheet, View,Image} from 'react-native';
import Logo from './assets/images/logo.svg';
import ScreenList from "./src/navigation/ScreenList";


const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* <Logo width={'80%'} height={'80%'} resizeMode="contain" /> */}
      <Image source={require("./assets/images/tvs_fit.png")}
      style={{width:"80%",height:"80%"}}
      resizeMode="contain"
      />
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

  // useEffect(() => {
  //   const newValidations = photoUpdates1.map(({ setter, index, key }) => {
  //     const photoValue = response.data[key];
  //     return !!photoValue; // true if value exists, otherwise false
  //   });
  //   setValidations(newValidations);
  // }, [response]);

  // {photoUpdates1.map(({ index, key }, idx) => (
  //   <Text key={key} style={styles.touchableText}>
  //     {validations[idx] ? 'Update / View' : 'Upload'}
  //   </Text>
  // ))}


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



// "dealerId": "440",
// "orderStatus": 1,
// "locationId": "5",
// "vechNumber": "TN45BD0553",
// "make": "HERO MOTOCORP LTD",
// "model": "MAESTRO DELUXE BS III",
// "year": "03/2013",
// "variant": "MAESTRO DELUXE BS III",
// "color": "RED",
// "fuelType": "Petrol",
// "owners": "1",
// "hasHypothecated": "Yes",
// "hypothecatedBy": "Y",
// "reRegistered": "No",
// "cubicCapacity": "109",




// <!-- <resources>

//     <!-- Base application theme. -->
//     <style name="AppTheme" parent="Theme.AppCompat.DayNight.NoActionBar">
//         <!-- Customize your theme here. -->
//         <item name="android:editTextBackground">@drawable/rn_edit_text_material</item>
//     </style>

// </resources> -->