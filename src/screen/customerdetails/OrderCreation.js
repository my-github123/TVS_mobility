import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Modal,
  Platform,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import Swiper from 'react-native-swiper';
import CustomSwitch from '../../components/CustomSwitch';
import CustomTextInput from '../../components/customTextInput';
import CustomButton from '../../components/customTextButton';
import {launchCamera} from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';

const {width} = Dimensions.get('window');

const OrderCreation = ({navigation}) => {

 
  const swiperRef = useRef(null);

  const [carDetailsFormData, setCarDetailsFormData] = useState({
    make: '',
    model: '',
    yearOfManufacture: '',
    trim: '',
    mileage: '',
    color: '',
    transmission: '',
    fuelType: '',
    alteration: '',
    numberOfOwners: '',
  });

  const [carDetailsSecondFormData, setCarDetailsSecondFormData] = useState({
    hasHypothication: '',
    hypothicatedBy: '',
    noc: '',
    roadtaxIsValid: '',
    reRegistered: '',
    cubicCapacity: '',
    numberOfSeats: '',
    registrationType: '',
    registrationDate: '',
    insurance: '',
  });

  const [carDetailsThirdFormData, setCarDetailsThirdFormData] = useState({
    insuranceCompany: '',
    insuranceValidity: '',
    chellanDetails: '',
    blackListed: '',
    chassisNumber: '',
    engineNumber: '',
    rcStatus: '',
    stateNoc: '',
    flood: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [inspectionVisible, setInspectionVisible] = useState(false);
  const [bodyInspectionVisible, setBodyInspectionVisible] = useState(false);
  const [carDetailsInspection, setCarDetailsInspection] = useState(false);
  const [remarks, setRemarks] = useState(Array.from({length: 13}, () => ''));

  const [selectedValues, setSelectedValues] = useState(
    Array.from({length: 8}, () => ''),
  );
  const [bodyInspectionValues, setBodyInspectionValues] = useState(
    Array.from({length: 13}, () => ''),
  );

  const [carDetailsValues, setCarDetailsValues] = useState(
    Array.from({length: 6}, () => ''),
  );

  const [uploadStatus, setUploadStatus] = useState(
    Array.from({length: 3}, () => false),
  );
  const [switchStateForCarDetails, setSwitchStateForCarDetails] = useState(
    Array.from({length: 6}, () => 2),
  );

  const [switchStateForBodyInspection, setSwitchForBodyInspection] = useState(
    Array.from({length: 13}, () => 2),
  );
  const [
    switchStateForMechanicalInspection,
    setSwitchStateForMechanicalInspection,
  ] = useState(Array.from({length: 8}, () => 2));

  const [selectedValuesForCondition, setSelectedValuesForCondition] = useState(
    Array.from({length: 8}, () => ''),
  );
  const [switchStates, setSwitchStates] = useState(
    Array.from({length: 8}, () => false),
  );

  const [selectedDropDownValues, setSelectedDropDownValues] = useState(
    Array.from({length: 8}, () => ''),
  );

  const [inspectionRemarks, setInspectionRemarks] = useState(
    Array.from({length: 8}, () => null),
  );

  const [bodyInspectionRemarks, setBodyInspectionRemarks] = useState(
    Array.from({length: 13}, () => null),
  );

  const [carDetailsRemarks, setCarDetailsRemarks] = useState(
    Array.from({length: 6}, () => null),
  );

  const [photoUris, setPhotoUris] = useState(
    Array.from({length: 13}, () => null),
  );

  const [inspectionPhotos, setInspectionPhotos] = useState(
    Array.from({length: 8}, () => null),
  );

  const [bodyInspectionPhotos, setBodyInspectionPhotos] = useState(
    Array.from({length: 13}, () => null),
  );

  const [carDetailsPhoto, setCarDetailsPhoto] = useState(
    Array.from({length: 6}, () => null),
  );

  const [carDetailsPhoto2, setCarDetailsPhoto2] = useState(
    Array.from({length: 6}, () => null),
  );


  const [selectedContainerIndex, setSelectedContainerIndex] = useState(null);
  const [selectedInspectionIndex, setSelectedInspectionIndex] = useState(null);
  const [selectedBodyInspectionIndex, setSelectedBodyInspectionIndex] =
    useState(null);
  const [carDetailsIndex, setCarDetailsIndex] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  const handleSubmit = () => {
    navigation.navigate('Dashboard');
  };
  const handleIndexChanged = index => {
    setCurrentIndex(index);
  };

  const getProgressBarWidth = () => {
    return `${((currentIndex + 1) / 7) * 100}%`;
  };

  const handleUpload = buttonIndex => {
    openCameraForBodyInspection(selectedBodyInspectionIndex);

    // Update the upload status for the specific button
    const updatedUploadStatus = [...uploadStatus];
    updatedUploadStatus[buttonIndex] = true;
    setUploadStatus(updatedUploadStatus);
  };

  const openCamera = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...photoUris];
        newPhotoUris[selectedContainerIndex] = response.assets[0].uri;
        setPhotoUris(newPhotoUris);
      }
    });
  };

  const openCameraForInspection = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...inspectionPhotos];
        newPhotoUris[selectedInspectionIndex] = response.assets[0].uri;
        setInspectionPhotos(newPhotoUris);
      }
    });
  };

  const openCameraForBodyInspection = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...bodyInspectionPhotos];
        newPhotoUris[selectedBodyInspectionIndex] = response.assets[0].uri;
        setBodyInspectionPhotos(newPhotoUris);
      }
    });
  };

  const openCameraForCarDetails = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...carDetailsPhoto];
        newPhotoUris[carDetailsIndex] = response.assets[0].uri;
        setCarDetailsPhoto(newPhotoUris);
      }
    });
  };

  const openCameraForCarDetailsTwo = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...carDetailsPhoto2];
        newPhotoUris[carDetailsIndex] = response.assets[0].uri;
        setCarDetailsPhoto2(newPhotoUris);
      }
    });
  };




  console.log(carDetailsPhoto[carDetailsIndex],"INDE S AJD AJ D");

  const handleOkPress = () => {
    // if (!remarks[selectedContainerIndex]) {
    //   Alert.alert('Error', 'Remarks field is mandatory');
    //   return;
    // }
    const newValidations = [...validations];
    // Assume validatePhotoAndRemarks is a function that returns true if both photo and remarks are valid
    newValidations[selectedContainerIndex] = validatePhotoAndRemarks(
      selectedContainerIndex,
    );
    setValidations(newValidations);
    setModalVisible(false);
  };

  const handleInspectionOkPress = () => {
    setInspectionVisible(false);
    const newValidations = [...secondValidation];
    // Assume validatePhotoAndRemarks is a function that returns true if both photo and remarks are valid
    newValidations[selectedInspectionIndex] = validatePhotoAndRemarks(
      selectedInspectionIndex,
    );
    setSecondValidation(newValidations);
  };

  const handleBodyInspectionOkPress = () => {
    setBodyInspectionVisible(false);
    const newValidations = [...thirdValidation];
    // Assume validatePhotoAndRemarks is a function that returns true if both photo and remarks are valid
    newValidations[selectedBodyInspectionIndex] = validatePhotoAndRemarks(
      selectedBodyInspectionIndex,
    );
    setThirdValidation(newValidations);
  };

  const handleCarDetailsOkPress = () => {
    setCarDetailsInspection(false);
    const newValidations = [...carValidation];
    // Assume validatePhotoAndRemarks is a function that returns true if both photo and remarks are valid
    newValidations[carDetailsIndex] = validatePhotoAndRemarks(carDetailsIndex);
    //setCa(newValidations);
    setCarDetailsValidation(newValidations);
  };

  const handleCancelPress = () => {
    setSelectedContainerIndex(null);
    setModalVisible(false);
  };

  const handleClosePress = index => {
    const newPhotoUris = [...photoUris];
    newPhotoUris[index] = null;
    const newRemarks = [...remarks];
    newRemarks[index] = '';
    setPhotoUris(newPhotoUris);
    setRemarks(newRemarks);
  };

  const handleInspectionClosePress = index => {
    const newPhotoUris = [...inspectionPhotos];
    newPhotoUris[index] = null;
    const newRemarks = [...inspectionRemarks];
    newRemarks[index] = '';
    setInspectionPhotos(newPhotoUris);
    setInspectionRemarks(newRemarks);
  };

  const handleBodyInspectionClosePress = index => {
    const newPhotoUris = [...bodyInspectionPhotos];
    newPhotoUris[index] = null;
    const newRemarks = [...bodyInspectionRemarks];
    newRemarks[index] = '';

    setBodyInspectionPhotos(newPhotoUris);
    setBodyInspectionRemarks(newRemarks);
  };

  const handleCarDetailsClosePress = index => {
    const newPhotoUris = [...carDetailsPhoto];
    newPhotoUris[index] = null;
    const newRemarks = [...carDetailsRemarks];
    newRemarks[index] = '';

    setCarDetailsPhoto(newPhotoUris);
    setCarDetailsRemarks(newRemarks);
  };

  const handleSelectContainerPress = index => {
    setSelectedContainerIndex(index);
    setModalVisible(true);
  };

  const handleBodyInspectionContainerPress = index => {
    setSelectedBodyInspectionIndex(index);
    setBodyInspectionVisible(true);

    const newValidations = [...thirdValidation];
    // Assume validatePhotoAndRemarks is a function that returns true if both photo and remarks are valid
    newValidations[index] = validatePhotoAndRemarks(index);
    setThirdValidation(newValidations);
  };

  const carDetailsContainerPress = index => {
    setCarDetailsIndex(index);
    setCarDetailsInspection(true);

    const newValidations = [...carValidation];
    // Assume validatePhotoAndRemarks is a function that returns true if both photo and remarks are valid
    newValidations[index] = validatePhotoAndRemarks(index);
    setCarDetailsValidation(newValidations);
  };

  const handleMechanicalInspectionPress = index => {
    setSelectedInspectionIndex(index);
    setInspectionVisible(true);
  };
  const validatePhotoAndRemarks = index => {
    // Add your validation logic here
    // Return true if valid, false otherwise
    return true; // Replace with actual validation logic
  };

  const handleRemarksChange = (text, index) => {
    const newRemarks = [...remarks];
    newRemarks[index] = text;
    setRemarks(newRemarks);
  };

  const handleInspectionRemarks = (text, index) => {
    const newRemarks = [...inspectionRemarks];
    newRemarks[index] = text;
    setInspectionRemarks(newRemarks);
  };

  const handleBodyInspectionRemarks = (text, index) => {
    const newRemarks = [...bodyInspectionRemarks];
    newRemarks[index] = text;
    setBodyInspectionRemarks(newRemarks);
  };

  const handleCarDetailsRemarks = (text, index) => {
    const newRemarks = [...carDetailsRemarks];
    newRemarks[index] = text;
    setCarDetailsRemarks(newRemarks);
  };

  const handleInputChange = (text, field) => {
    setCarDetailsFormData(prevState => ({
      ...prevState,
      [field]: text,
    }));
  };

  const handleSecondInputChange = (text, field) => {
    setCarDetailsSecondFormData(prevState => ({
      ...prevState,
      [field]: text,
    }));
  };

  const handleThirdInputChange = (text, field) => {
    setCarDetailsThirdFormData(prevState => ({
      ...prevState,
      [field]: text,
    }));
  };

  const toggleSwitch = index => {
    const newSwitchStates = [...switchStates];
    newSwitchStates[index] = !newSwitchStates[index]; // Toggle the value at the specified index
    setSwitchStates(newSwitchStates);
  };

  const toggleWitchForBodyInspection = index => {
    const newSwitchStates = [...switchStateForBodyInspection];
    newSwitchStates[index] = !newSwitchStates[index]; // Toggle the value at the specified index
    setSwitchForBodyInspection(newSwitchStates);
  };

  // const handlePickerChange = (value, index) => {
  //   const newValues = [...selectedValues];
  //   newValues[index] = value;
  //   setSelectedValues(newValues);
  // };

  const handleDropdownChange = (value, index) => {
    const newSelectedValues = [...selectedValues];
    newSelectedValues[index] = value;
    setSelectedValues(newSelectedValues);
  };

  const handleBodyInspectionDropDown = (value, index) => {
    const newSelectedValues = [...bodyInspectionValues];
    newSelectedValues[index] = value;
    setBodyInspectionValues(newSelectedValues);
  };

  const handleCarDetailsDropDown = (value, index) => {
    const newSelectionValues = [...carDetailsValues];
    newSelectionValues[index] = value;
    setCarDetailsValues(newSelectionValues);
  };
  const handleDropDownForCondition = (value, index) => {
    const newSelectedValues = [...selectedValuesForCondition];
    newSelectedValues[index] = value;
    setSelectedValuesForCondition(newSelectedValues);
  };

  const handleSwitchChange = (index, value) => {
    const newState = [...switchStateForCarDetails];
    newState[index] = value; // 1 for Yes and 2 for No
    setSwitchStateForCarDetails(newState);
  };

  const handleBodyInspectionChange = (index, value) => {
    const newState = [...switchStateForBodyInspection];
    newState[index] = value; // 1 for Yes and 2 for No
    setSwitchForBodyInspection(newState);
  };

  const handleMechanicalInspectionChange = (index, value) => {
    const newState = [...switchStateForMechanicalInspection];
    newState[index] = value; // 1 for Yes and 2 for No
    setSwitchStateForMechanicalInspection(newState);
  };

  const photoTitles = [
    'RC',
    'Insurance',
    'NOC',
    'Front View',
    'Rear View',
    'LHS View',
    'RHS View',
    'Odo Meter',
    'Roof',
    'Interior',
    'Under Chassis',
    'Engine Room',
    'Trunk Boot',
  ];

  const mechanicalInspection = [
    'Suspension',
    'Steering',
    'Brake',
    'Transmission',
    'Engine',
    'Electrical',
    'AC',
    'Accesssories',
  ];

  const bodyInspection = [
    'Pillars',
    'Apron',
    'Fenders',
    'Quater Panels',
    'Running Board',
    'Doors',
    'Dicky Door',
    'Dicky Skirt',
    'Bonet',
    'Support Members',
    'Bumper',
    'Wheel Type',
    'Windshield',
  ];

  const carDetails = [
    'Chassis Punch',
    'Vin plate',
    'Tyres',
    'Spare Wheel',
    'Tool Kit/Jack',
    'Key',
  ];

  const [validations, setValidations] = useState(
    Array(photoTitles.length).fill(false),
  );

  const [thirdValidation, setThirdValidation] = useState(
    Array(photoTitles.length).fill(false),
  );

  const [carValidation, setCarDetailsValidation] = useState(
    Array(carDetails.length).fill(false),
  );

  const [secondValidation, setSecondValidation] = useState(
    Array(mechanicalInspection.length).fill(false),
  );

  const handlePrevious = () => {
    if (currentIndex === 0) {
      navigation.goBack();
    } else {
      if (swiperRef.current) {
        swiperRef.current.scrollBy(-1);
      }
    }
  };

  return (
    <>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{textAlign: 'right', marginRight: 8}}>Close</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {photoUris[selectedContainerIndex] ? (
                <View style={{paddingHorizontal: 12, marginTop: 12}}>
                  <Image
                    source={{uri: photoUris[selectedContainerIndex]}}
                    style={styles.uploadedImage}
                  />
                  <TextInput
                    style={styles.photoInput}
                    placeholder="Enter remarks"
                    value={remarks[selectedContainerIndex]}
                    onChangeText={text =>
                      handleRemarksChange(text, selectedContainerIndex)
                    }
                  />
                  <View>
                    <TouchableOpacity
                      style={styles.closeButton1}
                      onPress={() => handleClosePress(selectedContainerIndex)}>
                      <Text style={styles.closeButtonText1}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={{paddingHorizontal: 8}}>
                  <TouchableOpacity
                    style={styles.photoInput}
                    onPress={() => openCamera()}>
                    <Text>Upload</Text>
                  </TouchableOpacity>
                </View>
              )}
              <View style={{paddingHorizontal: 8, marginTop: 20}}>
                <CustomButton title="Submit" onPress={handleOkPress} />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={inspectionVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setInspectionVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => setInspectionVisible(false)}>
              <Text style={{textAlign: 'right', marginRight: 8}}>Close</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {selectedValues[selectedInspectionIndex] !== undefined && (
                <Picker
                  style={styles.picker}
                  selectedValue={selectedValues[selectedInspectionIndex]}
                  onValueChange={itemValue =>
                    handleDropdownChange(itemValue, selectedInspectionIndex)
                  }>
                  <Picker.Item label="Select DropDown" value="" />
                  <Picker.Item label="Pad" value="Pad" />
                  <Picker.Item label="Disc" value="disc" />
                  {/* Add other items as needed */}
                </Picker>
              )}
              {/* {switchStates[selectedInspectionIndex] !== undefined && (
              <View style={styles.switchRow}>
                <View style={styles.switchButton}>
                  <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={switchStates[selectedInspectionIndex] ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => toggleSwitch(selectedInspectionIndex)}
                    value={switchStates[selectedInspectionIndex]}
                  />
                </View>
                <View style={styles.switchButton}>
                  <Text style={styles.switchText}>
                    {switchStates[selectedInspectionIndex] ? 'Yes' : 'No'}
                  </Text>
                </View>
              </View>
            )} */}

              {switchStateForMechanicalInspection.map((state, index) => (
                <>
                  {selectedInspectionIndex === index && (
                    <View style={{alignItems: 'center', margin: 20}}>
                      <CustomSwitch
                        selectionMode={state}
                        roundCorner={false}
                        option1={'Yes'}
                        option2={'No'}
                        onSelectSwitch={val =>
                          handleMechanicalInspectionChange(index, val)
                        }
                        selectionColor={'#007BFF'}
                        index={index} // Pass the index as a prop
                      />
                    </View>
                  )}
                </>
              ))}

              {inspectionPhotos[selectedInspectionIndex] ? (
                <View style={styles.photoContainer}>
                  <Image
                    source={{uri: inspectionPhotos[selectedInspectionIndex]}}
                    style={styles.uploadedImage}
                  />

                  {selectedValuesForCondition[selectedInspectionIndex] !==
                    undefined && (
                    <Picker
                      style={styles.picker}
                      selectedValue={
                        selectedValuesForCondition[selectedInspectionIndex]
                      }
                      onValueChange={itemValue =>
                        handleDropDownForCondition(
                          itemValue,
                          selectedInspectionIndex,
                        )
                      }>
                      <Picker.Item label="Select DropDown" value="" />
                      <Picker.Item label="Pad" value="Pad" />
                      <Picker.Item label="Disc" value="disc" />
                      {/* Add other items as needed */}
                    </Picker>
                  )}

                  <TextInput
                    style={styles.photoInput}
                    placeholder="Enter remarks"
                    value={inspectionRemarks[selectedInspectionIndex]}
                    onChangeText={text =>
                      handleInspectionRemarks(text, selectedInspectionIndex)
                    }
                  />
                  <View>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() =>
                        handleInspectionClosePress(selectedInspectionIndex)
                      }>
                      <Text style={styles.closeButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={{paddingHorizontal: 8}}>
                  <TouchableOpacity
                    style={styles.photoInput}
                    onPress={() => openCameraForInspection()}>
                    <Text>Upload</Text>
                  </TouchableOpacity>
                </View>
              )}
              <View style={{paddingHorizontal: 8, marginTop: 18}}>
                <CustomButton
                  title="Submit"
                  onPress={handleInspectionOkPress}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={bodyInspectionVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setBodyInspectionVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => setBodyInspectionVisible(false)}>
              <Text style={{textAlign: 'right', marginRight: 8}}>Close</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {/* {switchStateForBodyInspection[selectedBodyInspectionIndex] !== undefined && (
                <View style={styles.switchContainer}>
                  <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={
                      switchStateForBodyInspection[selectedBodyInspectionIndex]
                        ? '#f5dd4b'
                        : '#f4f3f4'
                    }
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() =>
                      toggleWitchForBodyInspection(selectedBodyInspectionIndex)
                    }
                    value={
                      switchStateForBodyInspection[selectedBodyInspectionIndex]
                    }
                  />
                  <Text>
                    {switchStateForBodyInspection[selectedBodyInspectionIndex]
                      ? 'Yes'
                      : 'No'}
                  </Text>
                </View>
              )} */}

              {switchStateForBodyInspection.map((state, index) => (
                <>
                  {selectedBodyInspectionIndex === index && (
                    <View style={{alignItems: 'center', margin: 20}}>
                      <CustomSwitch
                        selectionMode={state}
                        roundCorner={false}
                        option1={'Yes'}
                        option2={'No'}
                        onSelectSwitch={val =>
                          handleBodyInspectionChange(index, val)
                        }
                        selectionColor={'#007BFF'}
                        index={index} // Pass the index as a prop
                      />
                    </View>
                  )}
                </>
              ))}

              {bodyInspectionPhotos[selectedBodyInspectionIndex] ? (
                <View style={styles.photoContainer}>
                  <Image
                    source={{
                      uri: bodyInspectionPhotos[selectedBodyInspectionIndex],
                    }}
                    style={styles.uploadedImage}
                  />

                  {bodyInspectionValues[selectedBodyInspectionIndex] !==
                    undefined && (
                    <Picker
                      style={styles.picker}
                      selectedValue={
                        bodyInspectionValues[selectedBodyInspectionIndex]
                      }
                      onValueChange={itemValue =>
                        handleBodyInspectionDropDown(
                          itemValue,
                          selectedBodyInspectionIndex,
                        )
                      }>
                      <Picker.Item label="Select Condition" value="" />
                      <Picker.Item label="Pad" value="Pad" />
                      <Picker.Item label="Disc" value="disc" />
                      {/* Add other items as needed */}
                    </Picker>
                  )}

                  <TextInput
                    style={styles.photoInput}
                    placeholder="Enter remarks"
                    value={bodyInspectionRemarks[selectedBodyInspectionIndex]}
                    onChangeText={text =>
                      handleBodyInspectionRemarks(
                        text,
                        selectedBodyInspectionIndex,
                      )
                    }
                  />
                  <View>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() =>
                        handleBodyInspectionClosePress(
                          selectedBodyInspectionIndex,
                        )
                      }>
                      <Text style={styles.closeButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={{paddingHorizontal: 8}}>
                  <TouchableOpacity
                    style={styles.photoInput}
                    onPress={() => openCameraForBodyInspection()}>
                    <Text>Upload</Text>
                  </TouchableOpacity>
                </View>
              )}
              <View style={{paddingHorizontal: 8, marginTop: 18}}>
                <CustomButton
                  title="Submit"
                  onPress={handleBodyInspectionOkPress}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={carDetailsInspection}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCarDetailsInspection(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => setCarDetailsInspection(false)}>
              <Text style={{textAlign: 'right', marginRight: 8}}>Close</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {/* {switchStateForBodyInspection[selectedBodyInspectionIndex] !== undefined && (
                <View style={styles.switchContainer}>
                  <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={
                      switchStateForBodyInspection[selectedBodyInspectionIndex]
                        ? '#f5dd4b'
                        : '#f4f3f4'
                    }
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() =>
                      toggleWitchForBodyInspection(selectedBodyInspectionIndex)
                    }
                    value={
                      switchStateForBodyInspection[selectedBodyInspectionIndex]
                    }
                  />
                  <Text>
                    {switchStateForBodyInspection[selectedBodyInspectionIndex]
                      ? 'Yes'
                      : 'No'}
                  </Text>
                </View>
              )} */}
              {/* {switchStateForBodyInspection[carDetailsIndex] !== undefined && (
        <View key={carDetailsIndex} style={{ alignItems: 'center', margin: 20 }}>
          <CustomSwitch
            selectionMode={2}
            roundCorner={false}
            option1={'Yes'}
            option2={'No'}
            onSelectSwitch={(val) => handleSwitchChange(carDetailsIndex, val)}
            selectionColor={'#007BFF'}
            index={carDetailsIndex} // Pass the index as a prop
          />
        </View>
      )} */}

              {switchStateForCarDetails.map((state, index) => (
                <>
                  {carDetailsIndex === index && (
                    <View style={{alignItems: 'center', margin: 20}}>
                      <CustomSwitch
                        selectionMode={state}
                        roundCorner={false}
                        option1={'Yes'}
                        option2={'No'}
                        onSelectSwitch={val => handleSwitchChange(index, val)}
                        selectionColor={'#007BFF'}
                        index={index} // Pass the index as a prop
                      />
                    </View>
                  )}
                </>
              ))}

              {carDetailsPhoto2[carDetailsIndex] && (
                <>
                  <Image
                  source={{
                    uri: carDetailsPhoto2[carDetailsIndex],
                  }}
                  style={styles.uploadedImage}
                />
                </>
                
              )}

              {carDetailsPhoto[carDetailsIndex] ? (
                <View style={styles.photoContainer}>
                  <Image
                    source={{
                      uri: carDetailsPhoto[carDetailsIndex],
                    }}
                    style={styles.uploadedImage}
                  />

                  
     
                  {carDetailsValues[carDetailsIndex] !== undefined && (
                    <Picker
                      style={styles.picker}
                      selectedValue={carDetailsValues[carDetailsIndex]}
                      onValueChange={itemValue =>
                        handleCarDetailsDropDown(itemValue, carDetailsIndex)
                      }>
                      <Picker.Item label="Select Condition" value="" />
                      <Picker.Item label="Pad" value="Pad" />
                      <Picker.Item label="Disc" value="disc" />
                      {/* Add other items as needed */}
                    </Picker>
                  )}

                  <TextInput
                    style={styles.photoInput}
                    placeholder="Enter remarks"
                    value={carDetailsRemarks[carDetailsIndex]}
                    onChangeText={text =>
                      handleCarDetailsRemarks(text, carDetailsIndex)
                    }
                  />
                  <View>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() =>
                        handleCarDetailsClosePress(carDetailsIndex)
                      }>
                      <Text style={styles.closeButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
              <></>
              )}
                <View style={{paddingHorizontal: 8}}>
                  {carDetailsIndex===3 ?(
                    <>
                    {carDetailsPhoto[carDetailsIndex] ==null  && (
                       <TouchableOpacity
                       style={styles.photoInput}
                       onPress={() => openCameraForCarDetails()}>
                       <Text>Upload</Text>
                     </TouchableOpacity>

                    )}

{carDetailsPhoto2[carDetailsIndex] ==null  && (
                    
                   <TouchableOpacity
                   style={styles.photoInput}
                   onPress={() => openCameraForCarDetailsTwo()}>
                   <Text>Upload</Text>
                 </TouchableOpacity>
)}
                 <TouchableOpacity
                 style={styles.photoInput}
                 onPress={() => openCameraForCarDetails()}>
                 <Text>Upload</Text>
               </TouchableOpacity>
               </>

                  ):(
                    <>
                    <TouchableOpacity
                    style={styles.photoInput}
                    onPress={() => openCameraForCarDetails()}>
                    <Text>Upload</Text>
                  </TouchableOpacity>
                    
                    </>
                  )}
                 
                </View>
              <View style={{paddingHorizontal: 8, marginTop: 18}}>
                <CustomButton
                  title="Submit"
                  onPress={handleCarDetailsOkPress}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <View style={[styles.profileContainer, {height: 55}]}>
        <TouchableOpacity onPress={() => handlePrevious()}>
          <Image
            source={require('../../../assets/images/back.png')}
            style={{width: 40, height: 43, marginTop: 3}}
          />
        </TouchableOpacity>

        <Text
          style={{
            marginTop: 16,
            color: 'black',
            fontFamily: 'DMSans-Medium',
            marginLeft: 6,
          }}>
          Back
        </Text>
      </View>
      <Swiper
        ref={swiperRef}
        loop={false}
        scrollEnabled={false}
        showsButtons={false}
        onIndexChanged={handleIndexChanged}
        dot={<View style={{backgroundColor: 'transparent'}} />}
        activeDot={<View style={{backgroundColor: 'transparent'}} />}>
        <View style={styles.slide}>
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBar, {width: getProgressBarWidth()}]}
            />
          </View>
          <Text style={styles.indicator}>{`${currentIndex + 1}/7`}</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperContainer}>
              {[
                'Make',
                'Model',
                'Year of Manufacture',
                'Trim / Variant',
                'Mileage',
                'Color',
                'Transmission',
                'Fuel type',
                'Alteration',
                'Number of Owners',
              ].map((label, index) => (
                <CustomTextInput
                  key={index}
                  label={label}
                  value={
                    carDetailsFormData[label.replace(/ /g, '').toLowerCase()]
                  }
                  onChangeText={text =>
                    handleInputChange(
                      text,
                      label.replace(/ /g, '').toLowerCase(),
                    )
                  }
                  placeholder={`Enter your ${label.toLowerCase()}`}
                />
              ))}
              <View style={{bottom: 25, marginTop: 20}}>
                <CustomButton title="Next" onPress={handleNext} />
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={styles.slide}>
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBar, {width: getProgressBarWidth()}]}
            />
          </View>
          <Text style={styles.indicator}>{`${currentIndex + 1}/7`}</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperContainer}>
              {[
                'Has Hypothication',
                'Hypothicated by',
                'NOC',
                'Road tax is valid',
                'Re-Registered',
                'Cubic Capacity',
                'Number of seats',
                'Registration type',
                'Registration Date',
                'Insurance',
              ].map((label, index) => (
                <CustomTextInput
                  key={index}
                  label={label}
                  value={
                    carDetailsSecondFormData[
                      label.replace(/ /g, '').toLowerCase()
                    ]
                  }
                  onChangeText={text =>
                    handleSecondInputChange(
                      text,
                      label.replace(/ /g, '').toLowerCase(),
                    )
                  }
                  placeholder={`Enter your ${label.toLowerCase()}`}
                />
              ))}
              <View style={{bottom: 25, marginTop: 20}}>
                <CustomButton title="Next" onPress={handleNext} />
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={styles.slide}>
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBar, {width: getProgressBarWidth()}]}
            />
          </View>
          <Text style={styles.indicator}>{`${currentIndex + 1}/7`}</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperContainer}>
              {[
                'Insurance Company',
                'Insurance Validity',
                'Challan Details',
                'Blacklisted',
                'Chassis Number',
                'Engine Number',
                'RC Status',
                'State NOC',
                'Flood',
              ].map((label, index) => (
                <CustomTextInput
                  key={index}
                  label={label}
                  value={
                    carDetailsThirdFormData[
                      label.replace(/ /g, '').toLowerCase()
                    ]
                  }
                  onChangeText={text =>
                    handleThirdInputChange(
                      text,
                      label.replace(/ /g, '').toLowerCase(),
                    )
                  }
                  placeholder={`Enter your ${label.toLowerCase()}`}
                />
              ))}
              <View style={{bottom: 25, marginTop: 20}}>
                <CustomButton title="Next" onPress={handleNext} />
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={styles.slide}>
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBar, {width: getProgressBarWidth()}]}
            />
          </View>
          <Text style={styles.indicator}>{`${currentIndex + 1}/7`}</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperContainer}>
              {photoTitles.map((title, index) => (
                <View key={index} style={styles.photoContainer}>
                  <Text style={styles.label}>{title}</Text>
                  <TouchableOpacity
                    style={styles.photoInput}
                    onPress={() => handleSelectContainerPress(index)}>
                    <Text>Select</Text>
                  </TouchableOpacity>
                  <Text style={{textAlign: 'right'}}>
                    {validations[index] ? '✅' : '☒'}
                  </Text>
                </View>
              ))}

              <View style={{bottom: 25, marginTop: 20}}>
                <CustomButton title="Next" onPress={handleNext} />
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.slide}>
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBar, {width: getProgressBarWidth()}]}
            />
          </View>
          <Text style={styles.indicator}>{`${currentIndex + 1}/7`}</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperContainer}>
              {carDetails.map((title, index) => (
                <View key={index} style={styles.photoContainer}>
                  <Text style={styles.label}>{title}</Text>
                  <TouchableOpacity
                    style={styles.photoInput}
                    onPress={() => carDetailsContainerPress(index)}>
                    <Text>Select</Text>
                  </TouchableOpacity>
                  <Text style={{textAlign: 'right'}}>
                    {carValidation[index] ? '✅' : '☒'}
                  </Text>
                </View>
              ))}

              <View style={{bottom: 25, marginTop: 20}}>
                <CustomButton title="Next" onPress={handleNext} />
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.slide}>
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBar, {width: getProgressBarWidth()}]}
            />
          </View>
          <Text style={styles.indicator}>{`${currentIndex + 1}/7`}</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperContainer}>
              {bodyInspection.map((title, index) => (
                <View key={index} style={styles.photoContainer}>
                  <Text style={styles.label}>{title}</Text>
                  <TouchableOpacity
                    style={styles.photoInput}
                    onPress={() => handleBodyInspectionContainerPress(index)}>
                    <Text>Select</Text>
                  </TouchableOpacity>
                  <Text style={{textAlign: 'right'}}>
                    {thirdValidation[index] ? '✅' : '☒'}
                  </Text>
                </View>
              ))}

              <View style={{bottom: 25, marginTop: 20}}>
                <CustomButton title="Next" onPress={handleNext} />
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.slide}>
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBar, {width: getProgressBarWidth()}]}
            />
          </View>
          <Text style={styles.indicator}>{`${currentIndex + 1}/7`}</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperContainer}>
              {mechanicalInspection.map((title, index) => (
                <View key={index} style={styles.photoContainer}>
                  <Text style={styles.label}>{title}</Text>
                  <TouchableOpacity
                    style={styles.photoInput}
                    onPress={() => handleMechanicalInspectionPress(index)}>
                    <Text>{secondValidation[index] ? 'Update / View' : 'Select'}</Text>
                  </TouchableOpacity>
                  <Text style={{textAlign: 'right'}}>
                    {secondValidation[index] ? '✅' : '☒'}
                  </Text>
                </View>
              ))}

              <View style={{bottom: 25, marginTop: 20}}>
                <CustomButton title="Submit" onPress={() => handleSubmit()} />
              </View>
            </View>
          </ScrollView>
        </View>
      </Swiper>
    </>
  );
};

const elevationStyle = Platform.select({
  ios: {
    // shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  android: {
    elevation: 3,
  },
});

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 14,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginTop: 25,
    height: 45,
  },
  wrapperContainer: {
    marginTop: 0,
  },
  indicator: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  progressBarContainer: {
    height: 8,
    width: '100%',
    marginTop: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 4,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 16,
    maxHeight: '80%', // Adjust the height as needed
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  uploadedImage: {
    width: '100%',
    height: 320,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    bottom: 450,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
  },
  closeButton1: {
    position: 'absolute',
    bottom: 370,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
  },
  closeButtonText: {
    color: 'white',
  },
  closeButtonText1: {
    color: 'white',
  },
  picker: {
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#f7f8f9',
    borderColor: '#e8ecf4',
    borderWidth: 1,
    height: 40,
    marginTop: 25,
    marginHorizontal: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchText: {
    fontSize: 18,
  },

  photoContainer: {
    marginVertical: 10,
  },
  photoInput: {
    width: '100%',
    height: 46,
    backgroundColor: '#f7f8f9',
    //  height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    //marginTop: 3,
  },
  photoInput1: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    height: 40,
    marginVertical: 10,
    width: '100%',
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    //  marginVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    // padding: 5,
    // height: 55,
    ...elevationStyle, // Apply elevation or shadow based on platform
  },
});

export default OrderCreation;
