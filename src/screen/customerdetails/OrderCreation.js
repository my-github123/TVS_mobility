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
  } = route.params;

  console.log(id, orderId, 'VECHICLE NUMBER');

  const dispatch = useDispatch();

  const orderData = useSelector(selectOrderData);

  const [role,setRole]=useState("");

  useEffect(() => {
     getData();
  }, []);


  const getData=async()=>{
    const roleType = await getItem('role');
    setRole(roleType);
     
  }

  const [make, setMake] = useState(vehicleMakerDescription);
  const [model, setModel] = useState(vehicleMakeModel);
  const [ownerDetails, setOwnerDetails] = useState('');
  const [year, setYear] = useState(vehicleManufacturedDate);
  const [variant, setVariant] = useState(vehicleMakeModel);
  const [mileage, setMileage] = useState('');
  const [color, setColor] = useState(vehicleColor);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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
  const [selectedOption3, setSelectedOption3] = useState(
    vehicleFinanced === 'NA' ? 2 : 1,
  );
  const [selectedOption4, setSelectedOption4] = useState('');
  const [selectedOption5, setSelectedOption5] = useState('');
  const [selectedOption6, setSelectedOption6] = useState('');
  const [selectedOption7, setSelectedOption7] = useState(
    blacklist === 'NA' ? 2 : 1,
  );
  const [selectedOption8, setSelectedOption8] = useState('');
  const [selectedOption9, setSelectedOption9] = useState('');
  const [selectedOption10, setSelectedOption10] = useState('');

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

  const [sliderValues, setSliderValues] = useState([0, 0, 0, 0]);

  const handleValueChange = (value, index) => {
    const newValues = [...sliderValues];
    newValues[index] = value;
    setSliderValues(newValues);
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
    
    'UnderChassis Photo',
    'EngineRoom Photo',
    'TrunkBoot Photo',
  ];


  const reinspectorList=[
    'FrontView Photo',
    'RearView Photo',
    'LHSView Photo',
    'RHSView Photo',
    'OdoMeter Photo',
    'Roof Photo',
    'Interior Photo',
  ]
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

  const rcList = ['RC FrontPhoto', 'RCBackPhoto', 'Others'];
  const insuranceList = [
    'Insurance OwnDamage Photo',
    'Insurance ThirdParty Photo',
    'Others',
  ];
  const nocList = ['NOC Photo', 'NOC Others'];

  const [rcPhoto, setRcPhoto] = useState(Array.from({length: 3}, () => ''));

  const [rcBase64, setRcBase64] = useState(Array.from({length: 3}, () => ''));

  const [insurancePhoto, setInsuracePhoto] = useState(
    Array.from({length: 3}, () => ''),
  );

  const [insuranceBase64, setInsuraceBase64] = useState(
    Array.from({length: 3}, () => ''),
  );

  const [nocPhoto, setNOCPhoto] = useState(Array.from({length: 2}, () => ''));

  const [nocBase64, setNOCBase64] = useState(Array.from({length: 3}, () => ''));

  const [rcRemarks, setRCRemarks] = useState('');
  const [insuranceRemarks, setInsuranceRemarks] = useState('');
  const [nocRemarks, setNocRemarks] = useState('');

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
    Array.from({length:3}, () => ''),
  );


  const [reinspectorPhoto,setReinspectorPhoto] = useState(
    Array.from({length:7}, () => ''),
  );

  const [reinspectorRemarks, setReinspectorRemarks] = useState(
    Array.from({length:7}, () => ''),
  );

  const [carPhotosRemarks, setCarPhotoRemarks] = useState(
    Array.from({length:3}, () => ''),
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
    Array.from({length:3}, () => ''),
  );


  const [base64ReinspectorPhoto, setBase64ReinspectorPhoto] = useState(
    Array.from({length:7}, () => ''),
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
  const [carIndex8,setCarIndex8]=useState(null);
  const [reinspectorPage,setReinspectorPage]=useState(false)
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

  const getPhotoStatus = (photos, index) => {
    return photos[index];
  };

  const handleNext = async (step) => {
    const itemId = await getItem('dealarId');
    setLoading(true)
    let params = {};

  

   

    switch (step) {
      case 1:
        params = {
          id: id ? id : orderId,
          dealerId: itemId,
          orderStatus: 1,
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
        };
        break;
      case 3:
        params = {
          dealerId: itemId,
          id: id ? id : orderId,
          orderStatus: 1,
          rcFrontPhoto: rcBase64[0],
          rcBackPhoto: rcBase64[1],
          RCOthers: rcBase64[2],
          rcRemarks: remarks,
          insuranceOwnDamagePhoto: insuranceBase64[0],
          insuranceThirdPartyPhoto: insuranceBase64[1],
          insuranceOthers: insuranceBase64[2],
          insuranceRemarks: remarks,
          nocPhoto: nocBase64[0],
          nocOthers: nocBase64[1],
          nocRemarks: remarks,
        };
        params = Object.fromEntries(
          Object.entries(params).filter(
            ([_, value]) => value !== '' && value !== null && value !== false,
          ),
        );

        break;
      case 4:
        params = {
         
          underChassisPhoto: base64CarPhotos[0],
          underChassisRemarks: carPhotosRemarks[0],
          engineRoomPhoto: base64CarPhotos[1],
          engineRoomRemarks: carPhotosRemarks[1],
          trunkBootPhoto: base64CarPhotos[2],
          trunkBootRemarks: carPhotosRemarks[2],
        };

        params = Object.fromEntries(
          Object.entries(params).filter(
            ([_, value]) => value !== '' && value !== null && value !== false,
          ),
        );

        break;
      case 5:
        params = {
          dealerId: itemId,
          id: id ? id : orderId,
          orderStatus: 1,
          chassisPunchPhoto: chassisBase64[0],
          chasisPunchStatus: chassisSwitch[0],
          chassisPunchCondition: chassisCondition[0],
          chassisPunchRemarks: chassisRemarks[0],
          vinPlatePhoto: vinPlateBase64[0],
          vinPlateStatus: vinPlateSwitch[0],
          vinPlateCondition: vinPlateCondition[0],
          vinPlateRemarks: vinPlateRemarks[0],
          frontTyreLeftPhoto: tyreBase64[0],
          frontTyreLeftStatus: tyreSwitch[0],
          frontTyreLeftPercentage: tyreCondition[0],
          frontTyreLeftRemarks: tyreRemarks[0],
          frontTyreRightPhoto: tyreBase64[1],
          frontTyreRightStatus: tyreSwitch[1],
          frontTyreRightPercentage: tyreCondition[1],
          frontTyreRightRemarks: tyreRemarks[1],
          rearTyreLeftPhoto: tyreBase64[2],
          rearTyreLeftStatus: tyreSwitch[2],
          rearTyreLeftPercentage: tyreCondition[2],
          rearTyreLeftRemarks: tyreRemarks[2],
          rearTyreRightPhoto: tyreBase64[3],
          rearTyreRightStatus: tyreSwitch[3],
          rearTyreRightPercentage: tyreCondition[3],
          rearTyreRightRemarks: tyreRemarks[3],
          spareWheelPhoto: spareWheelBase64[0],
          spareWheelStatus: spareWheelSwitch[0],
          spareWheelPercentage: spareWheelCondition[0],
          spareWheelRemarks: spareWheelRemarks[0],
          toolKitJackPhoto: toolKitBase64[0],
          toolKitJackStatus: toolKitSwitch[0],
          toolKitCondition: toolKitCondition[0],
          toolKitRemarks: toolKitRemarks[0],
          primaryKeyPhoto: keyBase64[0],
          primaryKeyStatus: keySwitch[0],
          primaryKeyCondition: keyCondition[0],
          primaryKeyRemarks: keyRemarks[0],
          spareKeyPhoto: keyBase64[1],
          spareKeyStatus: keySwitch[1],
          spareKeyCondition: keyCondition[1],
          spareKeyRemarks: keyRemarks[1],
        };

        params = Object.fromEntries(
          Object.entries(params).filter(
            ([_, value]) => value !== '' && value !== null && value !== false,
          ),
        );

        break;

      case 6:
        params = {
          dealerId: itemId,
          id: id ? id : orderId,
          orderStatus: 1,
          pillarALeftSidePhoto: pillarBase64[0],
          pillarALeftSideStatus: pillarSwitch[0],
          pillarALeftSideCondition: pillarsCondition[0],
          pillarALeftSideRemarks: pillarsPhotoRemarks[0],
          pillarARightSidePhoto: pillarBase64[1],
          pillarARightSideStatus: pillarSwitch[1],
          pillarARightSideCondition: pillarsCondition[1],
          pillarARightSideRemarks: pillarsPhotoRemarks[1],
          pillarBLeftSidePhoto: pillarBase64[2],
          pillarBLeftSideStatus: pillarSwitch[2],
          pillarBLeftSideCondition: pillarsCondition[2],
          pillarBLeftSideRemarks: pillarsPhotoRemarks[2],
          pillarBRightSidePhoto: pillarBase64[3],
          pillarBRightSideStatus: pillarSwitch[3],
          pillarBRightSideCondition: pillarsCondition[3],
          pillarBRightSideRemarks: pillarsPhotoRemarks[3],
          pillarCLeftSidePhoto: pillarBase64[4],
          pillarCLeftSideStatus: pillarSwitch[4],
          pillarCLeftSideCondition: pillarsCondition[4],
          pillarCLeftSideRemarks: pillarsPhotoRemarks[4],
          pillarCRightSidePhoto: pillarBase64[5],
          pillarCRightSideStatus: pillarSwitch[5],
          pillarCRightSideCondition: pillarsCondition[5],
          pillarCRightSideRemarks: pillarsPhotoRemarks[5],
          apronLeftSidePhoto: apronBase64[0],
          apronLeftSideStatus: apronSwitch[0],
          apronLeftSideCondition: apronCondition[0],
          apronLeftSideRemarks: apronRemarks[0],
          apronRightSidePhoto: apronBase64[1],
          apronRightSideStatus: apronSwitch[1],
          apronRightSideCondition: apronCondition[1],
          apronRightSideRemarks: apronRemarks[1],
          fendersRightSidePhoto: fennderBase64[0],
          fendersRightSideStatus: fenderSwitch[0],
          fendersRightSideCondition: fenderCondition[0],
          fendersRightSideRemarks: fenderRemarks[0],
          fendersLeftSidePhoto: fennderBase64[1],
          fendersLeftSideStatus: fenderSwitch[1],
          fendersLeftSideCondition: fenderCondition[1],
          fendersLeftSideRemarks: fenderRemarks[1],
          quarterPanelsLeftSidePhoto: quarterPanlesBase64[0],
          quarterPanelsLeftSideStatus: quarterPanlesSwitch[0],
          quarterPanelsLeftSideCondition: quarterPanlesCondition[0],
          quarterPanelsLeftSideRemarks: quarterPanlesRemarks[0],
          quarterPanelsRightSidePhoto: quarterPanlesBase64[1],
          quarterPanelsRightSideStatus: quarterPanlesSwitch[1],
          quarterPanelsRightSideCondition: quarterPanlesCondition[1],
          quarterPanelsRightSideRemarks: quarterPanlesRemarks[1],
          doorsFrontRightSidePhoto: doorBase64[0],
          doorsFrontRightSideStatus: doorSwitch[0],
          doorsFrontRightSideCondition: doorSwitch[0],
          doorsFrontRightSideRemarks: doorRemarks[0],
          doorsFrontLeftSidePhoto: doorBase64[1],
          doorsFrontLeftSideStatus: doorSwitch[1],
          doorsFrontLeftSideCondition: doorCondition[1],
          doorsFrontLeftSideRemarks: doorRemarks[1],
          doorsRearRightSidePhoto: doorBase64[2],
          doorsRearRightSideStatus: doorSwitch[2],
          doorsRearRightSideCondition: doorCondition[2],
          doorsRearRightSideRemarks: doorRemarks[2],
          doorsRearLeftSidePhoto: doorBase64[3],
          doorsRearLeftSideStatus: doorSwitch[3],
          doorsRearLeftSideCondition: doorCondition[3],
          doorsRearLeftSideRemarks: doorRemarks[3],
          runningBoardLeftSidePhoto: runningBoardBase64[0],
          runningBoardLeftSideStatus: runningBoardSwitch[0],
          runningBoardLeftSideCondition: runnningBoardCondition[0],
          runningBoardLeftSideRemarks: runningBoardRemarks[0],
          runningBoardRightSidePhoto: runningBoardBase64[1],
          runningBoardRightSideStatus: runningBoardSwitch[1],
          runningBoardRightSideCondition: runnningBoardCondition[1],
          runningBoardRightSideRemarks: runningBoardRemarks[1],
          bootPhoto: dickyDoorBase64[0],
          bootStatus: dickyDoorSwitch[0],
          bootCondition: dickyDoorCondition[0],
          bootRemarks: dickyDoorRemarks[0],
          bootSkirtPhoto: dickySkirtBase64[0],
          bootSkirtStatus: dickySkirtSwitch[0],
          bootSkirtCondition: dickySkirtCondition[0],
          bootSkirtRemarks: dickySkirtRemarks[0],
          bonetPhoto: bonetBase64[0],
          bonetStatus: bonetSwitch[0],
          bonetCondition: bonetCondition[0],
          bonetRemarks: bonetRemarks[0],
          supportMemberUpperPhoto: supportMembersBase64[0],
          supportMemberUpperStatus: supportMembersSwitch[0],
          suportMemberUpperCondition: supportMembersCondition[0],
          supportMemberUpperRemarks: supportMembersRemarks[0],
          supportMemberLowerPhoto: supportMembersBase64[1],
          supportMemberLowerStatus: supportMembersSwitch[1],
          supportMemberLowerCondition: supportMembersCondition[1],
          supportMemberLowerRemarks: supportMembersRemarks[1],
          headLampSupportRightSidePhoto: supportMembersBase64[2],
          headLampSupportRightSideStatus: supportMembersSwitch[2],
          headLampSupportRightSideCondition: supportMembersCondition[2],
          headLampSupportRightSideRemarks: supportMembersRemarks[2],
          headLampSupportLeftSidePhoto: supportMembersBase64[3],
          headLampSupportLeftSideStatus: supportMembersSwitch[3],
          headLampSupportLeftSideCondition: supportMembersCondition[3],
          headLampSupportLeftSideRemarks: supportMembersRemarks[3],
          wheelTypeAlloyPhoto: wheelTypeBase64[0],
          wheelTypeAlloyStatus: wheelTypeSwitch[0],
          wheelTypeAlloyCondition: wheelTypeCondition[0],
          wheelTypeAlloyRemarks: wheelTypeRemarks[0],
          wheelTypeDrumPhoto: wheelTypeBase64[1],
          wheelTypeDrumStatus: wheelTypeSwitch[1],
          wheelTypeDrumCondition: wheelTypeCondition[1],
          wheelTypeDrumRemarks: wheelTypeRemarks[1],
          windShieldFrontTyrePhoto: windShieldBase64[0],
          windShieldFrontTyreStatus: windShieldSwitch[0],
          windShieldFrontTyreCondition: windShieldCondition[0],
          windShieldFrontTyreRemarks: windShieldRemarks[0],
          windShieldRearTyrePhoto: windShieldBase64[1],
          windShieldRearTyreStatus: windShieldSwitch[1],
          windShieldRearTyreCondition: windShieldCondition[1],
          windShieldRearTyreRemarks: windShieldRemarks[1],
          bumperFrontPhoto: bumperBase64[0],
          bumperFrontStatus: bumperSwitch[0],
          bumperFrontCondition: bumperCondition[0],
          bumperFrontRemarks: bumperRemarks[0],
          bumperRearPhoto: bumperBase64[1],
          bumperRearStatus: bumperSwitch[1],
          bumperRearCondition: bumperCondition[1],
          bumperRearRemarks: bumperRemarks[1],
        };

        params = Object.fromEntries(
          Object.entries(params).filter(
            ([_, value]) => value !== '' && value !== null && value !== false,
          ),
        );

        break;

      case 7:
        params = {
          dealerId: itemId,
          id: id ? id : orderId,
          orderStatus:1,
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
          Object.entries(params).filter(
            ([_, value]) => value !== '' && value !== null && value !== false,
          ),
        );
        break;
        
      
        case 8:
          params ={
            dealerId: itemId,
            id: id ? id : orderId,
            orderStatus:2,
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
          }

          params = Object.fromEntries(
            Object.entries(params).filter(
              ([_, value]) => value !== '' && value !== null && value !== false,
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
      console.log(params, 'pgyfy');
      const data = await apiPostWithToken('updateOrder', params);


      if(step ==8) {
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

    // else if (role ==="Reinspector" && step == 8) {
    //     navigation.dispatch(
    //       CommonActions.reset({
    //         index: 0,
    //         routes: [{name: 'Dashboard'}],
    //       }),
    //     );
    //   } 
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

  const handleNextUpdate = async (step, save) => {
    setLoading(true); // Show activity indicator

    console.log(orderData, 'OderDSsasa');

    const itemId = await getItem('dealarId');
    const oldObject = {};
    const newObject = {};
    const updatedFields = {};

    switch (step) {
      case 1:
        oldObject = {
          id: id,
          dealerId: itemId,
          orderStatus: 1,
          vechNumber: vechicleNumber,
          make: orderData.make || '',
          model: orderData.model || '',
          year: orderData.year || '',
          variant: orderData.variant || '',
          mileage: orderData.mileage || '',
          color: orderData.color || '',
          transmission: orderData.transmission == 'Automatic' ? 1 : 2,
          fuelType: orderData.fuelType == 'Diesel' ? 1 : 2,
          alteration: orderData.alteration == 'CNG' ? 1 : 2,
          owners: orderData.owners || '',
          hasHypothecated: orderData.hasHypothecated == 'Yes' ? 1 : 2,
          hypothecatedBy: orderData.hypothecatedBy || '',
          noc: orderData.noc == 'Yes' ? 1 : 2,
          roadTaxValid: orderData.roadTaxValid || '',
          reRegistered: orderData.reRegistered == 'Yes' ? 1 : 2,
          cubicCapacity: orderData.cubicCapacity || '',
        };

        newObject = {
          id: id,
          dealerId: itemId,
          orderStatus: 1,
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
        };

        updatedFields = findDifferences(oldObject, newObject);
        console.log(updatedFields, 'khkjhjhjgjg');
        break;
      case 2:
        oldObject = {
          dealerId: itemId,
          id: id,
          orderStatus: 1,
          numberOfSeats: orderData.numberOfSeats || '',
          registrationType: orderData.registrationType || '',
          registrationDate: orderData.registrationDate || '',
          insurance: orderData == 'Yes' ? 1 : 2,
          insuranceCompany: orderData.insuranceCompany || '',
          insuranceValidity: orderData.insuranceValidity || '',
          challanDetails: orderData.challanDetails || '',
          blacklisted: orderData == 'Yes' ? 1 : 2,
          chassisNumber: orderData.chassisNumber || '',
          engineNumber: orderData.engineNumber || '',
          rcStatus: orderData == 'Original' ? 1 : 2,
          stateNoc: orderData == 'Yes' ? 1 : 2,
          flood: orderData == 'Yes' ? 1 : 2,
        };

        newObject = {
          dealerId: itemId,
          id: id,
          orderStatus: 1,
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
        };

        updatedFields = await findDifferences(oldObject, newObject);
        break;
      case 3:
        oldObject = {
          dealerId: itemId,
          id: id,
          orderStatus: 1,
          rcFrontPhoto: orderData.rcFrontPhoto || '',
          rcBackPhoto: orderData.rcBackPhoto || '',
          RCOthers: orderData.RCOthers || '',
          rcRemarks: orderData.rcRemarks || '',
          insuranceOwnDamagePhoto: orderData.insuranceOwnDamagePhoto || '',
          insuranceThirdPartyPhoto: orderData.insuranceThirdPartyPhoto || '',
          insuranceOthers: orderData.insuranceOthers || '',
          insuranceRemarks: orderData.insuranceRemarks || '',
          nocPhoto: orderData.nocPhoto || '',
          nocOthers: orderData.nocOthers || '',
          nocRemarks: orderData.nocRemarks || '',
        };
        newObject = {
          dealerId: itemId,
          id: id,
          orderStatus: 1,
          rcFrontPhoto: rcBase64[0],
          rcBackPhoto: rcBase64[1],
          RCOthers: rcBase64[2],
          rcRemarks: remarks,
          insuranceOwnDamagePhoto: insuranceBase64[0],
          insuranceThirdPartyPhoto: insuranceBase64[1],
          insuranceOthers: insuranceBase64[2],
          insuranceRemarks: remarks,
          nocPhoto: nocBase64[0],
          nocOthers: nocBase64[1],
          nocRemarks: remarks,
        };
        updatedFields = await findDifferences(oldObject, newObject);

        break;
      case 4:
        oldObject = {
          dealerId: itemId,
          id: id,
          orderStatus: 1,
          frontViewPhoto: orderData.frontViewPhoto || '',
          frontViewRemarks: orderData.frontViewRemarks || '',
          rearViewPhoto: orderData.rearViewPhoto || '',
          rearViewRemarks: orderData.rearViewRemarks || '',
          lhsViewPhoto: orderData.lhsViewPhoto || '',
          lhsViewRemarks: orderData.lhsViewRemarks || '',
          rhsViewPhoto: orderData.rhsViewPhoto || '',
          rhsViewRemarks: orderData.rhsViewRemarks || '',
          odometerPhoto: orderData.odometerPhoto || '',
          odometerRemarks: orderData.odometerRemarks || '',
          roofPhoto: orderData.roofPhoto || '',
          roofRemarks: orderData.roofRemarks || '',
          interiorPhoto: orderData.interiorPhoto || '',
          interiorRemarks: orderData.interiorRemarks || '',
          underChassisPhoto: orderData.underChassisPhoto || '',
          underChassisRemarks: orderData.underChassisRemarks || '',
          engineRoomPhoto: orderData.engineRoomPhoto || '',
          engineRoomRemarks: orderData.engineRoomRemarks || '',
          trunkBootPhoto: orderData.trunkBootPhoto || '',
          trunkBootRemarks: orderData.trunkBootRemarks || '',
        };
        newObject = {
          dealerId: itemId,
          id: id,
          orderStatus: 1,
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
        };

        updatedFields = await findDifferences(oldObject, newObject);

        break;
      case 5:
        oldObject = {
          dealerId: itemId,
          id: id,
          orderStatus: 1,
          chassisPunchPhoto: orderData.chassisPunchPhoto || '',
          chasisPunchStatus: orderData.chasisPunchStatus || '',
          chassisPunchCondition: orderData.chassisPunchCondition || '',
          chassisPunchRemarks: orderData.chassisPunchRemarks || '',
          vinPlatePhoto: orderData.vinPlatePhoto || '',
          vinPlateStatus: orderData.vinPlateStatus || '',
          vinPlateCondition: orderData.vinPlateCondition || '',
          vinPlateRemarks: orderData.vinPlateRemarks || '',
          frontTyreLeftPhoto: orderData.frontTyreLeftPhoto || '',
          frontTyreLeftStatus: orderData.frontTyreLeftStatus || '',
          frontTyreLeftPercentage: orderData.frontTyreLeftPercentage || '',
          frontTyreLeftRemarks: orderData.frontTyreLeftRemarks || '',
          frontTyreRightPhoto: orderData.frontTyreRightPhoto || '',
          frontTyreRightStatus: orderData.frontTyreRightStatus || '',
          frontTyreRightPercentage: orderData.frontTyreRightPercentage || '',
          frontTyreRightRemarks: orderData.frontTyreRightRemarks || '',
          rearTyreLeftPhoto: orderData.rearTyreLeftPhoto || '',
          rearTyreLeftStatus: orderData.rearTyreLeftStatus || '',
          rearTyreLeftPercentage: orderData.rearTyreLeftPercentage || '',
          rearTyreLeftRemarks: orderData.rearTyreLeftRemarks || '',
          rearTyreRightPhoto: orderData.rearTyreRightPhoto || '',
          rearTyreRightStatus: orderData.rearTyreRightStatus || '',
          rearTyreRightPercentage: orderData.rearTyreRightPercentage || '',
          rearTyreRightRemarks: orderData.rearTyreRightRemarks || '',
          spareWheelPhoto: orderData.spareWheelPhoto || '',
          spareWheelStatus: orderData.spareWheelStatus || '',
          spareWheelPercentage: orderData.spareWheelPercentage || '',
          spareWheelRemarks: orderData.spareWheelRemarks || '',
          toolKitJackPhoto: orderData.toolKitJackPhoto || '',
          toolKitJackStatus: orderData.toolKitJackStatus || '',
          toolKitCondition: orderData.toolKitCondition || '',
          toolKitRemarks: orderData.toolKitRemarks || '',
          primaryKeyPhoto: orderData.primaryKeyPhoto || '',
          primaryKeyStatus: orderData.primaryKeyStatus || '',
          primaryKeyCondition: orderData.primaryKeyCondition || '',
          primaryKeyRemarks: orderData.primaryKeyRemarks || '',
          spareKeyPhoto: orderData.spareKeyPhoto || '',
          spareKeyStatus: orderData.spareKeyStatus || '',
          spareKeyCondition: orderData.spareKeyCondition || '',
          spareKeyRemarks: orderData.spareKeyRemarks || '',
        };
        newObject = {
          dealerId: itemId,
          id: id,
          orderStatus: 1,
          chassisPunchPhoto: chassisBase64[0],
          chasisPunchStatus: chassisSwitch[0],
          chassisPunchCondition: chassisCondition[0],
          chassisPunchRemarks: chassisRemarks[0],
          vinPlatePhoto: vinPlateBase64[0],
          vinPlateStatus: vinPlateSwitch[0],
          vinPlateCondition: vinPlateCondition[0],
          vinPlateRemarks: vinPlateRemarks[0],
          frontTyreLeftPhoto: tyreBase64[0],
          frontTyreLeftStatus: tyreSwitch[0],
          frontTyreLeftPercentage: tyreCondition[0],
          frontTyreLeftRemarks: tyreRemarks[0],
          frontTyreRightPhoto: tyreBase64[1],
          frontTyreRightStatus: tyreSwitch[1],
          frontTyreRightPercentage: tyreCondition[1],
          frontTyreRightRemarks: tyreRemarks[1],
          rearTyreLeftPhoto: tyreBase64[2],
          rearTyreLeftStatus: tyreSwitch[2],
          rearTyreLeftPercentage: tyreCondition[2],
          rearTyreLeftRemarks: tyreRemarks[2],
          rearTyreRightPhoto: tyreBase64[3],
          rearTyreRightStatus: tyreSwitch[3],
          rearTyreRightPercentage: tyreCondition[3],
          rearTyreRightRemarks: tyreRemarks[3],
          spareWheelPhoto: spareWheelBase64[0],
          spareWheelStatus: spareWheelSwitch[0],
          spareWheelPercentage: spareWheelCondition[0],
          spareWheelRemarks: spareWheelRemarks[0],
          toolKitJackPhoto: toolKitBase64[0],
          toolKitJackStatus: toolKitSwitch[0],
          toolKitCondition: toolKitCondition[0],
          toolKitRemarks: toolKitRemarks[0],
          primaryKeyPhoto: keyBase64[0],
          primaryKeyStatus: keySwitch[0],
          primaryKeyCondition: keyCondition[0],
          primaryKeyRemarks: keyRemarks[0],
          spareKeyPhoto: keyBase64[1],
          spareKeyStatus: keySwitch[1],
          spareKeyCondition: keyCondition[1],
          spareKeyRemarks: keyRemarks[1],
        };

        updatedFields = await findDifferences(oldObject, newObject);

        break;

      case 6:
        oldObject = {
          dealerId: itemId,
          id: id,
          orderStatus: 1,
          pillarALeftSidePhoto: orderData.pillarALeftSidePhoto || '',
          pillarALeftSideStatus: orderData.pillarALeftSideStatus || '',
          pillarALeftSideCondition: orderData.pillarALeftSideCondition || '',
          pillarALeftSideRemarks: orderData.pillarALeftSideRemarks || '',
          pillarARightSidePhoto: orderData.pillarARightSidePhoto || '',
          pillarARightSideStatus: orderData.pillarARightSideStatus || '',
          pillarARightSideCondition: orderData.pillarARightSideCondition || '',
          pillarARightSideRemarks: orderData.pillarARightSideRemarks || '',
          pillarBLeftSidePhoto: orderData.pillarBLeftSidePhoto || '',
          pillarBLeftSideStatus: orderData.pillarBLeftSideStatus || '',
          pillarBLeftSideCondition: orderData.pillarBLeftSideCondition || '',
          pillarBLeftSideRemarks: orderData.pillarBLeftSideRemarks || '',
          pillarBRightSidePhoto: orderData.pillarBRightSidePhoto || '',
          pillarBRightSideStatus: orderData.pillarBRightSideStatus || '',
          pillarBRightSideCondition: orderData.pillarBRightSideCondition || '',
          pillarBRightSideRemarks: orderData.pillarBRightSideRemarks || '',
          pillarCLeftSidePhoto: orderData.pillarCLeftSidePhoto || '',
          pillarCLeftSideStatus: orderData.pillarCLeftSideStatus || '',
          pillarCLeftSideCondition: orderData.pillarCLeftSideCondition || '',
          pillarCLeftSideRemarks: orderData.pillarCLeftSideRemarks || '',
          pillarCRightSidePhoto: orderData.pillarCRightSidePhoto || '',
          pillarCRightSideStatus: orderData.pillarCRightSideStatus || '',
          pillarCRightSideCondition: orderData.pillarCRightSideCondition || '',
          pillarCRightSideRemarks: orderData.pillarCRightSideRemarks || '',
          apronLeftSidePhoto: orderData.apronLeftSidePhoto || '',
          apronLeftSideStatus: orderData.apronLeftSideStatus || '',
          apronLeftSideCondition: orderData.apronLeftSideCondition || '',
          apronLeftSideRemarks: orderData.apronLeftSideRemarks || '',
          apronRightSidePhoto: orderData.apronRightSidePhoto || '',
          apronRightSideStatus: orderData.apronRightSideStatus || '',
          apronRightSideCondition: orderData.apronRightSideCondition || '',
          apronRightSideRemarks: orderData.apronRightSideRemarks || '',
          fendersRightSidePhoto: orderData.fendersRightSidePhoto || '',
          fendersRightSideStatus: orderData.fendersRightSideStatus || '',
          fendersRightSideCondition: orderData.fendersRightSideCondition || '',
          fendersRightSideRemarks: orderData.fendersRightSideRemarks || '',
          fendersLeftSidePhoto: orderData.fendersLeftSidePhoto || '',
          fendersLeftSideStatus: orderData.fendersLeftSideStatus || '',
          fendersLeftSideCondition: orderData.fendersLeftSideCondition || '',
          fendersLeftSideRemarks: orderData.fendersLeftSideRemarks || '',
          quarterPanelsLeftSidePhoto:
            orderData.quarterPanelsLeftSidePhoto || '',
          quarterPanelsLeftSideStatus:
            orderData.quarterPanelsLeftSideStatus || '',
          quarterPanelsLeftSideCondition:
            orderData.quarterPanelsLeftSideCondition || '',
          quarterPanelsLeftSideRemarks:
            orderData.quarterPanelsLeftSideRemarks || '',
          quarterPanelsRightSidePhoto:
            orderData.quarterPanelsRightSidePhoto || '',
          quarterPanelsRightSideStatus:
            orderData.quarterPanelsRightSideStatus || '',
          quarterPanelsRightSideCondition:
            orderData.quarterPanelsRightSideCondition || '',
          quarterPanelsRightSideRemarks:
            orderData.quarterPanelsRightSideRemarks || '',
          doorsFrontRightSidePhoto: orderData.doorsFrontRightSidePhoto || '',
          doorsFrontRightSideStatus: orderData.doorsFrontRightSideStatus || '',
          doorsFrontRightSideCondition:
            orderData.doorsFrontRightSideCondition || '',
          doorsFrontRightSideRemarks:
            orderData.doorsFrontRightSideRemarks || '',
          doorsFrontLeftSidePhoto: orderData.doorsFrontLeftSidePhoto || '',
          doorsFrontLeftSideStatus: orderData.doorsFrontLeftSideStatus || '',
          doorsFrontLeftSideCondition:
            orderData.doorsFrontLeftSideCondition || '',
          doorsFrontLeftSideRemarks: orderData.doorsFrontLeftSideRemarks || '',
          doorsRearRightSidePhoto: orderData.doorsRearRightSidePhoto || '',
          doorsRearRightSideStatus: orderData.doorsRearRightSideStatus || '',
          doorsRearRightSideCondition:
            orderData.doorsRearRightSideCondition || '',
          doorsRearRightSideRemarks: orderData.doorsRearRightSideRemarks || '',
          doorsRearLeftSidePhoto: orderData.doorsRearLeftSidePhoto || '',
          doorsRearLeftSideStatus: orderData.doorsRearLeftSideStatus || '',
          doorsRearLeftSideCondition:
            orderData.doorsRearLeftSideCondition || '',
          doorsRearLeftSideRemarks: orderData.doorsRearLeftSideRemarks || '',
          runningBoardLeftSidePhoto: orderData.runningBoardLeftSidePhoto || '',
          runningBoardLeftSideStatus:
            orderData.runningBoardLeftSideStatus || '',
          runningBoardLeftSideCondition:
            orderData.runningBoardLeftSideCondition || '',
          runningBoardLeftSideRemarks:
            orderData.runningBoardLeftSideRemarks || '',
          runningBoardRightSidePhoto:
            orderData.runningBoardRightSidePhoto || '',
          runningBoardRightSideStatus:
            orderData.runningBoardRightSideStatus || '',
          runningBoardRightSideCondition:
            orderData.runningBoardRightSideCondition || '',
          runningBoardRightSideRemarks:
            orderData.runningBoardRightSideRemarks || '',
          bootPhoto: orderData.bootPhoto || '',
          bootStatus: orderData.bootStatus || '',
          bootCondition: orderData.bootCondition || '',
          bootRemarks: orderData.bootRemarks || '',
          bootSkirtPhoto: orderData.bootSkirtPhoto || '',
          bootSkirtStatus: orderData.bootSkirtStatus || '',
          bootSkirtCondition: orderData.bootSkirtCondition || '',
          bootSkirtRemarks: orderData.bootSkirtRemarks || '',
          bonetPhoto: orderData.bonetPhoto || '',
          bonetStatus: orderData.bonetStatus || '',
          bonetCondition: orderData.bonetCondition || '',
          bonetRemarks: orderData.bonetRemarks || '',
          supportMemberUpperPhoto: orderData.supportMemberUpperPhoto || '',
          supportMemberUpperStatus: orderData.supportMemberUpperStatus || '',
          suportMemberUpperCondition:
            orderData.suportMemberUpperCondition || '',
          supportMemberUpperRemarks: orderData.supportMemberUpperRemarks || '',
          supportMemberLowerPhoto: orderData.supportMemberLowerPhoto || '',
          supportMemberLowerStatus: orderData.supportMemberLowerStatus || '',
        };
        newObject = {
          dealerId: itemId,
          id: id,
          orderStatus: 1,
          pillarALeftSidePhoto: pillarBase64[0],
          pillarALeftSideStatus: pillarSwitch[0],
          pillarALeftSideCondition: pillarsCondition[0],
          pillarALeftSideRemarks: pillarsPhotoRemarks[0],
          pillarARightSidePhoto: pillarBase64[1],
          pillarARightSideStatus: pillarSwitch[1],
          pillarARightSideCondition: pillarsCondition[1],
          pillarARightSideRemarks: pillarsPhotoRemarks[1],
          pillarBLeftSidePhoto: pillarBase64[2],
          pillarBLeftSideStatus: pillarSwitch[2],
          pillarBLeftSideCondition: pillarsCondition[2],
          pillarBLeftSideRemarks: pillarsPhotoRemarks[2],
          pillarBRightSidePhoto: pillarBase64[3],
          pillarBRightSideStatus: pillarSwitch[3],
          pillarBRightSideCondition: pillarsCondition[3],
          pillarBRightSideRemarks: pillarsPhotoRemarks[3],
          pillarCLeftSidePhoto: pillarBase64[4],
          pillarCLeftSideStatus: pillarSwitch[4],
          pillarCLeftSideCondition: pillarsCondition[4],
          pillarCLeftSideRemarks: pillarsPhotoRemarks[4],
          pillarCRightSidePhoto: pillarBase64[5],
          pillarCRightSideStatus: pillarSwitch[5],
          pillarCRightSideCondition: pillarsCondition[5],
          pillarCRightSideRemarks: pillarsPhotoRemarks[5],
          apronLeftSidePhoto: apronBase64[0],
          apronLeftSideStatus: apronSwitch[0],
          apronLeftSideCondition: apronCondition[0],
          apronLeftSideRemarks: apronRemarks[0],
          apronRightSidePhoto: apronBase64[1],
          apronRightSideStatus: apronSwitch[1],
          apronRightSideCondition: apronCondition[1],
          apronRightSideRemarks: apronRemarks[1],
          fendersRightSidePhoto: fennderBase64[0],
          fendersRightSideStatus: fenderSwitch[0],
          fendersRightSideCondition: fenderCondition[0],
          fendersRightSideRemarks: fenderRemarks[0],
          fendersLeftSidePhoto: fennderBase64[1],
          fendersLeftSideStatus: fenderSwitch[1],
          fendersLeftSideCondition: fenderCondition[1],
          fendersLeftSideRemarks: fenderRemarks[1],
          quarterPanelsLeftSidePhoto: quarterPanlesBase64[0],
          quarterPanelsLeftSideStatus: quarterPanlesSwitch[0],
          quarterPanelsLeftSideCondition: quarterPanlesCondition[0],
          quarterPanelsLeftSideRemarks: quarterPanlesRemarks[0],
          quarterPanelsRightSidePhoto: quarterPanlesBase64[1],
          quarterPanelsRightSideStatus: quarterPanlesSwitch[1],
          quarterPanelsRightSideCondition: quarterPanlesCondition[1],
          quarterPanelsRightSideRemarks: quarterPanlesRemarks[1],
          doorsFrontRightSidePhoto: doorBase64[0],
          doorsFrontRightSideStatus: doorSwitch[0],
          doorsFrontRightSideCondition: doorSwitch[0],
          doorsFrontRightSideRemarks: doorRemarks[0],
          doorsFrontLeftSidePhoto: doorBase64[1],
          doorsFrontLeftSideStatus: doorSwitch[1],
          doorsFrontLeftSideCondition: doorCondition[1],
          doorsFrontLeftSideRemarks: doorRemarks[1],
          doorsRearRightSidePhoto: doorBase64[2],
          doorsRearRightSideStatus: doorSwitch[2],
          doorsRearRightSideCondition: doorCondition[2],
          doorsRearRightSideRemarks: doorRemarks[2],
          doorsRearLeftSidePhoto: doorBase64[3],
          doorsRearLeftSideStatus: doorSwitch[3],
          doorsRearLeftSideCondition: doorCondition[3],
          doorsRearLeftSideRemarks: doorRemarks[3],
          runningBoardLeftSidePhoto: runningBoardBase64[0],
          runningBoardLeftSideStatus: runningBoardSwitch[0],
          runningBoardLeftSideCondition: runnningBoardCondition[0],
          runningBoardLeftSideRemarks: runningBoardRemarks[0],
          runningBoardRightSidePhoto: runningBoardBase64[1],
          runningBoardRightSideStatus: runningBoardSwitch[1],
          runningBoardRightSideCondition: runnningBoardCondition[1],
          runningBoardRightSideRemarks: runningBoardRemarks[1],
          bootPhoto: dickyDoorBase64[0],
          bootStatus: dickyDoorSwitch[0],
          bootCondition: dickyDoorCondition[0],
          bootRemarks: dickyDoorRemarks[0],
          bootSkirtPhoto: dickySkirtBase64[0],
          bootSkirtStatus: dickySkirtSwitch[0],
          bootSkirtCondition: dickySkirtCondition[0],
          bootSkirtRemarks: dickySkirtRemarks[0],
          bonetPhoto: bonetBase64[0],
          bonetStatus: bonetSwitch[0],
          bonetCondition: bonetCondition[0],
          bonetRemarks: bonetRemarks[0],
          supportMemberUpperPhoto: supportMembersBase64[0],
          supportMemberUpperStatus: supportMembersSwitch[0],
          suportMemberUpperCondition: supportMembersCondition[0],
          supportMemberUpperRemarks: supportMembersRemarks[0],
          supportMemberLowerPhoto: supportMembersBase64[1],
          supportMemberLowerStatus: supportMembersSwitch[1],
          supportMemberLowerCondition: supportMembersCondition[1],
          supportMemberLowerRemarks: supportMembersRemarks[1],
          headLampSupportRightSidePhoto: supportMembersBase64[2],
          headLampSupportRightSideStatus: supportMembersSwitch[2],
          headLampSupportRightSideCondition: supportMembersCondition[2],
          headLampSupportRightSideRemarks: supportMembersRemarks[2],
          headLampSupportLeftSidePhoto: supportMembersBase64[3],
          headLampSupportLeftSideStatus: supportMembersSwitch[3],
          headLampSupportLeftSideCondition: supportMembersCondition[3],
          headLampSupportLeftSideRemarks: supportMembersRemarks[3],
          wheelTypeAlloyPhoto: wheelTypeBase64[0],
          wheelTypeAlloyStatus: wheelTypeSwitch[0],
          wheelTypeAlloyCondition: wheelTypeCondition[0],
          wheelTypeAlloyRemarks: wheelTypeRemarks[0],
          wheelTypeDrumPhoto: wheelTypeBase64[1],
          wheelTypeDrumStatus: wheelTypeSwitch[1],
          wheelTypeDrumCondition: wheelTypeCondition[1],
          wheelTypeDrumRemarks: wheelTypeRemarks[1],
          windShieldFrontTyrePhoto: windShieldBase64[0],
          windShieldFrontTyreStatus: windShieldSwitch[0],
          windShieldFrontTyreCondition: windShieldCondition[0],
          windShieldFrontTyreRemarks: windShieldRemarks[0],
          windShieldRearTyrePhoto: windShieldBase64[1],
          windShieldRearTyreStatus: windShieldSwitch[1],
          windShieldRearTyreCondition: windShieldCondition[1],
          windShieldRearTyreRemarks: windShieldRemarks[1],
          bumperFrontPhoto: bumperBase64[0],
          bumperFrontStatus: bumperSwitch[0],
          bumperFrontCondition: bumperCondition[0],
          bumperFrontRemarks: bumperRemarks[0],
          bumperRearPhoto: bumperBase64[1],
          bumperRearStatus: bumperSwitch[1],
          bumperRearCondition: bumperCondition[1],
          bumperRearRemarks: bumperRemarks[1],
        };

        updatedFields = await findDifferences(oldObject, newObject);

        break;

      case 7:
        oldObject = {
          dealerId: itemId,
          id: id,
          orderStatus: save === 'save' ? 1 : 2,
          strutPhoto: orderData.strutPhoto || '',
          strutStatus: orderData.strutStatus || '',
          strutCondition: orderData.strutCondition || '',
          strutRemarks: orderData.strutRemarks || '',
          lowerArmPhoto: orderData.lowerArmPhoto || '',
          lowerArmStatus: orderData.lowerArmStatus || '',
          lowerArmCondition: orderData.lowerArmCondition || '',
          lowerArmRemarks: orderData.lowerArmRemarks || '',
          linkRodPhoto: orderData.linkRodPhoto || '',
          linkRodStatus: orderData.linkRodStatus || '',
          linkRodCondition: orderData.linkRodCondition || '',
          linkRodRemarks: orderData.linkRodRemarks || '',
          stabilizerBarPhoto: orderData.stabilizerBarPhoto || '',
          stabilizerBarStatus: orderData.stabilizerBarStatus || '',
          stabilizerBarCondition: orderData.stabilizerBarCondition || '',
          stabilizerBarRemarks: orderData.stabilizerBarRemarks || '',
          shockAbsorberPhoto: orderData.shockAbsorberPhoto || '',
          shockAbsorberStatus: orderData.shockAbsorberStatus || '',
          shockAbsorberCondition: orderData.shockAbsorberCondition || '',
          shockAbsorberRemarks: orderData.shockAbsorberRemarks || '',
          coilSpringPhoto: orderData.coilSpringPhoto || '',
          coilSpringStatus: orderData.coilSpringStatus || '',
          coilSpringCondition: orderData.coilSpringCondition || '',
          coilSpringRemarks: orderData.coilSpringRemarks || '',
          leafSpringPhoto: orderData.leafSpringPhoto || '',
          leafSpringStatus: orderData.leafSpringStatus || '',
          leafSpringCondition: orderData.leafSpringCondition || '',
          leafSpringRemarks: orderData.leafSpringRemarks || '',
          rackAndPinionPhoto: orderData.rackAndPinionPhoto || '',
          rackAndPinionStatus: orderData.rackAndPinionStatus || '',
          rackAndPinionCondition: orderData.rackAndPinionCondition || '',
          rackAndPinionRemarks: orderData.rackAndPinionRemarks || '',
          steeringColumnPhoto: orderData.steeringColumnPhoto || '',
          steeringColumnStatus: orderData.steeringColumnStatus || '',
          steeringColumnCondition: orderData.steeringColumnCondition || '',
          steeringColumnRemarks: orderData.steeringColumnRemarks || '',
          hardnessPhoto: orderData.hardnessPhoto || '',
          hardnessStatus: orderData.hardnessStatus || '',
          hardnessCondition: orderData.hardnessCondition || '',
          hardnessRemarks: orderData.hardnessRemarks || '',
          ballJointEndPhoto: orderData.ballJointEndPhoto || '',
          ballJointEndStatus: orderData.ballJointEndStatus || '',
          ballJointEndCondition: orderData.ballJointEndCondition || '',
          ballJointEndRemarks: orderData.ballJointEndRemarks || '',
          padPhoto: orderData.padPhoto || '',
          padStatus: orderData.padStatus || '',
          padCondition: orderData.padCondition || '',
          padRemarks: orderData.padRemarks || '',
          discPhoto: orderData.discPhoto || '',
          discStatus: orderData.discStatus || '',
          discCondition: orderData.discCondition || '',
          discRemarks: orderData.discRemarks || '',
          shoePhoto: orderData.shoePhoto || '',
          shoeStatus: orderData.shoeStatus || '',
          shoeCondition: orderData.shoeCondition || '',
          shoeRemarks: orderData.shoeRemarks || '',
          drumPhoto: orderData.drumPhoto || '',
          drumStatus: orderData.drumStatus || '',
          drumCondition: orderData.drumCondition || '',
          drumRemarks: orderData.drumRemarks || '',
          wheelCylinderPhoto: orderData.wheelCylinderPhoto || '',
          wheelCylinderStatus: orderData.wheelCylinderStatus || '',
          wheelCylinderCondition: orderData.wheelCylinderCondition || '',
          wheelCylinderRemarks: orderData.wheelCylinderRemarks || '',
          mcBoosterPhoto: orderData.mcBoosterPhoto || '',
          mcBoosterStatus: orderData.mcBoosterStatus || '',
          mcBoosterCondition: orderData.mcBoosterCondition || '',
          mcBoosterRemarks: orderData.mcBoosterRemarks || '',
          clutchPhoto: orderData.clutchPhoto || '',
          clutchStatus: orderData.clutchStatus || '',
          clutchCondition: orderData.clutchCondition || '',
          clutchRemarks: orderData.clutchRemarks || '',
          gearShiftingPhoto: orderData.gearShiftingPhoto || '',
          gearShiftingStatus: orderData.gearShiftingStatus || '',
          gearShiftingCondition: orderData.gearShiftingCondition || '',
          gearShiftingRemarks: orderData.gearShiftingRemarks || '',
          driveShaftPhoto: orderData.driveShaftPhoto || '',
          driveShaftStatus: orderData.driveShaftStatus || '',
          driveShaftCondition: orderData.driveShaftCondition || '',
          driveShaftRemarks: orderData.driveShaftRemarks || '',
          axlePhoto: orderData.axlePhoto || '',
          axleStatus: orderData.axleStatus || '',
          axleCondition: orderData.axleCondition || '',
          axleRemarks: orderData.axleRemarks || '',
          propellerShaftPhoto: orderData.propellerShaftPhoto || '',
          propellerShaftStatus: orderData.propellerShaftStatus || '',
          propellerShaftCondition: orderData.propellerShaftCondition || '',
          propellerShaftRemarks: orderData.propellerShaftRemarks || '',
          differentialPhoto: orderData.differentialPhoto || '',
          differentialStatus: orderData.differentialStatus || '',
          differentialCondition: orderData.differentialCondition || '',
          differentialRemarks: orderData.differentialRemarks || '',
          bearingPhoto: orderData.bearingPhoto || '',
          bearingStatus: orderData.bearingStatus || '',
          bearingCondition: orderData.bearingCondition || '',
          bearingRemarks: orderData.bearingRemarks || '',
          mountingPhoto: orderData.mountingPhoto || '',
          mountingStatus: orderData.mountingStatus || '',
          mountingCondition: orderData.mountingCondition || '',
          mountingRemarks: orderData.mountingRemarks || '',
          smokePhoto: orderData.smokePhoto || '',
          smokeStatus: orderData.smokeStatus || '',
          smokeCondition: orderData.smokeCondition || '',
          smokeRemarks: orderData.smokeRemarks || '',
          turboPhoto: orderData.turboPhoto || '',
          turboStatus: orderData.turboStatus || '',
          turboCondition: orderData.turboCondition || '',
          turboRemarks: orderData.turboRemarks || '',
          misfiringPhoto: orderData.misfiringPhoto || '',
          misfiringStatus: orderData.misfiringStatus || '',
          misfiringCondition: orderData.misfiringCondition || '',
          misfiringRemarks: orderData.misfiringRemarks || '',
          tappetPhoto: orderData.tappetPhoto || '',
          tappetStatus: orderData.tappetStatus || '',
          tappetCondition: orderData.tappetCondition || '',
          tappetRemarks: orderData.tappetRemarks || '',
          knockingPhoto: orderData.knockingPhoto || '',
          knockingStatus: orderData.knockingStatus || '',
          knockingCondition: orderData.knockingCondition || '',
          knockingRemarks: orderData.knockingRemarks || '',
          exhaustPhoto: orderData.exhaustPhoto || '',
          exhaustStatus: orderData.exhaustStatus || '',
          exhaustCondition: orderData.exhaustCondition || '',
          exhaustRemarks: orderData.exhaustRemarks || '',
          beltsPhoto: orderData.beltsPhoto || '',
          beltsStatus: orderData.beltsStatus || '',
          beltsCondition: orderData.beltsCondition || '',
          beltsRemarks: orderData.beltsRemarks || '',
          tensionerPhoto: orderData.tensionerPhoto || '',
          tensionerStatus: orderData.tensionerStatus || '',
          tensionerCondition: orderData.tensionerCondition || '',
          tensionerRemarks: orderData.tensionerRemarks || '',
          mountingPhoto: orderData.mountingPhoto || '',
          mountingStatus: orderData.mountingStatus || '',
          mountingCondition: orderData.mountingCondition || '',
          mountingRemarks: orderData.mountingRemarks || '',
          fuelPumpPhoto: orderData.fuelPumpPhoto || '',
          fuelPumpStatus: orderData.fuelPumpStatus || '',
          fuelPumpCondition: orderData.fuelPumpCondition || '',
          fuelPumpRemarks: orderData.fuelPumpRemarks || '',
          highPressurePumpPhoto: orderData.highPressurePumpPhoto || '',
          highPressurePumpStatus: orderData.highPressurePumpStatus || '',
          highPressurePumpCondition: orderData.highPressurePumpCondition || '',
          highPressurePumpRemarks: orderData.highPressurePumpRemarks || '',
          commonrailPhoto: orderData.commonrailPhoto || '',
          commonrailStatus: orderData.commonrailStatus || '',
          commonrailCondition: orderData.commonrailCondition || '',
          commonrailRemarks: orderData.commonrailRemarks || '',
          injectorPhoto: orderData.injectorPhoto || '',
          injectorStatus: orderData.injectorStatus || '',
          injectorCondition: orderData.injectorCondition || '',
          injectorRemarks: orderData.injectorRemarks || '',
          fuelTankPhoto: orderData.fuelTankPhoto || '',
          fuelTankStatus: orderData.fuelTankStatus || '',
          fuelTankCondition: orderData.fuelTankCondition || '',
          fuelTankRemarks: orderData.fuelTankRemarks || '',
          hosePhoto: orderData.hosePhoto || '',
          hoseStatus: orderData.hoseStatus || '',
          hoseCondition: orderData.hoseCondition || '',
          hoseRemarks: orderData.hoseRemarks || '',
          radiatorPhoto: orderData.radiatorPhoto || '',
          radiatorStatus: orderData.radiatorStatus || '',
          radiatorCondition: orderData.radiatorCondition || '',
          radiatorRemarks: orderData.radiatorRemarks || '',
          fanPhoto: orderData.fanPhoto || '',
          fanStatus: orderData.fanStatus || '',
          fanCondition: orderData.fanCondition || '',
          fanRemarks: orderData.fanRemarks || '',
          overHeatingPhoto: orderData.overHeatingPhoto || '',
          overHeatingStatus: orderData.overHeatingStatus || '',
          overHeatingCondition: orderData.overHeatingCondition || '',
          overHeatingRemarks: orderData.overHeatingRemarks || '',
          allBearingsPhoto: orderData.allBearingsPhoto || '',
          allBearingsStatus: orderData.allBearingsStatus || '',
          allBearingsCondition: orderData.allBearingsCondition || '',
          allBearingsRemarks: orderData.allBearingsRemarks || '',
          batteryPhoto: orderData.batteryPhoto || '',
          batteryStatus: orderData.batteryStatus || '',
          batteryCondition: orderData.batteryCondition || '',
          batteryRemarks: orderData.batteryRemarks || '',
          alternatorPhoto: orderData.alternatorPhoto || '',
          alternatorStatus: orderData.alternatorStatus || '',
          alternatorCondition: orderData.alternatorCondition || '',
          alternatorRemarks: orderData.alternatorRemarks || '',
          selfMotorPhoto: orderData.selfMotorPhoto || '',
          selfMotorStatus: orderData.selfMotorStatus || '',
          selfMotorCondition: orderData.selfMotorCondition || '',
          selfMotorRemarks: orderData.selfMotorRemarks || '',
          wiringHarnessPhoto: orderData.wiringHarnessPhoto || '',
          wiringHarnessStatus: orderData.wiringHarnessStatus || '',
          wiringHarnessCondition: orderData.wiringHarnessCondition || '',
          wiringHarnessRemarks: orderData.wiringHarnessRemarks || '',
          ecmPhoto: orderData.ecmPhoto || '',
          ecmStatus: orderData.ecmStatus || '',
          ecmCondition: orderData.ecmCondition || '',
          ecmRemarks: orderData.ecmRemarks || '',
          allSensorsPhoto: orderData.allSensorsPhoto || '',
          allSensorsStatus: orderData.allSensorsStatus || '',
          allSensorsCondition: orderData.allSensorsCondition || '',
          allSensorsRemarks: orderData.allSensorsRemarks || '',
          wiperMotorPhoto: orderData.wiperMotorPhoto || '',
          wiperMotorStatus: orderData.wiperMotorStatus || '',
          wiperMotorCondition: orderData.wiperMotorCondition || '',
          wiperMotorRemarks: orderData.wiperMotorRemarks || '',
          clusterPhoto: orderData.clusterPhoto || '',
          clusterStatus: orderData.clusterStatus || '',
          clusterCondition: orderData.clusterCondition || '',
          clusterRemarks: orderData.clusterRemarks || '',
          headLightsAndDrlPhoto: orderData.headLightsAndDrlPhoto || '',
          headLightsAndDrlStatus: orderData.headLightsAndDrlStatus || '',
          headLightsAndDrlCondition: orderData.headLightsAndDrlCondition || '',
          headLightsAndDrlRemarks: orderData.headLightsAndDrlRemarks || '',
          tailLightPhoto: orderData.tailLightPhoto || '',
          tailLightStatus: orderData.tailLightStatus || '',
          tailLightCondition: orderData.tailLightCondition || '',
          tailLightRemarks: orderData.tailLightRemarks || '',
          cabinLightPhoto: orderData.cabinLightPhoto || '',
          cabinLightStatus: orderData.cabinLightStatus || '',
          cabinLightCondition: orderData.cabinLightCondition || '',
          cabinLightRemarks: orderData.cabinLightRemarks || '',
          combinationSwitchPhoto: orderData.combinationSwitchPhoto || '',
          combinationSwitchStatus: orderData.combinationSwitchStatus || '',
          combinationSwitchCondition:
            orderData.combinationSwitchCondition || '',
          combinationSwitchRemarks: orderData.combinationSwitchRemarks || '',
          absPhoto: orderData.absPhoto || '',
          absStatus: orderData.absStatus || '',
          absCondition: orderData.absCondition || '',
          absRemarks: orderData.absRemarks || '',
          airBagPhoto: orderData.airBagPhoto || '',
          airBagStatus: orderData.airBagStatus || '',
          airBagCondition: orderData.airBagCondition || '',
          airBagRemarks: orderData.airBagRemarks || '',
          powerWindowsPhoto: orderData.powerWindowsPhoto || '',
          powerWindowsStatus: orderData.powerWindowsStatus || '',
          powerWindowsCondition: orderData.powerWindowsCondition || '',
          powerWindowsRemarks: orderData.powerWindowsRemarks || '',
          coolingPhoto: orderData.coolingPhoto || '',
          coolingStatus: orderData.coolingStatus || '',
          coolingCondition: orderData.coolingCondition || '',
          coolingRemarks: orderData.coolingRemarks || '',
          blowerCondenserPhoto: orderData.blowerCondenserPhoto || '',
          blowerCondenserStatus: orderData.blowerCondenserStatus || '',
          blowerCondenserCondition: orderData.blowerCondenserCondition || '',
          blowerCondenserRemarks: orderData.blowerCondenserRemarks || '',
          fanPhoto: orderData.fanPhoto || '',
          fanStatus: orderData.fanStatus || '',
          fanCondition: orderData.fanCondition || '',
          fanRemarks: orderData.fanRemarks || '',
          controlSwitchPhoto: orderData.controlSwitchPhoto || '',
          controlSwitchStatus: orderData.controlSwitchStatus || '',
          controlSwitchCondition: orderData.controlSwitchCondition || '',
          controlSwitchRemarks: orderData.controlSwitchRemarks || '',
          ventPhoto: orderData.ventPhoto || '',
          ventStatus: orderData.ventStatus || '',
          ventCondition: orderData.ventCondition || '',
          ventRemarks: orderData.ventRemarks || '',
          musicSystemPhoto: orderData.musicSystemPhoto || '',
          musicSystemStatus: orderData.musicSystemStatus || '',
          musicSystemCondition: orderData.musicSystemCondition || '',
          musicSystemRemarks: orderData.musicSystemRemarks || '',
          parkingSensorPhoto: orderData.parkingSensorPhoto || '',
          parkingSensorStatus: orderData.parkingSensorStatus || '',
          parkingSensorCondition: orderData.parkingSensorCondition || '',
          parkingSensorRemarks: orderData.parkingSensorRemarks || '',
          reverseCameraPhoto: orderData.reverseCameraPhoto || '',
          reverseCameraStatus: orderData.reverseCameraStatus || '',
          reverseCameraCondition: orderData.reverseCameraCondition || '',
          reverseCameraRemarks: orderData.reverseCameraRemarks || '',
          ovrmAdjusterPhoto: orderData.ovrmAdjusterPhoto || '',
          ovrmAdjusterStatus: orderData.ovrmAdjusterStatus || '',

          ovrmAdjusterStatus: orderData.ovrmAdjusterStatus || '',
          ovrmAdjusterCondition: orderData.ovrmAdjusterCondition || '',
          ovrmAdjusterRemarks: orderData.ovrmAdjusterRemarks || '',
          seatHeightAdjusterPhoto: orderData.seatHeightAdjusterPhoto || '',
          seatHeightAdjusterStatus: orderData.seatHeightAdjusterStatus || '',
          seatHeightAdjusterCondition:
            orderData.seatHeightAdjusterCondition || '',
          seatHeightAdjusterRemarks: orderData.seatHeightAdjusterRemarks || '',
          seatBeltPhoto: orderData.seatBeltPhoto || '',
          seatBeltStatus: orderData.seatBeltStatus || '',
          seatBeltCondition: orderData.seatBeltCondition || '',
          seatBeltRemarks: orderData.seatBeltRemarks || '',
          sunRoofPhoto: orderData.sunRoofPhoto || '',
          sunRoofStatus: orderData.sunRoofStatus || '',
          sunRoofCondition: orderData.sunRoofCondition || '',
          sunRoofRemarks: orderData.sunRoofRemarks || '',
          roofRailPhoto: orderData.roofRailPhoto || '',
          roofRailStatus: orderData.roofRailStatus || '',
          roofRailCondition: orderData.roofRailCondition || '',
          roofRailRemarks: orderData.roofRailRemarks || '',
          spoilerPhoto: orderData.spoilerPhoto || '',
          spoilerStatus: orderData.spoilerStatus || '',
          spoilerCondition: orderData.spoilerCondition || '',
          spoilerRemarks: orderData.spoilerRemarks || '',

          skirtPhoto: orderData.skirtPhoto || '',
          skirtStatus: orderData.skirtStatus || '',
          skirtCondition: orderData.skirtCondition || '',
          skirtRemarks: orderData.skirtRemarks || '',
          steeringControlsPhoto: orderData.steeringControlsPhoto || '',
          steeringControlsStatus: orderData.steeringControlsStatus || '',
          steeringControlsCondition: orderData.steeringControlsCondition || '',
          steeringControlsRemarks: orderData.steeringControlsRemarks || '',
          roadTestRemarks: orderData.roadTestRemarks || '',
        };
        newObject = {
          dealerId: itemId,
          id: id,
          orderStatus: save === 'save' ? 1 : 2,
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
        updatedFields = await findDifferences(oldObject, newObject);
        break;

      default:
        throw new Error('Invalid step');
    }

    // Call the API

    try {
      console.log(params, 'pgyfy');
      const data = await apiPostWithToken('updateOrder', updatedFields);

      if (step == 7) {
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
    return `${((currentIndex + 1) / (role === "Reinspector" ? 8 : 7)) * 100}%`;
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
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotoUris = [...reinspectorPhoto];
        newPhotoUris[carIndex8] = response.assets[0].uri;
       
        setReinspectorPhoto(newPhotoUris)

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
  // const [updatedFields, setUpdatedFields] = useState([]);

  // const markFieldAsUpdated = fieldName => {
  //   setUpdatedFields(prevFields => {
  //     // If the field is not already in the updatedFields array, add it
  //     if (!prevFields.includes(fieldName)) {
  //       return [...prevFields, fieldName];
  //     }
  //     return prevFields;
  //   });
  // };
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
      switch (selectedContainerIndex) {
        case 0:
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
          handleCameraResponse(
            response,
            insurancePhoto,
            insuranceBase64,
            setInsuracePhoto,
            setInsuraceBase64,
          );
          break;
        case 2:
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
            setDickySkirtPhoto,
            setDickySkirtBase64,
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
    const isPhotoArrayComplete = arr =>
      arr.filter(photo => photo !== '').length === arr.length;

    console.log(
      selectedContainerIndex,
      rcPhoto.length,
      'give additional referecene',
    );
    if (selectedContainerIndex === 0 && !isPhotoArrayComplete(rcPhoto)) {
      ToastAndroid.show('RC Photo is mandatory.', ToastAndroid.SHORT);
      return;
    }
    if (selectedContainerIndex === 1 && !isPhotoArrayComplete(insurancePhoto)) {
      ToastAndroid.show('Insurance Photo is mandatory.', ToastAndroid.SHORT);
      return;
    }
    if (selectedContainerIndex === 2 && !isPhotoArrayComplete(nocPhoto)) {
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
    if (!photoUrisCarPhotos[selectedContainerIndex1] || !carPhotosRemarks[selectedContainerIndex1]) {
      ToastAndroid.show('Photo and remarks fields are required', ToastAndroid.SHORT);
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
    if (!reinspectorPhoto[carIndex8] || !reinspectorRemarks[carIndex8]) {
      ToastAndroid.show('Photo and remarks fields are required', ToastAndroid.SHORT);
      return;
    }
    const newValidations = [...reinspectorValidation];
    // Assume validatePhotoAndRemarks is a function that returns true if both photo and remarks are valid
    newValidations[carIndex8] = validatePhotoAndRemarks(
      carIndex8,
    );
    setReinspectorValidation(newValidations)
   

    setReinspectorPage(false)
  };

  const validateMechanicalInspectionFields = () => {
    switch (selectedInspectionIndex) {
      case 0:
        for (let i = 0; i < suspensionSwitch.length; i++) {
          console.log(suspensionSwitch[i], 'jjjjjj');
          if (
            (suspensionSwitch[i] === 2 || !suspensionSwitch[i]) &&
            (!suspensionPhoto[i] ||
              !suspensionRemarks[i] ||
              !suspensionDropdown[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 1:
        for (let i = 0; i < steeringSwitch.length; i++) {
          console.log(steeringSwitch[i], 'asaasa');
          if (
            (steeringSwitch[i] === 2 || !steeringSwitch[i]) &&
            (!steeringPhoto[i] || !steeringRemarks[i] || !steeringDropdown[i])
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
            (!brakePhoto[i] || !brakeRemarks[i] || !brakeDropdown[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 3:
        for (let i = 0; i < transmissionSwitch.length; i++) {
          console.log(transmissionSwitch[i], 'jjjjjj');
          if (
            (transmissionSwitch[i] === 2 || !transmissionSwitch[i]) &&
            (!transmissionPhoto[i] ||
              !transmissionRemarks[i] ||
              !transmissionDropdown[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 4:
        for (let i = 0; i < engineSwitch.length; i++) {
          console.log(engineSwitch[i], 'jjjjjj');
          if (
            (engineSwitch[i] === 2 || !engineSwitch[i]) &&
            (!enginePhoto[i] || !engineRemarks[i] || !engineDropdown[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 5:
        for (let i = 0; i < electricalSwitch.length; i++) {
          console.log(electricalSwitch[i], 'jjjjjj');
          if (
            (electricalSwitch[i] === 2 || !electricalSwitch[i]) &&
            (!electricalPhoto[i] ||
              !electricalRemarks[i] ||
              !electricalDropdown[i])
          ) {
            return false;
          }
        }

        return true;
        break;

      case 6:
        for (let i = 0; i < acSwitch.length; i++) {
          console.log(acSwitch[i], 'jjjjjj');
          if (
            (acSwitch[i] === 2 || !acSwitch[i]) &&
            (!acPhoto[i] || !acRemarks[i] || !acDropdown[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 7:
        for (let i = 0; i < accessoriesSwitch.length; i++) {
          if (
            (accessoriesSwitch[i] === 2 || accessoriesSwitch[i] === '') &&
            (!accessoriesPhoto[i] ||
              !accessoriesRemarks[i] ||
              !accessoriesDropdown[i])
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

  const handleInspectionOkPress = () => {
    if (!validateMechanicalInspectionFields()) {
      ToastAndroid.show(
        'All chassis fields are mandatory when the switch is on.',
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
        for (let i = 0; i < pillarSwitch.length; i++) {
          console.log(pillarSwitch[i], 'jjjjjj');
          if (
            (pillarSwitch[i] === 2 || !pillarSwitch[i]) &&
            (!pillarsPhoto[i] ||
              !pillarsPhotoRemarks[i] ||
              !pillarsCondition[i])
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
            (!apronPhoto[i] || !apronRemarks[i] || !apronCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 2:
        for (let i = 0; i < fenderSwitch.length; i++) {
          console.log(fenderSwitch[i], 'jjjjjj');
          if (
            (fenderSwitch[i] === 2 || !fenderSwitch[i]) &&
            (!fenderPhoto[i] || !fenderRemarks[i] || !fenderCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 3:
        for (let i = 0; i < quarterPanlesSwitch.length; i++) {
          console.log(quarterPanlesSwitch[i], 'jjjjjj');
          if (
            (quarterPanlesSwitch[i] === 2 || !quarterPanlesSwitch[i]) &&
            (!quarterPanlesPhoto[i] ||
              !quarterPanlesRemarks[i] ||
              !quarterPanlesCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 4:
        for (let i = 0; i < runningBoardSwitch.length; i++) {
          console.log(runningBoardSwitch[i], 'jjjjjj');
          if (
            (runningBoardSwitch[i] === 2 || !runningBoardSwitch[i]) &&
            (!runningBoardPhoto[i] ||
              !runningBoardRemarks[i] ||
              !runnningBoardCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 5:
        for (let i = 0; i < doorSwitch.length; i++) {
          console.log(doorSwitch[i], 'jjjjjj');
          if (
            (doorSwitch[i] === 2 || !doorSwitch[i]) &&
            (!doorPhoto[i] || !doorRemarks[i] || !doorCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 6:
        for (let i = 0; i < dickyDoorSwitch.length; i++) {
          console.log(dickyDoorSwitch[i], 'jjjjjj');
          if (
            (dickyDoorSwitch[i] === 2 || !dickyDoorSwitch[i]) &&
            (!dickyDoorPhoto[i] ||
              !dickyDoorRemarks[i] ||
              !dickyDoorCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 7:
        for (let i = 0; i < dickySkirtSwitch.length; i++) {
          console.log(dickySkirtSwitch[i], 'jjjjjj');
          if (
            (dickySkirtSwitch[i] === 2 || !dickySkirtSwitch[i]) &&
            (!dickySkirtPhoto[i] ||
              !dickySkirtRemarks[i] ||
              !dickySkirtCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 8:
        for (let i = 0; i < bonetSwitch.length; i++) {
          console.log(bonetSwitch[i], 'jjjjjj');
          if (
            (bonetSwitch[i] === 2 || !bonetSwitch[i]) &&
            (!bonetPhoto[i] || !bonetRemarks[i] || !bonetCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 9:
        for (let i = 0; i < supportMembersSwitch.length; i++) {
          console.log(supportMembersSwitch[i], 'jjjjjj');
          if (
            (supportMembersSwitch[i] === 2 || !supportMembersSwitch[i]) &&
            (!supportMembersPhoto[i] ||
              !supportMembersRemarks[i] ||
              !supportMembersCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 10:
        for (let i = 0; i < bumperSwitch.length; i++) {
          if (
            (bumperSwitch[i] === 2 || !bumperSwitch[i]) &&
            (!bumperPhoto[i] || !bumperRemarks[i] || !bumperCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 11:
        for (let i = 0; i < wheelTypeSwitch.length; i++) {
          if (
            (wheelTypeSwitch[i] === 2 || !wheelTypeSwitch[i]) &&
            (!wheelTypePhoto[i] ||
              !wheelTypeRemarks[i] ||
              !wheelTypeCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 12:
        for (let i = 0; i < windShieldSwitch.length; i++) {
          if (
            (windShieldSwitch[i] === 2 || !windShieldSwitch[i]) &&
            (!windShieldPhoto[i] ||
              !windShieldRemarks[i] ||
              !windShieldCondition[i])
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
      ToastAndroid.show(
        'All chassis fields are mandatory when the switch is on.',
        ToastAndroid.SHORT,
      );
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
        for (let i = 0; i < chassisSwitch.length; i++) {
          if (
            (chassisSwitch[i] === 2 || !chassisSwitch[i]) &&
            (!chassisPunchPhoto[i] ||
              !chassisRemarks[i] ||
              !chassisCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 1:
        for (let i = 0; i < vinPlateSwitch.length; i++) {
          if (
            (vinPlateSwitch[i] === 2 || !vinPlateSwitch[i]) &&
            (!vinPlatePunchPhoto[i] ||
              !vinPlateRemarks[i] ||
              !vinPlateCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 2:
        for (let i = 0; i < tyreSwitch.length; i++) {
          if (
            (tyreSwitch[i] === 2 || !tyreSwitch[i]) &&
            (!tyrePunchPhoto[i] || !tyreRemarks[i] || !tyreCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 3:
        for (let i = 0; i < spareWheelSwitch.length; i++) {
          if (
            (spareWheelSwitch[i] === 2 || !spareWheelSwitch[i]) &&
            (!spareWheelPunchPhoto[i] ||
              !spareWheelRemarks[i] ||
              !spareWheelCondition[i])
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
            (!toolKitPunchPhoto[i] ||
              !toolKitRemarks[i] ||
              !toolKitCondition[i])
          ) {
            return false;
          }
        }
        return true;
        break;

      case 5:
        for (let i = 0; i < keySwitch.length; i++) {
          if (
            (keySwitch[i] === 2 || !keySwitch[i]) &&
            (!keyPunchPhoto[i] || !keyRemarks[i] || !keyCondition[i])
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

  const handleCarDetailsOkPress = () => {
    if (!validateCarDetailsFields()) {
      ToastAndroid.show(
        'All chassis fields are mandatory when the switch is on.',
        ToastAndroid.SHORT,
      );
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


  const handleCloseReinspectorPhotos = index => {
    const newPhotoUris = [...reinspectorPhoto];
    newPhotoUris[index] = null;
    // const newRemarks = [...carPhotosRemarks];
    // newRemarks[index] = '';
    setReinspectorPhoto(newPhotoUris)

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

  const handleReinspectorRemarks=(text,index)=>{
    const newRemarks = [...reinspectorRemarks];
    newRemarks[index] = text;
    setReinspectorRemarks(newRemarks);

  }

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
    
    'Under Chassis',
    'Engine Room',
    'Trunk Boot',
  ];


  const carPhotos8=[
    'Front View',
    'Rear View',
    'LHS View',
    'RHS View',
    'Odo Meter',
    'Roof',
    'Interior',
  ]

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
    'Boot',
    'Boot Skirt',
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


  const photoUpdates = [
    { setter: setRcPhoto, index: 0, key: 'rcFrontPhoto' },
    { setter: setRcPhoto, index: 1, key: 'rcBackPhoto' },
    { setter: setRcPhoto, index: 2, key: 'RCOthers' },
    { setter: setInsuracePhoto, index: 0, key: 'insuranceOwnDamagePhoto' },
    { setter: setInsuracePhoto, index: 1, key: 'insuranceThirdPartyPhoto' },
    { setter: setInsuracePhoto, index: 2, key: 'insuranceOthers' },
    { setter: setNOCPhoto, index: 0, key: 'nocPhoto' },
    { setter: setNOCPhoto, index: 1, key: 'nocOthers' },
    { setter: setPhotoUrisCarPhotos, index: 0, key: 'frontViewPhoto' },
    { setter: setPhotoUrisCarPhotos, index: 1, key: 'rearViewPhoto' },
    { setter: setPhotoUrisCarPhotos, index: 2, key: 'lhsViewPhoto' },
    { setter: setPhotoUrisCarPhotos, index: 3, key: 'rhsViewPhoto' },
    { setter: setPhotoUrisCarPhotos, index: 4, key: 'odometerPhoto' },
    { setter: setPhotoUrisCarPhotos, index: 5, key: 'roofPhoto' },
    { setter: setPhotoUrisCarPhotos, index: 6, key: 'interiorPhoto' },
    { setter: setPhotoUrisCarPhotos, index: 7, key: 'underChassisPhoto' },
    { setter: setPhotoUrisCarPhotos, index: 8, key: 'engineRoomPhoto' },
    { setter: setPhotoUrisCarPhotos, index: 9, key: 'trunkBootPhoto' },
    { setter: setChassisPunchPhoto, index: 0, key: 'chassisPunchPhoto' },
    { setter: setVinPlatePunchPhoto, index: 0, key: 'vinPlatePhoto' },
    { setter: setTyrePunchPhoto, index: 0, key: 'frontTyreLeftPhoto' },
    { setter: setTyrePunchPhoto, index: 1, key: 'frontTyreRightPhoto' },
    { setter: setTyrePunchPhoto, index: 2, key: 'rearTyreLeftPhoto' },
    { setter: setTyrePunchPhoto, index: 3, key: 'rearTyreRightPhoto' },
    { setter: setSpareWheelPunchPhoto, index: 0, key: 'spareWheelPhoto' },
    { setter: setToolkitPunchPhoto, index: 0, key: 'toolKitJackPhoto' },
    { setter: setKeyPunchPhoto, index: 0, key: 'primaryKeyPhoto' },
    { setter: setKeyPunchPhoto, index: 1, key: 'spareKeyPhoto' },
    { setter: setPillarsPhoto, index: 0, key: 'pillarALeftSidePhoto' },
    { setter: setPillarsPhoto, index: 1, key: 'pillarARightSidePhoto' },
    { setter: setPillarsPhoto, index: 2, key: 'pillarBLeftSidePhoto' },
    { setter: setPillarsPhoto, index: 3, key: 'pillarBRightSidePhoto' },
    { setter: setPillarsPhoto, index: 4, key: 'pillarCLeftSidePhoto' },
    { setter: setPillarsPhoto, index: 5, key: 'pillarCRightSidePhoto' },
    { setter: setApronPhoto, index: 0, key: 'apronLeftSidePhoto' },
    { setter: setApronPhoto, index: 1, key: 'apronRightSidePhoto' },
    { setter: setFendersPhoto, index: 0, key: 'fendersLeftSidePhoto' },
    { setter: setFendersPhoto, index: 1, key: 'fendersRightSidePhoto' },
    { setter: setQuarterPanlesPhoto, index: 0, key: 'quarterPanelsLeftSidePhoto' },
    { setter: setQuarterPanlesPhoto, index: 1, key: 'quarterPanelsRightSidePhoto' },
    { setter: setRunningBoardPhoto, index: 0, key: 'runningBoardLeftSidePhoto' },
    { setter: setRunningBoardPhoto, index: 1, key: 'runningBoardRightSidePhoto' },
    { setter: setDoorPhoto, index: 0, key: 'doorsFrontLeftSidePhoto' },
    { setter: setDoorPhoto, index: 1, key: 'doorsFrontRightSidePhoto' },
    { setter: setDoorPhoto, index: 2, key: 'doorsRearLeftSidePhoto' },
    { setter: setDoorPhoto, index: 3, key: 'doorsRearRightSidePhoto' },
    { setter: setDickyDoorPhoto, index: 0, key: 'bootPhoto' },
    { setter: setDickySkirtPhoto, index: 0, key: 'bootSkirtPhoto' },
    { setter: setBonetPhoto, index: 0, key: 'bonetPhoto' },
    { setter: setBumperPhoto, index: 0, key: 'bumperFrontPhoto' },
    { setter: setBumperPhoto, index: 1, key: 'bumperRearPhoto' },
    { setter: setSupportMembersPhoto, index: 0, key: 'supportMemberUpperPhoto' },
    { setter: setSupportMembersPhoto, index: 1, key: 'supportMemberLowerPhoto' },
    { setter: setSupportMembersPhoto, index: 2, key: 'headLampSupportRightSidePhoto' },
    { setter: setSupportMembersPhoto, index: 3, key: 'headLampSupportLeftSidePhoto' },
    { setter: setWheelTypePhoto, index: 0, key: 'wheelTypeAlloyPhoto' },
    { setter: setWheelTypePhoto, index: 1, key: 'wheelTypeDrumPhoto' },
    { setter: setWindShieldPhoto, index: 0, key: 'windShieldFrontTyrePhoto' },
    { setter: setWindShieldPhoto, index: 1, key: 'windShieldRearTyrePhoto' },
    { setter: setSuspensionPhoto, index: 0, key: 'strutPhoto' },
    { setter: setSuspensionPhoto, index: 1, key: 'lowerArmPhoto' },
    { setter: setSuspensionPhoto, index: 2, key: 'linkRodPhoto' },
    { setter: setSuspensionPhoto, index: 3, key: 'stabilizerBarPhoto' },
    { setter: setSuspensionPhoto, index: 4, key: 'shockAbsorberPhoto' },
    { setter: setSuspensionPhoto, index: 5, key: 'coilSpringPhoto' },
    { setter: setSuspensionPhoto, index: 6, key: 'leafSpringPhoto' },
    { setter: setSteeringPhoto, index: 0, key: 'rackAndPinionPhoto' },
    { setter: setSteeringPhoto, index: 1, key: 'steeringColumnPhoto' },
    { setter: setSteeringPhoto, index: 2, key: 'hardnessPhoto' },
    { setter: setSteeringPhoto, index: 3, key: 'ballJointEndPhoto' },
    { setter: setBrakePhoto, index: 0, key: 'padPhoto' },
    { setter: setBrakePhoto, index: 1, key: 'discPhoto' },
    { setter: setBrakePhoto, index: 2, key: 'shoePhoto' },
    { setter: setBrakePhoto, index: 3, key: 'drumPhoto' },
    { setter: setBrakePhoto, index: 4, key: 'wheelCylinderPhoto' },
    { setter: setBrakePhoto, index: 5, key: 'mcBoosterPhoto' },
  
    { setter: setTransmissionPhoto, index: 0, key: 'clutchPhoto' },
    { setter: setTransmissionPhoto, index: 1, key: 'gearShiftingPhoto' },
    { setter: setTransmissionPhoto, index: 2, key: 'driveShaftPhoto' },
    { setter: setTransmissionPhoto, index: 3, key: 'axlePhoto' },
    { setter: setTransmissionPhoto, index: 4, key: 'propellerShaftPhoto' },
    { setter: setTransmissionPhoto, index: 5, key: 'differentialPhoto' },
    { setter: setTransmissionPhoto, index: 6, key: 'bearingPhoto' },
    { setter: setTransmissionPhoto, index: 7, key: 'mountingPhoto' },
    
    { setter: setEnginePhoto, index: 0, key: 'smokePhoto' },
    { setter: setEnginePhoto, index: 1, key: 'turboPhoto' },
    { setter: setEnginePhoto, index: 2, key: 'misfiringPhoto' },
    { setter: setEnginePhoto, index: 3, key: 'tappetPhoto' },
    { setter: setEnginePhoto, index: 4, key: 'knockingPhoto' },
    { setter: setEnginePhoto, index: 5, key: 'exhaustPhoto' },
    { setter: setEnginePhoto, index: 6, key: 'beltsPhoto' },
    { setter: setEnginePhoto, index: 7, key: 'tensionerPhoto' },
    { setter: setEnginePhoto, index: 8, key: 'mountingPhoto' },
    { setter: setEnginePhoto, index: 9, key: 'fuelPumpPhoto' },
    { setter: setEnginePhoto, index: 10, key: 'highPressurePumpPhoto' },
    { setter: setEnginePhoto, index: 11, key: 'commonrailPhoto' },
    { setter: setEnginePhoto, index: 12, key: 'injectorPhoto' },
    { setter: setEnginePhoto, index: 13, key: 'fuelTankPhoto' },
    { setter: setEnginePhoto, index: 14, key: 'hosePhoto' },
    { setter: setEnginePhoto, index: 15, key: 'radiatorPhoto' },
    { setter: setEnginePhoto, index: 16, key: 'fanPhoto' },
    { setter: setEnginePhoto, index: 17, key: 'overHeatingPhoto' },
    { setter: setEnginePhoto, index: 18, key: 'allBearingsPhoto' },
    
    { setter: setElectricalPhoto, index: 0, key: 'batteryPhoto' },
    { setter: setElectricalPhoto, index: 1, key: 'alternatorPhoto' },
    { setter: setElectricalPhoto, index: 2, key: 'selfMotorPhoto' },
    { setter: setElectricalPhoto, index: 3, key: 'wiringHarnessPhoto' },
    { setter: setElectricalPhoto, index: 4, key: 'ecmPhoto' },
    { setter: setElectricalPhoto, index: 5, key: 'allSensorsPhoto' },
    { setter: setElectricalPhoto, index: 6, key: 'wiperMotorPhoto' },
    { setter: setElectricalPhoto, index: 7, key: 'clusterPhoto' },
    { setter: setElectricalPhoto, index: 8, key: 'headLightsAndDrlPhoto' },
    { setter: setElectricalPhoto, index: 9, key: 'tailLightPhoto' },
    { setter: setElectricalPhoto, index: 10, key: 'cabinLightPhoto' },
    { setter: setElectricalPhoto, index: 11, key: 'combinationSwitchPhoto' },
    { setter: setElectricalPhoto, index: 12, key: 'absPhoto' },
    { setter: setElectricalPhoto, index: 13, key: 'airBagPhoto' },
    { setter: setElectricalPhoto, index: 14, key: 'powerWindowsPhoto' },
    
    { setter: setAcPhoto, index: 0, key: 'coolingPhoto' },
    { setter: setAcPhoto, index: 1, key: 'blowerCondenserPhoto' },
    { setter: setAcPhoto, index: 2, key: 'fanPhoto' },
    { setter: setAcPhoto, index: 3, key: 'controlSwitchPhoto' },
    { setter: setAcPhoto, index: 4, key: 'ventPhoto' },
    
    { setter: setAccessoriesPhoto, index: 0, key: 'musicSystemPhoto' },
    { setter: setAccessoriesPhoto, index: 1, key: 'parkingSensorPhoto' },
    { setter: setAccessoriesPhoto, index: 2, key: 'reverseCameraPhoto' },
    { setter: setAccessoriesPhoto, index: 3, key: 'ovrmAdjusterPhoto' },
    { setter: setAccessoriesPhoto, index: 4, key: 'seatHeightAdjusterPhoto' },
    { setter: setAccessoriesPhoto, index: 5, key: 'seatBeltPhoto' },
    { setter: setAccessoriesPhoto, index: 6, key: 'sunRoofPhoto' },
    { setter: setAccessoriesPhoto, index: 7, key: 'roofRailPhoto' },
    { setter: setAccessoriesPhoto, index: 8, key: 'spoilerPhoto' },
    { setter: setAccessoriesPhoto, index: 9, key: 'skirtPhoto' },
    { setter: setAccessoriesPhoto, index: 10, key: 'steeringControlsPhoto' },
  ];
  

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
    console.log('loading and loading');
    setLoading(false);
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
      //dispatch(storeOrderData(response.data));


      photoUpdates.forEach(({ setter, index, key }) => {
        updatePhotoState(setter, index, response.data[key] || '');
      });

      // updatePhotoState(setRcPhoto, 0, response.data.rcFrontPhoto || '');
      // updatePhotoState(setRcPhoto, 1, response.data.rcBackPhoto || ''); // Default to empty string if rcBackPhoto is not present
      // updatePhotoState(setRcPhoto, 2, response.data.RCOthers || '');
      // updatePhotoState(
      //   setInsuracePhoto,
      //   0,
      //   response.data.insuranceOwnDamagePhoto || '',
      // );
      // updatePhotoState(
      //   setInsuracePhoto,
      //   1,
      //   response.data.insuranceThirdPartyPhoto || '',
      // );
      // updatePhotoState(
      //   setInsuracePhoto,
      //   2,
      //   response.data.insuranceOthers || '',
      // );
      // updatePhotoState(setNOCPhoto, 0, response.data.nocPhoto || '');
      // updatePhotoState(setNOCPhoto, 1, response.data.nocOthers || '');
      // updatePhotoState(
      //   setPhotoUrisCarPhotos,
      //   0,
      //   response.data.frontViewPhoto || '',
      // );
      // updatePhotoState(
      //   setPhotoUrisCarPhotos,
      //   1,
      //   response.data.rearViewPhoto || '',
      // );
      // updatePhotoState(
      //   setPhotoUrisCarPhotos,
      //   2,
      //   response.data.lhsViewPhoto || '',
      // );
      // updatePhotoState(
      //   setPhotoUrisCarPhotos,
      //   3,
      //   response.data.rhsViewPhoto || '',
      // );
      // updatePhotoState(
      //   setPhotoUrisCarPhotos,
      //   4,
      //   response.data.odometerPhoto || '',
      // );
      // updatePhotoState(setPhotoUrisCarPhotos, 5, response.data.roofPhoto || '');
      // updatePhotoState(
      //   setPhotoUrisCarPhotos,
      //   6,
      //   response.data.interiorPhoto || '',
      // );
      // updatePhotoState(
      //   setPhotoUrisCarPhotos,
      //   7,
      //   response.data.underChassisPhoto || '',
      // );
      // updatePhotoState(
      //   setPhotoUrisCarPhotos,
      //   8,
      //   response.data.engineRoomPhoto || '',
      // );
      // updatePhotoState(updatePhotoState, 9, response.data.trunkBootPhoto || '');
      // updatePhotoState(
      //   setChassisPunchPhoto,
      //   0,
      //   response.data.chassisPunchPhoto || '',
      // );
      // updatePhotoState(
      //   setVinPlatePunchPhoto,
      //   0,
      //   response.data.vinPlatePhoto || '',
      // );
      // updatePhotoState(
      //   setTyrePunchPhoto,
      //   0,
      //   response.data.frontTyreLeftPhoto || '',
      // );
      // updatePhotoState(
      //   setTyrePunchPhoto,
      //   1,
      //   response.data.frontTyreRightPhoto || '',
      // );
      // updatePhotoState(
      //   setTyrePunchPhoto,
      //   2,
      //   response.data.rearTyreLeftPhoto || '',
      // );
      // updatePhotoState(
      //   setTyrePunchPhoto,
      //   3,
      //   response.data.rearTyreRightPhoto || '',
      // );
      // updatePhotoState(
      //   setSpareWheelPunchPhoto,
      //   0,
      //   response.data.spareWheelPhoto || '',
      // );
      // updatePhotoState(
      //   setToolkitPunchPhoto,
      //   0,
      //   response.data.toolKitJackPhoto || '',
      // );
      // updatePhotoState(
      //   setKeyPunchPhoto,
      //   0,
      //   response.data.primaryKeyPhoto || '',
      // );
      // updatePhotoState(setKeyPunchPhoto, 1, response.data.spareKeyPhoto || '');
      // updatePhotoState(
      //   setPillarsPhoto,
      //   0,
      //   response.data.pillarALeftSidePhoto || '',
      // );
      // updatePhotoState(
      //   setPillarsPhoto,
      //   1,
      //   response.data.pillarARightSidePhoto || '',
      // );
      // updatePhotoState(
      //   setPillarsPhoto,
      //   2,
      //   response.data.pillarBLeftSidePhoto || '',
      // );
      // updatePhotoState(
      //   setPillarsPhoto,
      //   3,
      //   response.data.pillarBRightSidePhoto || '',
      // );
      // updatePhotoState(
      //   setPillarsPhoto,
      //   4,
      //   response.data.pillarCLeftSidePhoto || '',
      // );
      // updatePhotoState(
      //   setPillarsPhoto,
      //   5,
      //   response.data.pillarCRightSidePhoto || '',
      // );
      // updatePhotoState(
      //   setApronPhoto,
      //   0,
      //   response.data.apronLeftSidePhoto || '',
      // );
      // updatePhotoState(
      //   setApronPhoto,
      //   1,
      //   response.data.apronRightSidePhoto || '',
      // );
      // updatePhotoState(
      //   setFendersPhoto,
      //   0,
      //   response.data.fendersLeftSidePhoto || '',
      // );
      // updatePhotoState(
      //   setFendersPhoto,
      //   1,
      //   response.data.fendersRightSidePhoto || '',
      // );
      // updatePhotoState(
      //   setQuarterPanlesPhoto,
      //   0,
      //   response.data.quarterPanelsLeftSidePhoto || '',
      // );
      // updatePhotoState(
      //   setQuarterPanlesPhoto,
      //   1,
      //   response.data.quarterPanelsRightSidePhoto || '',
      // );
      // updatePhotoState(
      //   setRunningBoardPhoto,
      //   0,
      //   response.data.runningBoardLeftSidePhoto || '',
      // );
      // updatePhotoState(
      //   setRunningBoardPhoto,
      //   1,
      //   response.data.runningBoardRightSidePhoto || '',
      // );
      // updatePhotoState(
      //   setDoorPhoto,
      //   0,
      //   response.data.doorsFrontLeftSidePhoto || '',
      // );
      // updatePhotoState(
      //   setDoorPhoto,
      //   1,
      //   response.data.doorsFrontRightSidePhoto || '',
      // );
      // updatePhotoState(
      //   setDoorPhoto,
      //   2,
      //   response.data.doorsRearLeftSidePhoto || '',
      // );
      // updatePhotoState(
      //   setDoorPhoto,
      //   3,
      //   response.data.doorsRearRightSidePhoto || '',
      // );
      // updatePhotoState(setDickyDoorPhoto, 0, response.data.bootPhoto || '');
      // updatePhotoState(
      //   setDickySkirtPhoto,
      //   0,
      //   response.data.bootSkirtPhoto || '',
      // );
      // updatePhotoState(setBonetPhoto, 0, response.data.bonetPhoto || '');
      // updatePhotoState(setBumperPhoto, 0, response.data.bumperFrontPhoto || '');
      // updatePhotoState(setBumperPhoto, 1, response.data.bumperRearPhoto || '');

      // updatePhotoState(
      //   setSupportMembersPhoto,
      //   0,
      //   response.data.supportMemberUpperPhoto || '',
      // );
      // updatePhotoState(
      //   setSupportMembersPhoto,
      //   1,
      //   response.data.supportMemberLowerPhoto || '',
      // );
      // updatePhotoState(
      //   setSupportMembersPhoto,
      //   2,
      //   response.data.headLampSupportRightSidePhoto || '',
      // );
      // updatePhotoState(
      //   setSupportMembersPhoto,
      //   3,
      //   response.data.headLampSupportLeftSidePhoto || '',
      // );

      // updatePhotoState(
      //   setWheelTypePhoto,
      //   0,
      //   response.data.wheelTypeAlloyPhoto || '',
      // );
      // updatePhotoState(
      //   setWheelTypePhoto,
      //   1,
      //   response.data.wheelTypeDrumPhoto || '',
      // );
      // updatePhotoState(
      //   setWindShieldPhoto,
      //   0,
      //   response.data.windShieldFrontTyrePhoto || '',
      // );
      // updatePhotoState(
      //   setWindShieldPhoto,
      //   1,
      //   response.data.windShieldRearTyrePhoto || '',
      // );

      // updatePhotoState(setSuspensionPhoto, 0, response.data.strutPhoto || '');
      // updatePhotoState(
      //   setSuspensionPhoto,
      //   1,
      //   response.data.lowerArmPhoto || '',
      // );
      // updatePhotoState(setSuspensionPhoto, 2, response.data.linkRodPhoto || '');
      // updatePhotoState(
      //   setSuspensionPhoto,
      //   3,
      //   response.data.stabilizerBarPhoto || '',
      // );
      // updatePhotoState(
      //   setSuspensionPhoto,
      //   4,
      //   response.data.shockAbsorberPhoto || '',
      // );
      // updatePhotoState(
      //   setSuspensionPhoto,
      //   5,
      //   response.data.coilSpringPhoto || '',
      // );
      // updatePhotoState(
      //   setSuspensionPhoto,
      //   6,
      //   response.data.leafSpringPhoto || '',
      // );

      // updatePhotoState(
      //   setSteeringPhoto,
      //   0,
      //   response.data.rackAndPinionPhoto || '',
      // );

      // updatePhotoState(
      //   setSteeringPhoto,
      //   1,
      //   response.data.steeringColumnPhoto || '',
      // );

      // updatePhotoState(setSteeringPhoto, 2, response.data.hardnessPhoto || '');

      // updatePhotoState(
      //   setSteeringPhoto,
      //   3,
      //   response.data.ballJointEndPhoto || '',
      // );

      // updatePhotoState(setBrakePhoto, 0, response.data.padPhoto || '');
      // updatePhotoState(setBrakePhoto, 1, response.data.discPhoto || '');
      // updatePhotoState(setBrakePhoto, 2, response.data.shoePhoto || '');
      // updatePhotoState(setBrakePhoto, 3, response.data.drumPhoto || '');
      // updatePhotoState(
      //   setBrakePhoto,
      //   4,
      //   response.data.wheelCylinderPhoto || '',
      // );
      // updatePhotoState(setBrakePhoto, 5, response.data.mcBoosterPhoto || '');

      // updatePhotoState(
      //   setTransmissionPhoto,
      //   0,
      //   response.data.clutchPhoto || '',
      // );
      // updatePhotoState(
      //   setTransmissionPhoto,
      //   1,
      //   response.data.gearShiftingPhoto || '',
      // );
      // updatePhotoState(
      //   setTransmissionPhoto,
      //   2,
      //   response.data.driveShaftPhoto || '',
      // );
      // updatePhotoState(setTransmissionPhoto, 3, response.data.axlePhoto || '');
      // updatePhotoState(
      //   setTransmissionPhoto,
      //   4,
      //   response.data.propellerShaftPhoto || '',
      // );
      // updatePhotoState(
      //   setTransmissionPhoto,
      //   5,
      //   response.data.differentialPhoto || '',
      // );
      // updatePhotoState(
      //   setTransmissionPhoto,
      //   6,
      //   response.data.bearingPhoto || '',
      // );
      // updatePhotoState(
      //   setTransmissionPhoto,
      //   7,
      //   response.data.mountingPhoto || '',
      // );

      // updatePhotoState(setEnginePhoto, 0, response.data.smokePhoto);
      // updatePhotoState(setEnginePhoto, 1, response.data.turboPhoto);
      // updatePhotoState(setEnginePhoto, 2, response.data.misfiringPhoto);
      // updatePhotoState(setEnginePhoto, 3, response.data.tappetPhoto);
      // updatePhotoState(setEnginePhoto, 4, response.data.knockingPhoto);
      // updatePhotoState(setEnginePhoto, 5, response.data.exhaustPhoto);
      // updatePhotoState(setEnginePhoto, response.data.beltsPhoto);
      // updatePhotoState(setEnginePhoto, response.data.tensionerPhoto);
      // updatePhotoState(setEnginePhoto, response.data.mountingPhoto);

      // updatePhotoState(setEnginePhoto, 9, response.data.fuelPumpPhoto);
      // updatePhotoState(setEnginePhoto, 10, response.data.highPressurePumpPhoto);
      // updatePhotoState(setEnginePhoto, 11, response.data.commonrailPhoto);
      // updatePhotoState(setEnginePhoto, 12, response.data.injectorPhoto);
      // updatePhotoState(setEnginePhoto, 13, response.data.fuelTankPhoto);
      // updatePhotoState(setEnginePhoto, 14, response.data.hosePhoto);
      // updatePhotoState(setEnginePhoto, 15, response.data.radiatorPhoto);
      // updatePhotoState(setEnginePhoto, 16, response.data.fanPhoto);
      // updatePhotoState(setEnginePhoto, 17, response.data.overHeatingPhoto);
      // updatePhotoState(setEnginePhoto, 18, response.data.allBearingsPhoto);

      // updatePhotoState(setElectricalPhoto, 0, response.data.batteryPhoto);
      // updatePhotoState(setElectricalPhoto, 1, response.data.alternatorPhoto);
      // updatePhotoState(setElectricalPhoto, 2, response.data.selfMotorPhoto);
      // updatePhotoState(setElectricalPhoto, 3, response.data.wiringHarnessPhoto);
      // updatePhotoState(setElectricalPhoto, 4, response.data.ecmPhoto);
      // updatePhotoState(setElectricalPhoto, 5, response.data.allSensorsPhoto);
      // updatePhotoState(setElectricalPhoto, 6, response.data.wiperMotorPhoto);
      // updatePhotoState(setElectricalPhoto, 7, response.data.clusterPhoto);
      // updatePhotoState(
      //   setElectricalPhoto,
      //   8,
      //   response.data.headLightsAndDrlPhoto,
      // );

      // updatePhotoState(setElectricalPhoto, 9, response.data.tailLightPhoto);
      // updatePhotoState(setElectricalPhoto, 10, response.data.cabinLightPhoto);
      // updatePhotoState(
      //   setElectricalPhoto,
      //   11,
      //   response.data.combinationSwitchPhoto,
      // );
      // updatePhotoState(setElectricalPhoto, 12, response.data.absPhoto);

      // updatePhotoState(setElectricalPhoto, 13, response.data.airBagPhoto);
      // updatePhotoState(setElectricalPhoto, 14, response.data.powerWindowsPhoto);

      // updatePhotoState(setAcPhoto, 0, response.data.coolingPhoto);
      // updatePhotoState(setAcPhoto, 1, response.data.blowerCondenserPhoto);
      // updatePhotoState(setAcPhoto, 2, response.data.fanPhoto);
      // updatePhotoState(setAcPhoto, 3, response.data.controlSwitchPhoto);
      // updatePhotoState(setAcPhoto, 4, response.data.ventPhoto);

      // updatePhotoState(setAccessoriesPhoto, 0, response.data.musicSystemPhoto);
      // updatePhotoState(
      //   setAccessoriesPhoto,
      //   1,
      //   response.data.parkingSensorPhoto,
      // );
      // updatePhotoState(
      //   setAccessoriesPhoto,
      //   2,
      //   response.data.reverseCameraPhoto,
      // );
      // updatePhotoState(setAccessoriesPhoto, 3, response.data.ovrmAdjusterPhoto);
      // updatePhotoState(
      //   setAccessoriesPhoto,
      //   4,
      //   response.data.seatHeightAdjusterPhoto,
      // );
      // updatePhotoState(setAccessoriesPhoto, 5, response.data.seatBeltPhoto);
      // updatePhotoState(setAccessoriesPhoto, 6, response.data.sunRoofPhoto);
      // updatePhotoState(setAccessoriesPhoto, 7, response.data.roofRailPhoto);
      // updatePhotoState(setAccessoriesPhoto, 8, response.data.spoilerPhoto);
      // updatePhotoState(setAccessoriesPhoto, 9, response.data.skirtPhoto);

      // updatePhotoState(
      //   setAccessoriesPhoto,
      //   10,
      //   response.data.steeringControlsPhoto,
      // );

      setLoading(false);
      // setLoading(false);
      console.log(response.data, 'COUNT INNDIA');
    } catch (error) {
      console.error('GET error:', error);
    }
  };

  const updatePhotoState = (stateSetter, index, url) => {
    console.log("forffififi");
    stateSetter(prevState => {
      const newState = [...prevState];
      newState[index] = url;
      return newState;
    });
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
            <TouchableOpacity onPress={() => handleOkPress()}>
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

                      {/* <View style={{marginTop: 14}}>
                        <TextInput
                          style={styles.photoInput}
                          placeholder="Enter remarks"
                          value={suspensionRemarks[index]}
                          onChangeText={text =>
                            handleSuspensionRemarks(text, index)
                          }
                        />
                      </View> */}

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

                <View style={{marginTop: 10, paddingHorizontal: 8}}>
                  <TextInput
                    style={styles.photoInput}
                    placeholder="Enter remarks"
                    value={remarks}
                    onChangeText={text => setRemarks(text)}
                  />
                </View>
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
        onRequestClose={() => setModalVisible1(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => handleOkPressCarPhotos()}>
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
              <View style={{paddingHorizontal: 12, marginTop: 12}}>
                <TextInput
                  style={styles.photoInput}
                  placeholder="Enter remarks"
                  value={carPhotosRemarks[selectedContainerIndex1]}
                  onChangeText={text =>
                    handleRemarksChangeCarPhotos(text, selectedContainerIndex1)
                  }
                />
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
        onRequestClose={() => setReinspectorPage(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => handleOkReinspector()}>
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
                        handleCloseReinspectorPhotos(carIndex8)
                      }>
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
        onRequestClose={() => setInspectionVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => handleInspectionOkPress()}>
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
                          
                          <Picker.Item label={index==0?"Noise":index==1?"Noise":index==2?"Noise":index ==3?"Noise":index==4?"Noise":index==5 ?"Noise":"Noise"} value={index==0?"Noise":index==1?"Noise":index==2?"Noise":index ==3?"Noise":index==4?"Noise":index==5 ?"Noise":"Noise"}  />
                          <Picker.Item label={index==0?"Leake":index==1?"Damaged":index==2?"Damaged":index ==3?"Damaged":index==4?"Leake":index==5 ?"Damaged":"Damaged"}  value={index==0?"Leake":index==1?"Damaged":index==2?"Damaged":index ==3?"Damaged":index==4?"Leake":index==5 ?"Damaged":"Damaged"} />
                          <Picker.Item label={index==0?"Damaged": index === 1 ? " " : index==2?"":index ==3?"":index==4?"Damaged":index==5 ?"Not Available":"Not Available"}   value={index==0?"Damaged": index === 1 ? " " : index==2?"":index ==3?"":index==4?"Damaged":index==5 ?"Not Available":"Not Available"} />
               

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
                          <Picker.Item label={index==0?"Noise":index==1?"Noise":index==2?"Need to OH":"Noise"}  value={index==0?"Noise":index==1?"Noise":index==2?"Need to OH":"Noise"} />
                          <Picker.Item label={index==0?"Damaged":index==1?"Damaged":index==2?"PS motor not working":"Damaged"} value={index==0?"Damaged":index==1?"Damaged":index==2?"PS motor not working":"Damaged"} />

                         

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
                          <Picker.Item label={index==0?"Noise":index==1?"Noise":index==2?"Noise":index==3?"Noise":index==4?"Leake":"Leake"}  value={index==0?"Noise":index==1?"Noise":index==2?"Noise":index==3?"Noise":index==4?"Leake":"Leake"}  />
                          <Picker.Item label={index==0?"Needs to Replace":index==1?"Needs to Replace":index==2?"Needs to Replace":index==3?"Needs to Replace":index==4?"Jam":"Jam"} value={index==0?"Needs to Replace":index==1?"Needs to Replace":index==2?"Needs to Replace":index==3?"Needs to Replace":index==4?"Jam":"Jam"} />
                          <Picker.Item label={index==0?"Not Available":index==1?"Not Available":index==2?"Not Available":index==3?"Not Available":""}  value={index==0?"Not Available":index==1?"Not Available":index==2?"Not Available":index==3?"Not Available":""}   />


                     

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
                          <Picker.Item label={index==0?"Hard":index==1?"Hard":index==2?"Noise":index ==3?"Noise":index==4?"Noise":index==5 ?"Noise":"Noise"} value={index==0?"Hard":index==1?"Hard":index==2?"Noise":index ==3?"Noise":index==4?"Noise":index==5 ?"Noise":"Noise"}/>
                          <Picker.Item label={index==0?"Wornout":index==1?"Noise":index==2?"Damage":index ==3?"Damage":index==4?"Damage":index==5 ?"Damage":"Damage"}  value={index==0?"Wornout":index==1?"Noise":index==2?"Damage":index ==3?"Damage":index==4?"Damage":index==5 ?"Damage":"Damage"}  />
                          <Picker.Item label={index==0?"Shuttering": index == 1 ? "Need to Replace" : index==2?"leak":index ==3?"leak":index==4?"leak":index==5 ?"leak":""}   value={index==0?"Shuttering": index == 1 ? "Need to Replace" : index==2?"leak":index ==3?"leak":index==4?"leak":index==5 ?"leak":""}    />

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
                          <Picker.Item   label={
    index == 0 ? "White" :
    index == 1 ? "Leak" :
    index == 2 ? "Electrical" :
    index == 3 ? "Adjust" :
    index == 4 ? "Adjust" :
    index == 5 ? "Noise" :
    index == 6 ? "Noise" :
    index == 7 ? "Noise" :
    index == 8 ? "Noise" :
    index == 9 ? "Leak" :
    index == 10 ? "Leak" :
    index == 11 ? "Leak" :
    index == 12 ? "Leak" :
    index == 13 ? "Leak" :
    index == 14 ? "Leak" :
    index == 15 ? "Leak" :
    index == 16 ? "Noise" :
    index == 17 ? "Oil level Low" :
    "Noise"
  }
 value={index == 0 ? "White" :
  index == 1 ? "Leak" :
  index == 2 ? "Electrical" :
  index == 3 ? "Adjust" :
  index == 4 ? "Adjust" :
  index == 5 ? "Noise" :
  index == 6 ? "Noise" :
  index == 7 ? "Noise" :
  index == 8 ? "Noise" :
  index == 9 ? "Leak" :
  index == 10 ? "Leak" :
  index == 11 ? "Leak" :
  index == 12 ? "Leak" :
  index == 13 ? "Leak" :
  index == 14 ? "Leak" :
  index == 15 ? "Leak" :
  index == 16 ? "Noise" :
  index == 17 ? "Oil level Low" :
  "Noise"}  />
                          <Picker.Item label={
    index == 0 ? "Blue" :
    index == 1 ? "Noise" :
    index == 2 ? "Fuel" :
    index == 3 ? "Replace" :
    index == 4 ? "Replace" :
    index == 5 ? "Damaged" :
    index == 6 ? "Damaged" :
    index == 7 ? "Damaged" :
    index == 8 ? "Damaged" :
    index == 9 ? "Noise" :
    index == 10 ? "Noise" :
    index == 11 ? "Noise" :
    index == 12 ? "Noise" :
    index == 13 ? "Damaged" :
    index == 14 ? "Damaged" :index==15?"Damaged":index==16? "Damaged":index==17?"Electrical":"Damaged"
    
  }  value={index == 0 ? "Blue" :
    index == 1 ? "Noise" :
    index == 2 ? "Fuel" :
    index == 3 ? "Replace" :
    index == 4 ? "Replace" :
    index == 5 ? "Damaged" :
    index == 6 ? "Damaged" :
    index == 7 ? "Damaged" :
    index == 8 ? "Damaged" :
    index == 9 ? "Noise" :
    index == 10 ? "Noise" :
    index == 11 ? "Noise" :
    index == 12 ? "Noise" :
    index == 13 ? "Damaged" :
    index == 14 ? "Damaged" :index==15?"Damaged":index==16? "Damaged":index==17?"Electrical":"Damaged"} />
                          <Picker.Item label={index==0?"Black": index === 1 ? "Not Available" : index==2?"Engine":index ==3?"Replace":index==4?"Replace":index==5 ?"Replace":index==6?"Replace":index==7?"Replace":index==8?"Replace":index==9?"Replace":index==10?"Replace":index==11?"Replace":index==12?"Replace":index==13?"Rust":index==14?"":index==15?"":index==16?"Not Working":index==17?"Oil Condaminated":"Replace"}   value={index==0?"Black": index === 1 ? "Not Available" : index==2?"Engine":index ==3?"Replace":index==4?"Replace":index==5 ?"Replace":index==6?"Replace":index==7?"Replace":index==8?"Replace":index==9?"Replace":index==10?"Replace":index==11?"Replace":index==12?"Replace":index==13?"Rust":index==14?"":index==15?"":index==16?"Not Working":index==17?"Oil Condaminated":"Replace"} />
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
                          <Picker.Item label={index==0?"Charge": index === 1 ? "Noise" : index==2?"Noise":index ==3?"Damaged":index==4?"Not Working":index==5 ?"Not Working":index==6?"Not Working":index==7?"Not Working":index==8?"Not Working":index==9?"Not Working":index==10?"Not Working":index==11?"Not Working":index==12?"Not Applicable":index==13?"Not Applicable":"Not Applicable"} value={index==0?"Charge": index === 1 ? "Noise" : index==2?"Noise":index ==3?"Damaged":index==4?"Not Working":index==5 ?"Not Working":index==6?"Not Working":index==7?"Not Working":index==8?"Not Working":index==9?"Not Working":index==10?"Not Working":index==11?"Not Working":index==12?"Not Applicable":index==13?"Not Applicable":"Not Applicable"} />
                          <Picker.Item label={index==0?"Replace": index === 1 ? "Not Working" : index==2?"Not Working":index ==3?"Repaired":index==4?"Damaged":index==5 ?"Damaged":index==6?"Damaged":index==7?"Damaged":index==8?"Damaged":index==9?"Damaged":index==10?"Damaged":index==11?"Damaged":index==12?"Not Working":index==13?"Not Available":"Not Working"} value={index==0?"Replace": index === 1 ? "Not Working" : index==2?"Not Working":index ==3?"Repaired":index==4?"Damaged":index==5 ?"Damaged":index==6?"Damaged":index==7?"Damaged":index==8?"Damaged":index==9?"Damaged":index==10?"Damaged":index==11?"Damaged":index==12?"Not Working":index==13?"Not Available":"Not Working"}  />
                          <Picker.Item label={index==0?"": index === 1 ? "" : index==2?"":index ==3?"":index==4?"":index==5 ?"":index==6?"Replace":index==7?"":index==8?"":index==9?"":index==10?"":index==11?"":index==12?"Damaged":index==13?"Damaged":"Damaged"} value={index==0?"": index === 1 ? "" : index==2?"":index ==3?"":index==4?"":index==5 ?"":index==6?"Replace":index==7?"":index==8?"":index==9?"":index==10?"":index==11?"":index==12?"Damaged":index==13?"Damaged":"Damaged"}  />
                          

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
                          <Picker.Item label={index==0?"Gas Level Low":index==1?"Not Working":index==2?"Leak":index ==3?"Damaged":index==4?"Damaged":"Damaged"} value={index==0?"Gas Level Low":index==1?"Not Working":index==2?"Leak":index ==3?"Damaged":index==4?"Damaged":"Damaged"}/>
                          <Picker.Item label={index==0?"Not Working":index==1?"Noise":index==2?"Damaged":index ==3?"Not Working":index==4?"Not Working":""}  value={index==0?"Not Working":index==1?"Noise":index==2?"Damaged":index ==3?"Not Working":index==4?"Not Working":""} />

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
                          <Picker.Item label={index==0?"Not Available": index === 1 ? "Not Available" : index==2?"Not Available":index ==3?"Not Available":index==4?"Not Available":index==5 ?"Damaged":index==6?"Not Available":index==7?"Not Available":index==8?"Not Available":index==9?"Not Available":"Not Available"} value={index==0?"Not Available": index === 1 ? "Not Available" : index==2?"Not Available":index ==3?"Not Available":index==4?"Not Available":index==5 ?"Damaged":index==6?"Not Available":index==7?"Not Available":index==8?"Not Available":index==9?"Not Available":"Not Available"} />
                          <Picker.Item label={index==0?"Damaged": index === 1 ? "Damaged" : index==2?"Damaged":index ==3?"Damaged":index==4?"Damaged":index==5 ?"Not Working":index==6?"Damaged":index==7?"Damaged":index==8?"Damaged":index==9?"Damaged":"Damaged"} value={index==0?"Damaged": index === 1 ? "Damaged" : index==2?"Damaged":index ==3?"Damaged":index==4?"Damaged":index==5 ?"Not Working":index==6?"Damaged":index==7?"Damaged":index==8?"Damaged":index==9?"Damaged":"Damaged"} />
                          <Picker.Item label={index==0?"Not Working": index === 1 ? "Not Working" : index==2?"Not Working":index ==3?"Not Working":index==4?"Not Working":index==5 ?"":index==6?"Not Working":index==7?"":index==8?"":index==9?"":"Not Working"} value={index==0?"Not Working": index === 1 ? "Not Working" : index==2?"Not Working":index ==3?"Not Working":index==4?"Not Working":index==5 ?"":index==6?"Not Working":index==7?"":index==8?"":index==9?"":"Not Working"}   />
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
            <TouchableOpacity onPress={() => handleBodyInspectionOkPress()}>
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
                            onPress={() =>
                              handleBodyInspectionClosePress(index)
                            }>
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
                              onPress={() => carDetailsClosePress(index)}>
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
                            <Picker.Item
                              label="Re Punched"
                              value="Re Punched"
                            />
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
                              onPress={() => carDetailsClosePress(index)}>
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
                            <Picker.Item label="Damaged" value="Damaged" />
                            <Picker.Item label="Missing" value="Missing" />

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
                              onPress={() => carDetailsClosePress(index)}>
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
                            value={tyreRemarks[index]}
                            onChangeText={text =>
                              handleCarDetailsRemarks(text, index)
                            }
                          />
                        </View>
                        <View style={{marginTop: 14}}>
                          {/* <View key={index} style={styles.sliderContainer}>
            <Text style={styles.percentageText}>{Math.round(value * 100)}%</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={value}
              onValueChange={(val) => handleValueChange(val, index)}
              minimumTrackTintColor={getTrackColor(value)}
              maximumTrackTintColor="#000000"
              thumbTintColor="#007BFF"
            />
          </View> */}
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
                            option1={'Available'}
                            option2={'Not Available'}
                            onSelectSwitch={val =>
                              handleCarDetailsChange(index, val)
                            }
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
                              onPress={() => carDetailsClosePress(index)}>
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
                            value={spareWheelRemarks[index]}
                            onChangeText={text =>
                              handleCarDetailsRemarks(text, index)
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
                            option1={'Available'}
                            option2={'Not Available'}
                            onSelectSwitch={val =>
                              handleCarDetailsChange(index, val)
                            }
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
                              onPress={() => carDetailsClosePress(index)}>
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
                            <Picker.Item label="Good" value="Good" />
                            <Picker.Item label="Damaged" value="Damaged" />

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
                            option1={'Available'}
                            option2={'Not Available'}
                            onSelectSwitch={val =>
                              handleCarDetailsChange(index, val)
                            }
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
                              onPress={() => carDetailsClosePress(index)}>
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
                            onChangeText={text =>
                              handleCarDetailsRemarks(text, index)
                            }
                          />
                        </View>
                        <View style={{marginTop: 14}}>
                          <Picker
                            style={styles.photoInput}
                            selectedValue={keyCondition[index]}
                            onValueChange={itemValue =>
                              handleCarDetailsDropDown(itemValue, index)
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
          <Text style={styles.indicator}>{`${currentIndex + 1}/${role ==="Reinspector"?8:7}`}</Text>

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
                label="Owner Details"
                value={ownerDetails}
                editible={false}
                onChangeText={value => setOwnerDetails(value)}
                placeholder="Enter the Owner Details"
              />

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
                <CustomButton
                  title="Next"
                  loading={loading}
                  onPress={() => {
                    if (id) {
                      handleNext(1);
                    } else {
                      handleNext(1);
                    }
                  }}
                />
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
          <Text style={styles.indicator}>{`${currentIndex + 1}/${role ==="Reinspector"?8:7}`}</Text>

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
                      handleNext(2);
                    } else {
                      handleNext(2);
                    }
                  }}
                />
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
          <Text style={styles.indicator}>{`${currentIndex + 1}/${role ==="Reinspector"?8:7}`}</Text>

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
                <CustomButton
                  title="Next"
                  loading={loading}
                  onPress={() => {
                    if (id) {
                      handleNext(3);
                    } else {
                      handleNext(3);
                    }
                  }}
                />
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
          <Text style={styles.indicator}>{`${currentIndex + 1}/${role ==="Reinspector"?8:7}`}</Text>

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
                <CustomButton
                  title="Next"
                  loading={loading}
                  onPress={() => {
                    if (id) {
                      handleNext(4);
                    } else {
                      handleNext(4);
                    }
                  }}
                />
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
          <Text style={styles.indicator}>{`${currentIndex + 1}/${role ==="Reinspector"?8:7}`}</Text>

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
                <CustomButton
                  title="Next"
                  loading={loading}
                  onPress={() => {
                    if (id) {
                      handleNext(5);
                    } else {
                      handleNext(5);
                    }
                  }}
                />
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
          <Text style={styles.indicator}>{`${currentIndex + 1}/${role ==="Reinspector"?8:7}`}</Text>

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
                <CustomButton
                  title="Next"
                  loading={loading}
                  onPress={() => {
                    if (id) {
                      handleNext(6);
                    } else {
                      handleNext(6);
                    }
                  }}
                />
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
          <Text style={styles.indicator}>{`${currentIndex + 1}/${role ==="Reinspector"?8:7}`}</Text>

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
   title={role=="Reinspector" ?"Next":"Save"}
                  loading={loading}
                  onPress={() => {
                    if (id) {
                      handleNext(7);
                    } else {
                      handleNext(7);
                    }
                  }}
                />
              
              </View>
            </View>
          </ScrollView>
        </View>


        {role ==="Reinspector" && (
  <View style={styles.slide}>
  <Text style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}>
   Car Photos
  </Text>
  <View style={styles.progressBarContainer}>
    <View
      style={[styles.progressBar, {width: getProgressBarWidth()}]}
    />
  </View>
  <Text style={styles.indicator}>{`${currentIndex + 1}/${role ==="Reinspector"?8:7}`}</Text>

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
                {reinspectorValidation[index] ? 'Update / View' : 'Upload'}
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
              handleNext(8);
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
    width: '80%',
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
