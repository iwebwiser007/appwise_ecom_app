import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import { appReducer } from "./reducer";


export const Store = configureStore({
    reducer: appReducer
});

export const StoreProvider = ({
    children
}) => {
    return (
        <Provider store={Store}>
            {children}
        </Provider>
    )
}