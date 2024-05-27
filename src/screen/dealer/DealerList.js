import React from 'react';
import {View, Text, StyleSheet, StatusBar, FlatList,TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export default function DealerList({navigation}) {
  const Data = [
    {id: 1, name: 'Vignesh', location: 'Chennai'},
    {id: 2, name: 'Madan kumar', location: 'Chennai'},
    {id: 3, name: 'Arun', location: 'coimbatore'},
  ];

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <TouchableOpacity onPress={()=>navigation.navigate("SelectVehicle")}> 
          <Text style={styles.vehicleNumber}>{item.name}</Text>
          <Text style={styles.date}>{item.location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    
        
        <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        placeholderTextColor="#888"
      />
      
      <FlatList
      style={{marginTop:20}}
        data={Data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
       // contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    padding: 0,
    marginTop: 20,
  },
  card: {
    backgroundColor: 'white',
    borderColor: '#f9f9f9',
    borderWidth: 1,
    borderRadius: 8,
    margin: 15,
    padding: 10,
    elevation: 1,
  },
  vehicleNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 25,
    paddingHorizontal: 10,
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
});
