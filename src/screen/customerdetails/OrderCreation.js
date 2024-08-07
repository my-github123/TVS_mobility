import React, {useRef, useState, useEffect, useMemo} from 'react';
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
  Keyboard,
} from 'react-native';
import axios from 'axios';
import Marker from 'react-native-image-marker';
import Slider from '@react-native-community/slider';
import CustomSubmitButton from '../../components/CustomSubmitBtton';
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
import {useSelector} from 'react-redux';
import {selectOrderData} from '../../redux/selector';
import {useDispatch} from 'react-redux';
import CustomTextInputWithDatePicker from '../../components/CustomTextInputWithDatePicker';
import {storeOrderData} from '../../redux/action/storeData';

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
    fuelType,
    vehicleFinanced,
    blacklist,
    id,
    orderId,
    userName,
    userPresentAddress,
  } = route.params;

  console.log(id, 'RUNING ID IS THERE......');

  const dispatch = useDispatch();

  const orderData = useSelector(selectOrderData);

  const [role, setRole] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const roleType = await getItem('role');
    const itemId = await getItem('dealarId');
    setRole(roleType);
    console.log(itemId, 'DEALER ID IS THRERE.........');
  };

  const [make, setMake] = useState(vehicleMakerDescription);
  const [model, setModel] = useState(vehicleMakeModel);
  const [ownerDetails, setOwnerDetails] = useState(userName);
  const [ownerAddress, setOwnerAddress] = useState(userPresentAddress);
  const [year, setYear] = useState(vehicleManufacturedDate);
  const [variant, setVariant] = useState(vehicleMakeModel);
  const [mileage, setMileage] = useState('');
  const [color, setColor] = useState(vehicleColor);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showAlterationOptions, setShowAlterationOptions] = useState(false);

  const [owners, setOwners] = useState(vehicleOwnerNumber);
  const [hasHypothecated, setHasHypothecated] = useState('');
  const [hypothecatedBy, setHypothecatedBy] = useState(vehicleFinanced);
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
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption1, setSelectedOption1] = useState(
    fuelType === 'PETROL'
      ? 2
      : fuelType === 'DIESEL'
      ? 1
      : fuelType === 'EV'
      ? 3
      : fuelType === 'CNG'
      ? 4
      : 5,
  );
  const [selectedOption2, setSelectedOption2] = useState('');

  const [chooseAlteration, setChooseAlteration] = useState('');

  const [selectedOption3, setSelectedOption3] = useState(
    vehicleFinanced === 'NA' ? 2 : vehicleFinanced === null ? 2 : 1,
  );
  const [selectedOption4, setSelectedOption4] = useState('');
  const [selectedOption5, setSelectedOption5] = useState('');
  const [selectedOption6, setSelectedOption6] = useState('');
  const [selectedOption7, setSelectedOption7] = useState('');
  const [dealerIdNumbers,setDealerIdNumbers]=useState(Array.from({length:4},()=>""))
  const [spareWheelIdNumber,setSpareWheelIdNumber]=useState(Array.from({length:1},()=>""))
  
  // blacklist === 'NA' ? 2 : blacklist === null ? 2 : 1,
  const [selectedOption8, setSelectedOption8] = useState('');
  const [selectedOption9, setSelectedOption9] = useState('');
  const [selectedOption10, setSelectedOption10] = useState('');

  const [rcRemarks, setRcRemarks] = useState('');
  const [insuranceRemarks, setInsuranceRemarks] = useState('');
  const [nocRemarks, setNocRemarks] = useState('');

  console.log(pillarsPhotoRemarks, 'PILLARS PHOTO REMARKS....................');

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
    console.log(value, '');
    setSelectedOption2(value);

    console.log(`Selected value: ${value}`);
  };

  const handleSwitchSelection2Boolean = value => {
    setShowAlterationOptions(value === 1 ? true : false); // Assuming "Yes" is at index 0
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

  //  const [value, setValue] = useState(0.0); // Initialize value state
  //  const [value1, setValue1] = useState(0.0); // Initialize value state
  // const [value2, setValue2] = useState(0.0); // Initialize value state
  //   const [value3, setValue3] = useState(0.0); // Initialize value state
  const [values, setValues] = useState(Array(4).fill(0.0));
 

  const [spareWheel, setSpareWheel] = useState(Array(1).fill(0.0));
  const handleValueChange = (val, index) => {
    const newId=[...dealerIdNumbers];
    newId[index]="";
    setDealerIdNumbers(newId)
    const newValues = [...values]; // Create a copy of the current values
    newValues[index] = val; // Update the value at the specific index
    setValues(newValues); // Set the new values array
  };

  //  const handleValueChange1 = (val, index) => {
  //            setValue1(val);

  //     // handle any other logic here, if needed
  // };

  //  const handleValueChange2 = (val, index) => {
  //            setValue2(val);

  //     // handle any other logic here, if needed
  // };

  //  const handleValueChange3 = (val, index) => {
  //            setValue3(val);

  //     // handle any other logic here, if needed
  // };

  const handleValueChange4 = (val, index) => {

    const newId=[...spareWheelIdNumber];
    newId[index]="";
    setSpareWheelIdNumber(newId)
    const newValues = [...spareWheel];
    newValues[index] = val;
    setSpareWheel(newValues);
    // handle any other logic here, if needed
  };

  const [spareTyreValue, setSpareTyreValue] = useState(
    Array.from({length: 1}, () => 0),
  );

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

  const reinspectorList = [
    'FrontView Photo',
    'RearView Photo',
    'LHSView Photo',
    'RHSView Photo',
    'OdoMeter Photo',
    'Roof Photo',
    'Interior Photo',
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
    'Bonnet Photo',
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
    Array.from({length: 7}, () => ''),
  );
  const [suspensionDropdown, setSuspensionDropdown] = useState(
    Array.from({length: 7}, () => ''),
  );

  const [suspensionPhotoBoolean, setSuspensionPhotoBoolean] = useState(
    Array.from({length: 7}, () => false),
  );
  const [suspensionRemarksBoolean, setSuspensionRemarksBoolean] = useState(
    Array.from({length: 7}, () => false),
  );

  const [suspensionSwitchBoolean, setSuspensionSwitchBoolean] = useState(
    Array.from({length: 7}, () => false),
  );
  const [suspensionDropdownBoolean, setSuspensionDropdownBoolean] = useState(
    Array.from({length: 7}, () => false),
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

  const [steeringPhotoBoolean, setSteeringPhotoBoolean] = useState(
    Array.from({length: 4}, () => false),
  );

  const [steeringRemarksBoolean, setSteeringRemarksBoolean] = useState(
    Array.from({length: 4}, () => false),
  );
  const [steeringSwitchBoolean, setSteeringSwitchBoolean] = useState(
    Array.from({length: 4}, () => false),
  );
  const [steeringDropdownBoolean, setSteeringDropdownBoolean] = useState(
    Array.from({length: 4}, () => false),
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

  const [brakePhotoBoolean, setBrakePhotoBoolean] = useState(
    Array.from({length: 6}, () => false),
  );

  const [brakeRemarksBoolean, setBrakeRemarksBoolean] = useState(
    Array.from({length: 6}, () => false),
  );
  const [brakeSwitchBoolean, setBrakeSwitchBoolean] = useState(
    Array.from({length: 6}, () => false),
  );
  const [brakeDropdownBoolean, setBrakeDropdownBoolean] = useState(
    Array.from({length: 6}, () => false),
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

  const [transmissionPhotoBoolean, setTransmissionPhotoBoolean] = useState(
    Array.from({length: 8}, () => false),
  );

  const [transmissionRemarksBoolean, setTransmissionRemarksBoolean] = useState(
    Array.from({length: 8}, () => false),
  );
  const [transmissionSwitchBoolean, setTransmissionSwitchBoolean] = useState(
    Array.from({length: 8}, () => false),
  );
  const [transmissionDropdownBoolean, setTransmissionDropdownBoolean] =
    useState(Array.from({length: 8}, () => false));

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

  const [enginePhotoBoolean, setEnginePhotoBoolean] = useState(
    Array.from({length: 19}, () => false),
  );

  const [engineRemarksBoolean, setEngineRemarksBoolean] = useState(
    Array.from({length: 19}, () => false),
  );
  const [engineSwitchBoolean, setEngineSwitchBoolean] = useState(
    Array.from({length: 19}, () => false),
  );
  const [engineDropdownBoolean, setEngineDropdownBoolean] = useState(
    Array.from({length: 19}, () => false),
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

  // New state declarations for Boolean values for electrical
  const [electricalPhotoBoolean, setElectricalPhotoBoolean] = useState(
    Array.from({length: 15}, () => false),
  );

  const [electricalRemarksBoolean, setElectricalRemarksBoolean] = useState(
    Array.from({length: 15}, () => false),
  );
  const [electricalSwitchBoolean, setElectricalSwitchBoolean] = useState(
    Array.from({length: 15}, () => false),
  );
  const [electricalDropdownBoolean, setElectricalDropdownBoolean] = useState(
    Array.from({length: 15}, () => false),
  );

  const [roadTestRemarks, setRoadTestRemarks] = useState('');

  const [acPhoto, setAcPhoto] = useState(Array.from({length: 6}, () => ''));
  const [acBase64, setAcBase64] = useState(Array.from({length: 6}, () => ''));
  const [acRemarks, setAcRemarks] = useState(Array.from({length: 6}, () => ''));
  const [acSwitch, setAcSwitch] = useState(Array.from({length: 6}, () => ''));
  const [acDropdown, setAcDropdown] = useState(
    Array.from({length: 6}, () => ''),
  );

  // New state declarations for Boolean values for AC
  const [acPhotoBoolean, setAcPhotoBoolean] = useState(
    Array.from({length: 6}, () => false),
  );

  const [acRemarksBoolean, setAcRemarksBoolean] = useState(
    Array.from({length: 6}, () => false),
  );
  const [acSwitchBoolean, setAcSwitchBoolean] = useState(
    Array.from({length: 6}, () => false),
  );
  const [acDropdownBoolean, setAcDropdownBoolean] = useState(
    Array.from({length: 6}, () => false),
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

  const [accessoriesPhotoBoolean, setAccessoriesPhotoBoolean] = useState(
    Array.from({length: 11}, () => false),
  );

  const [accessoriesRemarksBoolean, setAccessoriesRemarksBoolean] = useState(
    Array.from({length: 11}, () => false),
  );
  const [accessoriesSwitchBoolean, setAccessoriesSwitchBoolean] = useState(
    Array.from({length: 11}, () => false),
  );
  const [accessoriesDropdownBoolean, setAccessoriesDropdownBoolean] = useState(
    Array.from({length: 11}, () => false),
  );

  const [oliSwitch, setoilSwitch] = useState(Array.from({length: 5}, () => ''));

  const [oilRemarks, setOilRemarks] = useState(
    Array.from({length: 5}, () => ''),
  );

  const [oilDropDown, setOilDropDown] = useState(
    Array.from({length: 5}, () => ''),
  );

  // New state declarations for Boolean values for Oil
  const [oliSwitchBoolean, setOliSwitchBoolean] = useState(
    Array.from({length: 5}, () => false),
  );
  const [oilRemarksBoolean, setOilRemarksBoolean] = useState(
    Array.from({length: 5}, () => false),
  );
  const [oilDropDownBoolean, setOilDropDownBoolean] = useState(
    Array.from({length: 5}, () => false),
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
    'Blower',
    'Condenser',
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

  const oilList = [
    'Engine oil',
    'Brake Oil',
    'Coolent Oil',
    'Gear Oil',
    'Crown Oil',
  ];

  const pillarsList = [
    'Pillar A Right Side Photo',
    'Pillar B Right Side Photo',
    'Pillar C Right Side Photo',
    'Pillar A Left Side Photo',
    'Pillar B Left Side Photo',
    'Pillar C Left Side Photo',
  ];
  const apronList = ['Apron Left Side Photo', 'Apron Right Side Photo'];
  const fendersList = ['Fenders Left Side Photo', 'Fenders Right Side Photo'];
  const quarterPanelsList = [
    'QuarterPanles Left Side Photo',
    'QuarterPanles Right Side Photo',
  ];
  const runningBoardList = [
    'RunningBoard Right Side Photo',
    'RunningBoard Left Side Photo',
  ];
  const doorsList = [
    'Door front Left Side Photo',
    'Door Rear Left Side Photo',
    'Door front Right Side Photo',
    'Door Rear Right Side Photo',
  ];
  const dickyDoorList = ['Boot Photo'];
  const dickySkirtList = ['Boot Skirt Photo'];
  const bonetList = ['Bonet Photo'];
  const supportMembersList = [
    'Support Member Upper Photo',
    'Support Member Lower Photo',
    'Headlamp Support Right Side Photo',
    'Headlamp Support Left Side Photo',
  ];
  const bumberList = ['Bumber Front Side Photo', 'Bumber Rear Side Photo'];
  const wheelTypeList = ['Wheel Photo'];
  const WindshieldList = ['WindShield Front Photo', 'Wind Shield Rear Photo'];

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
    Array.from({length: 6}, () => ''),
  );
  const [pillarsCondition, setPillarsCondition] = useState(
    Array.from({length: 6}, () => ''),
  );

  const [pillarsPhotoBoolean, setPillarsPhotoBoolean] = useState(
    Array.from({length: 6}, () => false),
  );
  const [pillarsPhotoRemarksBoolean, setPillarsPhotoRemarksBoolean] = useState(
    Array.from({length: 6}, () => false),
  );

  const [pillarSwitchBoolean, setPillarSwitchBoolean] = useState(
    Array.from({length: 6}, () => false),
  );
  const [pillarsConditionBoolean, setPillarsConditionBoolean] = useState(
    Array.from({length: 6}, () => false),
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
    Array.from({length: 2}, () => ''),
  );
  const [apronCondition, setApronCondition] = useState(
    Array.from({length: 2}, () => ''),
  );

  // New state declarations for Boolean values for apron
  const [apronPhotoBoolean, setApronPhotoBoolean] = useState(
    Array.from({length: 2}, () => false),
  );
  const [apronRemarksBoolean, setApronRemarksBoolean] = useState(
    Array.from({length: 2}, () => false),
  );

  const [apronSwitchBoolean, setApronSwitchBoolean] = useState(
    Array.from({length: 2}, () => false),
  );
  const [apronConditionBoolean, setApronConditionBoolean] = useState(
    Array.from({length: 2}, () => false),
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
    Array.from({length: 2}, () => ''),
  );
  const [fenderCondition, setFenderCondition] = useState(
    Array.from({length: 2}, () => ''),
  );

  const [fenderPhotoBoolean, setFenderPhotoBoolean] = useState(
    Array.from({length: 2}, () => false),
  );
  const [fenderRemarksBoolean, setFenderRemarksBoolean] = useState(
    Array.from({length: 2}, () => false),
  );

  const [fenderSwitchBoolean, setFenderSwitchBoolean] = useState(
    Array.from({length: 2}, () => false),
  );
  const [fenderConditionBoolean, setFenderConditionBoolean] = useState(
    Array.from({length: 2}, () => false),
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
    Array.from({length: 2}, () => ''),
  );
  const [quarterPanlesCondition, setQuarterPanlesCondition] = useState(
    Array.from({length: 2}, () => ''),
  );

  const [quarterPanlesPhotoBoolean, setQuarterPanlesPhotoBoolean] = useState(
    Array.from({length: 2}, () => false),
  );
  const [quarterPanlesRemarksBoolean, setQuarterPanlesRemarksBoolean] =
    useState(Array.from({length: 2}, () => false));

  const [quarterPanlesSwitchBoolean, setQuarterPanlesSwitchBoolean] = useState(
    Array.from({length: 2}, () => false),
  );
  const [quarterPanlesConditionBoolean, setQuarterPanlesConditionBoolean] =
    useState(Array.from({length: 2}, () => false));

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
    Array.from({length: 2}, () => ''),
  );
  const [runnningBoardCondition, setRunningBoardCondition] = useState(
    Array.from({length: 2}, () => ''),
  );

  const [runningBoardPhotoBoolean, setRunningBoardPhotoBoolean] = useState(
    Array.from({length: 2}, () => false),
  );
  const [runningBoardRemarksBoolean, setRunningBoardRemarksBoolean] = useState(
    Array.from({length: 2}, () => false),
  );

  const [runningBoardSwitchBoolean, setRunningBoardSwitchBoolean] = useState(
    Array.from({length: 2}, () => false),
  );
  const [runningBoardConditionBoolean, setRunningBoardConditionBoolean] =
    useState(Array.from({length: 2}, () => false));

  const [doorPhoto, setDoorPhoto] = useState(Array.from({length: 4}, () => ''));
  const [doorRemarks, setDoorRemarks] = useState(
    Array.from({length: 4}, () => ''),
  );
  const [doorBase64, setDoorBase64] = useState(
    Array.from({length: 4}, () => ''),
  );
  const [doorSwitch, setDoorSwitch] = useState(
    Array.from({length: 4}, () => ''),
  );
  const [doorCondition, setDoorCondition] = useState(
    Array.from({length: 4}, () => ''),
  );

  const [doorPhotoBoolean, setDoorPhotoBoolean] = useState(
    Array.from({length: 4}, () => false),
  );
  const [doorRemarksBoolean, setDoorRemarksBoolean] = useState(
    Array.from({length: 4}, () => false),
  );

  const [doorSwitchBoolean, setDoorSwitchBoolean] = useState(
    Array.from({length: 4}, () => false),
  );
  const [doorConditionBoolean, setDoorConditionBoolean] = useState(
    Array.from({length: 4}, () => false),
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
    Array.from({length: 1}, () => ''),
  );
  const [dickyDoorCondition, setDickyDoorCondition] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [dickyDoorPhotoBoolean, setDickyDoorPhotoBoolean] = useState(
    Array.from({length: 1}, () => false),
  );
  const [dickyDoorRemarksBoolean, setDickyDoorRemarksBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [dickyDoorSwitchBoolean, setDickyDoorSwitchBoolean] = useState(
    Array.from({length: 1}, () => false),
  );
  const [dickyDoorConditionBoolean, setDickyDoorConditionBoolean] = useState(
    Array.from({length: 1}, () => false),
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
    Array.from({length: 1}, () => ''),
  );
  const [dickySkirtCondition, setDickySkirtCondition] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [dickySkirtPhotoBoolean, setDickySkirtPhotoBoolean] = useState(
    Array.from({length: 1}, () => false),
  );
  const [dickySkirtRemarksBoolean, setDickySkirtRemarksBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [dickySkirtSwitchBoolean, setDickySkirtSwitchBoolean] = useState(
    Array.from({length: 1}, () => false),
  );
  const [dickySkirtConditionBoolean, setDickySkirtConditionBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [bonetPhoto, setBonetPhoto] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [bonetPhotoBoolean, setBonetPhotoBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [bonetRemarks, setBonetRemarks] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [bonetRemarksBoolean, setBonetRemarksBoolean] = useState(
    Array.from({length: 1}, () => false),
  );
  const [bonetBase64, setBonetBase64] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [bonetSwitch, setBonetSwitch] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [bonetSwitchBoolean, setBonetSwitchBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [bonetCondition, setBonetCondition] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [bonetConditionBoolean, setBonetConditionBoolean] = useState(
    Array.from({length: 1}, () => false),
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
    Array.from({length: 4}, () => ''),
  );
  const [supportMembersCondition, setSupportMembersCondition] = useState(
    Array.from({length: 4}, () => ''),
  );

  const [supportMembersPhotoBoolean, setSupportMembersPhotoBoolean] = useState(
    Array.from({length: 4}, () => false),
  );
  const [supportMembersRemarksBoolean, setSupportMembersRemarksBoolean] =
    useState(Array.from({length: 4}, () => false));
  const [supportMembersSwitchBoolean, setSupportMembersSwitchBoolean] =
    useState(Array.from({length: 4}, () => false));
  const [supportMembersConditionBoolean, setSupportMembersConditionBoolean] =
    useState(Array.from({length: 4}, () => false));

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
    Array.from({length: 2}, () => ''),
  );
  const [bumperCondition, setBumperCondition] = useState(
    Array.from({length: 2}, () => ''),
  );

  const [bumperPhotoBoolean, setBumperPhotoBoolean] = useState(
    Array.from({length: 2}, () => false),
  );
  const [bumperRemarksBoolean, setBumperRemarksBoolean] = useState(
    Array.from({length: 2}, () => false),
  );

  const [bumperSwitchBoolean, setBumperSwitchBoolean] = useState(
    Array.from({length: 2}, () => false),
  );
  const [bumperConditionBoolean, setBumperConditionBoolean] = useState(
    Array.from({length: 2}, () => false),
  );

  const [wheelTypePhoto, setWheelTypePhoto] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [wheelTypeRemarks, setWheelTypeRemarks] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [wheelTypeBase64, setWheelTypeBase64] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [wheelTypeSwitch, setWheelTypeSwitch] = useState(
    Array.from({length: 1}, () => ''),
  );

  // New state declarations for Boolean values for wheel type
  const [wheelTypePhotoBoolean, setWheelTypePhotoBoolean] = useState(
    Array.from({length: 1}, () => false),
  );
  const [wheelTypeRemarksBoolean, setWheelTypeRemarksBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [wheelTypeSwitchBoolean, setWheelTypeSwitchBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [selectWheelTypeSwitch, setSelectWheelTypeSwitch] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [wheelTypeCondition, setWheelTypeCondition] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [windShieldPhoto, setWindShieldPhoto] = useState(
    Array.from({length: 2}, () => ''),
  );
  const [windShieldRemarks, setWindShieldRemarks] = useState(
    Array.from({length: 2}, () => ''),
  );
  const [windShieldBase64, setWindShieldBase64] = useState(
    Array.from({length: 2}, () => ''),
  );
  const [windShieldSwitch, setWindShieldSwitch] = useState(
    Array.from({length: 2}, () => ''),
  );
  const [windShieldCondition, setWindShieldCondition] = useState(
    Array.from({length: 2}, () => ''),
  );

  const [windShieldPhotoBoolean, setWindShieldPhotoBoolean] = useState(
    Array.from({length: 2}, () => false),
  );
  const [windShieldRemarksBoolean, setWindShieldRemarksBoolean] = useState(
    Array.from({length: 2}, () => false),
  );

  const [windShieldSwitchBoolean, setWindShieldSwitchBoolean] = useState(
    Array.from({length: 2}, () => false),
  );
  const [windShieldConditionBoolean, setWindShieldConditionBoolean] = useState(
    Array.from({length: 2}, () => false),
  );

  const rcList = ['RC Front Photo', 'RC Back Photo', 'Others Photo'];
  const insuranceList = ['Page 1 Photo', 'Page 2 Photo', 'Others Photo'];
  const nocList = ['NOC Photo', 'NOC Others'];

  const [rcPhoto, setRcPhoto] = useState(Array.from({length: 3}, () => ''));

  const [rcPhotoBoolean, setRcPhotoBoolean] = useState(
    Array.from({length: 3}, () => false),
  );

  const [rcBase64, setRcBase64] = useState(Array.from({length: 3}, () => ''));

  const [insurancePhoto, setInsuracePhoto] = useState(
    Array.from({length: 3}, () => ''),
  );

  const [insurancePhotoBoolean, setInsuracePhotoBoolean] = useState(
    Array.from({length: 3}, () => false),
  );

  const [insuranceBase64, setInsuraceBase64] = useState(
    Array.from({length: 3}, () => ''),
  );

  const [nocPhoto, setNOCPhoto] = useState(Array.from({length: 2}, () => ''));

  const [nocBase64, setNOCBase64] = useState(Array.from({length: 2}, () => ''));

  const [nocPhotoBoolean, setNOCPhotoBoolean] = useState(
    Array.from({length: 2}, () => false),
  );

  const tyresList = [
    'FrontTyre Left',
    'FrontTyre Right',
    'RearTyre Left',
    'RearTyre Right',
  ];

  const toolList = ['ToolKit'];

  const frontViewList = ['Front View'];
  const engineRoomList = ['Engine Room'];
  const chassisList = ['Chassis Punch'];
  const vinPlateList = ['Vin  Plate'];
  const rhsView = ['Rhs View'];
  const keyList = ['Primary Key', 'Spare Key'];
  const odometerList = ['Odometer'];
  const interiorList = ['Interioir'];
  const lhsViewList = ['Lhs View'];
  const rearViewList = ['RearView'];
  const trunkBootList = ['Trunk Boot'];
  const spareWheelList = ['SpareWheel'];
  const toolKitList = ['ToolList'];
  const roofList = ['Roof'];
  const underChassisList = ['UnderChassis'];
  const tyreList = ['tyres'];

  const [frontViewPhoto, setFrontViewPhoto] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [frontViewPhotoBoolean, setFrontViewPhotoBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [frontViewRemarks, setFrontViewRemarks] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [frontViewRemarksBoolean, setFrontViewRemarksBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [frontViewBase64, setFrontViewBase64] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [engineRoomPhoto, setEngineRoomPhoto] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [engineRoomPhotoBoolean, setEngineRoomPhotoBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [engineRoomBase64, setEngineRoomBase64] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [engineRoomRemarks, setEngineRoomRemarks] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [engineRoomRemarksBoolean, setEngineRoomRemarksBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [chassisPunchPhoto, setChassisPunchPhoto] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [chassisPunchPhotoBoolean, setChassisPunchPhotoBoolean] = useState(
    Array.from({length: 1}, () => false),
  );
  const [chassisRemarks, setChassisRemarks] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [chassisRemarksBoolean, setChassisRemarksBoolean] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [chassisBase64, setChassisBase64] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [chassisSwitch, setChassisSwitch] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [chassisSwitchBoolean, setChassisSwitchBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [chassisCondition, setChasisCondition] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [chassisConditionBoolean, setChasisConditionBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [vinPlatePunchPhoto, setVinPlatePunchPhoto] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [vinPlatePunchPhotoBoolean, setVinPlatePunchPhotoBoolean] = useState(
    Array.from({length: 1}, () => false),
  );
  const [vinPlateRemarks, setVinPlateRemarks] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [vinPlateRemarksBoolean, setVinPlateRemarksBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [vinPlateBase64, setVinPlateBase64] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [vinPlateSwitch, setVinPlateSwitch] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [vinPlateBoolean, setVinPlateSwitchBoolean] = useState(
    Array.from({length: 1}, () => false),
  );
  const [vinPlateCondition, setVinPlateCondition] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [vinPlateConditionBoolean, setVinPlateConditionBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [rhsViewPhoto, setRhsViewPhoto] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [rhsViewPhotoBoolean, setRhsViewPhotoBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [rhsViewBase64, setRhsViewBase64] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [rhsViewRemarks, setRhsViewRemarks] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [rhsViewRemarksBoolean, setRhsViewRemarksBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [lhsViewPhoto, setLhsViewPhoto] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [lhsViewPhotoBoolean, setLhsViewPhotoBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [lhsViewBase64, setLhsViewBase64] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [lhsViewRemarks, setLhsViewRemarks] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [lhsViewRemarksBoolean, setLhsViewRemarksBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [rearViewPhoto, setRearViewPhoto] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [rearViewPhotoBoolean, setRearViewPhotoBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [rearViewBase64, setRearViewBase64] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [rearViewRemarks, setRearViewRemarks] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [rearViewRemarksBoolean, setRearViewRemarksBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [trunkBootPhoto, setTrunkBootPhoto] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [trunkBootPhotoBoolean, setTrunkBootPhotoBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [trunkBootBase64, setTrunkBootBase64] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [trunkBootRemarks, setTrunkBootRemarks] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [trunkBootRemarksBoolean, setTrunkBootRemarksBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [roofPhoto, setRoofPhoto] = useState(Array.from({length: 1}, () => ''));

  const [roofPhotoBoolean, setRoofPhotoBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [roofBase64, setRoofBase64] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [roofRemarks, setRoofRemarks] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [roofRemarksBoolean, setRoofRemarksBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [underChassisPhoto, setUnderChassisPhoto] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [underChassisPhotoBoolean, setUnderChassisPhotoBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [underChassisBase64, setUnderChassisBase64] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [underChassisRemarks, setUnderChassisRemarks] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [underChassisRemarksBoolean, setUnderChassisRemarksBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [odometerPhoto, setOdometerPhoto] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [odometerPhotoBoolean, setOdometerPhotoBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [odometerBase64, setOdometerBase64] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [odometerRemarks, setOdometerRemarks] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [odometerRemarksBoolean, setOdometerRemarksBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [interiorPhoto, setInteriorPhoto] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [interiorPhotoBoolean, setInteriorPhotoBoolean] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [interiorBase64, setInteriorBase64] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [interiorRemarks, setInteriorRemarks] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [interiorRemarksBoolean, setInteriorRemarksBoolean] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [tyrePunchPhoto, setTyrePunchPhoto] = useState(
    Array.from({length: 4}, () => ''),
  );

  const [tyrePunchPhotoBoolean, setTyrePunchPhotoBoolean] = useState(
    Array.from({length: 4}, () => false),
  );

  const [tyreRemarks, setTyreRemarks] = useState(
    Array.from({length: 4}, () => ''),
  );

  const [tyreRemarksBoolean, setTyreRemarksBoolean] = useState(
    Array.from({length: 4}, () => false),
  );

  const [tyreBase64, setTyreBase64] = useState(
    Array.from({length: 4}, () => ''),
  );
  const [tyreSwitch, setTyreSwitch] = useState(
    Array.from({length: 4}, () => ''),
  );

  const [tyreSwitchBoolean, setTyreSwitchBoolean] = useState(
    Array.from({length: 4}, () => false),
  );

  const [tyreCondition, setTyreCondition] = useState(
    Array.from({length: 4}, () => ''),
  );

  const [tyreConditionBoolean, setTyreConditionBoolean] = useState(
    Array.from({length: 4}, () => false),
  );

  const [spareWheelPunchPhoto, setSpareWheelPunchPhoto] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [spareWheelPunchPhotoBoolean, setSpareWheelPunchPhotoBoolean] =
    useState(Array.from({length: 1}, () => false));

  const [spareWheelRemarks, setSpareWheelRemarks] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [spareWheelRemarksBoolean, setSpareWheelRemarksBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [spareWheelBase64, setSpareWheelBase64] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [spareWheelSwitch, setSpareWheelSwitch] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [spareWheelSwitchBoolean, setSpareWheelSwitchBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [spareWheelCondition, setSpareWheelCondition] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [spareWheelConditionBoolean, setSpareWheelConditionBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [toolKitPunchPhoto, setToolkitPunchPhoto] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [toolKitPunchPhotoBoolean, setToolkitPunchPhotoBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [toolKitRemarks, setToolkitRemarks] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [toolKitRemarksBoolean, setToolkitRemarksBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [toolKitBase64, setToolkitBase64] = useState(
    Array.from({length: 1}, () => ''),
  );
  const [toolKitSwitch, setToolkitSwitch] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [toolKitSwitchBoolean, setToolkitSwitchBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [toolKitCondition, setToolkitCondition] = useState(
    Array.from({length: 1}, () => ''),
  );

  const [toolKitConditionBoolean, setToolkitConditionBoolean] = useState(
    Array.from({length: 1}, () => false),
  );

  const [keyPunchPhoto, setKeyPunchPhoto] = useState(
    Array.from({length: 2}, () => ''),
  );

  const [keyPunchPhotoBoolean, setKeyPunchPhotoBoolean] = useState(
    Array.from({length: 2}, () => false),
  );

  const [keyRemarks, setKeyRemarks] = useState(
    Array.from({length: 2}, () => ''),
  );

  const [keyRemarksBoolean, setKeyRemarksBoolean] = useState(
    Array.from({length: 2}, () => false),
  );

  const [keyBase64, setKeyBase64] = useState(Array.from({length: 2}, () => ''));
  const [keySwitch, setKeySwitch] = useState(Array.from({length: 2}, () => ''));

  const [keySwitchBoolean, setKeySwitchBoolean] = useState(
    Array.from({length: 2}, () => false),
  );

  const [keyCondition, setKeyCondition] = useState(
    Array.from({length: 2}, () => ''),
  );

  const [keyConditionBoolean, setKeyConditionBoolean] = useState(
    Array.from({length: 2}, () => false),
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [inspectionVisible, setInspectionVisible] = useState(false);
  const [bodyInspectionVisible, setBodyInspectionVisible] = useState(false);
  const [carDetailsInspection, setCarDetailsInspection] = useState(false);
  const [remarks, setRemarks] = useState('');

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
    Array.from({length: 8}, () => ''),
  );

  const [selectedDropDownValues, setSelectedDropDownValues] = useState(
    Array.from({length: 8}, () => ''),
  );

  const [inspectionRemarks, setInspectionRemarks] = useState(
    Array.from({length: 8}, () => ''),
  );

  const [bodyInspectionRemarks, setBodyInspectionRemarks] = useState(
    Array.from({length: 13}, () => null),
  );

  const [carDetailsRemarks, setCarDetailsRemarks] = useState(
    Array.from({length: 6}, () => ''),
  );

  const [photoUris, setPhotoUris] = useState(Array.from({length: 3}, () => ''));

  const [photoUrisCarPhotos, setPhotoUrisCarPhotos] = useState(
    Array.from({length: 10}, () => ''),
  );

  const [reinspectorPhoto, setReinspectorPhoto] = useState(
    Array.from({length: 7}, () => ''),
  );

  const [reinspectorRemarks, setReinspectorRemarks] = useState(
    Array.from({length: 7}, () => ''),
  );

  const [carPhotosRemarks, setCarPhotoRemarks] = useState(
    Array.from({length: 10}, () => ''),
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
    Array.from({length: 10}, () => ''),
  );

  const [base64ReinspectorPhoto, setBase64ReinspectorPhoto] = useState(
    Array.from({length: 7}, () => ''),
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
  const [carIndex8, setCarIndex8] = useState(null);
  const [reinspectorPage, setReinspectorPage] = useState(false);
  const [selectedBodyInspectionIndex, setSelectedBodyInspectionIndex] =
    useState(null);

  const [carDetailsIndex, setCarDetailsIndex] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  // const handleNext = () => {
  //   // const isFormComplete = Object.values(carDetailsFormData).every(value => {
  //   //   console.log('Value:', value, 'Trimmed:', value.trim());
  //   //   return value.trim() !== '';
  //   // });

  //   // const isFormComplete2 = Object.values(carDetailsSecondFormData).every(
  //   //   value => {
  //   //     console.log('Value:', value, 'Trimmed:', value.trim());
  //   //     return value.trim() !== '';
  //   //   },
  //   // );

  //   // console.log(isFormComplete2, 'iSHGFHFHG');

  //   // // const isFormComplete = Object.values(carDetailsFormData).every(value => value.trim() !== '');

  //   // console.log(carDetailsFormData, 'cetd');

  //   // console.log(isFormComplete, 'log');
  //   // const isFormCompleteCarDetails2 = Object.values(
  //   //   carDetailsSecondFormData,
  //   // ).every(value => value != '');

  //   // const isFormCompleteCarDetails3 = Object.values(
  //   //   carDetailsThirdFormData,
  //   // ).every(value => value != '');

  //   // if (isFormComplete) {
  //   if (swiperRef.current) {
  //     swiperRef.current.scrollBy(1);
  //   }
  //   // } else {
  //   //   ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
  //   // }
  // };

  // setRcPhoto((prevPhotos) => {
  //   const newPhotos = [...prevPhotos];
  //   newPhotos[0] = rcFrontPhoto; // Assuming you want to update the first index
  //   return newPhotos;
  // });

  const getSwitchForTyre = switchValue => {
    if (switchValue === '') {
      return '';
    }

    return switchValue === 1 ? 'Alloy' : 'Drum';
  };

  const getSwitch = switchValue => {
    if (switchValue === '') {
      return '';
    }

    return switchValue === 1 ? 'Ok' : 'Not Ok';
  };

  const getSwitchForAvailable = switchValue => {
    if (switchValue === '') {
      return '';
    }

    return switchValue === 1 ? 'Not Available' : 'Available';
  };

  const printStatusFields = params => {
    for (const key in params) {
      if (key.endsWith('Status')) {
        console.log(`${key}:`, params[key]);
      }
    }
  };

  const handleClose = async step => {
    switch (step) {
      case 1:
        setModalVisible(false);
        break;
      case 2:
        setModalVisible1(false);
        break;
      case 3:
        setReinspectorPage(false);
        break;
      case 4:
        setInspectionVisible(false);
        break;
      case 5:
        setBodyInspectionVisible(false);
        break;
      case 6:
        setCarDetailsInspection(false);
        break;
    }
  };

  const getSwitchType = switchValue => {
    if (switchValue === '') {
      return '';
    }
    return switchValue === 1 ? 'Automatic' : 'Manual';
  };

  console.log(
    pillarsPhotoRemarks[3],
    pillarsPhotoRemarks[4],
    pillarsPhotoRemarks[5],
    'hi theredhsijddddddddddddddddddddddddddddddddddddddddddddddddddd',
  );

  const getFuelType = switchValue => {
    if (switchValue === '') {
      return '';
    }
    return switchValue === 1 ? 'Diesel' : 'Petrol';
  };

  const getCngType = switchValue => {
    if (switchValue === '') {
      return '';
    }
    return switchValue === 1 ? 'CNG' : 'LPG';
  };

  const getOriginal = switchValue => {
    if (switchValue === '') {
      return '';
    }
    return switchValue === 1 ? 'Original' : 'Duplicate';
  };

  const getSwitchYesOrNo = switchValue => {
    if (switchValue === '') {
      return '';
    }
    return switchValue === 1 ? 'Yes' : 'No';
  };

  const getFieldValue = (status, value) => (status === 'Not Ok' ? value : '');

  const handleNext = async step => {
    console.log('after.............................................');
    const itemId = await getItem('dealarId');

    console.log(itemId, 'DELAR ID IS THERE...... ID IS THERE................');
    setLoading(true);
    let params = {};

    const alterationResult = showAlterationOptions
      ? selectedOption2 == 1
        ? 'CNG'
        : selectedOption2 == 2
        ? 'LPG'
        : 'COLOUR'
      : 'No';

    const data = {
      wheelTypeCondition: `${Math.round(spareWheel[0] * 100)}%`,
      tyre1Condition: `${Math.round(values[0] * 100)}%`,
      tyre2Condition: `${Math.round(values[1] * 100)}%`,
      tyre3Condition: `${Math.round(values[2] * 100)}%`,
      tyre4Condition: `${Math.round(values[3] * 100)}%`,
    };

    const formatRoadTaxValid = (roadTaxValid) => {
      const [datePart] = roadTaxValid.split(' ');
      return `${datePart} 00:00:00`;
    };


    const roadTaxValid1 = `${roadTaxValid} 00:00:00`;

// Example usage
     const formattedRoadTaxValid = formatRoadTaxValid(roadTaxValid1);

    switch (step) {
      case 1:
        params = {
          id: id ? id : orderId,
          dealerId: itemId,
          orderStatus: 1,
          vechNumber: vechicleNumber,
          vechNumber: vechicleNumber,
          make: make,
          model: model,
          year: year,
          variant: variant,
          mileage: mileage,
          color: color,
          transmission: getSwitchType(selectedOption),
          fuelType: getFuelType(selectedOption1),
          alteration: alterationResult,
          owners: owners,
          hasHypothecated: getSwitchYesOrNo(selectedOption3),
          hypothecatedBy: hypothecatedBy,
          noc: getSwitchYesOrNo(selectedOption4),
          roadTaxValid:formattedRoadTaxValid,
          reRegistered: getSwitchYesOrNo(selectedOption5),
          cubicCapacity: cubicCapacity,
        };

        break;
      case 2:
        params = {
          dealerId: itemId,
          id: id ? id : orderId,
          orderStatus: 1,
          numberOfSeats: numberOfSeats,
          registrationType: registrationType,
          registrationDate: registrationDate,
          insurance: getSwitchYesOrNo(selectedOption6),
          insuranceCompany: insuranceCompany,
          insuranceValidity: insuranceValidity,
          challanDetails: challanDetails,
          blacklisted: getSwitchYesOrNo(selectedOption7),
          chassisNumber: chassisNumber,
          engineNumber: engineNumber,
          rcStatus: getOriginal(selectedOption8),
          stateNoc: getSwitchYesOrNo(selectedOption9),
          flood: getSwitchYesOrNo(selectedOption10)
        };
        break;
      case 3:
        params = {
          dealerId: itemId,
          id: id ? id : orderId,
          orderStatus: 1,
          rcFrontPhoto: rcBase64[0],
          rcBackPhoto: rcBase64[1],
          rcOthersPhoto: rcBase64[2],
          rcRemarks: rcRemarks,
          insuranceOwnDamagePhoto: insuranceBase64[0],
          insuranceThirdPartyPhoto: insuranceBase64[1],
          insuranceOthersPhoto: insuranceBase64[2],
          insuranceRemarks: insuranceRemarks,
          nocPhoto: nocBase64[0],
          nocOthersPhoto: nocBase64[1],
          nocRemarks: nocRemarks,
        };
        params = Object.fromEntries(
          Object.entries(params).filter(
            ([_, value]) =>
              value !== '' &&
              value !== null &&
              value !== false &&
              value !== undefined,
          ),
        );

        break;
      case 4:
        params = {
          dealerId: itemId,
          id: id ? id : orderId,
          orderStatus: 1,
          frontViewPhoto: frontViewBase64[0],
          frontViewRemarks: frontViewRemarks[0],
          engineRoomPhoto: engineRoomBase64[0],
          engineRoomRemarks: engineRoomRemarks[0],
          chassisPunchPhoto: chassisBase64[0],
          chassisPunchStatus: getSwitch(chassisSwitch[0]),
          chassisPunchCondition: chassisCondition[0],
          chassisPunchRemarks: chassisRemarks[0],
          vinPlatePhoto: vinPlateBase64[0],
          vinPlateStatus: getSwitch(vinPlateSwitch[0]),
          vinPlateCondition: vinPlateCondition[0],
          vinPlateRemarks: vinPlateRemarks[0],
          rhsViewPhoto: rhsViewBase64[0],
          rhsViewRemarks: rhsViewRemarks[0],
          primaryKeyPhoto: keyBase64[0],
          primaryKeyStatus: getSwitchForAvailable(keySwitch[0]),
          primaryKeyCondition: keyCondition[0],
          primaryKeyRemarks: keyRemarks[0],
          spareKeyPhoto: keyBase64[1],
          spareKeyStatus: getSwitchForAvailable(keySwitch[1]),
          spareKeyCondition: keyCondition[1],
          spareKeyRemarks: keyRemarks[1],
          odometerPhoto: odometerBase64[0],
          odometerRemarks: odometerRemarks[0],
          interiorPhoto: interiorBase64[0],
          interiorRemarks: interiorRemarks[0],
          // lhsViewPhoto: lhsViewBase64[0],
          //  lhsViewRemarks: lhsViewRemarks[0],
          //   rearViewPhoto: base64CarPhotos[1],
          //  rearViewRemarks: carPhotosRemarks[1],
          //   lhsViewPhoto: base64CarPhotos[2],
          //   lhsViewRemarks: carPhotosRemarks[2],
          //  rhsViewPhoto: base64CarPhotos[3],
          //  rhsViewRemarks: carPhotosRemarks[3],
          //   odometerPhoto: base64CarPhotos[4],
          //   odometerRemarks: carPhotosRemarks[4],
          //   roofPhoto: base64CarPhotos[5],
          //   roofRemarks: carPhotosRemarks[5],
          //   interiorPhoto: base64CarPhotos[6],
          //   interiorRemarks: carPhotosRemarks[6],
          // underChassisPhoto: base64CarPhotos[7],
          // underChassisRemarks: carPhotosRemarks[7],

          // trunkBootPhoto: base64CarPhotos[9],
          // trunkBootRemarks: carPhotosRemarks[9],
        };

        params = Object.fromEntries(
          Object.entries(params).filter(
            ([_, value]) =>
              value !== '' &&
              value !== null &&
              value !== false &&
              value !== undefined,
          ),
        );

        break;
      case 5:
        params = {
          dealerId: itemId,
          id: id ? id : orderId,
          orderStatus: 1,
          lhsViewPhoto: lhsViewBase64[0],
          lhsViewRemarks: lhsViewRemarks[0],
          rearViewPhoto: rearViewBase64[0],
          rearViewRemarks: rearViewRemarks[0],
          trunkBootPhoto: trunkBootBase64[0],
          trunkBootRemarks: trunkBootRemarks[0],
          spareWheelPhoto: spareWheelBase64[0],
          spareWheelStatus: getSwitchForAvailable(spareWheelSwitch[0]),
          spareWheelCondition: data?.wheelTypeCondition,
          spareWheelRemarks: spareWheelRemarks[0],
          toolKitJackPhoto: toolKitBase64[0],
          toolKitJackStatus: getSwitchForAvailable(toolKitSwitch[0]),
          toolKitJackCondition: toolKitCondition[0],
          toolKitJackRemarks: toolKitRemarks[0],
          roofPhoto: roofBase64[0],
          roofRemarks: roofRemarks[0],
          underChassisPhoto: underChassisBase64[0],
          underChassisRemarks: underChassisRemarks[0],
          frontTyreLeftPhoto: tyreBase64[0],
          frontTyreLeftStatus: getSwitch(tyreSwitch[0]),
          frontTyreLeftCondition: data?.tyre1Condition,
          frontTyreLeftRemarks: tyreRemarks[0],
          frontTyreRightPhoto: tyreBase64[1],
          frontTyreRightStatus: getSwitch(tyreSwitch[1]),
          frontTyreRightCondition: data?.tyre2Condition,
          frontTyreRightRemarks: tyreRemarks[1],
          rearTyreLeftPhoto: tyreBase64[2],
          rearTyreLeftStatus: getSwitch(tyreSwitch[2]),
          rearTyreLeftCondition: data?.tyre3Condition,
          rearTyreLeftRemarks: tyreRemarks[2],
          rearTyreRightPhoto: tyreBase64[3],
          rearTyreRightStatus: getSwitch(tyreSwitch[3]),
          rearTyreRightCondition: data?.tyre4Condition,
          rearTyreRightRemarks: tyreRemarks[3],
        };

        params = Object.fromEntries(
          Object.entries(params).filter(
            ([_, value]) =>
              value !== '' &&
              value !== null &&
              value !== false &&
              value !== undefined,
          ),
        );

        break;

      case 6:
        params = {
          dealerId: itemId,
          id: id ? id : orderId,
          orderStatus: 1,
          bonnetPhoto:
            getSwitch(bonetSwitch[0]) === 'Not Ok' ? bonetBase64[0] : '',
          bonnetStatus: getSwitch(bonetSwitch[0]),
          bonnetCondition:
            getSwitch(bonetSwitch[0]) === 'Not Ok' ? bonetCondition[0] : '',
          bonnetRemarks:
            getSwitch(bonetSwitch[0]) === 'Not Ok' ? bonetRemarks[0] : '',
          apronLeftSidePhoto: getFieldValue(
            getSwitch(apronSwitch[0]),
            apronBase64[0],
          ),
          apronLeftSideStatus: getSwitch(apronSwitch[0]),
          apronLeftSideCondition: getFieldValue(
            getSwitch(apronSwitch[0]),
            apronCondition[0],
          ),
          apronLeftSideRemarks: getFieldValue(
            getSwitch(apronSwitch[0]),
            apronRemarks[0],
          ),

          apronRightSidePhoto: getFieldValue(
            getSwitch(apronSwitch[1]),
            apronBase64[1],
          ),
          apronRightSideStatus: getSwitch(apronSwitch[1]),
          apronRightSideCondition: getFieldValue(
            getSwitch(apronSwitch[1]),
            apronCondition[1],
          ),
          apronRightSideRemarks: getFieldValue(
            getSwitch(apronSwitch[1]),
            apronRemarks[1],
          ),

          headLampSupportRightSidePhoto: getFieldValue(
            getSwitch(supportMembersSwitch[2]),
            supportMembersBase64[2],
          ),
          headLampSupportRightSideStatus: getSwitch(supportMembersSwitch[2]),
          headLampSupportRightSideCondition: getFieldValue(
            getSwitch(supportMembersSwitch[2]),
            supportMembersCondition[2],
          ),
          headLampSupportRightSideRemarks: getFieldValue(
            getSwitch(supportMembersSwitch[2]),
            supportMembersRemarks[2],
          ),

          headLampSupportLeftSidePhoto: getFieldValue(
            getSwitch(supportMembersSwitch[3]),
            supportMembersBase64[3],
          ),
          headLampSupportLeftSideStatus: getSwitch(supportMembersSwitch[3]),
          headLampSupportLeftSideCondition: getFieldValue(
            getSwitch(supportMembersSwitch[3]),
            supportMembersCondition[3],
          ),
          headLampSupportLeftSideRemarks: getFieldValue(
            getSwitch(supportMembersSwitch[3]),
            supportMembersRemarks[3],
          ),

          supportMemberUpperPhoto: getFieldValue(
            getSwitch(supportMembersSwitch[0]),
            supportMembersBase64[0],
          ),
          supportMemberUpperStatus: getSwitch(supportMembersSwitch[0]),
          supportMemberUpperCondition: getFieldValue(
            getSwitch(supportMembersSwitch[0]),
            supportMembersCondition[0],
          ),
          supportMemberUpperRemarks: getFieldValue(
            getSwitch(supportMembersSwitch[0]),
            supportMembersRemarks[0],
          ),

          supportMemberLowerPhoto: getFieldValue(
            getSwitch(supportMembersSwitch[1]),
            supportMembersBase64[1],
          ),
          supportMemberLowerStatus: getSwitch(supportMembersSwitch[1]),
          supportMemberLowerCondition: getFieldValue(
            getSwitch(supportMembersSwitch[1]),
            supportMembersCondition[1],
          ),
          supportMemberLowerRemarks: getFieldValue(
            getSwitch(supportMembersSwitch[1]),
            supportMembersRemarks[1],
          ),

          bumperFrontPhoto: getFieldValue(
            getSwitch(bumperSwitch[0]),
            bumperBase64[0],
          ),
          bumperFrontStatus: getSwitch(bumperSwitch[0]),
          bumperFrontCondition: getFieldValue(
            getSwitch(bumperSwitch[0]),
            bumperCondition[0],
          ),
          bumperFrontRemarks: getFieldValue(
            getSwitch(bumperSwitch[0]),
            bumperRemarks[0],
          ),

          bumperRearPhoto: getFieldValue(
            getSwitch(bumperSwitch[1]),
            bumperBase64[1],
          ),
          bumperRearStatus: getSwitch(bumperSwitch[1]),
          bumperRearCondition: getFieldValue(
            getSwitch(bumperSwitch[1]),
            bumperCondition[1],
          ),
          bumperRearRemarks: getFieldValue(
            getSwitch(bumperSwitch[1]),
            bumperRemarks[1],
          ),

          windShieldFrontPhoto: getFieldValue(
            getSwitch(windShieldSwitch[0]),
            windShieldBase64[0],
          ),
          windShieldFrontStatus: getSwitch(windShieldSwitch[0]),
          windShieldFrontCondition: getFieldValue(
            getSwitch(windShieldSwitch[0]),
            windShieldCondition[0],
          ),
          windShieldFrontRemarks: getFieldValue(
            getSwitch(windShieldSwitch[0]),
            windShieldRemarks[0],
          ),

          windShieldRearPhoto: getFieldValue(
            getSwitch(windShieldSwitch[1]),
            windShieldBase64[1],
          ),
          windShieldRearStatus: getSwitch(windShieldSwitch[1]),
          windShieldRearCondition: getFieldValue(
            getSwitch(windShieldSwitch[1]),
            windShieldCondition[1],
          ),
          windShieldRearRemarks: getFieldValue(
            getSwitch(windShieldSwitch[1]),
            windShieldRemarks[1],
          ),

          fendersRightSidePhoto: getFieldValue(
            getSwitch(fenderSwitch[1]),
            fennderBase64[1],
          ),
          fendersRightSideStatus: getSwitch(fenderSwitch[1]),
          fendersRightSideCondition: getFieldValue(
            getSwitch(fenderSwitch[1]),
            fenderCondition[1],
          ),
          fendersRightSideRemarks: getFieldValue(
            getSwitch(fenderSwitch[1]),
            fenderRemarks[1],
          ),

          fendersLeftSidePhoto: getFieldValue(
            getSwitch(fenderSwitch[0]),
            fennderBase64[0],
          ),
          fendersLeftSideStatus: getSwitch(fenderSwitch[0]),
          fendersLeftSideCondition: getFieldValue(
            getSwitch(fenderSwitch[0]),
            fenderCondition[0],
          ),
          fendersLeftSideRemarks: getFieldValue(
            getSwitch(fenderSwitch[0]),
            fenderRemarks[0],
          ),
          pillarARightSidePhoto: getFieldValue(
            getSwitch(pillarSwitch[0]),
            pillarBase64[0],
          ),

          pillarARightSideStatus: getSwitch(pillarSwitch[0]),
          pillarARightSideCondition: getFieldValue(
            getSwitch(pillarSwitch[0]),
            pillarsCondition[0],
          ),
          pillarARightSideRemarks: getFieldValue(
            getSwitch(pillarSwitch[0]),
            pillarsPhotoRemarks[0],
          ),

          pillarBRightSidePhoto: getFieldValue(
            getSwitch(pillarSwitch[1]),
            pillarBase64[1],
          ),
          pillarBRightSideStatus: getSwitch(pillarSwitch[1]),
          pillarBRightSideCondition: getFieldValue(
            getSwitch(pillarSwitch[1]),
            pillarsCondition[1],
          ),
          pillarBRightSideRemarks: getFieldValue(
            getSwitch(pillarSwitch[1]),
            pillarsPhotoRemarks[1],
          ),

          pillarCRightSidePhoto: getFieldValue(
            getSwitch(pillarSwitch[2]),
            pillarBase64[2],
          ),
          pillarCRightSideStatus: getSwitch(pillarSwitch[2]),
          pillarCRightSideCondition: getFieldValue(
            getSwitch(pillarSwitch[2]),
            pillarsCondition[2],
          ),
          pillarCRightSideRemarks: getFieldValue(
            getSwitch(pillarSwitch[2]),
            pillarsPhotoRemarks[2],
          ),

          pillarALeftSidePhoto: getFieldValue(
            getSwitch(pillarSwitch[3]),
            pillarBase64[3],
          ),
          pillarALeftSideStatus: getSwitch(pillarSwitch[3]),
          pillarALeftSideCondition: getFieldValue(
            getSwitch(pillarSwitch[3]),
            pillarsCondition[3],
          ),
          pillarALeftSideRemarks: getFieldValue(
            getSwitch(pillarSwitch[3]),
            pillarsPhotoRemarks[3],
          ),

          pillarBLeftSidePhoto: getFieldValue(
            getSwitch(pillarSwitch[4]),
            pillarBase64[4],
          ),
          pillarBLeftSideStatus: getSwitch(pillarSwitch[4]),
          pillarBLeftSideCondition: getFieldValue(
            getSwitch(pillarSwitch[4]),
            pillarsCondition[4],
          ),
          pillarBLeftSideRemarks: getFieldValue(
            getSwitch(pillarSwitch[4]),
            pillarsPhotoRemarks[4],
          ),

          pillarCLeftSidePhoto: getFieldValue(
            getSwitch(pillarSwitch[5]),
            pillarBase64[5],
          ),
          pillarCLeftSideStatus: getSwitch(pillarSwitch[5]),
          pillarCLeftSideCondition: getFieldValue(
            getSwitch(pillarSwitch[5]),
            pillarsCondition[5],
          ),
          pillarCLeftSideRemarks: getFieldValue(
            getSwitch(pillarSwitch[5]),
            pillarsPhotoRemarks[5],
          ),

          doorsFrontLeftSidePhoto: getFieldValue(
            getSwitch(doorSwitch[0]),
            doorBase64[0],
          ),
          doorsFrontLeftSideStatus: getSwitch(doorSwitch[0]),
          doorsFrontLeftSideCondition: getFieldValue(
            getSwitch(doorSwitch[0]),
            doorCondition[0],
          ),
          doorsFrontLeftSideRemarks: getFieldValue(
            getSwitch(doorSwitch[0]),
            doorRemarks[0],
          ),

          doorsRearLeftSidePhoto: getFieldValue(
            getSwitch(doorSwitch[1]),
            doorBase64[1],
          ),
          doorsRearLeftSideStatus: getSwitch(doorSwitch[1]),
          doorsRearLeftSideCondition: getFieldValue(
            getSwitch(doorSwitch[1]),
            doorCondition[1],
          ),
          doorsRearLeftSideRemarks: getFieldValue(
            getSwitch(doorSwitch[1]),
            doorRemarks[1],
          ),

          doorsFrontRightSidePhoto: getFieldValue(
            getSwitch(doorSwitch[2]),
            doorBase64[2],
          ),
          doorsFrontRightSideStatus: getSwitch(doorSwitch[2]),
          doorsFrontRightSideCondition: getFieldValue(
            getSwitch(doorSwitch[2]),
            doorCondition[2],
          ),
          doorsFrontRightSideRemarks: getFieldValue(
            getSwitch(doorSwitch[2]),
            doorRemarks[2],
          ),

          doorsRearRightSidePhoto: getFieldValue(
            getSwitch(doorSwitch[3]),
            doorBase64[3],
          ),
          doorsRearRightSideStatus: getSwitch(doorSwitch[3]),
          doorsRearRightSideCondition: getFieldValue(
            getSwitch(doorSwitch[3]),
            doorCondition[3],
          ),
          doorsRearRightSideRemarks: getFieldValue(
            getSwitch(doorSwitch[3]),
            doorRemarks[3],
          ),

          runningBoardLeftSidePhoto: getFieldValue(
            getSwitch(runningBoardSwitch[1]),
            runningBoardBase64[1],
          ),
          runningBoardLeftSideStatus: getSwitch(runningBoardSwitch[1]),
          runningBoardLeftSideCondition: getFieldValue(
            getSwitch(runningBoardSwitch[1]),
            runnningBoardCondition[1],
          ),
          runningBoardLeftSideRemarks: getFieldValue(
            getSwitch(runningBoardSwitch[1]),
            runningBoardRemarks[1],
          ),

          runningBoardRightSidePhoto: getFieldValue(
            getSwitch(runningBoardSwitch[0]),
            runningBoardBase64[0],
          ),
          runningBoardRightSideStatus: getSwitch(runningBoardSwitch[0]),
          runningBoardRightSideCondition: getFieldValue(
            getSwitch(runningBoardSwitch[0]),
            runnningBoardCondition[0],
          ),
          runningBoardRightSideRemarks: getFieldValue(
            getSwitch(runningBoardSwitch[0]),
            runningBoardRemarks[0],
          ),

          quarterPanelsLeftSidePhoto: getFieldValue(
            getSwitch(quarterPanlesSwitch[0]),
            quarterPanlesBase64[0],
          ),
          quarterPanelsLeftSideStatus: getSwitch(quarterPanlesSwitch[0]),
          quarterPanelsLeftSideCondition: getFieldValue(
            getSwitch(quarterPanlesSwitch[0]),
            quarterPanlesCondition[0],
          ),
          quarterPanelsLeftSideRemarks: getFieldValue(
            getSwitch(quarterPanlesSwitch[0]),
            quarterPanlesRemarks[0],
          ),

          quarterPanelsRightSidePhoto: getFieldValue(
            getSwitch(quarterPanlesSwitch[1]),
            quarterPanlesBase64[1],
          ),
          quarterPanelsRightSideStatus: getSwitch(quarterPanlesSwitch[1]),
          quarterPanelsRightSideCondition: getFieldValue(
            getSwitch(quarterPanlesSwitch[1]),
            quarterPanlesCondition[1],
          ),
          quarterPanelsRightSideRemarks: getFieldValue(
            getSwitch(quarterPanlesSwitch[1]),
            quarterPanlesRemarks[1],
          ),

          bootPhoto: getFieldValue(
            getSwitch(dickyDoorSwitch[0]),
            dickyDoorBase64[0],
          ),
          bootStatus: getSwitch(dickyDoorSwitch[0]),
          bootCondition: getFieldValue(
            getSwitch(dickyDoorSwitch[0]),
            dickyDoorCondition[0],
          ),
          bootRemarks: getFieldValue(
            getSwitch(dickyDoorSwitch[0]),
            dickyDoorRemarks[0],
          ),

          bootSkirtPhoto: getFieldValue(
            getSwitch(dickySkirtSwitch[0]),
            dickySkirtBase64[0],
          ),
          bootSkirtStatus: getSwitch(dickySkirtSwitch[0]),
          bootSkirtCondition: getFieldValue(
            getSwitch(dickySkirtSwitch[0]),
            dickySkirtCondition[0],
          ),
          bootSkirtRemarks: getFieldValue(
            getSwitch(dickySkirtSwitch[0]),
            dickySkirtRemarks[0],
          ),
          wheelType: getSwitchForTyre(selectWheelTypeSwitch[0]),
          wheelTypePhoto: wheelTypeBase64[0],
          wheelTypeStatus: getSwitch(wheelTypeSwitch[0]),
          wheelTypeCondition: wheelTypeCondition[0],
          wheelTypeRemarks: wheelTypeRemarks[0],
        };

        params = Object.fromEntries(
          Object.entries(params).filter(
            ([_, value]) =>
              value !== '' &&
              value !== null &&
              value !== false &&
              value !== undefined,
          ),
        );

        break;

      case 7:
        params = {
          dealerId: itemId,
          id: id ? id : orderId,
          orderStatus: 1,
          strutPhoto: getFieldValue(
            getSwitch(suspensionSwitch[0]),
            suspensionBase64[0],
          ),
          strutStatus: getSwitch(suspensionSwitch[0]),
          strutCondition: getFieldValue(
            getSwitch(suspensionSwitch[0]),
            suspensionDropdown[0],
          ),
          strutRemarks: getFieldValue(
            getSwitch(suspensionSwitch[0]),
            suspensionRemarks[0],
          ),

          lowerArmPhoto: getFieldValue(
            getSwitch(suspensionSwitch[1]),
            suspensionBase64[1],
          ),
          lowerArmStatus: getSwitch(suspensionSwitch[1]),
          lowerArmCondition: getFieldValue(
            getSwitch(suspensionSwitch[1]),
            suspensionDropdown[1],
          ),
          lowerArmRemarks: getFieldValue(
            getSwitch(suspensionSwitch[1]),
            suspensionRemarks[1],
          ),

          linkRodPhoto: getFieldValue(
            getSwitch(suspensionSwitch[2]),
            suspensionBase64[2],
          ),
          linkRodStatus: getSwitch(suspensionSwitch[2]),
          linkRodCondition: getFieldValue(
            getSwitch(suspensionSwitch[2]),
            suspensionDropdown[2],
          ),
          linkRodRemarks: getFieldValue(
            getSwitch(suspensionSwitch[2]),
            suspensionRemarks[2],
          ),

          stabilizerBarPhoto: getFieldValue(
            getSwitch(suspensionSwitch[3]),
            suspensionBase64[3],
          ),
          stabilizerBarStatus: getSwitch(suspensionSwitch[3]),
          stabilizerBarCondition: getFieldValue(
            getSwitch(suspensionSwitch[3]),
            suspensionDropdown[3],
          ),
          stabilizerBarRemarks: getFieldValue(
            getSwitch(suspensionSwitch[3]),
            suspensionRemarks[3],
          ),

          shockAbsorberPhoto: getFieldValue(
            getSwitch(suspensionSwitch[4]),
            suspensionBase64[4],
          ),
          shockAbsorberStatus: getSwitch(suspensionSwitch[4]),
          shockAbsorberCondition: getFieldValue(
            getSwitch(suspensionSwitch[4]),
            suspensionDropdown[4],
          ),
          shockAbsorberRemarks: getFieldValue(
            getSwitch(suspensionSwitch[4]),
            suspensionRemarks[4],
          ),

          coilSpringPhoto: getFieldValue(
            getSwitch(suspensionSwitch[5]),
            suspensionBase64[5],
          ),
          coilSpringStatus: getSwitch(suspensionSwitch[5]),
          coilSpringCondition: getFieldValue(
            getSwitch(suspensionSwitch[5]),
            suspensionDropdown[5],
          ),
          coilSpringRemarks: getFieldValue(
            getSwitch(suspensionSwitch[5]),
            suspensionRemarks[5],
          ),

          leafSpringPhoto: getFieldValue(
            getSwitch(suspensionSwitch[6]),
            suspensionBase64[6],
          ),
          leafSpringStatus: getSwitch(suspensionSwitch[6]),
          leafSpringCondition: getFieldValue(
            getSwitch(suspensionSwitch[6]),
            suspensionDropdown[6],
          ),
          leafSpringRemarks: getFieldValue(
            getSwitch(suspensionSwitch[6]),
            suspensionRemarks[6],
          ),

          rackAndPinionPhoto: getFieldValue(
            getSwitch(steeringSwitch[0]),
            steeringBase64[0],
          ),
          rackAndPinionStatus: getSwitch(steeringSwitch[0]),
          rackAndPinionCondition: getFieldValue(
            getSwitch(steeringSwitch[0]),
            steeringDropdown[0],
          ),
          rackAndPinionRemarks: getFieldValue(
            getSwitch(steeringSwitch[0]),
            steeringRemarks[0],
          ),

          steeringColumnPhoto: getFieldValue(
            getSwitch(steeringSwitch[1]),
            steeringBase64[1],
          ),
          steeringColumnStatus: getSwitch(steeringSwitch[1]),
          steeringColumnCondition: getFieldValue(
            getSwitch(steeringSwitch[1]),
            steeringDropdown[1],
          ),
          steeringColumnRemarks: getFieldValue(
            getSwitch(steeringSwitch[1]),
            steeringRemarks[1],
          ),

          hardnessPhoto: getFieldValue(
            getSwitch(steeringSwitch[2]),
            steeringBase64[2],
          ),
          hardnessStatus: getSwitch(steeringSwitch[2]),
          hardnessCondition: getFieldValue(
            getSwitch(steeringSwitch[2]),
            steeringDropdown[2],
          ),
          hardnessRemarks: getFieldValue(
            getSwitch(steeringSwitch[2]),
            steeringRemarks[2],
          ),

          ballJointEndPhoto: getFieldValue(
            getSwitch(steeringSwitch[3]),
            steeringBase64[3],
          ),
          ballJointEndStatus: getSwitch(steeringSwitch[3]),
          ballJointEndCondition: getFieldValue(
            getSwitch(steeringSwitch[3]),
            steeringDropdown[3],
          ),
          ballJointEndRemarks: getFieldValue(
            getSwitch(steeringSwitch[3]),
            steeringRemarks[3],
          ),

          padPhoto: getFieldValue(getSwitch(brakeSwitch[0]), brakeBase64[0]),
          padStatus: getSwitch(brakeSwitch[0]),
          padCondition: getFieldValue(
            getSwitch(brakeSwitch[0]),
            brakeDropdown[0],
          ),
          padRemarks: getFieldValue(getSwitch(brakeSwitch[0]), brakeRemarks[0]),

          discPhoto: getFieldValue(getSwitch(brakeSwitch[1]), brakeBase64[1]),
          discStatus: getSwitch(brakeSwitch[1]),
          discCondition: getFieldValue(
            getSwitch(brakeSwitch[1]),
            brakeDropdown[1],
          ),
          discRemarks: getFieldValue(
            getSwitch(brakeSwitch[1]),
            brakeRemarks[1],
          ),

          shoePhoto: getFieldValue(getSwitch(brakeSwitch[2]), brakeBase64[2]),
          shoeStatus: getSwitch(brakeSwitch[2]),
          shoeCondition: getFieldValue(
            getSwitch(brakeSwitch[2]),
            brakeDropdown[2],
          ),
          shoeRemarks: getFieldValue(
            getSwitch(brakeSwitch[2]),
            brakeRemarks[2],
          ),

          drumPhoto: getFieldValue(getSwitch(brakeSwitch[3]), brakeBase64[3]),
          drumStatus: getSwitch(brakeSwitch[3]),
          drumCondition: getFieldValue(
            getSwitch(brakeSwitch[3]),
            brakeDropdown[3],
          ),
          drumRemarks: getFieldValue(
            getSwitch(brakeSwitch[3]),
            brakeRemarks[3],
          ),

          wheelCylinderPhoto: getFieldValue(
            getSwitch(brakeSwitch[4]),
            brakeBase64[4],
          ),
          wheelCylinderStatus: getSwitch(brakeSwitch[4]),
          wheelCylinderCondition: getFieldValue(
            getSwitch(brakeSwitch[4]),
            brakeDropdown[4],
          ),
          wheelCylinderRemarks: getFieldValue(
            getSwitch(brakeSwitch[4]),
            brakeRemarks[4],
          ),

          mcBoosterPhoto: getFieldValue(
            getSwitch(brakeSwitch[5]),
            brakeBase64[5],
          ),
          mcBoosterStatus: getSwitch(brakeSwitch[5]),
          mcBoosterCondition: getFieldValue(
            getSwitch(brakeSwitch[5]),
            brakeDropdown[5],
          ),
          mcBoosterRemarks: getFieldValue(
            getSwitch(brakeSwitch[5]),
            brakeRemarks[5],
          ),

          clutchPhoto: getFieldValue(
            getSwitch(transmissionSwitch[0]),
            transmissionBase64[0],
          ),
          clutchStatus: getSwitch(transmissionSwitch[0]),
          clutchCondition: getFieldValue(
            getSwitch(transmissionSwitch[0]),
            transmissionDropdown[0],
          ),
          clutchRemarks: getFieldValue(
            getSwitch(transmissionSwitch[0]),
            transmissionRemarks[0],
          ),

          gearShiftingPhoto: getFieldValue(
            getSwitch(transmissionSwitch[1]),
            transmissionBase64[1],
          ),
          gearShiftingStatus: getSwitch(transmissionSwitch[1]),
          gearShiftingCondition: getFieldValue(
            getSwitch(transmissionSwitch[1]),
            transmissionDropdown[1],
          ),
          gearShiftingRemarks: getFieldValue(
            getSwitch(transmissionSwitch[1]),
            transmissionRemarks[1],
          ),

          driveShaftPhoto: getFieldValue(
            getSwitch(transmissionSwitch[2]),
            transmissionBase64[2],
          ),
          driveShaftStatus: getSwitch(transmissionSwitch[2]),
          driveShaftCondition: getFieldValue(
            getSwitch(transmissionSwitch[2]),
            transmissionDropdown[2],
          ),
          driveShaftRemarks: getFieldValue(
            getSwitch(transmissionSwitch[2]),
            transmissionRemarks[2],
          ),

          axlePhoto: getFieldValue(
            getSwitch(transmissionSwitch[3]),
            transmissionBase64[3],
          ),
          axleStatus: getSwitch(transmissionSwitch[3]),
          axleCondition: getFieldValue(
            getSwitch(transmissionSwitch[3]),
            transmissionDropdown[3],
          ),
          axleRemarks: getFieldValue(
            getSwitch(transmissionSwitch[3]),
            transmissionRemarks[3],
          ),

          propellerShaftPhoto: getFieldValue(
            getSwitch(transmissionSwitch[4]),
            transmissionBase64[4],
          ),
          propellerShaftStatus: getSwitch(transmissionSwitch[4]),
          propellerShaftCondition: getFieldValue(
            getSwitch(transmissionSwitch[4]),
            transmissionDropdown[4],
          ),
          propellerShaftRemarks: getFieldValue(
            getSwitch(transmissionSwitch[4]),
            transmissionRemarks[4],
          ),
          differentialPhoto: getFieldValue(
            getSwitch(transmissionSwitch[5]),
            transmissionBase64[5],
          ),
          differentialStatus: getSwitch(transmissionSwitch[5]),
          differentialCondition: getFieldValue(
            getSwitch(transmissionSwitch[5]),
            transmissionDropdown[5],
          ),
          differentialRemarks: getFieldValue(
            getSwitch(transmissionSwitch[5]),
            transmissionRemarks[5],
          ),

          bearingPhoto: getFieldValue(
            getSwitch(transmissionSwitch[6]),
            transmissionBase64[6],
          ),
          bearingStatus: getSwitch(transmissionSwitch[6]),
          bearingCondition: getFieldValue(
            getSwitch(transmissionSwitch[6]),
            transmissionDropdown[6],
          ),
          bearingRemarks: getFieldValue(
            getSwitch(transmissionSwitch[6]),
            transmissionRemarks[6],
          ),

          mountingPhoto: getFieldValue(
            getSwitch(transmissionSwitch[7]),
            transmissionBase64[7],
          ),
          mountingStatus: getSwitch(transmissionSwitch[7]),
          mountingCondition: getFieldValue(
            getSwitch(transmissionSwitch[7]),
            transmissionDropdown[7],
          ),
          mountingRemarks: getFieldValue(
            getSwitch(transmissionSwitch[7]),
            transmissionRemarks[7],
          ),

          smokePhoto: getFieldValue(
            getSwitch(engineSwitch[0]),
            engineBase64[0],
          ),
          smokeStatus: getSwitch(engineSwitch[0]),
          smokeCondition: getFieldValue(
            getSwitch(engineSwitch[0]),
            engineDropdown[0],
          ),
          smokeRemarks: getFieldValue(
            getSwitch(engineSwitch[0]),
            engineRemarks[0],
          ),
          turboPhoto: getFieldValue(
            getSwitch(engineSwitch[1]),
            engineBase64[1],
          ),
          turboStatus: getSwitch(engineSwitch[1]),
          turboCondition: getFieldValue(
            getSwitch(engineSwitch[1]),
            engineDropdown[1],
          ),
          turboRemarks: getFieldValue(
            getSwitch(engineSwitch[1]),
            engineRemarks[1],
          ),

          misfiringPhoto: getFieldValue(
            getSwitch(engineSwitch[2]),
            engineBase64[2],
          ),
          misfiringStatus: getSwitch(engineSwitch[2]),
          misfiringCondition: getFieldValue(
            getSwitch(engineSwitch[2]),
            engineDropdown[2],
          ),
          misfiringRemarks: getFieldValue(
            getSwitch(engineSwitch[2]),
            engineRemarks[2],
          ),

          tappetPhoto: getFieldValue(
            getSwitch(engineSwitch[3]),
            engineBase64[3],
          ),
          tappetStatus: getSwitch(engineSwitch[3]),
          tappetCondition: getFieldValue(
            getSwitch(engineSwitch[3]),
            engineDropdown[3],
          ),
          tappetRemarks: getFieldValue(
            getSwitch(engineSwitch[3]),
            engineRemarks[3],
          ),

          knockingPhoto: getFieldValue(
            getSwitch(engineSwitch[4]),
            engineBase64[4],
          ),
          knockingStatus: getSwitch(engineSwitch[4]),
          knockingCondition: getFieldValue(
            getSwitch(engineSwitch[4]),
            engineDropdown[4],
          ),
          knockingRemarks: getFieldValue(
            getSwitch(engineSwitch[4]),
            engineRemarks[4],
          ),

          exhaustPhoto: getFieldValue(
            getSwitch(engineSwitch[5]),
            engineBase64[5],
          ),
          exhaustStatus: getSwitch(engineSwitch[5]),
          exhaustCondition: getFieldValue(
            getSwitch(engineSwitch[5]),
            engineDropdown[5],
          ),
          exhaustRemarks: getFieldValue(
            getSwitch(engineSwitch[5]),
            engineRemarks[5],
          ),

          beltsPhoto: getFieldValue(
            getSwitch(engineSwitch[6]),
            engineBase64[6],
          ),
          beltsStatus: getSwitch(engineSwitch[6]),
          beltsCondition: getFieldValue(
            getSwitch(engineSwitch[6]),
            engineDropdown[6],
          ),
          beltsRemarks: getFieldValue(
            getSwitch(engineSwitch[6]),
            engineRemarks[6],
          ),

          tensionerPhoto: getFieldValue(
            getSwitch(engineSwitch[7]),
            engineBase64[7],
          ),
          tensionerStatus: getSwitch(engineSwitch[7]),
          tensionerCondition: getFieldValue(
            getSwitch(engineSwitch[7]),
            engineDropdown[7],
          ),
          tensionerRemarks: getFieldValue(
            getSwitch(engineSwitch[7]),
            engineRemarks[7],
          ),

          mountingPhoto: getFieldValue(
            getSwitch(engineSwitch[8]),
            engineBase64[8],
          ),
          mountingStatus: getSwitch(engineSwitch[8]),
          mountingCondition: getFieldValue(
            getSwitch(engineSwitch[8]),
            engineDropdown[8],
          ),
          mountingRemarks: getFieldValue(
            getSwitch(engineSwitch[8]),
            engineRemarks[8],
          ),

          fuelPumpPhoto: getFieldValue(
            getSwitch(engineSwitch[9]),
            engineBase64[9],
          ),
          fuelPumpStatus: getSwitch(engineSwitch[9]),
          fuelPumpCondition: getFieldValue(
            getSwitch(engineSwitch[9]),
            engineDropdown[9],
          ),
          fuelPumpRemarks: getFieldValue(
            getSwitch(engineSwitch[9]),
            engineRemarks[9],
          ),

          highPressurePumpPhoto: getFieldValue(
            getSwitch(engineSwitch[10]),
            engineBase64[10],
          ),
          highPressurePumpStatus: getSwitch(engineSwitch[10]),
          highPressurePumpCondition: getFieldValue(
            getSwitch(engineSwitch[10]),
            engineDropdown[10],
          ),
          highPressurePumpRemarks: getFieldValue(
            getSwitch(engineSwitch[10]),
            engineRemarks[10],
          ),

          commonrailPhoto: getFieldValue(
            getSwitch(engineSwitch[11]),
            engineBase64[11],
          ),
          commonrailStatus: getSwitch(engineSwitch[11]),
          commonrailCondition: getFieldValue(
            getSwitch(engineSwitch[11]),
            engineDropdown[11],
          ),
          commonrailRemarks: getFieldValue(
            getSwitch(engineSwitch[11]),
            engineRemarks[11],
          ),

          injectorPhoto: getFieldValue(
            getSwitch(engineSwitch[12]),
            engineBase64[12],
          ),
          injectorStatus: getSwitch(engineSwitch[12]),
          injectorCondition: getFieldValue(
            getSwitch(engineSwitch[12]),
            engineDropdown[12],
          ),
          injectorRemarks: getFieldValue(
            getSwitch(engineSwitch[12]),
            engineRemarks[12],
          ),

          // Engine items
          fuelTankPhoto: getFieldValue(
            getSwitch(engineSwitch[13]),
            engineBase64[13],
          ),
          fuelTankStatus: getSwitch(engineSwitch[13]),
          fuelTankCondition: getFieldValue(
            getSwitch(engineSwitch[13]),
            engineDropdown[13],
          ),
          fuelTankRemarks: getFieldValue(
            getSwitch(engineSwitch[13]),
            engineRemarks[13],
          ),

          hosePhoto: getFieldValue(
            getSwitch(engineSwitch[14]),
            engineBase64[14],
          ),
          hoseStatus: getSwitch(engineSwitch[14]),
          hoseCondition: getFieldValue(
            getSwitch(engineSwitch[14]),
            engineDropdown[14],
          ),
          hoseRemarks: getFieldValue(
            getSwitch(engineSwitch[14]),
            engineRemarks[14],
          ),

          radiatorPhoto: getFieldValue(
            getSwitch(engineSwitch[15]),
            engineBase64[15],
          ),
          radiatorStatus: getSwitch(engineSwitch[15]),
          radiatorCondition: getFieldValue(
            getSwitch(engineSwitch[15]),
            engineDropdown[15],
          ),
          radiatorRemarks: getFieldValue(
            getSwitch(engineSwitch[15]),
            engineRemarks[15],
          ),

          fanPhoto: getFieldValue(
            getSwitch(engineSwitch[16]),
            engineBase64[16],
          ),
          fanStatus: getSwitch(engineSwitch[16]),
          fanCondition: getFieldValue(
            getSwitch(engineSwitch[16]),
            engineDropdown[16],
          ),
          fanRemarks: getFieldValue(
            getSwitch(engineSwitch[16]),
            engineRemarks[16],
          ),

          overHeatingPhoto: getFieldValue(
            getSwitch(engineSwitch[17]),
            engineBase64[17],
          ),
          overHeatingStatus: getSwitch(engineSwitch[17]),
          overHeatingCondition: getFieldValue(
            getSwitch(engineSwitch[17]),
            engineDropdown[17],
          ),
          overHeatingRemarks: getFieldValue(
            getSwitch(engineSwitch[17]),
            engineRemarks[17],
          ),

          allBearingsPhoto: getFieldValue(
            getSwitch(engineSwitch[18]),
            engineBase64[18],
          ),
          allBearingsStatus: getSwitch(engineSwitch[18]),
          allBearingsCondition: getFieldValue(
            getSwitch(engineSwitch[18]),
            engineDropdown[18],
          ),
          allBearingsRemarks: getFieldValue(
            getSwitch(engineSwitch[18]),
            engineRemarks[18],
          ),

          // Electrical items
          batteryPhoto: getFieldValue(
            getSwitch(electricalSwitch[0]),
            electricalBase64[0],
          ),
          batteryStatus: getSwitch(electricalSwitch[0]),
          batteryCondition: getFieldValue(
            getSwitch(electricalSwitch[0]),
            electricalDropdown[0],
          ),
          batteryRemarks: getFieldValue(
            getSwitch(electricalSwitch[0]),
            electricalRemarks[0],
          ),

          alternatorPhoto: getFieldValue(
            getSwitch(electricalSwitch[1]),
            electricalBase64[1],
          ),
          alternatorStatus: getSwitch(electricalSwitch[1]),
          alternatorCondition: getFieldValue(
            getSwitch(electricalSwitch[1]),
            electricalDropdown[1],
          ),
          alternatorRemarks: getFieldValue(
            getSwitch(electricalSwitch[1]),
            electricalRemarks[1],
          ),

          selfMotorPhoto: getFieldValue(
            getSwitch(electricalSwitch[2]),
            electricalBase64[2],
          ),
          selfMotorStatus: getSwitch(electricalSwitch[2]),
          selfMotorCondition: getFieldValue(
            getSwitch(electricalSwitch[2]),
            electricalDropdown[2],
          ),
          selfMotorRemarks: getFieldValue(
            getSwitch(electricalSwitch[2]),
            electricalRemarks[2],
          ),

          wiringHarnessPhoto: getFieldValue(
            getSwitch(electricalSwitch[3]),
            electricalBase64[3],
          ),
          wiringHarnessStatus: getSwitch(electricalSwitch[3]),
          wiringHarnessCondition: getFieldValue(
            getSwitch(electricalSwitch[3]),
            electricalDropdown[3],
          ),
          wiringHarnessRemarks: getFieldValue(
            getSwitch(electricalSwitch[3]),
            electricalRemarks[3],
          ),

          ecmPhoto: getFieldValue(
            getSwitch(electricalSwitch[4]),
            electricalBase64[4],
          ),
          ecmStatus: getSwitch(electricalSwitch[4]),
          ecmCondition: getFieldValue(
            getSwitch(electricalSwitch[4]),
            electricalDropdown[4],
          ),
          ecmRemarks: getFieldValue(
            getSwitch(electricalSwitch[4]),
            electricalRemarks[4],
          ),

          allSensorsPhoto: getFieldValue(
            getSwitch(electricalSwitch[5]),
            electricalBase64[5],
          ),
          allSensorsStatus: getSwitch(electricalSwitch[5]),
          allSensorsCondition: getFieldValue(
            getSwitch(electricalSwitch[5]),
            electricalDropdown[5],
          ),
          allSensorsRemarks: getFieldValue(
            getSwitch(electricalSwitch[5]),
            electricalRemarks[5],
          ),

          wiperMotorPhoto: getFieldValue(
            getSwitch(electricalSwitch[6]),
            electricalBase64[6],
          ),
          wiperMotorStatus: getSwitch(electricalSwitch[6]),
          wiperMotorCondition: getFieldValue(
            getSwitch(electricalSwitch[6]),
            electricalDropdown[6],
          ),
          wiperMotorRemarks: getFieldValue(
            getSwitch(electricalSwitch[6]),
            electricalRemarks[6],
          ),

          clusterPhoto: getFieldValue(
            getSwitch(electricalSwitch[7]),
            electricalBase64[7],
          ),
          clusterStatus: getSwitch(electricalSwitch[7]),
          clusterCondition: getFieldValue(
            getSwitch(electricalSwitch[7]),
            electricalDropdown[7],
          ),
          clusterRemarks: getFieldValue(
            getSwitch(electricalSwitch[7]),
            electricalRemarks[7],
          ),

          headLightsAndDrlPhoto: getFieldValue(
            getSwitch(electricalSwitch[8]),
            electricalBase64[8],
          ),
          headLightsAndDrlStatus: getSwitch(electricalSwitch[8]),
          headLightsAndDrlCondition: getFieldValue(
            getSwitch(electricalSwitch[8]),
            electricalDropdown[8],
          ),
          headLightsAndDrlRemarks: getFieldValue(
            getSwitch(electricalSwitch[8]),
            electricalRemarks[8],
          ),

          tailLightPhoto: getFieldValue(
            getSwitch(electricalSwitch[9]),
            electricalBase64[9],
          ),
          tailLightStatus: getSwitch(electricalSwitch[9]),
          tailLightCondition: getFieldValue(
            getSwitch(electricalSwitch[9]),
            electricalDropdown[9],
          ),
          tailLightRemarks: getFieldValue(
            getSwitch(electricalSwitch[9]),
            electricalRemarks[9],
          ),

          cabinLightPhoto: getFieldValue(
            getSwitch(electricalSwitch[10]),
            electricalBase64[10],
          ),
          cabinLightStatus: getSwitch(electricalSwitch[10]),
          cabinLightCondition: getFieldValue(
            getSwitch(electricalSwitch[10]),
            electricalDropdown[10],
          ),
          cabinLightRemarks: getFieldValue(
            getSwitch(electricalSwitch[10]),
            electricalRemarks[10],
          ),

          combinationSwitchPhoto: getFieldValue(
            getSwitch(electricalSwitch[11]),
            electricalBase64[11],
          ),
          combinationSwitchStatus: getSwitch(electricalSwitch[11]),
          combinationSwitchCondition: getFieldValue(
            getSwitch(electricalSwitch[11]),
            electricalDropdown[11],
          ),
          combinationSwitchRemarks: getFieldValue(
            getSwitch(electricalSwitch[11]),
            electricalRemarks[11],
          ),

          absPhoto: getFieldValue(
            getSwitch(electricalSwitch[12]),
            electricalBase64[12],
          ),
          absStatus: getSwitch(electricalSwitch[12]),
          absCondition: getFieldValue(
            getSwitch(electricalSwitch[12]),
            electricalDropdown[12],
          ),
          absRemarks: getFieldValue(
            getSwitch(electricalSwitch[12]),
            electricalRemarks[12],
          ),

          airBagPhoto: getFieldValue(
            getSwitch(electricalSwitch[13]),
            electricalBase64[13],
          ),
          airBagStatus: getSwitch(electricalSwitch[13]),
          airBagCondition: getFieldValue(
            getSwitch(electricalSwitch[13]),
            electricalDropdown[13],
          ),
          airBagRemarks: getFieldValue(
            getSwitch(electricalSwitch[13]),
            electricalRemarks[13],
          ),

          powerWindowsPhoto: getFieldValue(
            getSwitch(electricalSwitch[14]),
            electricalBase64[14],
          ),
          powerWindowsStatus: getSwitch(electricalSwitch[14]),
          powerWindowsCondition: getFieldValue(
            getSwitch(electricalSwitch[14]),
            electricalDropdown[14],
          ),
          powerWindowsRemarks: getFieldValue(
            getSwitch(electricalSwitch[14]),
            electricalRemarks[14],
          ),

          coolingPhoto: getFieldValue(getSwitch(acSwitch[0]), acBase64[0]),
          coolingStatus: getSwitch(acSwitch[0]),
          coolingCondition: getFieldValue(
            getSwitch(acSwitch[0]),
            acDropdown[0],
          ),
          coolingRemarks: getFieldValue(getSwitch(acSwitch[0]), acRemarks[0]),

          blowerPhoto: getFieldValue(getSwitch(acSwitch[1]), acBase64[1]),
          blowerStatus: getSwitch(acSwitch[1]),
          blowerCondition: getFieldValue(getSwitch(acSwitch[1]), acDropdown[1]),
          blowerRemarks: getFieldValue(getSwitch(acSwitch[1]), acRemarks[1]),

          condenserPhoto: getFieldValue(getSwitch(acSwitch[2]), acBase64[2]),
          condenserStatus: getSwitch(acSwitch[2]),
          condenserCondition: getFieldValue(
            getSwitch(acSwitch[2]),
            acDropdown[2],
          ),
          condenserRemarks: getFieldValue(getSwitch(acSwitch[2]), acRemarks[2]),

          fanPhoto: getFieldValue(getSwitch(acSwitch[3]), acBase64[3]),
          fanStatus: getSwitch(acSwitch[3]),
          fanCondition: getFieldValue(getSwitch(acSwitch[3]), acDropdown[3]),
          fanRemarks: getFieldValue(getSwitch(acSwitch[3]), acRemarks[3]),

          controlSwitchPhoto: getFieldValue(
            getSwitch(acSwitch[4]),
            acBase64[4],
          ),
          controlSwitchStatus: getSwitch(acSwitch[4]),
          controlSwitchCondition: getFieldValue(
            getSwitch(acSwitch[4]),
            acDropdown[4],
          ),
          controlSwitchRemarks: getFieldValue(
            getSwitch(acSwitch[4]),
            acRemarks[4],
          ),

          ventPhoto: getFieldValue(getSwitch(acSwitch[5]), acBase64[5]),
          ventStatus: getSwitch(acSwitch[5]),
          ventCondition: getFieldValue(getSwitch(acSwitch[5]), acDropdown[5]),
          ventRemarks: getFieldValue(getSwitch(acSwitch[5]), acRemarks[5]),

          musicSystemPhoto: getFieldValue(
            getSwitch(accessoriesSwitch[0]),
            accessoriesBase64[0],
          ),
          musicSystemStatus: getSwitch(accessoriesSwitch[0]),
          musicSystemCondition: getFieldValue(
            getSwitch(accessoriesSwitch[0]),
            accessoriesDropdown[0],
          ),
          musicSystemRemarks: getFieldValue(
            getSwitch(accessoriesSwitch[0]),
            accessoriesRemarks[0],
          ),

          parkingSensorPhoto: getFieldValue(
            getSwitch(accessoriesSwitch[1]),
            accessoriesBase64[1],
          ),
          parkingSensorStatus: getSwitch(accessoriesSwitch[1]),
          parkingSensorCondition: getFieldValue(
            getSwitch(accessoriesSwitch[1]),
            accessoriesDropdown[1],
          ),
          parkingSensorRemarks: getFieldValue(
            getSwitch(accessoriesSwitch[1]),
            accessoriesRemarks[1],
          ),

          reverseCameraPhoto: getFieldValue(
            getSwitch(accessoriesSwitch[2]),
            accessoriesBase64[2],
          ),
          reverseCameraStatus: getSwitch(accessoriesSwitch[2]),
          reverseCameraCondition: getFieldValue(
            getSwitch(accessoriesSwitch[2]),
            accessoriesDropdown[2],
          ),
          reverseCameraRemarks: getFieldValue(
            getSwitch(accessoriesSwitch[2]),
            accessoriesRemarks[2],
          ),

          ovrmAdjusterPhoto: getFieldValue(
            getSwitch(accessoriesSwitch[3]),
            accessoriesBase64[3],
          ),
          ovrmAdjusterStatus: getSwitch(accessoriesSwitch[3]),
          ovrmAdjusterCondition: getFieldValue(
            getSwitch(accessoriesSwitch[3]),
            accessoriesDropdown[3],
          ),
          ovrmAdjusterRemarks: getFieldValue(
            getSwitch(accessoriesSwitch[3]),
            accessoriesRemarks[3],
          ),

          seatHeightAdjusterPhoto: getFieldValue(
            getSwitch(accessoriesSwitch[4]),
            accessoriesBase64[4],
          ),
          seatHeightAdjusterStatus: getSwitch(accessoriesSwitch[4]),
          seatHeightAdjusterCondition: getFieldValue(
            getSwitch(accessoriesSwitch[4]),
            accessoriesDropdown[4],
          ),
          seatHeightAdjusterRemarks: getFieldValue(
            getSwitch(accessoriesSwitch[4]),
            accessoriesRemarks[4],
          ),

          seatBeltPhoto: getFieldValue(
            getSwitch(accessoriesSwitch[5]),
            accessoriesBase64[5],
          ),
          seatBeltStatus: getSwitch(accessoriesSwitch[5]),
          seatBeltCondition: getFieldValue(
            getSwitch(accessoriesSwitch[5]),
            accessoriesDropdown[5],
          ),
          seatBeltRemarks: getFieldValue(
            getSwitch(accessoriesSwitch[5]),
            accessoriesRemarks[5],
          ),

          sunRoofPhoto: getFieldValue(
            getSwitch(accessoriesSwitch[6]),
            accessoriesBase64[6],
          ),
          sunRoofStatus: getSwitch(accessoriesSwitch[6]),
          sunRoofCondition: getFieldValue(
            getSwitch(accessoriesSwitch[6]),
            accessoriesDropdown[6],
          ),
          sunRoofRemarks: getFieldValue(
            getSwitch(accessoriesSwitch[6]),
            accessoriesRemarks[6],
          ),

          roofRailPhoto: getFieldValue(
            getSwitch(accessoriesSwitch[7]),
            accessoriesBase64[7],
          ),
          roofRailStatus: getSwitch(accessoriesSwitch[7]),
          roofRailCondition: getFieldValue(
            getSwitch(accessoriesSwitch[7]),
            accessoriesDropdown[7],
          ),
          roofRailRemarks: getFieldValue(
            getSwitch(accessoriesSwitch[7]),
            accessoriesRemarks[7],
          ),

          spoilerPhoto: getFieldValue(
            getSwitch(accessoriesSwitch[8]),
            accessoriesBase64[8],
          ),
          spoilerStatus: getSwitch(accessoriesSwitch[8]),
          spoilerCondition: getFieldValue(
            getSwitch(accessoriesSwitch[8]),
            accessoriesDropdown[8],
          ),
          spoilerRemarks: getFieldValue(
            getSwitch(accessoriesSwitch[8]),
            accessoriesRemarks[8],
          ),

          skirtPhoto: getFieldValue(
            getSwitch(accessoriesSwitch[9]),
            accessoriesBase64[9],
          ),
          skirtStatus: getSwitch(accessoriesSwitch[9]),
          skirtCondition: accessoriesDropdown[9],
          skirtRemarks: accessoriesRemarks[9],

          steeringControlsPhoto: getFieldValue(
            getSwitch(accessoriesSwitch[10]),
            accessoriesBase64[10],
          ),
          steeringControlsStatus: getSwitch(accessoriesSwitch[10]),
          steeringControlsCondition: getFieldValue(
            getSwitch(accessoriesSwitch[10]),
            accessoriesDropdown[10],
          ),
          steeringControlsRemarks: getFieldValue(
            getSwitch(accessoriesSwitch[10]),
            accessoriesRemarks[10],
          ),

          engineOilStatus: getSwitch(oliSwitch[0]),
          engineOilRemarks: getFieldValue(
            getSwitch(oliSwitch[0]),
            oilRemarks[0],
          ),
          engineOilCondition: getFieldValue(
            getSwitch(oliSwitch[0]),
            oilDropDown[0],
          ),

          brakeOilStatus: getSwitch(oliSwitch[1]),
          brakeOilRemarks: getFieldValue(
            getSwitch(oliSwitch[1]),
            oilRemarks[1],
          ),
          brakeOilCondition: getFieldValue(
            getSwitch(oliSwitch[1]),
            oilDropDown[1],
          ),

          coolentOilStatus: getSwitch(oliSwitch[2]),
          coolentOilRemarks: getFieldValue(
            getSwitch(oliSwitch[2]),
            oilRemarks[2],
          ),
          coolentOilCondition: getFieldValue(
            getSwitch(oliSwitch[2]),
            oilDropDown[2],
          ),

          gearOilStatus: getSwitch(oliSwitch[3]),
          gearOilRemarks: getFieldValue(getSwitch(oliSwitch[3]), oilRemarks[3]),
          gearOilCondition: getFieldValue(
            getSwitch(oliSwitch[3]),
            oilDropDown[3],
          ),

          crownOilStatus: getSwitch(oliSwitch[4]),
          crownOilRemarks: getFieldValue(
            getSwitch(oliSwitch[4]),
            oilRemarks[4],
          ),
          crownOilCondition: getFieldValue(
            getSwitch(oliSwitch[4]),
            oilDropDown[4],
          ),

          roadTestRemarks: roadTestRemarks,
        };
        params = Object.fromEntries(
          Object.entries(params).filter(
            ([_, value]) =>
              value !== '' &&
              value !== null &&
              value !== false &&
              value !== undefined,
          ),
        );

        break;

      case 8:
        params = {
          dealerId: itemId,
          id: id ? id : orderId,
          orderStatus: 2,
          finalFrontViewPhoto: base64ReinspectorPhoto[0],
          finalFrontViewRemarks: reinspectorRemarks[0],
          finalRearViewPhoto: base64ReinspectorPhoto[1],
          finalRearViewRemarks: reinspectorRemarks[1],
          finalLhsViewPhoto: base64ReinspectorPhoto[2],
          finalLhsViewRemarks: reinspectorRemarks[2],
          finalRhsViewPhoto: base64ReinspectorPhoto[3],
          finalRhsViewRemarks: reinspectorRemarks[3],
          finalOdometerPhoto: base64ReinspectorPhoto[4],
          finalOdometerRemarks: reinspectorRemarks[4],
          finalRoofPhoto: base64ReinspectorPhoto[5],
          finalRoofRemarks: reinspectorRemarks[5],
          finalInteriorPhoto: base64ReinspectorPhoto[6],
          finalInteriorRemarks: reinspectorRemarks[6],
        };

        params = Object.fromEntries(
          Object.entries(params).filter(
            ([_, value]) =>
              value !== '' &&
              value !== null &&
              value !== false &&
              value !== undefined,
          ),
        );

        break;

      default:
        break;
    }

    // if (keyword === 'submit') {
    //   setRefreshing(true);
    // } else {
    //   setLoading(true); // Show activity indicator
    // }

    // Call the API
    try {
      console.log(itemId, 'DEALER ID IS THERE....');

      console.log(params, 'NEXT BUTTON.............................');

      // printStatusFields(params);

      const data = await apiPostWithToken('updateOrder', params);

      if (role === 'Reinspector') {
        if (step === 8) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Dashboard'}],
            }),
          );
        } else {
          if (swiperRef.current) {
            swiperRef.current.scrollBy(1);
          }
        }
      } else {
        if (step === 7) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Dashboard'}],
            }),
          );
        } else {
          if (swiperRef.current) {
            swiperRef.current.scrollBy(1);
          }
        }
      }
    } catch (error) {
      // Handle errors here
      console.error('Request failed:', error);
    } finally {
      setLoading(false); // Show activity indicator
    }
  };

  const findDifferences = async (obj1, obj2) => {
    const diff = {};

    console.log(obj2, obj1, 'is there');

    // Check keys in newObject
    Object.keys(obj2).forEach(key => {
      if (obj2[key] !== obj1[key] && obj2[key] !== '') {
        diff[key] = obj2[key];
      }
    });

    return diff;
  };

  const handleNextUpdate = async step => {
    console.log('pure.......................................');
    const itemId = await getItem('dealarId');
    setLoading(true);
    let params = {};

    console.log(itemId, 'ITEM ID IS THERE........');

    const alterationResult = showAlterationOptions
      ? selectedOption2 == 1
        ? 'CNG'
        : selectedOption2 == 2
        ? 'LPG'
        : 'COLOUR'
      : 'No';

    const data = {
      wheelTypeCondition: `${Math.round(spareWheel[0] * 100)}%`,
      tyre1Condition: `${Math.round(values[0] * 100)}%`,
      tyre2Condition: `${Math.round(values[1] * 100)}%`,
      tyre3Condition: `${Math.round(values[2] * 100)}%`,
      tyre4Condition: `${Math.round(values[3] * 100)}%`,
    };

    switch (step) {
      case 1:
        params = {
          id: id ? id : orderId,
          dealerId: dealerIdNumber,
          orderStatus: 1,
          vechNumber: vechicleNumber,
          make: make,
          model: model,
          year: year,
          variant: variant,
          mileage: mileage,
          color: color,
          transmission: getSwitchType(selectedOption),
          fuelType: getFuelType(selectedOption1),
          alteration: getCngType(selectedOption2),
          alteration: alterationResult,
          owners: owners,
          hasHypothecated: getSwitchYesOrNo(selectedOption3),
          hypothecatedBy: hypothecatedBy,
          noc: getSwitchYesOrNo(selectedOption4),
          roadTaxValid: `${roadTaxValid} 00:00:00`,
          reRegistered: getSwitchYesOrNo(selectedOption5),
          cubicCapacity: cubicCapacity,
        };

        await getOneOrder();

        break;
      case 2:
        params = {
          dealerId: dealerIdNumber,
          id: id ? id : orderId,
          orderStatus: 1,
          numberOfSeats: numberOfSeats,
          registrationType: registrationType,
          registrationDate: registrationDate,
          insurance: getSwitchYesOrNo(selectedOption6),
          insuranceCompany: insuranceCompany,
          insuranceValidity: insuranceValidity,
          challanDetails: challanDetails,
          blacklisted: getSwitchYesOrNo(selectedOption7),
          chassisNumber: chassisNumber,
          engineNumber: engineNumber,
          rcStatus: getOriginal(selectedOption8),
          stateNoc: getSwitchYesOrNo(selectedOption9),
          flood: getSwitchYesOrNo(selectedOption10),
        };
        await getTwoOrder();

        break;
      case 3:
        params = {
          dealerId: dealerIdNumber,
          id: id ? id : orderId,
          orderStatus: 1,
          rcFrontPhoto: rcBase64[0],
          rcBackPhoto: rcBase64[1],
          rcOthersPhoto: rcBase64[2],
          rcRemarks: rcRemarks,
          insuranceOwnDamagePhoto: insuranceBase64[0],
          insuranceThirdPartyPhoto: insuranceBase64[1],
          insuranceOthersPhoto: insuranceBase64[2],
          insuranceRemarks: insuranceRemarks,
          nocPhoto: nocBase64[0],
          nocOthersPhoto: nocBase64[1],
          nocRemarks: nocRemarks,
        };

        await getThreeOrder();

        params = Object.fromEntries(
          Object.entries(params).filter(
            ([_, value]) =>
              value !== '' &&
              value !== null &&
              value !== false &&
              value !== undefined,
          ),
        );

        break;
      case 4:
        params = {
          dealerId: dealerIdNumber,
          id: id ? id : orderId,
          orderStatus: 1,
          frontViewPhoto: frontViewBase64[0],
          frontViewRemarks: frontViewRemarks[0],
          engineRoomPhoto: engineRoomBase64[0],
          engineRoomRemarks: engineRoomRemarks[0],
          chassisPunchPhoto: chassisBase64[0],
          chassisPunchStatus: getSwitch(chassisSwitch[0]),
          chassisPunchCondition: chassisCondition[0],
          chassisPunchRemarks: chassisRemarks[0],
          vinPlatePhoto: vinPlateBase64[0],
          vinPlateStatus: getSwitch(vinPlateSwitch[0]),
          vinPlateCondition: vinPlateCondition[0],
          vinPlateRemarks: vinPlateRemarks[0],
          rhsViewPhoto: rhsViewBase64[0],
          rhsViewRemarks: rhsViewRemarks[0],
          primaryKeyPhoto: keyBase64[0],
          primaryKeyStatus: getSwitchForAvailable(keySwitch[0]),
          primaryKeyCondition: keyCondition[0],
          primaryKeyRemarks: keyRemarks[0],
          spareKeyPhoto: keyBase64[1],
          spareKeyStatus: getSwitchForAvailable(keySwitch[1]),
          spareKeyCondition: keyCondition[1],
          spareKeyRemarks: keyRemarks[1],
          odometerPhoto: odometerBase64[0],
          odometerRemarks: odometerRemarks[0],
          interiorPhoto: interiorBase64[0],
          interiorRemarks: interiorRemarks[0],
        };

        await getFourOrder();
        params = Object.fromEntries(
          Object.entries(params).filter(
            ([_, value]) =>
              value !== '' &&
              value !== null &&
              value !== false &&
              value !== undefined,
          ),
        );

        break;
      case 5:
        params = {
          dealerId: dealerIdNumber,
          id: id ? id : orderId,
          orderStatus: 1,
          lhsViewPhoto: lhsViewBase64[0],
          lhsViewRemarks: lhsViewRemarks[0],
          rearViewPhoto: rearViewBase64[0],
          rearViewRemarks: rearViewRemarks[0],
          trunkBootPhoto: trunkBootBase64[0],
          trunkBootRemarks: trunkBootRemarks[0],
          spareWheelPhoto: spareWheelBase64[0],
          spareWheelStatus: getSwitchForAvailable(spareWheelSwitch[0]),
          spareWheelCondition:spareWheelIdNumber[0] ? spareWheel[0] :`${Math.round(spareWheel[0] * 100)}%`,
          spareWheelRemarks: spareWheelRemarks[0],
          toolKitJackPhoto: toolKitBase64[0],
          toolKitJackStatus: getSwitchForAvailable(toolKitSwitch[0]),
          toolKitJackCondition: toolKitCondition[0],
          toolKitJackRemarks: toolKitRemarks[0],
          roofPhoto: roofBase64[0],
          roofRemarks: roofRemarks[0],
          underChassisPhoto: underChassisBase64[0],
          underChassisRemarks: underChassisRemarks[0],
          
          frontTyreLeftPhoto: tyreBase64[0],
          frontTyreLeftStatus: getSwitch(tyreSwitch[0]),
          frontTyreLeftCondition:dealerIdNumbers[0] ? values[0] :`${Math.round(values[0] * 100)}%`,
          frontTyreLeftRemarks: tyreRemarks[0],
          frontTyreRightPhoto: tyreBase64[1],
          frontTyreRightStatus: getSwitch(tyreSwitch[1]),
          frontTyreRightCondition:dealerIdNumbers[1] ? values[1] :`${Math.round(values[1] * 100)}%`,
          frontTyreRightRemarks: tyreRemarks[1],
          rearTyreLeftPhoto: tyreBase64[2],
          rearTyreLeftStatus: getSwitch(tyreSwitch[2]),
          rearTyreLeftCondition: dealerIdNumbers[2] ? values[2] :`${Math.round(values[2] * 100)}%`,
          rearTyreLeftRemarks: tyreRemarks[2],
          rearTyreRightPhoto: tyreBase64[3],
          rearTyreRightStatus: getSwitch(tyreSwitch[3]),
          rearTyreRightCondition:dealerIdNumbers[3] ? values[3] :`${Math.round(values[3] * 100)}%`,
          rearTyreRightRemarks: tyreRemarks[3],
        };

        await getFifthOrder();
        params = Object.fromEntries(
          Object.entries(params).filter(
            ([_, value]) =>
              value !== '' &&
              value !== null &&
              value !== false &&
              value !== undefined,
          ),
        );

        break;

      case 6:
        params = {
          dealerId: dealerIdNumber,
          id: id ? id : orderId,
          orderStatus: 1,
          bonnetPhoto:
            getSwitch(bonetSwitch[0]) === 'Not Ok' ? bonetBase64[0] : '',
          bonnetStatus: getSwitch(bonetSwitch[0]),
          bonnetCondition:
            getSwitch(bonetSwitch[0]) === 'Not Ok' ? bonetCondition[0] : '',
          bonnetRemarks:
            getSwitch(bonetSwitch[0]) === 'Not Ok' ? bonetRemarks[0] : '',
          apronLeftSidePhoto: getFieldValue(
            getSwitch(apronSwitch[0]),
            apronBase64[0],
          ),
          apronLeftSideStatus: getSwitch(apronSwitch[0]),
          apronLeftSideCondition: getFieldValue(
            getSwitch(apronSwitch[0]),
            apronCondition[0],
          ),
          apronLeftSideRemarks: getFieldValue(
            getSwitch(apronSwitch[0]),
            apronRemarks[0],
          ),

          apronRightSidePhoto: getFieldValue(
            getSwitch(apronSwitch[1]),
            apronBase64[1],
          ),
          apronRightSideStatus: getSwitch(apronSwitch[1]),
          apronRightSideCondition: getFieldValue(
            getSwitch(apronSwitch[1]),
            apronCondition[1],
          ),
          apronRightSideRemarks: getFieldValue(
            getSwitch(apronSwitch[1]),
            apronRemarks[1],
          ),

          headLampSupportRightSidePhoto: getFieldValue(
            getSwitch(supportMembersSwitch[2]),
            supportMembersBase64[2],
          ),
          headLampSupportRightSideStatus: getSwitch(supportMembersSwitch[2]),
          headLampSupportRightSideCondition: getFieldValue(
            getSwitch(supportMembersSwitch[2]),
            supportMembersCondition[2],
          ),
          headLampSupportRightSideRemarks: getFieldValue(
            getSwitch(supportMembersSwitch[2]),
            supportMembersRemarks[2],
          ),

          headLampSupportLeftSidePhoto: getFieldValue(
            getSwitch(supportMembersSwitch[3]),
            supportMembersBase64[3],
          ),
          headLampSupportLeftSideStatus: getSwitch(supportMembersSwitch[3]),
          headLampSupportLeftSideCondition: getFieldValue(
            getSwitch(supportMembersSwitch[3]),
            supportMembersCondition[3],
          ),
          headLampSupportLeftSideRemarks: getFieldValue(
            getSwitch(supportMembersSwitch[3]),
            supportMembersRemarks[3],
          ),

          supportMemberUpperPhoto: getFieldValue(
            getSwitch(supportMembersSwitch[0]),
            supportMembersBase64[0],
          ),
          supportMemberUpperStatus: getSwitch(supportMembersSwitch[0]),
          supportMemberUpperCondition: getFieldValue(
            getSwitch(supportMembersSwitch[0]),
            supportMembersCondition[0],
          ),
          supportMemberUpperRemarks: getFieldValue(
            getSwitch(supportMembersSwitch[0]),
            supportMembersRemarks[0],
          ),

          supportMemberLowerPhoto: getFieldValue(
            getSwitch(supportMembersSwitch[1]),
            supportMembersBase64[1],
          ),
          supportMemberLowerStatus: getSwitch(supportMembersSwitch[1]),
          supportMemberLowerCondition: getFieldValue(
            getSwitch(supportMembersSwitch[1]),
            supportMembersCondition[1],
          ),
          supportMemberLowerRemarks: getFieldValue(
            getSwitch(supportMembersSwitch[1]),
            supportMembersRemarks[1],
          ),

          bumperFrontPhoto: getFieldValue(
            getSwitch(bumperSwitch[0]),
            bumperBase64[0],
          ),
          bumperFrontStatus: getSwitch(bumperSwitch[0]),
          bumperFrontCondition: getFieldValue(
            getSwitch(bumperSwitch[0]),
            bumperCondition[0],
          ),
          bumperFrontRemarks: getFieldValue(
            getSwitch(bumperSwitch[0]),
            bumperRemarks[0],
          ),

          bumperRearPhoto: getFieldValue(
            getSwitch(bumperSwitch[1]),
            bumperBase64[1],
          ),
          bumperRearStatus: getSwitch(bumperSwitch[1]),
          bumperRearCondition: getFieldValue(
            getSwitch(bumperSwitch[1]),
            bumperCondition[1],
          ),
          bumperRearRemarks: getFieldValue(
            getSwitch(bumperSwitch[1]),
            bumperRemarks[1],
          ),

          windShieldFrontPhoto: getFieldValue(
            getSwitch(windShieldSwitch[0]),
            windShieldBase64[0],
          ),
          windShieldFrontStatus: getSwitch(windShieldSwitch[0]),
          windShieldFrontCondition: getFieldValue(
            getSwitch(windShieldSwitch[0]),
            windShieldCondition[0],
          ),
          windShieldFrontRemarks: getFieldValue(
            getSwitch(windShieldSwitch[0]),
            windShieldRemarks[0],
          ),

          windShieldRearPhoto: getFieldValue(
            getSwitch(windShieldSwitch[1]),
            windShieldBase64[1],
          ),
          windShieldRearStatus: getSwitch(windShieldSwitch[1]),
          windShieldRearCondition: getFieldValue(
            getSwitch(windShieldSwitch[1]),
            windShieldCondition[1],
          ),
          windShieldRearRemarks: getFieldValue(
            getSwitch(windShieldSwitch[1]),
            windShieldRemarks[1],
          ),

          fendersRightSidePhoto: getFieldValue(
            getSwitch(fenderSwitch[1]),
            fennderBase64[1],
          ),
          fendersRightSideStatus: getSwitch(fenderSwitch[1]),
          fendersRightSideCondition: getFieldValue(
            getSwitch(fenderSwitch[1]),
            fenderCondition[1],
          ),
          fendersRightSideRemarks: getFieldValue(
            getSwitch(fenderSwitch[1]),
            fenderRemarks[1],
          ),

          fendersLeftSidePhoto: getFieldValue(
            getSwitch(fenderSwitch[0]),
            fennderBase64[0],
          ),
          fendersLeftSideStatus: getSwitch(fenderSwitch[0]),
          fendersLeftSideCondition: getFieldValue(
            getSwitch(fenderSwitch[0]),
            fenderCondition[0],
          ),
          fendersLeftSideRemarks: getFieldValue(
            getSwitch(fenderSwitch[0]),
            fenderRemarks[0],
          ),
          pillarARightSidePhoto: getFieldValue(
            getSwitch(pillarSwitch[0]),
            pillarBase64[0],
          ),

          pillarARightSideStatus: getSwitch(pillarSwitch[0]),
          pillarARightSideCondition: getFieldValue(
            getSwitch(pillarSwitch[0]),
            pillarsCondition[0],
          ),
          pillarARightSideRemarks: getFieldValue(
            getSwitch(pillarSwitch[0]),
            pillarsPhotoRemarks[0],
          ),

          pillarBRightSidePhoto: getFieldValue(
            getSwitch(pillarSwitch[1]),
            pillarBase64[1],
          ),
          pillarBRightSideStatus: getSwitch(pillarSwitch[1]),
          pillarBRightSideCondition: getFieldValue(
            getSwitch(pillarSwitch[1]),
            pillarsCondition[1],
          ),
          pillarBRightSideRemarks: getFieldValue(
            getSwitch(pillarSwitch[1]),
            pillarsPhotoRemarks[1],
          ),

          pillarCRightSidePhoto: getFieldValue(
            getSwitch(pillarSwitch[2]),
            pillarBase64[2],
          ),
          pillarCRightSideStatus: getSwitch(pillarSwitch[2]),
          pillarCRightSideCondition: getFieldValue(
            getSwitch(pillarSwitch[2]),
            pillarsCondition[2],
          ),
          pillarCRightSideRemarks: getFieldValue(
            getSwitch(pillarSwitch[2]),
            pillarsPhotoRemarks[2],
          ),

          pillarALeftSidePhoto: getFieldValue(
            getSwitch(pillarSwitch[3]),
            pillarBase64[3],
          ),
          pillarALeftSideStatus: getSwitch(pillarSwitch[3]),
          pillarALeftSideCondition: getFieldValue(
            getSwitch(pillarSwitch[3]),
            pillarsCondition[3],
          ),
          pillarALeftSideRemarks: getFieldValue(
            getSwitch(pillarSwitch[3]),
            pillarsPhotoRemarks[3],
          ),

          pillarBLeftSidePhoto: getFieldValue(
            getSwitch(pillarSwitch[4]),
            pillarBase64[4],
          ),
          pillarBLeftSideStatus: getSwitch(pillarSwitch[4]),
          pillarBLeftSideCondition: getFieldValue(
            getSwitch(pillarSwitch[4]),
            pillarsCondition[4],
          ),
          pillarBLeftSideRemarks: getFieldValue(
            getSwitch(pillarSwitch[4]),
            pillarsPhotoRemarks[4],
          ),

          pillarCLeftSidePhoto: getFieldValue(
            getSwitch(pillarSwitch[5]),
            pillarBase64[5],
          ),
          pillarCLeftSideStatus: getSwitch(pillarSwitch[5]),
          pillarCLeftSideCondition: getFieldValue(
            getSwitch(pillarSwitch[5]),
            pillarsCondition[5],
          ),
          pillarCLeftSideRemarks: getFieldValue(
            getSwitch(pillarSwitch[5]),
            pillarsPhotoRemarks[5],
          ),

          doorsFrontLeftSidePhoto: getFieldValue(
            getSwitch(doorSwitch[0]),
            doorBase64[0],
          ),
          doorsFrontLeftSideStatus: getSwitch(doorSwitch[0]),
          doorsFrontLeftSideCondition: getFieldValue(
            getSwitch(doorSwitch[0]),
            doorCondition[0],
          ),
          doorsFrontLeftSideRemarks: getFieldValue(
            getSwitch(doorSwitch[0]),
            doorRemarks[0],
          ),

          doorsRearLeftSidePhoto: getFieldValue(
            getSwitch(doorSwitch[1]),
            doorBase64[1],
          ),
          doorsRearLeftSideStatus: getSwitch(doorSwitch[1]),
          doorsRearLeftSideCondition: getFieldValue(
            getSwitch(doorSwitch[1]),
            doorCondition[1],
          ),
          doorsRearLeftSideRemarks: getFieldValue(
            getSwitch(doorSwitch[1]),
            doorRemarks[1],
          ),

          doorsFrontRightSidePhoto: getFieldValue(
            getSwitch(doorSwitch[2]),
            doorBase64[2],
          ),
          doorsFrontRightSideStatus: getSwitch(doorSwitch[2]),
          doorsFrontRightSideCondition: getFieldValue(
            getSwitch(doorSwitch[2]),
            doorCondition[2],
          ),
          doorsFrontRightSideRemarks: getFieldValue(
            getSwitch(doorSwitch[2]),
            doorRemarks[2],
          ),

          doorsRearRightSidePhoto: getFieldValue(
            getSwitch(doorSwitch[3]),
            doorBase64[3],
          ),
          doorsRearRightSideStatus: getSwitch(doorSwitch[3]),
          doorsRearRightSideCondition: getFieldValue(
            getSwitch(doorSwitch[3]),
            doorCondition[3],
          ),
          doorsRearRightSideRemarks: getFieldValue(
            getSwitch(doorSwitch[3]),
            doorRemarks[3],
          ),

          runningBoardLeftSidePhoto: getFieldValue(
            getSwitch(runningBoardSwitch[1]),
            runningBoardBase64[1],
          ),
          runningBoardLeftSideStatus: getSwitch(runningBoardSwitch[1]),
          runningBoardLeftSideCondition: getFieldValue(
            getSwitch(runningBoardSwitch[1]),
            runnningBoardCondition[1],
          ),
          runningBoardLeftSideRemarks: getFieldValue(
            getSwitch(runningBoardSwitch[1]),
            runningBoardRemarks[1],
          ),

          runningBoardRightSidePhoto: getFieldValue(
            getSwitch(runningBoardSwitch[0]),
            runningBoardBase64[0],
          ),
          runningBoardRightSideStatus: getSwitch(runningBoardSwitch[0]),
          runningBoardRightSideCondition: getFieldValue(
            getSwitch(runningBoardSwitch[0]),
            runnningBoardCondition[0],
          ),
          runningBoardRightSideRemarks: getFieldValue(
            getSwitch(runningBoardSwitch[0]),
            runningBoardRemarks[0],
          ),

          quarterPanelsLeftSidePhoto: getFieldValue(
            getSwitch(quarterPanlesSwitch[0]),
            quarterPanlesBase64[0],
          ),
          quarterPanelsLeftSideStatus: getSwitch(quarterPanlesSwitch[0]),
          quarterPanelsLeftSideCondition: getFieldValue(
            getSwitch(quarterPanlesSwitch[0]),
            quarterPanlesCondition[0],
          ),
          quarterPanelsLeftSideRemarks: getFieldValue(
            getSwitch(quarterPanlesSwitch[0]),
            quarterPanlesRemarks[0],
          ),

          quarterPanelsRightSidePhoto: getFieldValue(
            getSwitch(quarterPanlesSwitch[1]),
            quarterPanlesBase64[1],
          ),
          quarterPanelsRightSideStatus: getSwitch(quarterPanlesSwitch[1]),
          quarterPanelsRightSideCondition: getFieldValue(
            getSwitch(quarterPanlesSwitch[1]),
            quarterPanlesCondition[1],
          ),
          quarterPanelsRightSideRemarks: getFieldValue(
            getSwitch(quarterPanlesSwitch[1]),
            quarterPanlesRemarks[1],
          ),

          bootPhoto: getFieldValue(
            getSwitch(dickyDoorSwitch[0]),
            dickyDoorBase64[0],
          ),
          bootStatus: getSwitch(dickyDoorSwitch[0]),
          bootCondition: getFieldValue(
            getSwitch(dickyDoorSwitch[0]),
            dickyDoorCondition[0],
          ),
          bootRemarks: getFieldValue(
            getSwitch(dickyDoorSwitch[0]),
            dickyDoorRemarks[0],
          ),

          bootSkirtPhoto: getFieldValue(
            getSwitch(dickySkirtSwitch[0]),
            dickySkirtBase64[0],
          ),
          bootSkirtStatus: getSwitch(dickySkirtSwitch[0]),
          bootSkirtCondition: getFieldValue(
            getSwitch(dickySkirtSwitch[0]),
            dickySkirtCondition[0],
          ),
          bootSkirtRemarks: getFieldValue(
            getSwitch(dickySkirtSwitch[0]),
            dickySkirtRemarks[0],
          ),
          wheelType: getSwitchForTyre(selectWheelTypeSwitch[0]),
          wheelTypePhoto: wheelTypeBase64[0],
          wheelTypeStatus: getSwitch(wheelTypeSwitch[0]),
          wheelTypeCondition: wheelTypeCondition[0],
          wheelTypeRemarks: wheelTypeRemarks[0],
        };

        await getSixthOrder();
        params = Object.fromEntries(
          Object.entries(params).filter(
            ([_, value]) =>
              value !== '' &&
              value !== null &&
              value !== false &&
              value !== undefined,
          ),
        );

        break;

      case 7:
        params = {
          dealerId: dealerIdNumber,
          id: id ? id : orderId,
          orderStatus: 1,
          strutPhoto: getFieldValue(
            getSwitch(suspensionSwitch[0]),
            suspensionBase64[0],
          ),
          strutStatus: getSwitch(suspensionSwitch[0]),
          strutCondition: getFieldValue(
            getSwitch(suspensionSwitch[0]),
            suspensionDropdown[0],
          ),
          strutRemarks: getFieldValue(
            getSwitch(suspensionSwitch[0]),
            suspensionRemarks[0],
          ),

          lowerArmPhoto: getFieldValue(
            getSwitch(suspensionSwitch[1]),
            suspensionBase64[1],
          ),
          lowerArmStatus: getSwitch(suspensionSwitch[1]),
          lowerArmCondition: getFieldValue(
            getSwitch(suspensionSwitch[1]),
            suspensionDropdown[1],
          ),
          lowerArmRemarks: getFieldValue(
            getSwitch(suspensionSwitch[1]),
            suspensionRemarks[1],
          ),

          linkRodPhoto: getFieldValue(
            getSwitch(suspensionSwitch[2]),
            suspensionBase64[2],
          ),
          linkRodStatus: getSwitch(suspensionSwitch[2]),
          linkRodCondition: getFieldValue(
            getSwitch(suspensionSwitch[2]),
            suspensionDropdown[2],
          ),
          linkRodRemarks: getFieldValue(
            getSwitch(suspensionSwitch[2]),
            suspensionRemarks[2],
          ),

          stabilizerBarPhoto: getFieldValue(
            getSwitch(suspensionSwitch[3]),
            suspensionBase64[3],
          ),
          stabilizerBarStatus: getSwitch(suspensionSwitch[3]),
          stabilizerBarCondition: getFieldValue(
            getSwitch(suspensionSwitch[3]),
            suspensionDropdown[3],
          ),
          stabilizerBarRemarks: getFieldValue(
            getSwitch(suspensionSwitch[3]),
            suspensionRemarks[3],
          ),

          shockAbsorberPhoto: getFieldValue(
            getSwitch(suspensionSwitch[4]),
            suspensionBase64[4],
          ),
          shockAbsorberStatus: getSwitch(suspensionSwitch[4]),
          shockAbsorberCondition: getFieldValue(
            getSwitch(suspensionSwitch[4]),
            suspensionDropdown[4],
          ),
          shockAbsorberRemarks: getFieldValue(
            getSwitch(suspensionSwitch[4]),
            suspensionRemarks[4],
          ),

          coilSpringPhoto: getFieldValue(
            getSwitch(suspensionSwitch[5]),
            suspensionBase64[5],
          ),
          coilSpringStatus: getSwitch(suspensionSwitch[5]),
          coilSpringCondition: getFieldValue(
            getSwitch(suspensionSwitch[5]),
            suspensionDropdown[5],
          ),
          coilSpringRemarks: getFieldValue(
            getSwitch(suspensionSwitch[5]),
            suspensionRemarks[5],
          ),

          leafSpringPhoto: getFieldValue(
            getSwitch(suspensionSwitch[6]),
            suspensionBase64[6],
          ),
          leafSpringStatus: getSwitch(suspensionSwitch[6]),
          leafSpringCondition: getFieldValue(
            getSwitch(suspensionSwitch[6]),
            suspensionDropdown[6],
          ),
          leafSpringRemarks: getFieldValue(
            getSwitch(suspensionSwitch[6]),
            suspensionRemarks[6],
          ),

          rackAndPinionPhoto: getFieldValue(
            getSwitch(steeringSwitch[0]),
            steeringBase64[0],
          ),
          rackAndPinionStatus: getSwitch(steeringSwitch[0]),
          rackAndPinionCondition: getFieldValue(
            getSwitch(steeringSwitch[0]),
            steeringDropdown[0],
          ),
          rackAndPinionRemarks: getFieldValue(
            getSwitch(steeringSwitch[0]),
            steeringRemarks[0],
          ),

          steeringColumnPhoto: getFieldValue(
            getSwitch(steeringSwitch[1]),
            steeringBase64[1],
          ),
          steeringColumnStatus: getSwitch(steeringSwitch[1]),
          steeringColumnCondition: getFieldValue(
            getSwitch(steeringSwitch[1]),
            steeringDropdown[1],
          ),
          steeringColumnRemarks: getFieldValue(
            getSwitch(steeringSwitch[1]),
            steeringRemarks[1],
          ),

          hardnessPhoto: getFieldValue(
            getSwitch(steeringSwitch[2]),
            steeringBase64[2],
          ),
          hardnessStatus: getSwitch(steeringSwitch[2]),
          hardnessCondition: getFieldValue(
            getSwitch(steeringSwitch[2]),
            steeringDropdown[2],
          ),
          hardnessRemarks: getFieldValue(
            getSwitch(steeringSwitch[2]),
            steeringRemarks[2],
          ),

          ballJointEndPhoto: getFieldValue(
            getSwitch(steeringSwitch[3]),
            steeringBase64[3],
          ),
          ballJointEndStatus: getSwitch(steeringSwitch[3]),
          ballJointEndCondition: getFieldValue(
            getSwitch(steeringSwitch[3]),
            steeringDropdown[3],
          ),
          ballJointEndRemarks: getFieldValue(
            getSwitch(steeringSwitch[3]),
            steeringRemarks[3],
          ),

          padPhoto: getFieldValue(getSwitch(brakeSwitch[0]), brakeBase64[0]),
          padStatus: getSwitch(brakeSwitch[0]),
          padCondition: getFieldValue(
            getSwitch(brakeSwitch[0]),
            brakeDropdown[0],
          ),
          padRemarks: getFieldValue(getSwitch(brakeSwitch[0]), brakeRemarks[0]),

          discPhoto: getFieldValue(getSwitch(brakeSwitch[1]), brakeBase64[1]),
          discStatus: getSwitch(brakeSwitch[1]),
          discCondition: getFieldValue(
            getSwitch(brakeSwitch[1]),
            brakeDropdown[1],
          ),
          discRemarks: getFieldValue(
            getSwitch(brakeSwitch[1]),
            brakeRemarks[1],
          ),

          shoePhoto: getFieldValue(getSwitch(brakeSwitch[2]), brakeBase64[2]),
          shoeStatus: getSwitch(brakeSwitch[2]),
          shoeCondition: getFieldValue(
            getSwitch(brakeSwitch[2]),
            brakeDropdown[2],
          ),
          shoeRemarks: getFieldValue(
            getSwitch(brakeSwitch[2]),
            brakeRemarks[2],
          ),

          drumPhoto: getFieldValue(getSwitch(brakeSwitch[3]), brakeBase64[3]),
          drumStatus: getSwitch(brakeSwitch[3]),
          drumCondition: getFieldValue(
            getSwitch(brakeSwitch[3]),
            brakeDropdown[3],
          ),
          drumRemarks: getFieldValue(
            getSwitch(brakeSwitch[3]),
            brakeRemarks[3],
          ),

          wheelCylinderPhoto: getFieldValue(
            getSwitch(brakeSwitch[4]),
            brakeBase64[4],
          ),
          wheelCylinderStatus: getSwitch(brakeSwitch[4]),
          wheelCylinderCondition: getFieldValue(
            getSwitch(brakeSwitch[4]),
            brakeDropdown[4],
          ),
          wheelCylinderRemarks: getFieldValue(
            getSwitch(brakeSwitch[4]),
            brakeRemarks[4],
          ),

          mcBoosterPhoto: getFieldValue(
            getSwitch(brakeSwitch[5]),
            brakeBase64[5],
          ),
          mcBoosterStatus: getSwitch(brakeSwitch[5]),
          mcBoosterCondition: getFieldValue(
            getSwitch(brakeSwitch[5]),
            brakeDropdown[5],
          ),
          mcBoosterRemarks: getFieldValue(
            getSwitch(brakeSwitch[5]),
            brakeRemarks[5],
          ),

          clutchPhoto: getFieldValue(
            getSwitch(transmissionSwitch[0]),
            transmissionBase64[0],
          ),
          clutchStatus: getSwitch(transmissionSwitch[0]),
          clutchCondition: getFieldValue(
            getSwitch(transmissionSwitch[0]),
            transmissionDropdown[0],
          ),
          clutchRemarks: getFieldValue(
            getSwitch(transmissionSwitch[0]),
            transmissionRemarks[0],
          ),

          gearShiftingPhoto: getFieldValue(
            getSwitch(transmissionSwitch[1]),
            transmissionBase64[1],
          ),
          gearShiftingStatus: getSwitch(transmissionSwitch[1]),
          gearShiftingCondition: getFieldValue(
            getSwitch(transmissionSwitch[1]),
            transmissionDropdown[1],
          ),
          gearShiftingRemarks: getFieldValue(
            getSwitch(transmissionSwitch[1]),
            transmissionRemarks[1],
          ),

          driveShaftPhoto: getFieldValue(
            getSwitch(transmissionSwitch[2]),
            transmissionBase64[2],
          ),
          driveShaftStatus: getSwitch(transmissionSwitch[2]),
          driveShaftCondition: getFieldValue(
            getSwitch(transmissionSwitch[2]),
            transmissionDropdown[2],
          ),
          driveShaftRemarks: getFieldValue(
            getSwitch(transmissionSwitch[2]),
            transmissionRemarks[2],
          ),

          axlePhoto: getFieldValue(
            getSwitch(transmissionSwitch[3]),
            transmissionBase64[3],
          ),
          axleStatus: getSwitch(transmissionSwitch[3]),
          axleCondition: getFieldValue(
            getSwitch(transmissionSwitch[3]),
            transmissionDropdown[3],
          ),
          axleRemarks: getFieldValue(
            getSwitch(transmissionSwitch[3]),
            transmissionRemarks[3],
          ),

          propellerShaftPhoto: getFieldValue(
            getSwitch(transmissionSwitch[4]),
            transmissionBase64[4],
          ),
          propellerShaftStatus: getSwitch(transmissionSwitch[4]),
          propellerShaftCondition: getFieldValue(
            getSwitch(transmissionSwitch[4]),
            transmissionDropdown[4],
          ),
          propellerShaftRemarks: getFieldValue(
            getSwitch(transmissionSwitch[4]),
            transmissionRemarks[4],
          ),
          differentialPhoto: getFieldValue(
            getSwitch(transmissionSwitch[5]),
            transmissionBase64[5],
          ),
          differentialStatus: getSwitch(transmissionSwitch[5]),
          differentialCondition: getFieldValue(
            getSwitch(transmissionSwitch[5]),
            transmissionDropdown[5],
          ),
          differentialRemarks: getFieldValue(
            getSwitch(transmissionSwitch[5]),
            transmissionRemarks[5],
          ),

          bearingPhoto: getFieldValue(
            getSwitch(transmissionSwitch[6]),
            transmissionBase64[6],
          ),
          bearingStatus: getSwitch(transmissionSwitch[6]),
          bearingCondition: getFieldValue(
            getSwitch(transmissionSwitch[6]),
            transmissionDropdown[6],
          ),
          bearingRemarks: getFieldValue(
            getSwitch(transmissionSwitch[6]),
            transmissionRemarks[6],
          ),

          mountingPhoto: getFieldValue(
            getSwitch(transmissionSwitch[7]),
            transmissionBase64[7],
          ),
          mountingStatus: getSwitch(transmissionSwitch[7]),
          mountingCondition: getFieldValue(
            getSwitch(transmissionSwitch[7]),
            transmissionDropdown[7],
          ),
          mountingRemarks: getFieldValue(
            getSwitch(transmissionSwitch[7]),
            transmissionRemarks[7],
          ),

          smokePhoto: getFieldValue(
            getSwitch(engineSwitch[0]),
            engineBase64[0],
          ),
          smokeStatus: getSwitch(engineSwitch[0]),
          smokeCondition: getFieldValue(
            getSwitch(engineSwitch[0]),
            engineDropdown[0],
          ),
          smokeRemarks: getFieldValue(
            getSwitch(engineSwitch[0]),
            engineRemarks[0],
          ),
          turboPhoto: getFieldValue(
            getSwitch(engineSwitch[1]),
            engineBase64[1],
          ),
          turboStatus: getSwitch(engineSwitch[1]),
          turboCondition: getFieldValue(
            getSwitch(engineSwitch[1]),
            engineDropdown[1],
          ),
          turboRemarks: getFieldValue(
            getSwitch(engineSwitch[1]),
            engineRemarks[1],
          ),

          misfiringPhoto: getFieldValue(
            getSwitch(engineSwitch[2]),
            engineBase64[2],
          ),
          misfiringStatus: getSwitch(engineSwitch[2]),
          misfiringCondition: getFieldValue(
            getSwitch(engineSwitch[2]),
            engineDropdown[2],
          ),
          misfiringRemarks: getFieldValue(
            getSwitch(engineSwitch[2]),
            engineRemarks[2],
          ),

          tappetPhoto: getFieldValue(
            getSwitch(engineSwitch[3]),
            engineBase64[3],
          ),
          tappetStatus: getSwitch(engineSwitch[3]),
          tappetCondition: getFieldValue(
            getSwitch(engineSwitch[3]),
            engineDropdown[3],
          ),
          tappetRemarks: getFieldValue(
            getSwitch(engineSwitch[3]),
            engineRemarks[3],
          ),

          knockingPhoto: getFieldValue(
            getSwitch(engineSwitch[4]),
            engineBase64[4],
          ),
          knockingStatus: getSwitch(engineSwitch[4]),
          knockingCondition: getFieldValue(
            getSwitch(engineSwitch[4]),
            engineDropdown[4],
          ),
          knockingRemarks: getFieldValue(
            getSwitch(engineSwitch[4]),
            engineRemarks[4],
          ),

          exhaustPhoto: getFieldValue(
            getSwitch(engineSwitch[5]),
            engineBase64[5],
          ),
          exhaustStatus: getSwitch(engineSwitch[5]),
          exhaustCondition: getFieldValue(
            getSwitch(engineSwitch[5]),
            engineDropdown[5],
          ),
          exhaustRemarks: getFieldValue(
            getSwitch(engineSwitch[5]),
            engineRemarks[5],
          ),

          beltsPhoto: getFieldValue(
            getSwitch(engineSwitch[6]),
            engineBase64[6],
          ),
          beltsStatus: getSwitch(engineSwitch[6]),
          beltsCondition: getFieldValue(
            getSwitch(engineSwitch[6]),
            engineDropdown[6],
          ),
          beltsRemarks: getFieldValue(
            getSwitch(engineSwitch[6]),
            engineRemarks[6],
          ),

          tensionerPhoto: getFieldValue(
            getSwitch(engineSwitch[7]),
            engineBase64[7],
          ),
          tensionerStatus: getSwitch(engineSwitch[7]),
          tensionerCondition: getFieldValue(
            getSwitch(engineSwitch[7]),
            engineDropdown[7],
          ),
          tensionerRemarks: getFieldValue(
            getSwitch(engineSwitch[7]),
            engineRemarks[7],
          ),

          mountingPhoto: getFieldValue(
            getSwitch(engineSwitch[8]),
            engineBase64[8],
          ),
          mountingStatus: getSwitch(engineSwitch[8]),
          mountingCondition: getFieldValue(
            getSwitch(engineSwitch[8]),
            engineDropdown[8],
          ),
          mountingRemarks: getFieldValue(
            getSwitch(engineSwitch[8]),
            engineRemarks[8],
          ),

          fuelPumpPhoto: getFieldValue(
            getSwitch(engineSwitch[9]),
            engineBase64[9],
          ),
          fuelPumpStatus: getSwitch(engineSwitch[9]),
          fuelPumpCondition: getFieldValue(
            getSwitch(engineSwitch[9]),
            engineDropdown[9],
          ),
          fuelPumpRemarks: getFieldValue(
            getSwitch(engineSwitch[9]),
            engineRemarks[9],
          ),

          highPressurePumpPhoto: getFieldValue(
            getSwitch(engineSwitch[10]),
            engineBase64[10],
          ),
          highPressurePumpStatus: getSwitch(engineSwitch[10]),
          highPressurePumpCondition: getFieldValue(
            getSwitch(engineSwitch[10]),
            engineDropdown[10],
          ),
          highPressurePumpRemarks: getFieldValue(
            getSwitch(engineSwitch[10]),
            engineRemarks[10],
          ),

          commonrailPhoto: getFieldValue(
            getSwitch(engineSwitch[11]),
            engineBase64[11],
          ),
          commonrailStatus: getSwitch(engineSwitch[11]),
          commonrailCondition: getFieldValue(
            getSwitch(engineSwitch[11]),
            engineDropdown[11],
          ),
          commonrailRemarks: getFieldValue(
            getSwitch(engineSwitch[11]),
            engineRemarks[11],
          ),

          injectorPhoto: getFieldValue(
            getSwitch(engineSwitch[12]),
            engineBase64[12],
          ),
          injectorStatus: getSwitch(engineSwitch[12]),
          injectorCondition: getFieldValue(
            getSwitch(engineSwitch[12]),
            engineDropdown[12],
          ),
          injectorRemarks: getFieldValue(
            getSwitch(engineSwitch[12]),
            engineRemarks[12],
          ),

          // Engine items
          fuelTankPhoto: getFieldValue(
            getSwitch(engineSwitch[13]),
            engineBase64[13],
          ),
          fuelTankStatus: getSwitch(engineSwitch[13]),
          fuelTankCondition: getFieldValue(
            getSwitch(engineSwitch[13]),
            engineDropdown[13],
          ),
          fuelTankRemarks: getFieldValue(
            getSwitch(engineSwitch[13]),
            engineRemarks[13],
          ),

          hosePhoto: getFieldValue(
            getSwitch(engineSwitch[14]),
            engineBase64[14],
          ),
          hoseStatus: getSwitch(engineSwitch[14]),
          hoseCondition: getFieldValue(
            getSwitch(engineSwitch[14]),
            engineDropdown[14],
          ),
          hoseRemarks: getFieldValue(
            getSwitch(engineSwitch[14]),
            engineRemarks[14],
          ),

          radiatorPhoto: getFieldValue(
            getSwitch(engineSwitch[15]),
            engineBase64[15],
          ),
          radiatorStatus: getSwitch(engineSwitch[15]),
          radiatorCondition: getFieldValue(
            getSwitch(engineSwitch[15]),
            engineDropdown[15],
          ),
          radiatorRemarks: getFieldValue(
            getSwitch(engineSwitch[15]),
            engineRemarks[15],
          ),

          fanPhoto: getFieldValue(
            getSwitch(engineSwitch[16]),
            engineBase64[16],
          ),
          fanStatus: getSwitch(engineSwitch[16]),
          fanCondition: getFieldValue(
            getSwitch(engineSwitch[16]),
            engineDropdown[16],
          ),
          fanRemarks: getFieldValue(
            getSwitch(engineSwitch[16]),
            engineRemarks[16],
          ),

          overHeatingPhoto: getFieldValue(
            getSwitch(engineSwitch[17]),
            engineBase64[17],
          ),
          overHeatingStatus: getSwitch(engineSwitch[17]),
          overHeatingCondition: getFieldValue(
            getSwitch(engineSwitch[17]),
            engineDropdown[17],
          ),
          overHeatingRemarks: getFieldValue(
            getSwitch(engineSwitch[17]),
            engineRemarks[17],
          ),

          allBearingsPhoto: getFieldValue(
            getSwitch(engineSwitch[18]),
            engineBase64[18],
          ),
          allBearingsStatus: getSwitch(engineSwitch[18]),
          allBearingsCondition: getFieldValue(
            getSwitch(engineSwitch[18]),
            engineDropdown[18],
          ),
          allBearingsRemarks: getFieldValue(
            getSwitch(engineSwitch[18]),
            engineRemarks[18],
          ),

          // Electrical items
          batteryPhoto: getFieldValue(
            getSwitch(electricalSwitch[0]),
            electricalBase64[0],
          ),
          batteryStatus: getSwitch(electricalSwitch[0]),
          batteryCondition: getFieldValue(
            getSwitch(electricalSwitch[0]),
            electricalDropdown[0],
          ),
          batteryRemarks: getFieldValue(
            getSwitch(electricalSwitch[0]),
            electricalRemarks[0],
          ),

          alternatorPhoto: getFieldValue(
            getSwitch(electricalSwitch[1]),
            electricalBase64[1],
          ),
          alternatorStatus: getSwitch(electricalSwitch[1]),
          alternatorCondition: getFieldValue(
            getSwitch(electricalSwitch[1]),
            electricalDropdown[1],
          ),
          alternatorRemarks: getFieldValue(
            getSwitch(electricalSwitch[1]),
            electricalRemarks[1],
          ),

          selfMotorPhoto: getFieldValue(
            getSwitch(electricalSwitch[2]),
            electricalBase64[2],
          ),
          selfMotorStatus: getSwitch(electricalSwitch[2]),
          selfMotorCondition: getFieldValue(
            getSwitch(electricalSwitch[2]),
            electricalDropdown[2],
          ),
          selfMotorRemarks: getFieldValue(
            getSwitch(electricalSwitch[2]),
            electricalRemarks[2],
          ),

          wiringHarnessPhoto: getFieldValue(
            getSwitch(electricalSwitch[3]),
            electricalBase64[3],
          ),
          wiringHarnessStatus: getSwitch(electricalSwitch[3]),
          wiringHarnessCondition: getFieldValue(
            getSwitch(electricalSwitch[3]),
            electricalDropdown[3],
          ),
          wiringHarnessRemarks: getFieldValue(
            getSwitch(electricalSwitch[3]),
            electricalRemarks[3],
          ),

          ecmPhoto: getFieldValue(
            getSwitch(electricalSwitch[4]),
            electricalBase64[4],
          ),
          ecmStatus: getSwitch(electricalSwitch[4]),
          ecmCondition: getFieldValue(
            getSwitch(electricalSwitch[4]),
            electricalDropdown[4],
          ),
          ecmRemarks: getFieldValue(
            getSwitch(electricalSwitch[4]),
            electricalRemarks[4],
          ),

          allSensorsPhoto: getFieldValue(
            getSwitch(electricalSwitch[5]),
            electricalBase64[5],
          ),
          allSensorsStatus: getSwitch(electricalSwitch[5]),
          allSensorsCondition: getFieldValue(
            getSwitch(electricalSwitch[5]),
            electricalDropdown[5],
          ),
          allSensorsRemarks: getFieldValue(
            getSwitch(electricalSwitch[5]),
            electricalRemarks[5],
          ),

          wiperMotorPhoto: getFieldValue(
            getSwitch(electricalSwitch[6]),
            electricalBase64[6],
          ),
          wiperMotorStatus: getSwitch(electricalSwitch[6]),
          wiperMotorCondition: getFieldValue(
            getSwitch(electricalSwitch[6]),
            electricalDropdown[6],
          ),
          wiperMotorRemarks: getFieldValue(
            getSwitch(electricalSwitch[6]),
            electricalRemarks[6],
          ),

          clusterPhoto: getFieldValue(
            getSwitch(electricalSwitch[7]),
            electricalBase64[7],
          ),
          clusterStatus: getSwitch(electricalSwitch[7]),
          clusterCondition: getFieldValue(
            getSwitch(electricalSwitch[7]),
            electricalDropdown[7],
          ),
          clusterRemarks: getFieldValue(
            getSwitch(electricalSwitch[7]),
            electricalRemarks[7],
          ),

          headLightsAndDrlPhoto: getFieldValue(
            getSwitch(electricalSwitch[8]),
            electricalBase64[8],
          ),
          headLightsAndDrlStatus: getSwitch(electricalSwitch[8]),
          headLightsAndDrlCondition: getFieldValue(
            getSwitch(electricalSwitch[8]),
            electricalDropdown[8],
          ),
          headLightsAndDrlRemarks: getFieldValue(
            getSwitch(electricalSwitch[8]),
            electricalRemarks[8],
          ),

          tailLightPhoto: getFieldValue(
            getSwitch(electricalSwitch[9]),
            electricalBase64[9],
          ),
          tailLightStatus: getSwitch(electricalSwitch[9]),
          tailLightCondition: getFieldValue(
            getSwitch(electricalSwitch[9]),
            electricalDropdown[9],
          ),
          tailLightRemarks: getFieldValue(
            getSwitch(electricalSwitch[9]),
            electricalRemarks[9],
          ),

          cabinLightPhoto: getFieldValue(
            getSwitch(electricalSwitch[10]),
            electricalBase64[10],
          ),
          cabinLightStatus: getSwitch(electricalSwitch[10]),
          cabinLightCondition: getFieldValue(
            getSwitch(electricalSwitch[10]),
            electricalDropdown[10],
          ),
          cabinLightRemarks: getFieldValue(
            getSwitch(electricalSwitch[10]),
            electricalRemarks[10],
          ),

          combinationSwitchPhoto: getFieldValue(
            getSwitch(electricalSwitch[11]),
            electricalBase64[11],
          ),
          combinationSwitchStatus: getSwitch(electricalSwitch[11]),
          combinationSwitchCondition: getFieldValue(
            getSwitch(electricalSwitch[11]),
            electricalDropdown[11],
          ),
          combinationSwitchRemarks: getFieldValue(
            getSwitch(electricalSwitch[11]),
            electricalRemarks[11],
          ),

          absPhoto: getFieldValue(
            getSwitch(electricalSwitch[12]),
            electricalBase64[12],
          ),
          absStatus: getSwitch(electricalSwitch[12]),
          absCondition: getFieldValue(
            getSwitch(electricalSwitch[12]),
            electricalDropdown[12],
          ),
          absRemarks: getFieldValue(
            getSwitch(electricalSwitch[12]),
            electricalRemarks[12],
          ),

          airBagPhoto: getFieldValue(
            getSwitch(electricalSwitch[13]),
            electricalBase64[13],
          ),
          airBagStatus: getSwitch(electricalSwitch[13]),
          airBagCondition: getFieldValue(
            getSwitch(electricalSwitch[13]),
            electricalDropdown[13],
          ),
          airBagRemarks: getFieldValue(
            getSwitch(electricalSwitch[13]),
            electricalRemarks[13],
          ),

          powerWindowsPhoto: getFieldValue(
            getSwitch(electricalSwitch[14]),
            electricalBase64[14],
          ),
          powerWindowsStatus: getSwitch(electricalSwitch[14]),
          powerWindowsCondition: getFieldValue(
            getSwitch(electricalSwitch[14]),
            electricalDropdown[14],
          ),
          powerWindowsRemarks: getFieldValue(
            getSwitch(electricalSwitch[14]),
            electricalRemarks[14],
          ),

          coolingPhoto: getFieldValue(getSwitch(acSwitch[0]), acBase64[0]),
          coolingStatus: getSwitch(acSwitch[0]),
          coolingCondition: getFieldValue(
            getSwitch(acSwitch[0]),
            acDropdown[0],
          ),
          coolingRemarks: getFieldValue(getSwitch(acSwitch[0]), acRemarks[0]),

          blowerPhoto: getFieldValue(getSwitch(acSwitch[1]), acBase64[1]),
          blowerStatus: getSwitch(acSwitch[1]),
          blowerCondition: getFieldValue(getSwitch(acSwitch[1]), acDropdown[1]),
          blowerRemarks: getFieldValue(getSwitch(acSwitch[1]), acRemarks[1]),

          condenserPhoto: getFieldValue(getSwitch(acSwitch[2]), acBase64[2]),
          condenserStatus: getSwitch(acSwitch[2]),
          condenserCondition: getFieldValue(
            getSwitch(acSwitch[2]),
            acDropdown[2],
          ),
          condenserRemarks: getFieldValue(getSwitch(acSwitch[2]), acRemarks[2]),

          fanPhoto: getFieldValue(getSwitch(acSwitch[3]), acBase64[3]),
          fanStatus: getSwitch(acSwitch[3]),
          fanCondition: getFieldValue(getSwitch(acSwitch[3]), acDropdown[3]),
          fanRemarks: getFieldValue(getSwitch(acSwitch[3]), acRemarks[3]),

          controlSwitchPhoto: getFieldValue(
            getSwitch(acSwitch[4]),
            acBase64[4],
          ),
          controlSwitchStatus: getSwitch(acSwitch[4]),
          controlSwitchCondition: getFieldValue(
            getSwitch(acSwitch[4]),
            acDropdown[4],
          ),
          controlSwitchRemarks: getFieldValue(
            getSwitch(acSwitch[4]),
            acRemarks[4],
          ),

          ventPhoto: getFieldValue(getSwitch(acSwitch[5]), acBase64[5]),
          ventStatus: getSwitch(acSwitch[5]),
          ventCondition: getFieldValue(getSwitch(acSwitch[5]), acDropdown[5]),
          ventRemarks: getFieldValue(getSwitch(acSwitch[5]), acRemarks[5]),

          musicSystemPhoto: getFieldValue(
            getSwitch(accessoriesSwitch[0]),
            accessoriesBase64[0],
          ),
          musicSystemStatus: getSwitch(accessoriesSwitch[0]),
          musicSystemCondition: getFieldValue(
            getSwitch(accessoriesSwitch[0]),
            accessoriesDropdown[0],
          ),
          musicSystemRemarks: getFieldValue(
            getSwitch(accessoriesSwitch[0]),
            accessoriesRemarks[0],
          ),

          parkingSensorPhoto: getFieldValue(
            getSwitch(accessoriesSwitch[1]),
            accessoriesBase64[1],
          ),
          parkingSensorStatus: getSwitch(accessoriesSwitch[1]),
          parkingSensorCondition: getFieldValue(
            getSwitch(accessoriesSwitch[1]),
            accessoriesDropdown[1],
          ),
          parkingSensorRemarks: getFieldValue(
            getSwitch(accessoriesSwitch[1]),
            accessoriesRemarks[1],
          ),

          reverseCameraPhoto: getFieldValue(
            getSwitch(accessoriesSwitch[2]),
            accessoriesBase64[2],
          ),
          reverseCameraStatus: getSwitch(accessoriesSwitch[2]),
          reverseCameraCondition: getFieldValue(
            getSwitch(accessoriesSwitch[2]),
            accessoriesDropdown[2],
          ),
          reverseCameraRemarks: getFieldValue(
            getSwitch(accessoriesSwitch[2]),
            accessoriesRemarks[2],
          ),

          ovrmAdjusterPhoto: getFieldValue(
            getSwitch(accessoriesSwitch[3]),
            accessoriesBase64[3],
          ),
          ovrmAdjusterStatus: getSwitch(accessoriesSwitch[3]),
          ovrmAdjusterCondition: getFieldValue(
            getSwitch(accessoriesSwitch[3]),
            accessoriesDropdown[3],
          ),
          ovrmAdjusterRemarks: getFieldValue(
            getSwitch(accessoriesSwitch[3]),
            accessoriesRemarks[3],
          ),

          seatHeightAdjusterPhoto: getFieldValue(
            getSwitch(accessoriesSwitch[4]),
            accessoriesBase64[4],
          ),
          seatHeightAdjusterStatus: getSwitch(accessoriesSwitch[4]),
          seatHeightAdjusterCondition: getFieldValue(
            getSwitch(accessoriesSwitch[4]),
            accessoriesDropdown[4],
          ),
          seatHeightAdjusterRemarks: getFieldValue(
            getSwitch(accessoriesSwitch[4]),
            accessoriesRemarks[4],
          ),

          seatBeltPhoto: getFieldValue(
            getSwitch(accessoriesSwitch[5]),
            accessoriesBase64[5],
          ),
          seatBeltStatus: getSwitch(accessoriesSwitch[5]),
          seatBeltCondition: getFieldValue(
            getSwitch(accessoriesSwitch[5]),
            accessoriesDropdown[5],
          ),
          seatBeltRemarks: getFieldValue(
            getSwitch(accessoriesSwitch[5]),
            accessoriesRemarks[5],
          ),

          sunRoofPhoto: getFieldValue(
            getSwitch(accessoriesSwitch[6]),
            accessoriesBase64[6],
          ),
          sunRoofStatus: getSwitch(accessoriesSwitch[6]),
          sunRoofCondition: getFieldValue(
            getSwitch(accessoriesSwitch[6]),
            accessoriesDropdown[6],
          ),
          sunRoofRemarks: getFieldValue(
            getSwitch(accessoriesSwitch[6]),
            accessoriesRemarks[6],
          ),

          roofRailPhoto: getFieldValue(
            getSwitch(accessoriesSwitch[7]),
            accessoriesBase64[7],
          ),
          roofRailStatus: getSwitch(accessoriesSwitch[7]),
          roofRailCondition: getFieldValue(
            getSwitch(accessoriesSwitch[7]),
            accessoriesDropdown[7],
          ),
          roofRailRemarks: getFieldValue(
            getSwitch(accessoriesSwitch[7]),
            accessoriesRemarks[7],
          ),

          spoilerPhoto: getFieldValue(
            getSwitch(accessoriesSwitch[8]),
            accessoriesBase64[8],
          ),
          spoilerStatus: getSwitch(accessoriesSwitch[8]),
          spoilerCondition: getFieldValue(
            getSwitch(accessoriesSwitch[8]),
            accessoriesDropdown[8],
          ),
          spoilerRemarks: getFieldValue(
            getSwitch(accessoriesSwitch[8]),
            accessoriesRemarks[8],
          ),

          skirtPhoto: getFieldValue(
            getSwitch(accessoriesSwitch[9]),
            accessoriesBase64[9],
          ),
          skirtStatus: getSwitch(accessoriesSwitch[9]),
          skirtCondition: accessoriesDropdown[9],
          skirtRemarks: accessoriesRemarks[9],

          steeringControlsPhoto: getFieldValue(
            getSwitch(accessoriesSwitch[10]),
            accessoriesBase64[10],
          ),
          steeringControlsStatus: getSwitch(accessoriesSwitch[10]),
          steeringControlsCondition: getFieldValue(
            getSwitch(accessoriesSwitch[10]),
            accessoriesDropdown[10],
          ),
          steeringControlsRemarks: getFieldValue(
            getSwitch(accessoriesSwitch[10]),
            accessoriesRemarks[10],
          ),

          engineOilStatus: getSwitch(oliSwitch[0]),
          engineOilRemarks: getFieldValue(
            getSwitch(oliSwitch[0]),
            oilRemarks[0],
          ),
          engineOilCondition: getFieldValue(
            getSwitch(oliSwitch[0]),
            oilDropDown[0],
          ),

          brakeOilStatus: getSwitch(oliSwitch[1]),
          brakeOilRemarks: getFieldValue(
            getSwitch(oliSwitch[1]),
            oilRemarks[1],
          ),
          brakeOilCondition: getFieldValue(
            getSwitch(oliSwitch[1]),
            oilDropDown[1],
          ),

          coolentOilStatus: getSwitch(oliSwitch[2]),
          coolentOilRemarks: getFieldValue(
            getSwitch(oliSwitch[2]),
            oilRemarks[2],
          ),
          coolentOilCondition: getFieldValue(
            getSwitch(oliSwitch[2]),
            oilDropDown[2],
          ),

          gearOilStatus: getSwitch(oliSwitch[3]),
          gearOilRemarks: getFieldValue(getSwitch(oliSwitch[3]), oilRemarks[3]),
          gearOilCondition: getFieldValue(
            getSwitch(oliSwitch[3]),
            oilDropDown[3],
          ),

          crownOilStatus: getSwitch(oliSwitch[4]),
          crownOilRemarks: getFieldValue(
            getSwitch(oliSwitch[4]),
            oilRemarks[4],
          ),
          crownOilCondition: getFieldValue(
            getSwitch(oliSwitch[4]),
            oilDropDown[4],
          ),

          roadTestRemarks: roadTestRemarks,
        };
        params = Object.fromEntries(
          Object.entries(params).filter(
            ([_, value]) =>
              value !== '' &&
              value !== null &&
              value !== false &&
              value !== undefined,
          ),
        );

        break;

      case 8:
        params = {
          dealerId: dealerIdNumber,
          id: id ? id : orderId,
          orderStatus: 2,
          finalFrontViewPhoto: base64ReinspectorPhoto[0],
          finalFrontViewRemarks: reinspectorRemarks[0],
          finalRearViewPhoto: base64ReinspectorPhoto[1],
          finalRearViewRemarks: reinspectorRemarks[1],
          finalLhsViewPhoto: base64ReinspectorPhoto[2],
          finalLhsViewRemarks: reinspectorRemarks[2],
          finalRhsViewPhoto: base64ReinspectorPhoto[3],
          finalRhsViewRemarks: reinspectorRemarks[3],
          finalOdometerPhoto: base64ReinspectorPhoto[4],
          finalOdometerRemarks: reinspectorRemarks[4],
          finalRoofPhoto: base64ReinspectorPhoto[5],
          finalRoofRemarks: reinspectorRemarks[5],
          finalInteriorPhoto: base64ReinspectorPhoto[6],
          finalInteriorRemarks: reinspectorRemarks[6],
        };

        params = Object.fromEntries(
          Object.entries(params).filter(
            ([_, value]) =>
              value !== '' &&
              value !== null &&
              value !== false &&
              value !== undefined,
          ),
        );
        break;

      default:
        throw new Error('Invalid step');
    }

    // Call the API

    try {
      console.log(params, 'pgyfy');
      console.log(getSwitch(transmissionSwitch[7]),"hi therres");
      console.log(itemId,"dealer id is there...");
      const data = await apiPostWithToken('updateOrder', params);

      if (role === 'Reinspector') {
        if (step === 8) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Dashboard'}],
            }),
          );
        } else {
          if (swiperRef.current) {
            swiperRef.current.scrollBy(1);
          }
        }
      } else {
        if (step === 7) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Dashboard'}],
            }),
          );
        } else {
          if (swiperRef.current) {
            swiperRef.current.scrollBy(1);
          }
        }
      }
    

      // if (step == 8) {
      //   navigation.dispatch(
      //     CommonActions.reset({
      //       index: 0,
      //       routes: [{name: 'Dashboard'}],
      //     }),
      //   );
      // } else {
      //   if (swiperRef.current) {
      //     swiperRef.current.scrollBy(1);
      //   }
      // }
    } catch (error) {
      // Handle errors here
      console.error('Request failed:', error);
    } finally {
      setLoading(false); // Hide activity indicator
    }
  };

  const handleDocuments = async () => {
    setLoading(true); // Show activity indicator

    const itemId = await getItem('dealarId');

    console.log(itemId, 'DEKARWR');
    const params = {
      dealerId: itemId,
      id: orderId,
      orderStatus: 1,
      strutPhoto: suspensionBase64[0],
      strutStatus: suspensionSwitch[0],
      strutCondition: suspensionDropdown[0],
      strutRemarks: suspensionRemarks[0],
      lowerArmPhoto: suspensionBase64[1],
      lowerArmStatus: suspensionSwitch[1],
      lowerArmCondition: suspensionDropdown[1],
      lowerArmRemarks: suspensionRemarks[1],
      linkRodPhoto: suspensionBase64[2],
      linkRodStatus: suspensionSwitch[2],
      linkRodCondition: suspensionDropdown[2],
      linkRodRemarks: suspensionRemarks[2],
      stabilizerBarPhoto: suspensionBase64[3],
      stabilizerBarStatus: suspensionSwitch[3],
      stabilizerBarCondition: suspensionDropdown[3],
      stabilizerBarRemarks: suspensionRemarks[3],
      shockAbsorberPhoto: suspensionBase64[4],
      shockAbsorberStatus: suspensionSwitch[4],
      shockAbsorberCondition: suspensionDropdown[4],
      shockAbsorberRemarks: suspensionRemarks[4],
      coilSpringPhoto: suspensionBase64[5],
      coilSpringStatus: suspensionSwitch[5],
      coilSpringCondition: suspensionDropdown[5],
      coilSpringRemarks: suspensionRemarks[5],
      leafSpringPhoto: suspensionBase64[6],
      leafSpringStatus: suspensionSwitch[6],
      leafSpringCondition: suspensionDropdown[6],
      leafSpringRemarks: suspensionRemarks[6],
      rackAndPinionPhoto: steeringBase64[0],
      rackAndPinionStatus: steeringSwitch[0],
      rackAndPinionCondition: steeringDropdown[0],
      rackAndPinionRemarks: steeringRemarks[0],
      steeringColumnPhoto: steeringBase64[1],
      steeringColumnStatus: steeringSwitch[1],
      steeringColumnCondition: steeringDropdown[1],
      steeringColumnRemarks: steeringRemarks[1],
      hardnessPhoto: steeringBase64[2],
      hardnessStatus: steeringSwitch[2],
      hardnessCondition: steeringDropdown[2],
      hardnessRemarks: steeringRemarks[2],
      ballJointEndPhoto: steeringBase64[3],
      ballJointEndStatus: steeringSwitch[3],
      ballJointEndCondition: steeringDropdown[3],
      ballJointEndRemarks: steeringRemarks[3],
      padPhoto: brakeBase64[0],
      padStatus: brakeSwitch[0],
      padCondition: brakeDropdown[0],
      padRemarks: brakeRemarks[0],
      discPhoto: brakeBase64[1],
      discStatus: brakeSwitch[1],
      discCondition: brakeDropdown[1],
      discRemarks: brakeRemarks[1],
      shoePhoto: brakeBase64[2],
      shoeStatus: brakeSwitch[2],
      shoeCondition: brakeDropdown[2],
      shoeRemarks: brakeRemarks[2],
      drumPhoto: brakeBase64[3],
      drumStatus: brakeSwitch[3],
      drumCondition: brakeDropdown[3],
      drumRemarks: brakeRemarks[3],
      wheelCylinderPhoto: brakeBase64[4],
      wheelCylinderStatus: brakeSwitch[4],
      wheelCylinderCondition: brakeDropdown[4],
      wheelCylinderRemarks: brakeRemarks[4],
      mcBoosterPhoto: brakeBase64[5],
      mcBoosterStatus: brakeSwitch[5],
      mcBoosterCondition: brakeDropdown[5],
      mcBoosterRemarks: brakeRemarks[5],
      clutchPhoto: transmissionBase64[0],
      clutchStatus: transmissionSwitch[0],
      clutchCondition: transmissionSwitch[0],
      clutchRemarks: transmissionRemarks[0],
      gearShiftingPhoto: transmissionBase64[1],
      gearShiftingStatus: transmissionSwitch[1],
      gearShiftingCondition: transmissionDropdown[1],
      gearShiftingRemarks: transmissionRemarks[1],
      driveShaftPhoto: transmissionBase64[2],
      driveShaftStatus: transmissionSwitch[2],
      driveShaftCondition: transmissionDropdown[2],
      driveShaftRemarks: transmissionRemarks[2],
      axlePhoto: transmissionBase64[3],
      axleStatus: transmissionSwitch[3],
      axleCondition: transmissionDropdown[3],
      axleRemarks: transmissionDropdown[3],
      propellerShaftPhoto: transmissionBase64[4],
      propellerShaftStatus: transmissionSwitch[4],
      propellerShaftCondition: transmissionDropdown[4],
      propellerShaftRemarks: transmissionRemarks[4],
      differentialPhoto: transmissionBase64[5],
      differentialStatus: transmissionSwitch[5],
      differentialCondition: transmissionDropdown[5],
      differentialRemarks: transmissionRemarks[5],
      bearingPhoto: transmissionBase64[6],
      bearingStatus: transmissionSwitch[6],
      bearingCondition: transmissionDropdown[6],
      bearingRemarks: transmissionRemarks[6],
      mountingPhoto: transmissionBase64[7],
      mountingStatus: transmissionSwitch[7],
      mountingCondition: transmissionDropdown[7],
      mountingRemarks: transmissionRemarks[7],
      smokePhoto: engineBase64[0],
      smokeStatus: engineSwitch[0],
      smokeCondition: engineDropdown[0],
      smokeRemarks: engineRemarks[0],
      turboPhoto: engineBase64[1],
      turboStatus: engineSwitch[1],
      turboCondition: engineDropdown[1],
      turboRemarks: engineRemarks[1],
      misfiringPhoto: engineBase64[2],
      misfiringStatus: engineSwitch[2],
      misfiringCondition: engineDropdown[2],
      misfiringRemarks: engineRemarks[2],
      tappetPhoto: engineBase64[3],
      tappetStatus: engineSwitch[3],
      tappetCondition: engineDropdown[3],
      tappetRemarks: engineRemarks[3],
      knockingPhoto: engineBase64[4],
      knockingStatus: engineSwitch[4],
      knockingCondition: engineDropdown[4],
      knockingRemarks: engineRemarks[4],
      exhaustPhoto: engineBase64[5],
      exhaustStatus: engineSwitch[5],
      exhaustCondition: engineDropdown[5],
      exhaustRemarks: engineRemarks[5],
      beltsPhoto: engineBase64[6],
      beltsStatus: engineSwitch[6],
      beltsCondition: engineDropdown[6],
      beltsRemarks: engineRemarks[6],
      tensionerPhoto: engineBase64[7],
      tensionerStatus: engineSwitch[7],
      tensionerCondition: engineDropdown[7],
      tensionerRemarks: engineRemarks[7],
      mountingPhoto: engineBase64[8],
      mountingStatus: engineSwitch[8],
      mountingCondition: engineDropdown[8],
      mountingRemarks: engineRemarks[8],
      fuelPumpPhoto: engineBase64[9],
      fuelPumpStatus: engineSwitch[9],
      fuelPumpCondition: engineDropdown[9],
      fuelPumpRemarks: engineRemarks[9],
      highPressurePumpPhoto: engineBase64[10],
      highPressurePumpStatus: engineSwitch[10],
      highPressurePumpCondition: engineDropdown[10],
      highPressurePumpRemarks: engineRemarks[10],
      commonrailPhoto: engineBase64[11],
      commonrailStatus: engineSwitch[11],
      commonrailCondition: engineDropdown[11],
      commonrailRemarks: engineRemarks[11],
      injectorPhoto: engineBase64[12],
      injectorStatus: engineSwitch[12],
      injectorCondition: engineDropdown[12],
      injectorRemarks: engineRemarks[12],
      fuelTankPhoto: engineBase64[13],
      fuelTankStatus: engineSwitch[13],
      fuelTankCondition: engineDropdown[13],
      fuelTankRemarks: engineRemarks[13],
      hosePhoto: engineBase64[14],
      hoseStatus: engineSwitch[14],
      hoseCondition: engineDropdown[14],
      hoseRemarks: engineRemarks[14],
      radiatorPhoto: engineBase64[15],
      radiatorStatus: engineSwitch[15],
      radiatorCondition: engineDropdown[15],
      radiatorRemarks: engineRemarks[15],
      fanPhoto: engineBase64[16],
      fanStatus: engineSwitch[16],
      fanCondition: engineDropdown[16],
      fanRemarks: engineRemarks[16],
      overHeatingPhoto: engineBase64[17],
      overHeatingStatus: engineSwitch[17],
      overHeatingCondition: engineDropdown[17],
      overHeatingRemarks: engineRemarks[17],
      allBearingsPhoto: engineBase64[18],
      allBearingsStatus: engineSwitch[18],
      allBearingsCondition: engineDropdown[18],
      allBearingsRemarks: engineRemarks[18],
      batteryPhoto: electricalBase64[0],
      batteryStatus: electricalSwitch[0],
      batteryCondition: electricalDropdown[0],
      batteryRemarks: electricalRemarks[0],
      alternatorPhoto: electricalBase64[1],
      alternatorStatus: electricalSwitch[1],
      alternatorCondition: electricalDropdown[1],
      alternatorRemarks: electricalRemarks[1],
      selfMotorPhoto: electricalBase64[2],
      selfMotorStatus: electricalSwitch[2],
      selfMotorCondition: electricalDropdown[2],
      selfMotorRemarks: electricalRemarks[2],
      wiringHarnessPhoto: electricalBase64[3],
      wiringHarnessStatus: electricalSwitch[3],
      wiringHarnessCondition: electricalDropdown[3],
      wiringHarnessRemarks: electricalRemarks[3],
      ecmPhoto: electricalBase64[4],
      ecmStatus: electricalSwitch[4],
      ecmCondition: electricalDropdown[4],
      ecmRemarks: electricalRemarks[4],
      allSensorsPhoto: electricalBase64[5],
      allSensorsStatus: electricalSwitch[5],
      allSensorsCondition: electricalDropdown[5],
      allSensorsRemarks: electricalRemarks[5],
      wiperMotorPhoto: electricalBase64[6],
      wiperMotorStatus: electricalSwitch[6],
      wiperMotorCondition: electricalDropdown[6],
      wiperMotorRemarks: electricalRemarks[6],
      clusterPhoto: electricalBase64[7],
      clusterStatus: electricalSwitch[7],
      clusterCondition: electricalDropdown[7],
      clusterRemarks: electricalRemarks[7],
      headLightsAndDrlPhoto: electricalBase64[8],
      headLightsAndDrlStatus: electricalSwitch[8],
      headLightsAndDrlCondition: electricalDropdown[8],
      headLightsAndDrlRemarks: electricalRemarks[8],
      tailLightPhoto: electricalBase64[9],
      tailLightStatus: electricalSwitch[9],
      tailLightCondition: electricalDropdown[9],
      tailLightRemarks: electricalRemarks[9],
      cabinLightPhoto: electricalBase64[10],
      cabinLightStatus: electricalSwitch[10],
      cabinLightCondition: electricalDropdown[10],
      cabinLightRemarks: electricalRemarks[10],
      combinationSwitchPhoto: electricalBase64[11],
      combinationSwitchStatus: electricalSwitch[11],
      combinationSwitchCondition: electricalDropdown[11],
      combinationSwitchRemarks: electricalRemarks[11],
      absPhoto: electricalBase64[12],
      absStatus: electricalSwitch[12],
      absCondition: electricalDropdown[12],
      absRemarks: electricalRemarks[12],
      airBagPhoto: electricalBase64[13],
      airBagStatus: electricalSwitch[13],
      airBagCondition: electricalDropdown[13],
      airBagRemarks: electricalRemarks[13],
      powerWindowsPhoto: electricalBase64[14],
      powerWindowsStatus: electricalSwitch[14],
      powerWindowsCondition: electricalDropdown[14],
      powerWindowsRemarks: electricalRemarks[14],
      coolingPhoto: acBase64[0],
      coolingStatus: acSwitch[0],
      coolingCondition: acDropdown[0],
      coolingRemarks: acRemarks[0],
      blowerCondenserPhoto: acBase64[1],
      blowerCondenserStatus: acSwitch[1],
      blowerCondenserCondition: acDropdown[1],
      blowerCondenserRemarks: acRemarks[1],
      fanPhoto: acBase64[2],
      fanStatus: acSwitch[2],
      fanCondition: acDropdown[2],
      fanRemarks: acRemarks[2],
      controlSwitchPhoto: acBase64[3],
      controlSwitchStatus: acSwitch[3],
      controlSwitchCondition: acDropdown[3],
      controlSwitchRemarks: acRemarks[3],
      ventPhoto: acBase64[4],
      ventStatus: acSwitch[4],
      ventCondition: acDropdown[4],
      ventRemarks: acRemarks[4],
      musicSystemPhoto: accessoriesBase64[0],
      musicSystemStatus: accessoriesSwitch[0],
      musicSystemCondition: accessoriesDropdown[0],
      musicSystemRemarks: accessoriesRemarks[0],
      parkingSensorPhoto: accessoriesBase64[1],
      parkingSensorStatus: accessoriesSwitch[1],
      parkingSensorCondition: accessoriesDropdown[1],
      parkingSensorRemarks: accessoriesRemarks[1],
      reverseCameraPhoto: accessoriesBase64[2],
      reverseCameraStatus: accessoriesSwitch[2],
      reverseCameraCondition: accessoriesDropdown[2],
      reverseCameraRemarks: accessoriesRemarks[2],
      ovrmAdjusterPhoto: accessoriesBase64[3],
      ovrmAdjusterStatus: accessoriesSwitch[3],
      ovrmAdjusterCondition: accessoriesDropdown[3],
      ovrmAdjusterRemarks: accessoriesRemarks[3],
      seatHeightAdjusterPhoto: accessoriesBase64[4],
      seatHeightAdjusterStatus: accessoriesSwitch[4],
      seatHeightAdjusterCondition: accessoriesDropdown[4],
      seatHeightAdjusterRemarks: accessoriesRemarks[4],
      seatBeltPhoto: accessoriesBase64[5],
      seatBeltStatus: accessoriesSwitch[5],
      seatBeltCondition: accessoriesDropdown[5],
      seatBeltRemarks: accessoriesRemarks[5],
      sunRoofPhoto: accessoriesBase64[6],
      sunRoofStatus: accessoriesSwitch[6],
      sunRoofCondition: accessoriesDropdown[6],
      sunRoofRemarks: accessoriesRemarks[6],
      roofRailPhoto: accessoriesBase64[7],
      roofRailStatus: accessoriesSwitch[7],
      roofRailCondition: accessoriesDropdown[7],
      roofRailRemarks: accessoriesRemarks[7],
      spoilerPhoto: accessoriesBase64[8],
      spoilerStatus: accessoriesSwitch[8],
      spoilerCondition: accessoriesDropdown[8],
      spoilerRemarks: accessoriesRemarks[8],
      skirtPhoto: accessoriesBase64[9],
      skirtStatus: accessoriesSwitch[9],
      skirtCondition: accessoriesDropdown[9],
      skirtRemarks: accessoriesRemarks[9],
      steeringControlsPhoto: accessoriesBase64[10],
      steeringControlsStatus: accessoriesSwitch[10],
      steeringControlsCondition: accessoriesDropdown[10],
      steeringControlsRemarks: accessoriesRemarks[10],
      roadTestRemarks: roadTestRemarks,
    };

    params = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== ''),
    );

    try {
      const data = await apiPostWithToken('updateOrder', params);

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
    return `${((currentIndex + 1) / (role === 'Reinspector' ? 8 : 7)) * 100}%`;
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

  const openCameraReinspector = () => {
    launchCamera({mediaType: 'photo', cameraType: 'back'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...reinspectorPhoto];
        newPhotoUris[carIndex8] = response.assets[0].uri;

        setReinspectorPhoto(newPhotoUris);

        // Resize and compress the image with quality set to 10
        ImageResizer.createResizedImage(
          response.assets[0].uri,
          800,  // Increase width
          600,  // Increase height
          'JPEG',
          90,   // Increase quality
        ) // Quality set to 10
          .then(resizedImage => {
            RNFS.readFile(resizedImage.uri, 'base64')
              .then(base64 => {
                const imageType = getImageType(base64);
                if (imageType) {
                  const base64Image = `data:image/${imageType};base64,${base64}`;
                  const newBase64Strings = [...base64ReinspectorPhoto];
                  newBase64Strings[carIndex8] = base64Image;
                  // Display first 15 characters of the new Base64 string
                  setBase64ReinspectorPhoto(newBase64Strings);
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

  const openCameraCarPhotos = () => {
    launchCamera({mediaType: 'photo', cameraType: 'back'}, response => {
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
    launchCamera({mediaType: 'photo', cameraType: 'back'}, response => {
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

  const openCamera5 = index => {
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
          800,  // Increase width
          600,  // Increase height
          'JPEG',
          90,   // Increase quality
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

    launchCamera({mediaType: 'photo', cameraType: 'back'}, response => {
      switch (carDetailsIndex) {
        case 0:
          if (id) {
            const newBase64Strings = [...lhsViewPhotoBoolean];
            newBase64Strings[index] = true;
            setLhsViewPhotoBoolean(newBase64Strings);
          }
          handleCameraResponse(
            response,
            lhsViewPhoto,
            lhsViewBase64,
            setLhsViewPhoto,
            setLhsViewBase64,
          );
          break;
        case 1:
          if (id) {
            // Create a copy of the current state of rearViewPhotoBoolean
            const newBase64Strings = [...rearViewPhotoBoolean];

            // Update the state at the specified index
            newBase64Strings[index] = true; // Assuming true means "Yes" and false means "No"

            // Update the state with the new values
            setRearViewPhotoBoolean(newBase64Strings);
          }

          handleCameraResponse(
            response,
            rearViewPhoto,
            rearViewBase64,
            setRearViewPhoto,
            setRearViewBase64,
          );
          break;
        case 2:
          if (id) {
            // Create a copy of the current state of trunkBootPhotoBoolean
            const newBase64Strings = [...trunkBootPhotoBoolean];

            // Update the state at the specified index
            newBase64Strings[index] = true; // Assuming true means "Yes" and false means "No"

            // Update the state with the new values
            setTrunkBootPhotoBoolean(newBase64Strings);
          }

          handleCameraResponse(
            response,
            trunkBootPhoto,
            trunkBootBase64,
            setTrunkBootPhoto,
            setTrunkBootBase64,
          );
          break;
        case 3:
          if (id) {
            // Create a copy of the current state of spareWheelPunchPhotoBoolean
            const newBase64Strings = [...spareWheelPunchPhotoBoolean];

            // Update the state at the specified index
            newBase64Strings[index] = true; // Assuming true means "Yes" and false means "No"

            // Update the state with the new values
            setSpareWheelPunchPhotoBoolean(newBase64Strings);
          }

          handleCameraResponse(
            response,
            spareWheelPunchPhoto,
            spareWheelBase64,
            setSpareWheelPunchPhoto,
            setSpareWheelBase64,
          );
          break;
        case 4:
          if (id) {
            // Create a copy of the current state of toolKitPunchPhotoBoolean
            const newBase64Strings = [...toolKitPunchPhotoBoolean];

            // Update the state at the specified index
            newBase64Strings[index] = true; // Assuming true means "Yes" and false means "No"

            // Update the state with the new values
            setToolkitPunchPhotoBoolean(newBase64Strings);
          }

          handleCameraResponse(
            response,
            toolKitPunchPhoto,
            toolKitBase64,
            setToolkitPunchPhoto,
            setToolkitBase64,
          );
          break;
        case 5:
          if (id) {
            // Create a copy of the current state of roofPhotoBoolean
            const newBase64Strings = [...roofPhotoBoolean];

            // Update the state at the specified index
            newBase64Strings[index] = true; // Assuming true means "Yes" and false means "No"

            // Update the state with the new values
            setRoofPhotoBoolean(newBase64Strings);
          }

          handleCameraResponse(
            response,
            roofPhoto,
            roofBase64,
            setRoofPhoto,
            setRoofBase64,
          );
          break;
        case 6:
          if (id) {
            // Create a copy of the current state of underChassisPhotoBoolean
            const newBase64Strings = [...underChassisPhotoBoolean];

            // Update the state at the specified index
            newBase64Strings[index] = true; // Assuming true means "Yes" and false means "No"

            // Update the state with the new values
            setUnderChassisPhotoBoolean(newBase64Strings);
          }

          handleCameraResponse(
            response,
            underChassisPhoto,
            underChassisBase64,
            setUnderChassisPhoto,
            setUnderChassisBase64,
          );
          break;
        case 7:
          if (id) {
            // Create a copy of the current state of tyrePunchPhotoBoolean
            const newBase64Strings = [...tyrePunchPhotoBoolean];

            // Update the state at the specified index
            newBase64Strings[index] = true; // Assuming true means "Yes" and false means "No"

            // Update the state with the new values
            setTyrePunchPhotoBoolean(newBase64Strings);
          }

          handleCameraResponse(
            response,
            tyrePunchPhoto,
            tyreBase64,
            setTyrePunchPhoto,
            setTyreBase64,
          );
          break;
        default:
          console.log('Invalid inspection index');
          isCameraOpen.current = false;
      }
    });
  };

  const openCamera4 = index => {
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
          800,  // Increase width
          600,  // Increase height
          'JPEG',
            90,   // Increase quality
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

    launchCamera({mediaType: 'photo', cameraType: 'back'}, response => {
      switch (selectedContainerIndex1) {
        case 0:
          if (id) {
            const updatePhoto = [...frontViewPhotoBoolean];
            updatePhoto[index] = true;
            setFrontViewPhotoBoolean(updatePhoto);
          }

          handleCameraResponse(
            response,
            frontViewPhoto,
            frontViewBase64,
            setFrontViewPhoto,
            setFrontViewBase64,
          );
          break;
        case 1:
          if (id) {
            const updatePhoto = [...engineRoomPhotoBoolean];
            updatePhoto[index] = true;
            setEngineRoomPhotoBoolean(updatePhoto);
          }

          handleCameraResponse(
            response,
            engineRoomPhoto,
            engineRoomBase64,
            setEngineRoomPhoto,
            setEngineRoomBase64,
          );
          break;
        case 2:
          if (id) {
            const updatePhoto = [...chassisPunchPhotoBoolean];
            updatePhoto[index] = true;
            setChassisPunchPhotoBoolean(updatePhoto);
          }
          handleCameraResponse(
            response,
            chassisPunchPhoto,
            chassisBase64,
            setChassisPunchPhoto,
            setChassisBase64,
          );
          break;
        case 3:
          if (id) {
            const updatePhoto = [...vinPlatePunchPhotoBoolean];
            updatePhoto[index] = true;
            setVinPlatePunchPhotoBoolean(updatePhoto);
          }

          handleCameraResponse(
            response,
            vinPlatePunchPhoto,
            vinPlateBase64,
            setVinPlatePunchPhoto,
            setVinPlateBase64,
          );
          break;
        case 4:
          if (id) {
            const updatePhoto = [...rhsViewPhotoBoolean];
            updatePhoto[index] = true;
            setRhsViewPhotoBoolean(updatePhoto);
          }

          handleCameraResponse(
            response,
            rhsViewPhoto,
            rhsViewBase64,
            setRhsViewPhoto,
            setRhsViewBase64,
          );
          break;
        case 5:
          if (id) {
            const updatePhoto = [...keyPunchPhotoBoolean];
            updatePhoto[index] = true;
            setKeyPunchPhotoBoolean(updatePhoto);
          }

          handleCameraResponse(
            response,
            keyPunchPhoto,
            keyBase64,
            setKeyPunchPhoto,
            setKeyBase64,
          );
          break;
        case 6:
          if (id) {
            const updatePhoto = [...odometerPhotoBoolean];
            updatePhoto[index] = true;
            setOdometerPhotoBoolean(updatePhoto);
          }

          handleCameraResponse(
            response,
            odometerPhoto,
            odometerBase64,
            setOdometerPhoto,
            setOdometerBase64,
          );
          break;
        case 7:
          if (id) {
            const updatePhoto = [...interiorPhotoBoolean];
            updatePhoto[index] = true;
            setInteriorPhotoBoolean(updatePhoto);
          }

          handleCameraResponse(
            response,
            interiorPhoto,
            interiorBase64,
            setInteriorPhoto,
            setInteriorBase64,
          );
          break;
        default:
          console.log('Invalid inspection index');
          isCameraOpen.current = false;
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
          800,  // Increase width
          600,  // Increase height
          'JPEG',
          90,   // Increase quality
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

    launchCamera({mediaType: 'photo', cameraType: 'back'}, response => {
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
            setBrake64,
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

  const openCamaraForCarDocuments = index => {
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
          800,  // Increase width
          600,  // Increase height
          'JPEG',
          90,   // Increase quality
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

    launchCamera({mediaType: 'photo', cameraType: 'back'}, response => {
      switch (selectedContainerIndex) {
        case 0:
          if (id) {
            const updatePhoto = [...rcPhotoBoolean];
            updatePhoto[index] = true;
            setRcPhotoBoolean(updatePhoto);
          }
          handleCameraResponse(
            response,
            rcPhoto,
            rcBase64,
            setRcPhoto,
            setRcBase64,
          );

          //    markFieldAsUpdated('rcBase64');
          break;
        case 1:
          if (id) {
            const updatePhoto = [...insurancePhotoBoolean];
            updatePhoto[index] = true;
            setInsuracePhotoBoolean(updatePhoto);
          }
          handleCameraResponse(
            response,
            insurancePhoto,
            insuranceBase64,
            setInsuracePhoto,
            setInsuraceBase64,
          );
          break;
        case 2:
          if (id) {
            const updatePhoto = [...nocPhotoBoolean];
            updatePhoto[index] = true;
            setNOCPhotoBoolean(updatePhoto);
          }
          handleCameraResponse(
            response,
            nocPhoto,
            nocBase64,
            setNOCPhoto,
            setNOCBase64,
          );
          break;

        default:
          console.log('Invalid inspection index');
          isCameraOpen.current = false;
      }
    });
  };

  const openCameraForBodyInspection = index => {
    console.log(index, 'INDEX IS THERE.......');
    console.log(
      selectedBodyInspectionIndex,
      'SELECTED BODY INDEX IS THERE.......',
    );
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
          800,  // Increase width
          600,  // Increase height
          'JPEG',
          90,   // Increase quality
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

    launchCamera({mediaType: 'photo', cameraType: 'back'}, response => {
      switch (selectedBodyInspectionIndex) {
        case 0:
          handleCameraResponse(
            response,
            bonetPhoto,
            bonetBase64,
            setBonetPhoto,
            setBonetBase64,
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
            supportMembersPhoto,
            supportMembersBase64,
            setSupportMembersPhoto,
            setSupportMembersBase64,
          );
          break;
        case 3:
          handleCameraResponse(
            response,
            bumperPhoto,
            bumperBase64,
            setBumperPhoto,
            setBumperBase64,
          );
          break;
        case 4:
          handleCameraResponse(
            response,
            windShieldPhoto,
            windShieldBase64,
            setWindShieldPhoto,
            setWindShieldBase64,
          );
          break;
        case 5:
          handleCameraResponse(
            response,
            fenderPhoto,
            fennderBase64,
            setFendersPhoto,
            setFenderBase64,
          );
          break;
        case 6:
          handleCameraResponse(
            response,
            pillarsPhoto,
            pillarBase64,
            setPillarsPhoto,
            setPillarBase64,
          );
          break;
        case 7:
          handleCameraResponse(
            response,
            doorPhoto,
            doorBase64,
            setDoorPhoto,
            setDoorBase64,
          );
          break;
        case 8:
          handleCameraResponse(
            response,
            runningBoardPhoto,
            runningBoardBase64,
            setRunningBoardPhoto,
            setRunningBoardBase64,
          );
          break;
        case 9:
          handleCameraResponse(
            response,
            quarterPanlesPhoto,
            quarterPanlesBase64,
            setQuarterPanlesPhoto,
            setQuarterPanlesBase64,
          );
          break;
        case 10:
          handleCameraResponse(
            response,
            dickyDoorPhoto,
            dickyDoorBase64,
            setDickyDoorPhoto,
            setDickyDoorBase64,
          );
          break;
        case 11:
          handleCameraResponse(
            response,
            dickySkirtPhoto,
            dickySkirtBase64,
            setDickySkirtPhoto,
            setDickySkirtBase64,
          );
          break;
        case 12:
          handleCameraResponse(
            response,
            wheelTypePhoto,
            wheelTypeBase64,
            setWheelTypePhoto,
            setWheelTypeBase64,
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

    launchCamera({mediaType: 'photo', cameraType: 'back'}, response => {
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
    const isPhotoArrayComplete = (arr, mandatoryIndices) =>
      mandatoryIndices.every(index => arr[index] !== '');

    console.log(
      selectedContainerIndex,
      rcPhoto.length,
      'give additional referecene',
    );
    if (
      selectedContainerIndex === 0 &&
      !isPhotoArrayComplete(rcPhoto, [0, 1])
    ) {
      ToastAndroid.show(
        'RC Front Photo and RC Back Photo are mandatory.',
        ToastAndroid.SHORT,
      );
      return;
    }
    if (
      selectedContainerIndex === 1 &&
      !isPhotoArrayComplete(insurancePhoto, [0, 1])
    ) {
      ToastAndroid.show(
        'Page 1 and Page 2 of Insurance are mandatory.',
        ToastAndroid.SHORT,
      );
      return;
    }
    if (selectedContainerIndex === 2 && !isPhotoArrayComplete(nocPhoto, [0])) {
      ToastAndroid.show('NOC Photo is mandatory.', ToastAndroid.SHORT);
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
    if (!validateCarDetails4()) {
      ToastAndroid.show('All the fields are mandatory', ToastAndroid.SHORT);
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

  const handleOkReinspector = () => {
    if (!reinspectorPhoto[carIndex8]) {
      ToastAndroid.show('Photos fields are required', ToastAndroid.SHORT);
      return;
    }
    const newValidations = [...reinspectorValidation];
    // Assume validatePhotoAndRemarks is a function that returns true if both photo and remarks are valid
    newValidations[carIndex8] = validatePhotoAndRemarks(carIndex8);
    setReinspectorValidation(newValidations);

    setReinspectorPage(false);
  };

  const validateMechanicalInspectionFields = () => {
    switch (selectedInspectionIndex) {
      case 0:
        for (let i = 0; i < suspensionSwitch.length; i++) {
          console.log(suspensionSwitch[i], 'jjjjjj');
          // Check if the value is not "Rahim" and if the switch value is 2 or not set
          if (
            (suspensionSwitch[i] === 2 || !suspensionSwitch[i]) &&
            suspensionDropdown[i] !== 'Not Available' &&
            (!suspensionPhoto[i] || !suspensionDropdown[i])
          ) {
            return false;
          }
        }
        return true;

      case 1:
        for (let i = 0; i < steeringSwitch.length; i++) {
          console.log(steeringSwitch[i], 'asaasa');
          if (
            (steeringSwitch[i] === 2 || !steeringSwitch[i]) &&
            (!steeringPhoto[i] || !steeringDropdown[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 2:
        for (let i = 0; i < brakeSwitch.length; i++) {
          console.log(brakeSwitch[i], 'jjjjjj');
          if (
            (brakeSwitch[i] === 2 || !brakeSwitch[i]) &&
            (!brakePhoto[i] || !brakeDropdown[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 3:
        for (let i = 0; i < transmissionSwitch.length; i++) {
          console.log(transmissionSwitch[i], 'jjjjjj');
          // Check if the value is not "Rahim" and if the switch value is 2 or not set
          if (
            (transmissionSwitch[i] === 2 || !transmissionSwitch[i]) &&
            transmissionDropdown[i] !== 'Not Available' &&
            (!transmissionPhoto[i] || !transmissionDropdown[i])
          ) {
            return false;
          }
        }
        return true;

      case 4:
        for (let i = 0; i < engineSwitch.length; i++) {
          console.log(engineSwitch[i], 'jjjjjj');
          // Check if the value is not "Rahim" and if the switch value is 2 or not set
          if (
            (engineSwitch[i] === 2 || !engineSwitch[i]) &&
            engineDropdown[i] !== 'Not Available' &&
            (!enginePhoto[i] || !engineDropdown[i])
          ) {
            return false;
          }
        }
        return true;

      case 5:
        for (let i = 0; i < electricalSwitch.length; i++) {
          console.log(electricalSwitch[i], 'jjjjjj');
          // Check if the value is not "Rahim" and if the switch value is 2 or not set
          if (
            (electricalSwitch[i] === 2 || !electricalSwitch[i]) &&
            electricalDropdown[i] !== 'Not Available' &&
            (!electricalPhoto[i] || !electricalDropdown[i])
          ) {
            return false;
          }
        }
        return true;

      case 6:
        for (let i = 0; i < acSwitch.length; i++) {
          console.log(acSwitch[i], 'jjjjjj');
          if (
            (acSwitch[i] === 2 || !acSwitch[i]) &&
            (!acPhoto[i] || !acDropdown[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 7:
        for (let i = 0; i < accessoriesSwitch.length; i++) {
          console.log(accessoriesSwitch[i], 'jjjjjj');
          // Check if the value is not "Rahim" and if the switch value is 2 or not set
          if (
            (accessoriesSwitch[i] === 2 || !accessoriesSwitch[i]) &&
            accessoriesDropdown[i] !== 'Not Available' &&
            (!accessoriesPhoto[i] || !accessoriesDropdown[i])
          ) {
            return false;
          }
        }
        return true;

      case 8:
        for (let i = 0; i < oliSwitch.length; i++) {
          if ((oliSwitch[i] === 2 || oliSwitch[i] === '') && !oilDropDown[i]) {
            return false;
          }
        }
        return true;
        break;

      default:
        return true; // Return true for other indexes not explicitly handled
    }
  };

  const handleInspectionOkPress = () => {
    if (!validateMechanicalInspectionFields()) {
      ToastAndroid.show(
        'All the fields are mandatory when the switch is on.',
        ToastAndroid.SHORT,
      );
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

  const validateBodyInspectionFields = () => {
    switch (selectedBodyInspectionIndex) {
      case 0:
        for (let i = 0; i < bonetSwitch.length; i++) {
          console.log(bonetSwitch[i], 'jjjjjj');
          if (
            (bonetSwitch[i] === 2 || !bonetSwitch[i]) &&
            (!bonetPhoto[i] || !bonetCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 1:
        for (let i = 0; i < apronSwitch.length; i++) {
          console.log(apronSwitch[i], 'jjjjjj');
          if (
            (apronSwitch[i] === 2 || !apronSwitch[i]) &&
            (!apronPhoto[i] || !apronCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 2:
        for (let i = 0; i < supportMembersSwitch.length; i++) {
          console.log(supportMembersSwitch[i], 'jjjjjj');
          if (
            (supportMembersSwitch[i] === 2 || !supportMembersSwitch[i]) &&
            (!supportMembersPhoto[i] || !supportMembersCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 3:
        for (let i = 0; i < bumperSwitch.length; i++) {
          if (
            (bumperSwitch[i] === 2 || !bumperSwitch[i]) &&
            (!bumperPhoto[i] || !bumperCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 4:
        for (let i = 0; i < windShieldSwitch.length; i++) {
          console.log(windShieldSwitch[i], 'jjjjjj');
          if (
            (windShieldSwitch[i] === 2 || !windShieldSwitch[i]) &&
            (!windShieldPhoto[i] || !windShieldCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 5:
        for (let i = 0; i < fenderSwitch.length; i++) {
          console.log(fenderSwitch[i], 'jjjjjj');
          if (
            (fenderSwitch[i] === 2 || !fenderSwitch[i]) &&
            (!fenderPhoto[i] || !fenderCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 6:
        for (let i = 0; i < pillarSwitch.length; i++) {
          console.log(pillarSwitch[i], 'jjjjjj');
          if (
            (pillarSwitch[i] === 2 || !pillarSwitch[i]) &&
            (!pillarsPhoto[i] || !pillarsCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 7:
        for (let i = 0; i < doorSwitch.length; i++) {
          console.log(doorSwitch[i], 'jjjjjj');
          if (
            (doorSwitch[i] === 2 || !doorSwitch[i]) &&
            (!doorPhoto[i] || !doorCondition[i])
          ) {
            return false;
          }
        }
      
        return true;
        break;

      case 8:
        for (let i = 0; i < runningBoardSwitch.length; i++) {
          console.log(runningBoardSwitch[i], 'jjjjjj');
          if (
            (runningBoardSwitch[i] === 2 || !runningBoardSwitch[i]) &&
            (!runningBoardPhoto[i] || !runnningBoardCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 9:
        for (let i = 0; i < quarterPanlesSwitch.length; i++) {
          console.log(quarterPanlesSwitch[i], 'jjjjjj');
          if (
            (quarterPanlesSwitch[i] === 2 || !quarterPanlesSwitch[i]) &&
            (!quarterPanlesPhoto[i] || !quarterPanlesCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 10:
        for (let i = 0; i < dickyDoorSwitch.length; i++) {
          console.log(dickyDoorSwitch[i], 'jjjjjj');
          if (
            (dickyDoorSwitch[i] === 2 || !dickyDoorSwitch[i]) &&
            (!dickyDoorPhoto[i] || !dickyDoorCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 11:
        for (let i = 0; i < dickySkirtSwitch.length; i++) {
          console.log(dickySkirtSwitch[i], 'jjjjjj');
          if (
            (dickySkirtSwitch[i] === 2 || !dickySkirtSwitch[i]) &&
            (!dickySkirtPhoto[i] || !dickySkirtCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 12:
        for (let i = 0; i < wheelTypeSwitch.length; i++) {
          if (
            (wheelTypeSwitch[i] === 2 || !wheelTypeSwitch[i]) &&
            (!wheelTypePhoto[i] || !wheelTypeCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      default:
        return true; // Return true for other indexes not explicitly handled
    }
  };

  const handleBodyInspectionOkPress = () => {
    if (!validateBodyInspectionFields()) {
      ToastAndroid.show('All the fields are mandatory', ToastAndroid.SHORT);
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

  const validateCarDetailsFields = () => {
    switch (carDetailsIndex) {
      case 0:
        for (let i = 0; i < lhsViewPhoto.length; i++) {
          if (!lhsViewPhoto[i]) {
            return false;
          }
        }
        return true;
        break;

      case 1:
        for (let i = 0; i < rearViewPhoto.length; i++) {
          if (!rearViewPhoto[i]) {
            return false;
          }
        }
        return true;
        break;

      case 2:
        for (let i = 0; i < trunkBootPhoto.length; i++) {
          if (!trunkBootPhoto[i]) {
            return false;
          }
        }
        return true;
        break;

      case 3:
        for (let i = 0; i < spareWheelSwitch.length; i++) {
          if (
            (spareWheelSwitch[i] === 2 || !spareWheelSwitch[i]) &&
            (!spareWheelPunchPhoto[i] || spareWheel[i] == 0.0)
          ) {
            return false;
          }
        }
        return true;
        break;

      case 4:
        for (let i = 0; i < toolKitSwitch.length; i++) {
          if (
            (toolKitSwitch[i] === 2 || !toolKitSwitch[i]) &&
            (!toolKitPunchPhoto[i] || !toolKitCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 5:
        for (let i = 0; i < roofPhoto.length; i++) {
          if (!roofPhoto[i]) {
            return false;
          }
        }
        return true;
        break;

      case 6:
        for (let i = 0; i < underChassisPhoto.length; i++) {
          if (!underChassisPhoto[i]) {
            return false;
          }
        }
        return true;
        break;

      case 7:
        for (let i = 0; i < tyreSwitch.length; i++) {
          // Check if tyreSwitch[i] is 1 or 2
          if (tyreSwitch[i] === 1 || tyreSwitch[i] === 2 || !tyreSwitch[i]) {
            // Ensure values[i] is present and not 0.0
            if (!values[i] || values[i] === 0.0) {
              return false;
            }
          }
        }
        return true;
        break;

      default:
        return true; // Return true for other indexes not explicitly handled
    }
  };

  const validateCarDetails4 = () => {
    switch (selectedContainerIndex1) {
      case 0:
        for (let i = 0; i < frontViewPhoto.length; i++) {
          if (!frontViewPhoto[i]) {
            return false;
          }
        }

        return true;
        break;

      case 1:
        for (let i = 0; i < engineRoomPhoto.length; i++) {
          if (!engineRoomPhoto[i]) {
            return false;
          }
        }

        return true;
        break;

      case 2:
        for (let i = 0; i < chassisSwitch.length; i++) {
          // If chassisSwitch[i] is 2, conditions are mandatory
          if (chassisSwitch[i] === 2) {
            if (!chassisPunchPhoto[i] || !chassisCondition[i]) {
              return false;
            }
          }
          // If chassisSwitch[i] is 1, conditions are not mandatory
          else if (chassisSwitch[i] === 1) {
            continue;
          }
          // If chassisSwitch[i] is not 1 or 2, handle accordingly (optional)
          else {
            if (!chassisPunchPhoto[i] || !chassisCondition[i]) {
              return false;
            }
          }
        }
        return true;
        break;

      case 3:
        for (let i = 0; i < vinPlateSwitch.length; i++) {
          // If chassisSwitch[i] is 2, conditions are mandatory
          if (vinPlateSwitch[i] === 2) {
            if (!vinPlatePunchPhoto[i] || !vinPlateCondition[i]) {
              return false;
            }
          }
          // If chassisSwitch[i] is 1, conditions are not mandatory
          else if (vinPlateSwitch[i] === 1) {
            continue;
          }
          // If chassisSwitch[i] is not 1 or 2, handle accordingly (optional)
          else {
            if (!vinPlatePunchPhoto[i] || !vinPlateCondition[i]) {
              return false;
            }
          }
        }
        return true;

      case 4:
        for (let i = 0; i < rhsViewPhoto.length; i++) {
          if (!rhsViewPhoto[i]) {
            return false;
          }
        }

        return true;
        break;

      case 5:
        for (let i = 0; i < keySwitch.length; i++) {
          if (
            (keySwitch[i] === 2 || !keySwitch[i]) &&
            (!keyPunchPhoto[i] || !keyCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 6:
        for (let i = 0; i < odometerPhoto.length; i++) {
          if (!odometerPhoto[i]) {
            return false;
          }
        }

        return true;
        break;

      case 7:
        for (let i = 0; i < interiorPhoto.length; i++) {
          if (!interiorPhoto[i]) {
            return false;
          }
        }

        return true;
        break;

      default:
        return true; // Return true for other indexes not explicitly handled
    }
  };

  const handleCarDetailsOkPress = () => {
    if (!validateCarDetailsFields()) {
      ToastAndroid.show('All the fields are mandatory', ToastAndroid.SHORT);
      return;
    }
    setCarDetailsInspection(false);
    const newValidations = [...carValidation];
    // Assume validatePhotoAndRemarks is a function that returns true if both photo and remarks are valid
    newValidations[carDetailsIndex] = validatePhotoAndRemarks(carDetailsIndex);
    //setCa(newValidations);
    setCarDetailsValidation(newValidations);
  };

  // const handleCarDetails4 = () => {
  //   if (!validateCarDetails4()) {
  //     ToastAndroid.show(
  //       'All the fields are mandatory when the switch is on.',
  //       ToastAndroid.SHORT,
  //     );
  //     return;
  //   }
  //   setCarDetailsInspection(false);
  //   const newValidations = [...carValidation];
  //   // Assume validatePhotoAndRemarks is a function that returns true if both photo and remarks are valid
  //   newValidations[carDetailsIndex] = validatePhotoAndRemarks(carDetailsIndex);
  //   //setCa(newValidations);
  //   setCarDetailsValidation(newValidations);
  // };

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

  const handleCloseReinspectorPhotos = index => {
    const newPhotoUris = [...reinspectorPhoto];
    newPhotoUris[index] = null;
    // const newRemarks = [...carPhotosRemarks];
    // newRemarks[index] = '';
    setReinspectorPhoto(newPhotoUris);

    //  setCarPhotoRemarks(newRemarks);
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

  const handleCarDocumentsClosePress = index => {
    let newPhotoUris;

    switch (selectedContainerIndex) {
      case 0:
        newPhotoUris = [...rcPhoto];
        newPhotoUris[index] = null;
        setRcPhoto(newPhotoUris);
        break;
      case 1:
        newPhotoUris = [...insurancePhoto];
        newPhotoUris[index] = null;
        setInsuracePhoto(newPhotoUris);
        break;
      case 2:
        newPhotoUris = [...nocPhoto];
        newPhotoUris[index] = null;
        setNOCPhoto(newPhotoUris);
        break;

      default:
        console.log('Invalid inspection index');
        break;
    }
  };

  const handleCamera4 = index => {
    let newPhotoUris;

    switch (selectedContainerIndex1) {
      case 0:
        newPhotoUris = [...frontViewPhoto];
        newPhotoUris[index] = null;
        setFrontViewPhoto(newPhotoUris);
        break;
      case 1:
        newPhotoUris = [...engineRoomPhoto];
        newPhotoUris[index] = null;
        setEngineRoomPhoto(newPhotoUris);
        break;
      case 2:
        newPhotoUris = [...chassisPunchPhoto];
        newPhotoUris[index] = null;
        setChassisPunchPhoto(newPhotoUris);
        break;
      case 3:
        newPhotoUris = [...vinPlatePunchPhoto];
        newPhotoUris[index] = null;
        setVinPlatePunchPhoto(newPhotoUris);
        break;
      case 4:
        newPhotoUris = [...rhsViewPhoto];
        newPhotoUris[index] = null;
        setRhsViewPhoto(newPhotoUris);
        break;
      case 5:
        newPhotoUris = [...keyPunchPhoto];
        newPhotoUris[index] = null;
        setKeyPunchPhoto(newPhotoUris);
        break;
      case 6:
        newPhotoUris = [...odometerPhoto];
        newPhotoUris[index] = null;
        setOdometerPhoto(newPhotoUris);
        break;
      case 7:
        newPhotoUris = [...interiorPhoto];
        newPhotoUris[index] = null;
        setInteriorPhoto(newPhotoUris);
        break;
    }
  };

  const handleCamera5 = index => {
    let newPhotoUris;

    switch (carDetailsIndex) {
      case 0:
        newPhotoUris = [...lhsViewPhoto];
        newPhotoUris[index] = null;
        setLhsViewPhoto(newPhotoUris);

        break;
      case 1:
        newPhotoUris = [...rearViewPhoto];
        newPhotoUris[index] = null;
        setRearViewPhoto(newPhotoUris);
        break;
      case 2:
        newPhotoUris = [...trunkBootPhoto];
        newPhotoUris[index] = null;
        setTrunkBootPhoto(newPhotoUris);
        break;
      case 3:
        newPhotoUris = [...spareWheelPunchPhoto];
        newPhotoUris[index] = null;
        setSpareWheelPunchPhoto(newPhotoUris);
        break;
      case 4:
        newPhotoUris = [...toolKitPunchPhoto];
        newPhotoUris[index] = null;
        setToolkitPunchPhoto(newPhotoUris);
        break;
      case 5:
        newPhotoUris = [...roofPhoto];
        newPhotoUris[index] = null;
        setRoofPhoto(newPhotoUris);
        break;
      case 6:
        newPhotoUris = [...underChassisPhoto];
        newPhotoUris[index] = null;
        setUnderChassisPhoto(newPhotoUris);
        break;
      case 7:
        newPhotoUris = [...tyrePunchPhoto];
        newPhotoUris[index] = null;
        setTyrePunchPhoto(newPhotoUris);
        break;
    }
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
        newPhotoUris = [...bonetPhoto];
        newPhotoUris[index] = null;
        setBonetPhoto(newPhotoUris);
        break;
      case 1:
        newPhotoUris = [...apronPhoto];
        newPhotoUris[index] = null;
        setApronPhoto(newPhotoUris);
        break;
      case 2:
        newPhotoUris = [...supportMembersPhoto];
        newPhotoUris[index] = null;
        setSupportMembersPhoto(newPhotoUris);
        break;
      case 3:
        newPhotoUris = [...bumperPhoto];
        newPhotoUris[index] = null;
        setBumperPhoto(newPhotoUris);
        break;
      case 4:
        newPhotoUris = [...windShieldPhoto];
        newPhotoUris[index] = null;
        setWindShieldPhoto(newPhotoUris);
        break;
      case 5:
        newPhotoUris = [...fenderPhoto];
        newPhotoUris[index] = null;
        setFendersPhoto(newPhotoUris);
        break;
      case 6:
        newPhotoUris = [...pillarsPhoto];
        newPhotoUris[index] = null;
        setPillarsPhoto(newPhotoUris);
        break;
      case 7:
        newPhotoUris = [...doorPhoto];
        newPhotoUris[index] = null;
        setDoorPhoto(newPhotoUris);
        break;
      case 8:
        newPhotoUris = [...runningBoardPhoto];
        newPhotoUris[index] = null;
        setRunningBoardPhoto(newPhotoUris);
        break;
      case 9:
        newPhotoUris = [...quarterPanlesPhoto];
        newPhotoUris[index] = null;
        setQuarterPanlesPhoto(newPhotoUris);
        break;
      case 10:
        newPhotoUris = [...dickyDoorPhoto];
        newPhotoUris[index] = null;
        setDickyDoorPhoto(newPhotoUris);
        break;
      case 11:
        newPhotoUris = [...dickySkirtPhoto];
        newPhotoUris[index] = null;
        setDickySkirtPhoto(newPhotoUris);
        break;
      case 12:
        newPhotoUris = [...wheelTypePhoto];
        newPhotoUris[index] = null;
        setWheelTypePhoto(newPhotoUris);
        break;
      default:
        console.log('Invalid inspection index');
        break;
    }
  };
  const carDetailsClosePress = index => {
    let newPhotoUris;

    switch (carDetailsIndex) {
      case 0:
        newPhotoUris = [...chassisPunchPhoto];
        newPhotoUris[index] = null;
        setChassisPunchPhoto(newPhotoUris);
        break;
      case 1:
        newPhotoUris = [...vinPlatePunchPhoto];
        newPhotoUris[index] = null;
        setVinPlatePunchPhoto(newPhotoUris);
        break;
      case 2:
        newPhotoUris = [...tyrePunchPhoto];
        newPhotoUris[index] = null;
        setTyrePunchPhoto(newPhotoUris);
        break;
      case 3:
        newPhotoUris = [...spareWheelPunchPhoto];
        newPhotoUris[index] = null;
        setSpareWheelPunchPhoto(newPhotoUris);
        break;
      case 4:
        newPhotoUris = [...toolKitPunchPhoto];
        newPhotoUris[index] = null;
        setToolkitPunchPhoto(newPhotoUris);
        break;
      case 5:
        newPhotoUris = [...keyPunchPhoto];
        newPhotoUris[index] = null;
        setKeyPunchPhoto(newPhotoUris);
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

  const handleCarPhotosForLastPage = index => {
    setCarIndex8(index);
    setReinspectorPage(true);
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

  const handleReinspectorRemarks = (text, index) => {
    const newRemarks = [...reinspectorRemarks];
    newRemarks[index] = text;
    setReinspectorRemarks(newRemarks);
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
        newRemarks = [...oilRemarks];
        newRemarks[index] = text;
        setOilRemarks(newRemarks);
        break;
      case 9:
        setRoadTestRemarks(text);
        break;
      default:
        console.log('Invalid inspection index');
        break;
    }
  };

  const handleRemarks4 = (text, index) => {
    let newRemarks;

    switch (selectedContainerIndex1) {
      case 0:
        if (id) {
          const updatePhoto = [...frontViewRemarksBoolean];
          updatePhoto[index] = true;
          setFrontViewRemarksBoolean(updatePhoto);
        }

        newRemarks = [...frontViewRemarks];
        newRemarks[index] = text;
        setFrontViewRemarks(newRemarks);
        break;
      case 1:
        if (id) {
          const updatePhoto = [...engineRoomRemarksBoolean];
          updatePhoto[index] = true;
          setFrontViewRemarksBoolean(updatePhoto);
        }
        newRemarks = [...engineRoomRemarks];
        newRemarks[index] = text;
        setEngineRoomRemarks(newRemarks);
        break;
      case 2:
        if (id) {
          const newRemarks = [...chassisRemarksBoolean];
          newRemarks[index] = true;
          setChassisRemarksBoolean(newRemarks);
        }
        newRemarks = [...chassisRemarks];
        newRemarks[index] = text;
        setChassisRemarks(newRemarks);
        break;
      case 3:
        if (id) {
          const newRemarks = [...vinPlateRemarksBoolean];
          newRemarks[index] = true;
          setVinPlateRemarksBoolean(newRemarks);
        }

        newRemarks = [...vinPlateRemarks];
        newRemarks[index] = text;
        setVinPlateRemarks(newRemarks);
        break;
      case 4:
        if (id) {
          const newRemarks = [...rhsViewRemarksBoolean];
          newRemarks[index] = true;
          setRhsViewRemarksBoolean(newRemarks);
        }
        newRemarks = [...rhsViewRemarks];
        newRemarks[index] = text;
        setRhsViewRemarks(newRemarks);
        break;
      case 5:
        if (id) {
          const newRemarks = [...keyRemarksBoolean];
          newRemarks[index] = true;
          setKeyRemarksBoolean(newRemarks);
        }
        newRemarks = [...keyRemarks];
        newRemarks[index] = text;
        setKeyRemarks(newRemarks);
        break;
      case 6:
        if (id) {
          const newRemarks = [...odometerRemarksBoolean];
          newRemarks[index] = true; // Set the boolean value to true
          setOdometerRemarksBoolean(newRemarks);
        }
        newRemarks = [...odometerRemarks];
        newRemarks[index] = text;
        setOdometerRemarks(newRemarks);
        break;
      case 7:
        if (id) {
          const newRemarks = [...interiorRemarksBoolean];
          newRemarks[index] = true; // Set the boolean value to true
          setInteriorRemarksBoolean(newRemarks);
        }
        newRemarks = [...interiorRemarks];
        newRemarks[index] = text;
        setInteriorRemarks(newRemarks);
        break;

      default:
        console.log('Invalid inspection index');
        break;
    }
  };

  const handleRemarks5 = (text, index) => {
    let newRemarks;

    switch (carDetailsIndex) {
      case 0:
        if (id) {
          newRemarks = [...lhsViewRemarksBoolean];
          newRemarks[index] = true;
          setLhsViewRemarksBoolean(newRemarks);
        }
        newRemarks = [...lhsViewRemarks];
        newRemarks[index] = text;
        setLhsViewRemarks(newRemarks);
        break;
      case 1:
        if (id) {
          // Create a copy of the current state of rearViewRemarksBoolean
          const newRemarks = [...rearViewRemarksBoolean];

          // Update the state at the specified index
          newRemarks[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new values
          setRearViewRemarksBoolean(newRemarks);
        }

        newRemarks = [...rearViewRemarks];
        newRemarks[index] = text;
        setRearViewRemarks(newRemarks);
        break;
      case 2:
        if (id) {
          // Create a copy of the current state of trunkBootRemarksBoolean
          const newRemarks = [...trunkBootRemarksBoolean];

          // Update the state at the specified index
          newRemarks[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new values
          setTrunkBootRemarksBoolean(newRemarks);
        }

        newRemarks = [...trunkBootRemarks];
        newRemarks[index] = text;
        setTrunkBootRemarks(newRemarks);
        break;
      case 3:
        if (id) {
          // Create a copy of the current state of spareWheelRemarksBoolean
          const newRemarks = [...spareWheelRemarksBoolean];

          // Update the state at the specified index
          newRemarks[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new values
          setSpareWheelRemarksBoolean(newRemarks);
        }

        newRemarks = [...spareWheelRemarks];
        newRemarks[index] = text;
        setSpareWheelRemarks(newRemarks);
        break;
      case 4:
        if (id) {
          // Create a copy of the current state of toolKitRemarksBoolean
          const newRemarks = [...toolKitRemarksBoolean];

          // Update the state at the specified index
          newRemarks[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new values
          setToolkitRemarksBoolean(newRemarks);
        }

        newRemarks = [...toolKitRemarks];
        newRemarks[index] = text;
        setToolkitRemarks(newRemarks);
        break;
      case 5:
        if (id) {
          // Create a copy of the current state of roofRemarksBoolean
          const newRemarks = [...roofRemarksBoolean];

          // Update the state at the specified index
          newRemarks[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new values
          setRoofRemarksBoolean(newRemarks);
        }

        newRemarks = [...roofRemarks];
        newRemarks[index] = text;
        setRoofRemarks(newRemarks);
        break;
      case 6:
        if (id) {
          // Create a copy of the current state of underChassisRemarksBoolean
          const newRemarks = [...underChassisRemarksBoolean];

          // Update the state at the specified index
          newRemarks[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new values
          setUnderChassisRemarksBoolean(newRemarks);
        }

        newRemarks = [...underChassisRemarks];
        newRemarks[index] = text;
        setUnderChassisRemarks(newRemarks);
        break;
      case 7:
        if (id) {
          // Create a copy of the current state of tyreRemarksBoolean
          const newRemarks = [...tyreRemarksBoolean];

          // Update the state at the specified index
          newRemarks[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new values
          setTyreRemarksBoolean(newRemarks);
        }

        newRemarks = [...tyreRemarks];
        newRemarks[index] = text;
        setTyreRemarks(newRemarks);
        break;

      default:
        console.log('Invalid inspection index');
        break;
    }
  };
  const handleBodyInspectionRemarks = (text, index) => {
    let newRemarks;

    console.log(index, text, selectedBodyInspectionIndex, 'INDEX ISTHERE....');
    console.log(selectedBodyInspectionIndex, 'SDSDDD');
    switch (selectedBodyInspectionIndex) {
      case 0:
        if (id) {
          newRemarks = [...bonetRemarksBoolean];
          newRemarks[index] = true;
          setBonetRemarksBoolean(newRemarks);
        }
        newRemarks = [...bonetRemarks];
        newRemarks[index] = text;
        setBonetRemarks(newRemarks);
        break;
      case 1:
        if (id) {
          // Create a copy of the current state of apronRemarksBoolean
          const newRemarks = [...apronRemarksBoolean];

          // Update the state at the specified index
          newRemarks[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new values
          setApronRemarksBoolean(newRemarks);
        }

        newRemarks = [...apronRemarks];
        newRemarks[index] = text;
        setApronRemarks(newRemarks);
        break;
      case 2:
        if (id) {
          // Create a copy of the current state of supportMembersRemarksBoolean
          const newRemarks = [...supportMembersRemarksBoolean];

          // Update the state at the specified index
          newRemarks[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new values
          setSupportMembersRemarksBoolean(newRemarks);
        }

        newRemarks = [...supportMembersRemarks];
        newRemarks[index] = text;
        setSupportMembersRemarks(newRemarks);
        break;
      case 3:
        if (id) {
          // Create a copy of the current state of bumperRemarksBoolean
          const newRemarks = [...bumperRemarksBoolean];

          // Update the state at the specified index
          newRemarks[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new values
          setBumperRemarksBoolean(newRemarks);
        }

        newRemarks = [...bumperRemarks];
        newRemarks[index] = text;
        setBumperRemarks(newRemarks);
        break;
      case 4:
        if (id) {
          // Create a copy of the current state of windShieldRemarksBoolean
          const newRemarks = [...windShieldRemarksBoolean];

          // Update the state at the specified index
          newRemarks[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new values
          setWindShieldRemarksBoolean(newRemarks);
        }

        newRemarks = [...windShieldRemarks];
        newRemarks[index] = text;
        setWindShieldRemarks(newRemarks);
        break;
      case 5:
        if (id) {
          // Create a copy of the current state of fenderRemarksBoolean
          const newRemarks = [...fenderRemarksBoolean];

          // Update the state at the specified index
          newRemarks[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new values
          setFenderRemarksBoolean(newRemarks);
        }

        newRemarks = [...fenderRemarks];
        newRemarks[index] = text;
        setFenderRemarks(newRemarks);
        break;
      case 6:
        if (id) {
          // Create a copy of the current state of pillarsPhotoRemarksBoolean
          const newRemarks = [...pillarsPhotoRemarksBoolean];

          // Update the state at the specified index
          newRemarks[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new values
          setPillarsPhotoRemarksBoolean(newRemarks);
        }

        newRemarks = [...pillarsPhotoRemarks];
        newRemarks[index] = text;
        setPillarsPhotoRemarks(newRemarks);
        break;
      case 7:
        if (id) {
          // Create a copy of the current state of doorRemarksBoolean
          const newRemarks = [...doorRemarksBoolean];

          // Update the state at the specified index
          newRemarks[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new values
          setDoorRemarksBoolean(newRemarks);
        }

        newRemarks = [...doorRemarks];
        newRemarks[index] = text;
        setDoorRemarks(newRemarks);
        break;
      case 8:
        if (id) {
          // Create a copy of the current state of runningBoardRemarksBoolean
          const newRemarks = [...runningBoardRemarksBoolean];

          // Update the state at the specified index
          newRemarks[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new values
          setRunningBoardRemarksBoolean(newRemarks);
        }

        newRemarks = [...runningBoardRemarks];
        newRemarks[index] = text;
        setRunningBoardRemarks(newRemarks);
        break;

      case 9:
        newRemarks = [...quarterPanlesRemarks];
        newRemarks[index] = text;
        setQuarterPanlesRemarks(newRemarks);
        break;
      case 10:
        newRemarks = [...dickyDoorRemarks];
        newRemarks[index] = text;
        setDickyDoorRemarks(newRemarks);
        break;
      case 11:
        newRemarks = [...dickySkirtRemarks];
        newRemarks[index] = text;
        setDickySkirtRemarks(newRemarks);
        break;
      case 12:
        newRemarks = [...wheelTypeRemarks];
        newRemarks[index] = text;
        setWheelTypeRemarks(newRemarks);
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
      case 8:
        newSelectedValues = [...oilDropDown];
        newSelectedValues[index] = value;
        setOilDropDown(newSelectedValues);
        break;
      default:
        console.log('Invalid inspection index');
        break;
    }
  };

  const handleBodyInspectionDropDown = (value, index) => {
    let newSelectedValues;

    console.log(index, 'INDEX OS THERE.......');
    console.log(selectedBodyInspectionIndex, 'selected body index');

    switch (selectedBodyInspectionIndex) {
      case 0:
        newSelectedValues = [...bonetCondition];
        newSelectedValues[index] = value;
        setBonetCondition(newSelectedValues);
        break;
      case 1:
        newSelectedValues = [...apronCondition];
        newSelectedValues[index] = value;
        setApronCondition(newSelectedValues);
        break;
      case 2:
        newSelectedValues = [...supportMembersCondition];
        newSelectedValues[index] = value;
        setSupportMembersCondition(newSelectedValues);
        break;
      case 3:
        newSelectedValues = [...bumperCondition];
        newSelectedValues[index] = value;
        setBumperCondition(newSelectedValues);
        break;
      case 4:
        newSelectedValues = [...windShieldCondition];
        newSelectedValues[index] = value;
        setWindShieldCondition(newSelectedValues);
        break;
      case 5:
        newSelectedValues = [...fenderCondition];
        newSelectedValues[index] = value;
        setFenderCondition(newSelectedValues);
        break;
      case 6:
        newSelectedValues = [...pillarsCondition];
        newSelectedValues[index] = value;
        setPillarsCondition(newSelectedValues);
        break;
      case 7:
        newSelectedValues = [...doorCondition];
        newSelectedValues[index] = value;
        setDoorCondition(newSelectedValues);
        break;
      case 8:
        newSelectedValues = [...runnningBoardCondition];
        newSelectedValues[index] = value;
        setRunningBoardCondition(newSelectedValues);
        break;
      case 9:
        newSelectedValues = [...quarterPanlesCondition];
        newSelectedValues[index] = value;
        setQuarterPanlesCondition(newSelectedValues);
        break;
      case 10:
        newSelectedValues = [...dickyDoorCondition];
        newSelectedValues[index] = value;
        setDickyDoorCondition(newSelectedValues);
        break;
      case 11:
        newSelectedValues = [...dickySkirtCondition];
        newSelectedValues[index] = value;
        setDickySkirtCondition(newSelectedValues);
        break;
      case 12:
        newSelectedValues = [...wheelTypeCondition];
        newSelectedValues[index] = value;
        setWheelTypeCondition(newSelectedValues);
        break;
      default:
        console.log('Invalid inspection index');
        break;
    }
  };
  const handleDropDown5 = (value, index) => {
    let newSelectedValues;

    switch (carDetailsIndex) {
      case 3:
        newSelectedValues = [...spareWheelCondition];
        newSelectedValues[index] = value;
        setSpareWheelCondition(newSelectedValues);
        break;
      case 4:
        if (id) {
          newSelectedValues = [...toolKitConditionBoolean];
          newSelectedValues[index] = true;
          setToolkitConditionBoolean(newSelectedValues);
        }
        newSelectedValues = [...toolKitCondition];
        newSelectedValues[index] = value;
        setToolkitCondition(newSelectedValues);
        break;

      case 7:
        newSelectedValues = [...tyreCondition];
        newSelectedValues[index] = value;
        setTyreCondition(newSelectedValues);
        break;

      default:
        console.log('Invalid inspection index');
        break;
    }
  };

  const handleDropDown4 = (value, index) => {
    let newSelectedValues;

    switch (selectedContainerIndex1) {
      case 2:
        if (id) {
          newSelectedValues = [...chassisConditionBoolean];
          newSelectedValues[index] = true;
          setChasisConditionBoolean(newSelectedValues);
        }
        newSelectedValues = [...chassisCondition];
        newSelectedValues[index] = value;
        setChasisCondition(newSelectedValues);
        break;
      case 3:
        if (id) {
          newSelectedValues = [...vinPlateConditionBoolean];
          newSelectedValues[index] = true;
          setVinPlateConditionBoolean(newSelectedValues);
        }
        newSelectedValues = [...vinPlateCondition];
        newSelectedValues[index] = value;
        setVinPlateCondition(newSelectedValues);
        break;

      case 5:
        if (id) {
          newSelectedValues = [...keyConditionBoolean];
          newSelectedValues[index] = true;
          setKeyConditionBoolean(newSelectedValues);
        }
        newSelectedValues = [...keyCondition];
        newSelectedValues[index] = value;
        setKeyCondition(newSelectedValues);
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
        if (id) {
          newState = [...suspensionSwitchBoolean];
          newState[index] = true; // 1 for Yes and 2 for No
          setSuspensionSwitchBoolean(newState);
        }
        newState = [...suspensionSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setSuspensionSwitch(newState);
        break;
      case 1:
        if (id) {
          newState = [...steeringSwitchBoolean];
          newState[index] = true; // 1 for Yes and 2 for No
          setSteeringSwitchBoolean(newState);
        }

        newState = [...steeringSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setSteeringSwitch(newState);
        break;
      case 2:
        if (id) {
          newState = [...brakeSwitchBoolean];
          newState[index] = true; // 1 for Yes and 2 for No
          setBrakeSwitchBoolean(newState);
        }

        newState = [...brakeSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setBrakeSwitch(newState);
        break;
      case 3:
        if (id) {
          newState = [...transmissionSwitchBoolean];
          newState[index] = true; // 1 for Yes and 2 for No
          setTransmissionSwitchBoolean(newState);
        }

        newState = [...transmissionSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setTransmissionSwitch(newState);

        console.log(newState,"new.............");
        break;
      case 4:
        if (id) {
          // Create a copy of the current state of engineSwitchBoolean
          newState = [...engineSwitchBoolean];

          // Update the switch state at the specified index
          newState[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new switch values
          setEngineSwitchBoolean(newState);
        }

        newState = [...engineSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setEngineSwitch(newState);
        break;
      case 5:
        if (id) {
          // Create a copy of the current state of electricalSwitchBoolean
          const newState = [...electricalSwitchBoolean];

          // Update the switch state at the specified index
          newState[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new switch values
          setElectricalSwitchBoolean(newState);
        }

        newState = [...electricalSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setElectricalSwitch(newState);
        break;
      case 6:
        if (id) {
          // Create a copy of the current state of acSwitchBoolean
          const newState = [...acSwitchBoolean];

          // Update the switch state at the specified index
          newState[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new switch values
          setAcSwitchBoolean(newState);
        }

        newState = [...acSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setAcSwitch(newState);
        break;
      case 7:
        if (id) {
          // Create a copy of the current state of accessoriesSwitchBoolean
          const newState = [...accessoriesSwitchBoolean];

          // Update the switch state at the specified index
          newState[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new switch values
          setAccessoriesSwitchBoolean(newState);
        }

        newState = [...accessoriesSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setAccessoriesSwitch(newState);
        break;
      case 8:
        if (id) {
          // Create a copy of the current state of oilSwitchBoolean
          const newState = [...oliSwitchBoolean];

          // Update the switch state at the specified index
          newState[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new switch values
          setOliSwitchBoolean(newState);
        }

        newState = [...oliSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setoilSwitch(newState);
        break;
      default:
        console.log('Invalid inspection index');
        break;
    }
  };

  const handleBodyInspectionChanngeWheelType = (index, value) => {
    let newState;
    newState = [...selectWheelTypeSwitch];
    newState[index] = value; // 1 for Yes and 2 for No
    setSelectWheelTypeSwitch(newState);
  };

  // const checkSwitch=switchState=>{
  //   if()

  // }

  const handleBodyInspectionChannge = (index, value) => {
    let newState;

    console.log(
      index,
      value,
      selectedBodyInspectionIndex,
      'HI THERE..............',
    );
    switch (selectedBodyInspectionIndex) {
      case 0:
        if (id) {
          // Create a copy of the current state of bonnetSwitchBoolean
          const newState = [...bonetSwitchBoolean];

          // Update the switch state at the specified index
          newState[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new switch values
          setBonetSwitchBoolean(newState);
        }

        newState = [...bonetSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setBonetSwitch(newState);
        // checkSwitch(newState);
        break;
      case 1:
        if (id) {
          // Create a copy of the current state of apronSwitchBoolean
          const newState = [...apronSwitchBoolean];

          // Update the switch state at the specified index
          newState[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new switch values
          setApronSwitchBoolean(newState);
        }

        newState = [...apronSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setApronSwitch(newState);
        break;
      case 2:
        if (id) {
          // Create a copy of the current state of supportMemberSwitchBoolean
          const newState = [...supportMembersSwitchBoolean];

          // Update the switch state at the specified index
          newState[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new switch values
          setSupportMembersSwitchBoolean(newState);
        }

        newState = [...supportMembersSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setSupportMembersSwitch(newState);
        break;
      case 3:
        if (id) {
          // Create a copy of the current state of bumperSwitchBoolean
          const newState = [...bumperSwitchBoolean];

          // Update the switch state at the specified index
          newState[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new switch values
          setBumperSwitchBoolean(newState);
        }

        newState = [...bumperSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setBumperSwitch(newState);
        break;
      case 4:
        if (id) {
          // Create a copy of the current state of windShieldSwitchBoolean
          const newState = [...windShieldSwitchBoolean];

          // Update the switch state at the specified index
          newState[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new switch values
          setWindShieldSwitchBoolean(newState);
        }

        newState = [...windShieldSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setWindShieldSwitch(newState);
        break;
      case 5:
        if (id) {
          // Create a copy of the current state of fenderSwitchBoolean
          const newState = [...fenderSwitchBoolean];

          // Update the switch state at the specified index
          newState[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new switch values
          setFenderSwitchBoolean(newState);
        }

        newState = [...fenderSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setFenderSwitch(newState);
        break;
      case 6:
        if (id) {
          // Create a copy of the current state of pillarSwitchBoolean
          const newState = [...pillarSwitchBoolean];

          // Update the switch state at the specified index
          newState[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new switch values
          setPillarSwitchBoolean(newState);
        }

        newState = [...pillarSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setPillarSwitch(newState);
        break;
      case 7:
        if (id) {
          // Create a copy of the current state of doorSwitchBoolean
          const newState = [...doorSwitchBoolean];

          // Update the switch state at the specified index
          newState[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new switch values
          setDoorSwitchBoolean(newState);
        }

        newState = [...doorSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setDoorSwitch(newState);
        break;
      case 8:
        if (id) {
          // Create a copy of the current state of runningBoardBoolean
          const newState = [...runningBoardSwitchBoolean];

          // Update the switch state at the specified index
          newState[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new switch values
          setRunningBoardSwitchBoolean(newState);
        }

        newState = [...runningBoardSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setRunningBoardSwitch(newState);
        break;

      case 9:
        if (id) {
          // Create a copy of the current state of quarterPanelsSwitchBoolean
          const newState = [...quarterPanlesSwitchBoolean];

          // Update the switch state at the specified index
          newState[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new switch values
          setQuarterPanlesSwitchBoolean(newState);
        }

        newState = [...quarterPanlesSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setQuarterPanlesSwitch(newState);
        break;
      case 10:
        if (id) {
          // Create a copy of the current state of dickyDoorSwitchBoolean
          const newState = [...dickyDoorSwitchBoolean];

          // Update the switch state at the specified index
          newState[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new switch values
          setDickyDoorSwitchBoolean(newState);
        }

        newState = [...dickyDoorSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setDickyDoorSwitch(newState);
        break;
      case 11:
        if (id) {
          // Create a copy of the current state of dickySkirtSwitchBoolean
          const newState = [...dickySkirtSwitchBoolean];

          // Update the switch state at the specified index
          newState[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new switch values
          setDickySkirtSwitchBoolean(newState);
        }

        newState = [...dickySkirtSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setDickySkirtSwitch(newState);
        break;

      case 12:
        if (id) {
          // Create a copy of the current state of wheelTypeSwitchBoolean
          const newState = [...wheelTypeSwitchBoolean];

          // Update the switch state at the specified index
          newState[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new switch values
          setWheelTypeSwitchBoolean(newState);
        }

        newState = [...wheelTypeSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setWheelTypeSwitch(newState);
        break;
      default:
        console.log('Invalid inspection index');
        break;
    }
  };

  const handleSwitch4 = (index, value) => {
    let newState;

    switch (selectedContainerIndex1) {
      case 2:
        if (id) {
          newState = [...chassisSwitchBoolean];
          newState[index] = true; // 1 for Yes and 2 for No
          setChassisSwitchBoolean(newState);
        }
        newState = [...chassisSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setChassisSwitch(newState);
        break;
      case 3:
        // if(id) {
        //   newState = [...vinPlateSwitchBoolean];
        //   newState[index] = value; // 1 for Yes and 2 for No
        //   setVinPlateSwicthBoolean(newState);
        // }
        newState = [...vinPlateSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setVinPlateSwitch(newState);
        break;
      // case 2:
      //   newState = [...tyreSwitch];
      //   newState[index] = value; // 1 for Yes and 2 for No
      //   setTyreSwitch(newState);
      //   break;

      case 5:
        if (id) {
          newState = [...keySwitchBoolean];
          newState[index] = true; // 1 for Yes and 2 for No
          setKeySwitchBoolean(newState);
        }
        newState = [...keySwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setKeySwitch(newState);
        break;

      default:
        console.log('Invalid inspection index');
        break;
    }
  };

  const handleSwitch5 = (index, value) => {
    let newState;

    switch (carDetailsIndex) {
      case 3:
        if (id) {
          // Create a copy of the current state of spareWheelSwitchBoolean
          const newState = [...spareWheelSwitchBoolean];

          // Update the switch state at the specified index
          newState[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new switch values
          setSpareWheelSwitchBoolean(newState);
        }

        newState = [...spareWheelSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setSpareWheelSwitch(newState);
        break;
      case 4:
        if (id) {
          // Create a copy of the current state of toolKitSwitchBoolean
          const newState = [...toolKitSwitchBoolean];

          // Update the switch state at the specified index
          newState[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new switch values
          setToolkitSwitchBoolean(newState);
        }

        newState = [...toolKitSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setToolkitSwitch(newState);
        break;
      case 7:
        if (id) {
          // Create a copy of the current state of tyreSwitchBoolean
          const newState = [...tyreSwitchBoolean];

          // Update the switch state at the specified index
          newState[index] = true; // Assuming true means "Yes" and false means "No"

          // Update the state with the new switch values
          setTyreSwitchBoolean(newState);
        }

        newState = [...tyreSwitch];
        newState[index] = value; // 1 for Yes and 2 for No
        setTyreSwitch(newState);
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
    'Engine Room',
    'Chassis punch',
    'Vin Plate',
    'RHS View',
    'Key',
    'Odo Meter',
    'Interior',
    // 'Rear View',
    // 'LHS View',
    // 'Roof',
    // 'Under Chassis',
    // 'Engine Room',
    // 'Trunk Boot',
  ];

  const carPhotos8 = [
    'Front View',
    'Rear View',
    'LHS View',
    'RHS View',
    'Odo Meter',
    'Roof',
    'Interior',
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
    'Oil Level',
    'Road Test',
  ];

  const bodyInspection = [
    'Bonet',
    'Apron',
    'Support Members',
    'Bumper',
    'Windshield',
    'Fenders',
    'Pillars',
    'Doors',
    'Running Board',
    'Quater Panels',
    'Boot',
    'Boot Skirt',
    'Wheel Type',
  ];

  const carDetails = [
    'LHS View',
    'Rear View',
    'Trunk Boot',
    'Spare Wheel',
    'Tool Kit/Jack',
    'Roof',
    'Under Chassis',
    'Tyres',
  ];

  const [validations, setValidations] = useState(
    Array(photoTitles.length).fill(false),
  );

  const [carPhotovalidations, setCarPhotoValidations] = useState(
    Array(carPhotos.length).fill(false),
  );

  const [reinspectorValidation, setReinspectorValidation] = useState(
    Array(reinspectorList.length).fill(false),
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

  const remarksUpdates2 = [
    {setter: setBonetRemarks, index: 0, key: 'bonnetRemarks'},
    {setter: setApronRemarks, index: 0, key: 'apronLeftSideRemarks'},
    {setter: setApronRemarks, index: 1, key: 'apronRightSideRemarks'},
    {
      setter: setSupportMembersRemarks,
      index: 0,
      key: 'supportMemberUpperRemarks',
    },
    {
      setter: setSupportMembersRemarks,
      index: 1,
      key: 'supportMemberLowerRemarks',
    },

    {
      setter: setSupportMembersRemarks,
      index: 2,
      key: 'headLampSupportRightSideRemarks',
    },
    {
      setter: setSupportMembersRemarks,
      index: 3,
      key: 'headLampSupportLeftSideRemarks',
    },
    {setter: setBumperRemarks, index: 0, key: 'bumperFrontRemarks'},
    {setter: setBumperRemarks, index: 1, key: 'bumperRearRemarks'},
    {setter: setWindShieldRemarks, index: 0, key: 'windShieldFrontRemarks'},
    {setter: setWindShieldRemarks, index: 1, key: 'windShieldRearRemarks'},

    {setter: setFenderRemarks, index: 0, key: 'fendersLeftSideRemarks'},
    {setter: setFenderRemarks, index: 1, key: 'fendersRightSideRemarks'},
    {setter: setPillarsPhotoRemarks, index: 0, key: 'pillarARightSideRemarks'},
    {setter: setPillarsPhotoRemarks, index: 1, key: 'pillarBRightSideRemarks'},
    {setter: setPillarsPhotoRemarks, index: 2, key: 'pillarCRightSideRemarks'},
    {setter: setPillarsPhotoRemarks, index: 3, key: 'pillarALeftSideRemarks'},
    {setter: setPillarsPhotoRemarks, index: 4, key: 'pillarBLeftSideRemarks'},
    {setter: setPillarsPhotoRemarks, index: 5, key: 'pillarCLeftSideRemarks'},
    {setter: setDoorRemarks, index: 0, key: 'doorsFrontLeftSideRemarks'},
    {setter: setDoorRemarks, index: 1, key: 'doorsRearLeftSideRemarks'},
    {setter: setDoorRemarks, index: 2, key: 'doorsFrontRightSideRemarks'},
    {setter: setDoorRemarks, index: 3, key: 'doorsRearRightSideRemarks'},
    {
      setter: setRunningBoardRemarks,
      index: 1,
      key: 'runningBoardLeftSideRemarks',
    },
    {
      setter: setRunningBoardRemarks,
      index: 0,
      key: 'runningBoardRightSideRemarks',
    },

    {
      setter: setQuarterPanlesRemarks,
      index: 0,
      key: 'quarterPanelsLeftSideRemarks',
    },
    {
      setter: setQuarterPanlesRemarks,
      index: 1,
      key: 'quarterPanelsRightSideRemarks',
    },

    {setter: setDickyDoorRemarks, index: 0, key: 'bootRemarks'},
    {setter: setDickySkirtRemarks, index: 0, key: 'bootSkirtRemarks'},
    {setter: setWheelTypeRemarks, index: 0, key: 'wheelTypeRemarks'},
  ];

  const remarksUpdates1 = [
    {setter: setSpareWheelRemarks, index: 0, key: 'spareWheelRemarks'},
    {setter: setToolkitRemarks, index: 0, key: 'toolKitJackRemarks'},
    {setter: setKeyRemarks, index: 0, key: 'primaryKeyRemarks'},
    {setter: setKeyRemarks, index: 1, key: 'spareKeyRemarks'},
    {setter: setLhsViewRemarks, index: 0, key: 'lhsViewRemarks'},
    {setter: setRearViewRemarks, index: 0, key: 'rearViewRemarks'},
    {setter: setTrunkBootRemarks, index: 0, key: 'trunkBootRemarks'},
    {setter: setSpareWheelRemarks, index: 0, key: 'spareWheelRemarks'},
    {setter: setToolkitRemarks, index: 0, key: 'toolKitJackRemarks'},
    {setter: setRoofRemarks, index: 0, key: 'roofRemarks'},
    {setter: setUnderChassisRemarks, index: 0, key: 'underChassisRemarks'},
    {setter: setTyreRemarks, index: 0, key: 'frontTyreLeftRemarks'},
    {setter: setTyreRemarks, index: 1, key: 'frontTyreRightRemarks'},
    {setter: setTyreRemarks, index: 2, key: 'rearTyreLeftRemarks'},
    {setter: setTyreRemarks, index: 3, key: 'rearTyreRightRemarks'},
  ];

  const remarksUpdates = [
    {setter: setFrontViewRemarks, index: 0, key: 'frontViewRemarks'},

    {setter: setVinPlateRemarks, index: 0, key: 'vinPlateRemarks'},
    {setter: setChassisRemarks, index: 0, key: 'chassisPunchRemarks'},
    {setter: setVinPlateRemarks, index: 0, key: 'vinPlateRemarks'},
    {setter: setRhsViewRemarks, index: 0, key: 'rhsViewRemarks'},
    {setter: setKeyRemarks, index: 0, key: 'primaryKeyRemarks'},
    {setter: setKeyRemarks, index: 1, key: 'spareKeyRemarks'},
    {setter: setOdometerRemarks, index: 0, key: 'odometerRemarks'},
    {setter: setInteriorRemarks, index: 0, key: 'interiorRemarks'},
    // {setter: setSpareWheelRemarks, index: 0, key: 'spareWheelRemarks'},
    // {setter: setToolkitRemarks, index: 0, key: 'toolKitJackRemarks'},
    // {setter: setKeyRemarks, index: 0, key: 'primaryKeyRemarks'},
    // {setter: setKeyRemarks, index: 1, key: 'spareKeyRemarks'},
    // {setter: setLhsViewRemarks, index: 0, key: 'lhsViewRemarks'},
    // {setter: setRearViewRemarks, index: 0, key: 'rearViewRemarks'},
    // {setter: setTrunkBootRemarks, index: 0, key: 'trunkBootRemarks'},
    // {setter: setSpareWheelRemarks, index: 0, key: 'spareWheelRemarks'},
    // {setter: setToolkitRemarks, index: 0, key: 'toolKitJackRemarks'},
    // {setter: setRoofRemarks, index: 0, key: 'roofRemarks'},
    // {setter: setUnderChassisRemarks, index: 0, key: 'underChassisRemarks'},
    // {setter: setTyreRemarks, index: 0, key: 'frontTyreLeftRemarks'},
    // {setter: setTyreRemarks, index: 1, key: 'frontTyreRightRemarks'},
    // {setter: setTyreRemarks, index: 2, key: 'rearTyreLeftRemarks'},
    // {setter: setTyreRemarks, index: 3, key: 'rearTyreRightRemarks'},
    // {setter: setBonetRemarks, index: 0, key: 'bonnetRemarks'},
    // {setter: setApronRemarks, index: 0, key: 'apronLeftSideRemarks'},
    // {setter: setApronRemarks, index: 1, key: 'apronRightSideRemarks'},
    // {
    //   setter: setSupportMembersRemarks,
    //   index: 0,
    //   key: 'supportMemberUpperRemarks',
    // },
    // {
    //   setter: setSupportMembersRemarks,
    //   index: 1,
    //   key: 'supportMemberLowerRemarks',
    // },

    // {
    //   setter: setSupportMembersRemarks,
    //   index: 2,
    //   key: 'headLampSupportRightSideRemarks',
    // },
    // {
    //   setter: setSupportMembersRemarks,
    //   index: 3,
    //   key: 'headLampSupportLeftSideRemarks',
    // },
    // {setter: setBumperRemarks, index: 0, key: 'bumperFrontRemarks'},
    // {setter: setBumperRemarks, index: 1, key: 'bumperRearRemarks'},
    // {setter: setWindShieldRemarks, index: 0, key: 'windShieldFrontRemarks'},
    // {setter: setWindShieldRemarks, index: 1, key: 'windShieldRearRemarks'},

    // {setter: setFenderRemarks, index: 0, key: 'fendersLeftSideRemarks'},
    // {setter: setFenderRemarks, index: 1, key: 'fendersRightSideRemarks'},
    // {setter: setPillarsPhotoRemarks, index: 0, key: 'pillarARightSideRemarks'},
    // {setter: setPillarsPhotoRemarks, index: 1, key: 'pillarBRightSideRemarks'},
    // {setter: setPillarsPhotoRemarks, index: 2, key: 'pillarCRightSideRemarks'},
    // {setter: setPillarsPhotoRemarks, index: 3, key: 'pillarALeftSideRemarks'},
    // {setter: setPillarsPhotoRemarks, index: 4, key: 'pillarBLeftSideRemarks'},
    // {setter: setPillarsPhotoRemarks, index: 5, key: 'pillarCLeftSideRemarks'},
    // {setter: setDoorRemarks, index: 0, key: 'doorsFrontLeftSideRemarks'},
    // {setter: setDoorRemarks, index: 1, key: 'doorsRearLeftSideRemarks'},
    // {setter: setDoorRemarks, index: 2, key: 'doorsFrontRightSideRemarks'},
    // {setter: setDoorRemarks, index: 3, key: 'doorsRearRightSideRemarks'},
    // {
    //   setter: setRunningBoardRemarks,
    //   index: 1,
    //   key: 'runningBoardLeftSideRemarks',
    // },
    // {
    //   setter: setRunningBoardRemarks,
    //   index: 0,
    //   key: 'runningBoardRightSideRemarks',
    // },

    // {
    //   setter: setQuarterPanlesRemarks,
    //   index: 0,
    //   key: 'quarterPanelsLeftSideRemarks',
    // },
    // {
    //   setter: setQuarterPanlesRemarks,
    //   index: 1,
    //   key: 'quarterPanelsRightSideRemarks',
    // },

    // {setter: setDickyDoorRemarks, index: 0, key: 'bootRemarks'},
    // {setter: setDickySkirtRemarks, index: 0, key: 'bootSkirtRemarks'},
    // {setter: setWheelTypeRemarks, index: 0, key: 'wheelTypeRemarks'},
    // {setter: setSuspensionRemarks, index: 0, key: 'strutRemarks'},
    // {setter: setSuspensionRemarks, index: 1, key: 'lowerArmRemarks'},
    // {setter: setSuspensionRemarks, index: 2, key: 'linkRodRemarks'},
    // {setter: setSuspensionRemarks, index: 3, key: 'stabilizerBarRemarks'},
    // {setter: setSuspensionRemarks, index: 4, key: 'shockAbsorberRemarks'},
    // {setter: setSuspensionRemarks, index: 5, key: 'coilSpringRemarks'},
    // {setter: setSuspensionRemarks, index: 6, key: 'leafSpringRemarks'},
    // {setter: setSteeringRemarks, index: 0, key: 'rackAndPinionRemarks'},
    // {setter: setSteeringRemarks, index: 1, key: 'steeringColumnRemarks'},
    // {setter: setSteeringRemarks, index: 2, key: 'hardnessRemarks'},
    // {setter: setSteeringRemarks, index: 3, key: 'ballJointEndRemarks'},
    // {setter: setBrakeRemarks, index: 0, key: 'padRemarks'},
    // {setter: setBrakeRemarks, index: 1, key: 'discRemarks'},
    // {setter: setBrakeRemarks, index: 2, key: 'shoeRemarks'},
    // {setter: setBrakeRemarks, index: 3, key: 'drumRemarks'},
    // {setter: setBrakeRemarks, index: 4, key: 'wheelCylinderRemarks'},
    // {setter: setBrakeRemarks, index: 5, key: 'mcBoosterRemarks'},
    // {setter: setTransmissionRemarks, index: 0, key: 'clutchRemarks'},
    // {setter: setTransmissionRemarks, index: 1, key: 'gearShiftingRemarks'},
    // {setter: setTransmissionRemarks, index: 2, key: 'driveShaftRemarks'},
    // {setter: setTransmissionRemarks, index: 3, key: 'axleRemarks'},
    // {setter: setTransmissionRemarks, index: 4, key: 'propellerShaftRemarks'},
    // {setter: setTransmissionRemarks, index: 5, key: 'differentialRemarks'},
    // {setter: setTransmissionRemarks, index: 6, key: 'bearingRemarks'},
    // {setter: setTransmissionRemarks, index: 7, key: 'mountingRemarks'},
    // {setter: setEngineRemarks, index: 0, key: 'smokeRemarks'},
    // {setter: setEngineRemarks, index: 1, key: 'turboRemarks'},
    // {setter: setEngineRemarks, index: 2, key: 'misfiringRemarks'},
    // {setter: setEngineRemarks, index: 3, key: 'tappetRemarks'},
    // {setter: setEngineRemarks, index: 4, key: 'knockingRemarks'},
    // {setter: setEngineRemarks, index: 5, key: 'exhaustRemarks'},
    // {setter: setEngineRemarks, index: 6, key: 'beltsRemarks'},
    // {setter: setEngineRemarks, index: 7, key: 'tensionerRemarks'},
    // {setter: setEngineRemarks, index: 8, key: 'mountingRemarks'},
    // {setter: setEngineRemarks, index: 9, key: 'fuelPumpRemarks'},
    // {setter: setEngineRemarks, index: 10, key: 'highPressurePumpRemarks'},
    // {setter: setEngineRemarks, index: 11, key: 'commonrailRemarks'},
    // {setter: setEngineRemarks, index: 12, key: 'injectorRemarks'},
    // {setter: setEngineRemarks, index: 13, key: 'fuelTankRemarks'},
    // {setter: setEngineRemarks, index: 14, key: 'hoseRemarks'},
    // {setter: setEngineRemarks, index: 15, key: 'radiatorRemarks'},
    // {setter: setEngineRemarks, index: 16, key: 'fanRemarks'},
    // {setter: setEngineRemarks, index: 17, key: 'overHeatingRemarks'},
    // {setter: setEngineRemarks, index: 18, key: 'allBearingsRemarks'},
    // {setter: setElectricalRemarks, index: 0, key: 'batteryRemarks'},
    // {setter: setElectricalRemarks, index: 1, key: 'alternatorRemarks'},
    // {setter: setElectricalRemarks, index: 2, key: 'selfMotorRemarks'},
    // {setter: setElectricalRemarks, index: 3, key: 'wiringHarnessRemarks'},
    // {setter: setElectricalRemarks, index: 4, key: 'ecmRemarks'},
    // {setter: setElectricalRemarks, index: 5, key: 'allSensorsRemarks'},
    // {setter: setElectricalRemarks, index: 6, key: 'wiperMotorRemarks'},
    // {setter: setElectricalRemarks, index: 7, key: 'clusterRemarks'},
    // {setter: setElectricalRemarks, index: 8, key: 'headLightsAndDrlRemarks'},
    // {setter: setElectricalRemarks, index: 9, key: 'tailLightRemarks'},
    // {setter: setElectricalRemarks, index: 10, key: 'cabinLightRemarks'},
    // {setter: setElectricalRemarks, index: 11, key: 'combinationSwitchRemarks'},
    // {setter: setElectricalRemarks, index: 12, key: 'absRemarks'},
    // {setter: setElectricalRemarks, index: 13, key: 'airBagRemarks'},
    // {setter: setElectricalRemarks, index: 14, key: 'powerWindowsRemarks'},

    // {setter: setAcRemarks, index: 0, key: 'coolingRemarks'},
    // {setter: setAcRemarks, index: 1, key: 'blowerCondenserRemarks'},
    // {setter: setAcRemarks, index: 2, key: 'fanRemarks'},
    // {setter: setAcRemarks, index: 3, key: 'controlSwitchRemarks'},
    // {setter: setAcRemarks, index: 4, key: 'ventRemarks'},
    // {setter: setAccessoriesRemarks, index: 0, key: 'musicSystemRemarks'},
    // {setter: setAccessoriesRemarks, index: 1, key: 'parkingSensorRemarks'},
    // {setter: setAccessoriesRemarks, index: 2, key: 'reverseCameraRemarks'},
    // {setter: setAccessoriesRemarks, index: 3, key: 'ovrmAdjusterRemarks'},
    // {setter: setAccessoriesRemarks, index: 4, key: 'seatHeightAdjusterRemarks'},
    // {setter: setAccessoriesRemarks, index: 5, key: 'seatBeltRemarks'},
    // {setter: setAccessoriesRemarks, index: 6, key: 'sunRoofRemarks'},
    // {setter: setAccessoriesRemarks, index: 7, key: 'roofRailRemarks'},
    // {setter: setAccessoriesRemarks, index: 8, key: 'spoilerRemarks'},
    // {setter: setAccessoriesRemarks, index: 9, key: 'skirtRemarks'},
    // {setter: setAccessoriesRemarks, index: 10, key: 'steeringControlsRemarks'},
    // {setter: setReinspectorRemarks, index: 0, key: 'finalFrontViewRemarks'},
    // {setter: setReinspectorRemarks, index: 1, key: 'finalRearViewRemarks'},
    // {setter: setReinspectorRemarks, index: 2, key: 'finalLhsViewRemarks'},
    // {setter: setReinspectorRemarks, index: 3, key: 'finalRhsViewRemarks'},
    // {setter: setReinspectorRemarks, index: 4, key: 'finalOdometerRemarks'},
    // {setter: setReinspectorRemarks, index: 5, key: 'finalRoofRemarks'},
    // {setter: setReinspectorRemarks, index: 6, key: 'finalInteriorRemarks'},
  ];

  const conditionUpdate2 = [
    {setter: setBonetCondition, index: 0, key: 'bonnetCondition'},
    {setter: setApronCondition, index: 0, key: 'apronLeftSideCondition'},
    {setter: setApronCondition, index: 1, key: 'apronRightSideCondition'},
    {
      setter: setSupportMembersCondition,
      index: 0,
      key: 'supportMemberUpperCondition',
    },
    {
      setter: setSupportMembersCondition,
      index: 1,
      key: 'supportMemberLowerCondition',
    },
    {
      setter: setSupportMembersCondition,
      index: 2,
      key: 'headLampSupportRightSideCondition',
    },
    {
      setter: setSupportMembersCondition,
      index: 3,
      key: 'headLampSupportLeftSideCondition',
    },

    {setter: setBumperCondition, index: 0, key: 'bumperFrontCondition'},
    {setter: setBumperCondition, index: 1, key: 'bumperRearCondition'},
    {
      setter: setWindShieldCondition,
      index: 0,
      key: 'windShieldFrontCondition',
    },
    {
      setter: setWindShieldCondition,
      index: 1,
      key: 'windShieldRearCondition',
    },

    {setter: setFenderCondition, index: 1, key: 'fendersRightSideCondition'},
    {setter: setFenderCondition, index: 0, key: 'fendersLeftSideCondition'},

    {setter: setPillarsCondition, index: 3, key: 'pillarALeftSideCondition'},
    {setter: setPillarsCondition, index: 0, key: 'pillarARightSideCondition'},
    {setter: setPillarsCondition, index: 4, key: 'pillarBLeftSideCondition'},
    {setter: setPillarsCondition, index: 1, key: 'pillarBRightSideCondition'},
    {setter: setPillarsCondition, index: 5, key: 'pillarCLeftSideCondition'},
    {setter: setPillarsCondition, index: 2, key: 'pillarCRightSideCondition'},
    {setter: setDoorCondition, index: 2, key: 'doorsFrontRightSideCondition'},
    {setter: setDoorCondition, index: 0, key: 'doorsFrontLeftSideCondition'},
    {setter: setDoorCondition, index: 3, key: 'doorsRearRightSideCondition'},
    {setter: setDoorCondition, index: 1, key: 'doorsRearLeftSideCondition'},
    {
      setter: setRunningBoardCondition,
      index: 1,
      key: 'runningBoardLeftSideCondition',
    },
    {
      setter: setRunningBoardCondition,
      index: 0,
      key: 'runningBoardRightSideCondition',
    },

    {
      setter: setQuarterPanlesCondition,
      index: 0,
      key: 'quarterPanelsLeftSideCondition',
    },
    {
      setter: setQuarterPanlesCondition,
      index: 1,
      key: 'quarterPanelsRightSideCondition',
    },

    {setter: setDickyDoorCondition, index: 0, key: 'bootCondition'},
    {setter: setDickySkirtCondition, index: 0, key: 'bootSkirtCondition'},

    {setter: setSpareWheel, index: 0, key: 'wheelTypeCondition'},
  ];

  const conditionUpdates = [
    {setter: setChasisCondition, index: 0, key: 'chassisPunchCondition'},

    {setter: setVinPlateCondition, index: 0, key: 'vinPlateCondition'},
    {setter: setKeyCondition, index: 0, key: 'primaryKeyCondition'},
    {setter: setKeyCondition, index: 1, key: 'spareKeyCondition'},
    // {setter: setToolkitCondition, index: 0, key: 'toolKitJackCondition'},
    // {setter: setTyreCondition, index: 0, key: 'frontTyreLeftPercentage'},
    // {setter: setTyreCondition, index: 1, key: 'frontTyreRightPercentage'},
    // {setter: setTyreCondition, index: 2, key: 'rearTyreLeftPercentage'},
    // {setter: setTyreCondition, index: 3, key: 'rearTyreRightPercentage'},
    // {setter: setSpareWheelCondition, index: 0, key: 'spareWheelPercentage'},
    // {setter: setBonetCondition, index: 0, key: 'bonnetCondition'},
    // {setter: setApronCondition, index: 0, key: 'apronLeftSideCondition'},
    // {setter: setApronCondition, index: 1, key: 'apronRightSideCondition'},
    // {
    //   setter: setSupportMembersCondition,
    //   index: 0,
    //   key: 'supportMemberUpperCondition',
    // },
    // {
    //   setter: setSupportMembersCondition,
    //   index: 1,
    //   key: 'supportMemberLowerCondition',
    // },
    // {
    //   setter: setSupportMembersCondition,
    //   index: 2,
    //   key: 'headLampSupportRightSideCondition',
    // },
    // {
    //   setter: setSupportMembersCondition,
    //   index: 3,
    //   key: 'headLampSupportLeftSideCondition',
    // },

    // {setter: setBumperCondition, index: 0, key: 'bumperFrontCondition'},
    // {setter: setBumperCondition, index: 1, key: 'bumperRearCondition'},
    // {
    //   setter: setWindShieldCondition,
    //   index: 0,
    //   key: 'windShieldFrontCondition',
    // },
    // {
    //   setter: setWindShieldCondition,
    //   index: 1,
    //   key: 'windShieldRearCondition',
    // },

    // {setter: setFenderCondition, index: 1, key: 'fendersRightSideCondition'},
    // {setter: setFenderCondition, index: 0, key: 'fendersLeftSideCondition'},

    // {setter: setPillarsCondition, index: 3, key: 'pillarALeftSideCondition'},
    // {setter: setPillarsCondition, index: 0, key: 'pillarARightSideCondition'},
    // {setter: setPillarsCondition, index: 4, key: 'pillarBLeftSideCondition'},
    // {setter: setPillarsCondition, index: 1, key: 'pillarBRightSideCondition'},
    // {setter: setPillarsCondition, index: 5, key: 'pillarCLeftSideCondition'},
    // {setter: setPillarsCondition, index: 2, key: 'pillarCRightSideCondition'},
    // {setter: setDoorCondition, index: 2, key: 'doorsFrontRightSideCondition'},
    // {setter: setDoorCondition, index: 0, key: 'doorsFrontLeftSideCondition'},
    // {setter: setDoorCondition, index: 3, key: 'doorsRearRightSideCondition'},
    // {setter: setDoorCondition, index: 1, key: 'doorsRearLeftSideCondition'},
    // {
    //   setter: setRunningBoardCondition,
    //   index: 1,
    //   key: 'runningBoardLeftSideCondition',
    // },
    // {
    //   setter: setRunningBoardCondition,
    //   index: 0,
    //   key: 'runningBoardRightSideCondition',
    // },

    // {
    //   setter: setQuarterPanlesCondition,
    //   index: 0,
    //   key: 'quarterPanelsLeftSideCondition',
    // },
    // {
    //   setter: setQuarterPanlesCondition,
    //   index: 1,
    //   key: 'quarterPanelsRightSideCondition',
    // },

    // {setter: setDickyDoorCondition, index: 0, key: 'bootCondition'},
    // {setter: setDickySkirtCondition, index: 0, key: 'bootSkirtCondition'},

    // {setter: setWheelTypeCondition, index: 0, key: 'wheelTypeCondition'},

    // {setter: setSuspensionDropdown, index: 0, key: 'strutCondition'},
    // {setter: setSuspensionDropdown, index: 1, key: 'lowerArmCondition'},
    // {setter: setSuspensionDropdown, index: 2, key: 'linkRodCondition'},
    // {setter: setSuspensionDropdown, index: 3, key: 'stabilizerBarCondition'},
    // {setter: setSuspensionDropdown, index: 4, key: 'shockAbsorberCondition'},
    // {setter: setSuspensionDropdown, index: 5, key: 'coilSpringCondition'},
    // {setter: setSuspensionDropdown, index: 6, key: 'leafSpringCondition'},
    // {setter: setSteeringDropdown, index: 0, key: 'rackAndPinionCondition'},
    // {setter: setSteeringDropdown, index: 1, key: 'steeringColumnCondition'},
    // {setter: setSteeringDropdown, index: 2, key: 'hardnessCondition'},
    // {setter: setSteeringDropdown, index: 3, key: 'ballJointEndCondition'},
    // {setter: setBrakeDropdown, index: 0, key: 'padCondition'},
    // {setter: setBrakeDropdown, index: 1, key: 'discCondition'},
    // {setter: setBrakeDropdown, index: 2, key: 'shoeCondition'},
    // {setter: setBrakeDropdown, index: 3, key: 'drumCondition'},
    // {setter: setBrakeDropdown, index: 4, key: 'wheelCylinderCondition'},
    // {setter: setBrakeDropdown, index: 5, key: 'mcBoosterCondition'},
    // {setter: setTransmissionDropdown, index: 0, key: 'clutchCondition'},
    // {setter: setTransmissionDropdown, index: 1, key: 'gearShiftingCondition'},
    // {setter: setTransmissionDropdown, index: 2, key: 'driveShaftCondition'},
    // {setter: setTransmissionDropdown, index: 3, key: 'axleCondition'},
    // {setter: setTransmissionDropdown, index: 4, key: 'propellerShaftCondition'},
    // {setter: setTransmissionDropdown, index: 5, key: 'differentialCondition'},
    // {setter: setTransmissionDropdown, index: 6, key: 'bearingCondition'},
    // {setter: setTransmissionDropdown, index: 7, key: 'mountingCondition'},
    // {setter: setEngineDropdown, index: 0, key: 'smokeCondition'},
    // {setter: setEngineDropdown, index: 1, key: 'turboCondition'},
    // {setter: setEngineDropdown, index: 2, key: 'misfiringCondition'},
    // {setter: setEngineDropdown, index: 3, key: 'tappetCondition'},
    // {setter: setEngineDropdown, index: 4, key: 'knockingCondition'},
    // {setter: setEngineDropdown, index: 5, key: 'exhaustCondition'},
    // {setter: setEngineDropdown, index: 6, key: 'beltsCondition'},
    // {setter: setEngineDropdown, index: 7, key: 'tensionerCondition'},
    // {setter: setEngineDropdown, index: 8, key: 'mountingCondition'},
    // {setter: setEngineDropdown, index: 9, key: 'fuelPumpCondition'},
    // {setter: setEngineDropdown, index: 10, key: 'highPressurePumpCondition'},
    // {setter: setEngineDropdown, index: 11, key: 'commonrailCondition'},
    // {setter: setEngineDropdown, index: 12, key: 'injectorCondition'},
    // {setter: setEngineDropdown, index: 13, key: 'fuelTankCondition'},
    // {setter: setEngineDropdown, index: 14, key: 'hoseCondition'},
    // {setter: setEngineDropdown, index: 15, key: 'radiatorCondition'},
    // {setter: setEngineDropdown, index: 16, key: 'fanCondition'},
    // {setter: setEngineDropdown, index: 17, key: 'overHeatingCondition'},
    // {setter: setEngineDropdown, index: 18, key: 'allBearingsCondition'},
    // {setter: setElectricalDropdown, index: 0, key: 'batteryCondition'},
    // {setter: setElectricalDropdown, index: 1, key: 'alternatorCondition'},
    // {setter: setElectricalDropdown, index: 2, key: 'selfMotorCondition'},
    // {setter: setElectricalDropdown, index: 3, key: 'wiringHarnessCondition'},
    // {setter: setElectricalDropdown, index: 4, key: 'ecmCondition'},
    // {setter: setElectricalDropdown, index: 5, key: 'allSensorsCondition'},
    // {setter: setElectricalDropdown, index: 6, key: 'wiperMotorCondition'},
    // {setter: setElectricalDropdown, index: 7, key: 'clusterCondition'},
    // {setter: setElectricalDropdown, index: 8, key: 'headLightsAndDrlCondition'},
    // {setter: setElectricalDropdown, index: 9, key: 'tailLightCondition'},
    // {setter: setElectricalDropdown, index: 10, key: 'cabinLightCondition'},
    // {
    //   setter: setElectricalDropdown,
    //   index: 11,
    //   key: 'combinationSwitchCondition',
    // },
    // {setter: setElectricalDropdown, index: 12, key: 'absCondition'},
    // {setter: setElectricalDropdown, index: 13, key: 'airBagCondition'},
    // {setter: setElectricalDropdown, index: 14, key: 'powerWindowsCondition'},
    // {setter: setAcDropdown, index: 0, key: 'coolingCondition'},
    // {setter: setAcDropdown, index: 1, key: 'blowerCondenserCondition'},
    // {setter: setAcDropdown, index: 2, key: 'fanCondition'},
    // {setter: setAcDropdown, index: 3, key: 'controlSwitchCondition'},
    // {setter: setAcDropdown, index: 4, key: 'ventCondition'},
    // {setter: setAccessoriesDropdown, index: 0, key: 'musicSystemCondition'},
    // {setter: setAccessoriesDropdown, index: 1, key: 'parkingSensorCondition'},
    // {setter: setAccessoriesDropdown, index: 2, key: 'reverseCameraCondition'},
    // {setter: setAccessoriesDropdown, index: 3, key: 'ovrmAdjusterCondition'},
    // {
    //   setter: setAccessoriesDropdown,
    //   index: 4,
    //   key: 'seatHeightAdjusterCondition',
    // },
    // {setter: setAccessoriesDropdown, index: 5, key: 'seatBeltCondition'},
    // {setter: setAccessoriesDropdown, index: 6, key: 'sunRoofCondition'},
    // {setter: setAccessoriesDropdown, index: 7, key: 'roofRailCondition'},
    // {setter: setAccessoriesDropdown, index: 8, key: 'spoilerCondition'},
    // {setter: setAccessoriesDropdown, index: 9, key: 'skirtCondition'},
    // {
    //   setter: setAccessoriesDropdown,
    //   index: 10,
    //   key: 'steeringControlsCondition',
    // },
  ];

  const stateUpdates3 = [];

  const stateUpdates2 = [
    {setter: setBonetSwitch, index: 0, key: 'bonnetStatus',thirdValidation:0},
    {setter: setApronSwitch, index: 0, key: 'apronLeftSideStatus',thirdValidation:1},
    {setter: setApronSwitch, index: 1, key: 'apronRightSideStatus'},
    {
      setter: setSupportMembersSwitch,
      index: 2,
      key: 'headLampSupportRightSideStatus',thirdValidation:2
    },
    {
      setter: setSupportMembersSwitch,
      index: 3,
      key: 'headLampSupportLeftSideStatus',
    },
    {
      setter: setSupportMembersSwitch,
      index: 0,
      key: 'supportMemberUpperStatus',
    },
    {
      setter: setSupportMembersSwitch,
      index: 1,
      key: 'supportMemberLowerStatus',
    },
    {setter: setBumperSwitch, index: 0, key: 'bumperFrontStatus',thirdValidation:3},
    {setter: setBumperSwitch, index: 1, key: 'bumperRearStatus'},
    {setter: setWindShieldSwitch, index: 0, key: 'windShieldFrontStatus',thirdValidation:4},
    {setter: setWindShieldSwitch, index: 1, key: 'windShieldRearStatus'},
    {setter: setFenderSwitch, index: 1, key: 'fendersRightSideStatus',thirdValidation:5},
    {setter: setFenderSwitch, index: 0, key: 'fendersLeftSideStatus'},
    {setter: setPillarSwitch, index: 0, key: 'pillarARightSideStatus',thirdValidation:6},
    {setter: setPillarSwitch, index: 1, key: 'pillarBRightSideStatus'},
    {setter: setPillarSwitch, index: 2, key: 'pillarCRightSideStatus'},
    {setter: setPillarSwitch, index: 3, key: 'pillarALeftSideStatus'},
    {setter: setPillarSwitch, index: 4, key: 'pillarBLeftSideStatus'},
    {setter: setPillarSwitch, index: 5, key: 'pillarCLeftSideStatus'},
    {setter: setDoorSwitch, index: 0, key: 'doorsFrontLeftSideStatus',thirdValidation:7},
    {setter: setDoorSwitch, index: 1, key: 'doorsRearLeftSideStatus'},
    {setter: setDoorSwitch, index: 2, key: 'doorsFrontRightSideStatus'},
    {setter: setDoorSwitch, index: 3, key: 'doorsRearRightSideStatus'},
    {
      setter: setRunningBoardSwitch,
      index: 1,
      key: 'runningBoardLeftSideStatus',thirdValidation:8
    },
    {
      setter: setRunningBoardSwitch,
      index: 0,
      key: 'runningBoardRightSideStatus',
    },
    {
      setter: setQuarterPanlesSwitch,
      index: 0,
      key: 'quarterPanelsLeftSideStatus',thirdValidation:9
    },
    {
      setter: setQuarterPanlesSwitch,
      index: 1,
      key: 'quarterPanelsRightSideStatus',
    },
    {setter: setDickyDoorSwitch, index: 0, key: 'bootStatus',thirdValidation:10},
    {setter: setDickySkirtSwitch, index: 0, key: 'bootSkirtStatus',thirdValidation:11},
    {setter:setSelectWheelTypeSwitch,index:0,key:'wheelType'},
    {setter: setWheelTypeSwitch, index: 0, key: 'wheelTypeStatus',thirdValidation:12},
  ];

  const stateUpdates1 = [
    {setter: setSpareWheelSwitch, index: 0, key: 'spareWheelStatus',validationIndex:3},
    {setter: setToolkitSwitch, index: 0, key: 'toolKitJackStatus',validationIndex:4},
    {setter: setTyreSwitch, index: 0, key: 'frontTyreLeftStatus',validationIndex:7},
    {setter: setTyreSwitch, index: 1, key: 'frontTyreRightStatus'},
    {setter: setTyreSwitch, index: 2, key: 'rearTyreLeftStatus'},
    {setter: setTyreSwitch, index: 3, key: 'rearTyreRightStatus'},
  ];


  const conditionUpdates1 = [
    {setter:setSpareWheel, index: 0, key: 'spareWheelCondition'},
    {setter:setToolkitCondition, index: 0, key: 'toolkitJackCondition'},
    {setter:setValues, index: 0, key: 'frontTyreLeftCondition'},
    {setter: setValues, index: 1, key: 'frontTyreRightCondition'},
    {setter: setValues, index: 2, key: 'rearTyreLeftCondition'},
    {setter: setValues, index: 3, key: 'rearTyreRightCondition'},
  ];

  const stateUpdates = [
    {setter: setChassisSwitch, index: 0, key: 'chassisPunchStatus',validationIndex:2},
    {setter: setVinPlateSwitch, index: 0, key: 'vinPlateStatus',validationIndex:3},
    {setter: setKeySwitch, index: 0, key: 'primaryKeyStatus',validationIndex:5},
    {setter: setKeySwitch, index: 1, key: 'spareKeyStatus'},

    // {setter: setBonetSwitch, index: 0, key: 'bonnetStatus'},
    // {setter: setApronSwitch, index: 0, key: 'apronLeftSideStatus'},
    // {setter: setApronSwitch, index: 1, key: 'apronRightSideStatus'},
    // {
    //   setter: setSupportMembersSwitch,
    //   index: 2,
    //   key: 'headLampSupportRightSideStatus',
    // },
    // {
    //   setter: setSupportMembersSwitch,
    //   index: 3,
    //   key: 'headLampSupportLeftSideStatus',
    // },
    // {
    //   setter: setSupportMembersSwitch,
    //   index: 0,
    //   key: 'supportMemberUpperStatus',
    // },
    // {
    //   setter: setSupportMembersSwitch,
    //   index: 1,
    //   key: 'supportMemberLowerStatus',
    // },
    // {setter: setBumperSwitch, index: 0, key: 'bumperFrontStatus'},
    // {setter: setBumperSwitch, index: 1, key: 'bumperRearStatus'},
    // {setter: setWindShieldSwitch, index: 0, key: 'windShieldFrontStatus'},
    // {setter: setWindShieldSwitch, index: 1, key: 'windShieldRearStatus'},
    // {setter: setFenderSwitch, index: 1, key: 'fendersRightSideStatus'},
    // {setter: setFenderSwitch, index: 0, key: 'fendersLeftSideStatus'},
    // {setter: setPillarSwitch, index: 0, key: 'pillarARightSideStatus'},
    // {setter: setPillarSwitch, index: 1, key: 'pillarBRightSideStatus'},
    // {setter: setPillarSwitch, index: 2, key: 'pillarCRightSideStatus'},
    // {setter: setPillarSwitch, index: 3, key: 'pillarALeftSideStatus'},
    // {setter: setPillarSwitch, index: 4, key: 'pillarBLeftSideStatus'},
    // {setter: setPillarSwitch, index: 5, key: 'pillarCLeftSideStatus'},
    // {setter: setDoorSwitch, index: 0, key: 'doorsFrontLeftSideStatus'},
    // {setter: setDoorSwitch, index: 1, key: 'doorsRearLeftSideStatus'},
    // {setter: setDoorSwitch, index: 2, key: 'doorsFrontRightSideStatus'},
    // {setter: setDoorSwitch, index: 3, key: 'doorsRearRightSideStatus'},
    // {
    //   setter: setRunningBoardSwitch,
    //   index: 1,
    //   key: 'runningBoardLeftSideStatus',
    // },
    // {
    //   setter: setRunningBoardSwitch,
    //   index: 0,
    //   key: 'runningBoardRightSideStatus',
    // },
    // {
    //   setter: setQuarterPanlesSwitch,
    //   index: 0,
    //   key: 'quarterPanelsLeftSideStatus',
    // },
    // {
    //   setter: setQuarterPanlesSwitch,
    //   index: 1,
    //   key: 'quarterPanelsRightSideStatus',
    // },
    // {setter: setDickyDoorSwitch, index: 0, key: 'bootStatus'},
    // {setter: setDickySkirtSwitch, index: 0, key: 'bootSkirtStatus'},
    // {setter: setWheelTypeSwitch, index: 0, key: 'wheelTypeStatus'},
    // {setter: setSuspensionSwitch, index: 0, key: 'strutStatus'},
    // {setter: setSuspensionSwitch, index: 1, key: 'lowerArmStatus'},
    // {setter: setSuspensionSwitch, index: 2, key: 'linkRodStatus'},
    // {setter: setSuspensionSwitch, index: 3, key: 'stabilizerBarStatus'},
    // {setter: setSuspensionSwitch, index: 4, key: 'shockAbsorberStatus'},
    // {setter: setSuspensionSwitch, index: 5, key: 'coilSpringStatus'},
    // {setter: setSuspensionSwitch, index: 6, key: 'leafSpringStatus'},

    // {setter: setSteeringSwitch, index: 0, key: 'rackAndPinionStatus'},
    // {setter: setSteeringSwitch, index: 1, key: 'steeringColumnStatus'},
    // {setter: setSteeringSwitch, index: 2, key: 'hardnessStatus'},
    // {setter: setSteeringSwitch, index: 3, key: 'ballJointEndStatus'},

    // {setter: setBrakeSwitch, index: 0, key: 'padStatus'},
    // {setter: setBrakeSwitch, index: 1, key: 'discStatus'},
    // {setter: setBrakeSwitch, index: 2, key: 'shoeStatus'},
    // {setter: setBrakeSwitch, index: 3, key: 'drumStatus'},
    // {setter: setBrakeSwitch, index: 4, key: 'wheelCylinderStatus'},
    // {setter: setBrakeSwitch, index: 5, key: 'mcBoosterStatus'},

    // {setter: setTransmissionSwitch, index: 0, key: 'clutchStatus'},
    // {setter: setTransmissionSwitch, index: 1, key: 'gearShiftingStatus'},
    // {setter: setTransmissionSwitch, index: 2, key: 'driveShaftStatus'},
    // {setter: setTransmissionSwitch, index: 3, key: 'axleStatus'},
    // {setter: setTransmissionSwitch, index: 4, key: 'propellerShaftStatus'},
    // {setter: setTransmissionSwitch, index: 5, key: 'differentialStatus'},
    // {setter: setTransmissionSwitch, index: 6, key: 'bearingStatus'},
    // {setter: setTransmissionSwitch, index: 7, key: 'mountingStatus'},

    // {setter: setEngineSwitch, index: 0, key: 'smokeStatus'},
    // {setter: setEngineSwitch, index: 1, key: 'turboStatus'},
    // {setter: setEngineSwitch, index: 2, key: 'misfiringStatus'},
    // {setter: setEngineSwitch, index: 3, key: 'tappetStatus'},
    // {
    //   setter: setEngineSwitch,
    //   index: 4,
    //   key: 'knockingStatus',
    // },
    // {
    //   setter: setEngineSwitch,
    //   index: 5,
    //   key: 'exhaustStatus',
    // },
    // {
    //   setter: setEngineSwitch,
    //   index: 6,
    //   key: 'beltsStatus',
    // },
    // {
    //   setter: setEngineSwitch,
    //   index: 7,
    //   key: 'tensionerStatus',
    // },
    // {
    //   setter: setEngineSwitch,
    //   index: 8,
    //   key: 'mountingStatus',
    // },
    // {
    //   setter: setEngineSwitch,
    //   index: 9,
    //   key: 'fuelPumpStatus',
    // },
    // {
    //   setter: setEngineSwitch,
    //   index: 10,
    //   key: 'highPressurePumpStatus',
    // },
    // {
    //   setter: setEngineSwitch,
    //   index: 11,
    //   key: 'commonrailStatus',
    // },
    // {
    //   setter: setEngineSwitch,
    //   index: 12,
    //   key: 'injectorStatus',
    // },
    // {
    //   setter: setEngineSwitch,
    //   index: 13,
    //   key: 'fuelTankStatus',
    // },
    // {
    //   setter: setEngineSwitch,
    //   index: 14,
    //   key: 'hoseStatus',
    // },
    // {
    //   setter: setEngineSwitch,
    //   index: 15,
    //   key: 'radiatorStatus',
    // },
    // {
    //   setter: setEngineSwitch,
    //   index: 16,
    //   key: 'fanStatus',
    // },
    // {setter: setEngineSwitch, index: 17, key: 'overHeatingStatus'},
    // {setter: setEngineSwitch, index: 18, key: 'allBearingsStatus'},
    // {setter: setElectricalSwitch, index: 0, key: 'batteryStatus'},
    // {setter: setElectricalSwitch, index: 1, key: 'alternatorStatus'},
    // {setter: setElectricalSwitch, index: 2, key: 'selfMotorStatus'},
    // {setter: setElectricalSwitch, index: 3, key: 'wiringHarnessStatus'},
    // {setter: setElectricalSwitch, index: 4, key: 'ecmStatus'},
    // {setter: setElectricalSwitch, index: 5, key: 'allSensorsStatus'},
    // {setter: setElectricalSwitch, index: 6, key: 'wiperMotorStatus'},
    // {setter: setElectricalSwitch, index: 7, key: 'clusterStatus'},
    // {setter: setElectricalSwitch, index: 8, key: 'headLightsAndDrlStatus'},
    // {setter: setElectricalSwitch, index: 9, key: 'tailLightStatus'},
    // {setter: setElectricalSwitch, index: 10, key: 'cabinLightStatus'},
    // {setter: setElectricalSwitch, index: 11, key: 'combinationSwitchStatus'},
    // {setter: setElectricalSwitch, index: 12, key: 'absStatus'},
    // {setter: setElectricalSwitch, index: 13, key: 'airBagStatus'},
    // {setter: setElectricalSwitch, index: 14, key: 'powerWindowsStatus'},
    // {setter: setAcSwitch, index: 0, key: 'coolingStatus'},
    // {setter: setAcSwitch, index: 1, key: 'blowerStatus'},
    // {setter: setAcSwitch, index: 2, key: 'condenserStatus'},
    // {setter: setAcSwitch, index: 3, key: 'fanStatus'},
    // {setter: setAcSwitch, index: 4, key: 'controlSwitchStatus'},
    // {setter: setAcSwitch, index: 5, key: 'ventStatus'},
    // {setter: setAccessoriesSwitch, index: 0, key: 'musicSystemStatus'},
    // {setter: setAccessoriesSwitch, index: 1, key: 'parkingSensorStatus'},
    // {setter: setAccessoriesSwitch, index: 2, key: 'reverseCameraStatus'},
    // {setter: setAccessoriesSwitch, index: 3, key: 'ovrmAdjusterStatus'},
    // {setter: setAccessoriesSwitch, index: 4, key: 'seatHeightAdjusterStatus'},
    // {setter: setAccessoriesSwitch, index: 5, key: 'seatBeltStatus'},
    // {setter: setAccessoriesSwitch, index: 6, key: 'sunRoofStatus'},
    // {setter: setAccessoriesSwitch, index: 7, key: 'roofRailStatus'},
    // {setter: setAccessoriesSwitch, index: 8, key: 'spoilerStatus'},
    // {setter: setAccessoriesSwitch, index: 9, key: 'skirtStatus'},
    // {setter: setAccessoriesSwitch, index: 10, key: 'steeringControlsStatus'},
    // {setter: setoilSwitch, index: 0, key: 'engineOilStatus'},
    // {setter: setoilSwitch, index: 1, key: 'brakeOilStatus'},
    // {setter: setoilSwitch, index: 2, key: 'coolentOilStatus'},
    // {setter: setoilSwitch, index: 3, key: 'gearOilStatus'},
    // {setter: setoilSwitch, index: 4, key: 'crownOilStatus'},
  ];

  const statusUpdates3 = [
    {setter: setSuspensionSwitch, index: 0, key: 'strutStatus',secondValidation:0},
    {setter: setSuspensionSwitch, index: 1, key: 'lowerArmStatus'},
    {setter: setSuspensionSwitch, index: 2, key: 'linkRodStatus'},
    {setter: setSuspensionSwitch, index: 3, key: 'stabilizerBarStatus'},
    {setter: setSuspensionSwitch, index: 4, key: 'shockAbsorberStatus'},
    {setter: setSuspensionSwitch, index: 5, key: 'coilSpringStatus'},
    {setter: setSuspensionSwitch, index: 6, key: 'leafSpringStatus'},

    {setter: setSteeringSwitch, index: 0, key: 'rackAndPinionStatus',secondValidation:1},
    {setter: setSteeringSwitch, index: 1, key: 'steeringColumnStatus'},
    {setter: setSteeringSwitch, index: 2, key: 'hardnessStatus'},
    {setter: setSteeringSwitch, index: 3, key: 'ballJointEndStatus'},

    {setter: setBrakeSwitch, index: 0, key: 'padStatus',secondValidation:2},
    {setter: setBrakeSwitch, index: 1, key: 'discStatus'},
    {setter: setBrakeSwitch, index: 2, key: 'shoeStatus'},
    {setter: setBrakeSwitch, index: 3, key: 'drumStatus'},
    {setter: setBrakeSwitch, index: 4, key: 'wheelCylinderStatus'},
    {setter: setBrakeSwitch, index: 5, key: 'mcBoosterStatus'},

    {setter: setTransmissionSwitch, index: 0, key: 'clutchStatus',secondValidation:3},
    {setter: setTransmissionSwitch, index: 1, key: 'gearShiftingStatus'},
    {setter: setTransmissionSwitch, index: 2, key: 'driveShaftStatus'},
    {setter: setTransmissionSwitch, index: 3, key: 'axleStatus'},
    {setter: setTransmissionSwitch, index: 4, key: 'propellerShaftStatus'},
    {setter: setTransmissionSwitch, index: 5, key: 'differentialStatus'},
    {setter: setTransmissionSwitch, index: 6, key: 'bearingStatus'},
    {setter: setTransmissionSwitch, index: 7, key: 'mountingStatus'},

    {setter: setEngineSwitch, index: 0, key: 'smokeStatus',secondValidation:4},
    {setter: setEngineSwitch, index: 1, key: 'turboStatus'},
    {setter: setEngineSwitch, index: 2, key: 'misfiringStatus'},
    {setter: setEngineSwitch, index: 3, key: 'tappetStatus'},
    {
      setter: setEngineSwitch,
      index: 4,
      key: 'knockingStatus',
    },
    {
      setter: setEngineSwitch,
      index: 5,
      key: 'exhaustStatus',
    },
    {
      setter: setEngineSwitch,
      index: 6,
      key: 'beltsStatus',
    },
    {
      setter: setEngineSwitch,
      index: 7,
      key: 'tensionerStatus',
    },
    {
      setter: setEngineSwitch,
      index: 8,
      key: 'mountingStatus',
    },
    {
      setter: setEngineSwitch,
      index: 9,
      key: 'fuelPumpStatus',
    },
    {
      setter: setEngineSwitch,
      index: 10,
      key: 'highPressurePumpStatus',
    },
    {
      setter: setEngineSwitch,
      index: 11,
      key: 'commonrailStatus',
    },
    {
      setter: setEngineSwitch,
      index: 12,
      key: 'injectorStatus',
    },
    {
      setter: setEngineSwitch,
      index: 13,
      key: 'fuelTankStatus',
    },
    {
      setter: setEngineSwitch,
      index: 14,
      key: 'hoseStatus',
    },
    {
      setter: setEngineSwitch,
      index: 15,
      key: 'radiatorStatus',
    },
    {
      setter: setEngineSwitch,
      index: 16,
      key: 'fanStatus',
    },
    {setter: setEngineSwitch, index: 17, key: 'overHeatingStatus'},
    {setter: setEngineSwitch, index: 18, key: 'allBearingsStatus'},
    {setter: setElectricalSwitch, index: 0, key: 'batteryStatus',secondValidation:5},
    {setter: setElectricalSwitch, index: 1, key: 'alternatorStatus'},
    {setter: setElectricalSwitch, index: 2, key: 'selfMotorStatus'},
    {setter: setElectricalSwitch, index: 3, key: 'wiringHarnessStatus'},
    {setter: setElectricalSwitch, index: 4, key: 'ecmStatus'},
    {setter: setElectricalSwitch, index: 5, key: 'allSensorsStatus'},
    {setter: setElectricalSwitch, index: 6, key: 'wiperMotorStatus'},
    {setter: setElectricalSwitch, index: 7, key: 'clusterStatus'},
    {setter: setElectricalSwitch, index: 8, key: 'headLightsAndDrlStatus'},
    {setter: setElectricalSwitch, index: 9, key: 'tailLightStatus'},
    {setter: setElectricalSwitch, index: 10, key: 'cabinLightStatus'},
    {setter: setElectricalSwitch, index: 11, key: 'combinationSwitchStatus'},
    {setter: setElectricalSwitch, index: 12, key: 'absStatus'},
    {setter: setElectricalSwitch, index: 13, key: 'airBagStatus'},
    {setter: setElectricalSwitch, index: 14, key: 'powerWindowsStatus'},
    {setter: setAcSwitch, index: 0, key: 'coolingStatus',secondValidation:6},
    {setter: setAcSwitch, index: 1, key: 'blowerStatus'},
    {setter: setAcSwitch, index: 2, key: 'condenserStatus'},
    {setter: setAcSwitch, index: 3, key: 'fanStatus'},
    {setter: setAcSwitch, index: 4, key: 'controlSwitchStatus'},
    {setter: setAcSwitch, index: 5, key: 'ventStatus'},
    {setter: setAccessoriesSwitch, index: 0, key: 'musicSystemStatus',secondValidation:7},
    {setter: setAccessoriesSwitch, index: 1, key: 'parkingSensorStatus'},
    {setter: setAccessoriesSwitch, index: 2, key: 'reverseCameraStatus'},
    {setter: setAccessoriesSwitch, index: 3, key: 'ovrmAdjusterStatus'},
    {setter: setAccessoriesSwitch, index: 4, key: 'seatHeightAdjusterStatus'},
    {setter: setAccessoriesSwitch, index: 5, key: 'seatBeltStatus'},
    {setter: setAccessoriesSwitch, index: 6, key: 'sunRoofStatus'},
    {setter: setAccessoriesSwitch, index: 7, key: 'roofRailStatus'},
    {setter: setAccessoriesSwitch, index: 8, key: 'spoilerStatus'},
    {setter: setAccessoriesSwitch, index: 9, key: 'skirtStatus'},
    {setter: setAccessoriesSwitch, index: 10, key: 'steeringControlsStatus'},
    {setter: setoilSwitch, index: 0, key: 'engineOilStatus',secondValidation:8},
    {setter: setoilSwitch, index: 1, key: 'brakeOilStatus'},
    {setter: setoilSwitch, index: 2, key: 'coolentOilStatus'},
    {setter: setoilSwitch, index: 3, key: 'gearOilStatus'},
    {setter: setoilSwitch, index: 4, key: 'crownOilStatus'},
  ];

  const conditionUpdates3 = [
    {setter: setSuspensionDropdown, index: 0, key: 'strutCondition'},
    {setter: setSuspensionDropdown, index: 1, key: 'lowerArmCondition'},
    {setter: setSuspensionDropdown, index: 2, key: 'linkRodCondition'},
    {setter: setSuspensionDropdown, index: 3, key: 'stabilizerBarCondition'},
    {setter: setSuspensionDropdown, index: 4, key: 'shockAbsorberCondition'},
    {setter: setSuspensionDropdown, index: 5, key: 'coilSpringCondition'},
    {setter: setSuspensionDropdown, index: 6, key: 'leafSpringCondition'},
    {setter: setSteeringDropdown, index: 0, key: 'rackAndPinionCondition'},
    {setter: setSteeringDropdown, index: 1, key: 'steeringColumnCondition'},
    {setter: setSteeringDropdown, index: 2, key: 'hardnessCondition'},
    {setter: setSteeringDropdown, index: 3, key: 'ballJointEndCondition'},
    {setter: setBrakeDropdown, index: 0, key: 'padCondition'},
    {setter: setBrakeDropdown, index: 1, key: 'discCondition'},
    {setter: setBrakeDropdown, index: 2, key: 'shoeCondition'},
    {setter: setBrakeDropdown, index: 3, key: 'drumCondition'},
    {setter: setBrakeDropdown, index: 4, key: 'wheelCylinderCondition'},
    {setter: setBrakeDropdown, index: 5, key: 'mcBoosterCondition'},
    {setter: setTransmissionDropdown, index: 0, key: 'clutchCondition'},
    {setter: setTransmissionDropdown, index: 1, key: 'gearShiftingCondition'},
    {setter: setTransmissionDropdown, index: 2, key: 'driveShaftCondition'},
    {setter: setTransmissionDropdown, index: 3, key: 'axleCondition'},
    {setter: setTransmissionDropdown, index: 4, key: 'propellerShaftCondition'},
    {setter: setTransmissionDropdown, index: 5, key: 'differentialCondition'},
    {setter: setTransmissionDropdown, index: 6, key: 'bearingCondition'},
    {setter: setTransmissionDropdown, index: 7, key: 'mountingCondition'},
    {setter: setEngineDropdown, index: 0, key: 'smokeCondition'},
    {setter: setEngineDropdown, index: 1, key: 'turboCondition'},
    {setter: setEngineDropdown, index: 2, key: 'misfiringCondition'},
    {setter: setEngineDropdown, index: 3, key: 'tappetCondition'},
    {setter: setEngineDropdown, index: 4, key: 'knockingCondition'},
    {setter: setEngineDropdown, index: 5, key: 'exhaustCondition'},
    {setter: setEngineDropdown, index: 6, key: 'beltsCondition'},
    {setter: setEngineDropdown, index: 7, key: 'tensionerCondition'},
    {setter: setEngineDropdown, index: 8, key: 'mountingCondition'},
    {setter: setEngineDropdown, index: 9, key: 'fuelPumpCondition'},
    {setter: setEngineDropdown, index: 10, key: 'highPressurePumpCondition'},
    {setter: setEngineDropdown, index: 11, key: 'commonrailCondition'},
    {setter: setEngineDropdown, index: 12, key: 'injectorCondition'},
    {setter: setEngineDropdown, index: 13, key: 'fuelTankCondition'},
    {setter: setEngineDropdown, index: 14, key: 'hoseCondition'},
    {setter: setEngineDropdown, index: 15, key: 'radiatorCondition'},
    {setter: setEngineDropdown, index: 16, key: 'fanCondition'},
    {setter: setEngineDropdown, index: 17, key: 'overHeatingCondition'},
    {setter: setEngineDropdown, index: 18, key: 'allBearingsCondition'},
    {setter: setElectricalDropdown, index: 0, key: 'batteryCondition'},
    {setter: setElectricalDropdown, index: 1, key: 'alternatorCondition'},
    {setter: setElectricalDropdown, index: 2, key: 'selfMotorCondition'},
    {setter: setElectricalDropdown, index: 3, key: 'wiringHarnessCondition'},
    {setter: setElectricalDropdown, index: 4, key: 'ecmCondition'},
    {setter: setElectricalDropdown, index: 5, key: 'allSensorsCondition'},
    {setter: setElectricalDropdown, index: 6, key: 'wiperMotorCondition'},
    {setter: setElectricalDropdown, index: 7, key: 'clusterCondition'},
    {setter: setElectricalDropdown, index: 8, key: 'headLightsAndDrlCondition'},
    {setter: setElectricalDropdown, index: 9, key: 'tailLightCondition'},
    {setter: setElectricalDropdown, index: 10, key: 'cabinLightCondition'},
    {
      setter: setElectricalDropdown,
      index: 11,
      key: 'combinationSwitchCondition',
    },
    {setter: setElectricalDropdown, index: 12, key: 'absCondition'},
    {setter: setElectricalDropdown, index: 13, key: 'airBagCondition'},
    {setter: setElectricalDropdown, index: 14, key: 'powerWindowsCondition'},
    {setter: setAcDropdown, index: 0, key: 'coolingCondition'},
    {setter: setAcDropdown, index: 1, key: 'blowerCondenserCondition'},
    {setter: setAcDropdown, index: 2, key: 'fanCondition'},
    {setter: setAcDropdown, index: 3, key: 'controlSwitchCondition'},
    {setter: setAcDropdown, index: 4, key: 'ventCondition'},
    {setter: setAccessoriesDropdown, index: 0, key: 'musicSystemCondition'},
    {setter: setAccessoriesDropdown, index: 1, key: 'parkingSensorCondition'},
    {setter: setAccessoriesDropdown, index: 2, key: 'reverseCameraCondition'},
    {setter: setAccessoriesDropdown, index: 3, key: 'ovrmAdjusterCondition'},
    {
      setter: setAccessoriesDropdown,
      index: 4,
      key: 'seatHeightAdjusterCondition',
    },
    {setter: setAccessoriesDropdown, index: 5, key: 'seatBeltCondition'},
    {setter: setAccessoriesDropdown, index: 6, key: 'sunRoofCondition'},
    {setter: setAccessoriesDropdown, index: 7, key: 'roofRailCondition'},
    {setter: setAccessoriesDropdown, index: 8, key: 'spoilerCondition'},
    {setter: setAccessoriesDropdown, index: 9, key: 'skirtCondition'},
    {
      setter: setAccessoriesDropdown,
      index: 10,
      key: 'steeringControlsCondition',
    },
    {
      setter: setOilDropDown,
      index: 0,
      key: 'engineOilCondition',
    },
    {
      setter: setOilDropDown,
      index: 1,
      key: 'brakeOilCondition',
    },
    {
      setter: setOilDropDown,
      index: 2,
      key: 'coolentOilCondition',
    },
    {
      setter: setOilDropDown,
      index: 3,
      key: 'gearOilCondition',
    },
    {
      setter: setOilDropDown,
      index:4,
      key: 'crownOilCondition',
    },
  ];

  const remarksUpdates3 = [
    {setter: setSuspensionRemarks, index: 0, key: 'strutRemarks'},
    {setter: setSuspensionRemarks, index: 1, key: 'lowerArmRemarks'},
    {setter: setSuspensionRemarks, index: 2, key: 'linkRodRemarks'},
    {setter: setSuspensionRemarks, index: 3, key: 'stabilizerBarRemarks'},
    {setter: setSuspensionRemarks, index: 4, key: 'shockAbsorberRemarks'},
    {setter: setSuspensionRemarks, index: 5, key: 'coilSpringRemarks'},
    {setter: setSuspensionRemarks, index: 6, key: 'leafSpringRemarks'},
    {setter: setSteeringRemarks, index: 0, key: 'rackAndPinionRemarks'},
    {setter: setSteeringRemarks, index: 1, key: 'steeringColumnRemarks'},
    {setter: setSteeringRemarks, index: 2, key: 'hardnessRemarks'},
    {setter: setSteeringRemarks, index: 3, key: 'ballJointEndRemarks'},
    {setter: setBrakeRemarks, index: 0, key: 'padRemarks'},
    {setter: setBrakeRemarks, index: 1, key: 'discRemarks'},
    {setter: setBrakeRemarks, index: 2, key: 'shoeRemarks'},
    {setter: setBrakeRemarks, index: 3, key: 'drumRemarks'},
    {setter: setBrakeRemarks, index: 4, key: 'wheelCylinderRemarks'},
    {setter: setBrakeRemarks, index: 5, key: 'mcBoosterRemarks'},
    {setter: setTransmissionRemarks, index: 0, key: 'clutchRemarks'},
    {setter: setTransmissionRemarks, index: 1, key: 'gearShiftingRemarks'},
    {setter: setTransmissionRemarks, index: 2, key: 'driveShaftRemarks'},
    {setter: setTransmissionRemarks, index: 3, key: 'axleRemarks'},
    {setter: setTransmissionRemarks, index: 4, key: 'propellerShaftRemarks'},
    {setter: setTransmissionRemarks, index: 5, key: 'differentialRemarks'},
    {setter: setTransmissionRemarks, index: 6, key: 'bearingRemarks'},
    {setter: setTransmissionRemarks, index: 7, key: 'mountingRemarks'},
    {setter: setEngineRemarks, index: 0, key: 'smokeRemarks'},
    {setter: setEngineRemarks, index: 1, key: 'turboRemarks'},
    {setter: setEngineRemarks, index: 2, key: 'misfiringRemarks'},
    {setter: setEngineRemarks, index: 3, key: 'tappetRemarks'},
    {setter: setEngineRemarks, index: 4, key: 'knockingRemarks'},
    {setter: setEngineRemarks, index: 5, key: 'exhaustRemarks'},
    {setter: setEngineRemarks, index: 6, key: 'beltsRemarks'},
    {setter: setEngineRemarks, index: 7, key: 'tensionerRemarks'},
    {setter: setEngineRemarks, index: 8, key: 'mountingRemarks'},
    {setter: setEngineRemarks, index: 9, key: 'fuelPumpRemarks'},
    {setter: setEngineRemarks, index: 10, key: 'highPressurePumpRemarks'},
    {setter: setEngineRemarks, index: 11, key: 'commonrailRemarks'},
    {setter: setEngineRemarks, index: 12, key: 'injectorRemarks'},
    {setter: setEngineRemarks, index: 13, key: 'fuelTankRemarks'},
    {setter: setEngineRemarks, index: 14, key: 'hoseRemarks'},
    {setter: setEngineRemarks, index: 15, key: 'radiatorRemarks'},
    {setter: setEngineRemarks, index: 16, key: 'fanRemarks'},
    {setter: setEngineRemarks, index: 17, key: 'overHeatingRemarks'},
    {setter: setEngineRemarks, index: 18, key: 'allBearingsRemarks'},
    {setter: setElectricalRemarks, index: 0, key: 'batteryRemarks'},
    {setter: setElectricalRemarks, index: 1, key: 'alternatorRemarks'},
    {setter: setElectricalRemarks, index: 2, key: 'selfMotorRemarks'},
    {setter: setElectricalRemarks, index: 3, key: 'wiringHarnessRemarks'},
    {setter: setElectricalRemarks, index: 4, key: 'ecmRemarks'},
    {setter: setElectricalRemarks, index: 5, key: 'allSensorsRemarks'},
    {setter: setElectricalRemarks, index: 6, key: 'wiperMotorRemarks'},
    {setter: setElectricalRemarks, index: 7, key: 'clusterRemarks'},
    {setter: setElectricalRemarks, index: 8, key: 'headLightsAndDrlRemarks'},
    {setter: setElectricalRemarks, index: 9, key: 'tailLightRemarks'},
    {setter: setElectricalRemarks, index: 10, key: 'cabinLightRemarks'},
    {setter: setElectricalRemarks, index: 11, key: 'combinationSwitchRemarks'},
    {setter: setElectricalRemarks, index: 12, key: 'absRemarks'},
    {setter: setElectricalRemarks, index: 13, key: 'airBagRemarks'},
    {setter: setElectricalRemarks, index: 14, key: 'powerWindowsRemarks'},

    {setter: setAcRemarks, index: 0, key: 'coolingRemarks'},
    {setter: setAcRemarks, index: 1, key: 'blowerCondenserRemarks'},
    {setter: setAcRemarks, index: 2, key: 'fanRemarks'},
    {setter: setAcRemarks, index: 3, key: 'controlSwitchRemarks'},
    {setter: setAcRemarks, index: 4, key: 'ventRemarks'},
    {setter: setAccessoriesRemarks, index: 0, key: 'musicSystemRemarks'},
    {setter: setAccessoriesRemarks, index: 1, key: 'parkingSensorRemarks'},
    {setter: setAccessoriesRemarks, index: 2, key: 'reverseCameraRemarks'},
    {setter: setAccessoriesRemarks, index: 3, key: 'ovrmAdjusterRemarks'},
    {setter: setAccessoriesRemarks, index: 4, key: 'seatHeightAdjusterRemarks'},
    {setter: setAccessoriesRemarks, index: 5, key: 'seatBeltRemarks'},
    {setter: setAccessoriesRemarks, index: 6, key: 'sunRoofRemarks'},
    {setter: setAccessoriesRemarks, index: 7, key: 'roofRailRemarks'},
    {setter: setAccessoriesRemarks, index: 8, key: 'spoilerRemarks'},
    {setter: setAccessoriesRemarks, index: 9, key: 'skirtRemarks'},
    {setter: setAccessoriesRemarks, index: 10, key: 'steeringControlsRemarks'},
    {setter:setOilRemarks,index:0,key:'engineOilRemarks'},
    {setter:setOilRemarks,index:1,key:'brakeOilRemarks'},
    {setter:setOilRemarks,index:2,key:'coolentOilRemarks'},
    {setter:setOilRemarks,index:3,key:'gearOilRemarks'},
    {setter:setOilRemarks,index:4,key:'crownOilRemarks'},
    
    
    
  ];

  const photoUpdates4 = [
    {setter: setSuspensionPhoto, index: 0, key: 'strutPhoto'},
    {setter: setSuspensionPhoto, index: 1, key: 'lowerArmPhoto'},
    {setter: setSuspensionPhoto, index: 2, key: 'linkRodPhoto'},
    {setter: setSuspensionPhoto, index: 3, key: 'stabilizerBarPhoto'},
    {setter: setSuspensionPhoto, index: 4, key: 'shockAbsorberPhoto'},
    {setter: setSuspensionPhoto, index: 5, key: 'coilSpringPhoto'},
    {setter: setSuspensionPhoto, index: 6, key: 'leafSpringPhoto'},
    {setter: setSteeringPhoto, index: 0, key: 'rackAndPinionPhoto'},
    {setter: setSteeringPhoto, index: 1, key: 'steeringColumnPhoto'},
    {setter: setSteeringPhoto, index: 2, key: 'hardnessPhoto'},
    {setter: setSteeringPhoto, index: 3, key: 'ballJointEndPhoto'},
    {setter: setBrakePhoto, index: 0, key: 'padPhoto'},
    {setter: setBrakePhoto, index: 1, key: 'discPhoto'},
    {setter: setBrakePhoto, index: 2, key: 'shoePhoto'},
    {setter: setBrakePhoto, index: 3, key: 'drumPhoto'},
    {setter: setBrakePhoto, index: 4, key: 'wheelCylinderPhoto'},
    {setter: setBrakePhoto, index: 5, key: 'mcBoosterPhoto'},

    {setter: setTransmissionPhoto, index: 0, key: 'clutchPhoto'},
    {setter: setTransmissionPhoto, index: 1, key: 'gearShiftingPhoto'},
    {setter: setTransmissionPhoto, index: 2, key: 'driveShaftPhoto'},
    {setter: setTransmissionPhoto, index: 3, key: 'axlePhoto'},
    {setter: setTransmissionPhoto, index: 4, key: 'propellerShaftPhoto'},
    {setter: setTransmissionPhoto, index: 5, key: 'differentialPhoto'},
    {setter: setTransmissionPhoto, index: 6, key: 'bearingPhoto'},
    {setter: setTransmissionPhoto, index: 7, key: 'mountingPhoto'},

    {setter: setEnginePhoto, index: 0, key: 'smokePhoto'},
    {setter: setEnginePhoto, index: 1, key: 'turboPhoto'},
    {setter: setEnginePhoto, index: 2, key: 'misfiringPhoto'},
    {setter: setEnginePhoto, index: 3, key: 'tappetPhoto'},
    {setter: setEnginePhoto, index: 4, key: 'knockingPhoto'},
    {setter: setEnginePhoto, index: 5, key: 'exhaustPhoto'},
    {setter: setEnginePhoto, index: 6, key: 'beltsPhoto'},
    {setter: setEnginePhoto, index: 7, key: 'tensionerPhoto'},
    {setter: setEnginePhoto, index: 8, key: 'mountingPhoto'},
    {setter: setEnginePhoto, index: 9, key: 'fuelPumpPhoto'},
    {setter: setEnginePhoto, index: 10, key: 'highPressurePumpPhoto'},
    {setter: setEnginePhoto, index: 11, key: 'commonrailPhoto'},
    {setter: setEnginePhoto, index: 12, key: 'injectorPhoto'},
    {setter: setEnginePhoto, index: 13, key: 'fuelTankPhoto'},
    {setter: setEnginePhoto, index: 14, key: 'hosePhoto'},
    {setter: setEnginePhoto, index: 15, key: 'radiatorPhoto'},
    {setter: setEnginePhoto, index: 16, key: 'fanPhoto'},
    {setter: setEnginePhoto, index: 17, key: 'overHeatingPhoto'},
    {setter: setEnginePhoto, index: 18, key: 'allBearingsPhoto'},

    {setter: setElectricalPhoto, index: 0, key: 'batteryPhoto'},
    {setter: setElectricalPhoto, index: 1, key: 'alternatorPhoto'},
    {setter: setElectricalPhoto, index: 2, key: 'selfMotorPhoto'},
    {setter: setElectricalPhoto, index: 3, key: 'wiringHarnessPhoto'},
    {setter: setElectricalPhoto, index: 4, key: 'ecmPhoto'},
    {setter: setElectricalPhoto, index: 5, key: 'allSensorsPhoto'},
    {setter: setElectricalPhoto, index: 6, key: 'wiperMotorPhoto'},
    {setter: setElectricalPhoto, index: 7, key: 'clusterPhoto'},
    {setter: setElectricalPhoto, index: 8, key: 'headLightsAndDrlPhoto'},
    {setter: setElectricalPhoto, index: 9, key: 'tailLightPhoto'},
    {setter: setElectricalPhoto, index: 10, key: 'cabinLightPhoto'},
    {setter: setElectricalPhoto, index: 11, key: 'combinationSwitchPhoto'},
    {setter: setElectricalPhoto, index: 12, key: 'absPhoto'},
    {setter: setElectricalPhoto, index: 13, key: 'airBagPhoto'},
    {setter: setElectricalPhoto, index: 14, key: 'powerWindowsPhoto'},

    {setter: setAcPhoto, index: 0, key: 'coolingPhoto'},
    {setter: setAcPhoto, index: 1, key: 'blowerCondenserPhoto'},
    {setter: setAcPhoto, index: 2, key: 'fanPhoto'},
    {setter: setAcPhoto, index: 3, key: 'controlSwitchPhoto'},
    {setter: setAcPhoto, index: 4, key: 'ventPhoto'},

    {setter: setAccessoriesPhoto, index: 0, key: 'musicSystemPhoto'},
    {setter: setAccessoriesPhoto, index: 1, key: 'parkingSensorPhoto'},
    {setter: setAccessoriesPhoto, index: 2, key: 'reverseCameraPhoto'},
    {setter: setAccessoriesPhoto, index: 3, key: 'ovrmAdjusterPhoto'},
    {setter: setAccessoriesPhoto, index: 4, key: 'seatHeightAdjusterPhoto'},
    {setter: setAccessoriesPhoto, index: 5, key: 'seatBeltPhoto'},
    {setter: setAccessoriesPhoto, index: 6, key: 'sunRoofPhoto'},
    {setter: setAccessoriesPhoto, index: 7, key: 'roofRailPhoto'},
    {setter: setAccessoriesPhoto, index: 8, key: 'spoilerPhoto'},
    {setter: setAccessoriesPhoto, index: 9, key: 'skirtPhoto'},
    {setter: setAccessoriesPhoto, index: 10, key: 'steeringControlsPhoto'},
  ];

  const photoUpdates3 = [
    {setter: setBonetPhoto, index: 0, key: 'bonnetPhoto'},
    {setter: setApronPhoto, index: 0, key: 'apronLeftSidePhoto'},
    {setter: setApronPhoto, index: 1, key: 'apronRightSidePhoto'},
    {setter: setSupportMembersPhoto, index: 0, key: 'supportMemberUpperPhoto'},
    {setter: setSupportMembersPhoto, index: 1, key: 'supportMemberLowerPhoto'},
    {
      setter: setSupportMembersPhoto,
      index: 2,
      key: 'headLampSupportRightSidePhoto',
    },
    {
      setter: setSupportMembersPhoto,
      index: 3,
      key: 'headLampSupportLeftSidePhoto',
    },
    {setter: setBumperPhoto, index: 0, key: 'bumperFrontPhoto'},
    {setter: setBumperPhoto, index: 1, key: 'bumperRearPhoto'},
    {setter: setWindShieldPhoto, index: 0, key: 'windShieldFrontPhoto'},
    {setter: setWindShieldPhoto, index: 1, key: 'windShieldRearPhoto'},
    {setter: setFendersPhoto, index: 0, key: 'fendersLeftSidePhoto'},
    {setter: setFendersPhoto, index: 1, key: 'fendersRightSidePhoto'},

    {setter: setPillarsPhoto, index: 0, key: 'pillarARightSidePhoto'},
    {setter: setPillarsPhoto, index: 1, key: 'pillarBRightSidePhoto'},
    {setter: setPillarsPhoto, index: 2, key: 'pillarCRightSidePhoto'},
    {setter: setPillarsPhoto, index: 3, key: 'pillarALeftSidePhoto'},
    {setter: setPillarsPhoto, index: 4, key: 'pillarBLeftSidePhoto'},
    {setter: setPillarsPhoto, index: 5, key: 'pillarCLeftSidePhoto'},
    {setter: setDoorPhoto, index: 0, key: 'doorsFrontLeftSidePhoto'},
    {setter: setDoorPhoto, index: 1, key: 'doorsRearLeftSidePhoto'},
    {setter: setDoorPhoto, index: 2, key: 'doorsFrontRightSidePhoto'},
    {setter: setDoorPhoto, index: 3, key: 'doorsRearRightSidePhoto'},
    {setter: setRunningBoardPhoto, index: 1, key: 'runningBoardLeftSidePhoto'},
    {setter: setRunningBoardPhoto, index: 0, key: 'runningBoardRightSidePhoto'},

    {
      setter: setQuarterPanlesPhoto,
      index: 0,
      key: 'quarterPanelsLeftSidePhoto',
    },
    {
      setter: setQuarterPanlesPhoto,
      index: 1,
      key: 'quarterPanelsRightSidePhoto',
    },

    {setter: setDickyDoorPhoto, index: 0, key: 'bootPhoto'},
    {setter: setDickySkirtPhoto, index: 0, key: 'bootSkirtPhoto'},

    {setter: setWheelTypePhoto, index: 0, key: 'wheelTypePhoto'},
  ];

  const photoUpdates2 = [
    {setter: setLhsViewPhoto, index: 0, key: 'lhsViewPhoto',carValidation:0},
    {setter: setRearViewPhoto, index: 0, key: 'rearViewPhoto',carValidation:1},
    {setter: setTrunkBootPhoto, index: 0, key: 'trunkBootPhoto',carValidation:2},
    {setter: setSpareWheelPunchPhoto, index: 0, key: 'spareWheelPhoto'},
    {setter: setToolkitPunchPhoto, index: 0, key: 'toolKitJackPhoto'},
    {setter: setRoofPhoto, index: 0, key: 'roofPhoto',carValidation:5},
    {setter: setUnderChassisPhoto, index: 0, key: 'underChassisPhoto',carValidation:6},
    {setter: setTyrePunchPhoto, index: 0, key: 'frontTyreLeftPhoto'},
    {setter: setTyrePunchPhoto, index: 1, key: 'frontTyreRightPhoto'},
    {setter: setTyrePunchPhoto, index: 2, key: 'rearTyreLeftPhoto'},
    {setter: setTyrePunchPhoto, index: 3, key: 'rearTyreRightPhoto'},
  ];

  const photoUpdates1 = [
    {setter: setFrontViewPhoto, index: 0, key: 'frontViewPhoto',validationIndex:0},
    {setter: setEngineRoomPhoto, index: 0, key: 'engineRoomPhoto',validationIndex:1},
    {setter: setChassisPunchPhoto, index: 0, key: 'chassisPunchPhoto'},
    {setter: setVinPlatePunchPhoto, index: 0, key: 'vinPlatePhoto'},
    {setter: setRhsViewPhoto, index: 0, key: 'rhsViewPhoto',validationIndex:4},
    {setter: setKeyPunchPhoto, index: 0, key: 'primaryKeyPhoto'},
    {setter: setKeyPunchPhoto, index: 1, key: 'spareKeyPhoto'},
    {setter: setOdometerPhoto, index: 0, key: 'odometerPhoto',validationIndex:6},
    {setter: setInteriorPhoto, index: 0, key: 'interiorPhoto',validationIndex:7},
  ];

  const photoUpdates = [
    {setter: setRcPhoto, index: 0, key: 'rcFrontPhoto',validationIndex:0},
    {setter: setRcPhoto, index: 1, key: 'rcBackPhoto',validationIndex:0},
    {setter: setRcPhoto, index: 2, key: 'rcOthersPhoto'},
    {setter: setInsuracePhoto, index: 0, key: 'insuranceOwnDamagePhoto',validationIndex:1},
    {setter: setInsuracePhoto, index: 1, key: 'insuranceThirdPartyPhoto',validationIndex:1},
    {setter: setInsuracePhoto, index: 2, key: 'insuranceOthersPhoto'},
    {setter: setNOCPhoto, index: 0, key: 'nocPhoto',validationIndex:2},
    {setter: setNOCPhoto, index: 1, key: 'nocOthersPhoto'},

    // {setter: setLhsViewPhoto, index: 0, key: 'lhsViewPhoto'},
    // {setter: setRearViewPhoto, index: 0, key: 'rearViewPhoto'},
    // {setter: setTrunkBootPhoto, index: 0, key: 'trunkBootPhoto'},
    // {setter: setSpareWheelPunchPhoto, index: 0, key: 'spareWheelPhoto'},
    // {setter: setToolkitPunchPhoto, index: 0, key: 'toolKitJackPhoto'},
    // {setter: setRoofPhoto, index: 0, key: 'roofPhoto'},
    // {setter: setUnderChassisPhoto, index: 0, key: 'underChassisPhoto'},
    // {setter: setTyrePunchPhoto, index: 0, key: 'frontTyreLeftPhoto'},
    // {setter: setTyrePunchPhoto, index: 1, key: 'frontTyreRightPhoto'},
    // {setter: setTyrePunchPhoto, index: 2, key: 'rearTyreLeftPhoto'},
    // {setter: setTyrePunchPhoto, index: 3, key: 'rearTyreRightPhoto'},
    // {setter: setBonetPhoto, index: 0, key: 'bonnetPhoto'},
    // {setter: setApronPhoto, index: 0, key: 'apronLeftSidePhoto'},
    // {setter: setApronPhoto, index: 1, key: 'apronRightSidePhoto'},
    // {setter: setSupportMembersPhoto, index: 0, key: 'supportMemberUpperPhoto'},
    // {setter: setSupportMembersPhoto, index: 1, key: 'supportMemberLowerPhoto'},
    // {
    //   setter: setSupportMembersPhoto,
    //   index: 2,
    //   key: 'headLampSupportRightSidePhoto',
    // },
    // {
    //   setter: setSupportMembersPhoto,
    //   index: 3,
    //   key: 'headLampSupportLeftSidePhoto',
    // },
    // {setter: setBumperPhoto, index: 0, key: 'bumperFrontPhoto'},
    // {setter: setBumperPhoto, index: 1, key: 'bumperRearPhoto'},
    // {setter: setWindShieldPhoto, index: 0, key: 'windShieldFrontPhoto'},
    // {setter: setWindShieldPhoto, index: 1, key: 'windShieldRearPhoto'},
    // {setter: setFendersPhoto, index: 0, key: 'fendersLeftSidePhoto'},
    // {setter: setFendersPhoto, index: 1, key: 'fendersRightSidePhoto'},

    // {setter: setPillarsPhoto, index: 0, key: 'pillarARightSidePhoto'},
    // {setter: setPillarsPhoto, index: 1, key: 'pillarBRightSidePhoto'},
    // {setter: setPillarsPhoto, index: 2, key: 'pillarCRightSidePhoto'},
    // {setter: setPillarsPhoto, index: 3, key: 'pillarALeftSidePhoto'},
    // {setter: setPillarsPhoto, index: 4, key: 'pillarBLeftSidePhoto'},
    // {setter: setPillarsPhoto, index: 5, key: 'pillarCLeftSidePhoto'},
    // {setter: setDoorPhoto, index: 0, key: 'doorsFrontLeftSidePhoto'},
    // {setter: setDoorPhoto, index: 1, key: 'doorsRearLeftSidePhoto'},
    // {setter: setDoorPhoto, index: 2, key: 'doorsFrontRightSidePhoto'},
    // {setter: setDoorPhoto, index: 3, key: 'doorsRearRightSidePhoto'},
    // {setter: setRunningBoardPhoto, index: 1, key: 'runningBoardLeftSidePhoto'},
    // {setter: setRunningBoardPhoto, index: 0, key: 'runningBoardRightSidePhoto'},

    // {
    //   setter: setQuarterPanlesPhoto,
    //   index: 0,
    //   key: 'quarterPanelsLeftSidePhoto',
    // },
    // {
    //   setter: setQuarterPanlesPhoto,
    //   index: 1,
    //   key: 'quarterPanelsRightSidePhoto',
    // },

    // {setter: setDickyDoorPhoto, index: 0, key: 'bootPhoto'},
    // {setter: setDickySkirtPhoto, index: 0, key: 'bootSkirtPhoto'},

    // {setter: setWheelTypePhoto, index: 0, key: 'wheelTypePhoto'},

    // {setter: setSuspensionPhoto, index: 0, key: 'strutPhoto'},
    // {setter: setSuspensionPhoto, index: 1, key: 'lowerArmPhoto'},
    // {setter: setSuspensionPhoto, index: 2, key: 'linkRodPhoto'},
    // {setter: setSuspensionPhoto, index: 3, key: 'stabilizerBarPhoto'},
    // {setter: setSuspensionPhoto, index: 4, key: 'shockAbsorberPhoto'},
    // {setter: setSuspensionPhoto, index: 5, key: 'coilSpringPhoto'},
    // {setter: setSuspensionPhoto, index: 6, key: 'leafSpringPhoto'},
    // {setter: setSteeringPhoto, index: 0, key: 'rackAndPinionPhoto'},
    // {setter: setSteeringPhoto, index: 1, key: 'steeringColumnPhoto'},
    // {setter: setSteeringPhoto, index: 2, key: 'hardnessPhoto'},
    // {setter: setSteeringPhoto, index: 3, key: 'ballJointEndPhoto'},
    // {setter: setBrakePhoto, index: 0, key: 'padPhoto'},
    // {setter: setBrakePhoto, index: 1, key: 'discPhoto'},
    // {setter: setBrakePhoto, index: 2, key: 'shoePhoto'},
    // {setter: setBrakePhoto, index: 3, key: 'drumPhoto'},
    // {setter: setBrakePhoto, index: 4, key: 'wheelCylinderPhoto'},
    // {setter: setBrakePhoto, index: 5, key: 'mcBoosterPhoto'},

    // {setter: setTransmissionPhoto, index: 0, key: 'clutchPhoto'},
    // {setter: setTransmissionPhoto, index: 1, key: 'gearShiftingPhoto'},
    // {setter: setTransmissionPhoto, index: 2, key: 'driveShaftPhoto'},
    // {setter: setTransmissionPhoto, index: 3, key: 'axlePhoto'},
    // {setter: setTransmissionPhoto, index: 4, key: 'propellerShaftPhoto'},
    // {setter: setTransmissionPhoto, index: 5, key: 'differentialPhoto'},
    // {setter: setTransmissionPhoto, index: 6, key: 'bearingPhoto'},
    // {setter: setTransmissionPhoto, index: 7, key: 'mountingPhoto'},

    // {setter: setEnginePhoto, index: 0, key: 'smokePhoto'},
    // {setter: setEnginePhoto, index: 1, key: 'turboPhoto'},
    // {setter: setEnginePhoto, index: 2, key: 'misfiringPhoto'},
    // {setter: setEnginePhoto, index: 3, key: 'tappetPhoto'},
    // {setter: setEnginePhoto, index: 4, key: 'knockingPhoto'},
    // {setter: setEnginePhoto, index: 5, key: 'exhaustPhoto'},
    // {setter: setEnginePhoto, index: 6, key: 'beltsPhoto'},
    // {setter: setEnginePhoto, index: 7, key: 'tensionerPhoto'},
    // {setter: setEnginePhoto, index: 8, key: 'mountingPhoto'},
    // {setter: setEnginePhoto, index: 9, key: 'fuelPumpPhoto'},
    // {setter: setEnginePhoto, index: 10, key: 'highPressurePumpPhoto'},
    // {setter: setEnginePhoto, index: 11, key: 'commonrailPhoto'},
    // {setter: setEnginePhoto, index: 12, key: 'injectorPhoto'},
    // {setter: setEnginePhoto, index: 13, key: 'fuelTankPhoto'},
    // {setter: setEnginePhoto, index: 14, key: 'hosePhoto'},
    // {setter: setEnginePhoto, index: 15, key: 'radiatorPhoto'},
    // {setter: setEnginePhoto, index: 16, key: 'fanPhoto'},
    // {setter: setEnginePhoto, index: 17, key: 'overHeatingPhoto'},
    // {setter: setEnginePhoto, index: 18, key: 'allBearingsPhoto'},

    // {setter: setElectricalPhoto, index: 0, key: 'batteryPhoto'},
    // {setter: setElectricalPhoto, index: 1, key: 'alternatorPhoto'},
    // {setter: setElectricalPhoto, index: 2, key: 'selfMotorPhoto'},
    // {setter: setElectricalPhoto, index: 3, key: 'wiringHarnessPhoto'},
    // {setter: setElectricalPhoto, index: 4, key: 'ecmPhoto'},
    // {setter: setElectricalPhoto, index: 5, key: 'allSensorsPhoto'},
    // {setter: setElectricalPhoto, index: 6, key: 'wiperMotorPhoto'},
    // {setter: setElectricalPhoto, index: 7, key: 'clusterPhoto'},
    // {setter: setElectricalPhoto, index: 8, key: 'headLightsAndDrlPhoto'},
    // {setter: setElectricalPhoto, index: 9, key: 'tailLightPhoto'},
    // {setter: setElectricalPhoto, index: 10, key: 'cabinLightPhoto'},
    // {setter: setElectricalPhoto, index: 11, key: 'combinationSwitchPhoto'},
    // {setter: setElectricalPhoto, index: 12, key: 'absPhoto'},
    // {setter: setElectricalPhoto, index: 13, key: 'airBagPhoto'},
    // {setter: setElectricalPhoto, index: 14, key: 'powerWindowsPhoto'},

    // {setter: setAcPhoto, index: 0, key: 'coolingPhoto'},
    // {setter: setAcPhoto, index: 1, key: 'blowerCondenserPhoto'},
    // {setter: setAcPhoto, index: 2, key: 'fanPhoto'},
    // {setter: setAcPhoto, index: 3, key: 'controlSwitchPhoto'},
    // {setter: setAcPhoto, index: 4, key: 'ventPhoto'},

    // {setter: setAccessoriesPhoto, index: 0, key: 'musicSystemPhoto'},
    // {setter: setAccessoriesPhoto, index: 1, key: 'parkingSensorPhoto'},
    // {setter: setAccessoriesPhoto, index: 2, key: 'reverseCameraPhoto'},
    // {setter: setAccessoriesPhoto, index: 3, key: 'ovrmAdjusterPhoto'},
    // {setter: setAccessoriesPhoto, index: 4, key: 'seatHeightAdjusterPhoto'},
    // {setter: setAccessoriesPhoto, index: 5, key: 'seatBeltPhoto'},
    // {setter: setAccessoriesPhoto, index: 6, key: 'sunRoofPhoto'},
    // {setter: setAccessoriesPhoto, index: 7, key: 'roofRailPhoto'},
    // {setter: setAccessoriesPhoto, index: 8, key: 'spoilerPhoto'},
    // {setter: setAccessoriesPhoto, index: 9, key: 'skirtPhoto'},
    // {setter: setAccessoriesPhoto, index: 10, key: 'steeringControlsPhoto'},
  ];

  const [dealerIdNumber,setDealerIdNumber]=useState("")

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


  const updateIndexValue = (index, value) => {
    setDealerIdNumbers(prevState => {
      const newState = [...prevState];
      newState[index] = value;
      return newState;
    });
  };

  const updateIndexValue1 = (index, value) => {
    setSpareWheelIdNumber(prevState => {
      const newState = [...prevState];
      newState[index] = value;
      return newState;
    });
  };

  const setVehicleData = data => {
    // transmission: getSwitchType(selectedOption),
    // fuelType: getFuelType(selectedOption1),
    // alteration: getCngType(selectedOption2),
    console.log(data.roadTaxValid, 'log hypotherticated');
    updateIndexValue(0,data.dealerId)
    updateIndexValue(1,data.dealerId)
    updateIndexValue(2,data.dealerId)
    updateIndexValue(3,data.dealerId)
    updateIndexValue1(0,data.dealerId)
    setDealerIdNumber(data.dealerId);
    setMake(data.make);
    setModel(data.model);
    setYear(data.year);
    setVariant(data.variant);
    setMileage(data.mileage);
    setColor(data.color);
    setSelectedOption(data.transmission === 'Automatic' ? 1 :data.transmission==='Manual'?2:"");
    setSelectedOption1(
      data.fuelType === 'Diesel'
        ? 1
        : data.fuelType === 'Petrol'
        ? 2
        : data.fuelType === 'EV'
        ? 3
        : data.fuelType === 'CNG'
        ? 4
        : 5,
    );
   
    setChooseAlteration(data.alteration==="Yes"?1:data.alteration==="No"?2:"")
   
    setSelectedOption2(data.alteration==="CNG"?1:data.alteration==="LPG"?2:data.alteration===""?"":3)
    setOwners(data.owners);
    setSelectedOption3(data.hasHypothecated === 'Yes' ? 1 : data.hasHypothecated==="No"?  2:"");
    setHypothecatedBy(data.hypothecatedBy);
    setSelectedOption4(data.noc === 'Yes' ? 1 : data.noc==="No"? 2:"");
    setRoadTaxValid(data.roadTaxValid);
  // setRoadTaxValid("2033-03-19 00:00:00")
    setSelectedOption5(data.reRegistered === 'Yes' ? 1 :data.reRegistered==='No'? 2:"");
    setCubicCapacity(data.cubicCapacity);
    // setNumberOfSeats(data.numberOfSeats);
    // setRegistrationType(data.registrationType);
    // setRegistrationDate(data.registrationDate);
    // setInsurance(data.insurance === 'No' ? 2 : 1);
    // setInsuranceCompany(data.insuranceCompany);
    // setInsuranceValidity(data.insuranceValidity);
    // setChallanDetails(data.challanDetails);
    // setBlacklisted(data.blacklisted === 'No' ? 2 : 1);
    // setChassisNumber(data.chassisNumber);
    // setEngineNumber(data.engineNumber);
    // setRcStatus(data.rcStatus === 'Original' ? 1 : 2);
    // setStateNoc(data.stateNoc === 'No' ? 2 : 1);
    // setFlood(data.flood === 'No' ? 2 : 1);
  };

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('-');
    const monthIndex = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ].indexOf(month);
  
    if (monthIndex === -1) return null;
  
    return new Date(year, monthIndex, day);
  };
  
  const setVehicleOneData = data => {

  
    setNumberOfSeats(data.numberOfSeats);
    setRegistrationType(data.registrationType);
    setRegistrationDate(data.registrationDate);
    setSelectedOption6(data.insurance === 'No' ? 2 : data.insurance==="Yes"?1:"");
    setInsuranceCompany(data.insuranceCompany);
    setInsuranceValidity(data.insuranceValidity);
    setChallanDetails(data.challanDetails);
    setSelectedOption7(data.blacklisted === 'No' ? 2 :data.blacklisted==="Yes"? 1:"");
    setChassisNumber(data.chassisNumber);
    setEngineNumber(data.engineNumber);
    setSelectedOption8(data.rcStatus === 'Original' ? 1 :data.rcStatus===""?"": 2)
   
    setSelectedOption9(data.stateNoc === 'No' ? 2 : data.stateNoc==="Yes"? 1:"");
    setSelectedOption10(data.flood === 'No' ? 2 :data.flood==="Yes"? 1:"");
  };

  // setMake(response.data.make);
  // setModel(response.data.model);
  // setYear(response.data.year);
  // setVariant(response.data.variant);
  // setMileage(response.data.mileage);
  // setColor(response.data.color);
  // setSelectedOption(response.data.transmission === 'Automatic' ? 1 : 2);
  // setSelectedOption1(
  //   response.data.fuelType === 'Diesel'
  //     ? 1
  //     : response.data.fuelType === 'Petrol'
  //     ? 2
  //     : response.data.fuelType === 'EV'
  //     ? 3
  //     : response.data.fuelType === 'CNG'
  //     ? 4
  //     : 5,
  // );
  // setOwners(response.data.owners);
  // setSelectedOption2(response.data.hasHypothecated === 'No' ? 2 : 1);
  // setHypothecatedBy(response.data.hypothecatedBy);
  // setSelectedOption3(response.data.noc === 'No' ? 2 : 1);
  // setRoadTaxValid(response.data.roadTaxValid);
  // setSelectedOption4(response.data.reRegistered === 'No' ? 2 : 1);
  // setCubicCapacity(response.data.cubicCapacity);
  // setNumberOfSeats(response.data.numberOfSeats);
  // setRegistrationType(response.data.registrationType);
  // setRegistrationDate(response.data.registrationDate);
  // setInsurance(response.data.insurance === 'No' ? 2 : 1);
  // setInsuranceCompany(response.data.insuranceCompany);
  // setInsuranceValidity(response.data.insuranceValidity);
  // setChallanDetails(response.data.challanDetails);
  // setBlacklisted(response.data.blacklisted == 'No' ? 2 : 1);
  // setChassisNumber(response.data.chassisNumber);
  // setEngineNumber(response.data.engineNumber);
  // setRcStatus(response.data.rcStatus === 'Original' ? 1 : 2);
  // setStateNoc(response.data.stateNoc === 'No' ? 2 : 1);
  // setFlood(response.data.flood === 'No' ? 2 : 1);

  const getOrder = async () => {
    console.log('loading and loading');
    const itemId = await getItem('dealarId');

    console.log(itemId, 'DEALER ID IS THRERE.........');
    setRefreshing(true);
    try {
      const response = await apiGetWithToken(`getOneOrder?id=${id}`);

      setVehicleData(response.data);
      //dispatch(storeOrderData(response.data));

      // setRcRemarks(response?.data?.rcRemarks);
      // setInsuranceRemarks(response?.data?.insuranceRemarks);
      // setNocRemarks(response?.data?.nocRemarks);

      // photoUpdates.forEach(({setter, index, key}) => {
      //   updatePhotoState(setter, index, response.data[key] || '');
      // });

      // remarksUpdates.forEach(({setter, index, key}) => {
      //   updatePhotoState(setter, index, response.data[key] || '');
      // });

      // conditionUpdates.forEach(({setter, index, key}) => {
      //   updatePhotoState(setter, index, response.data[key] || '');
      // });

      // stateUpdates.forEach(({setter, index, key}) => {
      //   updateSwitchState(setter, index, response.data[key] || '');
      // });

      setRefreshing(false);
      // setLoading(false);
      console.log(response.data, 'COUNT INNDIA');
    } catch (error) {
      console.error('GET error:', error);
    }
  };

  const getOneOrder = async () => {
    console.log('loading and loading');
    setRefreshing(true);
    try {
      const response = await apiGetWithToken(`getOneOrder?id=${id}`);

      setVehicleOneData(response.data);
      //dispatch(storeOrderData(response.data));

      // setRcRemarks(response?.data?.rcRemarks);
      // setInsuranceRemarks(response?.data?.insuranceRemarks);
      // setNocRemarks(response?.data?.nocRemarks);

      // photoUpdates.forEach(({setter, index, key}) => {
      //   updatePhotoState(setter, index, response.data[key] || '');
      // });

      // remarksUpdates.forEach(({setter, index, key}) => {
      //   updatePhotoState(setter, index, response.data[key] || '');
      // });

      // conditionUpdates.forEach(({setter, index, key}) => {
      //   updatePhotoState(setter, index, response.data[key] || '');
      // });

      // stateUpdates.forEach(({setter, index, key}) => {
      //   updateSwitchState(setter, index, response.data[key] || '');
      // });

      setRefreshing(false);
      // setLoading(false);
      console.log(response.data, 'COUNT INNDIA');
    } catch (error) {
      console.error('GET error:', error);
    }
  };



  const photoLists = [rcList, insuranceList, nocList];

  const getTwoOrder = async () => {
    console.log('loading and loading');
    setRefreshing(true);
    try {
      const response = await apiGetWithToken(`getOneOrder?id=${id}`);

      // setVehicleOneData(response.data);
      //dispatch(storeOrderData(response.data));

          // Log specific photo URLs to check if they exist
    

    

      setRcRemarks(response?.data?.rcRemarks);
      setInsuranceRemarks(response?.data?.insuranceRemarks);
      setNocRemarks(response?.data?.nocRemarks);

      photoUpdates.forEach(({setter, index, key,validationIndex}) => {
        updatePhotoState(setter, index, response.data[key] || '',validationIndex,setValidations);
      });

    

      // remarksUpdates.forEach(({setter, index, key}) => {
      //   updatePhotoState(setter, index, response.data[key] || '');
      // });

      // conditionUpdates.forEach(({setter, index, key}) => {
      //   updatePhotoState(setter, index, response.data[key] || '');
      // });

      // stateUpdates.forEach(({setter, index, key}) => {
      //   updateSwitchState(setter, index, response.data[key] || '');
      // });

      setRefreshing(false);
      // setLoading(false);
     
    } catch (error) {
      console.error('GET error:', error);
    }
  };

 
  

  const getThreeOrder = async () => {
    console.log('loading and loading');
    setRefreshing(true);
    try {
      const response = await apiGetWithToken(`getOneOrder?id=${id}`);
      

      photoUpdates1.forEach(({setter, index, key,validationIndex}) => {
        updatePhotoState(setter, index, response.data[key] || '',validationIndex,setCarPhotoValidations);
      });

      remarksUpdates.forEach(({setter, index, key}) => {
        updatePhotoState(setter, index, response.data[key] || '');
      });

      conditionUpdates.forEach(({setter, index, key}) => {
        updatePhotoState(setter, index, response.data[key] || '');
      });

      stateUpdates.forEach(({setter, index, key,validationIndex}) => {
        updateSwitchState(setter, index, response.data[key] || '',validationIndex,setCarPhotoValidations);
      });

      setRefreshing(false);
      // setLoading(false);
      console.log(response.data, 'COUNT INNDIA');
    } catch (error) {
      console.error('GET error:', error);
    }
  };

  const getFourOrder = async () => {
    console.log('loading and loading');
    setRefreshing(true);
    try {
      const response = await apiGetWithToken(`getOneOrder?id=${id}`);

      photoUpdates2.forEach(({setter, index, key,carValidation}) => {
        updatePhotoState(setter, index, response.data[key] || '',carValidation,setCarDetailsValidation);
      });

      remarksUpdates1.forEach(({setter, index, key}) => {
        updatePhotoState(setter, index, response.data[key] || '');
      });
    
    

      conditionUpdates1.forEach(({setter, index, key}) => {
        updatePhotoState(setter, index, response.data[key] || '');
      });

      stateUpdates1.forEach(({setter, index, key,validationIndex}) => {
        updateSwitchState(setter, index, response.data[key] || '',validationIndex,setCarDetailsValidation);
      });

      setRefreshing(false);
      // setLoading(false);
      console.log(response.data, 'COUNT INNDIA');
    } catch (error) {
      console.error('GET error:', error);
    }
  };

  const getFifthOrder = async () => {
    console.log('loading and loading');
    setRefreshing(true);
    try {
      const response = await apiGetWithToken(`getOneOrder?id=${id}`);

      photoUpdates3.forEach(({setter, index, key}) => {
        updatePhotoState(setter, index, response.data[key] || '');
      });

      remarksUpdates2.forEach(({setter, index, key}) => {
        updatePhotoState(setter, index, response.data[key] || '');
      });

      conditionUpdate2.forEach(({setter, index, key}) => {
        updatePhotoState(setter, index, response.data[key] || '');
      });

      stateUpdates2.forEach(({setter, index, key,thirdValidation}) => {
        updateSwitchState(setter, index, response.data[key] || '',thirdValidation,setThirdValidation);
      });

      setRefreshing(false);
      // setLoading(false);
      console.log(response.data, 'COUNT INNDIA');
    } catch (error) {
      console.error('GET error:', error);
    }
  };

  const getSixthOrder = async () => {
    console.log('loading and loading');
    setRefreshing(true);
    try {
      const response = await apiGetWithToken(`getOneOrder?id=${id}`);


      var validationIndex=9;
      if (validationIndex !== undefined) {
        setSecondValidation(prevState => {
          const newValidations = [...prevState];
          newValidations[validationIndex] = !!response?.data?.roadTestRemarks; // Set true if URL is not empty
          return newValidations;
        });
      }


      setRoadTestRemarks(response?.data?.roadTestRemarks)

      photoUpdates4.forEach(({setter, index, key}) => {
        updatePhotoState(setter, index, response.data[key] || '');
      });

      remarksUpdates3.forEach(({setter, index, key}) => {
        updatePhotoState(setter, index, response.data[key] || '');
      });

      conditionUpdates3.forEach(({setter, index, key}) => {
        updatePhotoState(setter, index, response.data[key] || '');
      });

      statusUpdates3.forEach(({setter, index, key,secondValidation}) => {
        updateSwitchState(setter, index, response.data[key] || '',secondValidation,setSecondValidation);
      });

      setRefreshing(false);
      // setLoading(false);
      console.log(response.data, 'COUNT INNDIA');
    } catch (error) {
      console.error('GET error:', error);
    }
  };
  // const updatePhotoState = (stateSetter, index, url) => {

  //   stateSetter(prevState => {
  //     const newState = [...prevState];
  //     newState[index] = url;
  //     return newState;
  //   });
  // };

  // const updatePhotoState = useMemo(() => {
  //   return (stateSetter, index, url,validationIndex,setterValidation) => {

  //     console.log(setterValidation,"setter valiuyggfyfyyf");
  //     stateSetter(prevState => {
  //       const newState = [...prevState];
  //       newState[index] = url;
  //       return newState;
  //     });

  //     setterValidation(prevState => {
  //       const newValidations = [...prevState];
  //       newValidations[validationIndex] = !!url; // Set true if URL is not empty
  //       return newValidations;
  //     });
  //   };
  // }, []);

  const updatePhotoState = useMemo(() => {
    return (stateSetter, index, url, validationIndex, setterValidation) => {
      stateSetter(prevState => {
        const newState = [...prevState];
        newState[index] = url;
        return newState;
      });
      console.log(validationIndex,"vvvvvvvvvvvvvv");

      if (validationIndex !== undefined) {
        setterValidation(prevState => {
          const newValidations = [...prevState];
          newValidations[validationIndex] = !!url; // Set true if URL is not empty
          return newValidations;
        });
      }
    };
  }, []);

  const updateSwitchState = useMemo(() => {
    return (stateSetter, index, url,validationIndex,setterValidation) => {
      stateSetter(prevState => {
        const newState = [...prevState];
        if (url === 'Ok' || url === 'Not Available') {
          newState[index] = 1;
        } else if (url === 'Not Ok' || url === 'Available') {
          newState[index] = 2;
        }

        else if(url ==="Alloy") {
          newState[index] =1;
        }

        else if(url==="Drum") {
          newState[index]=2;
        }
        
        else {
          newState[index] = url;
        }
        return newState;
      });
      if (validationIndex !== undefined) {
        setterValidation(prevState => {
          const newValidations = [...prevState];
          newValidations[validationIndex] = !!url; // Set true if URL is not empty
          return newValidations;
        });
      }
    };
  }, []);

  return (
    <>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => handleOkPress()}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => handleClose(1)}>
              <Text style={{textAlign: 'right', marginRight: 8}}>Close</Text>
            </TouchableOpacity>

            <ScrollView
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}>
              <View style={{paddingHorizontal: 0}}>
                {selectedContainerIndex === 0 &&
                  rcList.map((item, index) => (
                    <View key={index} style={styles.itemContainer1}>
                      <Text>{item}</Text>

                      {rcPhoto[index] && (
                        <View stylle={{position: 'relative'}}>
                          <Image
                            source={{uri: rcPhoto[index]}}
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
                            onPress={() => handleCarDocumentsClosePress(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}

                      <View style={{marginTop: 0}}>
                        {!rcPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCamaraForCarDocuments(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedContainerIndex === 1 &&
                  insuranceList.map((item, index) => (
                    <View key={index} style={styles.itemContainer1}>
                      <Text>{item}</Text>

                      {insurancePhoto[index] && (
                        <View stylle={{position: 'relative'}}>
                          <Image
                            source={{uri: insurancePhoto[index]}}
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
                            onPress={() => handleCarDocumentsClosePress(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}

                      <View style={{marginTop: 0}}>
                        {!insurancePhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCamaraForCarDocuments(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedContainerIndex === 2 &&
                  nocList.map((item, index) => (
                    <View key={index} style={styles.itemContainer1}>
                      <Text>{item}</Text>

                      {nocPhoto[index] && (
                        <View stylle={{position: 'relative'}}>
                          <Image
                            source={{uri: nocPhoto[index]}}
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
                            onPress={() => handleCarDocumentsClosePress(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}

                      <View style={{marginTop: 0}}>
                        {!nocPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCamaraForCarDocuments(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}

                {selectedContainerIndex === 0 && (
                  <View style={{marginTop: 10, paddingHorizontal: 8}}>
                    {/* <Text>{item}</Text> */}
                    <TextInput
                      style={styles.photoInput}
                      placeholder={`Enter the RC remarks`}
                      value={rcRemarks}
                      onChangeText={text => setRcRemarks(text)}
                    />
                  </View>
                )}

                {selectedContainerIndex === 1 && (
                  <View style={{marginTop: 10, paddingHorizontal: 8}}>
                    {/* <Text>{item}</Text> */}
                    <TextInput
                      style={styles.photoInput}
                      placeholder={`Enter the Insurance Remarks`}
                      value={insuranceRemarks}
                      onChangeText={text => setInsuranceRemarks(text)}
                    />
                  </View>
                )}

                {selectedContainerIndex === 2 && (
                  <View style={{marginTop: 10, paddingHorizontal: 8}}>
                    {/* <Text>{item}</Text> */}
                    <TextInput
                      style={styles.photoInput}
                      placeholder={`Enter the NOC remarks`}
                      value={nocRemarks}
                      onChangeText={text => setNocRemarks(text)}
                    />
                  </View>
                )}
              </View>

              <View style={{paddingHorizontal: 8, marginTop: 10}}>
                <CustomButton title="Submit" onPress={() => handleOkPress()} />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={modalVisible1}
        animationType="slide"
        transparent={true}
        onRequestClose={() => handleOkPressCarPhotos()}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => handleClose(2)}>
              <Text style={{textAlign: 'right', marginRight: 8}}>Close</Text>
            </TouchableOpacity>

            <ScrollView
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}>
              {/* {photoUrisCarPhotos[selectedContainerIndex1] ? (
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
                        top: 20,
                        right: 0,
                        backgroundColor: 'black',
                    
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

                  <View>
                
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
              <View style={{paddingHorizontal: 12, marginTop: 12}}>
                <TextInput
                  style={styles.photoInput}
                  placeholder="Enter remarks"
                  value={carPhotosRemarks[selectedContainerIndex1]}
                  onChangeText={text =>
                    handleRemarksChangeCarPhotos(text, selectedContainerIndex1)
                  }
                />
              </View> */}

              <View style={{paddingHorizontal: 0}}>
                {selectedContainerIndex1 === 0 &&
                  frontViewList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      {frontViewPhoto[index] && (
                        <View stylle={{position: 'relative'}}>
                          <Image
                            source={{uri: frontViewPhoto[index]}}
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
                            onPress={() => handleCamera4(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}

                      <View style={{marginTop: 0}}>
                        {!frontViewPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCamera4(index)}>
                            <Text>{`${item} Photo`}</Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={frontViewRemarks[index]}
                          onChangeText={text => handleRemarks4(text, index)}
                        />
                      </View>
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedContainerIndex1 === 1 &&
                  engineRoomList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      {engineRoomPhoto[index] && (
                        <View stylle={{position: 'relative'}}>
                          <Image
                            source={{uri: engineRoomPhoto[index]}}
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
                            onPress={() => handleCamera4(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}

                      <View style={{marginTop: 0}}>
                        {!engineRoomPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCamera4(index)}>
                            <Text>{item + 'Photo'}</Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={engineRoomRemarks[index]}
                          onChangeText={text => handleRemarks4(text, index)}
                        />
                      </View>
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedContainerIndex1 === 2 &&
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
                          selectionMode={chassisSwitch[index]}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val => handleSwitch4(index, val)}
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {chassisPunchPhoto[index] && (
                        <View style={{position: 'relative'}}>
                          <Image
                            source={{uri: chassisPunchPhoto[index]}}
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
                            onPress={() => handleCamera4(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                      {/* {(chassisSwitch.length ===0 || chassisSwitch[0] === 2) && (
                     // <> */}
                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={chassisRemarks[index]}
                          onChangeText={text => handleRemarks4(text, index)}
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={chassisCondition[index]}
                          onValueChange={itemValue =>
                            handleDropDown4(itemValue, index)
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
                            onPress={() => openCamera4(index)}>
                            <Text>{`${item} Photo`}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                      {/* </> */}

                      {/* )} */}
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedContainerIndex1 === 3 &&
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
                          selectionMode={vinPlateSwitch[index]}
                          roundCorner={false}
                          option1={'Ok'}
                          option2={'Not Ok'}
                          onSelectSwitch={val => handleSwitch4(index, val)}
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {vinPlatePunchPhoto[index] && (
                        <View style={{position: 'relative'}}>
                          <Image
                            source={{uri: vinPlatePunchPhoto[index]}}
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
                            onPress={() => handleCamera4(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                      {/* {(vinPlateSwitch.length ===0 || vinPlateSwitch[0] === 2) && (
                  <> */}
                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={vinPlateRemarks[index]}
                          onChangeText={text => handleRemarks4(text, index)}
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={vinPlateCondition[index]}
                          onValueChange={itemValue =>
                            handleDropDown4(itemValue, index)
                          }>
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Damaged" value="Damaged" />
                          <Picker.Item label="Missing" value="Missing" />

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!vinPlatePunchPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCamera4(index)}>
                            <Text>{`${item} Photo`}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                      {/* </>
                )} */}
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedContainerIndex1 === 4 &&
                  rhsView.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      {rhsViewPhoto[index] && (
                        <View stylle={{position: 'relative'}}>
                          <Image
                            source={{uri: rhsViewPhoto[index]}}
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
                            onPress={() => handleCamera4(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}

                      <View style={{marginTop: 0}}>
                        {!rhsViewPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCamera4(index)}>
                            <Text>{`${item} Photo`}</Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={rhsViewRemarks[index]}
                          onChangeText={text => handleRemarks4(text, index)}
                        />
                      </View>
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedContainerIndex1 === 5 &&
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
                          selectionMode={keySwitch[index]}
                          roundCorner={false}
                          option1={'Not Available'}
                          option2={'Available'}
                          onSelectSwitch={val => handleSwitch4(index, val)}
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>
                      {keyPunchPhoto[index] && (
                        <View style={{position: 'relative'}}>
                          <Image
                            source={{uri: keyPunchPhoto[index]}}
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
                            onPress={() => handleCamera4(index)}>
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
                          value={keyRemarks[index]}
                          onChangeText={text => handleRemarks4(text, index)}
                        />
                      </View>
                      <View style={{marginTop: 14}}>
                        <Picker
                          style={styles.photoInput}
                          selectedValue={keyCondition[index]}
                          onValueChange={itemValue =>
                            handleDropDown4(itemValue, index)
                          }>
                          <Picker.Item label="Select Condition" value="" />
                          <Picker.Item label="Good" value="Good" />
                          <Picker.Item label="Damaged" value="Damaged" />

                          {/* Add other items as needed */}
                        </Picker>
                      </View>
                      <View style={{marginTop: 14}}>
                        {!keyPunchPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCamera4(index)}>
                            <Text>{`${item} Photo`}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedContainerIndex1 === 6 &&
                  odometerList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      {odometerPhoto[index] && (
                        <View stylle={{position: 'relative'}}>
                          <Image
                            source={{uri: odometerPhoto[index]}}
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
                            onPress={() => handleCamera4(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}

                      <View style={{marginTop: 0}}>
                        {!odometerPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCamera4(index)}>
                            <Text>{`${item} Photo`}</Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={odometerRemarks[index]}
                          onChangeText={text => handleRemarks4(text, index)}
                        />
                      </View>
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedContainerIndex1 === 7 &&
                  interiorList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Text>{item}</Text>

                      {interiorPhoto[index] && (
                        <View stylle={{position: 'relative'}}>
                          <Image
                            source={{uri: interiorPhoto[index]}}
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
                            onPress={() => handleCamera4(index)}>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}

                      <View style={{marginTop: 0}}>
                        {!interiorPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCamera4(index)}>
                            <Text>{`${item} Photo`}</Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={interiorRemarks[index]}
                          onChangeText={text => handleRemarks4(text, index)}
                        />
                      </View>
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 8, marginTop: 20}}>
                <CustomButton
                  title="Submit"
                  onPress={() => handleOkPressCarPhotos()}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={reinspectorPage}
        animationType="slide"
        transparent={true}
        onRequestClose={() => handleOkReinspector()}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => handleClose(3)}>
              <Text style={{textAlign: 'right', marginRight: 8}}>Close</Text>
            </TouchableOpacity>

            <ScrollView
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}>
              {reinspectorPhoto[carIndex8] ? (
                <View style={{paddingHorizontal: 12, marginTop: 12}}>
                  <View style={{position: 'relative'}}>
                    <Image
                      source={{
                        uri: reinspectorPhoto[carIndex8],
                      }}
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
                      onPress={() => handleCloseReinspectorPhotos(carIndex8)}>
                      <Text style={{fontSize: 14, color: 'white'}}>Cancel</Text>
                    </TouchableOpacity>
                  </View>

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
                    onPress={() => openCameraReinspector()}>
                    <Text>{reinspectorList[carIndex8]}</Text>
                  </TouchableOpacity>
                </View>
              )}
              <View style={{paddingHorizontal: 12, marginTop: 12}}>
                <TextInput
                  style={styles.photoInput}
                  placeholder="Enter remarks"
                  value={reinspectorRemarks[carIndex8]}
                  onChangeText={text =>
                    handleReinspectorRemarks(text, carIndex8)
                  }
                />
              </View>

              <View style={{paddingHorizontal: 8, marginTop: 20}}>
                <CustomButton
                  title="Submit"
                  onPress={() => handleOkReinspector()}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={inspectionVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => handleInspectionOkPress()}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => handleClose(4)}>
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
                          // selectionMode={item}
                          selectionMode={suspensionSwitch[index]}
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
                      {(suspensionSwitch.length === 0 ||
                        suspensionSwitch[index] === 2) &&
                        suspensionDropdown[index] !== 'Not Available' &&
                        suspensionPhoto[index] && (
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

                      {(suspensionSwitch.length === 0 ||
                        suspensionSwitch[index] === 2) && (
                        <>
                          {suspensionDropdown[index] !== 'Not Available' && (
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
                          )}
                          <View style={{marginTop: 14}}>
                            <Picker
                              style={styles.photoInput}
                              selectedValue={suspensionDropdown[index]}
                              onValueChange={itemValue =>
                                handleSuspensionDropDownChange(itemValue, index)
                              }>
                              <Picker.Item label="Select Condition" value="" />

                              <Picker.Item
                                label={
                                  index == 0
                                    ? 'Noise'
                                    : index == 1
                                    ? 'Noise'
                                    : index == 2
                                    ? 'Noise'
                                    : index == 3
                                    ? 'Noise'
                                    : index == 4
                                    ? 'Noise'
                                    : index == 5
                                    ? 'Noise'
                                    : 'Noise'
                                }
                                value={
                                  index == 0
                                    ? 'Noise'
                                    : index == 1
                                    ? 'Noise'
                                    : index == 2
                                    ? 'Noise'
                                    : index == 3
                                    ? 'Noise'
                                    : index == 4
                                    ? 'Noise'
                                    : index == 5
                                    ? 'Noise'
                                    : 'Noise'
                                }
                              />
                              <Picker.Item
                                label={
                                  index == 0
                                    ? 'Leake'
                                    : index == 1
                                    ? 'Damaged'
                                    : index == 2
                                    ? 'Damaged'
                                    : index == 3
                                    ? 'Damaged'
                                    : index == 4
                                    ? 'Leake'
                                    : index == 5
                                    ? 'Damaged'
                                    : 'Damaged'
                                }
                                value={
                                  index == 0
                                    ? 'Leake'
                                    : index == 1
                                    ? 'Damaged'
                                    : index == 2
                                    ? 'Damaged'
                                    : index == 3
                                    ? 'Damaged'
                                    : index == 4
                                    ? 'Leake'
                                    : index == 5
                                    ? 'Damaged'
                                    : 'Damaged'
                                }
                              />
                              <Picker.Item
                                label={
                                  index == 0
                                    ? 'Damaged'
                                    : index === 1
                                    ? ' '
                                    : index == 2
                                    ? ''
                                    : index == 3
                                    ? ''
                                    : index == 4
                                    ? 'Damaged'
                                    : index == 5
                                    ? 'Not Available'
                                    : 'Not Available'
                                }
                                value={
                                  index == 0
                                    ? 'Damaged'
                                    : index === 1
                                    ? ""
                                    : index == 2
                                    ? ''
                                    : index == 3
                                    ? ''
                                    : index == 4
                                    ? 'Damaged'
                                    : index == 5
                                    ? 'Not Available'
                                    : 'Not Available'
                                }
                              />

                              {/* Add other items as needed */}
                            </Picker>
                          </View>

                          {suspensionDropdown[index] !== 'Not Available' && (
                            <View style={{marginTop: 14}}>
                              {!suspensionPhoto[index] && (
                                <TouchableOpacity
                                  style={styles.photoInput}
                                  onPress={() =>
                                    openCameraForInspection(index)
                                  }>
                                  <Text>{`${item} Photo`}</Text>
                                </TouchableOpacity>
                              )}
                            </View>
                          )}
                        </>
                      )}
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
                          selectionMode={steeringSwitch[index]}
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
                      {(steeringSwitch.length === 0 ||
                        steeringSwitch[index] === 2) && (
                        <>
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
                                onPress={() =>
                                  handleSuspensionClosePress(index)
                                }>
                                <Text style={{fontSize: 14, color: 'white'}}>
                                  Cancel
                                </Text>
                              </TouchableOpacity>
                            </View>
                          )}
                        </>
                      )}

                      {(steeringSwitch.length === 0 ||
                        steeringSwitch[index] === 2) && (
                        <>
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
                              <Picker.Item
                                label={
                                  index == 0
                                    ? 'Noise'
                                    : index == 1
                                    ? 'Noise'
                                    : index == 2
                                    ? 'Need to OH'
                                    : 'Noise'
                                }
                                value={
                                  index == 0
                                    ? 'Noise'
                                    : index == 1
                                    ? 'Noise'
                                    : index == 2
                                    ? 'Need to OH'
                                    : 'Noise'
                                }
                              />
                              <Picker.Item
                                label={
                                  index == 0
                                    ? 'Damaged'
                                    : index == 1
                                    ? 'Damaged'
                                    : index == 2
                                    ? 'PS motor not working'
                                    : 'Damaged'
                                }
                                value={
                                  index == 0
                                    ? 'Damaged'
                                    : index == 1
                                    ? 'Damaged'
                                    : index == 2
                                    ? 'PS motor not working'
                                    : 'Damaged'
                                }
                              />

                              {/* Add other items as needed */}
                            </Picker>
                          </View>
                          <View style={{marginTop: 14}}>
                            {!steeringPhoto[index] && (
                              <TouchableOpacity
                                style={styles.photoInput}
                                onPress={() => openCameraForInspection(index)}>
                                <Text>{`${item} Photo`}</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </>
                      )}
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
                          selectionMode={brakeSwitch[index]}
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
                      {(brakeSwitch.length === 0 || brakeSwitch[index] === 2) &&
                        brakeDropdown[index] !== 'Not Available' &&
                        brakePhoto[index] && (
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

                      {(brakeSwitch.length === 0 ||
                        brakeSwitch[index] === 2) && (
                        <>
                          {brakeDropdown[index] !== 'Not Available' && (
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
                          )}
                          <View style={{marginTop: 14}}>
                            <Picker
                              style={styles.photoInput}
                              selectedValue={brakeDropdown[index]}
                              onValueChange={itemValue =>
                                handleSuspensionDropDownChange(itemValue, index)
                              }>
                              <Picker.Item label="Select Condition" value="" />
                              <Picker.Item
                                label={
                                  index == 0
                                    ? 'Noise'
                                    : index == 1
                                    ? 'Noise'
                                    : index == 2
                                    ? 'Noise'
                                    : index == 3
                                    ? 'Noise'
                                    : index == 4
                                    ? 'Leake'
                                    : 'Leake'
                                }
                                value={
                                  index == 0
                                    ? 'Noise'
                                    : index == 1
                                    ? 'Noise'
                                    : index == 2
                                    ? 'Noise'
                                    : index == 3
                                    ? 'Noise'
                                    : index == 4
                                    ? 'Leake'
                                    : 'Leake'
                                }
                              />
                              <Picker.Item
                                label={
                                  index == 0
                                    ? 'Needs to Replace'
                                    : index == 1
                                    ? 'Needs to Replace'
                                    : index == 2
                                    ? 'Needs to Replace'
                                    : index == 3
                                    ? 'Needs to Replace'
                                    : index == 4
                                    ? 'Jam'
                                    : 'Jam'
                                }
                                value={
                                  index == 0
                                    ? 'Needs to Replace'
                                    : index == 1
                                    ? 'Needs to Replace'
                                    : index == 2
                                    ? 'Needs to Replace'
                                    : index == 3
                                    ? 'Needs to Replace'
                                    : index == 4
                                    ? 'Jam'
                                    : 'Jam'
                                }
                              />
                              <Picker.Item
                                label={
                                  index == 0
                                    ? 'Not Available'
                                    : index == 1
                                    ? 'Not Available'
                                    : index == 2
                                    ? 'Not Available'
                                    : index == 3
                                    ? 'Not Available'
                                    : ''
                                }
                                value={
                                  index == 0
                                    ? 'Not Available'
                                    : index == 1
                                    ? 'Not Available'
                                    : index == 2
                                    ? 'Not Available'
                                    : index == 3
                                    ? 'Not Available'
                                    : ''
                                }
                              />

                              {/* Add other items as needed */}
                            </Picker>
                          </View>
                          {brakeDropdown[index] !== 'Not Available' && (
                            <View style={{marginTop: 14}}>
                              {!brakePhoto[index] && (
                                <TouchableOpacity
                                  style={styles.photoInput}
                                  onPress={() =>
                                    openCameraForInspection(index)
                                  }>
                                  <Text>{`${item} Photo`}</Text>
                                </TouchableOpacity>
                              )}
                            </View>
                          )}
                        </>
                      )}
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
                          marginTop: 5,
                        }}>
                        <CustomSwitch
                          selectionMode={transmissionSwitch[index]}
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
                      {(transmissionSwitch.length === 0 ||
                        transmissionSwitch[index] === 2) &&
                        transmissionDropdown[index] !== 'Not Available' &&
                        transmissionPhoto[index] && (
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

                      {(transmissionSwitch.length === 0 ||
                        transmissionSwitch[index] === 2) && (
                        <>
                          {transmissionDropdown[index] !== 'Not Available' && (
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
                          )}
                          <View style={{marginTop: 14}}>
                            <Picker
                              style={styles.photoInput}
                              selectedValue={transmissionDropdown[index]}
                              onValueChange={itemValue =>
                                handleSuspensionDropDownChange(itemValue, index)
                              }>
                              <Picker.Item label="Select Condition" value="" />
                              <Picker.Item
                                label={
                                  index == 0
                                    ? 'Hard'
                                    : index == 1
                                    ? 'Hard'
                                    : index == 2
                                    ? 'Noise'
                                    : index == 3
                                    ? 'Noise'
                                    : index == 4
                                    ? 'Noise'
                                    : index == 5
                                    ? 'Noise'
                                    : 'Noise'
                                }
                                value={
                                  index == 0
                                    ? 'Hard'
                                    : index == 1
                                    ? 'Hard'
                                    : index == 2
                                    ? 'Noise'
                                    : index == 3
                                    ? 'Noise'
                                    : index == 4
                                    ? 'Noise'
                                    : index == 5
                                    ? 'Noise'
                                    : 'Noise'
                                }
                              />
                              <Picker.Item
                                label={
                                  index == 0
                                    ? 'Wornout'
                                    : index == 1
                                    ? 'Noise'
                                    : index == 2
                                    ? 'Damage'
                                    : index == 3
                                    ? 'Damage'
                                    : index == 4
                                    ? 'Damage'
                                    : index == 5
                                    ? 'Damage'
                                    : 'Damage'
                                }
                                value={
                                  index == 0
                                    ? 'Wornout'
                                    : index == 1
                                    ? 'Noise'
                                    : index == 2
                                    ? 'Damage'
                                    : index == 3
                                    ? 'Damage'
                                    : index == 4
                                    ? 'Damage'
                                    : index == 5
                                    ? 'Damage'
                                    : 'Damage'
                                }
                              />
                              <Picker.Item
                                label={
                                  index == 0
                                    ? 'Shuttering'
                                    : index == 1
                                    ? 'Need to Replace'
                                    : index == 2
                                    ? 'leak'
                                    : index == 3
                                    ? 'leak'
                                    : index == 4
                                    ? 'leak'
                                    : index == 5
                                    ? 'leak'
                                    : ''
                                }
                                value={
                                  index == 0
                                    ? 'Shuttering'
                                    : index == 1
                                    ? 'Need to Replace'
                                    : index == 2
                                    ? 'leak'
                                    : index == 3
                                    ? 'leak'
                                    : index == 4
                                    ? 'leak'
                                    : index == 5
                                    ? 'leak'
                                    : ''
                                }
                              />
                              <Picker.Item
                                label={
                                  index == 0
                                    ? ''
                                    : index == 1
                                    ? ''
                                    : index == 2
                                    ? 'Not Available'
                                    : index == 3
                                    ? 'Not Available'
                                    : index == 4
                                    ? 'Not Available'
                                    : index == 5
                                    ? 'Not Available'
                                    : ''
                                }
                                value={
                                  index == 0
                                    ? ''
                                    : index == 1
                                    ? ''
                                    : index == 2
                                    ? 'Not Available'
                                    : index == 3
                                    ? 'Not Available'
                                    : index == 4
                                    ? 'Not Available'
                                    : index == 5
                                    ? 'Not Available'
                                    : ''
                                }
                              />
                            </Picker>
                          </View>

                          {transmissionDropdown[index] !== 'Not Available' && (
                            <View style={{marginTop: 14}}>
                              {!transmissionPhoto[index] && (
                                <TouchableOpacity
                                  style={styles.photoInput}
                                  onPress={() =>
                                    openCameraForInspection(index)
                                  }>
                                  <Text>{`${item} Photo`}</Text>
                                </TouchableOpacity>
                              )}
                            </View>
                          )}
                        </>
                      )}
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
                          selectionMode={engineSwitch[index]}
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
                      {(engineSwitch.length === 0 ||
                        engineSwitch[index] === 2) &&
                        engineDropdown[index] !== 'Not Available' &&
                        enginePhoto[index] && (
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

                      {(engineSwitch.length === 0 ||
                        engineSwitch[index] === 2) && (
                        <>
                          {engineDropdown[index] !== 'Not Available' && (
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
                          )}
                          <View style={{marginTop: 14}}>
                            <Picker
                              style={styles.photoInput}
                              selectedValue={engineDropdown[index]}
                              onValueChange={itemValue =>
                                handleSuspensionDropDownChange(itemValue, index)
                              }>
                              <Picker.Item label="Select Condition" value="" />
                              <Picker.Item
                                label={
                                  index == 0
                                    ? 'White'
                                    : index == 1
                                    ? 'Leak'
                                    : index == 2
                                    ? 'Electrical'
                                    : index == 3
                                    ? 'Adjust'
                                    : index == 4
                                    ? 'Adjust'
                                    : index == 5
                                    ? 'Noise'
                                    : index == 6
                                    ? 'Noise'
                                    : index == 7
                                    ? 'Noise'
                                    : index == 8
                                    ? 'Noise'
                                    : index == 9
                                    ? 'Leak'
                                    : index == 10
                                    ? 'Leak'
                                    : index == 11
                                    ? 'Leak'
                                    : index == 12
                                    ? 'Leak'
                                    : index == 13
                                    ? 'Leak'
                                    : index == 14
                                    ? 'Leak'
                                    : index == 15
                                    ? 'Leak'
                                    : index == 16
                                    ? 'Noise'
                                    : index == 17
                                    ? 'Oil level Low'
                                    : 'Noise'
                                }
                                value={
                                  index == 0
                                    ? 'White'
                                    : index == 1
                                    ? 'Leak'
                                    : index == 2
                                    ? 'Electrical'
                                    : index == 3
                                    ? 'Adjust'
                                    : index == 4
                                    ? 'Adjust'
                                    : index == 5
                                    ? 'Noise'
                                    : index == 6
                                    ? 'Noise'
                                    : index == 7
                                    ? 'Noise'
                                    : index == 8
                                    ? 'Noise'
                                    : index == 9
                                    ? 'Leak'
                                    : index == 10
                                    ? 'Leak'
                                    : index == 11
                                    ? 'Leak'
                                    : index == 12
                                    ? 'Leak'
                                    : index == 13
                                    ? 'Leak'
                                    : index == 14
                                    ? 'Leak'
                                    : index == 15
                                    ? 'Leak'
                                    : index == 16
                                    ? 'Noise'
                                    : index == 17
                                    ? 'Oil level Low'
                                    : 'Noise'
                                }
                              />
                              <Picker.Item
                                label={
                                  index == 0
                                    ? 'Blue'
                                    : index == 1
                                    ? 'Noise'
                                    : index == 2
                                    ? 'Fuel'
                                    : index == 3
                                    ? 'Replace'
                                    : index == 4
                                    ? 'Replace'
                                    : index == 5
                                    ? 'Damaged'
                                    : index == 6
                                    ? 'Damaged'
                                    : index == 7
                                    ? 'Damaged'
                                    : index == 8
                                    ? 'Damaged'
                                    : index == 9
                                    ? 'Noise'
                                    : index == 10
                                    ? 'Noise'
                                    : index == 11
                                    ? 'Noise'
                                    : index == 12
                                    ? 'Noise'
                                    : index == 13
                                    ? 'Damaged'
                                    : index == 14
                                    ? 'Damaged'
                                    : index == 15
                                    ? 'Damaged'
                                    : index == 16
                                    ? 'Damaged'
                                    : index == 17
                                    ? 'Electrical'
                                    : 'Damaged'
                                }
                                value={
                                  index == 0
                                    ? 'Blue'
                                    : index == 1
                                    ? 'Noise'
                                    : index == 2
                                    ? 'Fuel'
                                    : index == 3
                                    ? 'Replace'
                                    : index == 4
                                    ? 'Replace'
                                    : index == 5
                                    ? 'Damaged'
                                    : index == 6
                                    ? 'Damaged'
                                    : index == 7
                                    ? 'Damaged'
                                    : index == 8
                                    ? 'Damaged'
                                    : index == 9
                                    ? 'Noise'
                                    : index == 10
                                    ? 'Noise'
                                    : index == 11
                                    ? 'Noise'
                                    : index == 12
                                    ? 'Noise'
                                    : index == 13
                                    ? 'Damaged'
                                    : index == 14
                                    ? 'Damaged'
                                    : index == 15
                                    ? 'Damaged'
                                    : index == 16
                                    ? 'Damaged'
                                    : index == 17
                                    ? 'Electrical'
                                    : 'Damaged'
                                }
                              />
                              <Picker.Item
                                label={
                                  index == 0
                                    ? 'Black'
                                    : index === 1
                                    ? 'Not Available'
                                    : index == 2
                                    ? 'Engine'
                                    : index == 3
                                    ? 'Replace'
                                    : index == 4
                                    ? 'Replace'
                                    : index == 5
                                    ? 'Replace'
                                    : index == 6
                                    ? 'Replace'
                                    : index == 7
                                    ? 'Replace'
                                    : index == 8
                                    ? 'Replace'
                                    : index == 9
                                    ? 'Replace'
                                    : index == 10
                                    ? 'Replace'
                                    : index == 11
                                    ? 'Replace'
                                    : index == 12
                                    ? 'Replace'
                                    : index == 13
                                    ? 'Rust'
                                    : index == 14
                                    ? ''
                                    : index == 15
                                    ? ''
                                    : index == 16
                                    ? 'Not Working'
                                    : index == 17
                                    ? 'Oil Condaminated'
                                    : 'Replace'
                                }
                                value={
                                  index == 0
                                    ? 'Black'
                                    : index === 1
                                    ? 'Not Available'
                                    : index == 2
                                    ? 'Engine'
                                    : index == 3
                                    ? 'Replace'
                                    : index == 4
                                    ? 'Replace'
                                    : index == 5
                                    ? 'Replace'
                                    : index == 6
                                    ? 'Replace'
                                    : index == 7
                                    ? 'Replace'
                                    : index == 8
                                    ? 'Replace'
                                    : index == 9
                                    ? 'Replace'
                                    : index == 10
                                    ? 'Replace'
                                    : index == 11
                                    ? 'Replace'
                                    : index == 12
                                    ? 'Replace'
                                    : index == 13
                                    ? 'Rust'
                                    : index == 14
                                    ? ''
                                    : index == 15
                                    ? ''
                                    : index == 16
                                    ? 'Not Working'
                                    : index == 17
                                    ? 'Oil Condaminated'
                                    : 'Replace'
                                }
                              />
                              {/* Add other items as needed */}
                            </Picker>
                          </View>
                          {engineDropdown[index] !== 'Not Available' && (
                            <View style={{marginTop: 14}}>
                              {!enginePhoto[index] && (
                                <TouchableOpacity
                                  style={styles.photoInput}
                                  onPress={() =>
                                    openCameraForInspection(index)
                                  }>
                                  <Text>{`${item} Photo`}</Text>
                                </TouchableOpacity>
                              )}
                            </View>
                          )}
                        </>
                      )}
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
                          selectionMode={electricalSwitch[index]}
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

                      {(electricalSwitch.length === 0 ||
                        electricalSwitch[index] === 2) &&
                        electricalDropdown[index] !== 'Not Available' &&
                        electricalPhoto[index] && (
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

                      {(electricalSwitch.length === 0 ||
                        electricalSwitch[index] === 2) && (
                        <>
                          {electricalDropdown[index] !== 'Not Available' && (
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
                          )}
                          <View style={{marginTop: 14}}>
                            <Picker
                              style={styles.photoInput}
                              selectedValue={electricalDropdown[index]}
                              onValueChange={itemValue =>
                                handleSuspensionDropDownChange(itemValue, index)
                              }>
                              <Picker.Item label="Select Condition" value="" />
                              <Picker.Item
                                label={
                                  index == 0
                                    ? 'Charge'
                                    : index === 1
                                    ? 'Noise'
                                    : index == 2
                                    ? 'Noise'
                                    : index == 3
                                    ? 'Damaged'
                                    : index == 4
                                    ? 'Not Working'
                                    : index == 5
                                    ? 'Not Working'
                                    : index == 6
                                    ? 'Not Working'
                                    : index == 7
                                    ? 'Not Working'
                                    : index == 8
                                    ? 'Not Working'
                                    : index == 9
                                    ? 'Not Working'
                                    : index == 10
                                    ? 'Not Working'
                                    : index == 11
                                    ? 'Not Working'
                                    : index == 12
                                    ? 'Not Applicable'
                                    : index == 13
                                    ? 'Not Applicable'
                                    : 'Not Applicable'
                                }
                                value={
                                  index == 0
                                    ? 'Charge'
                                    : index === 1
                                    ? 'Noise'
                                    : index == 2
                                    ? 'Noise'
                                    : index == 3
                                    ? 'Damaged'
                                    : index == 4
                                    ? 'Not Working'
                                    : index == 5
                                    ? 'Not Working'
                                    : index == 6
                                    ? 'Not Working'
                                    : index == 7
                                    ? 'Not Working'
                                    : index == 8
                                    ? 'Not Working'
                                    : index == 9
                                    ? 'Not Working'
                                    : index == 10
                                    ? 'Not Working'
                                    : index == 11
                                    ? 'Not Working'
                                    : index == 12
                                    ? 'Not Applicable'
                                    : index == 13
                                    ? 'Not Applicable'
                                    : 'Not Applicable'
                                }
                              />
                              <Picker.Item
                                label={
                                  index == 0
                                    ? 'Replace'
                                    : index === 1
                                    ? 'Not Working'
                                    : index == 2
                                    ? 'Not Working'
                                    : index == 3
                                    ? 'Repaired'
                                    : index == 4
                                    ? 'Damaged'
                                    : index == 5
                                    ? 'Damaged'
                                    : index == 6
                                    ? 'Damaged'
                                    : index == 7
                                    ? 'Damaged'
                                    : index == 8
                                    ? 'Damaged'
                                    : index == 9
                                    ? 'Damaged'
                                    : index == 10
                                    ? 'Damaged'
                                    : index == 11
                                    ? 'Damaged'
                                    : index == 12
                                    ? 'Not Working'
                                    : index == 13
                                    ? 'Not Available'
                                    : 'Not Working'
                                }
                                value={
                                  index == 0
                                    ? 'Replace'
                                    : index === 1
                                    ? 'Not Working'
                                    : index == 2
                                    ? 'Not Working'
                                    : index == 3
                                    ? 'Repaired'
                                    : index == 4
                                    ? 'Damaged'
                                    : index == 5
                                    ? 'Damaged'
                                    : index == 6
                                    ? 'Damaged'
                                    : index == 7
                                    ? 'Damaged'
                                    : index == 8
                                    ? 'Damaged'
                                    : index == 9
                                    ? 'Damaged'
                                    : index == 10
                                    ? 'Damaged'
                                    : index == 11
                                    ? 'Damaged'
                                    : index == 12
                                    ? 'Not Working'
                                    : index == 13
                                    ? 'Not Available'
                                    : 'Not Working'
                                }
                              />
                              <Picker.Item
                                label={
                                  index == 0
                                    ? ''
                                    : index === 1
                                    ? ''
                                    : index == 2
                                    ? ''
                                    : index == 3
                                    ? ''
                                    : index == 4
                                    ? ''
                                    : index == 5
                                    ? ''
                                    : index == 6
                                    ? 'Replace'
                                    : index == 7
                                    ? ''
                                    : index == 8
                                    ? ''
                                    : index == 9
                                    ? ''
                                    : index == 10
                                    ? ''
                                    : index == 11
                                    ? ''
                                    : index == 12
                                    ? 'Damaged'
                                    : index == 13
                                    ? 'Damaged'
                                    : 'Damaged'
                                }
                                value={
                                  index == 0
                                    ? ''
                                    : index === 1
                                    ? ''
                                    : index == 2
                                    ? ''
                                    : index == 3
                                    ? ''
                                    : index == 4
                                    ? ''
                                    : index == 5
                                    ? ''
                                    : index == 6
                                    ? 'Replace'
                                    : index == 7
                                    ? ''
                                    : index == 8
                                    ? ''
                                    : index == 9
                                    ? ''
                                    : index == 10
                                    ? ''
                                    : index == 11
                                    ? ''
                                    : index == 12
                                    ? 'Damaged'
                                    : index == 13
                                    ? 'Damaged'
                                    : 'Damaged'
                                }
                              />

                              {/* Add other items as needed */}
                            </Picker>
                          </View>
                          {electricalDropdown[index] !== 'Not Available' && (
                            <View style={{marginTop: 14}}>
                              {!electricalPhoto[index] && (
                                <TouchableOpacity
                                  style={styles.photoInput}
                                  onPress={() =>
                                    openCameraForInspection(index)
                                  }>
                                  <Text>{`${item} Photo`}</Text>
                                </TouchableOpacity>
                              )}
                            </View>
                          )}
                        </>
                      )}
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
                          selectionMode={acSwitch[index]}
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
                      {(acSwitch.length === 0 || acSwitch[index] === 2) &&
                        acDropdown[index] !== 'Not Available' &&
                        acPhoto[index] && (
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

                      {(acSwitch.length === 0 || acSwitch[index] === 2) && (
                        <>
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
                              <Picker.Item
                                label={
                                  index == 0
                                    ? 'Gas Level Low'
                                    : index == 1
                                    ? 'Not Working'
                                    : index == 2
                                    ? 'Leak'
                                    : index == 3
                                    ? 'Damaged'
                                    : index == 4
                                    ? 'Damaged'
                                    : 'Damaged'
                                }
                                value={
                                  index == 0
                                    ? 'Gas Level Low'
                                    : index == 1
                                    ? 'Not Working'
                                    : index == 2
                                    ? 'Leak'
                                    : index == 3
                                    ? 'Damaged'
                                    : index == 4
                                    ? 'Damaged'
                                    : 'Damaged'
                                }
                              />
                              <Picker.Item
                                label={
                                  index == 0
                                    ? 'Not Working'
                                    : index == 1
                                    ? 'Noise'
                                    : index == 2
                                    ? 'Damaged'
                                    : index == 3
                                    ? 'Not Working'
                                    : index == 4
                                    ? 'Not Working'
                                    : ''
                                }
                                value={
                                  index == 0
                                    ? 'Not Working'
                                    : index == 1
                                    ? 'Noise'
                                    : index == 2
                                    ? 'Damaged'
                                    : index == 3
                                    ? 'Not Working'
                                    : index == 4
                                    ? 'Not Working'
                                    : ''
                                }
                              />

                              {/* Add other items as needed */}
                            </Picker>
                          </View>
                          <View style={{marginTop: 14}}>
                            {!acPhoto[index] && (
                              <TouchableOpacity
                                style={styles.photoInput}
                                onPress={() => openCameraForInspection(index)}>
                                <Text>{`${item} Photo`}</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </>
                      )}
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
                          selectionMode={accessoriesSwitch[index]}
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

                      {(accessoriesSwitch.length === 0 ||
                        accessoriesSwitch[index] === 2) &&
                        accessoriesDropdown[index] !== 'Not Available' &&
                        accessoriesPhoto[index] && (
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

                      {(accessoriesSwitch.length === 0 ||
                        accessoriesSwitch[index] === 2) && (
                        <>
                          {accessoriesDropdown[index] !== 'Not Available' && (
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
                          )}
                          <View style={{marginTop: 14}}>
                            <Picker
                              style={styles.photoInput}
                              selectedValue={accessoriesDropdown[index]}
                              onValueChange={itemValue =>
                                handleSuspensionDropDownChange(itemValue, index)
                              }>
                              <Picker.Item label="Select Condition" value="" />
                              <Picker.Item
                                label={
                                  index == 0
                                    ? 'Not Available'
                                    : index === 1
                                    ? 'Not Available'
                                    : index == 2
                                    ? 'Not Available'
                                    : index == 3
                                    ? 'Not Available'
                                    : index == 4
                                    ? 'Not Available'
                                    : index == 5
                                    ? 'Damaged'
                                    : index == 6
                                    ? 'Not Available'
                                    : index == 7
                                    ? 'Not Available'
                                    : index == 8
                                    ? 'Not Available'
                                    : index == 9
                                    ? 'Not Available'
                                    : 'Not Available'
                                }
                                value={
                                  index == 0
                                    ? 'Not Available'
                                    : index === 1
                                    ? 'Not Available'
                                    : index == 2
                                    ? 'Not Available'
                                    : index == 3
                                    ? 'Not Available'
                                    : index == 4
                                    ? 'Not Available'
                                    : index == 5
                                    ? 'Damaged'
                                    : index == 6
                                    ? 'Not Available'
                                    : index == 7
                                    ? 'Not Available'
                                    : index == 8
                                    ? 'Not Available'
                                    : index == 9
                                    ? 'Not Available'
                                    : 'Not Available'
                                }
                              />
                              <Picker.Item
                                label={
                                  index == 0
                                    ? 'Damaged'
                                    : index === 1
                                    ? 'Damaged'
                                    : index == 2
                                    ? 'Damaged'
                                    : index == 3
                                    ? 'Damaged'
                                    : index == 4
                                    ? 'Damaged'
                                    : index == 5
                                    ? 'Not Working'
                                    : index == 6
                                    ? 'Damaged'
                                    : index == 7
                                    ? 'Damaged'
                                    : index == 8
                                    ? 'Damaged'
                                    : index == 9
                                    ? 'Damaged'
                                    : 'Damaged'
                                }
                                value={
                                  index == 0
                                    ? 'Damaged'
                                    : index === 1
                                    ? 'Damaged'
                                    : index == 2
                                    ? 'Damaged'
                                    : index == 3
                                    ? 'Damaged'
                                    : index == 4
                                    ? 'Damaged'
                                    : index == 5
                                    ? 'Not Working'
                                    : index == 6
                                    ? 'Damaged'
                                    : index == 7
                                    ? 'Damaged'
                                    : index == 8
                                    ? 'Damaged'
                                    : index == 9
                                    ? 'Damaged'
                                    : 'Damaged'
                                }
                              />
                              <Picker.Item
                                label={
                                  index == 0
                                    ? 'Not Working'
                                    : index === 1
                                    ? 'Not Working'
                                    : index == 2
                                    ? 'Not Working'
                                    : index == 3
                                    ? 'Not Working'
                                    : index == 4
                                    ? 'Not Working'
                                    : index == 5
                                    ? ''
                                    : index == 6
                                    ? 'Not Working'
                                    : index == 7
                                    ? ''
                                    : index == 8
                                    ? ''
                                    : index == 9
                                    ? ''
                                    : 'Not Working'
                                }
                                value={
                                  index == 0
                                    ? 'Not Working'
                                    : index === 1
                                    ? 'Not Working'
                                    : index == 2
                                    ? 'Not Working'
                                    : index == 3
                                    ? 'Not Working'
                                    : index == 4
                                    ? 'Not Working'
                                    : index == 5
                                    ? ''
                                    : index == 6
                                    ? 'Not Working'
                                    : index == 7
                                    ? ''
                                    : index == 8
                                    ? ''
                                    : index == 9
                                    ? ''
                                    : 'Not Working'
                                }
                              />
                              {/* Add other items as needed */}
                            </Picker>
                          </View>
                          {accessoriesDropdown[index] !== 'Not Available' && (
                            <View style={{marginTop: 14}}>
                              {!accessoriesPhoto[index] && (
                                <TouchableOpacity
                                  style={styles.photoInput}
                                  onPress={() =>
                                    openCameraForInspection(index)
                                  }>
                                  <Text>{`${item} Photo`}</Text>
                                </TouchableOpacity>
                              )}
                            </View>
                          )}
                        </>
                      )}
                    </View>
                  ))}
              </View>
              <View style={{paddingHorizontal: 0}}>
                {selectedInspectionIndex === 8 &&
                  oilList.map((item, index) => (
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
                          selectionMode={oliSwitch[index]}
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
                      {/* {accessoriesPhoto[index] && (
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
                      )} */}

                      {(oliSwitch.length === 0 || oliSwitch[index] === 2) && (
                        <>
                          <View style={{marginTop: 14}}>
                            <TextInput
                              style={styles.photoInput}
                              placeholder="Enter remarks"
                              value={oilRemarks[index]}
                              onChangeText={text =>
                                handleSuspensionRemarks(text, index)
                              }
                            />
                          </View>
                          <View style={{marginTop: 14}}>
                            <Picker
                              style={styles.photoInput}
                              selectedValue={oilDropDown[index]}
                              onValueChange={itemValue =>
                                handleSuspensionDropDownChange(itemValue, index)
                              }>
                              <Picker.Item label="Select Condition" value="" />
                              <Picker.Item label="Level" value="Level" />
                              <Picker.Item label="Leak" value="Leak" />
                              {/* Add other items as needed */}
                            </Picker>
                          </View>
                          {/* <View style={{marginTop: 14}}>
                        {!accessoriesPhoto[index] && (
                          <TouchableOpacity
                            style={styles.photoInput}
                            onPress={() => openCameraForInspection(index)}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        )}
                      </View> */}
                        </>
                      )}
                    </View>
                  ))}
              </View>
              <View style={{paddingHorizontal: 8}}>
                {selectedInspectionIndex === 9 && (
                  <View style={{marginTop: 14}}>
                    <TextInput
                      style={styles.photoInput}
                      placeholder="Enter remarks"
                      value={roadTestRemarks}
                      onChangeText={text => handleSuspensionRemarks(text)}
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
        onRequestClose={() => handleBodyInspectionOkPress()}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => handleClose(5)}>
              <Text style={{textAlign: 'right', marginRight: 8}}>Close</Text>
            </TouchableOpacity>
            <ScrollView
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}>
              <View style={{paddingHorizontal: 0}}>
                {selectedBodyInspectionIndex === 6 &&
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
                          selectionMode={pillarSwitch[index]}
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
                      {(pillarSwitch.length === 0 ||
                        pillarSwitch[index] === 2) && (
                        <>
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
                                onPress={() =>
                                  handleBodyInspectionClosePress(index)
                                }>
                                <Text style={{fontSize: 14, color: 'white'}}>
                                  Cancel
                                </Text>
                              </TouchableOpacity>
                            </View>
                          )}
                        </>
                      )}
                      {(pillarSwitch.length === 0 ||
                        pillarSwitch[index] === 2) && (
                        <>
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
                              <Picker.Item label="Damaged" value="Damaged" />
                              <Picker.Item label="Rusting" value="Rusting" />
                              <Picker.Item label="Replaced" value="Replaced" />
                              <Picker.Item label="Repaired" value="Repaired" />

                              {/* Add other items as needed */}
                            </Picker>
                          </View>
                          <View style={{marginTop: 14}}>
                            {!pillarsPhoto[index] && (
                              <TouchableOpacity
                                style={styles.photoInput}
                                onPress={() =>
                                  openCameraForBodyInspection(index)
                                }>
                                <Text>{`${item} Photo`}</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </>
                      )}
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
                          selectionMode={apronSwitch[index]}
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

                      {(apronSwitch.length === 0 ||
                        apronSwitch[index] === 2) && (
                        <>
                          {apronPhoto[index] && (
                            <View style={{position: 'relative'}}>
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
                                onPress={() =>
                                  handleBodyInspectionClosePress(index)
                                }>
                                <Text style={{fontSize: 14, color: 'white'}}>
                                  Cancel
                                </Text>
                              </TouchableOpacity>
                            </View>
                          )}
                        </>
                      )}
                      {(apronSwitch.length === 0 ||
                        apronSwitch[index] === 2) && (
                        <>
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
                              <Picker.Item label="Damaged" value="Damaged" />
                              <Picker.Item label="Rusting" value="Rusting" />
                              <Picker.Item label="Replaced" value="Replaced" />
                              <Picker.Item label="Repaired" value="Repaired" />

                              {/* Add other items as needed */}
                            </Picker>
                          </View>
                          <View style={{marginTop: 14}}>
                            {!apronPhoto[index] && (
                              <TouchableOpacity
                                style={styles.photoInput}
                                onPress={() =>
                                  openCameraForBodyInspection(index)
                                }>
                                <Text>{`${item} Photo`}</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </>
                      )}
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedBodyInspectionIndex === 5 &&
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
                          selectionMode={fenderSwitch[index]}
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

                      {(fenderSwitch.length === 0 ||
                        fenderSwitch[index] === 2) && (
                        <>
                          {fenderPhoto[index] && (
                            <View style={{position: 'relative'}}>
                              <Image
                                source={{uri: fenderPhoto[index]}}
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
                                onPress={() =>
                                  handleBodyInspectionClosePress(index)
                                }>
                                <Text style={{fontSize: 14, color: 'white'}}>
                                  Cancel
                                </Text>
                              </TouchableOpacity>
                            </View>
                          )}
                        </>
                      )}
                      {(fenderSwitch.length === 0 ||
                        fenderSwitch[index] === 2) && (
                        <>
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
                              <Picker.Item label="Damaged" value="Damaged" />
                              <Picker.Item label="Rusting" value="Rusting" />
                              <Picker.Item label="Replaced" value="Replaced" />
                              <Picker.Item label="Repaired" value="Repaired" />

                              {/* Add other items as needed */}
                            </Picker>
                          </View>
                          <View style={{marginTop: 14}}>
                            {!fenderPhoto[index] && (
                              <TouchableOpacity
                                style={styles.photoInput}
                                onPress={() =>
                                  openCameraForBodyInspection(index)
                                }>
                                <Text>{`${item} Photo`}</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </>
                      )}
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedBodyInspectionIndex === 9 &&
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
                          selectionMode={quarterPanlesSwitch[index]}
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
                        <View style={{position: 'relative'}}>
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
                            onPress={() =>
                              handleBodyInspectionClosePress(index)
                            }>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}

                      {(quarterPanlesSwitch.length === 0 ||
                        quarterPanlesSwitch[index] === 2) && (
                        <>
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
                              <Picker.Item label="Damaged" value="Damaged" />
                              <Picker.Item label="Rusting" value="Rusting" />
                              <Picker.Item label="Replaced" value="Replaced" />
                              <Picker.Item label="Repaired" value="Repaired" />

                              {/* Add other items as needed */}
                            </Picker>
                          </View>
                          <View style={{marginTop: 14}}>
                            {!quarterPanlesPhoto[index] && (
                              <TouchableOpacity
                                style={styles.photoInput}
                                onPress={() =>
                                  openCameraForBodyInspection(index)
                                }>
                                <Text>{`${item} Photo`}</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </>
                      )}
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedBodyInspectionIndex === 8 &&
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
                          selectionMode={runningBoardSwitch[index]}
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
                      {(runningBoardSwitch.length === 0 ||
                        runningBoardSwitch[index] === 2) && (
                        <>
                          {runningBoardPhoto[index] && (
                            <View style={{position: 'relative'}}>
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
                                onPress={() =>
                                  handleBodyInspectionClosePress(index)
                                }>
                                <Text style={{fontSize: 14, color: 'white'}}>
                                  Cancel
                                </Text>
                              </TouchableOpacity>
                            </View>
                          )}
                        </>
                      )}

                      {(runningBoardSwitch.length === 0 ||
                        runningBoardSwitch[index] === 2) && (
                        <>
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
                              <Picker.Item label="Damaged" value="Damaged" />
                              <Picker.Item label="Rusting" value="Rusting" />
                              <Picker.Item label="Replaced" value="Replaced" />
                              <Picker.Item label="Repaired" value="Repaired" />

                              {/* Add other items as needed */}
                            </Picker>
                          </View>
                          <View style={{marginTop: 14}}>
                            {!runningBoardPhoto[index] && (
                              <TouchableOpacity
                                style={styles.photoInput}
                                onPress={() =>
                                  openCameraForBodyInspection(index)
                                }>
                                <Text>{`${item} Photo`}</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </>
                      )}
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedBodyInspectionIndex === 7 &&
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
                          selectionMode={doorSwitch[index]}
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
                      {(doorSwitch.length === 0 || doorSwitch[index] === 2) && (
                        <>
                          {doorPhoto[index] && (
                            <View style={{position: 'relative'}}>
                              <Image
                                source={{uri: doorPhoto[index]}}
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
                                onPress={() =>
                                  handleBodyInspectionClosePress(index)
                                }>
                                <Text style={{fontSize: 14, color: 'white'}}>
                                  Cancel
                                </Text>
                              </TouchableOpacity>
                            </View>
                          )}
                        </>
                      )}
                      {(doorSwitch.length === 0 || doorSwitch[index] === 2) && (
                        <>
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
                              <Picker.Item label="Damaged" value="Damaged" />
                              <Picker.Item label="Rusting" value="Rusting" />
                              <Picker.Item label="Replaced" value="Replaced" />
                              <Picker.Item label="Repaired" value="Repaired" />

                              {/* Add other items as needed */}
                            </Picker>
                          </View>
                          <View style={{marginTop: 14}}>
                            {!doorPhoto[index] && (
                              <TouchableOpacity
                                style={styles.photoInput}
                                onPress={() =>
                                  openCameraForBodyInspection(index)
                                }>
                                <Text>{`${item} Photo`}</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </>
                      )}
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedBodyInspectionIndex === 10 &&
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
                          selectionMode={dickyDoorSwitch[index]}
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
                      {(dickyDoorSwitch.length === 0 ||
                        dickyDoorSwitch[index] === 2) && (
                        <>
                          {dickyDoorPhoto[index] && (
                            <View style={{position: 'relative'}}>
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
                                onPress={() =>
                                  handleBodyInspectionClosePress(index)
                                }>
                                <Text style={{fontSize: 14, color: 'white'}}>
                                  Cancel
                                </Text>
                              </TouchableOpacity>
                            </View>
                          )}
                        </>
                      )}

                      {(dickyDoorSwitch.length === 0 ||
                        dickyDoorSwitch[index] === 2) && (
                        <>
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
                              <Picker.Item label="Damaged" value="Damaged" />
                              <Picker.Item label="Rusting" value="Rusting" />
                              <Picker.Item label="Replaced" value="Replaced" />
                              <Picker.Item label="Repaired" value="Repaired" />

                              {/* Add other items as needed */}
                            </Picker>
                          </View>
                          <View style={{marginTop: 14}}>
                            {!dickyDoorPhoto[index] && (
                              <TouchableOpacity
                                style={styles.photoInput}
                                onPress={() =>
                                  openCameraForBodyInspection(index)
                                }>
                                <Text>{`${item} Photo`}</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </>
                      )}
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedBodyInspectionIndex === 11 &&
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
                          selectionMode={dickySkirtSwitch[index]}
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

                      {(dickySkirtSwitch.length === 0 ||
                        dickySkirtSwitch[index] === 2) && (
                        <>
                          {dickySkirtPhoto[index] && (
                            <View style={{position: 'relative'}}>
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
                                onPress={() =>
                                  handleBodyInspectionClosePress(index)
                                }>
                                <Text style={{fontSize: 14, color: 'white'}}>
                                  Cancel
                                </Text>
                              </TouchableOpacity>
                            </View>
                          )}
                        </>
                      )}
                      {(dickySkirtSwitch.length === 0 ||
                        dickySkirtSwitch[index] === 2) && (
                        <>
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
                              <Picker.Item label="Damaged" value="Damaged" />
                              <Picker.Item label="Rusting" value="Rusting" />
                              <Picker.Item label="Replaced" value="Replaced" />
                              <Picker.Item label="Repaired" value="Repaired" />

                              {/* Add other items as needed */}
                            </Picker>
                          </View>
                          <View style={{marginTop: 14}}>
                            {!dickySkirtPhoto[index] && (
                              <TouchableOpacity
                                style={styles.photoInput}
                                onPress={() =>
                                  openCameraForBodyInspection(index)
                                }>
                                <Text>{`${item} Photo`}</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </>
                      )}
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedBodyInspectionIndex === 0 &&
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
                          selectionMode={bonetSwitch[index]}
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
                      {(bonetSwitch.length === 0 ||
                        bonetSwitch[index] === 2) && (
                        <>
                          {bonetPhoto[index] && (
                            <View style={{position: 'relative'}}>
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
                                onPress={() =>
                                  handleBodyInspectionClosePress(index)
                                }>
                                <Text style={{fontSize: 14, color: 'white'}}>
                                  Cancel
                                </Text>
                              </TouchableOpacity>
                            </View>
                          )}
                        </>
                      )}
                      {(bonetSwitch.length === 0 ||
                        bonetSwitch[index] === 2) && (
                        <>
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
                              <Picker.Item label="Damaged" value="Damaged" />
                              <Picker.Item label="Rusting" value="Rusting" />
                              <Picker.Item label="Replaced" value="Replaced" />
                              <Picker.Item label="Repaired" value="Repaired" />

                              {/* Add other items as needed */}
                            </Picker>
                          </View>
                          <View style={{marginTop: 14}}>
                            {!bonetPhoto[index] && (
                              <TouchableOpacity
                                style={styles.photoInput}
                                onPress={() =>
                                  openCameraForBodyInspection(index)
                                }>
                                <Text>{`${item} Photo`}</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </>
                      )}
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedBodyInspectionIndex === 2 &&
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
                          selectionMode={supportMembersSwitch[index]}
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
                      {(supportMembersSwitch.length === 0 ||
                        supportMembersSwitch[index] === 2) && (
                        <>
                          {supportMembersPhoto[index] && (
                            <View style={{position: 'relative'}}>
                              <Image
                                source={{uri: supportMembersPhoto[index]}}
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
                                onPress={() =>
                                  handleBodyInspectionClosePress(index)
                                }>
                                <Text style={{fontSize: 14, color: 'white'}}>
                                  Cancel
                                </Text>
                              </TouchableOpacity>
                            </View>
                          )}
                        </>
                      )}

                      {(supportMembersSwitch.length === 0 ||
                        supportMembersSwitch[index] === 2) && (
                        <>
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
                              <Picker.Item label="Damaged" value="Damaged" />
                              <Picker.Item label="Rusting" value="Rusting" />
                              <Picker.Item label="Replaced" value="Replaced" />
                              <Picker.Item label="Repaired" value="Repaired" />

                              {/* Add other items as needed */}
                            </Picker>
                          </View>
                          <View style={{marginTop: 14}}>
                            {!supportMembersPhoto[index] && (
                              <TouchableOpacity
                                style={styles.photoInput}
                                onPress={() =>
                                  openCameraForBodyInspection(index)
                                }>
                                <Text>{`${item} Photo`}</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </>
                      )}
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedBodyInspectionIndex === 3 &&
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
                          selectionMode={bumperSwitch[index]}
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
                      {(bumperSwitch.length === 0 ||
                        bumperSwitch[index] === 2) && (
                        <>
                          {bumperPhoto[index] && (
                            <View style={{position: 'relative'}}>
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
                                onPress={() =>
                                  handleBodyInspectionClosePress(index)
                                }>
                                <Text style={{fontSize: 14, color: 'white'}}>
                                  Cancel
                                </Text>
                              </TouchableOpacity>
                            </View>
                          )}
                        </>
                      )}
                      {(bumperSwitch.length === 0 ||
                        bumperSwitch[index] === 2) && (
                        <>
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
                              <Picker.Item label="Damaged" value="Damaged" />
                              <Picker.Item label="Rusting" value="Rusting" />
                              <Picker.Item label="Replaced" value="Replaced" />
                              <Picker.Item label="Repaired" value="Repaired" />

                              {/* Add other items as needed */}
                            </Picker>
                          </View>
                          <View style={{marginTop: 14}}>
                            {!bumperPhoto[index] && (
                              <TouchableOpacity
                                style={styles.photoInput}
                                onPress={() =>
                                  openCameraForBodyInspection(index)
                                }>
                                <Text>{`${item} Photo`}</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </>
                      )}
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedBodyInspectionIndex === 12 &&
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
                          selectionMode={selectWheelTypeSwitch[index]}
                          roundCorner={false}
                          option1={'Alloy'}
                          option2={'Drum'}
                          onSelectSwitch={val =>
                            handleBodyInspectionChanngeWheelType(index, val)
                          }
                          selectionColor={'#007BFF'}
                          index={index} // Pass the index as a prop
                        />
                      </View>

                      <View
                        style={{
                          // marginLeft: 9,
                          // marginRight: 9,
                          // marginBottom: 20,
                          marginTop: 25,
                        }}>
                        <CustomSwitch
                          selectionMode={wheelTypeSwitch[index]}
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
                        <View style={{position: 'relative'}}>
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
                            onPress={() =>
                              handleBodyInspectionClosePress(index)
                            }>
                            <Text style={{fontSize: 14, color: 'white'}}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}

                      {(wheelTypeSwitch.length === 0 ||
                        wheelTypeSwitch[0] === 2) && (
                        <>
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
                              <Picker.Item label="Damaged" value="Damaged" />
                              <Picker.Item label="Rusting" value="Rusting" />
                              <Picker.Item label="Replaced" value="Replaced" />
                              <Picker.Item label="Repaired" value="Repaired" />

                              {/* Add other items as needed */}
                            </Picker>
                          </View>
                          <View style={{marginTop: 14}}>
                            {!wheelTypePhoto[index] && (
                              <TouchableOpacity
                                style={styles.photoInput}
                                onPress={() =>
                                  openCameraForBodyInspection(index)
                                }>
                                <Text>{`${item} Photo`}</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </>
                      )}
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 0}}>
                {selectedBodyInspectionIndex === 4 &&
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
                          selectionMode={windShieldSwitch[index]}
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
                      {(windShieldSwitch.length === 0 ||
                        windShieldSwitch[index] === 2) && (
                        <>
                          {windShieldPhoto[index] && (
                            <View style={{position: 'relative'}}>
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
                                onPress={() =>
                                  handleBodyInspectionClosePress(index)
                                }>
                                <Text style={{fontSize: 14, color: 'white'}}>
                                  Cancel
                                </Text>
                              </TouchableOpacity>
                            </View>
                          )}
                        </>
                      )}

                      {(windShieldSwitch.length === 0 ||
                        windShieldSwitch[index] === 2) && (
                        <>
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
                              <Picker.Item label="Damaged" value="Damaged" />
                              <Picker.Item label="Rusting" value="Rusting" />
                              <Picker.Item label="Replaced" value="Replaced" />
                              <Picker.Item label="Repaired" value="Repaired" />

                              {/* Add other items as needed */}
                            </Picker>
                          </View>
                          <View style={{marginTop: 14}}>
                            {!windShieldPhoto[index] && (
                              <TouchableOpacity
                                style={styles.photoInput}
                                onPress={() =>
                                  openCameraForBodyInspection(index)
                                }>
                                <Text>{`${item} Photo`}</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </>
                      )}
                    </View>
                  ))}
              </View>

              <View style={{paddingHorizontal: 8, marginTop: 18}}>
                <CustomButton
                  title="Submit"
                  onPress={() => handleBodyInspectionOkPress()}
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
        onRequestClose={() => handleCarDetailsOkPress()}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => handleClose(6)}>
              <Text style={{textAlign: 'right', marginRight: 8}}>Close</Text>
            </TouchableOpacity>
            <ScrollView
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}>
              <View style={{paddingHorizontal: 8, marginTop: 18}}>
                <View style={{paddingHorizontal: 0}}>
                  {carDetailsIndex === 0 &&
                    lhsViewList.map((item, index) => (
                      <View key={index} style={styles.itemContainer}>
                        <Text>{item}</Text>

                        {lhsViewPhoto[index] && (
                          <View stylle={{position: 'relative'}}>
                            <Image
                              source={{uri: lhsViewPhoto[index]}}
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
                              onPress={() => handleCamera5(index)}>
                              <Text style={{fontSize: 14, color: 'white'}}>
                                Cancel
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}

                        <View style={{marginTop: 0}}>
                          {!lhsViewPhoto[index] && (
                            <TouchableOpacity
                              style={styles.photoInput}
                              onPress={() => openCamera5(index)}>
                              <Text>{`${item} Photo`}</Text>
                            </TouchableOpacity>
                          )}
                        </View>

                        <View style={{marginTop: 14}}>
                          <TextInput
                            style={styles.photoInput}
                            placeholder="Enter remarks"
                            value={lhsViewRemarks[index]}
                            onChangeText={text => handleRemarks5(text, index)}
                          />
                        </View>
                      </View>
                    ))}
                </View>
                <View style={{paddingHorizontal: 0}}>
                  {carDetailsIndex === 1 &&
                    rearViewList.map((item, index) => (
                      <View key={index} style={styles.itemContainer}>
                        <Text>{item}</Text>

                        {rearViewPhoto[index] && (
                          <View stylle={{position: 'relative'}}>
                            <Image
                              source={{uri: rearViewPhoto[index]}}
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
                              onPress={() => handleCamera5(index)}>
                              <Text style={{fontSize: 14, color: 'white'}}>
                                Cancel
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}

                        <View style={{marginTop: 0}}>
                          {!rearViewPhoto[index] && (
                            <TouchableOpacity
                              style={styles.photoInput}
                              onPress={() => openCamera5(index)}>
                              <Text>{`${item} Photo`}</Text>
                            </TouchableOpacity>
                          )}
                        </View>

                        <View style={{marginTop: 14}}>
                          <TextInput
                            style={styles.photoInput}
                            placeholder="Enter remarks"
                            value={rearViewRemarks[index]}
                            onChangeText={text => handleRemarks5(text, index)}
                          />
                        </View>
                      </View>
                    ))}
                </View>
                <View style={{paddingHorizontal: 0}}>
                  {carDetailsIndex === 7 &&
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
                            selectionMode={tyreSwitch[index]}
                            roundCorner={false}
                            option1={'Ok'}
                            option2={'Not Ok'}
                            onSelectSwitch={val => handleSwitch5(index, val)}
                            selectionColor={'#007BFF'}
                            index={index} // Pass the index as a prop
                          />
                        </View>
                        {tyrePunchPhoto[index] && (
                          <View style={{position: 'relative'}}>
                            <Image
                              source={{uri: tyrePunchPhoto[index]}}
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
                              onPress={() => handleCamera5(index)}>
                              <Text style={{fontSize: 14, color: 'white'}}>
                                Cancel
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}

                        {/* {tyreSwitch.length===0 || tyreSwitch[index] === 2 && ( */}
                        <View style={{marginTop: 14}}>
                          <TextInput
                            style={styles.photoInput}
                            placeholder="Enter remarks"
                            value={tyreRemarks[index]}
                            onChangeText={text => handleRemarks5(text, index)}
                          />
                        </View>
                        {/* )} */}

                        {index === 0 && (
                          <View style={{marginTop: 14}}>
                            <View key={index} style={styles.sliderContainer}>
                              <Text style={styles.percentageText}>
                              <Text style={styles.percentageText}>
  {dealerIdNumbers[0] ? values[0] : `${Math.round(values[0] * 100)}%`}
</Text>

                              </Text>
                              <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={1}
                                value={dealerIdNumbers[0]? parseFloat(values[0]) / 100: values[0]}
                                onValueChange={val =>
                                  handleValueChange(val, index)
                                }
                                minimumTrackTintColor={getTrackColor(dealerIdNumbers[0]?parseFloat(values[0])/100:values[0])}
                                maximumTrackTintColor="#000000"
                                thumbTintColor="#007BFF"
                              />
                            </View>
                          </View>
                        )}

                        {/* {(tyreSwitch.length === 0 || tyreSwitch[1] === 2) && index === 1 && ( */}
                        {index === 1 && (
                          <View style={{marginTop: 14}}>
                            <View style={styles.sliderContainer}>
                              <Text style={styles.percentageText}>
                              <Text style={styles.percentageText}>
  {dealerIdNumbers[1] ? values[1] : `${Math.round(values[1] * 100)}%`}
</Text>
                              </Text>
                              <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={1}
                                value={dealerIdNumbers[1]? parseFloat(values[1]) / 100: values[1]}
                                onValueChange={val =>
                                  handleValueChange(val, index)
                                }
                                minimumTrackTintColor={getTrackColor(dealerIdNumbers[1]?parseFloat(values[1])/100:values[1])}
                                maximumTrackTintColor="#000000"
                                thumbTintColor="#007BFF"
                              />
                            </View>
                          </View>
                        )}

                        {index === 2 && (
                          <View style={{marginTop: 14}}>
                            <View style={styles.sliderContainer}>
                            <Text style={styles.percentageText}>
  {dealerIdNumbers[2] ? values[2] : `${Math.round(values[2] * 100)}%`}
</Text>
                              <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={1}
                                value={dealerIdNumbers[2]? parseFloat(values[2]) / 100: values[2]}
                                onValueChange={val =>
                                  handleValueChange(val, index)
                                }
                                minimumTrackTintColor={getTrackColor(dealerIdNumbers[2]?parseFloat(values[2])/100:values[2])}
                                maximumTrackTintColor="#000000"
                                thumbTintColor="#007BFF"
                              />
                            </View>
                          </View>
                        )}
                        {index === 3 && (
                          <View style={{marginTop: 14}}>
                            <View style={styles.sliderContainer}>
                            <Text style={styles.percentageText}>
    {dealerIdNumbers[3] ? values[3] : `${Math.round(values[3] * 100)}%`}
</Text>
                              <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={1}
                                value={dealerIdNumbers[3]? parseFloat(values[3]) / 100: values[3]}
                                onValueChange={val =>
                                  handleValueChange(val, index)
                                }
                                minimumTrackTintColor={getTrackColor(dealerIdNumbers[3]?parseFloat(values[3])/100:values[3])}
                                maximumTrackTintColor="#000000"
                                thumbTintColor="#007BFF"
                              />
                            </View>
                          </View>
                        )}

                        {/* {(tyreSwitch.length === 0 || tyreSwitch[index] === 2) && ( */}
                        <View style={{marginTop: 14}}>
                          {!tyrePunchPhoto[index] && (
                            <TouchableOpacity
                              style={styles.photoInput}
                              onPress={() => openCamera5(index)}>
                              <Text>{`${item} Photo`}</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                        {/* )} */}
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
                            selectionMode={spareWheelSwitch[index]}
                            roundCorner={false}
                            option1={'Not Available'}
                            option2={'Available'}
                            onSelectSwitch={val => handleSwitch5(index, val)}
                            selectionColor={'#007BFF'}
                            index={index} // Pass the index as a prop
                          />
                        </View>
                        {spareWheelPunchPhoto[index] && (
                          <View style={{position: 'relative'}}>
                            <Image
                              source={{uri: spareWheelPunchPhoto[index]}}
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
                              onPress={() => handleCamera5(index)}>
                              <Text style={{fontSize: 14, color: 'white'}}>
                                Cancel
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}

                        {(spareWheelSwitch.length === 0 ||
                          spareWheelSwitch[index] === 2) && (
                          <>
                            <View style={{marginTop: 14}}>
                              <View key={index} style={styles.sliderContainer}>
                                <Text style={styles.percentageText}>
                                  
                                  {spareWheelIdNumber[0] ? spareWheel[0] : `${Math.round(spareWheel[0] * 100)}%`}
                                </Text>
                                <Slider
                                  style={styles.slider}
                                  minimumValue={0}
                                  maximumValue={1}
                                  value={spareWheelIdNumber[0]? parseFloat(spareWheel[0]) / 100: spareWheel[0]}
                                  onValueChange={val =>
                                    handleValueChange4(val, index)
                                  }
                                  minimumTrackTintColor={getTrackColor(spareWheelIdNumber[0]?parseFloat(spareWheel[0])/100:spareWheel[0])}
                                  maximumTrackTintColor="#000000"
                                  thumbTintColor="#007BFF"
                                />
                              </View>
                            </View>

                            <View style={{marginTop: 14}}>
                              <TextInput
                                style={styles.photoInput}
                                placeholder="Enter remarks"
                                value={spareWheelRemarks[index]}
                                onChangeText={text =>
                                  handleRemarks5(text, index)
                                }
                              />
                            </View>
                            {/* <View style={{marginTop: 14}}>
                      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={spareTyreValue[index]}
        onValueChange={setSliderValue}
        minimumTrackTintColor={getTrackColor(spareTyreValue)}
        maximumTrackTintColor="#000000"
        thumbTintColor="#000000"
      />
                      </View> */}
                            <View style={{marginTop: 14}}>
                              {!spareWheelPunchPhoto[index] && (
                                <TouchableOpacity
                                  style={styles.photoInput}
                                  onPress={() => openCamera5(index)}>
                                  <Text>{`${item} Photo`}</Text>
                                </TouchableOpacity>
                              )}
                            </View>
                          </>
                        )}
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
                            selectionMode={toolKitSwitch[index]}
                            roundCorner={false}
                            option1={'Not Available'}
                            option2={'Available'}
                            onSelectSwitch={val => handleSwitch5(index, val)}
                            selectionColor={'#007BFF'}
                            index={index} // Pass the index as a prop
                          />
                        </View>
                        {toolKitPunchPhoto[index] && (
                          <View style={{position: 'relative'}}>
                            <Image
                              source={{uri: toolKitPunchPhoto[index]}}
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
                              onPress={() => handleCamera5(index)}>
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
                            value={toolKitRemarks[index]}
                            onChangeText={text => handleRemarks5(text, index)}
                          />
                        </View>
                        <View style={{marginTop: 14}}>
                          <Picker
                            style={styles.photoInput}
                            selectedValue={toolKitCondition[index]}
                            onValueChange={itemValue =>
                              handleDropDown5(itemValue, index)
                            }>
                            <Picker.Item label="Select Condition" value="" />
                            <Picker.Item label="Good" value="Good" />
                            <Picker.Item label="Damaged" value="Damaged" />

                            {/* Add other items as needed */}
                          </Picker>
                        </View>
                        <View style={{marginTop: 14}}>
                          {!toolKitPunchPhoto[index] && (
                            <TouchableOpacity
                              style={styles.photoInput}
                              onPress={() => openCamera5(index)}>
                              <Text>{`${item} Photo`}</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    ))}
                </View>
                <View style={{paddingHorizontal: 0}}>
                  {carDetailsIndex === 2 &&
                    trunkBootList.map((item, index) => (
                      <View key={index} style={styles.itemContainer}>
                        <Text>{item}</Text>

                        {trunkBootPhoto[index] && (
                          <View stylle={{position: 'relative'}}>
                            <Image
                              source={{uri: trunkBootPhoto[index]}}
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
                              onPress={() => handleCamera5(index)}>
                              <Text style={{fontSize: 14, color: 'white'}}>
                                Cancel
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}

                        <View style={{marginTop: 0}}>
                          {!trunkBootPhoto[index] && (
                            <TouchableOpacity
                              style={styles.photoInput}
                              onPress={() => openCamera5(index)}>
                              <Text>{`${item} Photo`}</Text>
                            </TouchableOpacity>
                          )}
                        </View>

                        <View style={{marginTop: 14}}>
                          <TextInput
                            style={styles.photoInput}
                            placeholder="Enter remarks"
                            value={trunkBootRemarks[index]}
                            onChangeText={text => handleRemarks5(text, index)}
                          />
                        </View>
                      </View>
                    ))}
                </View>

                <View style={{paddingHorizontal: 0}}>
                  {carDetailsIndex === 5 &&
                    roofList.map((item, index) => (
                      <View key={index} style={styles.itemContainer}>
                        <Text>{item}</Text>

                        {roofPhoto[index] && (
                          <View stylle={{position: 'relative'}}>
                            <Image
                              source={{uri: roofPhoto[index]}}
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
                              onPress={() => handleCamera5(index)}>
                              <Text style={{fontSize: 14, color: 'white'}}>
                                Cancel
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}

                        <View style={{marginTop: 0}}>
                          {!roofPhoto[index] && (
                            <TouchableOpacity
                              style={styles.photoInput}
                              onPress={() => openCamera5(index)}>
                              <Text>{`${item} Photo`}</Text>
                            </TouchableOpacity>
                          )}
                        </View>

                        <View style={{marginTop: 14}}>
                          <TextInput
                            style={styles.photoInput}
                            placeholder="Enter remarks"
                            value={roofRemarks[index]}
                            onChangeText={text => handleRemarks5(text, index)}
                          />
                        </View>
                      </View>
                    ))}
                </View>

                <View style={{paddingHorizontal: 0}}>
                  {carDetailsIndex === 6 &&
                    underChassisList.map((item, index) => (
                      <View key={index} style={styles.itemContainer}>
                        <Text>{item}</Text>

                        {underChassisPhoto[index] && (
                          <View stylle={{position: 'relative'}}>
                            <Image
                              source={{uri: underChassisPhoto[index]}}
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
                              onPress={() => handleCamera5(index)}>
                              <Text style={{fontSize: 14, color: 'white'}}>
                                Cancel
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}

                        <View style={{marginTop: 0}}>
                          {!underChassisPhoto[index] && (
                            <TouchableOpacity
                              style={styles.photoInput}
                              onPress={() => openCamera5(index)}>
                              <Text>{`${item} Photo`}</Text>
                            </TouchableOpacity>
                          )}
                        </View>

                        <View style={{marginTop: 14}}>
                          <TextInput
                            style={styles.photoInput}
                            placeholder="Enter remarks"
                            value={underChassisRemarks[index]}
                            onChangeText={text => handleRemarks5(text, index)}
                          />
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
          <Text style={styles.indicator}>{`${currentIndex + 1}/${
            role === 'Reinspector' ? 8 : 7
          }`}</Text>

          {refreshing ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
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

                <CustomTextInput
                  label="Owner Username"
                  value={ownerDetails}
                  editible={false}
                  onChangeText={value => setOwnerDetails(value)}
                  placeholder="Owner Username"
                />

                <CustomTextInput
                  label="Owner Address"
                  value={ownerAddress}
                  editible={false}
                  onChangeText={value => setOwnerAddress(value)}
                  placeholder="Owner Address"
                />

                {/* ownerAddress */}

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
                  selectionMode={chooseAlteration}
                  roundCorner={true}
                  options={['Yes', 'No']}
                  onSelectSwitch={handleSwitchSelection2Boolean}
                  selectionColor="#007BFF"
                  label="Alteration"
                />
                {showAlterationOptions && (
                  <SingleSwitch
                    selectionMode={selectedOption2}
                    roundCorner={true}
                    options={['CNG', 'LPG', 'COLOUR']}
                    onSelectSwitch={handleSwitchSelection2}
                    selectionColor="#007BFF"
                    label="Choose Alteration"
                  />
                )}
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

                <CustomTextInputWithDatePicker
                  label="Road tax is valid"
                  value={roadTaxValid}
                  onChangeText={setRoadTaxValid}
                  placeholder="Enter the Road tax validity date"
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
                  <CustomButton
                    title="Next"
                    loading={loading}
                    onPress={() => {
                      if (id) {
                        handleNextUpdate(1);
                      } else {
                        handleNext(1);
                      }
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          )}
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
          <Text style={styles.indicator}>{`${currentIndex + 1}/${
            role === 'Reinspector' ? 8 : 7
          }`}</Text>
          {refreshing ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
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
                  //   editable={false}
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
                  <CustomButton
                    title="Next"
                    loading={loading}
                    onPress={() => {
                      if (id) {
                        handleNextUpdate(2);
                      } else {
                        handleNext(2);
                      }
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          )}
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
          <Text style={styles.indicator}>{`${currentIndex + 1}/${
            role === 'Reinspector' ? 8 : 7
          }`}</Text>

          {refreshing ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
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
                         {validations[index]
                            ? 'Update / View'
                            : 'Upload'}
                        </Text>
                        <Text style={styles.icon}>
                        
                            {validations[index]
                            ? '✅'
                            : '☒'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}

                <View style={{bottom: 0, marginTop: 410}}>
                  <CustomButton
                    title="Next"
                    loading={loading}
                    onPress={() => {
                      if (id) {
                        handleNextUpdate(3);
                      } else {
                        handleNext(3);
                      }
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          )}
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
          <Text style={styles.indicator}>{`${currentIndex + 1}/${
            role === 'Reinspector' ? 8 : 7
          }`}</Text>

          {refreshing ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
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
                         
                            {carPhotovalidations[index]
                            ? '✅'
                            : '☒'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}

                <View style={{bottom: 25, marginTop: 410}}>
                  <CustomButton
                    title="Next"
                    loading={loading}
                    onPress={() => {
                      if (id) {
                        handleNextUpdate(4);
                      } else {
                        handleNext(4);
                      }
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          )}
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
          <Text style={styles.indicator}>{`${currentIndex + 1}/${
            role === 'Reinspector' ? 8 : 7
          }`}</Text>
          {refreshing ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
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
                         
                            {carValidation[index]
                            ? 'Update / View'
                            : 'Upload'}
                        </Text>
                        <Text style={styles.icon}>
                      
                            {carValidation[index]
                            ? '✅'
                            : '☒'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}

                <View style={{bottom: 25, marginTop: 140}}>
                  <CustomButton
                    title="Next"
                    loading={loading}
                    onPress={() => {
                      if (id) {
                        handleNextUpdate(5);
                      } else {
                        handleNext(5);
                      }
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          )}
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
          <Text style={styles.indicator}>{`${currentIndex + 1}/${
            role === 'Reinspector' ? 8 : 7
          }`}</Text>

          {refreshing ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
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
                         {thirdValidation[index]
                            ? 'Update / View'
                            : 'Upload'}
                        </Text>
                        <Text style={styles.icon}>
                         {thirdValidation[index]
                            ? '✅'
                            : '☒'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}

                <View style={{bottom: 25, marginTop: 20}}>
                  <CustomButton
                    title="Next"
                    loading={loading}
                    onPress={() => {
                      if (id) {
                        handleNextUpdate(6);
                      } else {
                        handleNext(6);
                      }
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          )}
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
          <Text style={styles.indicator}>{`${currentIndex + 1}/${
            role === 'Reinspector' ? 8 : 7
          }`}</Text>

          {refreshing ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
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
                         {secondValidation[index]
                            ? 'Update / View'
                            : 'Upload'}
                        </Text>
                        <Text style={styles.icon}>
                          {secondValidation[index]
                            ? '✅'
                            : '☒'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}

                <View style={{bottom: 25, marginTop: 20}}>
                  <CustomButton
                    title={role == 'Reinspector' ? 'Next' : 'Save'}
                    loading={loading}
                    onPress={() => {
                      if (id) {
                        handleNextUpdate(7);
                      } else {
                        handleNext(7);
                      }
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          )}
        </View>

        {role === 'Reinspector' && (
          <View style={styles.slide}>
            <Text style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}>
              Car Photos
            </Text>
            <View style={styles.progressBarContainer}>
              <View
                style={[styles.progressBar, {width: getProgressBarWidth()}]}
              />
            </View>
            <Text style={styles.indicator}>{`${currentIndex + 1}/${
              role === 'Reinspector' ? 8 : 7
            }`}</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.wrapperContainer}>
                {reinspectorList.map((title, index) => (
                  <View key={index} style={styles.photoContainer}>
                    <Text style={styles.label}>{title}</Text>
                    <TouchableOpacity
                      style={styles.photoInput}
                      onPress={() => handleCarPhotosForLastPage(index)}>
                      <View style={styles.touchableContent}>
                        <Text style={styles.touchableText}>
                          {reinspectorValidation[index]
                            ? 'Update / View'
                            : 'Upload'}
                        </Text>
                        <Text style={styles.icon}>
                          {reinspectorValidation[index] ? '✅' : '☒'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}

                <View style={{bottom: 25, marginTop: 20}}>
                  <CustomButton
                    title="Submit"
                    loading={loading}
                    onPress={() => {
                      if (id) {
                        handleNextUpdate(8);
                      } else {
                        handleNext(8);
                      }
                    }}
                  />
                  {/* <CustomSubmitButton
          title="Submit"
          refreshing={refreshing}
          onPress={() => {
            if (id) {
              handleNext(7, 'submit');
            } else {
              handleNext(7);
            }
          }}
        /> */}
                </View>
              </View>
            </ScrollView>
          </View>
        )}
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
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
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
  itemContainer1: {
    paddingHorizontal: 8,
    marginTop: 10,
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
    width: '105%',
    height: 40,
  },
  percentageText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
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
