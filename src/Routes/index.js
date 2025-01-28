/* eslint-disable no-unused-vars */
import React from 'react';
import * as Screen from '../Screens';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { AppStatusTypes } from '../Storage/Types';
import { AuthNavigator, HomeNavigator } from './Navigator';
import { navigationRef } from './RootNavigator';
import { AppActionSheet } from '../Screen/ActionSheet';
import NetInfo from '@react-native-community/netinfo';

// AppRoute component handles routing based on app status and network connection.
// It renders different screens or navigators depending on the network status and app state.

export const AppRoute = () => {
    // Get app status and action sheet visibility from the Redux store
    const appStatus = useSelector((state) => state?.appStatus);
    const hideActionSheet = useSelector((state) => state?.hideActionSheet);

    const [isNetworkConnected, setNetwork] = React.useState(true);

    // Listener for network connection changes
    React.useEffect(()=>{
       const l1 = NetInfo.addEventListener((state)=>{
            setNetwork(state.isConnected ? state.isConnected : false);
        });

        return ()=>{

        };
    },[]);

    // Function to render the appropriate navigator or screen based on the app status and network connectivity
    const renderNavigator = () => {
        if(!isNetworkConnected){
            return <Screen.NoInternet/>;
        }
        if (appStatus === AppStatusTypes.splash) {
            return <Screen.Splash />;
        }
        if (appStatus === AppStatusTypes.market) {
            return <AuthNavigator />;
        }
        return (
            <>
                <HomeNavigator />
            </>
        );
    };

    return (
        // Wraps the navigator in a NavigationContainer with a reference
        <NavigationContainer ref={navigationRef}>
            {renderNavigator()}
            {!hideActionSheet && <AppActionSheet/>}
        </NavigationContainer>
    );
};
