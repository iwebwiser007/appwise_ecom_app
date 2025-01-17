import React, { useCallback } from "react";
import {View} from 'react-native';
import { Icons } from "../../assets/icons";
import { colors } from "../../constant/color";
import { TouchableButton } from "../TouchableButton";
import { useNavigation } from "@react-navigation/native";


export const BackButton=({
    onPress
})=>{
    const navigation = useNavigation();
    
    const onBack=useCallback(()=>{
        navigation.goBack();
    },[])

    return (
        <TouchableButton onPress={onBack} style={{
            width: 45,
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Icons.BackIcon color={colors.black}/>
        </TouchableButton>
    )
}