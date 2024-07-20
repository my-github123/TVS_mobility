import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, View, Text, TouchableOpacity, Modal, Button } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { format, parseISO, isValid } from 'date-fns';

const CustomTextInputWithDatePicker = ({ label, value, onChangeText, placeholder, secureTextEntry, editable = true, style, ...props }) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (value && value !== 'null 00:00:00') {
      // Trim the value to remove any extra parts if necessary
      const trimmedValue = value.split(' ')[0];
      try {
        const parsedDate = parseISO(trimmedValue);
        if (isValid(parsedDate)) {
          setSelectedDate(parsedDate);
        } else {
          setSelectedDate(null);
        }
      } catch (error) {
        setSelectedDate(null);
      }
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  const handleConfirm = (date) => {
    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      setDatePickerVisible(false);
      setSelectedDate(date);
      onChangeText(formattedDate);
    } catch (error) {
      console.error('Invalid date format', error);
    }
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
            value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
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
              date={selectedDate || new Date()}
              onDateChange={setSelectedDate}
              mode="date"
            />
            <Button title="Confirm" onPress={() => handleConfirm(selectedDate || new Date())} />
            <Button title="Cancel" style={{ marginTop: 4 }} onPress={handleCancel} />
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
