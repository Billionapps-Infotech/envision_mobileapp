import { Platform, Dimensions, StatusBar } from 'react-native';

const { height, width } = Dimensions.get('window');

export function isIphoneX() {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (height === 812 || width === 812 || height === 896 || width === 896 ||
     height >= 844 || width >= 844)
  );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function getStatusBarHeight(safe = true) {
  return Platform.select({
    ios: isIphoneX() ? (safe ? 44 : 30) : 20,
    android: StatusBar.currentHeight || 0,
    default: 0
  });
}

export function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}
