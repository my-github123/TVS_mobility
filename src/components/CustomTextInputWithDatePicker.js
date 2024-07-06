import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, View, Text, TouchableOpacity, Modal, Button } from 'react-native';
import DatePicker from 'react-native-date-picker';

const CustomTextInputWithDatePicker = ({ label, value, onChangeText, placeholder, secureTextEntry, editable = true, style, ...props }) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // Initialize with null

  useEffect(() => {
    // Update selectedDate when value changes (like when props.value changes)
    if (value) {
      setSelectedDate(new Date(value));
    } else {
      setSelectedDate(null); // Reset to null if value is empty
    }
  }, [value]);

  const handleConfirm = (date) => {
    setDatePickerVisible(false);
    setSelectedDate(date);
    onChangeText(date.toISOString().split('T')[0]); // Formatting date to YYYY-MM-DD
  };

  const handleCancel = () => {
    setDatePickerVisible(false);
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
        <View pointerEvents="none">
          <TextInput
            value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
            placeholder={placeholder}
            editable={editable}
            secureTextEntry={secureTextEntry}
            style={styles.input}
            {...props}
          />
        </View>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={isDatePickerVisible}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.datePickerContainer}>
            <DatePicker
              date={selectedDate || new Date()} // Use selectedDate or default to current date
              onDateChange={setSelectedDate}
              mode="date"
            />
            <Button title="Confirm" onPress={() => handleConfirm(selectedDate || new Date())} />
            <Button title="Cancel" style={{marginTop:4}} onPress={handleCancel} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    marginTop: 4,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    color: 'black',
    paddingHorizontal: 3,
  },
  input: {
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#f7f8f9',
    borderColor: '#e8ecf4',
    borderWidth: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  datePickerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
});

export default CustomTextInputWithDatePicker;
