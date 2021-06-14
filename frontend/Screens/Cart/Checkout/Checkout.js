import React, {useState, useEffect, useContext} from 'react';
import { Text, View, Button } from 'react-native';
import { Item, Picker } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import Toast from "react-native-toast-message";

import FormContainer from "../../../Shared/Form/FormContainer";
import Input from "../../../Shared/Form/Input"
import AuthGlobal from "../../../Context/store/AuthGlobal";

const countries = require("../../../assets/countries.json");

const Checkout = (props) => {
    const context = useContext(AuthGlobal);

    const [orderItems, setOrderItems] = useState();
    const [address, setAddress] = useState();
    const [address2, setAddress2] = useState();
    const [city, setCity] = useState();
    const [zip, setZip] = useState();
    const [country, setCountry] = useState();
    const [phone, setPhone] = useState();
    const [user, setUser ] = useState();

    useEffect(()=>{
        setOrderItems(props.cartItems)
        
        if(context.stateUser.isAuthenticated) {
            setUser(context.stateUser.user.id);
        } else {
            props.navigation.navigate("Cart");
            Toast.show({
                topOffset: 80,
                type: "error",
                text1: "Please Login to Checkout!",
                text2: ""
            });
        }
        return () => {
            setOrderItems();
        }
    },[])

    const checkOut = () => {
        let order = {
            city,
            country,
            dateOrdered: Date.now(),
            orderItems,
            phone,
            shippingAddress1: address,
            shippingAddress2: address2,
            status: "3",
            user,
            zip,
        }
        props.navigation.navigate("Payment",{order: order})
    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={10}
            enableOnAndroid={true}
        >
            <FormContainer title={"Shipping Address"}>
                <Input
                    placeholder={"Phone"}
                    name={"phone"}
                    value={phone}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />
                <Input
                    placeholder={"Shipping Address 1"}
                    name={"ShippingAddress1"}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />
                <Input
                    placeholder={"Shipping Address 2"}
                    name={"ShippingAddress2"}
                    value={address2}
                    onChangeText={(text) => setAddress2(text)}
                />
                <Input
                    placeholder={"City"}
                    name={"city"}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />
                <Input
                    placeholder={"zip"}
                    name={"zip"}
                    value={zip}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setZip(text)}
                />
                <View
                    style={{
                        borderColor: "transparent",
                        justifyContent: "center",
                        alignSelf: "center",
                        width: "80%",
                        marginTop: 6,
                        flexDirection: "row"
                  }}
                >
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" color={"#007aff" } />}
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
                        selectedValue={country}
                        placeholder="Select your country."
                        placeholderStyle={{color: '007aff'}}
                        placeholderIconColor={{color: '007aff'}}
                        onValueChange={(e) => setCountry(e)}
                    >
                        {countries.map((c) => {
                            return <Picker.Item 
                                key={c.code} 
                                label={c.name}
                                value={c.name}
                                />
                        })}
                    </Picker>
                </View>
                <View style={{width: '80%', alignItems: 'center'}}>
                    <Button title="Confirm" onPress={() => checkOut() }/>
                </View>
            </FormContainer>
        </KeyboardAwareScrollView>
    )
}

const mapStateToProps = (state) => {
    const {cartItems} = state;
    return {
        cartItems: cartItems,
    }
}
export default connect(mapStateToProps)(Checkout);