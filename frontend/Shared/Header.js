import React from 'react';
import { StyleSheet, SafeAreaView, Image} from 'react-native';

const Header = () => {

    return(
        <SafeAreaView style={styles.header}>
            <Image 
                source={require("../assets/logo.png")}
                resizeMode="cover"
                style={{ height: 56}}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        padding: 20,
    }
})

export default Header;