import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const CustomSwitch = ({
  selectionMode,
  roundCorner,
  option1,
  option2,
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
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.switchContainer, { borderRadius: roundCorner ? 25 : 0, borderColor: selectionColor }]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={[
            styles.option,
            {
              backgroundColor: getSelectionMode === 1 ? selectionColor : 'white',
              borderTopLeftRadius: roundCorner ? 25 : 0,
              borderBottomLeftRadius: roundCorner ? 25 : 0,
            }
          ]}>
          <Text style={{ color: getSelectionMode === 1 ? 'white' : selectionColor }}>{option1}</Text>
        </TouchableOpacity>
        <View style={styles.verticalLine} />
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(2)}
          style={[
            styles.option,
            {
              backgroundColor: getSelectionMode === 2 ? selectionColor : 'white',
              borderTopRightRadius: roundCorner ? 25 : 0,
              borderBottomRightRadius: roundCorner ? 25 : 0,
            }
          ]}>
          <Text style={{ color: getSelectionMode === 2 ? 'white' : selectionColor }}>{option2}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    color: 'black',
    paddingHorizontal: 3,
  },
  switchContainer: {
    height: 44,
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 2,
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalLine: {
    width: 1,
    height: '100%',
    backgroundColor: '#007BFF'
  }
});

export default CustomSwitch;
