import React from "react";
import {View, FlatList} from 'react-native';
import { Row } from "../Row";
import { AppHeading, AppText } from "../AppHeading";
import { Spacer } from "../Spacer";
import { ProductListCard } from "./ProductListCard";
import { spacer } from "../../constant/dimension";


export const HomeSectionProductList=({
    title = "New Arrival",
    list=[1,1,1,1,1,1,1]
})=>{
    return (
        <View style={{
            paddingHorizontal: spacer
        }}>
            <Row spaceBetween>
                <AppHeading
                    title={title}
                />
                <AppText
                    title={"View All"}
                />
            </Row>
            <Spacer/>
            <FlatList
                data={list}
                horizontal
                keyExtractor={(_,i)=>i.toString()}
                renderItem={()=>{
                    return (
                        <ProductListCard/>
                    )
                }}
            />
        </View>
    )
}