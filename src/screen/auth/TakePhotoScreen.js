// Import necessary components and hooks
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

const TakePhotoScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [photoUris, setPhotoUris] = useState(Array.from({ length: 5 }, () => null));
  const [selectedContainerIndex, setSelectedContainerIndex] = useState(null);

  // Function to open the camera


  return (
    <View style={styles.container}>
      {/* Modal for uploading and displaying the image */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {photoUris[selectedContainerIndex] ? (
            <>
            <Image source={{ uri: photoUris[selectedContainerIndex] }} style={styles.uploadedImage} />
            <TouchableOpacity
            style={styles.closeButton}
            onPress={() => handleClosePress(selectedContainerIndex)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          </>
            
          ) : (
            <TouchableOpacity style={styles.uploadButton} onPress={openCamera}>
              <Text>Upload</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.okButton} onPress={handleOkPress}>
            <Text>OK</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancelPress}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Render the Select containers */}
      {[1, 2, 3, 4, 5].map(index => (
        <TouchableOpacity
          key={index}
          style={styles.selectContainer}
          onPress={() => handleSelectContainerPress(index - 1)}
        >
          <Text>Select</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectContainer: {
    backgroundColor: 'lightblue',
    padding: 20,
    margin: 10,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: 'lightgreen',
    padding: 20,
    margin: 10,
  },
  uploadedImage: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  okButton: {
    backgroundColor: 'lightblue',
    padding: 20,
    margin: 10,
  },
  cancelButton: {
    backgroundColor: 'lightcoral',
    padding: 20,
    margin: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
  },
  closeButtonText: {
    color: 'white',
  },
});

export default TakePhotoScreen;
