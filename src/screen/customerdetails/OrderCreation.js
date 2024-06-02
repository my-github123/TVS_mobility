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
  ToastAndroid,
} from 'react-native';
import Swiper from 'react-native-swiper';
import CustomSwichOutside from '../../components/CustomSwichOutside';
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
    yearofmanufacture: '',
    trimvariant: '',
    mileage: '',
    color: '',
    transmission: '',
    numberofowners: '',
  });

  const [carDetailsSecondFormData, setCarDetailsSecondFormData] = useState({
    hypothicatedBy: '',

    roadtaxIsValid: '',

    cubicCapacity: '',
    numberOfSeats: '',
    registrationType: '',
    registrationDate: '',
  });

  const labelToKeyMap = {
    'Hypothicated by': 'hypothicatedBy',

    'Road tax is valid': 'roadtaxIsValid',

    'Cubic Capacity': 'cubicCapacity',
    'Number of seats': 'numberOfSeats',
    'Registration type': 'registrationType',
    'Registration Date': 'registrationDate',
  };

  const [carDetailsThirdFormData, setCarDetailsThirdFormData] = useState({
    insuranceCompany: '',
    insuranceValidity: '',
    chellanDetails: '',

    chassisNumber: '',
    engineNumber: '',
  });

  const labelToKeyMap1 = {
    'Insurance Company': 'insuranceCompany',
    'Insurance Validity': 'insuranceValidity',
    'Challan Details': 'chellanDetails',

    'Chassis Number': 'chassisNumber',
    'Engine Number': 'engineNumber',
  };

  const switchTitle = [
    'Fuel type',
    'Alteration',
    'Has Hypothication',
    'NOC',
    'Re-Registered',
    'Insurance',
    'Blacklisted',
    'RC Status',
    'State NOC',
    'Flood',
  ];

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

  const [switchStateForVehicleDetails, setSwitchStateForVehicleDetails] =
    useState(Array.from({length: 10}, () => 2));

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

  const [bodyInspectionPhotosForPillars, setbodyInspectionPhotosForPillars] =
    useState(Array.from({length: 13}, () => null));
  const [bodyInspectionPhotosForPillars2, setbodyInspectionPhotosForPillars2] =
    useState(Array.from({length: 13}, () => null));
  const [bodyInspectionPhotosForPillars3, setbodyInspectionPhotosForPillars3] =
    useState(Array.from({length: 13}, () => null));
  const [bodyInspectionPhotosForPillars4, setbodyInspectionPhotosForPillars4] =
    useState(Array.from({length: 13}, () => null));
  const [bodyInspectionPhotosForPillars5, setbodyInspectionPhotosForPillars5] =
    useState(Array.from({length: 13}, () => null));

  const [bodyInspectionDoor1, setBodyInspectionDoor1] = useState(
    Array.from({length: 13}, () => null),
  );
  const [bodyInspectionDoor2, setBodyInspectionDoor2] = useState(
    Array.from({length: 13}, () => null),
  );
  const [bodyInspectionDoor3, setBodyInspectionDoor3] = useState(
    Array.from({length: 13}, () => null),
  );

  const [bodyInspectionPhotos2, setBodyInspectionPhotos2] = useState(
    Array.from({length: 13}, () => null),
  );

  const [carDetailsPhoto, setCarDetailsPhoto] = useState(
    Array.from({length: 6}, () => null),
  );

  const [carDetailsPhoto2, setCarDetailsPhoto2] = useState(
    Array.from({length: 6}, () => null),
  );

  const [carDetailsPhoto3, setCarDetailsPhoto3] = useState(
    Array.from({length: 6}, () => null),
  );

  const [carDetailsPhoto4, setCarDetailsPhoto4] = useState(
    Array.from({length: 6}, () => null),
  );

  const [carDetailsPhoto5, setCarDetailsPhoto5] = useState(
    Array.from({length: 6}, () => null),
  );

  const [selectedContainerIndex, setSelectedContainerIndex] = useState(null);
  const [selectedInspectionIndex, setSelectedInspectionIndex] = useState(null);
  const [selectedBodyInspectionIndex, setSelectedBodyInspectionIndex] =
    useState(null);

  const [carDetailsIndex, setCarDetailsIndex] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    console.log('Form Data:', carDetailsFormData);

    console.log('FORM DARAASSS', carDetailsSecondFormData);

    const isFormComplete = Object.values(carDetailsFormData).every(value => {
      console.log('Value:', value, 'Trimmed:', value.trim());
      return value.trim() !== '';
    });

    const isFormComplete2 = Object.values(carDetailsSecondFormData).every(
      value => {
        console.log('Value:', value, 'Trimmed:', value.trim());
        return value.trim() !== '';
      },
    );

    console.log(isFormComplete2, 'iSHGFHFHG');

    // const isFormComplete = Object.values(carDetailsFormData).every(value => value.trim() !== '');

    console.log(carDetailsFormData, 'cetd');

    console.log(isFormComplete, 'log');
    const isFormCompleteCarDetails2 = Object.values(
      carDetailsSecondFormData,
    ).every(value => value != '');

    const isFormCompleteCarDetails3 = Object.values(
      carDetailsThirdFormData,
    ).every(value => value != '');

    // if (isFormComplete) {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
    // } else {
    //   ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
    // }
  };

  const handleNext2 = () => {
    const isFormComplete2 = Object.values(carDetailsSecondFormData).every(
      value => {
        console.log('Value:', value, 'Trimmed:', value.trim());
        return value.trim() !== '';
      },
    );

    console.log(isFormComplete2);
    console.log(carDetailsSecondFormData, 'car detauls firnm datsvvv');

    // const isFormComplete = Object.values(carDetailsFormData).every(value => value.trim() !== '');

    // if (isFormComplete2) {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
    // } else {
    //   ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
    // }
  };

  const getOptions = index => {
    switch (index) {
      case 0:
        return {option1: 'Diesel', option2: 'Petrol'};
      case 2:
        return {option1: 'LPG', option2: 'Color'};
      case 7:
        return {option1: 'Original', option2: 'Duplicate'};
      default:
        return {option1: 'Yes', option2: 'No'};
    }
  };

  const handleNext3 = () => {
    const isFormComplete3 = Object.values(carDetailsThirdFormData).every(
      value => {
        console.log('Value:', value, 'Trimmed:', value.trim());
        return value.trim() !== '';
      },
    );

    console.log(carDetailsThirdFormData);
    console.log(isFormComplete3, 'lmklj');
    // const isFormComplete = Object.values(carDetailsFormData).every(value => value.trim() !== '');

    // if (isFormComplete3) {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
    // } else {
    //   ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
    // }
  };

  const handleSubmit = () => {
    navigation.navigate('Dashboard');
  };
  const handleIndexChanged = index => {
    setCurrentIndex(index);
  };

  const getProgressBarWidth = () => {
    return `${((currentIndex + 1) / 8) * 100}%`;
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

  const openCameraForBodyInspectionPillars1 = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...bodyInspectionPhotosForPillars];
        newPhotoUris[selectedBodyInspectionIndex] = response.assets[0].uri;
        setbodyInspectionPhotosForPillars(newPhotoUris);
      }
    });
  };

  const openCameraForBodyInspection1 = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...bodyInspectionDoor1];
        newPhotoUris[selectedBodyInspectionIndex] = response.assets[0].uri;
        setBodyInspectionDoor1(newPhotoUris);
      }
    });
  };

  const openCameraForBodyInspectionDoor2 = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...bodyInspectionDoor2];
        newPhotoUris[selectedBodyInspectionIndex] = response.assets[0].uri;
        setBodyInspectionDoor2(newPhotoUris);
      }
    });
  };

  const openCameraForBodyInspectionDoor3 = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...bodyInspectionDoor3];
        newPhotoUris[selectedBodyInspectionIndex] = response.assets[0].uri;
        setBodyInspectionDoor3(newPhotoUris);
      }
    });
  };

  const openCameraForBodyInspectionPillars2 = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...bodyInspectionPhotosForPillars2];
        newPhotoUris[selectedBodyInspectionIndex] = response.assets[0].uri;
        setbodyInspectionPhotosForPillars2(newPhotoUris);
      }
    });
  };

  const openCameraForBodyInspectionPillars3 = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...bodyInspectionPhotosForPillars3];
        newPhotoUris[selectedBodyInspectionIndex] = response.assets[0].uri;
        setbodyInspectionPhotosForPillars3(newPhotoUris);
      }
    });
  };

  const openCameraForBodyInspectionPillars4 = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...bodyInspectionPhotosForPillars4];
        newPhotoUris[selectedBodyInspectionIndex] = response.assets[0].uri;
        setbodyInspectionPhotosForPillars4(newPhotoUris);
      }
    });
  };

  const openCameraForBodyInspectionPillars5 = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...bodyInspectionPhotosForPillars5];
        newPhotoUris[selectedBodyInspectionIndex] = response.assets[0].uri;
        setbodyInspectionPhotosForPillars5(newPhotoUris);
      }
    });
  };

  const openCameraForBodyInspection2 = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...bodyInspectionPhotos2];
        newPhotoUris[selectedBodyInspectionIndex] = response.assets[0].uri;
        setBodyInspectionPhotos2(newPhotoUris);
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

  const openCameraForCarDetailsThree = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...carDetailsPhoto3];
        newPhotoUris[carDetailsIndex] = response.assets[0].uri;
        setCarDetailsPhoto3(newPhotoUris);
      }
    });
  };

  const openCameraForCarDetailsFour = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...carDetailsPhoto4];
        newPhotoUris[carDetailsIndex] = response.assets[0].uri;
        setCarDetailsPhoto4(newPhotoUris);
      }
    });
  };

  const openCameraForCarDetailsFive = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...carDetailsPhoto5];
        newPhotoUris[carDetailsIndex] = response.assets[0].uri;
        setCarDetailsPhoto5(newPhotoUris);
      }
    });
  };

  console.log(carDetailsPhoto[carDetailsIndex], 'INDE S AJD AJ D');

  const handleOkPress = () => {
    if (!photoUris[selectedContainerIndex]) {
      ToastAndroid.show('Photo fields are required', ToastAndroid.SHORT);
      return;
    }
    const newValidations = [...validations];
    // Assume validatePhotoAndRemarks is a function that returns true if both photo and remarks are valid
    newValidations[selectedContainerIndex] = validatePhotoAndRemarks(
      selectedContainerIndex,
    );
    setValidations(newValidations);
    setModalVisible(false);
  };

  const handleInspectionOkPress = () => {
    if (
      switchStateForMechanicalInspection[selectedInspectionIndex] === 2 &&
      !inspectionPhotos[selectedInspectionIndex]
    ) {
      ToastAndroid.show('Photo fields are required', ToastAndroid.SHORT);
      return;
    }
    setInspectionVisible(false);
    const newValidations = [...secondValidation];
    // Assume validatePhotoAndRemarks is a function that returns true if both photo and remarks are valid
    newValidations[selectedInspectionIndex] = validatePhotoAndRemarks(
      selectedInspectionIndex,
    );
    setSecondValidation(newValidations);
  };

  const handleBodyInspectionOkPress = () => {
    if (
      switchStateForBodyInspection[selectedBodyInspectionIndex] === 2 &&
      !bodyInspectionPhotos[selectedBodyInspectionIndex]
    ) {
      ToastAndroid.show('Photo fields are required', ToastAndroid.SHORT);
      return;
    }

    setBodyInspectionVisible(false);
    const newValidations = [...thirdValidation];
    // Assume validatePhotoAndRemarks is a function that returns true if both photo and remarks are valid
    newValidations[selectedBodyInspectionIndex] = validatePhotoAndRemarks(
      selectedBodyInspectionIndex,
    );
    setThirdValidation(newValidations);
  };

  const handleCarDetailsOkPress = () => {
    if (
      switchStateForCarDetails[carDetailsIndex] === 2 &&
      !carDetailsPhoto[carDetailsIndex]
    ) {
      ToastAndroid.show('Photo fields are required', ToastAndroid.SHORT);
      return;
    }
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

  const handleBodyInspectionClosePress2 = index => {
    const newPhotoUris = [...bodyInspectionPhotos2];
    newPhotoUris[index] = null;
    // const newRemarks = [...bodyInspectionRemarks];
    // newRemarks[index] = '';

    setBodyInspectionPhotos2(newPhotoUris);
    // setBodyInspectionRemarks(newRemarks);
  };

  const handleBodyInspectionDoor3 = index => {
    const newPhotoUris = [...bodyInspectionDoor3];
    newPhotoUris[index] = null;
    // const newRemarks = [...bodyInspectionRemarks];
    // newRemarks[index] = '';

    setBodyInspectionDoor3(newPhotoUris);
    // setBodyInspectionRemarks(newRemarks);
  };

  const handleBodyInspectionDoor2 = index => {
    const newPhotoUris = [...bodyInspectionDoor2];
    newPhotoUris[index] = null;
    // const newRemarks = [...bodyInspectionRemarks];
    // newRemarks[index] = '';

    setBodyInspectionDoor2(newPhotoUris);
    // setBodyInspectionRemarks(newRemarks);
  };

  const handleBodyInspectionDoor1 = index => {
    const newPhotoUris = [...bodyInspectionDoor1];
    newPhotoUris[index] = null;
    // const newRemarks = [...bodyInspectionRemarks];
    // newRemarks[index] = '';

    setBodyInspectionDoor1(newPhotoUris);
    // setBodyInspectionRemarks(newRemarks);
  };

  const handleBodyInspectionPhotosForPillar5 = index => {
    const newPhotoUris = [...bodyInspectionPhotosForPillars5];
    newPhotoUris[index] = null;
    // const newRemarks = [...bodyInspectionRemarks];
    // newRemarks[index] = '';

    setbodyInspectionPhotosForPillars5(newPhotoUris);
    // setBodyInspectionRemarks(newRemarks);
  };

  const handleBodyInspectionPhotosForPillar4 = index => {
    const newPhotoUris = [...bodyInspectionPhotosForPillars4];
    newPhotoUris[index] = null;
    // const newRemarks = [...bodyInspectionRemarks];
    // newRemarks[index] = '';

    setbodyInspectionPhotosForPillars4(newPhotoUris);
    // setBodyInspectionRemarks(newRemarks);
  };

  const handleBodyInspectionPhotosForPillar3 = index => {
    const newPhotoUris = [...bodyInspectionPhotosForPillars3];
    newPhotoUris[index] = null;
    // const newRemarks = [...bodyInspectionRemarks];
    // newRemarks[index] = '';

    setbodyInspectionPhotosForPillars3(newPhotoUris);
    // setBodyInspectionRemarks(newRemarks);
  };

  const handleBodyInspectionPhotosForPillar2 = index => {
    const newPhotoUris = [...bodyInspectionPhotosForPillars2];
    newPhotoUris[index] = null;
    // const newRemarks = [...bodyInspectionRemarks];
    // newRemarks[index] = '';

    setbodyInspectionPhotosForPillars2(newPhotoUris);
    // setBodyInspectionRemarks(newRemarks);
  };

  const handleBodyInspectionPhotosForPillar1 = index => {
    const newPhotoUris = [...bodyInspectionPhotosForPillars];
    newPhotoUris[index] = null;
    // const newRemarks = [...bodyInspectionRemarks];
    // newRemarks[index] = '';

    setbodyInspectionPhotosForPillars(newPhotoUris);
    // setBodyInspectionRemarks(newRemarks);
  };

  const handleCarDetailsClosePress = index => {
    const newPhotoUris = [...carDetailsPhoto];
    newPhotoUris[index] = null;
    const newRemarks = [...carDetailsRemarks];
    newRemarks[index] = '';

    setCarDetailsPhoto(newPhotoUris);
    setCarDetailsRemarks(newRemarks);
  };

  const handleCarDetailsClosePress5 = index => {
    const newPhotoUris = [...carDetailsPhoto5];
    newPhotoUris[index] = null;
    // const newRemarks = [...carDetailsRemarks];
    // newRemarks[index] = '';

    setCarDetailsPhoto5(newPhotoUris);
    // setCarDetailsRemarks(newRemarks);
  };

  const handleCarDetailsClosePress2 = index => {
    const newPhotoUris = [...carDetailsPhoto2];
    newPhotoUris[index] = null;
    // const newRemarks = [...carDetailsRemarks];
    // newRemarks[index] = '';

    setCarDetailsPhoto2(newPhotoUris);
    // setCarDetailsRemarks(newRemarks);
  };

  const handleCarDetailsClosePress3 = index => {
    const newPhotoUris = [...carDetailsPhoto3];
    newPhotoUris[index] = null;
    // const newRemarks = [...carDetailsRemarks];
    // newRemarks[index] = '';

    setCarDetailsPhoto3(newPhotoUris);
    //   setCarDetailsRemarks(newRemarks);
  };

  const handleCarDetailsClosePress4 = index => {
    const newPhotoUris = [...carDetailsPhoto4];
    newPhotoUris[index] = null;
    // const newRemarks = [...carDetailsRemarks];
    // newRemarks[index] = '';

    setCarDetailsPhoto4(newPhotoUris);
    //   setCarDetailsRemarks(newRemarks);
  };

  const handleSelectContainerPress = index => {
    setSelectedContainerIndex(index);
    setModalVisible(true);
  };

  const handleBodyInspectionContainerPress = index => {
    setSelectedBodyInspectionIndex(index);
    setBodyInspectionVisible(true);
  };

  const carDetailsContainerPress = index => {
    setCarDetailsIndex(index);
    setCarDetailsInspection(true);

    // const newValidations = [...carValidation];
    // // Assume validatePhotoAndRemarks is a function that returns true if both photo and remarks are valid
    // newValidations[index] = validatePhotoAndRemarks(index);
    // setCarDetailsValidation(newValidations);
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

  const handleInputChange = (text, key) => {
    setCarDetailsFormData(prevState => ({
      ...prevState,
      [key]: text,
    }));
  };

  const handleSecondInputChange = (text, key) => {
    setCarDetailsSecondFormData(prevState => ({
      ...prevState,
      [key]: text,
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
            <ScrollView
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}>
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
            <ScrollView
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}>
              {selectedValues[selectedInspectionIndex] !== undefined && (
                <View style={{paddingHorizontal: 8}}>
                  <Picker
                    style={styles.photoInput}
                    selectedValue={selectedValues[selectedInspectionIndex]}
                    onValueChange={itemValue =>
                      handleDropdownChange(itemValue, selectedInspectionIndex)
                    }>
                    <Picker.Item label="Select DropDown" value="" />

                    <Picker.Item
                      label={
                        selectedInspectionIndex === 0
                          ? 'Strut'
                          : selectedInspectionIndex === 1
                          ? 'Rack and Pinion'
                          : selectedInspectionIndex === 2
                          ? 'Pad'
                          : selectedInspectionIndex === 3
                          ? 'Clutch'
                          : selectedInspectionIndex === 4
                          ? 'Smoke'
                          : selectedInspectionIndex === 5
                          ? 'Battery'
                          : selectedInspectionIndex === 6
                          ? 'Cooling'
                          : selectedInspectionIndex === 7
                          ? 'Music System'
                          : 'asas'
                      }
                      value={
                        selectedInspectionIndex === 0
                          ? 'Strut'
                          : selectedInspectionIndex === 1
                          ? 'Rack and Pinion'
                          : selectedInspectionIndex === 2
                          ? 'Pad'
                          : selectedInspectionIndex === 3
                          ? 'Clutch'
                          : selectedInspectionIndex === 4
                          ? 'Smoke'
                          : selectedInspectionIndex === 5
                          ? 'Battery'
                          : selectedInspectionIndex === 6
                          ? 'Cooling'
                          : selectedInspectionIndex === 7
                          ? 'Music System'
                          : 'asas'
                      }
                    />

                    <Picker.Item
                      label={
                        selectedInspectionIndex === 0
                          ? 'Lower Arm'
                          : selectedInspectionIndex === 1
                          ? 'Steering Coloum'
                          : selectedInspectionIndex === 2
                          ? 'Disc'
                          : selectedInspectionIndex === 3
                          ? 'Gear'
                          : selectedInspectionIndex === 4
                          ? 'Turbo'
                          : selectedInspectionIndex === 5
                          ? 'Alternator'
                          : selectedInspectionIndex === 6
                          ? 'Blower'
                          : selectedInspectionIndex === 7
                          ? 'Parking Sensor'
                          : 'asas'
                      }
                      value={
                        selectedInspectionIndex === 0
                          ? 'Lower Arm'
                          : selectedInspectionIndex === 1
                          ? 'Steering Coloum'
                          : selectedInspectionIndex === 2
                          ? 'Disc'
                          : selectedInspectionIndex === 3
                          ? 'Gear'
                          : selectedInspectionIndex === 4
                          ? 'Turbo'
                          : selectedInspectionIndex === 5
                          ? 'Alternator'
                          : selectedInspectionIndex === 6
                          ? 'Blower'
                          : selectedInspectionIndex === 7
                          ? 'Parking Sensor'
                          : 'asas'
                      }
                    />
                    <Picker.Item
                      label={
                        selectedInspectionIndex === 0
                          ? 'Link Rod'
                          : selectedInspectionIndex === 1
                          ? 'Hardness'
                          : selectedInspectionIndex === 2
                          ? 'Shoe'
                          : selectedInspectionIndex === 3
                          ? 'Shifting'
                          : selectedInspectionIndex === 4
                          ? 'Misfiring'
                          : selectedInspectionIndex === 5
                          ? 'self motor'
                          : selectedInspectionIndex === 6
                          ? 'Condenser'
                          : selectedInspectionIndex === 7
                          ? 'Reverse Camera'
                          : 'asas'
                      }
                      value={
                        selectedInspectionIndex === 0
                          ? 'Link Rod'
                          : selectedInspectionIndex === 1
                          ? 'Hardness'
                          : selectedInspectionIndex === 2
                          ? 'Shoe'
                          : selectedInspectionIndex === 3
                          ? 'Shifting'
                          : selectedInspectionIndex === 4
                          ? 'Misfiring'
                          : selectedInspectionIndex === 5
                          ? 'self motor'
                          : selectedInspectionIndex === 6
                          ? 'Condenser'
                          : selectedInspectionIndex === 7
                          ? 'Reverse Camera'
                          : 'asas'
                      }
                    />
                    <Picker.Item
                      label={
                        selectedInspectionIndex === 0
                          ? 'Stablizer Bar'
                          : selectedInspectionIndex === 1
                          ? 'Ball joint end'
                          : selectedInspectionIndex === 2
                          ? 'Drum'
                          : selectedInspectionIndex === 3
                          ? 'Drive Shaff'
                          : selectedInspectionIndex === 4
                          ? 'Tappet'
                          : selectedInspectionIndex === 5
                          ? 'Wiring Harness'
                          : selectedInspectionIndex === 6
                          ? 'fan'
                          : selectedInspectionIndex === 7
                          ? 'OVRM Adjuster'
                          : 'asas'
                      }
                      value={
                        selectedInspectionIndex === 0
                          ? 'Stablizer Bar'
                          : selectedInspectionIndex === 1
                          ? 'Ball joint end'
                          : selectedInspectionIndex === 2
                          ? 'Drum'
                          : selectedInspectionIndex === 3
                          ? 'Drive Shaft'
                          : selectedInspectionIndex === 4
                          ? 'Tappet'
                          : selectedInspectionIndex === 5
                          ? 'Wiring Harness'
                          : selectedInspectionIndex === 6
                          ? 'fan'
                          : selectedInspectionIndex === 7
                          ? 'OVRM Adjuster'
                          : 'asas'
                      }
                    />
                    {/* <Picker.Item
  label={
    selectedInspectionIndex === 0
      ? "shok absorber"
      : selectedInspectionIndex === 1
      ? ""
      : selectedInspectionIndex === 2
      ? "psdddd"
      : selectedInspectionIndex === 3
      ? "sdsdsd"
      : selectedInspectionIndex === 4
      ? "dsd"
      : selectedInspectionIndex === 5
      ? "aa"
      : selectedInspectionIndex === 6
      ? "aaxxz"
      : selectedInspectionIndex === 7
      ? "ss"
      : "asas"
  }
  value={
    selectedInspectionIndex === 0
      ? "shok absorber"
      : selectedInspectionIndex === 1
      ? ""
      : selectedInspectionIndex === 2
      ? "psdddd"
      : selectedInspectionIndex === 3
      ? "sdsdsd"
      : selectedInspectionIndex === 4
      ? "dsd"
      : selectedInspectionIndex === 5
      ? "aa"
      : selectedInspectionIndex === 6
      ? "aaxxz"
      : selectedInspectionIndex === 7
      ? "ss"
      : "asas"
  }
/>
          <Picker.Item
  label={
    selectedInspectionIndex === 0
      ? "coil spring"
      : selectedInspectionIndex === 1
      ? ""
      : selectedInspectionIndex === 2
      ? "psdddd"
      : selectedInspectionIndex === 3
      ? "sdsdsd"
      : selectedInspectionIndex === 4
      ? "dsd"
      : selectedInspectionIndex === 5
      ? "aa"
      : selectedInspectionIndex === 6
      ? "aaxxz"
      : selectedInspectionIndex === 7
      ? "ss"
      : "asas"
  }
  value={
    selectedInspectionIndex === 0
      ? "coil spring,"
      : selectedInspectionIndex === 1
      ? ""
      : selectedInspectionIndex === 2
      ? "psdddd"
      : selectedInspectionIndex === 3
      ? "sdsdsd"
      : selectedInspectionIndex === 4
      ? "dsd"
      : selectedInspectionIndex === 5
      ? "aa"
      : selectedInspectionIndex === 6
      ? "aaxxz"
      : selectedInspectionIndex === 7
      ? "ss"
      : "asas"
  }
/>
<Picker.Item
  label={
    selectedInspectionIndex === 0
      ? "leaf spring"
      : selectedInspectionIndex === 1
      ? ""
      : selectedInspectionIndex === 2
      ? "psdddd"
      : selectedInspectionIndex === 3
      ? "sdsdsd"
      : selectedInspectionIndex === 4
      ? "dsd"
      : selectedInspectionIndex === 5
      ? "aa"
      : selectedInspectionIndex === 6
      ? "aaxxz"
      : selectedInspectionIndex === 7
      ? "ss"
      : "asas"
  }
  value={
    selectedInspectionIndex === 0
      ? "leaf spring"
      : selectedInspectionIndex === 1
      ? ""
      : selectedInspectionIndex === 2
      ? "psdddd"
      : selectedInspectionIndex === 3
      ? "sdsdsd"
      : selectedInspectionIndex === 4
      ? "dsd"
      : selectedInspectionIndex === 5
      ? "aa"
      : selectedInspectionIndex === 6
      ? "aaxxz"
      : selectedInspectionIndex === 7
      ? "ss"
      : "asas"
  }
/> */}
                    {/* Add other items as needed */}
                  </Picker>
                </View>
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

              <View style={{paddingHorizontal: 8}}>
                {inspectionPhotos[selectedInspectionIndex] ? (
                  <>
                    <View style={styles.photoContainer}>
                      <Image
                        source={{
                          uri: inspectionPhotos[selectedInspectionIndex],
                        }}
                        style={styles.uploadedImage}
                      />

                      {selectedValuesForCondition[selectedInspectionIndex] !==
                        undefined && (
                        <Picker
                          style={styles.photoInput}
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
                          <Picker.Item label="Level" value="Level" />
                          <Picker.Item label="Noise" value="Noise" />
                          <Picker.Item label="Leak" value="Leak" />
                          <Picker.Item label="Damaged" value="Damaged" />

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
                    </View>

                    <View>
                      <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() =>
                          handleInspectionClosePress(selectedInspectionIndex)
                        }>
                        <Text style={styles.closeButtonText}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <View style={{paddingHorizontal: 0}}>
                    <TouchableOpacity
                      style={styles.photoInput}
                      onPress={() => openCameraForInspection()}>
                      <Text>Upload</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View style={{paddingHorizontal: 8, marginTop: 5}}>
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
            <ScrollView
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}>
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

              <View style={{paddingHorizontal: 8}}>
                {bodyInspectionDoor1[selectedBodyInspectionIndex] && (
                  <View style={{position: 'relative'}}>
                    <Image
                      source={{
                        uri: bodyInspectionDoor1[selectedBodyInspectionIndex],
                      }}
                      style={styles.uploadedImage}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'black',
                        borderRadius: 15,
                        width: 60,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        handleBodyInspectionDoor1(selectedBodyInspectionIndex)
                      }>
                      <Text style={{fontSize: 14, color: 'white'}}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {bodyInspectionDoor2[selectedBodyInspectionIndex] && (
                  <View style={{position: 'relative'}}>
                    <Image
                      source={{
                        uri: bodyInspectionDoor2[selectedBodyInspectionIndex],
                      }}
                      style={styles.uploadedImage}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'black',
                        borderRadius: 15,
                        width: 60,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        handleBodyInspectionDoor2(selectedBodyInspectionIndex)
                      }>
                      <Text style={{fontSize: 14, color: 'white'}}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {bodyInspectionDoor3[selectedBodyInspectionIndex] && (
                  <View style={{position: 'relative'}}>
                    <Image
                      source={{
                        uri: bodyInspectionDoor3[selectedBodyInspectionIndex],
                      }}
                      style={styles.uploadedImage}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'black',
                        borderRadius: 15,
                        width: 60,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        handleBodyInspectionDoor3(selectedBodyInspectionIndex)
                      }>
                      <Text style={{fontSize: 14, color: 'white'}}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {bodyInspectionPhotos2[selectedBodyInspectionIndex] && (
                  <View style={{position: 'relative'}}>
                    <Image
                      source={{
                        uri: bodyInspectionPhotos2[selectedBodyInspectionIndex],
                      }}
                      style={styles.uploadedImage}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'black',
                        borderRadius: 15,
                        width: 60,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        handleBodyInspectionClosePress2(
                          selectedBodyInspectionIndex,
                        )
                      }>
                      <Text style={{fontSize: 14, color: 'white'}}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {bodyInspectionPhotosForPillars[
                  selectedBodyInspectionIndex
                ] && (
                  <View style={{position: 'relative'}}>
                    <Image
                      source={{
                        uri: bodyInspectionPhotosForPillars[
                          selectedBodyInspectionIndex
                        ],
                      }}
                      style={styles.uploadedImage}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'black',
                        borderRadius: 15,
                        width: 60,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        handleBodyInspectionPhotosForPillar1(
                          selectedBodyInspectionIndex,
                        )
                      }>
                      <Text style={{fontSize: 14, color: 'white'}}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {bodyInspectionPhotosForPillars2[
                  selectedBodyInspectionIndex
                ] && (
                  <View style={{position: 'relative'}}>
                    <Image
                      source={{
                        uri: bodyInspectionPhotosForPillars2[
                          selectedBodyInspectionIndex
                        ],
                      }}
                      style={styles.uploadedImage}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'black',
                        borderRadius: 15,
                        width: 60,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        handleBodyInspectionPhotosForPillar2(
                          selectedBodyInspectionIndex,
                        )
                      }>
                      <Text style={{fontSize: 14, color: 'white'}}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {bodyInspectionPhotosForPillars3[
                  selectedBodyInspectionIndex
                ] && (
                  <View style={{position: 'relative'}}>
                    <Image
                      source={{
                        uri: bodyInspectionPhotosForPillars3[
                          selectedBodyInspectionIndex
                        ],
                      }}
                      style={styles.uploadedImage}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'black',
                        borderRadius: 15,
                        width: 60,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        handleBodyInspectionPhotosForPillar3(
                          selectedBodyInspectionIndex,
                        )
                      }>
                      <Text style={{fontSize: 14, color: 'white'}}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {bodyInspectionPhotosForPillars4[
                  selectedBodyInspectionIndex
                ] && (
                  <View style={{position: 'relative'}}>
                    <Image
                      source={{
                        uri: bodyInspectionPhotosForPillars4[
                          selectedBodyInspectionIndex
                        ],
                      }}
                      style={styles.uploadedImage}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'black',
                        borderRadius: 15,
                        width: 60,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        handleBodyInspectionPhotosForPillar4(
                          selectedBodyInspectionIndex,
                        )
                      }>
                      <Text style={{fontSize: 14, color: 'white'}}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {bodyInspectionPhotosForPillars5[
                  selectedBodyInspectionIndex
                ] && (
                  <View style={{position: 'relative'}}>
                    <Image
                      source={{
                        uri: bodyInspectionPhotosForPillars5[
                          selectedBodyInspectionIndex
                        ],
                      }}
                      style={styles.uploadedImage}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'black',
                        borderRadius: 15,
                        width: 60,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        handleBodyInspectionPhotosForPillar5(
                          selectedBodyInspectionIndex,
                        )
                      }>
                      <Text style={{fontSize: 14, color: 'white'}}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <View style={{paddingHorizontal: 8}}>
                {bodyInspectionPhotos[selectedBodyInspectionIndex] && (
                  <View style={styles.photoContainer}>
                    <View style={{position: 'relative'}}>
                      <Image
                        source={{
                          uri: bodyInspectionPhotos[
                            selectedBodyInspectionIndex
                          ],
                        }}
                        style={styles.uploadedImage}
                      />
                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          backgroundColor: 'black',
                          borderRadius: 15,
                          width: 60,
                          height: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() =>
                          handleBodyInspectionClosePress(
                            selectedBodyInspectionIndex,
                          )
                        }>
                        <Text style={{fontSize: 14, color: 'white'}}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/* {bodyInspectionValues[selectedBodyInspectionIndex] !==
                      undefined && ( */}
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
                      <Picker.Item label="Damaged" value="Damaged" />
                      <Picker.Item label="Rusting" value="Rusting" />
                      <Picker.Item label="Replaced" value="Replaced" />
                      <Picker.Item label="Repaired" valeu="Repaired" />
                      {/* Add other items as needed */}
                    </Picker>
                    {/* )} */}

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
                      {/* <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() =>
                          handleBodyInspectionClosePress(
                            selectedBodyInspectionIndex,
                          )
                        }>
                        <Text style={styles.closeButtonText}>Cancel</Text>
                      </TouchableOpacity> */}
                    </View>
                  </View>
                )}
              </View>

              <View style={{paddingHorizontal: 8}}>
                {selectedBodyInspectionIndex === 1 ||
                selectedBodyInspectionIndex === 2 ||
                selectedBodyInspectionIndex === 3 ||
                selectedBodyInspectionIndex === 4 ||
                selectedBodyInspectionIndex === 10 ||
                selectedBodyInspectionIndex === 11 ||
                selectedBodyInspectionIndex === 12 ? (
                  <>
                    {bodyInspectionPhotos[selectedBodyInspectionIndex] ==
                      null && (
                      <TouchableOpacity
                        style={styles.photoInput}
                        onPress={() => openCameraForBodyInspection()}>
                        <Text>Upload</Text>
                      </TouchableOpacity>
                    )}
                    {bodyInspectionPhotos2[selectedBodyInspectionIndex] ==
                      null && (
                      <TouchableOpacity
                        style={styles.photoInput}
                        onPress={() => openCameraForBodyInspection2()}>
                        <Text>Upload</Text>
                      </TouchableOpacity>
                    )}
                    {/* <TouchableOpacity
                       style={styles.photoInput}
                       onPress={() => openCameraForCarDetails()}>
                       <Text>Upload</Text>
                     </TouchableOpacity> */}
                  </>
                ) : (
                  <>
                    {bodyInspectionPhotos[selectedBodyInspectionIndex] ==
                      null && (
                      <TouchableOpacity
                        style={styles.photoInput}
                        onPress={() => openCameraForBodyInspection()}>
                        <Text>Upload</Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}
              </View>

              <View style={{paddingHorizontal: 8}}>
                {selectedBodyInspectionIndex === 0 && (
                  <>
                    {bodyInspectionPhotosForPillars[
                      selectedBodyInspectionIndex
                    ] == null && (
                      <TouchableOpacity
                        style={styles.photoInput}
                        onPress={() => openCameraForBodyInspectionPillars1()}>
                        <Text>Upload</Text>
                      </TouchableOpacity>
                    )}

                    {bodyInspectionPhotosForPillars2[
                      selectedBodyInspectionIndex
                    ] == null && (
                      <TouchableOpacity
                        style={styles.photoInput}
                        onPress={() => openCameraForBodyInspectionPillars2()}>
                        <Text>Upload</Text>
                      </TouchableOpacity>
                    )}

                    {bodyInspectionPhotosForPillars3[
                      selectedBodyInspectionIndex
                    ] == null && (
                      <TouchableOpacity
                        style={styles.photoInput}
                        onPress={() => openCameraForBodyInspectionPillars3()}>
                        <Text>Upload</Text>
                      </TouchableOpacity>
                    )}
                    {bodyInspectionPhotosForPillars4[
                      selectedBodyInspectionIndex
                    ] == null && (
                      <TouchableOpacity
                        style={styles.photoInput}
                        onPress={() => openCameraForBodyInspectionPillars4()}>
                        <Text>Upload</Text>
                      </TouchableOpacity>
                    )}

                    {bodyInspectionPhotosForPillars5[
                      selectedBodyInspectionIndex
                    ] == null && (
                      <TouchableOpacity
                        style={styles.photoInput}
                        onPress={() => openCameraForBodyInspectionPillars5()}>
                        <Text>Upload</Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}
              </View>

              <View style={{paddingHorizontal: 8}}>
                {selectedBodyInspectionIndex === 5 ||
                selectedBodyInspectionIndex === 9 ? (
                  <>
                    {bodyInspectionDoor1[selectedBodyInspectionIndex] ==
                      null && (
                      <TouchableOpacity
                        style={styles.photoInput}
                        onPress={() => openCameraForBodyInspection1()}>
                        <Text>Upload</Text>
                      </TouchableOpacity>
                    )}

                    {bodyInspectionDoor2[selectedBodyInspectionIndex] ==
                      null && (
                      <TouchableOpacity
                        style={styles.photoInput}
                        onPress={() => openCameraForBodyInspectionDoor2()}>
                        <Text>Upload</Text>
                      </TouchableOpacity>
                    )}

                    {bodyInspectionDoor3[selectedBodyInspectionIndex] ==
                      null && (
                      <TouchableOpacity
                        style={styles.photoInput}
                        onPress={() => openCameraForBodyInspectionDoor3()}>
                        <Text>Upload</Text>
                      </TouchableOpacity>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </View>

              {/* // ) : (
              //   <View style={{paddingHorizontal: 8}}>
              //     <TouchableOpacity
              //       style={styles.photoInput}
              //       onPress={() => openCameraForBodyInspection()}>
              //       <Text>Upload</Text>
              //     </TouchableOpacity>
              //   </View>
              // )} */}
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
            <ScrollView
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}>
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

              {carDetailsPhoto4[carDetailsIndex] && (
                <View style={{paddingHorizontal: 8}}>
                  <View style={{position: 'relative'}}>
                    <Image
                      source={{uri: carDetailsPhoto4[carDetailsIndex]}}
                      style={styles.uploadedImage}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'black',
                        borderRadius: 15,
                        width: 60,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => handleCarDetailsClosePress4()}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 14,
                          //  fontWeight: 'bold',
                        }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {carDetailsPhoto3[carDetailsIndex] && (
                <View style={{paddingHorizontal: 8}}>
                  <View style={{position: 'relative'}}>
                    <Image
                      source={{uri: carDetailsPhoto3[carDetailsIndex]}}
                      style={styles.uploadedImage}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'black',
                        borderRadius: 15,
                        width: 60,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        handleCarDetailsClosePress3(carDetailsIndex)
                      }>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 14,
                          //  fontWeight: 'bold',
                        }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {carDetailsPhoto2[carDetailsIndex] && (
                <View style={{paddingHorizontal: 8}}>
                  <View style={{position: 'relative'}}>
                    <Image
                      source={{uri: carDetailsPhoto2[carDetailsIndex]}}
                      style={styles.uploadedImage}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'black',
                        borderRadius: 15,
                        width: 60,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        handleCarDetailsClosePress2(carDetailsIndex)
                      }>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 14,
                          //  fontWeight: 'bold',
                        }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {carDetailsPhoto5[carDetailsIndex] && (
                <View style={{paddingHorizontal: 8}}>
                  <View style={{position: 'relative'}}>
                    <Image
                      source={{uri: carDetailsPhoto5[carDetailsIndex]}}
                      style={styles.uploadedImage}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'black',
                        borderRadius: 15,
                        width: 60,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        handleCarDetailsClosePress5(carDetailsIndex)
                      }>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 14,
                          //  fontWeight: 'bold',
                        }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              <View style={{paddingHorizontal: 8}}>
                {carDetailsPhoto[carDetailsIndex] && (
                  <View style={styles.photoContainer}>
                    <Image
                      source={{
                        uri: carDetailsPhoto[carDetailsIndex],
                      }}
                      style={styles.uploadedImage}
                    />

                    {carDetailsValues[carDetailsIndex] !== undefined && (
                      <Picker
                        style={styles.photoInput}
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
                )}
              </View>
              <View style={{paddingHorizontal: 10}}>
                {carDetailsIndex === 2 ? (
                  <>
                    {carDetailsPhoto[carDetailsIndex] == null && (
                      <TouchableOpacity
                        style={styles.photoInput}
                        onPress={() => openCameraForCarDetails()}>
                        <Text>Upload</Text>
                      </TouchableOpacity>
                    )}

                    {carDetailsPhoto2[carDetailsIndex] == null && (
                      <TouchableOpacity
                        style={styles.photoInput}
                        onPress={() => openCameraForCarDetailsTwo()}>
                        <Text>Upload</Text>
                      </TouchableOpacity>
                    )}

                    {carDetailsPhoto3[carDetailsIndex] == null && (
                      <TouchableOpacity
                        style={styles.photoInput}
                        onPress={() => openCameraForCarDetailsThree()}>
                        <Text>Upload</Text>
                      </TouchableOpacity>
                    )}
                    {carDetailsPhoto4[carDetailsIndex] == null && (
                      <TouchableOpacity
                        style={styles.photoInput}
                        onPress={() => openCameraForCarDetailsFour()}>
                        <Text>Upload</Text>
                      </TouchableOpacity>
                    )}
                  </>
                ) : (
                  <>
                    {carDetailsPhoto[carDetailsIndex] == null && (
                      <TouchableOpacity
                        style={styles.photoInput}
                        onPress={() => openCameraForCarDetails()}>
                        <Text>Upload</Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}
              </View>

              {carDetailsIndex === 5 && (
                <View style={{paddingHorizontal: 10}}>
                  {carDetailsPhoto5[carDetailsIndex] == null && (
                    <TouchableOpacity
                      style={styles.photoInput}
                      onPress={() => openCameraForCarDetailsFive()}>
                      <Text>Upload</Text>
                    </TouchableOpacity>
                  )}

                  {/* {carDetailsPhoto2[carDetailsIndex] ==null  && ( */}

                  {/* <TouchableOpacity
                   style={styles.photoInput}
                   onPress={() => openCameraForCarDetailsTwo()}>
                   <Text>Upload</Text>
                 </TouchableOpacity> */}
                  {/* )} */}
                </View>
              )}

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
          <Text style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}>
            Car Details
          </Text>
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
                'trimvariant',
                'Mileage',
                'Color',
                'Transmission',
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
          <Text style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}>
            Car Details
          </Text>
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBar, {width: getProgressBarWidth()}]}
            />
          </View>
          <Text style={styles.indicator}>{`${currentIndex + 1}/7`}</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperContainer}>
              {Object.keys(labelToKeyMap).map((label, index) => (
                <CustomTextInput
                  key={index}
                  label={label}
                  value={carDetailsSecondFormData[labelToKeyMap[label]]}
                  onChangeText={text =>
                    handleSecondInputChange(text, labelToKeyMap[label])
                  }
                  placeholder={`Enter your ${label.toLowerCase()}`}
                />
              ))}
              <View style={{bottom: 25, marginTop: 20}}>
                <CustomButton title="Next" onPress={handleNext2} />
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={styles.slide}>
          <Text style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}>
            Car Details
          </Text>
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBar, {width: getProgressBarWidth()}]}
            />
          </View>
          <Text style={styles.indicator}>{`${currentIndex + 1}/8`}</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperContainer}>
              {Object.keys(labelToKeyMap1).map((label, index) => (
                <CustomTextInput
                  key={index}
                  label={label}
                  value={carDetailsThirdFormData[labelToKeyMap1[label]]}
                  onChangeText={text =>
                    handleThirdInputChange(text, labelToKeyMap1[label])
                  }
                  placeholder={`Enter your ${label.toLowerCase()}`}
                />
              ))}

              <View style={{bottom: 25, marginTop: 20}}>
                <CustomButton title="Next" onPress={handleNext3} />
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={styles.slide}>
          <Text style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}>
            Car Details
          </Text>
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBar, {width: getProgressBarWidth()}]}
            />
          </View>
          <Text style={styles.indicator}>{`${currentIndex + 1}/8`}</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperContainer}>
              {switchStateForVehicleDetails.map((state, index) => {
                const options = getOptions(index);
                return (
                  <React.Fragment key={index}>
                    <View
                      style={{
                        alignItems: 'center',
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 20,
                      }}>
                      <CustomSwichOutside
                        selectionMode={state}
                        roundCorner={false}
                        label={switchTitle[index]}
                        option1={options.option1}
                        option2={options.option2}
                        onSelectSwitch={val =>
                          handleMechanicalInspectionChange(index, val)
                        }
                        selectionColor={'#007BFF'}
                        index={index} // Pass the index as a prop
                      />
                    </View>
                  </React.Fragment>
                );
              })}

              <View style={{bottom: 25, marginTop: 20}}>
                <CustomButton title="Next" onPress={handleNext2} />
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={styles.slide}>
          <Text style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}>
            Car Photos
          </Text>
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
                    <Text>
                      {validations[index] ? 'Update / View' : 'Select'}
                    </Text>
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
          <Text style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}>
            Car Photos
          </Text>
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBar, {width: getProgressBarWidth()}]}
            />
          </View>
          <Text style={styles.indicator}>{`${currentIndex + 1}/8`}</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperContainer}>
              {carDetails.map((title, index) => (
                <View key={index} style={styles.photoContainer}>
                  <Text style={styles.label}>{title}</Text>
                  <TouchableOpacity
                    style={styles.photoInput}
                    onPress={() => carDetailsContainerPress(index)}>
                    <Text>
                      {carValidation[index] ? 'Update / View' : 'Select'}
                    </Text>
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
          <Text style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}>
            Body Inspection
          </Text>
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
                    <Text>
                      {' '}
                      {thirdValidation[index] ? 'Update / View' : 'Select'}
                    </Text>
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
          <Text style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}>
            Mechanical Inspection
          </Text>
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
                    <Text>
                      {secondValidation[index] ? 'Update / View' : 'Select'}
                    </Text>
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
  remarksInput: {
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#f7f8f9',
    borderRadius: 8,
    borderColor: '#e8ecf4',
    borderWidth: 1,
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
