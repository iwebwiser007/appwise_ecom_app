import React from "react";
import {View, ScrollView} from 'react-native';
import { AppContainer } from "../../components/AppContainer";
import { Banner } from "./Banner";
import { colors } from "../../constant/color";
import { Spacer } from "../../components/Spacer";
import { ProductListCard } from "../../components/product/ProductListCard";
import { HomeSectionProductList } from "../../components/product/HomeSectionProductList";



const Home=()=>{
    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: colors.bgColor
        }}>
            <Banner/>
            <Spacer/>
            <HomeSectionProductList/>
        </ScrollView>
    )
}


export default Home;