import React from "react";
import {View} from 'react-native';
import { AppText } from "../AppHeading";
import { colors } from "../../constant/color";



export const ProductBadge=({
    title = "NEW",
    backgroundColor=colors.black,
    textColor = colors.white
})=>{
    return (
        <View style={{
            padding: 5,
            borderRadius: 50,
            backgroundColor: backgroundColor,
            paddingHorizontal: 8,
        }}>
            <AppText
                title={title}
                color={textColor}
                fontWeight={"bold"}
            />
        </View>
    )
}