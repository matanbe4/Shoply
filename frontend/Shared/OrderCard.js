import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import TrafficLight from "./StyledComponents/TrafficLight";
import EasyButton from "./StyledComponents/EasyButton";
import baseURL from "../assets/common/baseUrl";

const codes = [
  { name: "pendding", code: "3" },
  { name: "shipped", code: "2" },
  { name: "delivered", code: "1" },
];

const OrderCard = (props) => {
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();

  useEffect(() => {
    if (props.editMode) {
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((err) => console.log(err));
    }

    if (props.status == "3") {
      setOrderStatus(<TrafficLight unavailable></TrafficLight>);
      setStatusText("pending");
      setCardColor("#E74C3C");
    } else if (props.status == "2") {
      setOrderStatus(<TrafficLight limited></TrafficLight>);
      setStatusText("shipped");
      setCardColor("#F1C40F");
    } else {
      setOrderStatus(<TrafficLight available></TrafficLight>);
      setStatusText("delivered");
      setCardColor("#2ECC71");
    }

    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
      setToken();
    };
  }, []);

  const updateOrder = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const order = {
      city: props.city,
      country: props.country,
      dateOrdered: props.dateOrdered,
      id: props.id,
      orderItems: props.orderItems,
      phone: props.phone,
      shippingAddress1: props.shippingAddress1,
      shippingAddress2: props.shippingAddress2,
      status: statusChange,
      totalPrice: props.totalPrice,
      user: props.user,
      zip: props.zip,
    };

    axios
      .put(`${baseURL}orders/${props.id}`, order, config)
      .then(console.log("after put"))
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 80,
            type: "success",
            text1: "Order Edited.",
            text2: "",
          });
          setTimeout(() => {
            props.navigation.navigate("Products");
          }, 100);
        }
      })
      .catch((err) =>
        Toast.show({
          topOffset: 80,
          type: "error",
          text1: "Please try again.",
          text2: "",
        })
      );
  };

  return (
    <View style={[{ backgroundColor: cardColor }, styles.container]}>
      <View style={styles.container}>
        <Text>Order Number: #{props.id}</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>
          Status: {statusText} {orderStatus}
        </Text>
        <Text>
          Address: {props.shippingAddress1} {props.shippingAddress2}
        </Text>
        <Text>City: {props.city}</Text>
        <Text>Country: {props.country}</Text>
        <Text>Date Ordered: {props.dateOrdered.split("T")[0]}</Text>
        <View style={styles.priceContainer}>
          <Text>Price: </Text>
          <Text style={styles.price}>$ {props.totalPrice}</Text>
        </View>
        {props.editMode ? (
          <View>
            <View
              style={{
                borderColor: "transparent",
                justifyContent: "center",
                alignSelf: "center",
                width: "80%",
                marginTop: 6,
              }}
            >
              <Picker
                mode="dropdown"
                iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  paddingTop: 7,
                  paddingBottom: 15,
                  paddingLeft: 20,
                  borderRadius: 40,
                  width: "80%",
                  marginBottom: 10,
                  backgroundColor: "rgba(102,102,102,0.6)",
                }}
                placeholder="Change Status"
                selectedValue={statusChange}
                placeholderStyle={{ color: "#007aff" }}
                placeholderIconColor="#007aff"
                onValueChange={(itemValue) => setStatusChange(itemValue)}
              >
                {codes.map((c) => {
                  return (
                    <Picker.Item key={c.code} label={c.name} value={c.code} />
                  );
                })}
              </Picker>
              <EasyButton secondary large onPress={() => updateOrder()}>
                <Text style={{ color: "white" }}>Update</Text>
              </EasyButton>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    backgroundColor: "#62b1f6",
    padding: 5,
  },
  priceContainer: {
    marginTop: 10,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  price: {
    color: "white",
    fontWeight: "bold",
  },
});

export default OrderCard;
