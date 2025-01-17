import React from "react";
import {View, Image} from 'react-native';
import { h, w } from "../../constant/dimension";
import { AppImage } from "../../components/AppImage";


const imageUrl = "https://media.istockphoto.com/id/1310454968/photo/two-women-window-shopping-for-dress.jpg?s=612x612&w=0&k=20&c=9pq_1CzxdHplpUi489Qg5IoMskZSIWM8R2T36uQN600="

export const Banner=()=>{
    return (
        <View>
            <AppImage
                width={w(100)}
                height={h(70)}
                url={imageUrl}
            />
        </View>
    )
}