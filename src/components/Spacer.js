import React from "react";
import {View} from 'react-native';
import { spacer } from "../constant/dimension";


export const Spacer=({
    size = spacer
})=>{
    return (
        <View
            style={{
                width: size,
                height: size
            }}
        />
    )
}