import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView,StatusBar } from "react-native";

export default function SearchScreen({navigation}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Implement search logic here
    navigation.navigate("CustomerDetails")
    console.log("Searching for:", searchQuery);
  };

  return (
    <View style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <Text style={styles.wrapperText}>Order Creation</Text>
      <View style={styles.searchContainer}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {/* <ScrollView style={styles.resultsContainer}>
      
        <View style={styles.resultItem}>
          <Image
            style={styles.resultImage}
            source={{ uri: "https://via.placeholder.com/150" }}
          />
          <Text style={styles.resultText}>Result Item 1</Text>
        </View>
        <View style={styles.resultItem}>
          <Image
            style={styles.resultImage}
            source={{ uri: "https://via.placeholder.com/150" }}
          />
          <Text style={styles.resultText}>Result Item 2</Text>
        </View>
       
      </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
    marginTop:18
  },
  inputWrapper: {
    flex: 1,
    position: "relative",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  resultsContainer: {
    flex: 1,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  resultImage: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  resultText: {
    fontSize: 16,
  },
  wrapperText:{
    fontSize:16,
    color:"black",
    fontWeight:"bold"
    
  }
});
