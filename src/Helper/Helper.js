/**
 * Helper class providing various utility functions for the app.
 * It includes methods for handling strings, dates, sharing content, and formatting.
 */

import { Alert } from 'react-native';

export class Helper {

  // Logs messages and data in development mode
  static log = (msg, data) => {
    if (__DEV__) {
      console.log(`========${msg}======`, JSON.stringify(data));
    }
  };

  // Shows an alert message with an optional title
  static showAlertMessage = (msg, title = '') => {
    Alert.alert(title, msg);
  };

  // Converts a string to sentence case
  static getSentenceCaseString = (str) => {
    if (typeof str === 'string') {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    return str;
  };

  // Retrieves login user details and calculates profile progress
  static getLoginUserDetail = () => {
   return null;
  };

}
