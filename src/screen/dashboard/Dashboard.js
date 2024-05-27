import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const Dashboard = ({navigation}) => {
  const DATA = [
    {
      id: 1,
      vehicleNo: 'TN4522330',
      date: '2024-09-20',
      name: 'vignesh',
      status: 'submitted',
    },
    {
      id: 2,
      vehicleNo: 'TN4522330',
      date: '2024-09-20',
      name: 'Arun',
      status: 'Update',
    },
    {
      id: 3,
      vehicleNo: 'TN453430',
      date: '2024-09-20',
      name: 'Arun',
      status: 'Update',
    },
    {
      id: 4,
      vehicleNo: 'TN453430',
      date: '2025-04-22',
      name: 'Arvind',
      status: 'Submitted',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.vehicleNo}>{item.vehicleNo}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.separator} />
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.topContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          paddingHorizontal: 8,
        }}>
        <Image
          source={require('../../../assets/images/menu.png')}
          style={{ width: 30, height: 23 }}
        />
        <Image
          source={require('../../../assets/images/notification.png')}
          style={{ width: 25, height: 25 }}
        />
      </View>
      <Text style={styles.wrappertext}>Hi, VENOR_ORD_CRE</Text>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ marginHorizontal: 8, marginTop: 28 }}>
        <View style={[styles.box, styles.boxColor]}>
          <Text style={styles.boxText}>1</Text>
          <Text style={styles.boxText}>Total</Text>
        </View>
        <View style={[styles.box, styles.boxColor1]}>
          <Text style={styles.boxText}>1</Text>
          <Text style={styles.boxText}>Submitted</Text>
        </View>
        <View style={[styles.box, styles.boxColor2]}>
          <Text style={styles.boxText}>1</Text>
          <Text style={styles.boxText}>Inserting</Text>
        </View>
      </ScrollView>
      <Text style={styles.wrappertext}>My Orders</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        placeholderTextColor="#888"
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 20 }}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={styles.addButton} onPress={()=>navigation.navigate("DealerList")}>
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
  box: {
    width: 150,
    height: 100,
    marginRight: 8,
    borderRadius: 8,
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
  boxText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingHorizontal:8,
    marginTop:4
  },
  wrappertext: {
    marginHorizontal: 12,
    marginTop: 25,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
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
  card: {
    backgroundColor: 'white',
    borderColor: '#f9f9f9',
    borderWidth: 1,
    borderRadius: 8,
    margin: 15,
    padding: 10,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleNo: {
    color: 'black',
    fontWeight: 'bold',
    marginTop: 2,
    padding: 5,
    borderRadius: 4,
    overflow: 'hidden',
  },
  status: {
    color: '#f8dd8e',
    backgroundColor: '#f6f7f9',
    borderColor: '#f8d66e',
    borderWidth: 1,
    padding: 5,
    borderRadius: 8,
  },
  name: {
    color: 'black',
    marginTop: 2,
    padding: 6,
    borderRadius: 4,
    overflow: 'hidden',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#f6f7f9',
    borderBottomWidth: 1,
  },
  date: {
    color: 'black',
    fontSize: 14,
    padding: 6,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4375fa',
    borderRadius: 25,
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
  },
});

export default Dashboard;
