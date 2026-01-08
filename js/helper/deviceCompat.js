import * as Device from 'expo-device';
import { Dimensions } from 'react-native';

const DeviceInfo = {
  isTablet: () => {
    return Device.deviceType === Device.DeviceType.TABLET;
  },
  
  isLandscape: () => {
    const { width, height } = Dimensions.get('window');
    return width > height;
  },
  
  getDeviceId: () => {
    return Device.modelId || 'unknown';
  },
  
  getModel: () => {
    return Device.modelName || 'unknown';
  },
  
  getBrand: () => {
    return Device.brand || 'unknown';
  },
  
  getSystemName: () => {
    return Device.osName || 'unknown';
  },
  
  getSystemVersion: () => {
    return Device.osVersion || 'unknown';
  },
  
  getVersion: () => {
    return '1.0.0';
  },
  
  getBuildNumber: () => {
    return '1';
  }
};

export default DeviceInfo;
