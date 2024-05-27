import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import Swiper from 'react-native-swiper';
import CustomTextInput from '../../components/customTextInput';
import CustomButton from '../../components/customTextButton';
import {launchCamera} from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';

const {width} = Dimensions.get('window');

const OrderCreation = () => {
  const swiperRef = useRef(null);
  const [formData, setFormData] = useState({
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

  const [username, setUsername] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [inspectionVisible, setInspectionVisible] = useState(false);
  const [bodyInspectionVisible, setBodyInspectionVisible] = useState(false);
  const [remarks, setRemarks] = useState(Array.from({length: 13}, () => ''));
  //const [selectedValues, setSelectedValues] = useState(["", "", ""]);
  const [selectedValues, setSelectedValues] = useState(
    Array.from({length: 8}, () => ''),
  );
  const [bodyInspectionValues, setBodyInspectionValues] = useState(
    Array.from({length: 13}, () => ''),
  );

  const [uploadStatus, setUploadStatus] = useState(
    Array.from({ length: 3 }, () => false)
  );
  const [switchStateForBodyInspection, setSwitchForBodyInspection] = useState(
    Array.from({length: 13}, () => false),
  );

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
  const [selectedValue, setSelectedValue] = useState('0');

  const [photoUris, setPhotoUris] = useState(
    Array.from({length: 13}, () => null),
  );

  const [inspectionPhotos, setInspectionPhotos] = useState(
    Array.from({length: 8}, () => null),
  );

  const [bodyInspectionPhotos, setBodyInspectionPhotos] = useState(
    Array.from({length: 13}, () => null),
  );
  const [selectedContainerIndex, setSelectedContainerIndex] = useState(null);
  const [selectedInspectionIndex, setSelectedInspectionIndex] = useState(null);
  const [selectedBodyInspectionIndex, setSelectedBodyInspectionIndex] =
    useState(null);

  console.log(selectedInspectionIndex, 'seleuhduhushdj');

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  const handleIndexChanged = index => {
    setCurrentIndex(index);
  };

  const getProgressBarWidth = () => {
    return `${((currentIndex + 1) / 8) * 100}%`;
  };

  const handleUpload = (buttonIndex) => {
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

  const handleOkPress = () => {
    // if (!remarks[selectedContainerIndex]) {
    //   Alert.alert('Error', 'Remarks field is mandatory');
    //   return;
    // }
    setModalVisible(false);
  };

  const handleInspectionOkPress = () => {
    setInspectionVisible(false);
  };

  const handleBodyInspectionOkPress = () => {
    setBodyInspectionVisible(false);
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

  const handleSelectContainerPress = index => {
    setSelectedContainerIndex(index);
    setModalVisible(true);
    const newValidations = [...validations];
    // Assume validatePhotoAndRemarks is a function that returns true if both photo and remarks are valid
    newValidations[index] = validatePhotoAndRemarks(index);
    setValidations(newValidations);
  };

  const handleBodyInspectionContainerPress = index => {
    setSelectedBodyInspectionIndex(index);
    setBodyInspectionVisible(true);
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

  const handleInputChange = (text, field) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: text,
    }));
  };

  const optionsMapping = {
    1: [
      {label: 'Strut', value: 'Strut'},
      {label: 'Lower Arm', value: 'Lower Arm'},
      {label: 'Link Rod', value: 'Link Rod'},
      {label: 'Stablizer Bar', value: 'Stablizer Bar'},
      {label: 'Shock Absorber', value: 'Shock Absorber'},
      {label: 'Coil Spring', value: 'Coil Spring'},
      {label: 'Leaf Spring', value: 'Leaf Spring'},
    ],
    2: [
      {label: 'Rack and Pinion', value: 'Rack and Pinion'},
      {label: 'Steering Column', value: 'Steering Column'},
      {label: 'Hardness', value: 'Hardness'},
      {label: 'Ball Joint End', value: 'Ball Joint End'},
    ],
    // Add more indices and options here
  };

  const options = [
    [
      {label: 'Choose option', value: ''},
      {label: 'Option 1', value: 'option1'},
      {label: 'Option 2', value: 'option2'},
      {label: 'Option 3', value: 'option3'},
    ],
    [
      {label: 'Choose option', value: ''},
      {label: 'Option 1', value: 'option1'},
      {label: 'Option 2', value: 'option2'},
      {label: 'Option 3', value: 'option3'},
    ],
    [
      {label: 'Choose option', value: ''},
      {label: 'Optoins 1', value: 'wow'},
      {label: 'Sok 2', value: 'wowr'},
      {label: 'Optiadson 3', value: 'wwow'},
    ],
  ];

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

  const handleDropDownForCondition = (value, index) => {
    const newSelectedValues = [...selectedValuesForCondition];
    newSelectedValues[index] = value;
    setSelectedValuesForCondition(newSelectedValues);
  };

  const photoTitles = [
    'RC',
    'Photo 2',
    'Photo 3',
    'Photo 4',
    'Photo 5',
    'Photo 6',
    'Photo 7',
    'Photo 8',
    'Photo 9',
    'Photo 10',
    'Photo 11',
    'Photo 12',
    'Photo 13',
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

  const [validations, setValidations] = useState(
    Array(photoTitles.length).fill(false),
  );

  return (
    <>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={{textAlign: 'right', marginRight: 8}}>Close</Text>
          </TouchableOpacity>
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
                  style={styles.closeButton}
                  onPress={() => handleClosePress(selectedContainerIndex)}>
                  <Text style={styles.closeButtonText}>Cancel</Text>
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
          <View style={{paddingHorizontal: 8}}>
            <CustomButton title="Submit" onPress={handleOkPress} />
          </View>
        </View>
      </Modal>

      <Modal
        visible={inspectionVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setInspectionVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setInspectionVisible(false)}>
            <Text style={{textAlign: 'right', marginRight: 8}}>Close</Text>
          </TouchableOpacity>

          {selectedValues[selectedInspectionIndex] !== undefined && (
            <Picker
              style={{
                padding: 10,
                borderRadius: 5,
                fontSize: 16,
                backgroundColor: '#f7f8f9',
                borderColor: '#e8ecf4',
                borderWidth: 1,
                height: 40,
                marginTop: 25,
                marginHorizontal: 8,
              }}
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
          {switchStates[selectedInspectionIndex] !== undefined && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 25,
              }}>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={
                  switchStates[selectedInspectionIndex] ? '#f5dd4b' : '#f4f3f4'
                }
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => toggleSwitch(selectedInspectionIndex)}
                value={switchStates[selectedInspectionIndex]}
              />
              <Text>
                {switchStates[selectedInspectionIndex] ? 'Yes' : 'No'}
              </Text>
            </View>
          )}
          {inspectionPhotos[selectedInspectionIndex] ? (
            <View style={{paddingHorizontal: 12, marginTop: 12}}>
              <Image
                source={{uri: inspectionPhotos[selectedInspectionIndex]}}
                style={styles.uploadedImage}
              />

              {selectedValuesForCondition[selectedInspectionIndex] !==
                undefined && (
                <Picker
                  style={{
                    padding: 10,
                    borderRadius: 5,
                    fontSize: 16,
                    backgroundColor: '#f7f8f9',
                    borderColor: '#e8ecf4',
                    borderWidth: 1,
                    height: 40,
                    marginTop: 25,
                    marginHorizontal: 8,
                  }}
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
            <CustomButton title="Submit" onPress={handleInspectionOkPress} />
          </View>
        </View>
      </Modal>

      <Modal
        visible={bodyInspectionVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setBodyInspectionVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setBodyInspectionVisible(false)}>
            <Text style={{textAlign: 'right', marginRight: 8}}>Close</Text>
          </TouchableOpacity>

          {switchStateForBodyInspection[selectedBodyInspectionIndex] !==
            undefined && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 25,
              }}>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
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
          )}
          {bodyInspectionPhotos[selectedBodyInspectionIndex] ? (
            <View style={{paddingHorizontal: 12, marginTop: 12}}>
              <Image
                source={{
                  uri: bodyInspectionPhotos[selectedBodyInspectionIndex],
                }}
                style={styles.uploadedImage}
              />

              {bodyInspectionValues[selectedBodyInspectionIndex] !==
                undefined && (
                <Picker
                  style={{
                    padding: 10,
                    borderRadius: 5,
                    fontSize: 16,
                    backgroundColor: '#f7f8f9',
                    borderColor: '#e8ecf4',
                    borderWidth: 1,
                    height: 40,
                    marginTop: 25,
                    marginHorizontal: 8,
                  }}
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
                  handleBodyInspectionRemarks(text, selectedBodyInspectionIndex)
                }
              />
              <View>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() =>
                    handleBodyInspectionClosePress(selectedBodyInspectionIndex)
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
        </View>
      </Modal>

      <Swiper
        ref={swiperRef}
        loop={false}
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
          <Text style={styles.indicator}>{`${currentIndex + 1}/8`}</Text>

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
                  value={formData[label.replace(/ /g, '').toLowerCase()]}
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
          <Text style={styles.indicator}>{`${currentIndex + 1}/8`}</Text>

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
                  value={username}
                  onChangeText={setUsername}
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
          <Text style={styles.indicator}>{`${currentIndex + 1}/8`}</Text>

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
                  value={username}
                  onChangeText={setUsername}
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
          <Text style={styles.indicator}>{`${currentIndex + 1}/8`}</Text>

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
                  {/* <Text>{validations[index] ? '%' : '*'}</Text> */}
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
          <Text style={styles.indicator}>{`${currentIndex + 1}/8`}</Text>

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
                  {/* <Text>{validations[index] ? '%' : '*'}</Text> */}
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
          <Text style={styles.indicator}>{`${currentIndex + 1}/8`}</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperContainer}>
              {mechanicalInspection.map((title, index) => (
                <View key={index} style={styles.photoContainer}>
                  <Text style={styles.label}>{title}</Text>
                  <TouchableOpacity
                    style={styles.photoInput}
                    onPress={() => handleMechanicalInspectionPress(index)}>
                    <Text>Select</Text>
                  </TouchableOpacity>
                  {/* <Text>{validations[index] ? '%' : '*'}</Text> */}
                </View>
              ))}

              <View style={{bottom: 25, marginTop: 20}}>
                <CustomButton title="Next" onPress={handleNext} />
              </View>
            </View>
          </ScrollView>
        </View>
      </Swiper>
    </>
  );
};

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
    flex: 1,
    //  justifyContent: 'center',
    //  alignItems: 'center',
  },
  uploadedImage: {
    width: '100%',
    height: 320,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    bottom: 450,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
  },
  closeButtonText: {
    color: 'white',
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
    marginTop: 3,
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
});

export default OrderCreation;
