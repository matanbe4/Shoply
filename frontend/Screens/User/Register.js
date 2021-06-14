import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import baseURL from "../../assets/common/baseUrl";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import Toast from "react-native-toast-message";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    if (email === "" || name === "" || phone === "" || password === "") {
      setError("Please fill in the form correctly!");
      Toast.show({
        topOffset: 80,
        type: "error",
        text1: "Something went wrong",
        text2: "Please try again.",
      });
    } else {
      let user = {
        name: name,
        email: email,
        password: password,
        phone: phone,
        isAdmin: false,
      };

      axios
        .post(`${baseURL}users/register`, user)
        .then((res) => {
          if (res.status == 201) {
            Toast.show({
              topOffset: 80,
              type: "success",
              text1: "Registeration Succeeded",
              text2: "Please login into your account",
            });
            setTimeout(() => {
              props.navigation.navigate("Login");
            }, 500);
          }
        })
        .catch((err) => {
          Toast.show({
            topOffset: 80,
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again.",
          });
        });
    }
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Register"}>
        <Input
          placeholder={"Email"}
          name={"email"}
          id={"email"}
          onChangeText={(text) => setEmail(text.toLowerCase())}
          value={email}
        />
        <Input
          placeholder={"Password"}
          name={"password"}
          id={"password"}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
        <Input
          placeholder={"Name"}
          name={"name"}
          id={"name"}
          onChangeText={(text) => setName(text.toLowerCase())}
          value={name}
        />
        <Input
          placeholder={"Phone"}
          name={"phone"}
          id={"phone"}
          onChangeText={(text) => setPhone(text)}
          value={phone}
          keyboardType={"numeric"}
        />
        <View>{error ? <Error message={error} /> : null}</View>
        <View style={styles.buttonGroup}>
          <EasyButton 
            large
            primary
            onPress={() => register()} 
          >
            <Text style={{color: "white"}}>Register</Text>
          </EasyButton>
        </View>
        <View>
          <EasyButton
            large
            secondary
            onPress={() => props.navigation.navigate("Login")}
          >
            <Text style={{color: "white"}}>Back to Login</Text>
          </EasyButton>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    margin: 10,
    alignItems: "center",
  },
});

export default Register;
