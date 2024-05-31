import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomBox = ({ color, number, text }) => {
  return (
    <View style={[styles.box, { backgroundColor: color }]}>
      <Text style={styles.boxText1}>{number}</Text>
      <Text style={styles.boxText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
   // borderRadius: 8,
    width: 144,
    height:105,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4, // Add margin between boxes
  },
  boxText: {
    fontSize: 12,
    textAlign: 'left',
    color:"white",
    bottom:15,
    fontWeight:"bold"
  },
  boxText1: {
    fontSize:25,
    textAlign: 'left',
    color:"white",
    fontWeight:"bold",
    bottom:15
  },
});

export default CustomBox;
