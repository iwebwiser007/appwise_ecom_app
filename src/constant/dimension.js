import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export const w = value => width * (value / 100);

export const h = value => height * (value / 100);

export const spacer = 15;

export const getShadow = (elevation = 2) => {
  return {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Shadow for Android
    elevation,
  };
};
