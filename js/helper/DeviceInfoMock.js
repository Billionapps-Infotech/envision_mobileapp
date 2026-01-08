// Mock implementation of react-native-device-info
// This replaces the native module to avoid compilation issues

import { Dimensions, Platform } from 'react-native';

const DeviceInfoMock = {
  // Check if device is in landscape
  isLandscape: async () => {
    const { width, height } = Dimensions.get('window');
    return width > height;
  },

  // Check if device is a tablet
  isTablet: () => {
    const { width, height } = Dimensions.get('window');
    const minDimension = Math.min(width, height);
    return minDimension >= 600; // Tablets are typically 600dp or larger
  },

  // Get device brand
  getBrand: () => {
    return Platform.OS === 'ios' ? 'Apple' : 'Unknown';
  },

  // Get device model
  getModel: () => {
    return 'Unknown';
  },

  // Get system name
  getSystemName: () => {
    return Platform.OS === 'ios' ? 'iOS' : 'Android';
  },

  // Get system version
  getSystemVersion: () => {
    return 'Unknown';
  },

  // Get device name
  getDeviceName: () => {
    return 'Device';
  },

  // Get device locale
  getDeviceLocale: () => {
    return 'en-US';
  },

  // Get device country
  getDeviceCountry: () => {
    return 'US';
  },

  // Get unique ID
  getUniqueId: () => {
    return 'unknown';
  },

  // Check if running on physical device
  isDevice: () => {
    return true;
  },
};

export default DeviceInfoMock;
