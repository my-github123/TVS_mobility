import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  BackHandler,
  TextInput,
  ToastAndroid,
  Platform,
  Image,
  Modal,
  Alert,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import call from 'react-native-phone-call';
import {apiGetWithToken, apiPostWithToken} from '../../services/apiService';
import {storeData} from '../../utils/asyncStorageUtils';
import {setItem,getItem} from '../../utils/asyncStorageUtils';

import Icon from 'react-native-vector-icons/Ionicons';
import User from '../../../assets/images/user.svg';
export default function DealerList({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const [dealerList, setDealerList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getDealerList();
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true; // Prevent default behavior (exit the app)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Remove the event listener on component unmount
  }, [navigation]);

  useEffect(() => {
    // Update filtered data when the search query or dashboard details change
    setFilteredData(
      dealerList.filter(item =>
        item.dealerName.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  }, [searchQuery, dealerList]);

  const getDealerList = async () => {
    setRefreshing(true);
    try {
      const response = await apiGetWithToken('getDealers');
      setDealerList(response.data);
      console.log(response.data, 'datra us there..');
    } catch (error) {
      console.error('GET error:', error);
    }
    setRefreshing(false);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleSearch = text => {
    const upperCaseText = text.toUpperCase();
    setSearchText(upperCaseText);
  };

  const callSearch = async () => {

    const itemId = await getItem('dealarId');
      const locationId= await getItem('locationId');

      console.log(locationId,"LOCATION ID IS THERE.....");
    if (!searchText) {
      ToastAndroid.show('Please enter vehicle number', ToastAndroid.SHORT);
      return;
    }
    try {
      const params = {
        vechicleNumber: searchText,
      };
      const data = await apiPostWithToken('getVahanData', params);

      console.log(data.data, 'data is there///');

      if (data.data.message === 'No Record Found') {
        ToastAndroid.show('No Record Found', ToastAndroid.SHORT);
        setModalVisible(false);
        setSearchText('');
      } else {
        storeData('vehicleDataList', data.data);

        // Extract the values

        const ownerDetails = {
          userName: data.data.user_name,
          userPresentAddress: data.data.user_present_address
      };
      

        const vehicleMakeModel = data.data.vehicle_make_model;
        const vehicleMakerDescription = data.data.vehicle_maker_description;
        const vehicleManufacturedDate = data.data.vehicle_manufactured_date;
        const vehicleColor = data.data.vehicle_color;
        const vehicleOwnerNumber = data.data.vehicle_owner_number;
        const cubicCapacity = data.data.vehicle_cubic_capacity;
        const vehicleSeatingCapacity = data.data.vehicle_seating_capacity;
        const rcEngineNumber = data.data.rc_engine_number;
        const rcChassisNumber = data.data.rc_chassis_number;
        const insuranceCompany = data.data.insurance.company;
        const expiryDate = data.data.insurance.expiry_date;
        const registerDate = data.data.rc_registration_date;
        const financer = data.data.financer;
        const fuelType = data.data.vehicle_fuel_description;
        const vehicleFinanced = data.data.vehicle_financed;
        const blacklist = data.data.rc_blacklist_status;
        const userName = ownerDetails.userName;
        const userPresentAddress = ownerDetails.userPresentAddress;
        

   

        const params = {
          dealerId: itemId,
          orderStatus: 1,
          locationId:locationId,
          vechNumber: searchText,
          make: vehicleMakerDescription,
          model: vehicleMakeModel,
          year: vehicleManufacturedDate,
          variant: vehicleMakeModel,
          color: vehicleColor,

          fuelType: fuelType,

          owners: vehicleOwnerNumber,
          hasHypothecated: vehicleFinanced == 'NA' ? 'No' : 'Yes',
          hypothecatedBy: vehicleFinanced,

          reRegistered: registerDate,
          cubicCapacity: cubicCapacity,
          numberOfSeats: vehicleSeatingCapacity,

          registrationDate: registerDate,

          insuranceCompany: insuranceCompany,
          insuranceValidity: expiryDate,
          blacklisted: blacklist,
          chassisNumber: rcChassisNumber,
          engineNumber: rcEngineNumber,
        };

        try {
          const dataResponse = await apiPostWithToken('createOrder', params);
          navigation.navigate('OrderCreation', {
            vehicleMakeModel,
            vehicleMakerDescription,
            vehicleManufacturedDate,
            vehicleColor,
            vehicleOwnerNumber,
            cubicCapacity,
            vehicleSeatingCapacity,
            rcEngineNumber,
            rcChassisNumber,
            insuranceCompanyName: insuranceCompany,
            expiryDate,
            registerDate,
            vechicleNumber: searchText,
            financer,
            fuelType,
            vehicleFinanced,
            blacklist,
            orderId:dataResponse.data.id,
            userName,
            userPresentAddress
          });
  
        
          console.log(params,"DATA IS GGNERE");
        } catch (error) {
          // Handle errors here
          console.error('Request failed:', error);
        } finally {
         
        }

        console.log(
          vehicleMakeModel,
          vehicleMakerDescription,
          vehicleOwnerNumber,
          cubicCapacity,
          'VEHICLE DETAILS',
        );

        // Pass the values as navigation parameters
        

        setSearchText('');
        setModalVisible(false);
      }
    } catch (error) {
      // Handle errors here
      console.error('Request failed:', error);
      ToastAndroid.show(
        'An error occurred. Please try again.',
        ToastAndroid.SHORT,
      );
    }
  };

  const handlePress = async item => {
    try {
      await setItem('dealarId', item.id.toString());
      setModalVisible(true);
    } catch (error) {
      console.error('Error saving item ID to local storage', error);
    }
  };

  const handleCall = phoneNumber => {
    const args = {
      number: phoneNumber,
      prompt: true,
    };
    call(args).catch(console.error);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
      <View style={styles.cardContent}>
        <User width={50} height={50} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.vehicleNumber}>{item.dealerName}</Text>
          <Text style={styles.date}>
            {item.dealerLocation == null ? '-' : item.dealerLocation}
          </Text>
        </View>
        {/* <TouchableOpacity
          style={styles.phoneIconContainer}
          onPress={() => handleCall(item.dealerPhoneNumber)}>
          <Image
            source={require('../../../assets/images/phone.png')}
            style={styles.phoneIcon}
          />
        </TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* <Modal
  visible={modalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setModalVisible(false)}>
  <View style={styles.modalContainer}>
    <View style={styles.searchContainer}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setModalVisible(false)}>
        <Text onPress={()=>setModalVisible(false)} style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20,marginTop:36 }}>
      <TextInput
              placeholder="Search..."
              style={[styles.searchStyle, { flex: 1 }]}
              value={searchValue}
              onChangeText={(text) => handleSearch(text)}
            />
        <TouchableOpacity style={styles.searchButton} onPress={()=>navigation.navigate("OrderCreation")}>
          <Text onPress={()=>navigation.navigate("OrderCreation")}style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal> */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 18,
                  bottom: 8,
                  //  textAlign:"left"
                }}>
                Vehicle Search
              </Text>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchStyle}
                  placeholder="Enter Vehicle No"
                  value={searchText}
                  onChangeText={text => handleSearch(text)}
                />
                <TouchableOpacity
                  style={styles.searchButton}
                  onPress={() => callSearch()}>
                  <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={[styles.profileContainer, {height: 55}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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

      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{marginTop: 5}}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getDealerList} />
        }
      />
    </View>
  );
}

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
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    padding: 0,
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1, // This will make the text container take up available space
  },
  vehicleNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  phoneIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    height: 250,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f7f8f9',
    borderRadius: 8,
    // marginHorizontal: 12,
    marginHorizontal: 16,
    marginTop: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    //marginVertical:1,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    // padding: 5,
    // height: 55,
    ...elevationStyle, // Apply elevation or shadow based on platform
  },
  phoneIcon: {
    width: 24, // Set the width of the icon
    height: 24, // Set the height of the icon
    tintColor: '#4375fa', // Set the color of the icon
    marginLeft: 16, // Adjust the spacing between the text and the icon
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    width: '100%',
    //  alignItems:"center",
    // justifyContent:"center",
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 40,
    height: 200, // Adjust this height as needed

    // height:300
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  searchStyle: {
    flex: 1,
    padding: 10,
    height: 40,
    //justifyContent:"center"
  },
  searchButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
    height: 40,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  // searchInput: {
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 8,
  //   padding: 8,
  //   flex: 1,
  // },
});
