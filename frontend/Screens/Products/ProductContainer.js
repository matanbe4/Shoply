import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import { Container, Header, Icon, Item, Input } from "native-base";
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';

import baseUrl from "../../assets/common/baseUrl";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";
import ProductList from "./ProductList";
import SearchedProducts from "./SearchedProducts";
import baseURL from "../../assets/common/baseUrl";

var { height } = Dimensions.get('window');

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect((
    useCallback(
      () => {
        setFocus(false);
    setActive(-1);

    //Products
    axios
    .get(`${baseURL}products/`)
    .then((res) => {
      setProducts(res.data);
      setProductsFiltered(res.data);
      setProductsCtg(res.data);
      setInitialState(res.data);
      setLoading(false);
    }).catch((err) => console.log("The error is1: " + err))

    axios
    .get(`${baseURL}categories/`)
    .then((res) => {
      setCategories(res.data)
    })
    .catch((err) => console.log("The error is2: " + err + baseURL))

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setCategories([]);
      setActive();
      setInitialState();
    };
      },
      []
    )
  ))
    


  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  //Categories
  const changeCategory = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category._id === ctg),
              setActive(true),
            ),
          ];
    }
  };

  return (
    <>
    {loading == false ? 
    (<Container >
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            onFocus={openList}
            onChangeText={(text) => searchProduct(text)}
          />
          {focus == true ? <Icon onPress={onBlur} name="ios-close" /> : null}
        </Item>
      </Header>
      {focus == true ? (
        <SearchedProducts 
            navigation={props.navigation} 
            productsFiltered={productsFiltered} />
      ) : (
        <ScrollView >
          <View>
            <View>
              <Banner />
            </View>
            <View>
              <CategoryFilter
                categories={categories}
                categoryFilter={changeCategory}
                productsCtg={productsCtg}
                active={active}
                setActive={setActive}
              />
            </View>
            {productsCtg.length > 0 ? (
              <View style={styles.listContainer}>
                {productsCtg.map((item) => {
                  return( <ProductList key={item._id} item={item} navigation={props.navigation}/>)
                })}
              </View>
            ) : (
              <View style={[styles.center, { height: height / 2}]}>
                <Text>No products found!</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </Container>
    ) : (
      <Container
        style={[styles.center, {backgroundColor: '#f2f2f2'}]}
      >
        <ActivityIndicator size="large" color="red"/>

      </Container>
    )}
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  }
});

export default ProductContainer;
