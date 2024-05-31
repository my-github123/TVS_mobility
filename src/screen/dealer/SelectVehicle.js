import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet,Image,Platform} from 'react-native';

const SelectVehicle = ({navigation}) => {
  const vehicleList = [
    { id: 1, vehicleNumber: 'TN462403' },
    { id: 2, vehicleNumber: 'TN462420' },
    { id: 3, vehicleNumber: 'TN411403' },
    { id: 4, vehicleNumber: 'TN4EE2403' },
    { id: 5, vehicleNumber: 'TN4233403' },
    { id: 6, vehicleNumber: 'TN461103' },
  ];

  const [searchText, setSearchText] = useState('');
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const filtered = vehicleList.filter((vehicle) =>
        vehicle.vehicleNumber.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredVehicles(filtered);
    } else {
      setFilteredVehicles([]);
    }
  };
  // handleSelectVehicle(item.vehicleNumber)}

  const handleSelectVehicle = (item) => {
    setSelectedVehicle(item.vehicleNumber);
    setSearchText(item.vehicleNumber);
    setFilteredVehicles([]);
    navigation.navigate("OrderCreation")
  };

  return (
    <View style={styles.container}>
      {/* <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={handleSearch}
      /> */}
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
        value={searchText}
        onChangeText={handleSearch}
      />
      {filteredVehicles.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
          showsVerticalScrollIndicator={false}
            data={filteredVehicles}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectVehicle(item)}>
                <Text style={styles.dropdownItem}>{item.vehicleNumber}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      {selectedVehicle && (
        <Text style={styles.selectedVehicle}>Selected Vehicle: {selectedVehicle}</Text>
      )}
    </View>
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
  container: {
    flex: 1,
   // padding: 16,
    backgroundColor:"white"
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
  dropdown: {
    backgroundColor: '#f7f8f9',
    borderColor: '#ccc',
    borderWidth: 1,
    maxHeight: 150,
    marginHorizontal:12
  },
  dropdownItem: {
    padding: 8,
  
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedVehicle: {
    marginTop: 16,
    fontSize: 16,
    paddingHorizontal:14
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    // padding: 5,
    // height: 55,
    ...elevationStyle, // Apply elevation or shadow based on platform
  },
});

export default SelectVehicle;
