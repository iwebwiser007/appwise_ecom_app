import {createStackNavigator} from '@react-navigation/stack';
import * as Screen from '../screen';
import { routeNames } from './route_name';
import { BottomTabNavigator } from './bottom_navigator';

const Stack = createStackNavigator();

export const AuthNavigator=()=>{
    return (
        <Stack.Navigator initialRouteName={routeNames.register} screenOptions={{headerShown: false}}>
            <Stack.Screen name={routeNames.login} component={Screen.Login}/>
            <Stack.Screen name={routeNames.register} component={Screen.Register}/>
            <Stack.Screen name={routeNames.forgetPassword} component={Screen.ForgetPassword}/>
        </Stack.Navigator>
    )
}

export const HomeNavigator=()=>{
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={"BottomTabNavigator"} component={BottomTabNavigator}/>
        </Stack.Navigator>
    )
}