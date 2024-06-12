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
import {apiPostWithToken, apiGetWithToken} from '../../services/apiService';
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
    id,
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
  const [updateOrderList, setUpdateOrderList] = useState({});
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

  const [suspensionPhoto, setSuspensionPhoto] = useState(
    Array.from({length: 7}, () => ''),
  );
  const [suspensionRemarks, setSuspensionRemarks] = useState(
    Array.from({length: 7}, () => ''),
  );
  const [suspensionBase64, setSuspensionBase64] = useState(
    Array.from({length: 7}, () => ''),
  );
  const [suspensionSwitch, setSuspensionSwitch] = useState(
    Array.from({length: 7}, () => false),
  );
  const [suspensionDropdown, setSuspensionDropdown] = useState(
    Array.from({length: 7}, () => ''),
  );

  const [steeringPhoto, setSteeringPhoto] = useState(
    Array.from({length: 4}, () => ''),
  );
  const [steeringBase64, setSteeringBase64] = useState(
    Array.from({length: 4}, () => ''),
  );
  const [steeringRemarks, setSteeringRemarks] = useState(
    Array.from({length: 4}, () => ''),
  );
  const [steeringSwitch, setSteeringSwitch] = useState(
    Array.from({length: 4}, () => ''),
  );
  const [steeringDropdown, setSteeringDropdown] = useState(
    Array.from({length: 4}, () => ''),
  );

  const [brakePhoto, setBrakePhoto] = useState(
    Array.from({length: 6}, () => ''),
  );
  const [brakeBase64, setBrake64] = useState(Array.from({lenght: 6}, () => ''));
  const [brakeRemarks, setBrakeRemarks] = useState(
    Array.from({length: 6}, () => ''),
  );
  const [brakeSwitch, setBrakeSwitch] = useState(
    Array.from({length: 6}, () => ''),
  );
  const [brakeDropdown, setBrakeDropdown] = useState(
    Array.from({length: 6}, () => ''),
  );

  const [transmissionPhoto, setTransmissionPhoto] = useState(
    Array.from({length: 8}, () => ''),
  );
  const [transmissionBase64, setTransmissionBase64] = useState(
    Array.from({length: 8}, () => ''),
  );
  const [transmissionRemarks, setTransmissionRemarks] = useState(
    Array.from({length: 8}, () => ''),
  );
  const [transmissionSwitch, setTransmissionSwitch] = useState(
    Array.from({length: 8}, () => ''),
  );
  const [transmissionDropdown, setTransmissionDropdown] = useState(
    Array.from({length: 8}, () => ''),
  );

  const [enginePhoto, setEnginePhoto] = useState(
    Array.from({length: 19}, () => ''),
  );
  const [engineBase64, setEngineBase64] = useState(
    Array.from({length: 19}, () => ''),
  );
  const [engineRemarks, setEngineRemarks] = useState(
    Array.from({length: 19}, () => ''),
  );
  const [engineSwitch, setEngineSwitch] = useState(
    Array.from({length: 19}, () => ''),
  );
  const [engineDropdown, setEngineDropdown] = useState(
    Array.from({length: 19}, () => ''),
  );

  const [electricalPhoto, setElectricalPhoto] = useState(
    Array.from({length: 15}, () => ''),
  );
  const [electricalBase64, setElectricalBase64] = useState(
    Array.from({length: 15}, () => ''),
  );
  const [electricalRemarks, setElectricalRemarks] = useState(
    Array.from({length: 15}, () => ''),
  );
  const [electricalSwitch, setElectricalSwitch] = useState(
    Array.from({length: 15}, () => ''),
  );
  const [electricalDropdown, setElectricalDropdown] = useState(
    Array.from({length: 15}, () => ''),
  );
  const [roadTestRemarks, setRoadTestRemarks] = useState('');

  const [acPhoto, setAcPhoto] = useState(Array.from({length: 6}, () => ''));
  const [acBase64, setAcBase64] = useState(Array.from({length: 6}, () => ''));
  const [acRemarks, setAcRemarks] = useState(Array.from({length: 6}, () => ''));
  const [acSwitch, setAcSwitch] = useState(Array.from({length: 6}, () => ''));
  const [acDropdown, setAcDropdown] = useState(
    Array.from({length: 6}, () => ''),
  );

  const [accessoriesPhoto, setAccessoriesPhoto] = useState(
    Array.from({length: 11}, () => ''),
  );
  const [accessoriesBase64, setAccessoriesBase64] = useState(
    Array.from({length: 11}, () => ''),
  );
  const [accessoriesRemarks, setAccessoriesRemarks] = useState(
    Array.from({length: 11}, () => ''),
  );
  const [accessoriesSwitch, setAccessoriesSwitch] = useState(
    Array.from({length: 11}, () => ''),
  );
  const [accessoriesDropdown, setAccessoriesDropdown] = useState(
    Array.from({length: 11}, () => ''),
  );

  const suspensionList = [
    'Strut',
    'Lower Arm',
    'Link Rod',
    'Stablizer Bar',
    'shok absorber',
    'coil spring',
    'leaf spring',
  ];

  const steeringList = [
    'Rack and Pinion',
    'Steering Coloum',
    'Hardness',
    'Ball joint end',
  ];

  const brakeList = [
    'Pad',
    'Disc',
    'Shoe',
    'Drum',
    'Wheel Cylinder',
    'MC Booster',
  ];

  const transmissionList = [
    'Clutch',
    'Gear Shifting',
    'Drive Shaft',
    'Axle',
    'Propeller Shaft',
    'Differential',
    'bearing',
    'Mounting',
  ];

  const engineList = [
    'Smoke',
    'Turbo',
    'Misfiring',
    'Tappet',
    'Knocking',
    'Exhaust',
    'Belts',
    'Tensioner',
    'Mounting',
    'Fuel Pump',
    'High Presure Pump',
    'Commonrail',
    'Injector',
    'Fuel Tank',
    'hose',
    'Radiator',
    'fan',
    'Over Heating',
    'All Bearings',
  ];

  const electricalList = [
    'Battery',
    'Alternator',
    'Self motor',
    'Wiring Harness',
    'ECM',
    'All Sensors',
    'Wiper Motor',
    'Cluster',
    'Head Lights and DRL',
    'Tail Light',
    'Cabin Light',
    'Combination Switch',
    'ABS',
    'Air Bag',
    'All Power windows',
  ];

  const ACList = [
    'Cooling',
    'Blower, Condenser',
    'fan',
    'Control Switch',
    'Vent',
  ];

  const accessoriesList = [
    'Music System',
    'Parking Sensor',
    'Reverse Camera',
    'OVRM Adjuster',
    'Seat Height Adjuster',
    'Seat belt',
    'Sun Roof',
    'Roof Rail',
    'Spoiler',
    'Skirt',
    'Steering Controls',
  ];

  const pillarsList = [
    'Pillar A LeftSide Photo',
    'Pillar A RightSide Photo',
    'Pillar B LeftSide Photo',
    'Pillar B RightSide Photo',
    'Pillar C LeftSide Photo',
    'Pillar C RightSide Photo',
  ];
  const apronList = ['Apron LeftSide Photo', 'Apron RightSide Photo'];
  const fendersList = ['Fenders LeftSide Photo', 'Fenders RightSide Photo'];
  const quarterPanelsList = [
    'QuarterPanles LeftSide Photo',
    'QuarterPanles RightSide Photo',
  ];
  const runningBoardList = [
    'RunningBoard LeftSide Photo',
    'RunningBoard RightSide Photo',
  ];
  const doorsList = [
    'Door front LeftSide Photo',
    'Door front RightSide Photo',
    'Door Rear LeftSide Photo',
    'Door Rear RightSide Photo',
  ];
  const dickyDoorList = ['Boot Photo'];
  const dickySkirtList = ['Boot Skirt Photo'];
  const bonetList = ['Bonet Photo'];
  const supportMembersList = [
    'SupportMember Upper Photo',
    'SupportMember Lower Photo',
    'Headlamp SupportRightSide Photo',
    'Headlamp SupportLeftSide Photo',
  ];
  const bumberList = ['Bumber FrontSide Photo', 'Bumber RearSide Photo'];
  const wheelTypeList = ['Wheel TypeAlloy Photo', 'Wheel TypeDrum Photo'];
  const WindshieldList = ['WindShield Front Photo', 'WindShield Rear Photo'];

  const [pillarsPhoto, setPillarsPhoto] = useState(
    Array.from({length: 6}, () => ''),
  );
  const [pillarsPhotoRemarks, setPillarsPhotoRemarks] = useState(
    Array.from({length: 6}, () => ''),
  );
  const [pillarBase64, setPillarBase64] = useState(
    Array.from({length: 6}, () => ''),
  );
  const [pillarSwitch, setPillarSwitch] = useState(
    Array.from({length: 6}, () => false),
  );
  const [pillarsCondition, setPillarsCondition] = useState(
    Array.from({length: 6}, () => ''),
  );

  const [apronPhoto, setApronPhoto] = useState(
    Array.from({length: 2}, () => ''),
  );
  const [apronRemarks, setApronRemarks] = useState(
    Array.from({length: 2}, () => ''),
  );
  const [apronBase64, setApronBase64] = useState(
    Array.from({length: 2}, () => ''),
  );
  const [apronSwitch, setApronSwitch] = useState(
    Array.from({length: 2}, () => false),
  );
  const [apronCondition, setApronCondition] = useState(
    Array.from({length: 2}, () => ''),
  );

  const [fenderPhoto, setFendersPhoto] = useState(
    Array.from({length: 2}, () => ''),
  );
  const [fenderRemarks, setFenderRemarks] = useState(
    Array.from({length: 2}, () => ''),
  );
  const [fennderBase64, setFenderBase64] = useState(
    Array.from({length: 2}, () => ''),
  );
  const [fenderSwitch, setFenderSwitch] = useState(
    Array.from({length: 2}, () => false),
  );
  const [fenderCondition, setFenderCondition] = useState(
    Array.from({length: 2}, () => ''),
  );

  const [quarterPanlesPhoto, setQuarterPanlesPhoto] = useState(
    Array.from({length: 2}, () => ''),
  );
  const [quarterPanlesRemarks, setQuarterPanlesRemarks] = useState(
    Array.from({length: 2}, () => ''),
  );
  const [quarterPanlesBase64, setQuarterPanlesBase64] = useState(
    Array.from({length: 2}, () => ''),
  );
  const [quarterPanlesSwitch, setQuarterPanlesSwitch] = useState(
    Array.from({length: 2}, () => false),
  );
  const [quarterPanlesCondition, setQuarterPanlesCondition] = useState(
    Array.from({length: 2}, () => ''),
  );

  const [runningBoardPhoto, setRunningBoardPhoto] = useState(
    Array.from({length: 2}, () => ''),
  );
  const [runningBoardRemarks, setRunningBoardRemarks] = useState(
    Array.from({length: 2}, () => ''),
  );
  const [runningBoardBase64, setRunningBoardBase64] = useState(
    Array.from({length: 2}, () => ''),
  );
  const [runningBoardSwitch, setRunningBoardSwitch] = useState(
    Array.from({length: 2}, () => false),
  );
  const [runnningBoardCondition, setRunningBoardCondition] = useState(
    Array.from({length: 2}, () => ''),
  );

  const [doorPhoto, setDoorPhoto] = useState(Array.from({length: 4}, () => ''));
  const [doorRemarks, setDoorRemarks] = useState(
    Array.from({length: 4}, () => ''),
  );
  const [doorBase64, setDoorBase64] = useState(
    Array.from({length: 4}, () => ''),
  );
  const [doorSwitch, setDoorSwitch] = useState(
    Array.from({length: 4}, () => false),
  );
  const [doorCondition, setDoorCondition] = useState(
    Array.from({length: 4}, () => ''),
  );

  const [dickyDoorPhoto, setDickyDoorPhoto] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [dickyDoorRemarks, setDickyDoorRemarks] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [dickyDoorBase64, setDickyDoorBase64] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [dickyDoorSwitch, setDickyDoorSwitch] = useState(
    Array.from({length: 1}, () => false),
  );
  const [dickyDoorCondition, setDickyDoorCondition] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [dickySkirtPhoto, setDickySkirtPhoto] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [dickySkirtRemarks, setDickySkirtRemarks] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [dickySkirtBase64, setDickySkirtBase64] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [dickySkirtSwitch, setDickySkirtSwitch] = useState(
    Array.from({length: 1}, () => false),
  );
  const [dickySkirtCondition, setDickySkirtCondition] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [bonetPhoto, setBonetPhoto] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [bonetRemarks, setBonetRemarks] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [bonetBase64, setBonetBase64] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [bonetSwitch, setBonetSwitch] = useState(
    Array.from({length: 1}, () => false),
  );
  const [bonetCondition, setBonetCondition] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [supportMembersPhoto, setSupportMembersPhoto] = useState(
    Array.from({length: 4}, () => ''),
  );
  const [supportMembersRemarks, setSupportMembersRemarks] = useState(
    Array.from({length: 4}, () => ''),
  );
  const [supportMembersBase64, setSupportMembersBase64] = useState(
    Array.from({length: 4}, () => ''),
  );
  const [supportMembersSwitch, setSupportMembersSwitch] = useState(
    Array.from({length: 4}, () => false),
  );
  const [supportMembersCondition, setSupportMembersCondition] = useState(
    Array.from({length: 4}, () => ''),
  );

  const [bumperPhoto, setBumperPhoto] = useState(
    Array.from({length: 2}, () => ''),
  );
  const [bumperRemarks, setBumperRemarks] = useState(
    Array.from({length: 2}, () => ''),
  );
  const [bumperBase64, setBumperBase64] = useState(
    Array.from({length: 2}, () => ''),
  );
  const [bumperSwitch, setBumperSwitch] = useState(
    Array.from({length: 2}, () => false),
  );
  const [bumperCondition, setBumperCondition] = useState(
    Array.from({length: 2}, () => ''),
  );

  const [wheelTypePhoto, setWheelTypePhoto] = useState(
    Array.from({length: 2}, () => ''),
  );
  const [wheelTypeRemarks, setWheelTypeRemarks] = useState(
    Array.from({length: 2}, () => ''),
  );
  const [wheelTypeBase64, setWheelTypeBase64] = useState(
    Array.from({length: 2}, () => ''),
  );
  const [wheelTypeSwitch, setWheelTypeSwitch] = useState(
    Array.from({length: 2}, () => false),
  );
  const [wheelTypeCondition, setWheelTypeCondition] = useState(
    Array.from({length: 2}, () => ''),
  );

  const [windShieldPhoto, setWindShieldPhoto] = useState(
    Array.from({length: 3}, () => ''),
  );
  const [windShieldRemarks, setWindShieldRemarks] = useState(
    Array.from({length: 3}, () => ''),
  );
  const [windShieldBase64, setWindShieldBase64] = useState(
    Array.from({length: 3}, () => ''),
  );
  const [windShieldSwitch, setWindShieldSwitch] = useState(
    Array.from({length: 3}, () => false),
  );
  const [windShieldCondition, setWindShieldCondition] = useState(
    Array.from({length: 3}, () => ''),
  );

  const chassisList = ['Chassis Punch'];
  const vinPlateList = ['Vin  Plate'];
  const tyresList = [
    'FrontTyre Left',
    'FrontTyre Right',
    'RearTyre Left',
    'RearTyre Right',
  ];
  const spareWheelList = ['SpareWheel'];
  const toolList = ['ToolKit'];
  const keyList = ['Primary Key', 'Spare Key'];

  const [chassisPunchPhoto, setChassisPunchPhoto] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [chassisRemarks, setChassisRemarks] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [chassisBase64, setChassisBase64] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [chassisSwitch, setChassisSwitch] = useState(
    Array.from({length: 1}, () => false),
  );
  const [chassisCondition, setChasisCondition] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [vinPlatePunchPhoto, setVinPlatePunchPhoto] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [vinPlateRemarks, setVinPlateRemarks] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [vinPlateBase64, setVinPlateBase64] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [vinPlateSwitch, setVinPlateSwitch] = useState(
    Array.from({length: 1}, () => false),
  );
  const [vinPlateCondition, setVinPlateCondition] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [tyrePunchPhoto, setTyrePunchPhoto] = useState(
    Array.from({length: 4}, () => ''),
  );
  const [tyreRemarks, setTyreRemarks] = useState(
    Array.from({length: 4}, () => ''),
  );
  const [tyreBase64, setTyreBase64] = useState(
    Array.from({length: 4}, () => ''),
  );
  const [tyreSwitch, setTyreSwitch] = useState(
    Array.from({length: 4}, () => false),
  );
  const [tyreCondition, setTyreCondition] = useState(
    Array.from({length: 4}, () => ''),
  );

  const [spareWheelPunchPhoto, setSpareWheelPunchPhoto] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [spareWheelRemarks, setSpareWheelRemarks] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [spareWheelBase64, setSpareWheelBase64] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [spareWheelSwitch, setSpareWheelSwitch] = useState(
    Array.from({length: 1}, () => false),
  );
  const [spareWheelCondition, setSpareWheelCondition] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [toolKitPunchPhoto, setToolkitPunchPhoto] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [toolKitRemarks, setToolkitRemarks] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [toolKitBase64, setToolkitBase64] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [toolKitSwitch, setToolkitSwitch] = useState(
    Array.from({length: 1}, () => false),
  );
  const [toolKitCondition, setToolkitCondition] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [keyPunchPhoto, setKeyPunchPhoto] = useState(
    Array.from({length: 2}, () => ''),
  );
  const [keyRemarks, setKeyRemarks] = useState(
    Array.from({length: 2}, () => ''),
  );
  const [keyBase64, setKeyBase64] = useState(Array.from({length: 2}, () => ''));
  const [keySwitch, setKeySwitch] = useState(
    Array.from({length: 2}, () => false),
  );
  const [keyCondition, setKeyCondition] = useState(
    Array.from({length: 2}, () => ''),
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [inspectionVisible, setInspectionVisible] = useState(false);
  const [bodyInspectionVisible, setBodyInspectionVisible] = useState(false);
  const [carDetailsInspection, setCarDetailsInspection] = useState(false);
  const [remarks, setRemarks] = useState(Array.from({length: 3}, () => ''));

  const [base64Strings, setBase64Strings] = useState(
    Array.from({length: 3}, () => null),
  );

  const isCameraOpen = useRef(false);

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

  const openCameraForInspection = index => {
    if (isCameraOpen.current) return;
    isCameraOpen.current = true;

    const handleCameraResponse = (
      response,
      photoState,
      base64State,
      setPhotoState,
      setBase64State,
    ) => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...photoState];
        newPhotoUris[index] = response.assets[0].uri;
        setPhotoState(newPhotoUris);

        // Resize and compress the image with quality set to 10
        ImageResizer.createResizedImage(
          newPhotoUris[index],
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
                  const newBase64Strings = [...base64State];
                  newBase64Strings[index] = base64Image;
                  setBase64State(newBase64Strings);
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
          })
          .finally(() => {
            isCameraOpen.current = false;
          });
      } else {
        isCameraOpen.current = false;
      }
    };

    launchCamera({mediaType: 'photo'}, response => {
      switch (selectedInspectionIndex) {
        case 0:
          handleCameraResponse(
            response,
            suspensionPhoto,
            suspensionBase64,
            setSuspensionPhoto,
            setSuspensionBase64,
          );
          break;
        case 1:
          handleCameraResponse(
            response,
            steeringPhoto,
            steeringBase64,
            setSteeringPhoto,
            setSteeringBase64,
          );
          break;
        case 2:
          handleCameraResponse(
            response,
            brakePhoto,
            brakeBase64,
            setBrakePhoto,
            setBrakeBase64,
          );
          break;
        case 3:
          handleCameraResponse(
            response,
            transmissionPhoto,
            transmissionBase64,
            setTransmissionPhoto,
            setTransmissionBase64,
          );
          break;
        case 4:
          handleCameraResponse(
            response,
            enginePhoto,
            engineBase64,
            setEnginePhoto,
            setEngineBase64,
          );
          break;
        case 5:
          handleCameraResponse(
            response,
            electricalPhoto,
            electricalBase64,
            setElectricalPhoto,
            setElectricalBase64,
          );
          break;
        case 6:
          handleCameraResponse(
            response,
            acPhoto,
            acBase64,
            setAcPhoto,
            setAcBase64,
          );
          break;
        case 7:
          handleCameraResponse(
            response,
            accessoriesPhoto,
            accessoriesBase64,
            setAccessoriesPhoto,
            setAccessoriesBase64,
          );
          break;
        default:
          console.log('Invalid inspection index');
          isCameraOpen.current = false;
      }
    });
  };

  const openCameraForBodyInspection = index => {
    if (isCameraOpen.current) return;
    isCameraOpen.current = true;

    const handleCameraResponse = (
      response,
      photoState,
      base64State,
      setPhotoState,
      setBase64State,
    ) => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...photoState];
        newPhotoUris[index] = response.assets[0].uri;
        setPhotoState(newPhotoUris);

        // Resize and compress the image with quality set to 10
        ImageResizer.createResizedImage(
          newPhotoUris[index],
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
                  const newBase64Strings = [...base64State];
                  newBase64Strings[index] = base64Image;
                  setBase64State(newBase64Strings);
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
          })
          .finally(() => {
            isCameraOpen.current = false;
          });
      } else {
        isCameraOpen.current = false;
      }
    };

    launchCamera({mediaType: 'photo'}, response => {
      switch (selectedBodyInspectionIndex) {
        case 0:
          handleCameraResponse(
            response,
            pillarsPhoto,
            pillarBase64,
            setPillarsPhoto,
            setPillarBase64,
          );
          break;
        case 1:
          handleCameraResponse(
            response,
            apronPhoto,
            apronBase64,
            setApronPhoto,
            setApronBase64,
          );
          break;
        case 2:
          handleCameraResponse(
            response,
            fenderPhoto,
            fennderBase64,
            setFendersPhoto,
            setFenderBase64,
          );
          break;
        case 3:
          handleCameraResponse(
            response,
            quarterPanlesPhoto,
            quarterPanlesBase64,
            setQuarterPanlesPhoto,
            setQuarterPanlesBase64,
          );
          break;
        case 4:
          handleCameraResponse(
            response,
            runningBoardPhoto,
            runningBoardBase64,
            setRunningBoardPhoto,
            setRunningBoardBase64,
          );
          break;
        case 5:
          handleCameraResponse(
            response,
            doorPhoto,
            doorBase64,
            setDoorPhoto,
            setDoorBase64,
          );
          break;
        case 6:
          handleCameraResponse(
            response,
            dickyDoorPhoto,
            dickyDoorBase64,
            setDickyDoorPhoto,
            setDickyDoorBase64,
          );
          break;
        case 7:
          handleCameraResponse(
            response,
            dickySkirtPhoto,
            dickySkirtBase64,
            setDickyDoorPhoto,
            setDickyDoorBase64,
          );
          break;
        case 8:
          handleCameraResponse(
            response,
            bonetPhoto,
            bonetBase64,
            setBonetPhoto,
            setBonetBase64,
          );
          break;
        case 9:
          handleCameraResponse(
            response,
            supportMembersPhoto,
            supportMembersBase64,
            setSupportMembersPhoto,
            setSupportMembersBase64,
          );
          break;
        case 10:
          handleCameraResponse(
            response,
            bumperPhoto,
            bumperBase64,
            setBumperPhoto,
            setBumperBase64,
          );
          break;
        case 11:
          handleCameraResponse(
            response,
            wheelTypePhoto,
            wheelTypeBase64,
            setWheelTypePhoto,
            setWheelTypeBase64,
          );
          break;
        case 12:
          handleCameraResponse(
            response,
            windShieldPhoto,
            windShieldBase64,
            setWindShieldPhoto,
            setWindShieldBase64,
          );
          break;
        // Add cases for other indices
        default:
          console.log('Invalid inspection index');
          isCameraOpen.current = false;
      }
    });
  };


  const openCameraForCarDetails = index => {
    if (isCameraOpen.current) return;
    isCameraOpen.current = true;

    const handleCameraResponse = (
      response,
      photoState,
      base64State,
      setPhotoState,
      setBase64State,
    ) => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...photoState];
        newPhotoUris[index] = response.assets[0].uri;
        setPhotoState(newPhotoUris);

        // Resize and compress the image with quality set to 10
        ImageResizer.createResizedImage(
          newPhotoUris[index],
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
                  const newBase64Strings = [...base64State];
                  newBase64Strings[index] = base64Image;
                  setBase64State(newBase64Strings);
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
          })
          .finally(() => {
            isCameraOpen.current = false;
          });
      } else {
        isCameraOpen.current = false;
      }
    };

    launchCamera({mediaType: 'photo'}, response => {
      switch (carDetailsIndex) {
        case 0:
          handleCameraResponse(
            response,
            chassisPunchPhoto,
            chassisBase64,
            setChassisPunchPhoto,
            setChassisBase64,
          );
          break;
        case 1:
          handleCameraResponse(
            response,
            vinPlatePunchPhoto,
            vinPlateBase64,
            setVinPlatePunchPhoto,
            setVinPlateBase64,
          );
          break;
        case 2:
          handleCameraResponse(
            response,
            tyrePunchPhoto,
            tyreBase64,
            setTyrePunchPhoto,
            setTyreBase64,
          );
          break;
        case 3:
          handleCameraResponse(
            response,
            spareWheelPunchPhoto,
            spareWheelBase64,
            setSpareWheelPunchPhoto,
            setSpareWheelBase64,
          );
          break;
        case 4:
          handleCameraResponse(
            response,
            toolKitPunchPhoto,
            toolKitBase64,
            setToolkitPunchPhoto,
            setToolkitBase64,
          );
          break;
        case 5:
          handleCameraResponse(
            response,
            keyPunchPhoto,
            keyBase64,
            setKeyPunchPhoto,
            setKeyBase64,
          );
          break;
      
        // Add cases for other indices
        default:
          console.log('Invalid inspection index');
          isCameraOpen.current = false;
      }
    });
  };


  // const openCameraForInspection = (index) => {

  //   if(selectedInspectionIndex===0) {
  //     launchCamera({mediaType: 'photo'}, response => {
  //       if (response.assets && response.assets.length > 0) {
  //         const newPhotoUris = [...suspensionPhoto];
  //         newPhotoUris[index] = response.assets[0].uri;
  //         setSuspensionPhoto(newPhotoUris);

  //         // Resize and compress the image with quality set to 10
  //         ImageResizer.createResizedImage(
  //           newPhotoUris[index],
  //           400,
  //           300,
  //           'JPEG',
  //           10,
  //         )
  //           .then(resizedImage => {
  //             RNFS.readFile(resizedImage.uri, 'base64')
  //               .then(base64 => {
  //                 const imageType = getImageType(base64);

  //                 if (imageType) {
  //                   const base64Image = `data:image/${imageType};base64,${base64}`;

  //                   const newBase64Strings = [
  //                     ...suspensionBase64,
  //                   ];
  //                   newBase64Strings[index] = base64Image;

  //                   setSuspensionBase64(newBase64Strings);
  //                 } else {
  //                   console.log('Unknown image type');
  //                 }
  //               })
  //               .catch(e => {
  //                 console.log('Error converting file to base64', e);
  //               });
  //           })
  //           .catch(error => {
  //             console.log('Error resizing image:', error);
  //           });
  //       }
  //     });

  //   }

  //   if(selectedInspectionIndex===1) {
  //     launchCamera({mediaType: 'photo'}, response => {
  //       if (response.assets && response.assets.length > 0) {
  //         const newPhotoUris = [...steeringPhoto];
  //         newPhotoUris[index] = response.assets[0].uri;
  //         setSteeringPhoto(newPhotoUris);

  //         // Resize and compress the image with quality set to 10
  //         ImageResizer.createResizedImage(
  //           newPhotoUris[index],
  //           400,
  //           300,
  //           'JPEG',
  //           10,
  //         )
  //           .then(resizedImage => {
  //             RNFS.readFile(resizedImage.uri, 'base64')
  //               .then(base64 => {
  //                 const imageType = getImageType(base64);

  //                 if (imageType) {
  //                   const base64Image = `data:image/${imageType};base64,${base64}`;

  //                   const newBase64Strings = [
  //                     ...steeringBase64,
  //                   ];
  //                   newBase64Strings[index] = base64Image;

  //                   setSteeringBase64(newBase64Strings);
  //                 } else {
  //                   console.log('Unknown image type');
  //                 }
  //               })
  //               .catch(e => {
  //                 console.log('Error converting file to base64', e);
  //               });
  //           })
  //           .catch(error => {
  //             console.log('Error resizing image:', error);
  //           });
  //       }
  //     });

  //   }

  //   if(selectedInspectionIndex===2) {
  //     launchCamera({mediaType: 'photo'}, response => {
  //       if (response.assets && response.assets.length > 0) {
  //         const newPhotoUris = [...brakePhoto];
  //         newPhotoUris[index] = response.assets[0].uri;
  //         setBrakePhoto(newPhotoUris);

  //         // Resize and compress the image with quality set to 10
  //         ImageResizer.createResizedImage(
  //           newPhotoUris[index],
  //           400,
  //           300,
  //           'JPEG',
  //           10,
  //         )
  //           .then(resizedImage => {
  //             RNFS.readFile(resizedImage.uri, 'base64')
  //               .then(base64 => {
  //                 const imageType = getImageType(base64);

  //                 if (imageType) {
  //                   const base64Image = `data:image/${imageType};base64,${base64}`;

  //                   const newBase64Strings = [
  //                     ...brakeBase64,
  //                   ];
  //                   newBase64Strings[index] = base64Image;

  //                   setBrake64(newBase64Strings);
  //                 } else {
  //                   console.log('Unknown image type');
  //                 }
  //               })
  //               .catch(e => {
  //                 console.log('Error converting file to base64', e);
  //               });
  //           })
  //           .catch(error => {
  //             console.log('Error resizing image:', error);
  //           });
  //       }
  //     });

  //   }

  //   if(selectedInspectionIndex===3) {
  //     launchCamera({mediaType: 'photo'}, response => {
  //       if (response.assets && response.assets.length > 0) {
  //         const newPhotoUris = [...transmissionPhoto];
  //         newPhotoUris[index] = response.assets[0].uri;
  //         setTransmissionPhoto(newPhotoUris);

  //         // Resize and compress the image with quality set to 10
  //         ImageResizer.createResizedImage(
  //           newPhotoUris[index],
  //           400,
  //           300,
  //           'JPEG',
  //           10,
  //         )
  //           .then(resizedImage => {
  //             RNFS.readFile(resizedImage.uri, 'base64')
  //               .then(base64 => {
  //                 const imageType = getImageType(base64);

  //                 if (imageType) {
  //                   const base64Image = `data:image/${imageType};base64,${base64}`;

  //                   const newBase64Strings = [
  //                     ...transmissionBase64,
  //                   ];
  //                   newBase64Strings[index] = base64Image;

  //                   setTransmissionBase64(newBase64Strings);
  //                 } else {
  //                   console.log('Unknown image type');
  //                 }
  //               })
  //               .catch(e => {
  //                 console.log('Error converting file to base64', e);
  //               });
  //           })
  //           .catch(error => {
  //             console.log('Error resizing image:', error);
  //           });
  //       }
  //     });
  //   }

  //   if(selectedInspectionIndex===3) {
  //     launchCamera({mediaType: 'photo'}, response => {
  //       if (response.assets && response.assets.length > 0) {
  //         const newPhotoUris = [...transmissionPhoto];
  //         newPhotoUris[index] = response.assets[0].uri;
  //         setTransmissionPhoto(newPhotoUris);

  //         // Resize and compress the image with quality set to 10
  //         ImageResizer.createResizedImage(
  //           newPhotoUris[index],
  //           400,
  //           300,
  //           'JPEG',
  //           10,
  //         )
  //           .then(resizedImage => {
  //             RNFS.readFile(resizedImage.uri, 'base64')
  //               .then(base64 => {
  //                 const imageType = getImageType(base64);

  //                 if (imageType) {
  //                   const base64Image = `data:image/${imageType};base64,${base64}`;

  //                   const newBase64Strings = [
  //                     ...transmissionBase64,
  //                   ];
  //                   newBase64Strings[index] = base64Image;

  //                   setTransmissionBase64(newBase64Strings);
  //                 } else {
  //                   console.log('Unknown image type');
  //                 }
  //               })
  //               .catch(e => {
  //                 console.log('Error converting file to base64', e);
  //               });
  //           })
  //           .catch(error => {
  //             console.log('Error resizing image:', error);
  //           });
  //       }
  //     });
  //   }

  //   if(selectedInspectionIndex===4) {
  //     launchCamera({mediaType: 'photo'}, response => {
  //       if (response.assets && response.assets.length > 0) {
  //         const newPhotoUris = [...enginePhoto];
  //         newPhotoUris[index] = response.assets[0].uri;
  //         setEnginePhoto(newPhotoUris);

  //         // Resize and compress the image with quality set to 10
  //         ImageResizer.createResizedImage(
  //           newPhotoUris[index],
  //           400,
  //           300,
  //           'JPEG',
  //           10,
  //         )
  //           .then(resizedImage => {
  //             RNFS.readFile(resizedImage.uri, 'base64')
  //               .then(base64 => {
  //                 const imageType = getImageType(base64);

  //                 if (imageType) {
  //                   const base64Image = `data:image/${imageType};base64,${base64}`;

  //                   const newBase64Strings = [
  //                     ...engineBase64,
  //                   ];
  //                   newBase64Strings[index] = base64Image;

  //                   setEngineBase64(newBase64Strings);
  //                 } else {
  //                   console.log('Unknown image type');
  //                 }
  //               })
  //               .catch(e => {
  //                 console.log('Error converting file to base64', e);
  //               });
  //           })
  //           .catch(error => {
  //             console.log('Error resizing image:', error);
  //           });
  //       }
  //     });
  //   }

  //   if(selectedInspectionIndex===5) {
  //     launchCamera({mediaType: 'photo'}, response => {
  //       if (response.assets && response.assets.length > 0) {
  //         const newPhotoUris = [...electricalPhoto];
  //         newPhotoUris[index] = response.assets[0].uri;
  //         setElectricalPhoto(newPhotoUris);

  //         // Resize and compress the image with quality set to 10
  //         ImageResizer.createResizedImage(
  //           newPhotoUris[index],
  //           400,
  //           300,
  //           'JPEG',
  //           10,
  //         )
  //           .then(resizedImage => {
  //             RNFS.readFile(resizedImage.uri, 'base64')
  //               .then(base64 => {
  //                 const imageType = getImageType(base64);

  //                 if (imageType) {
  //                   const base64Image = `data:image/${imageType};base64,${base64}`;

  //                   const newBase64Strings = [
  //                     ...electricalBase64,
  //                   ];
  //                   newBase64Strings[index] = base64Image;

  //                   setElectricalBase64(newBase64Strings);
  //                 } else {
  //                   console.log('Unknown image type');
  //                 }
  //               })
  //               .catch(e => {
  //                 console.log('Error converting file to base64', e);
  //               });
  //           })
  //           .catch(error => {
  //             console.log('Error resizing image:', error);
  //           });
  //       }
  //     });
  //   }

  //   if(selectedInspectionIndex===6) {
  //     launchCamera({mediaType: 'photo'}, response => {
  //       if (response.assets && response.assets.length > 0) {
  //         const newPhotoUris = [...acPhoto];
  //         newPhotoUris[index] = response.assets[0].uri;
  //         setAcPhoto(newPhotoUris);

  //         // Resize and compress the image with quality set to 10
  //         ImageResizer.createResizedImage(
  //           newPhotoUris[index],
  //           400,
  //           300,
  //           'JPEG',
  //           10,
  //         )
  //           .then(resizedImage => {
  //             RNFS.readFile(resizedImage.uri, 'base64')
  //               .then(base64 => {
  //                 const imageType = getImageType(base64);

  //                 if (imageType) {
  //                   const base64Image = `data:image/${imageType};base64,${base64}`;

  //                   const newBase64Strings = [
  //                     ...acBase64,
  //                   ];
  //                   newBase64Strings[index] = base64Image;

  //                   setAcBase64(newBase64Strings);
  //                 } else {
  //                   console.log('Unknown image type');
  //                 }
  //               })
  //               .catch(e => {
  //                 console.log('Error converting file to base64', e);
  //               });
  //           })
  //           .catch(error => {
  //             console.log('Error resizing image:', error);
  //           });
  //       }
  //     });
  //   }

  //   if(selectedInspectionIndex===7) {
  //     launchCamera({mediaType: 'photo'}, response => {
  //       if (response.assets && response.assets.length > 0) {
  //         const newPhotoUris = [...accessoriesPhoto];
  //         newPhotoUris[index] = response.assets[0].uri;
  //         setAccessoriesPhoto(newPhotoUris);

  //         // Resize and compress the image with quality set to 10
  //         ImageResizer.createResizedImage(
  //           newPhotoUris[index],
  //           400,
  //           300,
  //           'JPEG',
  //           10,
  //         )
  //           .then(resizedImage => {
  //             RNFS.readFile(resizedImage.uri, 'base64')
  //               .then(base64 => {
  //                 const imageType = getImageType(base64);

  //                 if (imageType) {
  //                   const base64Image = `data:image/${imageType};base64,${base64}`;

  //                   const newBase64Strings = [
  //                     ...accessoriesBase64,
  //                   ];
  //                   newBase64Strings[index] = base64Image;

  //                   setAccessoriesBase64(newBase64Strings);
  //                 } else {
  //                   console.log('Unknown image type');
  //                 }
  //               })
  //               .catch(e => {
  //                 console.log('Error converting file to base64', e);
  //               });
  //           })
  //           .catch(error => {
  //             console.log('Error resizing image:', error);
  //           });
  //       }
  //     });
  //   }

  // };

  // const openCameraForBodyInspection = () => {
  //   launchCamera({mediaType: 'photo'}, response => {
  //     if (response.assets && response.assets.length > 0) {
  //       const newPhotoUris = [...bodyInspectionPhotos];
  //       newPhotoUris[selectedBodyInspectionIndex] = response.assets[0].uri;
  //       setBodyInspectionPhotos(newPhotoUris);

  //       // Resize and compress the image with quality set to 10
  //       ImageResizer.createResizedImage(
  //         newPhotoUris[selectedBodyInspectionIndex],
  //         400,
  //         300,
  //         'JPEG',
  //         10,
  //       )
  //         .then(resizedImage => {
  //           RNFS.readFile(resizedImage.uri, 'base64')
  //             .then(base64 => {
  //               const imageType = getImageType(base64);

  //               if (imageType) {
  //                 const base64Image = `data:image/${imageType};base64,${base64}`;

  //                 const newBase64Strings = [...base64BodyInspection];
  //                 newBase64Strings[selectedBodyInspectionIndex] = base64Image;

  //                 setBase64BodyInspection(newBase64Strings);
  //               } else {
  //                 console.log('Unknown image type');
  //               }
  //             })
  //             .catch(e => {
  //               console.log('Error converting file to base64', e);
  //             });
  //         })
  //         .catch(error => {
  //           console.log('Error resizing image:', error);
  //         });
  //     }
  //   });
  // };

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

  // const openCameraForCarDetails = () => {
  //   launchCamera({mediaType: 'photo'}, response => {
  //     if (response.assets && response.assets.length > 0) {
  //       const newPhotoUris = [...carDetailsPhoto];
  //       newPhotoUris[carDetailsIndex] = response.assets[0].uri;
  //       setCarDetailsPhoto(newPhotoUris);

  //       // Resize and compress the image with quality set to 10
  //       ImageResizer.createResizedImage(
  //         newPhotoUris[carDetailsIndex],
  //         400,
  //         300,
  //         'JPEG',
  //         10,
  //       )
  //         .then(resizedImage => {
  //           RNFS.readFile(resizedImage.uri, 'base64')
  //             .then(base64 => {
  //               const imageType = getImageType(base64);

  //               if (imageType) {
  //                 const base64Image = `data:image/${imageType};base64,${base64}`;

  //                 const newBase64Strings = [...base64CarDetailsPhoto];
  //                 newBase64Strings[carDetailsIndex] = base64Image;

  //                 setBase64CarDetailsPhoto(newBase64Strings);
  //               } else {
  //                 console.log('Unknown image type');
  //               }
  //             })
  //             .catch(e => {
  //               console.log('Error converting file to base64', e);
  //             });
  //         })
  //         .catch(error => {
  //           console.log('Error resizing image:', error);
  //         });
  //     }
  //   });
  // };

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
    // if (
    //   switchStateForMechanicalInspection[selectedInspectionIndex] === 2 &&
    //   !inspectionPhotos[selectedInspectionIndex]
    // ) {
    //   ToastAndroid.show('Photo fields are required', ToastAndroid.SHORT);
    //   return;
    // }
    setInspectionVisible(false);
    const newValidations = [...secondValidation];
    // Assume validatePhotoAndRemarks is a function that returns true if both photo and remarks are valid
    newValidations[selectedInspectionIndex] = validatePhotoAndRemarks(
      selectedInspectionIndex,
    );
    setSecondValidation(newValidations);
  };

  const handleBodyInspectionOkPress = () => {
    // if (
    //   switchStateForBodyInspection[selectedBodyInspectionIndex] === 2 &&
    //   !bodyInspectionPhotos[selectedBodyInspectionIndex]
    // ) {
    //   ToastAndroid.show('Photo fields are required', ToastAndroid.SHORT);
    //   return;
    // }

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

  const handleSuspensionClosePress = index => {
    let newPhotoUris;

    switch (selectedInspectionIndex) {
      case 0:
        newPhotoUris = [...suspensionPhoto];
        newPhotoUris[index] = null;
        setSuspensionPhoto(newPhotoUris);
        break;
      case 1:
        newPhotoUris = [...steeringPhoto];
        newPhotoUris[index] = null;
        setSteeringPhoto(newPhotoUris);
        break;
      case 2:
        newPhotoUris = [...brakePhoto];
        newPhotoUris[index] = null;
        setBrakePhoto(newPhotoUris);
        break;
      case 3:
        newPhotoUris = [...transmissionPhoto];
        newPhotoUris[index] = null;
        setTransmissionPhoto(newPhotoUris);
        break;
      case 4:
        newPhotoUris = [...enginePhoto];
        newPhotoUris[index] = null;
        setEnginePhoto(newPhotoUris);
        break;
      case 5:
        newPhotoUris = [...electricalPhoto];
        newPhotoUris[index] = null;
        setElectricalPhoto(newPhotoUris);
        break;
      case 6:
        newPhotoUris = [...acPhoto];
        newPhotoUris[index] = null;
        setAcPhoto(newPhotoUris);
        break;
      case 7:
        newPhotoUris = [...accessoriesPhoto];
        newPhotoUris[index] = null;
        setAccessoriesPhoto(newPhotoUris);
        break;
      default:
        console.log('Invalid inspection index');
        break;
    }
  };

  const handleBodyInspectionClosePress = index => {
    let newPhotoUris;

    switch (selectedBodyInspectionIndex) {
      case 0:
        newPhotoUris = [...pillarsPhoto];
        newPhotoUris[index] = null;
        setPillarsPhoto(newPhotoUris);
        break;
      case 1:
        newPhotoUris = [...apronPhoto];
        newPhotoUris[index] = null;
        setApronPhoto(newPhotoUris);
        break;
      case 2:
        newPhotoUris = [...fenderPhoto];
        newPhotoUris[index] = null;
        setFendersPhoto(newPhotoUris);
        break;
      case 3:
        newPhotoUris = [...quarterPanlesPhoto];
        newPhotoUris[index] = null;
        setQuarterPanlesPhoto(newPhotoUris);
        break;
      case 4:
        newPhotoUris = [...runningBoardPhoto];
        newPhotoUris[index] = null;
        setRunningBoardPhoto(newPhotoUris);
        break;
      case 5:
        newPhotoUris = [...doorPhoto];
        newPhotoUris[index] = null;
        setDoorPhoto(newPhotoUris);
        break;
      case 6:
        newPhotoUris = [...dickyDoorPhoto];
        newPhotoUris[index] = null;
        setDickyDoorPhoto(newPhotoUris);
        break;
      case 7:
        newPhotoUris = [...dickySkirtPhoto];
        newPhotoUris[index] = null;
        setDickySkirtPhoto(newPhotoUris);
        break;
      case 8:
        newPhotoUris = [...bonetPhoto];
        newPhotoUris[index] = null;
        setBonetPhoto(newPhotoUris);
        break;
      case 9:
        newPhotoUris = [...supportMembersPhoto];
        newPhotoUris[index] = null;
        setSupportMembersPhoto(newPhotoUris);
        break;
      case 10:
        newPhotoUris = [...bumperPhoto];
        newPhotoUris[index] = null;
        setBumperPhoto(newPhotoUris);
        break;
      case 11:
        newPhotoUris = [...wheelTypePhoto];
        newPhotoUris[index] = null;
        setWheelTypePhoto(newPhotoUris);
        break;
      case 12:
        newPhotoUris = [...windShieldPhoto];
        newPhotoUris[index] = null;
        setWindShieldPhoto(newPhotoUris);
        break;
      default:
        console.log('Invalid inspection index');
        break;
    }
  };

  // const handleBodyInspectionClosePress = index => {
  //   const newPhotoUris = [...bodyInspectionPhotos];
  //   newPhotoUris[index] = null;
  //   const newRemarks = [...bodyInspectionRemarks];
  //   newRemarks[index] = '';

  //   setBodyInspectionPhotos(newPhotoUris);
  //   setBodyInspectionRemarks(newRemarks);
  // };

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
  const handleSuspensionRemarks = (text, index) => {
    let newRemarks;

    switch (selectedInspectionIndex) {
      case 0:
        newRemarks = [...suspensionRemarks];
        newRemarks[index] = text;
        setSuspensionRemarks(newRemarks);
        break;
      case 1:
        newRemarks = [...steeringRemarks];
        newRemarks[index] = text;
        setSteeringRemarks(newRemarks);
        break;
      case 2:
        newRemarks = [...brakeRemarks];
        newRemarks[index] = text;
        setBrakeRemarks(newRemarks);
        break;
      case 3:
        newRemarks = [...transmissionRemarks];
        newRemarks[index] = text;
        setTransmissionRemarks(newRemarks);
        break;
      case 4:
        newRemarks = [...engineRemarks];
        newRemarks[index] = text;
        setEngineRemarks(newRemarks);
        break;
      case 5:
        newRemarks = [...electricalRemarks];
        newRemarks[index] = text;
        setElectricalRemarks(newRemarks);
        break;
      case 6:
        newRemarks = [...acRemarks];
        newRemarks[index] = text;
        setAcRemarks(newRemarks);
        break;
      case 7:
        newRemarks = [...accessoriesRemarks];
        newRemarks[index] = text;
        setAccessoriesRemarks(newRemarks);
        break;
      case 8:
        setRoadTestRemarks(text);
        break;
      default:
        console.log('Invalid inspection index');
        break;
    }
  };

  const handleBodyInspectionRemarks = (text, index) => {
    let newRemarks;

    switch (selectedBodyInspectionIndex) {
      case 0:
        newRemarks = [...pillarsPhotoRemarks];
        newRemarks[index] = text;
        setPillarsPhotoRemarks(newRemarks);
        break;
      case 1:
        newRemarks = [...apronRemarks];
        newRemarks[index] = text;
        setApronRemarks(newRemarks);
        break;
      case 2:
        newRemarks = [...fenderRemarks];
        newRemarks[index] = text;
        setFenderRemarks(newRemarks);
        break;
      case 3:
        newRemarks = [...quarterPanlesRemarks];
        newRemarks[index] = text;
        setQuarterPanlesRemarks(newRemarks);
        break;
      case 4:
        newRemarks = [...runningBoardRemarks];
        newRemarks[index] = text;
        setRunningBoardRemarks(newRemarks);
        break;
      case 5:
        newRemarks = [...doorRemarks];
        newRemarks[index] = text;
        setDoorRemarks(newRemarks);
        break;
      case 6:
        newRemarks = [...dickyDoorRemarks];
        newRemarks[index] = text;
        setDickyDoorRemarks(newRemarks);
        break;
      case 7:
        newRemarks = [...dickySkirtRemarks];
        newRemarks[index] = text;
        setDickySkirtRemarks(newRemarks);
        break;
      case 8:
        newRemarks = [...bonetRemarks];
        newRemarks[index] = text;
        setBonetRemarks(newRemarks);
        break;

      case 9:
        newRemarks = [...supportMembersRemarks];
        newRemarks[index] = text;
        setSupportMembersRemarks(newRemarks);
        break;
      case 10:
        newRemarks = [...bumperRemarks];
        newRemarks[index] = text;
        setBumperRemarks(newRemarks);
        break;
      case 11:
        newRemarks = [...wheelTypeRemarks];
        newRemarks[index] = text;
        setWheelTypeRemarks(newRemarks);
        break;
      case 12:
        newRemarks = [...windShieldRemarks];
        newRemarks[index] = text;
        setWindShieldRemarks(newRemarks);
        break;

      default:
        console.log('Invalid inspection index');
        break;
    }
  };


  const handleCarDetailsRemarks = (text, index) => {
    let newRemarks;

    switch (carDetailsIndex) {
      case 0:
        newRemarks = [...chassisRemarks];
        newRemarks[index] = text;
        setChassisRemarks(newRemarks);
        break;
      case 1:
        newRemarks = [...vinPlateRemarks];
        newRemarks[index] = text;
        setVinPlateRemarks(newRemarks);
        break;
      case 2:
        newRemarks = [...tyreRemarks];
        newRemarks[index] = text;
        setTyreRemarks(newRemarks);
        break;
      case 3:
        newRemarks = [...spareWheelRemarks];
        newRemarks[index] = text;
        setSpareWheelRemarks(newRemarks);
        break;
      case 4:
        newRemarks = [...toolKitRemarks];
        newRemarks[index] = text;
        setToolkitRemarks(newRemarks);
        break;
      case 5:
        newRemarks = [...keyRemarks];
        newRemarks[index] = text;
        setKeyRemarks(newRemarks);
        break;
     

      default:
        console.log('Invalid inspection index');
        break;
    }
  };

  // const handleBodyInspectionRemarks = (text, index) => {
  //   const newRemarks = [...bodyInspectionRemarks];
  //   newRemarks[index] = text;
  //   setBodyInspectionRemarks(newRemarks);
  // };

  // const handleCarDetailsRemarks = (text, index) => {
  //   const newRemarks = [...carDetailsRemarks];
  //   newRemarks[index] = text;
  //   setCarDetailsRemarks(newRemarks);
  // };

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

  // const handleBodyInspectionDropDown = (value, index) => {
  //   const newSelectedValues = [...bodyInspectionValues];
  //   newSelectedValues[index] = value;
  //   setBodyInspectionValues(newSelectedValues);
  // };

  // const handleCarDetailsDropDown = (value, index) => {
  //   const newSelectionValues = [...carDetailsValues];
  //   newSelectionValues[index] = value;
  //   setCarDetailsValues(newSelectionValues);
  // };
  const handleDropDownForCondition = (value, index) => {
    const newSelectedValues = [...selectedValuesForCondition];
    newSelectedValues[index] = value;
    setSelectedValuesForCondition(newSelectedValues);
  };

  const handleSuspensionDropDownChange = (value, index) => {
    let newSelectedValues;

    switch (selectedInspectionIndex) {
      case 0:
        newSelectedValues = [...suspensionDropdown];
        newSelectedValues[index] = value;
        setSuspensionDropdown(newSelectedValues);
        break;
      case 1:
        newSelectedValues = [...steeringDropdown];
        newSelectedValues[index] = value;
        setSteeringDropdown(newSelectedValues);
        break;
      case 2:
        newSelectedValues = [...brakeDropdown];
        newSelectedValues[index] = value;
        setBrakeDropdown(newSelectedValues);
        break;
      case 3:
        newSelectedValues = [...transmissionDropdown];
        newSelectedValues[index] = value;
        setTransmissionDropdown(newSelectedValues);
        break;
      case 4:
        newSelectedValues = [...engineDropdown];
        newSelectedValues[index] = value;
        setEngineDropdown(newSelectedValues);
        break;
      case 5:
        newSelectedValues = [...electricalDropdown];
        newSelectedValues[index] = value;
        setElectricalDropdown(newSelectedValues);
        break;
      case 6:
        newSelectedValues = [...acDropdown];
        newSelectedValues[index] = value;
        setAcDropdown(newSelectedValues);
        break;
      case 7:
        newSelectedValues = [...accessoriesDropdown];
        newSelectedValues[index] = value;
        setAccessoriesDropdown(newSelectedValues);
        break;
      default:
        console.log('Invalid inspection index');
        break;
    }
  };

  const handleBodyInspectionDropDown = (value, index) => {
    let newSelectedValues;

    switch (selectedBodyInspectionIndex) {
      case 0:
        newSelectedValues = [...pillarsCondition];
        newSelectedValues[index] = value;
        setPillarsCondition(newSelectedValues);
        break;
      case 1:
        newSelectedValues = [...apronCondition];
        newSelectedValues[index] = value;
        setApronCondition(newSelectedValues);
        break;
      case 2:
        newSelectedValues = [...fenderCondition];
        newSelectedValues[index] = value;
        setFenderCondition(newSelectedValues);
        break;
      case 3:
        newSelectedValues = [...quarterPanlesCondition];
        newSelectedValues[index] = value;
        setQuarterPanlesCondition(newSelectedValues);
        break;
      case 4:
        newSelectedValues = [...runnningBoardCondition];
        newSelectedValues[index] = value;
        setRunningBoardCondition(newSelectedValues);
        break;
      case 5:
        newSelectedValues = [...doorCondition];
        newSelectedValues[index] = value;
        setDoorCondition(newSelectedValues);
        break;
      case 6:
        newSelectedValues = [...dickyDoorCondition];
        newSelectedValues[index] = value;
        setDickyDoorCondition(newSelectedValues);
        break;
      case 7:
        newSelectedValues = [...dickySkirtCondition];
        newSelectedValues[index] = value;
        setDickySkirtCondition(newSelectedValues);
        break;
      case 8:
        newSelectedValues = [...bonetCondition];
        newSelectedValues[index] = value;
        setBonetCondition(newSelectedValues);
        break;
      case 9:
        newSelectedValues = [...supportMembersCondition];
        newSelectedValues[index] = value;
        setSupportMembersCondition(newSelectedValues);
        break;
      case 10:
        newSelectedValues = [...bumperCondition];
        newSelectedValues[index] = value;
        setBumperCondition(newSelectedValues);
        break;
      case 11:
        newSelectedValues = [...wheelTypeCondition];
        newSelectedValues[index] = value;
        setWheelTypeCondition(newSelectedValues);
        break;
      case 12:
        newSelectedValues = [...windShieldCondition];
        newSelectedValues[index] = value;
        setWindShieldCondition(newSelectedValues);
        break;
      default:
        console.log('Invalid inspection index');
        break;
    }
  };


  const handleCarDetailsDropDown = (value, index) => {
    let newSelectedValues;

    switch (carDetailsIndex) {
      case 0:
        newSelectedValues = [...chassisCondition];
        newSelectedValues[index] = value;
        setChasisCondition(newSelectedValues);
        break;
      case 1:
        newSelectedValues = [...vinPlateCondition];
        newSelectedValues[index] = value;
        setVinPlateCondition(newSelectedValues);
        break;
      case 2:
        newSelectedValues = [...tyreCondition];
        newSelectedValues[index] = value;
        setTyreCondition(newSelectedValues);
        break;
      case 3:
        newSelectedValues = [...spareWheelCondition];
        newSelectedValues[index] = value;
        setSpareWheelCondition(newSelectedValues);
        break;
      case 4:
        newSelectedValues = [...toolKitCondition];
        newSelectedValues[index] = value;
        setToolkitCondition(newSelectedValues);
        break;
      case 5:
        newSelectedValues = [...keyCondition];
        newSelectedValues[index] = value;
        setKeyCondition(newSelectedValues);
        break;
    
      default:
        console.log('Invalid inspection index');
        break;
    }
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

  const handleSuspensionChange = (index, value) => {
    let newState;

    switch (selectedInspectionIndex) {
      case 0:
        newState = [...suspensionSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setSuspensionSwitch(newState);
        break;
      case 1:
        newState = [...steeringSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setSteeringSwitch(newState);
        break;
      case 2:
        newState = [...brakeSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setBrakeSwitch(newState);
        break;
      case 3:
        newState = [...transmissionSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setTransmissionSwitch(newState);
        break;
      case 4:
        newState = [...engineSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setEngineSwitch(newState);
        break;
      case 5:
        newState = [...electricalSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setElectricalSwitch(newState);
        break;
      case 6:
        newState = [...acSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setAcSwitch(newState);
        break;
      case 7:
        newState = [...accessoriesSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setAccessoriesSwitch(newState);
        break;
      default:
        console.log('Invalid inspection index');
        break;
    }
  };

  const handleBodyInspectionChannge = (index, value) => {
    let newState;

    switch (selectedBodyInspectionIndex) {
      case 0:
        newState = [...pillarSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setPillarSwitch(newState);
        break;
      case 1:
        newState = [...apronSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setApronSwitch(newState);
        break;
      case 2:
        newState = [...fenderSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setFenderSwitch(newState);
        break;
      case 3:
        newState = [...quarterPanlesSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setQuarterPanlesSwitch(newState);
        break;
      case 4:
        newState = [...runningBoardSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setRunningBoardSwitch(newState);
        break;
      case 5:
        newState = [...doorSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setDoorSwitch(newState);
        break;
      case 6:
        newState = [...dickyDoorSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setAcsetDickyDoorSwitchSwitch(newState);
        break;
      case 7:
        newState = [...dickySkirtSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setDickySkirtSwitch(newState);
        break;
      case 8:
        newState = [...bonetSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setBonetSwitch(newState);
        break;

      case 9:
        newState = [...supportMembersSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setSupportMembersSwitch(newState);
        break;
      case 10:
        newState = [...bumperSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setBumperSwitch(newState);
        break;
      case 11:
        newState = [...wheelTypeSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setWheelTypeSwitch(newState);
        break;

      case 12:
        newState = [...windShieldSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setWindShieldSwitch(newState);
        break;
      default:
        console.log('Invalid inspection index');
        break;
    }
  };

  const handleCarDetailsChange = (index, value) => {
    let newState;

    switch (carDetailsIndex) {
      case 0:
        newState = [...chassisSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setChassisSwitch(newState);
        break;
      case 1:
        newState = [...vinPlateSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setVinPlateSwitch(newState);
        break;
      case 2:
        newState = [...tyreSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setTyreSwitch(newState);
        break;
      case 3:
        newState = [...spareWheelSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setSpareWheelSwitch(newState);
        break;
      case 4:
        newState = [...toolKitSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setToolkitSwitch(newState);
        break;
      case 5:
        newState = [...keySwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setKeySwitch(newState);
        break;
     
      default:
        console.log('Invalid inspection index');
        break;
    }
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
    'Road Test',
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
    if (id) {
      getOrder(id);
    }
  }, [id]);

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

  const getOrder = async () => {
    try {
      const response = await apiGetWithToken(`getOneOrder?id=${id}`);

      setMake(response.data.make);
      setModel(response.data.model);
      setYear(response.data.year);
      setVariant(response.data.variant);
      setMileage(response.data.mileage);
      setColor(response.data.color);
      setSelectedOption(response.data.transmission === 'Automatic' ? 1 : 2);
      setSelectedOption1(
        response.data.fuelType === 'Diesel'
          ? 1
          : response.data.fuelType === 'Petrol'
          ? 2
          : response.data.fuelType === 'EV'
          ? 3
          : response.data.fuelType === 'CNG'
          ? 4
          : 5,
      );
      setOwners(response.data.owners);
      setSelectedOption2(response.data.hasHypothecated === 'No' ? 2 : 1);
      setHypothecatedBy(response.data.hypothecatedBy);
      setSelectedOption3(response.data.noc === 'No' ? 2 : 1);
      setRoadTaxValid(response.data.roadTaxValid);
      setSelectedOption4(response.data.reRegistered === 'No' ? 2 : 1);
      setCubicCapacity(response.data.cubicCapacity);
      setNumberOfSeats(response.data.numberOfSeats);
      setRegistrationType(response.data.registrationType);
      setRegistrationDate(response.data.registrationDate);
      setInsurance(response.data.insurance === 'No' ? 2 : 1);
      setInsuranceCompany(response.data.insuranceCompany);
      setInsuranceValidity(response.data.insuranceValidity);
      setChallanDetails(response.data.challanDetails);
      setBlacklisted(response.data.blacklisted == 'No' ? 2 : 1);
      setChassisNumber(response.data.chassisNumber);
      setEngineNumber(response.data.engineNumber);
      setRcStatus(response.data.rcStatus === 'Original' ? 1 : 2);
      setStateNoc(response.data.stateNoc === 'No' ? 2 : 1);
      setFlood(response.data.flood === 'No' ? 2 : 1);

      setUpdateOrderList(response.data);

      // setRefreshing(false);
      // setLoading(false);
      console.log(response.data, 'COUNT INNDIA');
    } catch (error) {
      console.error('GET error:', error);
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
              <View style={{paddingHorizontal: 0}}>
                {selectedInspectionIndex === 0 &&
                  suspensionList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleSuspensionChange(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {suspensionPhoto[index] && (
                        <View stylle={{position: 'relative'}}>
                          <Image
                            source={{uri: suspensionPhoto[index]}}
                            style={styles.uploadedImage}
                          />
                          <TouchableOpacity
                            style={{
                              position: 'absolute',
                              top: 20,
                              right: 0,
                              backgroundColor: 'black',
                              // borderRadius: 15,
                              width: 60,
                              height: 30,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => handleSuspensionClosePress(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={suspensionRemarks[index]}
                          onChangeText={text =>
                            handleSuspensionRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={suspensionDropdown[index]}
                          onValueChange={itemValue =>
                            handleSuspensionDropDownChange(itemValue, index)
                          }>
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Level" value="Level" />
                          <Picker.Item label="Noise" value="Noise" />
                          <Picker.Item label="Leak" value="Leak" />
                          <Picker.Item label="Damaged" value="Damaged" />

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!suspensionPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForInspection(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedInspectionIndex === 1 &&
                  steeringList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleSuspensionChange(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {steeringPhoto[index] && (
                        <View style={{position: 'relative'}}>
                          <Image
                            source={{uri: steeringPhoto[index]}}
                            style={styles.uploadedImage}
                          />
                          <TouchableOpacity
                            style={{
                              position: 'absolute',
                              top: 20,
                              right: 0,
                              backgroundColor: 'black',
                              // borderRadius: 15,
                              width: 60,
                              height: 30,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => handleSuspensionClosePress(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={steeringRemarks[index]}
                          onChangeText={text =>
                            handleSuspensionRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={steeringDropdown[index]}
                          onValueChange={itemValue =>
                            handleSuspensionDropDownChange(itemValue, index)
                          }>
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Level" value="Level" />
                          <Picker.Item label="Noise" value="Noise" />
                          <Picker.Item label="Leak" value="Leak" />
                          <Picker.Item label="Damaged" value="Damaged" />

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!steeringPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForInspection(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedInspectionIndex === 2 &&
                  brakeList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleSuspensionChange(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {brakePhoto[index] && (
                        <View style={{position: 'relative'}}>
                          <Image
                            source={{uri: brakePhoto[index]}}
                            style={styles.uploadedImage}
                          />

                          <TouchableOpacity
                            style={{
                              position: 'absolute',
                              top: 20,
                              right: 0,
                              backgroundColor: 'black',
                              // borderRadius: 15,
                              width: 60,
                              height: 30,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => handleSuspensionClosePress(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={brakeRemarks[index]}
                          onChangeText={text =>
                            handleSuspensionRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={brakeDropdown[index]}
                          onValueChange={itemValue =>
                            handleSuspensionDropDownChange(itemValue, index)
                          }>
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Level" value="Level" />
                          <Picker.Item label="Noise" value="Noise" />
                          <Picker.Item label="Leak" value="Leak" />
                          <Picker.Item label="Damaged" value="Damaged" />

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!brakePhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForInspection(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedInspectionIndex === 3 &&
                  transmissionList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleSuspensionChange(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {transmissionPhoto[index] && (
                        <View style={{position: 'relative'}}>
                          <Image
                            source={{uri: transmissionPhoto[index]}}
                            style={styles.uploadedImage}
                          />
                          <TouchableOpacity
                            style={{
                              position: 'absolute',
                              top: 20,
                              right: 0,
                              backgroundColor: 'black',
                              // borderRadius: 15,
                              width: 60,
                              height: 30,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => handleSuspensionClosePress(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={transmissionRemarks[index]}
                          onChangeText={text =>
                            handleSuspensionRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={transmissionDropdown[index]}
                          onValueChange={itemValue =>
                            handleSuspensionDropDownChange(itemValue, index)
                          }>
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Level" value="Level" />
                          <Picker.Item label="Noise" value="Noise" />
                          <Picker.Item label="Leak" value="Leak" />
                          <Picker.Item label="Damaged" value="Damaged" />

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!transmissionPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForInspection(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedInspectionIndex === 4 &&
                  engineList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleSuspensionChange(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {enginePhoto[index] && (
                        <View style={{position: 'relative'}}>
                          <Image
                            source={{uri: enginePhoto[index]}}
                            style={styles.uploadedImage}
                          />
                          <TouchableOpacity
                            style={{
                              position: 'absolute',
                              top: 20,
                              right: 0,
                              backgroundColor: 'black',
                              // borderRadius: 15,
                              width: 60,
                              height: 30,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => handleSuspensionClosePress(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={engineRemarks[index]}
                          onChangeText={text =>
                            handleSuspensionRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={engineDropdown[index]}
                          onValueChange={itemValue =>
                            handleSuspensionDropDownChange(itemValue, index)
                          }>
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Level" value="Level" />
                          <Picker.Item label="Noise" value="Noise" />
                          <Picker.Item label="Leak" value="Leak" />
                          <Picker.Item label="Damaged" value="Damaged" />

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!enginePhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForInspection(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedInspectionIndex === 5 &&
                  electricalList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleSuspensionChange(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {electricalPhoto[index] && (
                        <View style={{position: 'relative'}}>
                          <Image
                            source={{uri: electricalPhoto[index]}}
                            style={styles.uploadedImage}
                          />
                          <TouchableOpacity
                            style={{
                              position: 'absolute',
                              top: 20,
                              right: 0,
                              backgroundColor: 'black',
                              // borderRadius: 15,
                              width: 60,
                              height: 30,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => handleSuspensionClosePress(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={electricalRemarks[index]}
                          onChangeText={text =>
                            handleSuspensionRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={electricalDropdown[index]}
                          onValueChange={itemValue =>
                            handleSuspensionDropDownChange(itemValue, index)
                          }>
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Level" value="Level" />
                          <Picker.Item label="Noise" value="Noise" />
                          <Picker.Item label="Leak" value="Leak" />
                          <Picker.Item label="Damaged" value="Damaged" />

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!electricalPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForInspection(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>
              <View style={{paddingHorizontal: 0}}>
                {selectedInspectionIndex === 6 &&
                  ACList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleSuspensionChange(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {acPhoto[index] && (
                        <View style={{position: 'relative'}}>
                          <Image
                            source={{uri: acPhoto[index]}}
                            style={styles.uploadedImage}
                          />
                          <TouchableOpacity
                            style={{
                              position: 'absolute',
                              top: 20,
                              right: 0,
                              backgroundColor: 'black',
                              // borderRadius: 15,
                              width: 60,
                              height: 30,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => handleSuspensionClosePress(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={acRemarks[index]}
                          onChangeText={text =>
                            handleSuspensionRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={acDropdown[index]}
                          onValueChange={itemValue =>
                            handleSuspensionDropDownChange(itemValue, index)
                          }>
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Level" value="Level" />
                          <Picker.Item label="Noise" value="Noise" />
                          <Picker.Item label="Leak" value="Leak" />
                          <Picker.Item label="Damaged" value="Damaged" />

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!acPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForInspection(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>
              <View style={{paddingHorizontal: 0}}>
                {selectedInspectionIndex === 7 &&
                  accessoriesList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleSuspensionChange(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {accessoriesPhoto[index] && (
                        <View style={{position: 'relative'}}>
                          <Image
                            source={{uri: accessoriesPhoto[index]}}
                            style={styles.uploadedImage}
                          />
                          <TouchableOpacity
                            style={{
                              position: 'absolute',
                              top: 20,
                              right: 0,
                              backgroundColor: 'black',
                              // borderRadius: 15,
                              width: 60,
                              height: 30,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => handleSuspensionClosePress(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={accessoriesRemarks[index]}
                          onChangeText={text =>
                            handleSuspensionRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={accessoriesDropdown[index]}
                          onValueChange={itemValue =>
                            handleSuspensionDropDownChange(itemValue, index)
                          }>
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Level" value="Level" />
                          <Picker.Item label="Noise" value="Noise" />
                          <Picker.Item label="Leak" value="Leak" />
                          <Picker.Item label="Damaged" value="Damaged" />

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!accessoriesPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForInspection(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>
              <View style={{paddingHorizontal: 0}}>
                {selectedInspectionIndex === 8 && (
                  <View style={{marginTop: 14}}>
                    <TextInput
                      style={styles.photoInput}
                      placeholder="Enter remarks"
                      value={roadTestRemarks}
                      onChangeText={text =>
                        handleSuspensionRemarks(text, index)
                      }
                    />
                  </View>
                )}
              </View>
              <View style={{paddingHorizontal: 8, marginTop: 5}}>
                <CustomButton
                  title="Submit"
                  onPress={() => handleInspectionOkPress()}
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
              <View style={{paddingHorizontal: 0}}>
                {selectedBodyInspectionIndex === 0 &&
                  pillarsList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleBodyInspectionChannge(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {pillarsPhoto[index] && (
                        <View style={{position: 'relative'}}>
                          <Image
                            source={{uri: pillarsPhoto[index]}}
                            style={styles.uploadedImage}
                          />
                          <TouchableOpacity
                            style={{
                              position: 'absolute',
                              top: 20,
                              right: 0,
                              backgroundColor: 'black',
                              // borderRadius: 15,
                              width: 60,
                              height: 30,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => handleBodyInspectionClosePress(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={pillarsPhotoRemarks[index]}
                          onChangeText={text =>
                            handleBodyInspectionRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={pillarsCondition[index]}
                          onValueChange={itemValue =>
                            handleBodyInspectionDropDown(itemValue, index)
                          }>
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Level" value="Level" />
                          <Picker.Item label="Noise" value="Noise" />
                          <Picker.Item label="Leak" value="Leak" />
                          <Picker.Item label="Damaged" value="Damaged" />

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!pillarsPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForBodyInspection(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedBodyInspectionIndex === 1 &&
                  apronList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleBodyInspectionChannge(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {apronPhoto[index] && (
                        <View style={{position:"relative"}}>
                        <Image
                          source={{uri: apronPhoto[index]}}
                          style={styles.uploadedImage}
                        />
                        <TouchableOpacity
                            style={{
                              position: 'absolute',
                              top: 20,
                              right: 0,
                              backgroundColor: 'black',
                              // borderRadius: 15,
                              width: 60,
                              height: 30,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => handleBodyInspectionClosePress(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                          </View>
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={apronRemarks[index]}
                          onChangeText={text =>
                            handleBodyInspectionRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={apronCondition[index]}
                          onValueChange={itemValue =>
                            handleBodyInspectionDropDown(itemValue, index)
                          }>
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Level" value="Level" />
                          <Picker.Item label="Noise" value="Noise" />
                          <Picker.Item label="Leak" value="Leak" />
                          <Picker.Item label="Damaged" value="Damaged" />

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!apronPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForBodyInspection(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedBodyInspectionIndex === 2 &&
                  fendersList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleBodyInspectionChannge(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {fenderPhoto[index] && (
                        <Image
                          source={{uri: fenderPhoto[index]}}
                          style={styles.uploadedImage}
                        />
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={fenderRemarks[index]}
                          onChangeText={text =>
                            handleBodyInspectionRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={fenderCondition[index]}
                          onValueChange={itemValue =>
                            handleBodyInspectionDropDown(itemValue, index)
                          }>
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Level" value="Level" />
                          <Picker.Item label="Noise" value="Noise" />
                          <Picker.Item label="Leak" value="Leak" />
                          <Picker.Item label="Damaged" value="Damaged" />

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!fenderPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForBodyInspection(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedBodyInspectionIndex === 3 &&
                  quarterPanelsList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleBodyInspectionChannge(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {quarterPanlesPhoto[index] && (
                        <View style={{position:"relative"}}>
                        <Image
                          source={{uri: quarterPanlesPhoto[index]}}
                          style={styles.uploadedImage}
                        />
                        <TouchableOpacity
                            style={{
                              position: 'absolute',
                              top: 20,
                              right: 0,
                              backgroundColor: 'black',
                              // borderRadius: 15,
                              width: 60,
                              height: 30,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => handleBodyInspectionClosePress(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                          </View>
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={quarterPanlesRemarks[index]}
                          onChangeText={text =>
                            handleBodyInspectionRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={quarterPanlesCondition[index]}
                          onValueChange={itemValue =>
                            handleBodyInspectionDropDown(itemValue, index)
                          }>
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Level" value="Level" />
                          <Picker.Item label="Noise" value="Noise" />
                          <Picker.Item label="Leak" value="Leak" />
                          <Picker.Item label="Damaged" value="Damaged" />

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!quarterPanlesPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForBodyInspection(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedBodyInspectionIndex === 4 &&
                  runningBoardList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleBodyInspectionChannge(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {runningBoardPhoto[index] && (
                        <View style={{position:"relative"}}>
                        <Image
                          source={{uri: runningBoardPhoto[index]}}
                          style={styles.uploadedImage}
                        />
                        <TouchableOpacity
                            style={{
                              position: 'absolute',
                              top: 20,
                              right: 0,
                              backgroundColor: 'black',
                              // borderRadius: 15,
                              width: 60,
                              height: 30,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => handleBodyInspectionClosePress(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                          </View>
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={runningBoardRemarks[index]}
                          onChangeText={text =>
                            handleBodyInspectionRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={runnningBoardCondition[index]}
                          onValueChange={itemValue =>
                            handleBodyInspectionDropDown(itemValue, index)
                          }>
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Level" value="Level" />
                          <Picker.Item label="Noise" value="Noise" />
                          <Picker.Item label="Leak" value="Leak" />
                          <Picker.Item label="Damaged" value="Damaged" />

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!runningBoardPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForBodyInspection(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedBodyInspectionIndex === 5 &&
                  doorsList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleBodyInspectionChannge(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {doorPhoto[index] && (
                        <Image
                          source={{uri: doorPhoto[index]}}
                          style={styles.uploadedImage}
                        />
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={doorRemarks[index]}
                          onChangeText={text =>
                            handleBodyInspectionRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={doorCondition[index]}
                          onValueChange={itemValue =>
                            handleBodyInspectionDropDown(itemValue, index)
                          }>
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Level" value="Level" />
                          <Picker.Item label="Noise" value="Noise" />
                          <Picker.Item label="Leak" value="Leak" />
                          <Picker.Item label="Damaged" value="Damaged" />

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!doorPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForBodyInspection(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedBodyInspectionIndex === 6 &&
                  dickyDoorList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleBodyInspectionChannge(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {dickyDoorPhoto[index] && (
                        <View style={{position:"relative"}}>
                        <Image
                          source={{uri: dickyDoorPhoto[index]}}
                          style={styles.uploadedImage}
                        />
                        <TouchableOpacity
                            style={{
                              position: 'absolute',
                              top: 20,
                              right: 0,
                              backgroundColor: 'black',
                              // borderRadius: 15,
                              width: 60,
                              height: 30,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => handleBodyInspectionClosePress(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                          </View>
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={dickyDoorRemarks[index]}
                          onChangeText={text =>
                            handleBodyInspectionRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={dickyDoorCondition[index]}
                          onValueChange={itemValue =>
                            handleBodyInspectionDropDown(itemValue, index)
                          }>
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Level" value="Level" />
                          <Picker.Item label="Noise" value="Noise" />
                          <Picker.Item label="Leak" value="Leak" />
                          <Picker.Item label="Damaged" value="Damaged" />

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!dickyDoorPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForBodyInspection(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedBodyInspectionIndex === 7 &&
                  dickySkirtList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleBodyInspectionChannge(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {dickySkirtPhoto[index] && (
                        <View style={{position:"relative"}}>
                        <Image
                          source={{uri: dickySkirtPhoto[index]}}
                          style={styles.uploadedImage}
                        />
                        <TouchableOpacity
                            style={{
                              position: 'absolute',
                              top: 20,
                              right: 0,
                              backgroundColor: 'black',
                              // borderRadius: 15,
                              width: 60,
                              height: 30,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => handleBodyInspectionClosePress(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                          </View>
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={dickySkirtRemarks[index]}
                          onChangeText={text =>
                            handleBodyInspectionRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={dickySkirtCondition[index]}
                          onValueChange={itemValue =>
                            handleBodyInspectionDropDown(itemValue, index)
                          }>
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Level" value="Level" />
                          <Picker.Item label="Noise" value="Noise" />
                          <Picker.Item label="Leak" value="Leak" />
                          <Picker.Item label="Damaged" value="Damaged" />

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!dickySkirtPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForBodyInspection(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedBodyInspectionIndex === 8 &&
                  bonetList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleBodyInspectionChannge(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {bonetPhoto[index] && (
                        <View style={{position:"relative"}}>
                        <Image
                          source={{uri: bonetPhoto[index]}}
                          style={styles.uploadedImage}
                        />
                        <TouchableOpacity
                            style={{
                              position: 'absolute',
                              top: 20,
                              right: 0,
                              backgroundColor: 'black',
                              // borderRadius: 15,
                              width: 60,
                              height: 30,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => handleBodyInspectionClosePress(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                          </View>
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={bonetRemarks[index]}
                          onChangeText={text =>
                            handleBodyInspectionRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={bonetCondition[index]}
                          onValueChange={itemValue =>
                            handleBodyInspectionDropDown(itemValue, index)
                          }>
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Level" value="Level" />
                          <Picker.Item label="Noise" value="Noise" />
                          <Picker.Item label="Leak" value="Leak" />
                          <Picker.Item label="Damaged" value="Damaged" />

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!bonetPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForBodyInspection(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedBodyInspectionIndex === 9 &&
                  supportMembersList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleBodyInspectionChannge(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {supportMembersPhoto[index] && (
                        <Image
                          source={{uri: supportMembersPhoto[index]}}
                          style={styles.uploadedImage}
                        />
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={supportMembersRemarks[index]}
                          onChangeText={text =>
                            handleBodyInspectionRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={supportMembersCondition[index]}
                          onValueChange={itemValue =>
                            handleBodyInspectionDropDown(itemValue, index)
                          }>
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Level" value="Level" />
                          <Picker.Item label="Noise" value="Noise" />
                          <Picker.Item label="Leak" value="Leak" />
                          <Picker.Item label="Damaged" value="Damaged" />

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!supportMembersPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForBodyInspection(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedBodyInspectionIndex === 10 &&
                  bumberList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleBodyInspectionChannge(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {bumperPhoto[index] && (
                        <View style={{position:"relative"}}>
                        <Image
                          source={{uri: bumperPhoto[index]}}
                          style={styles.uploadedImage}
                        />
                        <TouchableOpacity
                            style={{
                              position: 'absolute',
                              top: 20,
                              right: 0,
                              backgroundColor: 'black',
                              // borderRadius: 15,
                              width: 60,
                              height: 30,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => handleBodyInspectionClosePress(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                          </View>
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={bumperRemarks[index]}
                          onChangeText={text =>
                            handleBodyInspectionRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={bumperCondition[index]}
                          onValueChange={itemValue =>
                            handleBodyInspectionDropDown(itemValue, index)
                          }>
                          <Picker.Item label="Select DropDown" value="" />
                          <Picker.Item label="Level" value="Level" />
                          <Picker.Item label="Noise" value="Noise" />
                          <Picker.Item label="Leak" value="Leak" />
                          <Picker.Item label="Damaged" value="Damaged" />

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!bumperPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForBodyInspection(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedBodyInspectionIndex === 11 &&
                  wheelTypeList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleBodyInspectionChannge(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {wheelTypePhoto[index] && (
                        <View style={{position:"relative"}}>
                        <Image
                          source={{uri: wheelTypePhoto[index]}}
                          style={styles.uploadedImage}
                        />
                        <TouchableOpacity
                            style={{
                              position: 'absolute',
                              top: 20,
                              right: 0,
                              backgroundColor: 'black',
                              // borderRadius: 15,
                              width: 60,
                              height: 30,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => handleBodyInspectionClosePress(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                          </View>
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={wheelTypeRemarks[index]}
                          onChangeText={text =>
                            handleBodyInspectionRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={wheelTypeCondition[index]}
                          onValueChange={itemValue =>
                            handleBodyInspectionDropDown(itemValue, index)
                          }>
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Level" value="Level" />
                          <Picker.Item label="Noise" value="Noise" />
                          <Picker.Item label="Leak" value="Leak" />
                          <Picker.Item label="Damaged" value="Damaged" />

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!wheelTypePhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForBodyInspection(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedBodyInspectionIndex === 12 &&
                  WindshieldList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleBodyInspectionChannge(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {windShieldPhoto[index] && (
                        <View style={{position:"relative"}}>
                        <Image
                          source={{uri: windShieldPhoto[index]}}
                          style={styles.uploadedImage}
                        />
                        <TouchableOpacity
                            style={{
                              position: 'absolute',
                              top: 20,
                              right: 0,
                              backgroundColor: 'black',
                              // borderRadius: 15,
                              width: 60,
                              height: 30,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => handleBodyInspectionClosePress(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                          </View>
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={windShieldRemarks[index]}
                          onChangeText={text =>
                            handleBodyInspectionRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={windShieldCondition[index]}
                          onValueChange={itemValue =>
                            handleBodyInspectionDropDown(itemValue, index)
                          }>
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Level" value="Level" />
                          <Picker.Item label="Noise" value="Noise" />
                          <Picker.Item label="Leak" value="Leak" />
                          <Picker.Item label="Damaged" value="Damaged" />

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!windShieldPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForBodyInspection(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>

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
              <View style={{paddingHorizontal: 8, marginTop: 18}}>
              <View style={{paddingHorizontal: 0}}>
                {carDetailsIndex === 0 &&
                  chassisList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleCarDetailsChange(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {chassisPunchPhoto[index] && (
                        <Image
                          source={{uri: chassisPunchPhoto[index]}}
                          style={styles.uploadedImage}
                        />
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={chassisRemarks[index]}
                          onChangeText={text =>
                            handleCarDetailsRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={chassisCondition[index]}
                          onValueChange={itemValue =>
                            handleCarDetailsDropDown(itemValue, index)
                          }>
                          
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Re Punched" value="Re Punched" />
                          <Picker.Item label="Rusted" value="Rusted" />
                       

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!chassisPunchPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForCarDetails(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>
              <View style={{paddingHorizontal: 0}}>
                {carDetailsIndex === 1 &&
                  vinPlateList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleCarDetailsChange(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {vinPlatePunchPhoto[index] && (
                        <Image
                          source={{uri: vinPlatePunchPhoto[index]}}
                          style={styles.uploadedImage}
                        />
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={vinPlateRemarks[index]}
                          onChangeText={text =>
                            handleCarDetailsChange(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={vinPlateCondition[index]}
                          onValueChange={itemValue =>
                            handleCarDetailsDropDown(itemValue, index)
                          }>
                          
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Re Punched" value="Re Punched" />
                          <Picker.Item label="Rusted" value="Rusted" />
                       

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!vinPlatePunchPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForCarDetails(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>
              <View style={{paddingHorizontal: 0}}>
                {carDetailsIndex === 2 &&
                  tyresList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleCarDetailsChange(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {tyrePunchPhoto[index] && (
                        <Image
                          source={{uri: tyrePunchPhoto[index]}}
                          style={styles.uploadedImage}
                        />
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={tyreRemarks[index]}
                          onChangeText={text =>
                            handleCarDetailsRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={tyreCondition[index]}
                          onValueChange={itemValue =>
                            handleCarDetailsDropDown(itemValue, index)
                          }>
                          
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Re Punched" value="Re Punched" />
                          <Picker.Item label="Rusted" value="Rusted" />
                       

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!tyrePunchPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForCarDetails(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>
              <View style={{paddingHorizontal: 0}}>
                {carDetailsIndex === 3 &&
                  spareWheelList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleCarDetailsChange(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {spareWheelPunchPhoto[index] && (
                        <Image
                          source={{uri: spareWheelPunchPhoto[index]}}
                          style={styles.uploadedImage}
                        />
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={spareWheelRemarks[index]}
                          onChangeText={text =>
                            handleCarDetailsRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={spareWheelCondition[index]}
                          onValueChange={itemValue =>
                            handleCarDetailsDropDown(itemValue, index)
                          }>
                          
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Re Punched" value="Re Punched" />
                          <Picker.Item label="Rusted" value="Rusted" />
                       

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!spareWheelPunchPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForCarDetails(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>
              <View style={{paddingHorizontal: 0}}>
                {carDetailsIndex === 4 &&
                  toolList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleCarDetailsChange(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {toolKitPunchPhoto[index] && (
                        <Image
                          source={{uri:toolKitPunchPhoto[index]}}
                          style={styles.uploadedImage}
                        />
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={toolKitRemarks[index]}
                          onChangeText={text =>
                            handleCarDetailsRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={toolKitCondition[index]}
                          onValueChange={itemValue =>
                            handleCarDetailsDropDown(itemValue, index)
                          }>
                          
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Re Punched" value="Re Punched" />
                          <Picker.Item label="Rusted" value="Rusted" />
                       

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!toolKitPunchPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForCarDetails(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>
              <View style={{paddingHorizontal: 0}}>
                {carDetailsIndex === 5 &&
                  keyList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={item}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val =>
                            handleCarDetailsChange(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {keyPunchPhoto[index] && (
                        <Image
                          source={{uri:keyPunchPhoto[index]}}
                          style={styles.uploadedImage}
                        />
                      )}

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={keyRemarks[index]}
                          onChangeText={text =>
                            handleCarDetailsRemarks(text, index)
                          }
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={doorCondition[index]}
                          onValueChange={itemValue =>
                            handleCarDetailsDropDown(itemValue, index)
                          }>
                          
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Re Punched" value="Re Punched" />
                          <Picker.Item label="Rusted" value="Rusted" />
                       

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!keyPunchPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForCarDetails(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>
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

              <View style={{bottom: 0, marginTop: 410}}>
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

              <View style={{bottom: 25, marginTop: 140}}>
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
    // marginBottom: 20,
    marginTop: 20,
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
    textAlign: 'center',
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
  itemContainer: {
    paddingHorizontal: 8,
    marginVertical: 30,
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
