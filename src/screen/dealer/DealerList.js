import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TextInput,
  Platform,
  Image,
  Modal,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import User from '../../../assets/images/user.svg';
export default function DealerList({navigation}) {
  const Data = [
    {id: 1, name: 'Vignesh', location: 'Chennai'},
    {id: 2, name: 'Madan kumar', location: 'Chennai'},
    {id: 3, name: 'Arun', location: 'coimbatore'},
  ];

  const [modalVisible, setModalVisible] = useState(false);

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (text) => {
    setSearchValue(text.toUpperCase());
    // Handle search logic here
    console.log('Search value:', searchValue.toUpperCase());
  };

  const callSearch=()=>{
    navigation.navigate("OrderCreation");
    setModalVisible(false)
  }

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.card} onPress={() => setModalVisible(true)}>
    <View style={styles.cardContent}>
      <User width={50} height={50} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.vehicleNumber}>{item.name}</Text>
        <Text style={styles.date}>{item.location}</Text>
      </View>
      <View style={styles.phoneIconContainer}>
        <Image
          source={require('../../../assets/images/phone.png')}
          style={styles.phoneIcon}
        />
      </View>
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
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={{color:"black",fontWeight:"bold",fontSize:18,bottom:8}}>Vehicle Search</Text>
              <View style={styles.searchContainer}>
                
                <TextInput
                  style={styles.searchStyle}
                  placeholder="Enter Vehicle No"
                  onChangeText={(text) => console.log(text)}
                />
                <TouchableOpacity style={styles.searchButton} onPress={() => callSearch()}>
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
      />

      <FlatList
        style={{marginTop: 5}}
        data={Data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        // contentContainerStyle={styles.list}
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
    height:250,
    marginTop:5
  },
  
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f7f8f9',
    borderRadius: 8,
    marginHorizontal: 12,
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
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
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
