import {createStackNavigator} from '@react-navigation/stack';
import * as Screen from '../screen';
import { routeNames } from './route_name';

const Stack = createStackNavigator();

export const AuthNavigator=()=>{
    return (
        <Stack.Navigator initialRouteName={routeNames.register} screenOptions={{headerShown: false}}>
            <Stack.Screen name={routeNames.login} component={Screen.Login}/>
            <Stack.Screen name={routeNames.register} component={Screen.Register}/>
        </Stack.Navigator>
    )
}

export const HomeNavigator=()=>{
    return (
        <Stack.Navigator>
            
        </Stack.Navigator>
    )
}