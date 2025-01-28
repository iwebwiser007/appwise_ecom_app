/* eslint-disable react-native/no-inline-styles */
// This component provides a customizable spinner/modal for loading states,
// as well as a footer activity indicator for lists in a React Native application.

import React from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';
import { colors, spacer } from '../Style/Style';
import { useSelector } from 'react-redux';
import { AppText } from './AppText';
import { Fonts } from '../Assets/Fonts';

// Main component to display a modal with a spinner based on the loading state
export const AppSpinner = () => {
    const [show, setShow] = React.useState(false); // State to control the visibility of the modal
    const loading = useSelector(state => state?.loading); // Retrieve loading state from Redux store

    // Effect to synchronize local show state with the loading state from the store
    React.useMemo(() => {
        if (loading !== show) {
            setShow(loading);
        }
    }, [loading, show]);

    // If show is false, do not render anything
    if (!show) {
        return null;
    }

    // Render the modal with a spinner
    return (
        <Modal transparent>
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.modelColor,
            }}>
                <Spinner />
            </View>

        </Modal>
    );
};

// Component for the spinner, customizable with color and size props
export const Spinner = React.memo(({
    color = colors.primary,
    size = 'large',
}) => {
    return (
        <ActivityIndicator
            size={size}
            color={color}
        />
    );
});

// Component to display a footer activity indicator for lists
export const ListFooterActivity = React.memo(({
    activity = false, // Prop to control visibility
    backgroundColor = colors.lightGray,
    title = 'Loading more posts',
    height = 40,
    fontSize = 10,
    fontFamily = Fonts.semiBold,
    color = colors.darkGray,
}) => {
    // If activity is false, do not render anything
    if (!activity) {
        return null;
    }

    // Render the footer activity indicator
    return (
        <View style={{
            padding: spacer,
            backgroundColor: backgroundColor,
            borderRadius: spacer,
            flexDirection: 'row',
            gap: spacer,
            alignItems: 'center',
            justifyContent: 'center',
            height: height,
            marginVertical: spacer,
        }}>
            <ActivityIndicator
                color={color}
                size="small"
            />
            <AppText
                title={title}
                fontSize={fontSize}
                fontFamily={fontFamily}
                color={color}
            />
        </View>
    );
});


