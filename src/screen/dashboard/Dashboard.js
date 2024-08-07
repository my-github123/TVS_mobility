import React, {useCallback, useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  DatePickerAndroid,
  PermissionsAndroid,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
  BackHandler,
  Text,
  ToastAndroid,
  StatusBar,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import CustomBox from '../../components/CustomBox';
import CustomTextInput from "../../components/customTextInput";
import moment from 'moment';
import {apiGetWithToken} from '../../services/apiService';
import {getItem, setItem, deleteItem} from '../../utils/asyncStorageUtils';
import { useNavigation, useRoute,CommonActions } from '@react-navigation/native';
import User from '../../../assets/images/user.svg';


import CustomButton from '../../components/customTextButton';

const Dashboard = ({navigation}) => {

 

  const [dashboardDetails, setDashboardDetails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [orderListCount, setOrderListCount] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userName, setUsername] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [openFromDatePicker, setOpenFromDatePicker] = useState(false);
  const [openToDatePicker, setOpenToDatePicker] = useState(false);

  console.log(orderListCount,"ORDER list ciue  rnw");



  useEffect(() => {
    // Update filtered data when the search query or dashboard details change
    setFilteredData(
      dashboardDetails.filter(item =>
        item.vechNumber.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  }, [searchQuery, dashboardDetails]);

  const callingUpdated = item => {
    if (item.orderStatus == 1 ) {
      navigation.navigate('OrderCreation');
    }
  };

  useEffect(() => {
    getOrderList();
    getData();
    
  }, []);

  


  async function requestCameraPermission() {
    console.log("iiiiiiiiii");
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Camera Permission',
                message: 'App needs access to your camera',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Camera permission granted');
        } else {
            console.log('Camera permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
}


useEffect(() => {
  requestCameraPermission();
}, []);


  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const pastDate = new Date(currentDate);
    pastDate.setDate(pastDate.getDate() - 30);

    console.log(pastDate,"pastDate");

    setFromDate(pastDate);
    console.log(currentDate,"cureent date is there......");
    setToDate(currentDate);

    getAllOrders(pastDate, currentDate);
  }, []);

  // YourComponent.js

  const getOrderList = async () => {
    try {
      const response = await apiGetWithToken('getAllOrders');
  
      // Check if the response contains an error
      if (response.error === 'Unauthorized') {
        Alert.alert(
          'Session Expired',
          'Your session has expired. Please log in again.',
          [
            {
              text: 'OK',
              onPress: async () => {
                await deleteItem('token'); // Remove token
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  })
                );
              }
            }
          ]
        );
      } else {
        // Process the response if no error
        setDashboardDetails(response.data.data);
        setFilteredData(response.data.data);
        setOrderListCount(response.data.counts);
        setRefreshing(false);
        setLoading(false);
        console.log(response.data.counts, "COUNT INNDIA");
      }
    } catch (error) {
      console.error('GET error:', error);
    }
  };



  const handleFromDateSelect = (date) => {
    setFromDate(date);
    setOpenFromDatePicker(false);
  };

  const handleToDateSelect = (date) => {
    setToDate(date);
    setOpenToDatePicker(false);
    if (fromDate && date) {
      getAllOrders(fromDate, date);
    }
  };

 
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };




  const getAllOrders = async (fromDate, toDate) => {

    const formattedFromDate =formatDate(fromDate)
    const formattedToDate =formatDate(toDate);

    console.log(formattedFromDate,"kjkhjkjh");
    console.log(formattedToDate,"looiiu");

   // const apiUrl = `https://tvscertified.in:8083/getAllOrders/?fromdate="${formattedFromDate}"&toDate="${formattedToDate}"`;
   
   setRefreshing(true);
    try {
      const response = await apiGetWithToken(`getAllOrders/?fromdate="${formattedFromDate}"&toDate="${formattedToDate}"`);
     // const data = await response.json();
     
      setFilteredData(response.data.data);
      console.log(response.data,"response data is there...........");
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setRefreshing(false);
    }
  };
const [role,setRole]=useState("");

  const getData = async () => {
    try {
      const username = await getItem('username');
      const roleType = await getItem('role');
      setRole(roleType)

      console.log(username,"kjjh");

      if (username !== null) {
       
        setUsername(username);
      } else {
        console.log('Token or userID is null');
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const handleLogout =async () => {
    // Handle logout functionality here
    await deleteItem('token');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  
    setModalVisible(false);
  };


  const onRefresh = () => {
    setRefreshing(true);

    getOrderList();
    setFromDate("");
    setToDate("");
  };

  const openDealarList = item => {
    setSelectedDealer(item);
    setModalVisible(!modalVisible);
  };

//   const renderItem = ({item}) => {
  
//     return (
//       <View style={styles.card}>
//         <View style={styles.row}>
//           <Text style={styles.vehicleNo}>{item.vechNumber}</Text>
//           <Text onPress={() => callingUpdated(item)} style={styles.status}>
//             {item.orderStatus == 1 ? 'Initiated' : 'Completed'}
//           </Text>
//         </View>
//         <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//           <Text style={styles.vehicleNo}>
//             {item.make} | {item.model}
//           </Text>
//           <Text
//             onPress={() => openDealarList(item)}
//             style={{
//               color: 'black',
//               marginTop: 5,
//               fontSize: 14,
//               fontWeight: 'bold',
//             }}>
//             Dealer list
//           </Text>
//         </View>
//         <View style={styles.separator} />
//         <View style={{flexDirection: 'row'}}>
//           <Text style={styles.name}>
//             {item.createdBy} |{' '}
//             {moment(item.createdDate).format('DD-MMMM-YYYY h.mm a')}
//           </Text>
//           {/* <Text style={styles.date}>
// }</Text> */}
//         </View>
//       </View>
//     );
//   };
  

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   // Simulate a network request
  //   setTimeout(() => {
  //     // Here you can update your data or perform any action on refresh
  //     setRefreshing(false);
  //   }, 2000);
  // }, []);

  const callInitiated=(item)=>{
    if(item.orderStatus===1) {
      navigation.navigate("OrderCreation",{
        id:item.id
      })

    }

  }

  const handlePress = (item) => {
    if (role === 'Reinspector') {
      callInitiated(item);
    }
    else {
      ToastAndroid.show('You do not have permission to initiate', ToastAndroid.SHORT);
    }
  };


  const handleImageClick = () => {
    setModalVisible(true);
  };


  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}  onPress={()=>callInitiated(item)}>
      <View style={styles.row}>
        <Text style={styles.vechNumber}>{item.vechNumber===""?"-":item.vechNumber}</Text>
        <Text style={[styles.status, { backgroundColor: item.orderStatus === 1 ? '#4375fa' : '#6ecb96' }]}>
          {item.orderStatus === 1 ? 'initiated' : 'completed'}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.makeModel}>{item.make===""?"-":item.make} | {item.model===""?"-":item.model}</Text>
        <TouchableOpacity onPress={() => alert(`Dealer: ${item.dealerName===""?"-":item.dealerName}\nLocation: ${item.dealerLocation===""?"-":item.dealerLocation}\nPhone: ${item.dealerPhoneNumber===""?"-":item.dealerPhoneNumber}`)}>
          <Text style={styles.hyperlink}>Dealer details</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.createdBy}>{item.createdBy}</Text>
        <Text style={styles.createdDate}>{moment(item.createdDate).format('DD-MMMM-YYYY h.mm a')}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.topContainer}>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Dealer Information</Text>
            {selectedDealer && (
              <>
                <Text style={styles.modalText}>
                  Name: {selectedDealer.dealerName}
                </Text>
                <Text style={styles.modalText}>
                  Location: {selectedDealer.dealerLocation}
                </Text>
                <Text style={styles.modalText}>
                  Phone: {selectedDealer.dealerPhoneNumber}
                </Text>
              </>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}

<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={{ alignItems: "center" }}>
                  <User height={100} width={100} style={styles.profileImage} />
                </View>
                <CustomTextInput
                  label="Username"
                  value={userName}
                  editable={false}
                />
                <CustomButton title="Logout" onPress={handleLogout} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          paddingHorizontal: 8,
        }}>
          {/* <TouchableOpacity onPress={()=>handleImageClick()}>
        <Image
          source={require('../../../assets/images/menu.png')}
          style={{width: 30, height: 23}}
        />
        </TouchableOpacity> */}
        <Image
          source={require('../../../assets/images/tvs_fit.png')}
          style={{width: 160, height: 23,left:5}}
        />
        <View style={styles.rightIconsContainer}>
          <TouchableOpacity onPress={() => onRefresh()}>
            <Image
              source={require('../../../assets/images/refresh.png')}
              style={{width: 25, height: 25, right: 24}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLogout()}>
            <Image
              source={require('../../../assets/images/logout.png')}
              style={{width: 25, height: 25}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.wrappertext}>Hi, </Text>
        <Text style={styles.wrappertext1}>{userName}</Text>
      </View>

      {/* <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ marginHorizontal: 8, marginTop: 28 }}>
        <View style={[styles.box, styles.boxColor]}>
          <Text style={styles.boxText}>1</Text>
          <Text style={styles.boxText}>Total</Text>
        </View>
        <View style={[styles.box, styles.boxColor1]}>
          <Text style={styles.boxText}>1</Text>
          <Text style={styles.boxText}>Inspection - Initiated</Text>
        </View>
        <View style={[styles.box, styles.boxColor2]}>
          <Text style={styles.boxText}>1</Text>
          <Text style={styles.boxText}>Inspection - Completed</Text>
        </View>
      </ScrollView> */}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.scrollView}>
        <CustomBox color="#ffbd52" number={orderListCount?.allOrderCount} text="Total" />
        <CustomBox color="#6ecb96" number={orderListCount?.orderCreatedCount}  text="Inspection - Initiated" />
        <CustomBox color="#4375fa" number={orderListCount?.orderCompletedCount}  text="Inspection - Completed" />
      
      </ScrollView>
      <Text style={styles.wrappertext2}>My Orders</Text>
      <View style={{flexDirection:"row",paddingHorizontal:12}}>  
      <TouchableOpacity style={styles.dateContainer} onPress={() => setOpenFromDatePicker(true)}>
        <Text>{fromDate ? fromDate.toLocaleDateString() : 'Select From Date'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.dateContainer} onPress={() => setOpenToDatePicker(true)}>
        <Text>{toDate ? toDate.toLocaleDateString() : 'Select To Date'}</Text>
      </TouchableOpacity>
       </View>  
       <DatePicker
        modal
        mode="date"
        open={openFromDatePicker}
        date={fromDate || new Date()}
        onConfirm={handleFromDateSelect}
        onCancel={() => setOpenFromDatePicker(false)}
        maximumDate={new Date()}
      />
           <DatePicker
        modal
        mode="date"
        open={openToDatePicker}
       date={toDate || new Date()}
        onConfirm={handleToDateSelect}
        onCancel={() => setOpenToDatePicker(false)}
        maximumDate={new Date()}
      />

      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {/* <FlatList
        showsVerticalScrollIndicator={false}
        style={{marginTop: 20}}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getOrderList} />
        }
      /> */}

{/* {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getOrderList} />
          }
        />

      )} */}


{loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:"white"}}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : dashboardDetails.length > 0 ? (

        <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} 
              colors={['black']}
              tintColor="black"
          />
        }
        ListEmptyComponent={
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 26,
                fontFamily: 'DMSans-Bold',
                color: 'black',
              }}>
              No Order List Available
            </Text>
            <TouchableOpacity onPress={onRefresh} style={{marginTop: 20}}>
              <Text
                style={{fontSize: 16, color: 'black', textAlign: 'center'}}>
                Refresh
              </Text>
            </TouchableOpacity>
          </View>
        }
      />

      
      
      ) : (
        // <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        //   <Text
        //     style={{fontSize: 26, fontFamily: 'DMSans-Bold', color: 'black'}}>
        //     No videos available
        //   </Text>
        // </View>
        <></>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('DealerList')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    marginTop: 25,
    marginHorizontal: 12,
    backgroundColor: 'blue',
  },
  scrollContent: {
    flexDirection: 'row',
  },
  //
  box: {
    width: 144,
    height: 89,
    marginRight: 15,
    // borderRadius: 8,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    //  justifyContent: 'center',
    // alignItems: 'center',
  },
  boxColor: {
    backgroundColor: '#ffbd52',
  },
  boxColor1: {
    backgroundColor: '#6ecb96',
  },
  boxColor2: {
    backgroundColor: '#4375fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white', // Optional: Add a background color to indicate loading
  },
  scrollView: {
    marginHorizontal: 8,
    marginTop: 28,
  },
  hyperlink: {
    fontSize: 14,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  boxText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 8,
    marginTop: 4,
  },
  wrappertext: {
    marginHorizontal: 12,
    marginTop: 25,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#AD949494',
  },
  wrappertext1: {
    marginHorizontal: 12,
    marginTop: 25,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    right: 23,
  },
  wrappertext2: {
    marginHorizontal: 12,
    marginTop: 25,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    // right:23
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f7f8f9',
    borderRadius: 8,
    marginHorizontal: 12,
    marginTop: 15,
    paddingHorizontal: 16,
   // padding: 16,
    fontSize: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:8,
    fontSize:12
   // marginBottom: 8,
  },
  vechNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    color: 'white',
    fontWeight: 'bold',
  },
  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  makeModel: {
    fontSize: 14,
    color: '#333',
    width: '50%',  // Adjust this value to cover half the width
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginTop:4,
  },
  createdBy: {
    fontSize: 12,
    color: '#666',
  },
  createdDate: {
    fontSize: 12,
    color: '#666',
    marginTop:4
  },
  dateContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    width: '50%',
    alignItems: 'center',
  },
  // name: {
  //   color: 'black',
  //   //marginTop: 2,
  //   padding: 6,
  //   borderRadius: 4,
  //   overflow: 'hidden',
  // },
  // separator: {
  //   marginVertical: 8,
  //   borderBottomColor: '#f6f7f9',
  //   borderBottomWidth: 1,
  //   flexDirection: 'row',
  //   // height:40,
  //   // backgroundColor:"black"
  // },
  // date: {
  //   color: 'black',
  //   fontSize: 14,
  //   padding: 6,
  // },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4375fa',
    borderRadius: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
    lineHeight: 30,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  //  alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },


  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4375fa',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Dashboard;
