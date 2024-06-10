import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Modal,
  Platform,
  TouchableOpacity,
  BackHandler,
  ActivityIndicator,
  Switch,
  Image,
  Alert,
  Dimensions,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import Marker from 'react-native-image-marker';
import Slider from '@react-native-community/slider';

import SingleSwitch from '../../components/SingleSwitch';
import * as base64js from 'base64-js';
import {Bar} from 'react-native-progress';
import ImageResizer from 'react-native-image-resizer';
import Swiper from 'react-native-swiper';
import CustomSwichOutside from '../../components/CustomSwichOutside';
import CustomSwitch from '../../components/CustomSwitch';
import CustomTextInput from '../../components/customTextInput';
import CustomButton from '../../components/customTextButton';
import {launchCamera} from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';
import RNFS from 'react-native-fs';
import {useNavigation, useRoute, CommonActions} from '@react-navigation/native';
import {apiPostWithToken} from '../../services/apiService';
import {getItem} from '../../utils/asyncStorageUtils';

const {width} = Dimensions.get('window');

const OrderCreation = ({navigation}) => {
  const swiperRef = useRef(null);
  const route = useRoute();
  const {
    vehicleMakeModel,
    vehicleMakerDescription,
    vehicleManufacturedDate,
    vehicleColor,
    vehicleOwnerNumber,
    cubicCapacity,
    vehicleSeatingCapacity,
    rcEngineNumber,
    rcChassisNumber,
    insuranceCompanyName,
    expiryDate,
    registerDate,
    vechicleNumber,
    financer,
  } = route.params;

  console.log(vechicleNumber, 'VECHICLE NUMBER');

  const [make, setMake] = useState(vehicleMakerDescription);
  const [model, setModel] = useState(vehicleMakeModel);
  const [year, setYear] = useState(vehicleManufacturedDate);
  const [variant, setVariant] = useState(vehicleMakeModel);
  const [mileage, setMileage] = useState('');
  const [color, setColor] = useState(vehicleColor);
  const [loading, setLoading] = useState(false);

  const [owners, setOwners] = useState(vehicleOwnerNumber);
  const [hasHypothecated, setHasHypothecated] = useState('');
  const [hypothecatedBy, setHypothecatedBy] = useState(financer);
  const [noc, setNoc] = useState('');
  const [roadTaxValid, setRoadTaxValid] = useState('');
  const [cubicapacity, setCubicCapacity] = useState(cubicCapacity);
  const [numberOfSeats, setNumberOfSeats] = useState(vehicleSeatingCapacity);
  const [registrationType, setRegistrationType] = useState('');
  const [registrationDate, setRegistrationDate] = useState(registerDate);
  const [insurance, setInsurance] = useState('');
  const [insuranceCompany, setInsuranceCompany] =
    useState(insuranceCompanyName);
  const [insuranceValidity, setInsuranceValidity] = useState(expiryDate);
  const [challanDetails, setChallanDetails] = useState('');
  const [blacklisted, setBlacklisted] = useState('');
  const [chassisNumber, setChassisNumber] = useState(rcChassisNumber);
  const [engineNumber, setEngineNumber] = useState(rcEngineNumber);
  const [rcStatus, setRcStatus] = useState('');
  const [stateNoc, setStateNoc] = useState('');
  const [flood, setFlood] = useState('');

  const [selectedOption, setSelectedOption] = useState(1);
  const [selectedOption1, setSelectedOption1] = useState(1);
  const [selectedOption2, setSelectedOption2] = useState(1);
  const [selectedOption3, setSelectedOption3] = useState(2);
  const [selectedOption4, setSelectedOption4] = useState(1);
  const [selectedOption5, setSelectedOption5] = useState(1);
  const [selectedOption6, setSelectedOption6] = useState(1);
  const [selectedOption7, setSelectedOption7] = useState(1);
  const [selectedOption8, setSelectedOption8] = useState(1);
  const [selectedOption9, setSelectedOption9] = useState(1);
  const [selectedOption10, setSelectedOption10] = useState(1);

  const handleChange = option => {
    setSelectedOption(option);
  };

  // const [carDetailsSecondFormData, setCarDetailsSecondFormData] = useState({
  //   cubicCapacity: '',
  //   numberOfSeats: '',
  //   registrationType: '',
  //   registrationDate: '',
  //   insuranceCompany: '',
  //   insuranceValidity: '',
  //   chellanDetails: '',

  //   chassisNumber: '',
  //   engineNumber: '',
  // });

  // const labelToKeyMap = {
  //   'Cubic Capacity': 'cubicCapacity',
  //   'Number of seats': 'numberOfSeats',
  //   'Registration type': 'registrationType',
  //   'Registration Date': 'registrationDate',
  //   'Insurance Company': 'insuranceCompany',
  //   'Insurance Validity': 'insuranceValidity',
  //   'Challan Details': 'chellanDetails',

  //   'Chassis Number': 'chassisNumber',
  //   'Engine Number': 'engineNumber',
  // };

  const handleSwitchSelection = value => {
    setSelectedOption(value);
    console.log(`Selected value: ${value}`);
  };

  const handleSwitchSelection1 = value => {
    setSelectedOption1(value);
    console.log(`Selected value: ${value}`);
  };

  const handleSwitchSelection2 = value => {
    setSelectedOption2(value);
    console.log(`Selected value: ${value}`);
  };

  const handleSwitchSelection3 = value => {
    setSelectedOption3(value);
    console.log(`Selected value: ${value}`);
  };

  const handleSwitchSelection4 = value => {
    setSelectedOption4(value);
    console.log(`Selected value: ${value}`);
  };

  const handleSwitchSelection5 = value => {
    setSelectedOption5(value);
    console.log(`Selected value: ${value}`);
  };

  const handleSwitchSelection6 = value => {
    setSelectedOption6(value);
    console.log(`Selected value: ${value}`);
  };

  const handleSwitchSelection7 = value => {
    setSelectedOption7(value);
    console.log(`Selected value: ${value}`);
  };

  const handleSwitchSelection8 = value => {
    setSelectedOption8(value);
    console.log(`Selected value: ${value}`);
  };

  const handleSwitchSelection9 = value => {
    setSelectedOption9(value);
    console.log(`Selected value: ${value}`);
  };

  const handleSwitchSelection10 = value => {
    setSelectedOption10(value);
    console.log(`Selected value: ${value}`);
  };

  const [carDetailsThirdFormData, setCarDetailsThirdFormData] = useState({
    insuranceCompany: '',
    insuranceValidity: '',
    chellanDetails: '',

    chassisNumber: '',
    engineNumber: '',
  });

  const [sliderValue, setSliderValue] = useState(0);

  const getTrackColor = value => {
    if (value < 0.25) return 'red';
    if (value < 0.5) return 'orange';
    if (value < 0.75) return 'yellow';
    return 'green';
  };

  const photos = ['RC frontPhoto', 'Insurance frontPhoto', 'Noc Photo'];
  const carPhotosList = [
    'FrontView Photo',
    'RearView Photo',
    'LHSView Photo',
    'RHSView Photo',
    'OdoMeter Photo',
    'Roof Photo',
    'Interior Photo',
    'UnderChassis Photo',
    'EngineRoom Photo',
    'TrunkBoot Photo',
  ];
  const carDetailsPhotosList = [
    'ChassisPunch Photo',
    'VinPlate Photo',
    'FrontTyres Photo',
    'SpareWheel Photo',
    'ToolKit Photo',
    'SpareKey Photo',
  ];
  const mechanicalInspectionList = [
    'Suspension Photo',
    'Steering Photo',
    'Brake Photo',
    'Transmission Photo',
    'Engine Photo',
    'Electrical Photo',
    'AC Photo',
    'Accessories Photo',
  ];
  const bodyInspectionList = [
    'Pillar A LeftSide Photo',
    'Apron LeftSide Photo',
    'Fenders LeftSide Photo',
    'QuarterPanels  LeftSide Photo',
    'Running LeftSide Photo',
    'DoorFront LeftSide Photo',
    'Boot Photo',
    'BootSkirt Photo',
    'Bonet Photo',
    'SupportMembers Upper Photo',
    'BumberFront Photo',
    'WheelType Alloy Photo',
    'WindShield FrontTyre Photo',
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [inspectionVisible, setInspectionVisible] = useState(false);
  const [bodyInspectionVisible, setBodyInspectionVisible] = useState(false);
  const [carDetailsInspection, setCarDetailsInspection] = useState(false);
  const [remarks, setRemarks] = useState(Array.from({length: 3}, () => ''));

  const [base64Strings, setBase64Strings] = useState(
    Array.from({length: 3}, () => null),
  );

  useEffect(() => {
    if (base64CarPhotos[2]) {
      console.log(base64CarPhotos[0].substring(0, 25));
    }
  }, [base64CarPhotos]);

  const [
    base64StringsForMechanicalInspection,
    setBase64StringsForMechanicalInspection,
  ] = useState(Array.from({length: 8}, () => null));

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
    Array.from({length: 3}, () => null),
  );

  const [photoUrisCarPhotos, setPhotoUrisCarPhotos] = useState(
    Array.from({length: 10}, () => null),
  );

  const [carPhotosRemarks, setCarPhotoRemarks] = useState(
    Array.from({length: 10}, () => null),
  );

  const [photoUris1, setPhotoUris1] = useState('');

  const [base64Strings1, setBase64Strings1] = useState('');

  const [photoUris2, setPhotoUris2] = useState('');

  const [base64Strings2, setBase64Strings2] = useState('');

  const [inspectionPhotos, setInspectionPhotos] = useState(
    Array.from({length: 8}, () => null),
  );

  const [bodyInspectionPhotos, setBodyInspectionPhotos] = useState(
    Array.from({length: 13}, () => null),
  );

  const [base64CarPhotos, setBase64Photos] = useState(
    Array.from({length: 10}, () => null),
  );

  const [base64BodyInspection, setBase64BodyInspection] = useState(
    Array.from({length: 13}, () => null),
  );
  const [bodyInspectionPhotosForPillars, setbodyInspectionPhotosForPillars] =
    useState('');
  const [bodyInspectionPhotosForPillars2, setbodyInspectionPhotosForPillars2] =
    useState('');
  const [bodyInspectionPhotosForPillars3, setbodyInspectionPhotosForPillars3] =
    useState('');
  const [bodyInspectionPhotosForPillars4, setbodyInspectionPhotosForPillars4] =
    useState('');
  const [bodyInspectionPhotosForPillars5, setbodyInspectionPhotosForPillars5] =
    useState('');

  const [base64StringsPillars, setBase64StringsPillars] = useState('');
  const [base64StringsPillars2, setBase64StringsPillars2] = useState('');
  const [base64StringsPillars3, setBase64StringsPillars3] = useState('');
  const [base64StringsPillars4, setBase64StringsPillars4] = useState('');
  const [base64StringsPillars5, setBase64StringsPillars5] = useState('');

  const [bodyInspectionDoor1, setBodyInspectionDoor1] = useState(
    Array.from({length: 13}, () => null),
  );

  const [bodyInspectionDoor2, setBodyInspectionDoor2] = useState(
    Array.from({length: 13}, () => null),
  );
  const [bodyInspectionDoor3, setBodyInspectionDoor3] = useState(
    Array.from({length: 13}, () => null),
  );

  const [base64BodyInspectionDoor1, setBase64BodyInspectionDoor1] = useState(
    Array.from({length: 4}, () => null),
  );

  const [base64BodyInspectionDoor2, setBase64BodyInspectionDoor2] = useState(
    Array.from({length: 4}, () => null),
  );

  const [base64BodyInspectionDoor3, setBase64BodyInspectionDoor3] = useState(
    Array.from({length: 4}, () => null),
  );

  const [bodyInspectionPhotos2, setBodyInspectionPhotos2] = useState(
    Array.from({length: 7}, () => null),
  );

  const [base64BodyInspectionPhotos2, setBase64BodyInspectionPhotos2] =
    useState(Array.from({length: 7}, () => null));

  const [carDetailsPhoto, setCarDetailsPhoto] = useState(
    Array.from({length: 6}, () => null),
  );

  const [base64CarDetailsPhoto, setBase64CarDetailsPhoto] = useState(
    Array.from({length: 6}, () => null),
  );

  const [base64CarDetailsPhoto2, setBase64CarDetailsPhoto2] = useState('');

  const [base64CarDetailsPhoto3, setBase64CarDetailsPhoto3] = useState('');

  const [base64CarDetailsPhoto4, setBase64CarDetailsPhoto4] = useState('');
  const [base64CarDetailsPhoto5, setBase64CarDetailsPhoto5] = useState('');
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
  const [selectedContainerIndex1, setSelectedContainerIndex1] = useState(null);
  const [selectedInspectionIndex, setSelectedInspectionIndex] = useState(null);
  const [selectedBodyInspectionIndex, setSelectedBodyInspectionIndex] =
    useState(null);

  const [carDetailsIndex, setCarDetailsIndex] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    // const isFormComplete = Object.values(carDetailsFormData).every(value => {
    //   console.log('Value:', value, 'Trimmed:', value.trim());
    //   return value.trim() !== '';
    // });

    // const isFormComplete2 = Object.values(carDetailsSecondFormData).every(
    //   value => {
    //     console.log('Value:', value, 'Trimmed:', value.trim());
    //     return value.trim() !== '';
    //   },
    // );

    // console.log(isFormComplete2, 'iSHGFHFHG');

    // // const isFormComplete = Object.values(carDetailsFormData).every(value => value.trim() !== '');

    // console.log(carDetailsFormData, 'cetd');

    // console.log(isFormComplete, 'log');
    // const isFormCompleteCarDetails2 = Object.values(
    //   carDetailsSecondFormData,
    // ).every(value => value != '');

    // const isFormCompleteCarDetails3 = Object.values(
    //   carDetailsThirdFormData,
    // ).every(value => value != '');

    // if (isFormComplete) {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
    // } else {
    //   ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
    // }
  };

  const handleDocuments = async () => {
    setLoading(true); // Show activity indicator

    const itemId = await getItem('dealarId');

    console.log(itemId, 'DEKARWR');
    const params = {
      dealerId: itemId,
      vechNumber: vechicleNumber,
      make: make,
      model: model,
      year: year,
      variant: variant,
      mileage: mileage,
      color: color,
      transmission: selectedOption == 1 ? 'Automatic' : 'Manual',
      fuelType: selectedOption1 == 1 ? 'Diesel' : 'Petrol',
      alteration: selectedOption2 == 1 ? 'CNG' : 'LPG',
      owners: owners,
      hasHypothecated: selectedOption3 == 1 ? 'Yes' : 'No',
      hypothecatedBy: hypothecatedBy,
      noc: selectedOption4 == 1 ? 'Yes' : 'No',
      roadTaxValid: roadTaxValid,
      reRegistered: selectedOption5 == 1 ? 'Yes' : 'No',
      cubicCapacity: cubicCapacity,
      numberOfSeats: numberOfSeats,
      registrationType: registrationType,
      registrationDate: registrationDate,
      insurance: selectedOption6 == 1 ? 'Yes' : 'No',
      insuranceCompany: insuranceCompany,
      insuranceValidity: insuranceValidity,
      challanDetails: challanDetails,
      blacklisted: selectedOption7 == 1 ? 'Yes' : 'No',
      chassisNumber: chassisNumber,
      engineNumber: engineNumber,
      rcStatus: selectedOption8 == 1 ? 'Original' : 'Duplicate',
      stateNoc: selectedOption9 == 1 ? 'Yes' : 'No',
      flood: selectedOption10 == 1 ? 'Yes' : 'No',
      rcFrontPhoto: base64Strings[0],
      rcBackPhoto: base64Strings1,
      rcRemarks: remarks[0],
      insuranceOwnDamagePhoto: base64Strings[1],
      insuranceThirdPartyPhoto: base64Strings2,
      insuranceRemarks: remarks[1],
      nocPhoto: base64Strings[2],
      nocRemarks: remarks[2],
      frontViewPhoto: base64CarPhotos[0],
      frontViewRemarks: carPhotosRemarks[0],
      rearViewPhoto: base64CarPhotos[1],
      rearViewRemarks: carPhotosRemarks[1],
      lhsViewPhoto: base64CarPhotos[2],
      lhsViewRemarks: carPhotosRemarks[2],
      rhsViewPhoto: base64CarPhotos[3],
      rhsViewRemarks: carPhotosRemarks[3],
      odometerPhoto: base64CarPhotos[4],
      odometerRemarks: carPhotosRemarks[4],
      roofPhoto: base64CarPhotos[5],
      roofRemarks: carPhotosRemarks[5],
      interiorPhoto: base64CarPhotos[6],
      interiorRemarks: carPhotosRemarks[6],
      underChassisPhoto: base64CarPhotos[7],
      underChassisRemarks: carPhotosRemarks[7],
      engineRoomPhoto: base64CarPhotos[8],
      engineRoomRemarks: carPhotosRemarks[8],
      trunkBootPhoto: base64CarPhotos[9],
      trunkBootRemarks: carPhotosRemarks[9],
      chassisPunchPhoto: base64CarDetailsPhoto[0],
      chasisPunchCondition: carDetailsValues[0],
      chassisPunchRemarks: carDetailsRemarks[0],
      vinPlatePhoto: base64CarDetailsPhoto[1],
      vinPlateCondition: carDetailsValues[1],
      vinPlateRemarks: carDetailsRemarks[1],
      spareWheelPhoto: base64CarDetailsPhoto[3],
      spareWheelCondition: carDetailsValues[3],
      spareWheelRemarks: carDetailsRemarks[3],
      toolKitJackPhoto: base64CarDetailsPhoto[4],
      toolKitJackCondition: carDetailsValues[4],
      toolKitRemarks: carDetailsRemarks[4],
      primaryKeyPhoto: base64CarDetailsPhoto[5],
      primaryKeyCondition: carDetailsValues[5],
      primarKeyRemarks: carDetailsRemarks[5],
      spareKeyPhoto: base64CarDetailsPhoto5,
      pillarALeftSidePhoto: base64BodyInspection[0],
      pillarARightSidePhoto: base64StringsPillars,
      pillarBLeftSidePhoto: base64StringsPillars2,
      pillarBRightSidePhoto: base64StringsPillars3,
      pillarCLeftSidePhoto: base64StringsPillars4,
      pillarCRightSidePhoto: base64StringsPillars5,
      pillarCondition: bodyInspectionValues[0],
      pillarRemarks: bodyInspectionRemarks[0],
      apronLeftSidePhoto: base64BodyInspection[1],
      apronRightSidePhoto: base64BodyInspectionPhotos2[0],
      apronCondition: bodyInspectionValues[1],
      apronRemarks: bodyInspectionRemarks[1],
      fendersRightSidePhoto: base64BodyInspection[2],
      fendersLeftSidePhoto: base64BodyInspectionPhotos2[1],
      fendersCondition: bodyInspectionValues[2],
      fendersRemarks: bodyInspectionRemarks[2],
      quarterPanelsLeftSidePhoto: base64BodyInspection[3],
      quarterPanelsRightSidePhoto: base64BodyInspectionPhotos2[2],
      quarterPanelsCondition: bodyInspectionValues[3],
      quarterPanelsRemarks: bodyInspectionRemarks[3],
      runningBoardLeftSidePhoto: base64BodyInspection[4],
      runningBoardRightSidePhoto: base64BodyInspectionPhotos2[3],
      runningBoardCondition: bodyInspectionValues[4],
      runningBoardRemarks: bodyInspectionRemarks[4],
      doorsFrontRightSidePhoto: base64BodyInspection[5],
      doorsFrontLeftSidePhoto: base64BodyInspectionDoor1[0],
      doorsRearRightSidePhoto: base64BodyInspectionDoor2[0],
      doorsRearLeftSidePhoto: base64BodyInspectionDoor3[0],
      doorConditon: bodyInspectionValues[5],
      doorRemarks: bodyInspectionRemarks[5],
      bootPhoto: base64BodyInspection[6],
      bootCondition: bodyInspectionValues[6],
      bootRemarks: bodyInspectionRemarks[6],
      bootSkirtPhoto: base64BodyInspection[7],
      bootSkirtCondition: bodyInspectionValues[7],
      bootSkirtRemarks: bodyInspectionRemarks[7],
      bonetPhoto: base64BodyInspection[8],
      bonetCondition: bodyInspectionValues[8],
      bonetRemarks: bodyInspectionRemarks[8],
      supportMemberUpperPhoto: base64BodyInspection[9],
      supportMemberLowerPhoto: base64BodyInspectionDoor1[1],
      headLampSupportRightSidePhoto: base64BodyInspectionDoor2[1],
      headLampSupportLeftSidePhoto: base64BodyInspectionDoor3[1],
      supportMembersCondition: bodyInspectionValues[9],
      supportMembersRemarks: bodyInspectionRemarks[9],
      bumperFrontPhoto: base64BodyInspection[10],
      bumperRearPhoto: base64BodyInspectionPhotos2[4],
      bumberCondition: bodyInspectionValues[10],
      bumberRemarks: bodyInspectionRemarks[10],
      wheelTypeAlloyPhoto: base64BodyInspection[11],
      wheelTypeDrumPhoto: base64BodyInspectionPhotos2[5],
      wheelCondition: bodyInspectionValues[11],
      wheelRemarks: bodyInspectionRemarks[11],
      windShieldFrontTyrePhoto: base64BodyInspection[12],
      windShieldRearTyrePhoto: base64BodyInspectionPhotos2[6],
      windShieldCondition: bodyInspectionValues[12],
      windShieldRemarks: bodyInspectionRemarks[12],
      suspensionPhoto: base64StringsForMechanicalInspection[0],
      suspensionCondition: selectedValuesForCondition[0],
      suspensionDropDown: selectedValues[0],
      suspensionRemarks: inspectionRemarks[0],
      steeringPhoto: base64StringsForMechanicalInspection[1],
      steeringCondition: selectedValuesForCondition[1],
      steeringDropDown: selectedValues[1],
      steeringRemarks: inspectionRemarks[1],
      brakePhoto: base64StringsForMechanicalInspection[2],
      brakeCondition: selectedValuesForCondition[2],
      brakeDropDown: selectedValues[2],
      brakeRemarks: inspectionRemarks[2],
      transmissionPhoto: base64StringsForMechanicalInspection[3],
      transmissionCondition: selectedValuesForCondition[3],
      transmissionDropDown: selectedValues[3],
      transmissionRemarks: inspectionRemarks[3],
      enginePhoto: base64StringsForMechanicalInspection[4],
      engineCondition: selectedValuesForCondition[4],
      engineDropDown: selectedValues[4],
      engineRemarks: inspectionRemarks[4],
      electricalPhoto: base64StringsForMechanicalInspection[5],
      electricalCondition: selectedValuesForCondition[5],
      electricalDropDown: selectedValues[5],
      electricalRemarks: inspectionRemarks[5],
      acPhoto: base64StringsForMechanicalInspection[6],
      acCondition: selectedValuesForCondition[6],
      acDropDown: selectedValues[6],
      acRemarks: inspectionRemarks[6],
      accessoriesPhoto: base64StringsForMechanicalInspection[7],
      accessoriesCondition: selectedValuesForCondition[7],
      accessoriesDropDown: selectedValues[7],
      accessoriesRemarks: inspectionRemarks[7],
    };

    try {
      const data = await apiPostWithToken('createOrder', params);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Dashboard'}],
        }),
      );
    } catch (error) {
      // Handle errors here
      console.error('Request failed:', error);
    } finally {
      setLoading(false); // Hide activity indicator
    }
  };

  const handleNext2 = () => {
    // const isFormComplete2 = Object.values(carDetailsSecondFormData).every(
    //   value => {
    //     console.log('Value:', value, 'Trimmed:', value.trim());
    //     return value.trim() !== '';
    //   },
    // );

    // console.log(isFormComplete2);
    // console.log(carDetailsSecondFormData, 'car detauls firnm datsvvv');

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

  const handleSubmit = async () => {
    try {
      const data = await apiPostWithToken('fileupload', params);

      // console.log(data, 'DATA IS THERE..............');
      // Navigate to the dashboard or handle the successful response
      navigation.navigate('Dashboard');
    } catch (error) {
      // Handle errors here
      console.error('Request failed:', error);
    }

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

        const uri = newPhotoUris[selectedContainerIndex];

        // Resize and compress the image with quality set to 10
        ImageResizer.createResizedImage(uri, 400, 300, 'JPEG', 10) // Quality set to 10
          .then(compressedImage => {
            RNFS.readFile(compressedImage.uri, 'base64')
              .then(base64 => {
                const imageType = getImageType(base64);

                if (imageType) {
                  const base64Image = `data:image/${imageType};base64,${base64}`;

                  const newBase64Strings = [...base64Strings];
                  newBase64Strings[selectedContainerIndex] = base64Image;

                  setBase64Strings(newBase64Strings);
                } else {
                  console.log('Unknown image type');
                }
              })
              .catch(e => {
                console.log('Error converting file to base64', e);
              });
          })
          .catch(e => {
            console.log('Error resizing image', e);
          });
      }
    });
  };

  // const openCamera = () => {
  //   launchCamera({mediaType: 'photo'}, response => {
  //     if (response.assets && response.assets.length > 0) {
  //       const newPhotoUris = [...photoUris];
  //       newPhotoUris[selectedContainerIndex] = response.assets[0].uri;
  //       setPhotoUris(newPhotoUris);
  
  //       const uri = newPhotoUris[selectedContainerIndex];
  
  //       // Resize and compress the image with quality set to 10
  //       ImageResizer.createResizedImage(uri, 400, 300, 'JPEG', 10) // Quality set to 10
  //         .then(compressedImage => {
  //           // Get current date and time
  //           const currentDateTime = new Date();
  //           const date = currentDateTime.toLocaleDateString();
  //           const time = currentDateTime.toLocaleTimeString();
  
  //           // Overlay date and time on the image
  //           Marker.markText({
  //             src: compressedImage.uri,
  //             text: `${date} ${time}`,
  //             X: 20,
  //             Y: 280,
  //             color: 'blue',
  //             fontName: 'Arial',
  //             fontSize: 20,
  //             scale: 1,
  //             quality: 100,
  //             position: 'bottomLeft',
  //           })
  //             .then((markedImagePath) => {
  //               RNFS.readFile(markedImagePath, 'base64')
  //                 .then(base64 => {
  //                   const imageType = getImageType(base64);
  
  //                   if (imageType) {
  //                     const base64Image = `data:image/${imageType};base64,${base64}`;
  
  //                     const newBase64Strings = [...base64Strings];
  //                     newBase64Strings[selectedContainerIndex] = base64Image;
  
  //                     setBase64Strings(newBase64Strings);
  //                   } else {
  //                     console.log('Unknown image type');
  //                   }
  //                 })
  //                 .catch(e => {
  //                   console.log('Error converting file to base64', e);
  //                 });
  //             })
  //             .catch(e => {
  //               console.log('Error marking image', e);
  //             });
  //         })
  //         .catch(e => {
  //           console.log('Error resizing image', e);
  //         });
  //     }
  //   });
  // };

  // const imageType = getImageType(base64);

  //           if (imageType) {
  //             const base64Image = `data:image/${imageType};base64,${base64}`;

  //             const newBase64Strings = [...base64CarPhotos];
  //             newBase64Strings[selectedContainerIndex1] = base64Image;

  //              // Display first 15 characters of the new Base64 string
  //             setBase64Photos(newBase64Strings);
  //           } else {
  //             console.log('Unknown image type');
  //           }
  //         })

  const openCameraCarPhotos = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...photoUrisCarPhotos];
        newPhotoUris[selectedContainerIndex1] = response.assets[0].uri;
        setPhotoUrisCarPhotos(newPhotoUris);

        // Resize and compress the image with quality set to 10
        ImageResizer.createResizedImage(
          response.assets[0].uri,
          400,
          300,
          'JPEG',
          10,
        ) // Quality set to 10
          .then(resizedImage => {
            RNFS.readFile(resizedImage.uri, 'base64')
              .then(base64 => {
                const imageType = getImageType(base64);
                if (imageType) {
                  const base64Image = `data:image/${imageType};base64,${base64}`;
                  const newBase64Strings = [...base64CarPhotos];
                  newBase64Strings[selectedContainerIndex1] = base64Image;
                  // Display first 15 characters of the new Base64 string
                  setBase64Photos(newBase64Strings);
                } else {
                  console.log('Unknown image type');
                }
              })
              .catch(e => {
                console.log('Error converting file to base64', e);
              });
          })
          .catch(error => {
            console.log('Error resizing image:', error);
          });
      }
    });
  };

  const openCamera1 = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...photoUris1];
        newPhotoUris[selectedContainerIndex] = response.assets[0].uri;
        setPhotoUris1(newPhotoUris);
        ImageResizer.createResizedImage(
          response.assets[0].uri,
          400,
          300,
          'JPEG',
          10,
        )
          .then(resizedImage => {
            RNFS.readFile(resizedImage.uri, 'base64')
              .then(base64 => {
                const imageType = getImageType(base64);
                if (imageType) {
                  const base64Image = `data:image/${imageType};base64,${base64}`;
                  setBase64Strings1(base64Image);
                } else {
                  console.log('Unknown image type');
                }
              })
              .catch(e => {
                console.log('Error converting file to base64', e);
              });
          })
          .catch(error => {
            console.log('Error resizing image:', error);
          });
      }
    });
  };

  function getImageType(base64) {
    const byteArray = base64js.toByteArray(base64.substring(0, 8));

    // Check for JPEG
    if (
      byteArray[0] === 0xff &&
      byteArray[1] === 0xd8 &&
      byteArray[2] === 0xff
    ) {
      return 'jpeg';
    }

    // Check for PNG
    if (
      byteArray[0] === 0x89 &&
      byteArray[1] === 0x50 &&
      byteArray[2] === 0x4e &&
      byteArray[3] === 0x47
    ) {
      return 'png';
    }

    // Check for GIF
    if (
      byteArray[0] === 0x47 &&
      byteArray[1] === 0x49 &&
      byteArray[2] === 0x46
    ) {
      return 'gif';
    }

    return null;
  }

  const openCamera2 = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...photoUris2];
        newPhotoUris[selectedContainerIndex] = response.assets[0].uri;
        setPhotoUris2(newPhotoUris);
        ImageResizer.createResizedImage(
          response.assets[0].uri,
          400,
          300,
          'JPEG',
          10,
        )
          .then(resizedImage => {
            RNFS.readFile(resizedImage.uri, 'base64')
              .then(base64 => {
                const imageType = getImageType(base64);
                if (imageType) {
                  const base64Image = `data:image/${imageType};base64,${base64}`;
                  setBase64Strings2(base64Image);
                } else {
                  console.log('Unknown image type');
                }
              })
              .catch(e => {
                console.log('Error converting file to base64', e);
              });
          })
          .catch(error => {
            console.log('Error resizing image:', error);
          });
      }
    });
  };

  const openCameraForInspection = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...inspectionPhotos];
        newPhotoUris[selectedInspectionIndex] = response.assets[0].uri;
        setInspectionPhotos(newPhotoUris);

        // Resize and compress the image with quality set to 10
        ImageResizer.createResizedImage(
          newPhotoUris[selectedInspectionIndex],
          400,
          300,
          'JPEG',
          10,
        )
          .then(resizedImage => {
            RNFS.readFile(resizedImage.uri, 'base64')
              .then(base64 => {
                const imageType = getImageType(base64);

                if (imageType) {
                  const base64Image = `data:image/${imageType};base64,${base64}`;

                  const newBase64Strings = [
                    ...base64StringsForMechanicalInspection,
                  ];
                  newBase64Strings[selectedInspectionIndex] = base64Image;

                  setBase64StringsForMechanicalInspection(newBase64Strings);
                } else {
                  console.log('Unknown image type');
                }
              })
              .catch(e => {
                console.log('Error converting file to base64', e);
              });
          })
          .catch(error => {
            console.log('Error resizing image:', error);
          });
      }
    });
  };

  const openCameraForBodyInspection = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...bodyInspectionPhotos];
        newPhotoUris[selectedBodyInspectionIndex] = response.assets[0].uri;
        setBodyInspectionPhotos(newPhotoUris);

        // Resize and compress the image with quality set to 10
        ImageResizer.createResizedImage(
          newPhotoUris[selectedBodyInspectionIndex],
          400,
          300,
          'JPEG',
          10,
        )
          .then(resizedImage => {
            RNFS.readFile(resizedImage.uri, 'base64')
              .then(base64 => {
                const imageType = getImageType(base64);

                if (imageType) {
                  const base64Image = `data:image/${imageType};base64,${base64}`;

                  const newBase64Strings = [...base64BodyInspection];
                  newBase64Strings[selectedBodyInspectionIndex] = base64Image;

                  setBase64BodyInspection(newBase64Strings);
                } else {
                  console.log('Unknown image type');
                }
              })
              .catch(e => {
                console.log('Error converting file to base64', e);
              });
          })
          .catch(error => {
            console.log('Error resizing image:', error);
          });
      }
    });
  };

  const openCameraForBodyInspectionPillars1 = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        // const newPhotoUris = [...bodyInspectionPhotosForPillars];
        // newPhotoUris[selectedBodyInspectionIndex] = response.assets[0].uri;
        setbodyInspectionPhotosForPillars(response.assets[0].uri);

        // Resize and compress the image with quality set to 10
        ImageResizer.createResizedImage(
          response.assets[0].uri,
          400,
          300,
          'JPEG',
          10,
        )
          .then(resizedImage => {
            RNFS.readFile(resizedImage.uri, 'base64')
              .then(base64 => {
                const imageType = getImageType(base64);

                if (imageType) {
                  const base64Image = `data:image/${imageType};base64,${base64}`;

                  setBase64StringsPillars(base64Image);
                } else {
                  console.log('Unknown image type');
                }
              })
              .catch(e => {
                console.log('Error converting file to base64', e);
              });
          })
          .catch(error => {
            console.log('Error resizing image:', error);
          });
      }
    });
  };

  const openCameraForBodyInspetionDoor1 = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...bodyInspectionDoor1];
        newPhotoUris[selectedBodyInspectionIndex] = response.assets[0].uri;
        setBodyInspectionDoor1(newPhotoUris);

        // Resize and compress the image with quality set to 10
        ImageResizer.createResizedImage(
          newPhotoUris[selectedBodyInspectionIndex],
          400,
          300,
          'JPEG',
          10,
        )
          .then(resizedImage => {
            RNFS.readFile(resizedImage.uri, 'base64')
              .then(base64 => {
                const imageType = getImageType(base64);

                if (imageType) {
                  const base64Image = `data:image/${imageType};base64,${base64}`;

                  const newBase64Strings = [...base64BodyInspectionDoor1];
                  newBase64Strings[selectedBodyInspectionIndex] = base64Image;
                  setBase64BodyInspectionDoor1(newBase64Strings);
                } else {
                  console.log('Unknown image type');
                }
              })
              .catch(e => {
                console.log('Error converting file to base64', e);
              });
          })
          .catch(error => {
            console.log('Error resizing image:', error);
          });
      }
    });
  };

  const openCameraForBodyInspectionDoor2 = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...bodyInspectionDoor2];
        newPhotoUris[selectedBodyInspectionIndex] = response.assets[0].uri;
        setBodyInspectionDoor2(newPhotoUris);

        // Resize and compress the image with quality set to 10
        ImageResizer.createResizedImage(
          newPhotoUris[selectedBodyInspectionIndex],
          400,
          300,
          'JPEG',
          10,
        )
          .then(resizedImage => {
            RNFS.readFile(resizedImage.uri, 'base64')
              .then(base64 => {
                const imageType = getImageType(base64);

                if (imageType) {
                  const base64Image = `data:image/${imageType};base64,${base64}`;

                  const newBase64Strings = [...base64BodyInspectionDoor2];
                  newBase64Strings[selectedBodyInspectionIndex] = base64Image;
                  setBase64BodyInspectionDoor2(newBase64Strings);
                } else {
                  console.log('Unknown image type');
                }
              })
              .catch(e => {
                console.log('Error converting file to base64', e);
              });
          })
          .catch(error => {
            console.log('Error resizing image:', error);
          });
      }
    });
  };

  const openCameraForBodyInspectionDoor3 = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...bodyInspectionDoor3];
        newPhotoUris[selectedBodyInspectionIndex] = response.assets[0].uri;
        setBodyInspectionDoor3(newPhotoUris);

        // Resize and compress the image with quality set to 10
        ImageResizer.createResizedImage(
          newPhotoUris[selectedBodyInspectionIndex],
          400,
          300,
          'JPEG',
          10,
        )
          .then(resizedImage => {
            RNFS.readFile(resizedImage.uri, 'base64')
              .then(base64 => {
                const imageType = getImageType(base64);

                if (imageType) {
                  const base64Image = `data:image/${imageType};base64,${base64}`;

                  const newBase64Strings = [...base64BodyInspectionDoor3];
                  newBase64Strings[selectedBodyInspectionIndex] = base64Image;
                  setBase64BodyInspectionDoor3(newBase64Strings);
                } else {
                  console.log('Unknown image type');
                }
              })
              .catch(e => {
                console.log('Error converting file to base64', e);
              });
          })
          .catch(error => {
            console.log('Error resizing image:', error);
          });
      }
    });
  };

  const openCameraForBodyInspectionPillars2 = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        // const newPhotoUris = [...bodyInspectionPhotosForPillars2];
        // newPhotoUris[selectedBodyInspectionIndex] = response.assets[0].uri;
        setbodyInspectionPhotosForPillars2(response.assets[0].uri);

        // Resize and compress the image with quality set to 10
        ImageResizer.createResizedImage(
          response.assets[0].uri,
          400,
          300,
          'JPEG',
          10,
        )
          .then(resizedImage => {
            RNFS.readFile(resizedImage.uri, 'base64')
              .then(base64 => {
                const imageType = getImageType(base64);

                if (imageType) {
                  const base64Image = `data:image/${imageType};base64,${base64}`;

                  setBase64StringsPillars2(base64Image);
                } else {
                  console.log('Unknown image type');
                }
              })
              .catch(e => {
                console.log('Error converting file to base64', e);
              });
          })
          .catch(error => {
            console.log('Error resizing image:', error);
          });
      }
    });
  };

  const openCameraForBodyInspectionPillars3 = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        // const newPhotoUris = [...bodyInspectionPhotosForPillars3];
        // newPhotoUris[selectedBodyInspectionIndex] = ;
        setbodyInspectionPhotosForPillars3(response.assets[0].uri);

        // Resize and compress the image with quality set to 10
        ImageResizer.createResizedImage(
          response.assets[0].uri,
          400,
          300,
          'JPEG',
          10,
        )
          .then(resizedImage => {
            RNFS.readFile(resizedImage.uri, 'base64')
              .then(base64 => {
                const imageType = getImageType(base64);

                if (imageType) {
                  const base64Image = `data:image/${imageType};base64,${base64}`;

                  setBase64StringsPillars3(base64Image);
                } else {
                  console.log('Unknown image type');
                }
              })
              .catch(e => {
                console.log('Error converting file to base64', e);
              });
          })
          .catch(error => {
            console.log('Error resizing image:', error);
          });
      }
    });
  };

  const openCameraForBodyInspectionPillars4 = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        // const newPhotoUris = [...bodyInspectionPhotosForPillars4];
        // newPhotoUris[selectedBodyInspectionIndex] = response.assets[0].uri;
        setbodyInspectionPhotosForPillars4(response.assets[0].uri);

        // Resize and compress the image with quality set to 10
        ImageResizer.createResizedImage(
          response.assets[0].uri,
          400,
          300,
          'JPEG',
          10,
        )
          .then(resizedImage => {
            RNFS.readFile(resizedImage.uri, 'base64')
              .then(base64 => {
                const imageType = getImageType(base64);

                if (imageType) {
                  const base64Image = `data:image/${imageType};base64,${base64}`;

                  setBase64StringsPillars4(base64Image);
                } else {
                  console.log('Unknown image type');
                }
              })
              .catch(e => {
                console.log('Error converting file to base64', e);
              });
          })
          .catch(error => {
            console.log('Error resizing image:', error);
          });
      }
    });
  };

  const openCameraForBodyInspectionPillars5 = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        // const newPhotoUris = [...bodyInspectionPhotosForPillars5];
        // newPhotoUris[selectedBodyInspectionIndex] = response.assets[0].uri;
        setbodyInspectionPhotosForPillars5(response.assets[0].uri);

        // Resize and compress the image with quality set to 10
        ImageResizer.createResizedImage(
          response.assets[0].uri,
          400,
          300,
          'JPEG',
          10,
        )
          .then(resizedImage => {
            RNFS.readFile(resizedImage.uri, 'base64')
              .then(base64 => {
                const imageType = getImageType(base64);

                if (imageType) {
                  const base64Image = `data:image/${imageType};base64,${base64}`;

                  setBase64StringsPillars5(base64Image);
                } else {
                  console.log('Unknown image type');
                }
              })
              .catch(e => {
                console.log('Error converting file to base64', e);
              });
          })
          .catch(error => {
            console.log('Error resizing image:', error);
          });
      }
    });
  };

  const openCameraForBodyInspection2 = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...bodyInspectionPhotos2];
        newPhotoUris[selectedBodyInspectionIndex] = response.assets[0].uri;
        setBodyInspectionPhotos2(newPhotoUris);

        // Resize and compress the image with quality set to 10
        ImageResizer.createResizedImage(
          newPhotoUris[selectedBodyInspectionIndex],
          400,
          300,
          'JPEG',
          10,
        )
          .then(resizedImage => {
            RNFS.readFile(resizedImage.uri, 'base64')
              .then(base64 => {
                const imageType = getImageType(base64);

                if (imageType) {
                  const base64Image = `data:image/${imageType};base64,${base64}`;

                  const newBase64Strings = [...base64BodyInspectionPhotos2];
                  newBase64Strings[selectedBodyInspectionIndex] = base64Image;
                  setBase64BodyInspectionPhotos2(newBase64Strings);
                } else {
                  console.log('Unknown image type');
                }
              })
              .catch(e => {
                console.log('Error converting file to base64', e);
              });
          })
          .catch(error => {
            console.log('Error resizing image:', error);
          });
      }
    });
  };

  const openCameraForCarDetails = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...carDetailsPhoto];
        newPhotoUris[carDetailsIndex] = response.assets[0].uri;
        setCarDetailsPhoto(newPhotoUris);

        // Resize and compress the image with quality set to 10
        ImageResizer.createResizedImage(
          newPhotoUris[carDetailsIndex],
          400,
          300,
          'JPEG',
          10,
        )
          .then(resizedImage => {
            RNFS.readFile(resizedImage.uri, 'base64')
              .then(base64 => {
                const imageType = getImageType(base64);

                if (imageType) {
                  const base64Image = `data:image/${imageType};base64,${base64}`;

                  const newBase64Strings = [...base64CarDetailsPhoto];
                  newBase64Strings[carDetailsIndex] = base64Image;

                  setBase64CarDetailsPhoto(newBase64Strings);
                } else {
                  console.log('Unknown image type');
                }
              })
              .catch(e => {
                console.log('Error converting file to base64', e);
              });
          })
          .catch(error => {
            console.log('Error resizing image:', error);
          });
      }
    });
  };

  const openCameraForCarDetailsTwo = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...carDetailsPhoto2];
        newPhotoUris[carDetailsIndex] = response.assets[0].uri;
        setCarDetailsPhoto2(newPhotoUris);

        // Resize and compress the image with quality set to 10
        ImageResizer.createResizedImage(
          newPhotoUris[carDetailsIndex],
          400,
          300,
          'JPEG',
          10,
        )
          .then(resizedImage => {
            RNFS.readFile(resizedImage.uri, 'base64')
              .then(base64 => {
                const imageType = getImageType(base64);

                if (imageType) {
                  const base64Image = `data:image/${imageType};base64,${base64}`;
                  setBase64CarDetailsPhoto2(base64Image);
                } else {
                  console.log('Unknown image type');
                }
              })
              .catch(e => {
                console.log('Error converting file to base64', e);
              });
          })
          .catch(error => {
            console.log('Error resizing image:', error);
          });
      }
    });
  };

  const openCameraForCarDetailsThree = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...carDetailsPhoto3];
        newPhotoUris[carDetailsIndex] = response.assets[0].uri;
        setCarDetailsPhoto3(newPhotoUris);

        // Resize and compress the image with quality set to 10
        ImageResizer.createResizedImage(
          newPhotoUris[carDetailsIndex],
          400,
          300,
          'JPEG',
          10,
        )
          .then(resizedImage => {
            RNFS.readFile(resizedImage.uri, 'base64')
              .then(base64 => {
                const imageType = getImageType(base64);

                if (imageType) {
                  const base64Image = `data:image/${imageType};base64,${base64}`;
                  setBase64CarDetailsPhoto3(base64Image);
                } else {
                  console.log('Unknown image type');
                }
              })
              .catch(e => {
                console.log('Error converting file to base64', e);
              });
          })
          .catch(error => {
            console.log('Error resizing image:', error);
          });
      }
    });
  };

  const openCameraForCarDetailsFour = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...carDetailsPhoto4];
        newPhotoUris[carDetailsIndex] = response.assets[0].uri;
        setCarDetailsPhoto4(newPhotoUris);

        // Resize and compress the image with quality set to 10
        ImageResizer.createResizedImage(
          newPhotoUris[carDetailsIndex],
          400,
          300,
          'JPEG',
          10,
        )
          .then(resizedImage => {
            RNFS.readFile(resizedImage.uri, 'base64')
              .then(base64 => {
                const imageType = getImageType(base64);

                if (imageType) {
                  const base64Image = `data:image/${imageType};base64,${base64}`;
                  setBase64CarDetailsPhoto4(base64Image);
                } else {
                  console.log('Unknown image type');
                }
              })
              .catch(e => {
                console.log('Error converting file to base64', e);
              });
          })
          .catch(error => {
            console.log('Error resizing image:', error);
          });
      }
    });
  };

  const openCameraForCarDetailsFive = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...carDetailsPhoto5];
        newPhotoUris[carDetailsIndex] = response.assets[0].uri;
        setCarDetailsPhoto5(newPhotoUris);

        // Resize and compress the image with quality set to 10
        ImageResizer.createResizedImage(
          newPhotoUris[carDetailsIndex],
          400,
          300,
          'JPEG',
          10,
        )
          .then(resizedImage => {
            RNFS.readFile(resizedImage.uri, 'base64')
              .then(base64 => {
                const imageType = getImageType(base64);

                if (imageType) {
                  const base64Image = `data:image/${imageType};base64,${base64}`;
                  setBase64CarDetailsPhoto5(base64Image);
                } else {
                  console.log('Unknown image type');
                }
              })
              .catch(e => {
                console.log('Error converting file to base64', e);
              });
          })
          .catch(error => {
            console.log('Error resizing image:', error);
          });
      }
    });
  };

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

  const handleOkPressCarPhotos = () => {
    if (!photoUrisCarPhotos[selectedContainerIndex1]) {
      ToastAndroid.show('Photo fields are required', ToastAndroid.SHORT);
      return;
    }
    const newValidations = [...carPhotovalidations];
    // Assume validatePhotoAndRemarks is a function that returns true if both photo and remarks are valid
    newValidations[selectedContainerIndex1] = validatePhotoAndRemarks(
      selectedContainerIndex1,
    );
    setCarPhotoValidations(newValidations);
    setModalVisible1(false);
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

  const handleClosePressCarPhotos = index => {
    const newPhotoUris = [...photoUrisCarPhotos];
    newPhotoUris[index] = null;
    const newRemarks = [...carPhotosRemarks];
    newRemarks[index] = '';
    setPhotoUrisCarPhotos(newPhotoUris);
    setCarPhotoRemarks(newRemarks);
  };

  const handleClosePress1 = index => {
    const newPhotoUris = [...photoUris1];
    newPhotoUris[index] = null;

    setPhotoUris1(newPhotoUris);
  };

  const handleClosePress2 = index => {
    const newPhotoUris = [...photoUris2];
    newPhotoUris[index] = null;

    setPhotoUris2(newPhotoUris);
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

  const handleSelectContainerPress1 = index => {
    setSelectedContainerIndex1(index);
    setModalVisible1(true);
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

  const handleRemarksChangeCarPhotos = (text, index) => {
    const newRemarks = [...carPhotosRemarks];
    newRemarks[index] = text;
    setCarPhotoRemarks(newRemarks);
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

  const photoTitles = ['RC', 'Insurance', 'NOC'];

  const carPhotos = [
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

  const [carPhotovalidations, setCarPhotoValidations] = useState(
    Array(carPhotos.length).fill(false),
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

  useEffect(() => {
    const handleBackPress = () => {
      if (currentIndex === 0) {
        navigation.goBack();
      } else {
        if (swiperRef.current) {
          swiperRef.current.scrollBy(-1);
        }
      }
      return true; // Prevent default behavior (exit app)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove(); // Clean up event listener
  }, [navigation, swiperRef, currentIndex]);

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
                  <View style={{position: 'relative'}}>
                    <Image
                      source={{uri: photoUris[selectedContainerIndex]}}
                      style={styles.uploadedImage}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'black',
                        // borderRadius: 15,
                        width: 60,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => handleClosePress(selectedContainerIndex)}>
                      <Text style={{fontSize: 14, color: 'white'}}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                  <View></View>
                </View>
              ) : (
                <View style={{paddingHorizontal: 8}}>
                  <TouchableOpacity
                    style={styles.photoInput}
                    onPress={() => openCamera()}>
                    <Text>{photos[selectedContainerIndex]}</Text>
                  </TouchableOpacity>
                </View>
              )}

              {photoUris1[selectedContainerIndex] && (
                <View style={{paddingHorizontal: 12, marginTop: 12}}>
                  <View style={{position: 'relative'}}>
                    <Image
                      source={{
                        uri: photoUris1[selectedContainerIndex],
                      }}
                      style={styles.uploadedImage}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'black',
                        //  borderRadius: 15,
                        width: 60,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => handleClosePress1(selectedContainerIndex)}>
                      <Text style={{fontSize: 14, color: 'white'}}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {photoUris2[selectedContainerIndex] && (
                <View style={{paddingHorizontal: 12, marginTop: 12}}>
                  <View style={{position: 'relative'}}>
                    <Image
                      source={{
                        uri: photoUris2[selectedContainerIndex],
                      }}
                      style={styles.uploadedImage}
                    />

                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'black',
                        //  borderRadius: 15,
                        width: 60,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => handleClosePress2(selectedContainerIndex)}>
                      <Text style={{fontSize: 14, color: 'white'}}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {selectedContainerIndex === 0 && (
                <View style={{paddingHorizontal: 8}}>
                  {photoUris1[selectedContainerIndex] == null && (
                    <View style={{marginTop: 16}}>
                      <TouchableOpacity
                        style={styles.photoInput}
                        onPress={() => openCamera1()}>
                        <Text>RC backPhoto</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}

              {selectedContainerIndex === 1 && (
                <View style={{paddingHorizontal: 8}}>
                  {photoUris2[selectedContainerIndex] == null && (
                    <View style={{marginTop: 16}}>
                      <TouchableOpacity
                        style={styles.photoInput}
                        onPress={() => openCamera2()}>
                        <Text>Insurance backPhoto</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
              <View style={{paddingHorizontal: 12, marginTop: 12}}>
                {photoUris[selectedContainerIndex] && (
                  <TextInput
                    style={styles.photoInput}
                    placeholder="Enter remarks"
                    value={remarks[selectedContainerIndex]}
                    onChangeText={text =>
                      handleRemarksChange(text, selectedContainerIndex)
                    }
                  />
                )}
              </View>

              <View style={{paddingHorizontal: 8, marginTop: 10}}>
                <CustomButton title="Submit" onPress={handleOkPress} />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={modalVisible1}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible1(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => setModalVisible1(false)}>
              <Text style={{textAlign: 'right', marginRight: 8}}>Close</Text>
            </TouchableOpacity>

            <ScrollView
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}>
              {photoUrisCarPhotos[selectedContainerIndex1] ? (
                <View style={{paddingHorizontal: 12, marginTop: 12}}>
                  <View style={{position: 'relative'}}>
                    <Image
                      source={{
                        uri: photoUrisCarPhotos[selectedContainerIndex1],
                      }}
                      style={styles.uploadedImage}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'black',
                        //  borderRadius: 15,
                        width: 60,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        handleClosePressCarPhotos(selectedContainerIndex1)
                      }>
                      <Text style={{fontSize: 14, color: 'white'}}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={styles.photoInput}
                    placeholder="Enter remarks"
                    value={carPhotosRemarks[selectedContainerIndex1]}
                    onChangeText={text =>
                      handleRemarksChangeCarPhotos(
                        text,
                        selectedContainerIndex1,
                      )
                    }
                  />
                  <View>
                    {/* <TouchableOpacity
                      style={styles.closeButton1}
                      onPress={() =>
                        handleClosePressCarPhotos(selectedContainerIndex1)
                      }>
                      <Text style={styles.closeButtonText1}>Cancel</Text>
                    </TouchableOpacity> */}
                  </View>
                </View>
              ) : (
                <View style={{paddingHorizontal: 8}}>
                  <TouchableOpacity
                    style={styles.photoInput}
                    onPress={() => openCameraCarPhotos()}>
                    <Text>{carPhotosList[selectedContainerIndex1]}</Text>
                  </TouchableOpacity>
                </View>
              )}

              <View style={{paddingHorizontal: 8, marginTop: 20}}>
                <CustomButton title="Submit" onPress={handleOkPressCarPhotos} />
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
                    <Picker.Item label="Select Condition" value="" />

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
                <View style={{marginTop: 0}}>
                  {selectedInspectionIndex === index && (
                    <View
                      style={{
                        marginLeft: 9,
                        marginRight: 9,
                        marginBottom: 20,
                        marginTop: 34,
                      }}>
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
                </View>
              ))}

              <View style={{paddingHorizontal: 8}}>
                {inspectionPhotos[selectedInspectionIndex] ? (
                  <>
                    <View style={styles.photoContainer}>
                      <View style={{position: 'relative'}}>
                        <Image
                          source={{
                            uri: inspectionPhotos[selectedInspectionIndex],
                          }}
                          style={styles.uploadedImage}
                        />
                        <TouchableOpacity
                          style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            backgroundColor: 'black',
                            //  borderRadius: 15,
                            width: 60,
                            height: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onPress={() =>
                            handleInspectionClosePress(selectedInspectionIndex)
                          }>
                          <Text style={{fontSize: 14, color: 'white'}}>
                            Cancel
                          </Text>
                        </TouchableOpacity>
                      </View>

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
                      <View style={{marginTop: 20}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={inspectionRemarks[selectedInspectionIndex]}
                          onChangeText={text =>
                            handleInspectionRemarks(
                              text,
                              selectedInspectionIndex,
                            )
                          }
                        />
                      </View>
                    </View>
                  </>
                ) : (
                  <View style={{paddingHorizontal: 0}}>
                    <TouchableOpacity
                      style={styles.photoInput}
                      onPress={() => openCameraForInspection()}>
                      <Text>
                        {mechanicalInspectionList[selectedInspectionIndex]}
                      </Text>
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
                    <View
                      style={{
                        marginTop: 20,
                        marginBottom: 20,
                        marginLeft: 9,
                        marginRight: 9,
                      }}>
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
                          //  borderRadius: 15,
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
                        //   borderRadius: 15,
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
                        //   borderRadius: 15,
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
                        //   borderRadius: 15,
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
                        // borderRadius: 15,
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
                        // borderRadius: 15,
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
                        //   borderRadius: 15,
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
                        //   borderRadius: 15,
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
                        //  borderRadius: 15,
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
                        //  borderRadius: 15,
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
                      <View style={{marginTop: 16}}>
                        <TouchableOpacity
                          style={styles.photoInput}
                          onPress={() => openCameraForBodyInspection()}>
                          <Text>
                            {bodyInspectionList[selectedBodyInspectionIndex]}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    {bodyInspectionPhotos2[selectedBodyInspectionIndex] ==
                      null && (
                      <View style={{marginTop: 16}}>
                        <TouchableOpacity
                          style={styles.photoInput}
                          onPress={() => openCameraForBodyInspection2()}>
                          <Text>Upload</Text>
                        </TouchableOpacity>
                      </View>
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
                        <Text>
                          {bodyInspectionList[selectedBodyInspectionIndex]}
                        </Text>
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
                      <View style={{marginTop: 16}}>
                        <TouchableOpacity
                          style={styles.photoInput}
                          onPress={() => openCameraForBodyInspectionPillars1()}>
                          <Text>Pillars A RightSide Photo</Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    {bodyInspectionPhotosForPillars2[
                      selectedBodyInspectionIndex
                    ] == null && (
                      <View style={{marginTop: 16}}>
                        <TouchableOpacity
                          style={styles.photoInput}
                          onPress={() => openCameraForBodyInspectionPillars2()}>
                          <Text>Pillars B LeftSide Photo</Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    {bodyInspectionPhotosForPillars3[
                      selectedBodyInspectionIndex
                    ] == null && (
                      <View style={{marginTop: 16}}>
                        <TouchableOpacity
                          style={styles.photoInput}
                          onPress={() => openCameraForBodyInspectionPillars3()}>
                          <Text>Pillars B RightSide Photo</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    {bodyInspectionPhotosForPillars4[
                      selectedBodyInspectionIndex
                    ] == null && (
                      <View style={{marginTop: 16}}>
                        <TouchableOpacity
                          style={styles.photoInput}
                          onPress={() => openCameraForBodyInspectionPillars4()}>
                          <Text>Pillars C LeftSide Photo</Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    {bodyInspectionPhotosForPillars5[
                      selectedBodyInspectionIndex
                    ] == null && (
                      <View style={{marginTop: 16}}>
                        <TouchableOpacity
                          style={styles.photoInput}
                          onPress={() => openCameraForBodyInspectionPillars5()}>
                          <Text>Pillars C RightSide Photo</Text>
                        </TouchableOpacity>
                      </View>
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
                      <View style={{marginTop: 16}}>
                        <TouchableOpacity
                          style={styles.photoInput}
                          onPress={() => openCameraForBodyInspetionDoor1()}>
                          <Text>Upload</Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    {bodyInspectionDoor2[selectedBodyInspectionIndex] ==
                      null && (
                      <View style={{marginTop: 16}}>
                        <TouchableOpacity
                          style={styles.photoInput}
                          onPress={() => openCameraForBodyInspectionDoor2()}>
                          <Text>Upload</Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    {bodyInspectionDoor3[selectedBodyInspectionIndex] ==
                      null && (
                      <View style={{marginTop: 16}}>
                        <TouchableOpacity
                          style={styles.photoInput}
                          onPress={() => openCameraForBodyInspectionDoor3()}>
                          <Text>Upload</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </View>

              {bodyInspectionPhotos[selectedBodyInspectionIndex] && (
                <View style={{paddingHorizontal: 8, marginTop: 20}}>
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
                  <View style={{marginTop: 12}}>
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
                  </View>
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
                    <View
                      style={{
                        marginTop: 20,
                        marginBottom: 20,
                        marginLeft: 9,
                        marginRight: 9,
                      }}>
                      <CustomSwitch
                        selectionMode={state}
                        roundCorner={false}
                        option1={
                          index === 3 || index === 4 || index === 5
                            ? 'Available'
                            : 'Yes'
                        }
                        option2={
                          index === 3 || index === 4 || index === 5
                            ? 'Not Available'
                            : 'No'
                        }
                        onSelectSwitch={val => handleSwitchChange(index, val)}
                        selectionColor={'#007BFF'}
                        index={index} // Pass the index as a prop
                      />
                    </View>
                  )}
                </>
              ))}

              <View style={{paddingHorizontal: 8}}>
                {carDetailsPhoto[carDetailsIndex] && (
                  <View style={styles.photoContainer}>
                    <View style={{position: 'relative'}}>
                      <Image
                        source={{
                          uri: carDetailsPhoto[carDetailsIndex],
                        }}
                        style={styles.uploadedImage}
                      />

                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          backgroundColor: 'black',
                          // borderRadius: 15,
                          width: 60,
                          height: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() =>
                          handleCarDetailsClosePress(carDetailsIndex)
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
                    <View></View>
                  </View>
                )}
              </View>
              <View style={{paddingHorizontal: 10}}>
                {carDetailsIndex === 2 ? (
                  <>
                    <View style={{marginTop: 16}}>
                      {carDetailsPhoto[carDetailsIndex] == null && (
                        <TouchableOpacity
                          style={styles.photoInput}
                          onPress={() => openCameraForCarDetails()}>
                          <Text>FrontTyre Photo Right Side</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    <View style={{marginTop: 16}}>
                      {carDetailsPhoto2[carDetailsIndex] == null && (
                        <TouchableOpacity
                          style={styles.photoInput}
                          onPress={() => openCameraForCarDetailsTwo()}>
                          <Text>FrontTyre Photo Left Side</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    <View style={{marginTop: 16}}>
                      {carDetailsPhoto3[carDetailsIndex] == null && (
                        <TouchableOpacity
                          style={styles.photoInput}
                          onPress={() => openCameraForCarDetailsThree()}>
                          <Text>RearTyre Photo Right Side</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    <View style={{marginTop: 16}}>
                      {carDetailsPhoto4[carDetailsIndex] == null && (
                        <TouchableOpacity
                          style={styles.photoInput}
                          onPress={() => openCameraForCarDetailsFour()}>
                          <Text>RearTyre Photo Left Side</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </>
                ) : (
                  <>
                    {carDetailsPhoto[carDetailsIndex] == null && (
                      <TouchableOpacity
                        style={styles.photoInput}
                        onPress={() => openCameraForCarDetails()}>
                        <Text>{carDetailsPhotosList[carDetailsIndex]}</Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}
              </View>

              {carDetailsIndex === 5 && (
                <View style={{paddingHorizontal: 8, marginTop: 16}}>
                  {carDetailsPhoto5[carDetailsIndex] == null && (
                    <TouchableOpacity
                      style={styles.photoInput}
                      onPress={() => openCameraForCarDetailsFive()}>
                      <Text>Primary Key</Text>
                    </TouchableOpacity>
                  )}
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
                      onPress={() =>
                        handleCarDetailsClosePress4(carDetailsIndex)
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
                        //  borderRadius: 15,
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

              {carDetailsPhoto[carDetailsIndex] && (
                <View style={{paddingHorizontal: 12, marginTop: 0}}>
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

                  <View style={{marginTop: 20}}>
                    <TextInput
                      style={styles.photoInput}
                      placeholder="Enter remarks"
                      value={carDetailsRemarks[carDetailsIndex]}
                      onChangeText={text =>
                        handleCarDetailsRemarks(text, carDetailsIndex)
                      }
                    />
                  </View>
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
          <Text style={styles.indicator}>{`${currentIndex + 1}/7`}</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperContainer}>
              <CustomTextInput
                label="Make"
                value={make}
                editible={true}
                onChangeText={value => setMake(value)}
                placeholder="Enter your Make"
              />

              <CustomTextInput
                label="Model"
                value={model}
                editible={false}
                onChangeText={value => setModel(value)}
                placeholder="Enter the Model"
              />

              {/* <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={sliderValue}
        onValueChange={setSliderValue}
        minimumTrackTintColor={getTrackColor(sliderValue)}
        maximumTrackTintColor="#000000"
        thumbTintColor="#000000"
      /> */}

              <CustomTextInput
                label="Year of Manufacture"
                value={year}
                editible={false}
                onChangeText={value => setModel(value)}
                placeholder="Enter the Year of Manufacture"
              />
              <CustomTextInput
                label="Variant"
                value={variant}
                editible={false}
                onChangeText={value => setVariant(value)}
                placeholder="Enter the Variant"
              />
              <CustomTextInput
                label="Mileage"
                keyboardType="numeric"
                value={mileage}
                onChangeText={value => setMileage(value)}
                placeholder="Enter the Mileage"
              />
              <CustomTextInput
                label="Color"
                editible={false}
                value={color}
                onChangeText={value => setColor(value)}
                placeholder="Enter the Color"
              />
              <SingleSwitch
                selectionMode={selectedOption}
                roundCorner={true}
                options={['Automatic', 'Manual']}
                onSelectSwitch={handleSwitchSelection}
                selectionColor="#007BFF"
                label="Transmission"
              />

              <SingleSwitch
                selectionMode={selectedOption1}
                roundCorner={true}
                options={['Diesel', 'Petrol', 'EV', 'CNG', 'LPG']}
                onSelectSwitch={handleSwitchSelection1}
                selectionColor="#007BFF"
                label="Fuel Type"
              />
              <SingleSwitch
                selectionMode={selectedOption2}
                roundCorner={true}
                options={['CNG', 'LPG', 'COLOUR']}
                onSelectSwitch={handleSwitchSelection2}
                selectionColor="#007BFF"
                label="Alteration"
              />
              <CustomTextInput
                label="Number of Owners"
                value={owners}
                editible={false}
                onChangeText={value => setOwners(value)}
                placeholder="Enter the Number of Owners"
              />

              <SingleSwitch
                selectionMode={selectedOption3}
                roundCorner={true}
                options={['Yes', 'No']}
                onSelectSwitch={handleSwitchSelection3}
                selectionColor="#007BFF"
                label="Has Hypothecated"
              />

              <CustomTextInput
                label="Hypothicated by"
                editible={false}
                value={hypothecatedBy}
                onChangeText={value => setHypothecatedBy(value)}
                placeholder="Enter the Hypothicated by"
              />

              <SingleSwitch
                selectionMode={selectedOption4}
                roundCorner={true}
                options={['Yes', 'No']}
                onSelectSwitch={handleSwitchSelection4}
                selectionColor="#007BFF"
                label="NOC"
              />

              <CustomTextInput
                label="Road tax is valid"
                value={roadTaxValid}
                onChangeText={value => setRoadTaxValid(value)}
                placeholder="Enter the Road tax is valid"
              />

              <SingleSwitch
                selectionMode={selectedOption5}
                roundCorner={true}
                options={['Yes', 'No']}
                onSelectSwitch={handleSwitchSelection5}
                selectionColor="#007BFF"
                label="Re-Registered"
              />

              <CustomTextInput
                label="Cubic Capacity"
                value={cubicapacity}
                editible={false}
                onChangeText={value => setCubicCapacity(value)}
                placeholder="Enter the Cubic Capacity"
              />

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
              <CustomTextInput
                label="Number of seats"
                editible={false}
                value={numberOfSeats}
                onChangeText={setNumberOfSeats}
                placeholder="Enter number of seats"
              />
              <CustomTextInput
                label="Registration type"
                value={registrationType}
                onChangeText={setRegistrationType}
                placeholder="Enter registration type"
              />
              <CustomTextInput
                label="Registration Date"
                value={registrationDate}
                onChangeText={setRegistrationDate}
                placeholder="Enter registration date"
                editible={false}
              />
              <SingleSwitch
                selectionMode={selectedOption6}
                roundCorner={true}
                options={['Yes', 'No']}
                onSelectSwitch={handleSwitchSelection6}
                selectionColor="#007BFF"
                label="Insurance"
              />
              <CustomTextInput
                label="Insurance Company"
                editable={false}
                value={insuranceCompany}
                onChangeText={setInsuranceCompany}
                placeholder="Enter insurance company"
              />
              <CustomTextInput
                label="Insurance Validity"
                editible={false}
                value={insuranceValidity}
                onChangeText={setInsuranceValidity}
                placeholder="Enter insurance validity"
              />
              <CustomTextInput
                label="Challan Details"
                value={challanDetails}
                editible={false}
                onChangeText={setChallanDetails}
                placeholder="Enter challan details"
              />
              <SingleSwitch
                selectionMode={selectedOption7}
                roundCorner={true}
                options={['Yes', 'No']}
                onSelectSwitch={handleSwitchSelection7}
                selectionColor="#007BFF"
                label="Blacklisted"
              />
              <CustomTextInput
                label="Chassis Number"
                editible={false}
                value={chassisNumber}
                onChangeText={setChassisNumber}
                placeholder="Enter chassis number"
              />
              <CustomTextInput
                label="Engine Number"
                value={engineNumber}
                onChangeText={setEngineNumber}
                placeholder="Enter engine number"
              />
              <SingleSwitch
                selectionMode={selectedOption8}
                roundCorner={true}
                options={['Original', 'Duplicate']}
                onSelectSwitch={handleSwitchSelection8}
                selectionColor="#007BFF"
                label="RC status"
              />
              <SingleSwitch
                selectionMode={selectedOption9}
                roundCorner={true}
                options={['Yes', 'No']}
                onSelectSwitch={handleSwitchSelection9}
                selectionColor="#007BFF"
                label="State NOC"
              />
              <SingleSwitch
                selectionMode={selectedOption10}
                roundCorner={true}
                options={['Yes', 'No']}
                onSelectSwitch={handleSwitchSelection10}
                selectionColor="#007BFF"
                label="Flood"
              />
              <View style={{bottom: 25, marginTop: 20}}>
                <CustomButton title="Next" onPress={handleNext2} />
              </View>
            </View>
          </ScrollView>
        </View>

        {/* <View style={styles.slide}>
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
              {switchStateForVehicleDetails.map((state, index) => {
                const options = getOptions(index);
                return (
                  <React.Fragment key={index}>
                    <View
                      style={{
                        alignItems: 'center',
                        marginLeft: 0,
                        marginRight: 0,
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
        </View> */}

        <View style={styles.slide}>
          <Text style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}>
            Car Documents
          </Text>
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
                    <View style={styles.touchableContent}>
                      <Text style={styles.touchableText}>
                        {validations[index] ? 'Update / View' : 'Upload'}
                      </Text>
                      <Text style={styles.icon}>
                        {validations[index] ? '✅' : '☒'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}

<View style={{bottom: 0,marginTop:410}}>
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
          <Text style={styles.indicator}>{`${currentIndex + 1}/7`}</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperContainer}>
              {carPhotos.map((title, index) => (
                <View key={index} style={styles.photoContainer}>
                  <Text style={styles.label}>{title}</Text>
                  <TouchableOpacity
                    style={styles.photoInput}
                    onPress={() => handleSelectContainerPress1(index)}>
                    <View style={styles.touchableContent}>
                      <Text style={styles.touchableText}>
                        {carPhotovalidations[index]
                          ? 'Update / View'
                          : 'Upload'}
                      </Text>
                      <Text style={styles.icon}>
                        {carPhotovalidations[index] ? '✅' : '☒'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}

              <View style={{bottom: 25, marginTop: 25}}>
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
          <Text style={styles.indicator}>{`${currentIndex + 1}/7`}</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperContainer}>
              {carDetails.map((title, index) => (
                <View key={index} style={styles.photoContainer}>
                  <Text style={styles.label}>{title}</Text>
                  <TouchableOpacity
                    style={styles.photoInput}
                    onPress={() => carDetailsContainerPress(index)}>
                    <View style={styles.touchableContent}>
                      <Text style={styles.touchableText}>
                        {carValidation[index] ? 'Update / View' : 'Upload'}
                      </Text>
                      <Text style={styles.icon}>
                        {carValidation[index] ? '✅' : '☒'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}

              <View style={{bottom: 25, marginTop:140}}>
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
          <Text style={styles.indicator}>{`${currentIndex + 1}/7`}</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperContainer}>
              {bodyInspection.map((title, index) => (
                <View key={index} style={styles.photoContainer}>
                  <Text style={styles.label}>{title}</Text>
                  <TouchableOpacity
                    style={styles.photoInput}
                    onPress={() => handleBodyInspectionContainerPress(index)}>
                    <View style={styles.touchableContent}>
                      <Text style={styles.touchableText}>
                        {thirdValidation[index] ? 'Update / View' : 'Upload'}
                      </Text>
                      <Text style={styles.icon}>
                        {thirdValidation[index] ? '✅' : '☒'}
                      </Text>
                    </View>
                  </TouchableOpacity>
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
          <Text style={styles.indicator}>{`${currentIndex + 1}/7`}</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperContainer}>
              {mechanicalInspection.map((title, index) => (
                <View key={index} style={styles.photoContainer}>
                  <Text style={styles.label}>{title}</Text>
                  <TouchableOpacity
                    style={styles.photoInput}
                    onPress={() => handleMechanicalInspectionPress(index)}>
                    <View style={styles.touchableContent}>
                      <Text style={styles.touchableText}>
                        {secondValidation[index] ? 'Update / View' : 'Upload'}
                      </Text>
                      <Text style={styles.icon}>
                        {secondValidation[index] ? '✅' : '☒'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}

              <View style={{bottom: 25, marginTop: 20}}>
                <CustomButton
                  title="Submit"
                  onPress={handleDocuments}
                  loading={loading}
                />
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
    marginTop: 9,
  },
  touchableContent: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  touchableText: {
    flexGrow: 1,
    textAlign:"center"
  },
  icon: {
    textAlign: 'right',
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
  slider: {
    width: 300,
    height: 40,
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
