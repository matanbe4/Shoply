import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {Content, Left, Body, ListItem, Thumbnail, Text, Item} from 'native-base'

var {width} = Dimensions.get("window");

const SearchedProducts = (props) => {
    const {productsFiltered} = props;

    return (
        <Content style={{width: width}}>
            {productsFiltered.length > 0 ? (
                productsFiltered.map((item) => (
                    <ListItem
                        onPress={() => {
                            props.navigation.navigate("Product Details", { item: item});
                        }}
                        key={item._id.$oid}
                        avatar

                    >
                        <Left>
                            <Thumbnail 
                                source={{uri: item.image ? item.image : "https://pngimg.com/uploads/box/box_PNG36.png"}}
                            />
                        </Left>
                        <Body>
                            <Text>{item.name}</Text>   
                            <Text note>{item.description}</Text>   
                        </Body>
                    </ListItem> 
                ))
            ) : 
                    <View style={styles.center}>
                        <Text style={{alignSelf: 'center'}}>
                            No products match the selected criteria.
                        </Text>
                    </View>}
        </Content>
    )

}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default SearchedProducts;