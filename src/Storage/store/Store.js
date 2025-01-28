/* eslint-disable react/react-in-jsx-scope */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import homeReducer from '../Reducer/HomeSlice';
import categoryReducer from '../Reducer/CategorySlice';
import { Reducer as customReducer } from '../Reducer/Reducer';
import { Provider } from 'react-redux';
// import categoryDetailReducer from './../Reducer/CategoryDetailSlice';

// Combine reducers to manage different parts of the state
const rootReducer = combineReducers({
  home: homeReducer,
  category: categoryReducer,
  // categoryDetail: categoryDetailReducer,
  custom: customReducer,
});

// Create and configure the Redux store
export const Store = configureStore({
  reducer: rootReducer,
});

// Redux Provider component
export const StoreProvider = ({ children }) => {
  return <Provider store={Store}>{children}</Provider>;
};

export default Store;
