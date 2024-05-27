import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import TakePhotoScreen from './TakePhotoScreen'; // Assuming the path to the TakePhotoScreen component

const CustomPhotoComponent = () => {
  const handlePrintPhoto = () => {
    // Logic for printing photos
    console.log('Printing photos...');
  };

  return (
    <View style={styles.container}>
      <TakePhotoScreen />
      <TouchableOpacity style={styles.selectButton} onPress={handlePrintPhoto}>
        <Text style={styles.buttonText}>Print Photos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
  },
});

export default CustomPhotoComponent;
