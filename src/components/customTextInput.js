import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

const CustomTextInput = ({ label, value, onChangeText, placeholder, secureTextEntry,editable = true, style, ...props }) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
 <TextInput
value={value}
onChangeText={onChangeText}
placeholder={placeholder}
editable={editable}
secureTextEntry={secureTextEntry}
        style={styles.input}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    marginTop:4

  },
  label: {
    fontSize: 16,
    marginBottom:8,
    fontWeight:"bold",
    color:"black",
    paddingHorizontal:3
  },
  input: {
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#f7f8f9',
    borderRadius: 8,
    borderColor: '#e8ecf4',
    borderWidth: 1,
  // width: '100%',
  //   height:46,
  //   backgroundColor: '#f7f8f9',
  // //  height: 150,
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 4,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginTop: 10,
  },
});

export default CustomTextInput;
