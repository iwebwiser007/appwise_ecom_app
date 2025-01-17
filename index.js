/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app';
import {name as appName} from './app.json';
import {StoreProvider} from './src/store/store';

const MyApp=()=>{
    return (
        <StoreProvider>
            <App/>
        </StoreProvider>
    )
}

AppRegistry.registerComponent(appName, () => MyApp);
