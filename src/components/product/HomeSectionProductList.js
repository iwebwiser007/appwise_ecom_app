import React from "react";
import {View, FlatList} from 'react-native';
import { Row } from "../Row";
import { AppHeading, AppText } from "../AppHeading";
import { Spacer } from "../Spacer";
import { ProductListCard } from "./ProductListCard";
import { spacer } from "../../constant/dimension";


export const HomeSectionProductList=({
    title = "",
    list=[]
})=>{
    return (
        <View style={{
            paddingHorizontal: spacer
        }}>
            <Row spaceBetween>
                <AppHeading
                    title={title}
                    fontSize={30}
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
                ItemSeparatorComponent={()=><Spacer/>}
                renderItem={({item})=>{
                    return (
                        <ProductListCard
                            product={item}
                        />
                    )
                }}
            />
        </View>
    )
}