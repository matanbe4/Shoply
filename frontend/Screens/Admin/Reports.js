import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

import baseURL from "../../assets/common/baseUrl";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import ProductList from "../../Screens/Products/ProductList";

const {width} = Dimensions.get('window');

const ListHeader = () => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.headerItem}></View>
      <View style={styles.headerItem}>
        <Text style={styles.text}>Brand</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={styles.text}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={styles.text}>Category</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={styles.text}>Price</Text>
      </View>
    </View>
  );
};

const Reports = () => {
  const [sales, setSales] = useState(0);
  const [numSales, setNumSales] = useState(0);
  const [productList, setProductList] = useState([]);
  const [token, setToken] = useState();
  const [choice, setChoice] = useState();

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((err) => console.log(err));

      axios.get(`${baseURL}products/`).then((res) => {
        setProductList(res.data);
      });
      return () => {
        setProductList();
      };
    }, [])
  );

  const daily = () => {
    setNumSales(2);
    setSales(240);
    setChoice('Today');
  };
  const weekly = () => {
    setNumSales(5);
    setSales(625);
    setChoice('This Week');
  };
  const monthly = () => {
    setNumSales(5);
    setSales(625);
    setChoice("This Month");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <EasyButton secondary medium onPress={() => daily()}>
          <Icon name="file" size={18} color="white" />
          <Text style={styles.buttonText}>Daily Report</Text>
        </EasyButton>
        <EasyButton secondary medium onPress={() => weekly()}>
          <Icon name="file" size={18} color="white" />
          <Text style={styles.buttonText}>Weekly Report</Text>
        </EasyButton>
        <EasyButton secondary medium onPress={() => monthly()}>
          <Icon name="file" size={18} color="white" />
          <Text style={styles.buttonText}>Monthly Report</Text>
        </EasyButton>
      </View>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Total Number of Sales: {numSales}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Total income: ${sales}
        </Text>
      </View>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{choice}'s most popular item: </Text>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "gainsboro",
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
  text: {
    fontWeight: "bold",
  },
  container: {
    marginBottom: 160,
    backgroundColor: "white",
  },
  buttonContainer: {
    margin: 20,
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonText: {
    marginLeft: 4,
    color: "white",
  },
});

export default Reports;
