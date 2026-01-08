# Envision - React Native Mobile Application

## Overview
Envision is a React Native mobile application designed for iOS and Android platforms. It provides user authentication, product catalog browsing, order management, and related business functionality.

**Important**: This is a native mobile application that cannot run directly in Replit's web preview. It requires native iOS/Android development toolchains to build and run.

## Technology Stack
- **Framework**: React Native 0.58.4
- **State Management**: MobX
- **Navigation**: React Native Router Flux
- **Authentication**: Keycloak (react-native-login-keycloak)
- **UI Components**: React Native Vector Icons, Material Dialogs
- **Platforms**: iOS and Android

## Project Structure
```
/
├── js/                    # Main application code
│   ├── component/         # UI components (header, drawer, login, home, etc.)
│   ├── helper/            # Utilities, API, images, storage
│   ├── screens/           # Screen definitions
│   ├── store/             # MobX store
│   ├── views/             # View components
│   ├── App.js             # Main app component
│   └── router.js          # Navigation configuration
├── android/               # Android native project
├── ios/                   # iOS native project
├── assets/                # Fonts and resources
├── __tests__/             # Jest tests
├── server.js              # Info page server (for Replit display)
└── package.json           # Node.js dependencies
```

## Development Requirements
To develop and run this app locally, you need:

### For iOS Development
- macOS with Xcode installed
- iOS Simulator or physical device
- CocoaPods for dependency management

### For Android Development
- Android Studio with Android SDK
- Android Emulator or physical device
- JDK 8+

### React Native CLI Commands
```bash
# Install dependencies
npm install

# Run on iOS (macOS only)
npx react-native run-ios

# Run on Android
npx react-native run-android

# Start Metro bundler
npm start
```

## Current State
- The project is configured with its original React Native setup
- A simple info server (server.js) runs on port 5000 to display project information in Replit
- Full mobile app development requires local setup with native toolchains

## Notes
- The app uses Keycloak for authentication
- Device-specific features (DeviceInfo, BackHandler) are used
- Custom fonts (Roboto, Lato) are bundled for both platforms
