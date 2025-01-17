import React, { useCallback, useEffect, useState } from "react";
import {View, ScrollView} from 'react-native';
import { AppContainer } from "../../components/AppContainer";
import { Banner } from "./Banner";
import { colors } from "../../constant/color";
import { Spacer } from "../../components/Spacer";
import { ProductListCard } from "../../components/product/ProductListCard";
import { HomeSectionProductList } from "../../components/product/HomeSectionProductList";
import { HomePlaceholder } from "../../components/placeholder/HomePlaceholder";
import { getHomeDataByApi } from "../../api/api_method/HomeApi";



const Home=()=>{

    const [data,setData] = useState({
        banner: [],
        product: [],
        activity: false,
    });

    useEffect(()=>{
        getHomeData();
    },[]);

    const getHomeData=useCallback(async()=>{
        setData({...data, activity: true});
        const res = await getHomeDataByApi();
        setData({
            ...data, 
            activity: false,
            banner: res.banner
        });
    },[data]);

    if(data.activity){
        return <HomePlaceholder/>
    }
    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: colors.bgColor
        }}>
            <Banner
                list={data.banner}
            />
            <Spacer/>
            <HomeSectionProductList/>
        </ScrollView>
    )
}


export default Home;