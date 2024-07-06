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

  console.log(options,"OPTION SI HERE........");

  useEffect(() => {
    setSelectionMode(selectionMode);
  }, [selectionMode]);

  const updatedSwitchData = val => {
    console.log(val,"VALUE IS THERE.............");
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
          <React.Fragment key={index}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => updatedSwitchData(index + 1)}
              style={[
                styles.option,
                {
                  backgroundColor: getSelectionMode === index + 1 ? selectionColor : 'white',
               //   borderTopLeftRadius: index === 0 && roundCorner ? 10 : 0,
                //  borderBottomLeftRadius: index === 0 && roundCorner ? 10 : 0,
                //  borderTopRightRadius: index === options.length - 1 && roundCorner ? 10 : 0,
                //  borderBottomRightRadius: index === options.length - 1 && roundCorner ? 10 : 0
                }
              ]}
            >
              <Text style={{ color: getSelectionMode === index + 1 ? 'white' : selectionColor }}>
                {option}
              </Text>
            </TouchableOpacity>
            {index < options.length - 1 && (
              <View style={styles.verticalLine} />
            )}
          </React.Fragment>
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
  },
  verticalLine: {
    width: 1,
    height: '100%',
    backgroundColor: '#007BFF'
  }
});

export default SingleSwitch;
