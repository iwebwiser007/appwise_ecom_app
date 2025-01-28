/* eslint-disable react/react-in-jsx-scope */
/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { StoreProvider } from './src/Storage/store/Store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

//App starts here
const MyApp = () => {
    return (
        <SafeAreaProvider>
            <StoreProvider>
                <App />
            </StoreProvider>
        </SafeAreaProvider>
    );
};

// Register the main application component
AppRegistry.registerComponent(appName, () => MyApp);


























// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
