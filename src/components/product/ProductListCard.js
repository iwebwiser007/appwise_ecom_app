import React from "react";
import {View, Image, StyleSheet} from 'react-native';
import { spacer, w } from "../../constant/dimension";


export const ProductListCard=()=>{
    const imgWidth = w(40);
    return (
        <View style={styles.container}>
            <Image
                style={{
                    width: imgWidth,
                    height: imgWidth*2*.6
                }}
                source={require('../../assets/images/product.png')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        borderRadius: spacer
    }
})