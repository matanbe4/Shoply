import React, { useState } from "react";
import { View, Button } from "react-native";
import {
  Container,
  Header,
  Content,
  Text,
  ListItem,
  Radio,
  Left,
  Right,
  Picker,
  Icon,
  Body,
  Title,
} from "native-base";

const methods = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Card Payment", value: 2 },
];

const paymentCards = [
  { name: "Visa", value: 1 },
  { name: "MasterCard", value: 2 },
  { name: "Other", value: 3 },
];

const Payment = (props) => {
  const order = props.route.params;

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  return (
    <Container>
      <Header>
        <Body>
          <Text>Choose your payment method</Text>
        </Body>
      </Header>
      <Content>
        {methods.map((item, index) => {
          return (
            <ListItem key={item.name} onPress={() => setSelected(item.value)}>
              <Left>
                <Text>{item.name}</Text>
              </Left>
              <Right>
                <Radio selected={selected == item.value} />
              </Right>
            </ListItem>
          );
        })}
        {selected == 2 ? (
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
              iosIcon={<Icon name={"arrow-down"} />}
              headerStyle={{ backgroundColor: "orage" }}
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
              headerBackButtonText={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={card}
              onValueChange={(x) => setCard(x)}
            >
              {paymentCards.map((c, index) => {
                return (
                  <Picker.Item key={c.name} label={c.name} value={c.name} />
                );
              })}
            </Picker>
          </View>
        ) : null}
        <View style={{ marginTop: 60, alignSelf: "center" }}>
          <Button
            title={"Confirm"}
            onPress={() => props.navigation.navigate("Confirm", { order })}
          />
        </View>
      </Content>
    </Container>
  );
};

export default Payment;
