# Envision - React Native Mobile Application (Expo)

## Overview
Envision is a React Native mobile application built with Expo SDK 52. It provides user authentication via Keycloak, product catalog browsing, order management, and related business functionality.

## Technology Stack
- **Framework**: React Native 0.76.9 with Expo SDK 52
- **State Management**: MobX 6.12
- **Navigation**: React Navigation 6.x
- **Authentication**: expo-auth-session (Keycloak OAuth2)
- **UI Components**: @expo/vector-icons, react-native-safe-area-context
- **Platforms**: iOS and Android

## Project Structure
```
/
├── js/                    # Main application code
│   ├── component/         # UI components (header, drawer, login, home, etc.)
│   ├── helper/            # Utilities, API, images, storage
│   │   ├── deviceCompat.js    # expo-device compatibility wrapper
│   │   ├── keycloakAuth.js    # Keycloak auth using expo-auth-session
│   │   ├── navigation.js      # Navigation helper (Actions wrapper)
│   │   └── iphoneXHelper.js   # Safe area compatibility wrapper
│   ├── screens/           # Screen definitions
│   ├── store/             # MobX store (MobX 6 syntax)
│   ├── views/             # View components
│   ├── App.js             # Main app component
│   └── router.js          # React Navigation configuration
├── assets/                # Fonts and icon resources
├── .native_backup/        # Backup of original android/ios folders
├── app.json               # Expo configuration
├── eas.json               # EAS Build configuration
├── babel.config.js        # Babel config with Flow support
├── metro.config.js        # Metro bundler config
├── server.js              # Info page server (for Replit display)
└── package.json           # Dependencies
```

## Building APKs with EAS Build

### Prerequisites
1. Create a free Expo account at https://expo.dev
2. Install EAS CLI: `npm install -g eas-cli`
3. Log in: `eas login`

### Build Commands

#### Development Build (for testing with development tools)
```bash
eas build --profile development --platform android
```

#### Preview APK (standalone APK for testing)
```bash
eas build --profile preview --platform android
```

#### Production AAB (for Google Play Store)
```bash
eas build --profile production --platform android
```

### Build Profiles (in eas.json)
- **development**: Development client with dev tools, for internal testing
- **preview**: Standalone APK for internal distribution/testing
- **production**: Optimized AAB for Google Play Store submission

### After Building
1. Visit https://expo.dev to download your APK/AAB
2. For preview builds, install the APK directly on Android devices
3. For production, upload the AAB to Google Play Console

## Local Development

### Start Metro Bundler
```bash
npm start
```

### Run in Expo Go (for quick testing)
```bash
npx expo start
```
Then scan QR code with Expo Go app on your phone.

## Key Migration Notes

### From React Native CLI to Expo
- Uses Expo SDK 52 (managed workflow)
- Native folders backed up to `.native_backup/`
- EAS Build for cloud-based APK/AAB generation
- No local Android Studio/Xcode required

### Compatibility Wrappers Created
1. **deviceCompat.js** - Replaces react-native-device-info with expo-device
2. **iphoneXHelper.js** - Replaces react-native-iphone-x-helper with safe-area-context
3. **keycloakAuth.js** - Replaces react-native-login-keycloak with expo-auth-session
4. **navigation.js** - Provides `Actions` wrapper for React Navigation

### MobX 6 Migration
- Store uses `makeObservable()` instead of decorators
- All `@observable` decorators removed from component code
- Observable state managed in `js/store/index.js`

### Navigation Changes
- Uses React Navigation 6 instead of react-native-router-flux
- `Actions.navigate()` wrapper available for backward compatibility
- Screen components receive `navigation` prop automatically

## Keycloak Configuration
Set these in `js/helper/keycloakAuth.js` before building:
- `KEYCLOAK_URL`: Your Keycloak server URL
- `KEYCLOAK_REALM`: Keycloak realm name
- `KEYCLOAK_CLIENT_ID`: OAuth2 client ID

## Resources
- [Expo Docs](https://docs.expo.dev/)
- [EAS Build Docs](https://docs.expo.dev/build/introduction/)
- [React Navigation Docs](https://reactnavigation.org/docs/getting-started)
- [MobX 6 Migration Guide](https://mobx.js.org/migrating-from-4-or-5.html)
