import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SingleSwitch = ({
  selectionMode,
  roundCorner,
  options, // Array of option labels
  onSelectSwitch,
  selectionColor,
  label
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  useEffect(() => {
    setSelectionMode(selectionMode);
  }, [selectionMode]);

  const updatedSwitchData = val => {
    setSelectionMode(val);
    onSelectSwitch(val);
  };

  return (
    <View>
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}
      <View style={[styles.container, { borderRadius:0 }]}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            onPress={() => updatedSwitchData(index + 1)}
            style={[
              styles.option,
              { 
                backgroundColor: getSelectionMode == index + 1 ? selectionColor : 'white',
                borderRadius:0 
              }
            ]}
          >
            <Text style={{ color: getSelectionMode == index + 1 ? 'white' : selectionColor }}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: 'white',
    paddingVertical: 2,
    marginBottom: 8
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    color: 'black',
    paddingHorizontal: 3
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8
  }
});

export default SingleSwitch;
