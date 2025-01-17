import {Dimensions} from 'react-native';

const { width, height}  = Dimensions.get('screen');

export const w = (value) => (width * (value / 100));

export const h = (value) => (height * (value / 100));

export const spacer = 15;