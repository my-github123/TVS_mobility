import React,{useCallback,useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TextInput,
  RefreshControl,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import CustomBox from "../../components/CustomBox";

const Dashboard = ({navigation}) => {
  const DATA = [
    {
      id: 1,
      vehicleNo: 'TN4522330',
      date: '2024-09-20',
      name: 'vignesh',
      status: 'Completed',
    },
    {
      id: 2,
      vehicleNo: 'TN4522330',
      date: '2024-09-20',
      name: 'Arun',
      status: 'Initiated',
    },
    {
      id: 3,
      vehicleNo: 'TN453430',
      date: '2024-09-20',
      name: 'Arun',
      status: 'Initiated',
    },
    {
      id: 4,
      vehicleNo: 'TN453430',
      date: '2025-04-22',
      name: 'Arvind',
      status: 'Completed',
    },
  ];

  const callingUpdated=(item)=>{
    if(item.status==="Initiated") {
      navigation.navigate("OrderCreation")
    }

  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.vehicleNo}>{item.vehicleNo}</Text>
        <Text onPress={()=>callingUpdated(item)} style={styles.status}>{item.status}</Text>
      </View>
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.separator} />
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request
    setTimeout(() => {
      // Here you can update your data or perform any action on refresh
      setRefreshing(false);
    }, 2000);
  }, []);

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
          <Image source={require("../../../assets/images/tvs_fit.png")}
            style={{ width:160, height: 23 }}
          
          />
              <View style={styles.rightIconsContainer}>

          <TouchableOpacity onPress={()=>onRefresh()}>
        <Image
          source={require('../../../assets/images/refresh.png')}
          style={{ width: 25, height: 25,right:24 }}
        />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
        <Image
          source={require('../../../assets/images/logout.png')}
          style={{ width: 25, height: 25 }}
        />
        </TouchableOpacity>
        </View>
        
      </View>
      <View style={{flexDirection:"row"}}>
      <Text style={styles.wrappertext}>Hi, </Text>
      <Text style={styles.wrappertext1}>VADIVEL</Text>
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
      style={styles.scrollView}
    >
      <CustomBox color="#ffbd52" number="7" text="Total" />
      <CustomBox color="#6ecb96" number="3" text="Inspection - Initiated" />
      <CustomBox color="#4375fa" number="4" text="Inspection - Completed" />
    </ScrollView>
      <Text style={styles.wrappertext2}>My Orders</Text>
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
  //
  box: {
    width: 144,
    height:89,
    marginRight:15,
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
  scrollView: {
    marginHorizontal: 8,
    marginTop: 28,
  },
  boxText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal:8,
    marginTop:4
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
    right:23
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
  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    borderRadius:10,
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
    marginTop:5
  },
});

export default Dashboard;
