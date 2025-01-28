/* eslint-disable no-unused-vars */
// This module defines various utilities for dimensions, colors, font sizes, and shadows used in a project.

import React from 'react';
import { Dimensions } from 'react-native';
import { shadows } from './Shadow';

// Get the width and height of the device screen.
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

// Function to calculate a size based on a percentage of the screen diagonal.
export const totalSize = (num) => (Math.sqrt((height * height) + (width * width)) * num) / 100;

// Function to calculate a size based on a percentage of the screen width.
export const w = (value)=> (width * (value / 100));

// Function to calculate a size based on a percentage of the screen height.
export const h = (value)=> (height * (value / 100));

// Exporting shadows from the shadow module.
export {
    shadows,
};

// Object defining colors for different alert notes.
export const alertNoteColors = {
  info: '#FB9804',
  danger: '#F4336C',
  success: '#90b10c',
};

// Object defining various color codes.
export const colors = {
    red: '#F4336C',
    black: '#343B4E',
    white: 'white',
    primary: '#F4336C',
    secondary: '#0886AE',
    primaryDark: '#CD003D',
    iconButtonBgColor: 'rgba(0,0,0,0.05)',
    primaryPer: (per = 1) => `rgba(244, 51, 108,${per})`,
    primaryBgColor: 'rgba(83, 177, 117,0.06)',
    gray: '#ACA9A9',
    darkGray: '#86889A',
    whitePer: (per = 1) => `rgba(0,0,0,${per})`,
    modelColor: 'rgba(0,0,0,0.3)',
    darkModel: 'rgba(0,0,0,0.4)',
    lightGray: '#F4F4F4',
    border: '#DCDBDB',
    placeholder: '#86889A',
    inputBg: '#FFF',
    kLightGrey: '#454545',
    dullGrey: '#9F9F9F',
    kBlack: '#000000',
    lightBlue: '#0FD2D2',
    green: 'rgba(144, 177, 12, 1)',
    appBg: '#F8F8F8',
    arrowColor: '#797777',
    commentColor: '#5C5B5D',
    inputLabelColor: '#676262',
    orange: '#FB9804',
    filter: '#B4B5C0',
    agreement: '#7133F4',
    pureBlack:'#000000',
  };

  // Object defining font sizes for different text elements.
  export const FontSize = {
    sm: 12,
    sml: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  };

// Spacer value for layout spacing.
export const spacer = 10;

