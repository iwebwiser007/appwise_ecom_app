/* eslint-disable no-unused-vars */
// This module defines the action dispatcher function for dispatching actions to the Redux store.

import React from 'react';
import { Store } from '../store/Store';

// Function to dispatch actions to the Redux store
export const actionDispatcher = ({
    type,
    payload,
}) => {
    Store.dispatch({
        type,
        payload,
    });
};
