# Envision - React Native Mobile Application

## Overview
Envision is a React Native mobile application designed for iOS and Android platforms. It provides user authentication, product catalog browsing, order management, and related business functionality.

**Important**: This is a native mobile application that cannot run directly in Replit's web preview. It requires native iOS/Android development toolchains to build and run.

## Recent Changes (React Native Upgrade)

### Upgraded Dependencies
- **React Native**: 0.58.4 → 0.73.4
- **React**: 16.6.3 → 18.2.0
- **MobX**: 4.x → 6.12.0 (uses makeObservable instead of decorators)
- **Navigation**: react-native-router-flux → React Navigation 6.x
- **Vector Icons**: 6.x → 10.x
- **Device Info**: 2.x → 10.x
- **Axios**: 0.17 → 1.6.7

### Breaking Changes Applied
1. **MobX 6 Migration**: Store now uses `makeObservable()` instead of decorator syntax
2. **React Navigation 6**: Router completely rewritten using `@react-navigation/native-stack`
3. **Unified Entry Point**: Single `index.js` replaces `index.android.js` and `index.ios.js`
4. **Modern Metro Config**: New `metro.config.js` using `@react-native/metro-config`
5. **Android Updates**:
   - Gradle 8.6
   - compileSdkVersion 34
   - minSdkVersion 23
   - Hermes engine enabled
   - AndroidX support
6. **iOS Updates**:
   - CocoaPods integration (new Podfile)
   - Hermes engine enabled
   - Minimum iOS version updated

## Technology Stack
- **Framework**: React Native 0.73.4
- **State Management**: MobX 6.12
- **Navigation**: React Navigation 6.x
- **UI Components**: React Native Vector Icons, Safe Area Context
- **Platforms**: iOS and Android

## Project Structure
```
/
├── js/                    # Main application code
│   ├── component/         # UI components (header, drawer, login, home, etc.)
│   ├── helper/            # Utilities, API, images, storage
│   ├── screens/           # Screen definitions
│   ├── store/             # MobX store (updated for v6)
│   ├── views/             # View components
│   ├── App.js             # Main app component (updated)
│   └── router.js          # React Navigation configuration (rewritten)
├── android/               # Android native project (updated configs)
├── ios/                   # iOS native project (with new Podfile)
├── assets/                # Fonts and resources
├── index.js               # Unified entry point (new)
├── metro.config.js        # Metro bundler config (new)
├── babel.config.js        # Babel config (updated)
├── server.js              # Info page server (for Replit display)
├── UPGRADE_PLAN.md        # Detailed upgrade documentation
└── package.json           # Updated dependencies
```

## Development Requirements
To develop and run this app locally, you need:

### For iOS Development
- macOS with Xcode 15+ installed
- iOS Simulator or physical device (iOS 13.4+)
- CocoaPods for dependency management

```bash
cd ios && pod install && cd ..
```

### For Android Development
- Android Studio with Android SDK
- Android Emulator or physical device (API 23+)
- JDK 17+

### React Native CLI Commands
```bash
# Install dependencies
npm install

# Install iOS pods
cd ios && pod install && cd ..

# Run on iOS (macOS only)
npx react-native run-ios

# Run on Android
npx react-native run-android

# Start Metro bundler
npm start

# Clean and rebuild
cd android && ./gradlew clean && cd ..
```

## Migration Notes

### Navigation Changes
The app now uses React Navigation instead of react-native-router-flux. Key differences:
- Use `navigation.navigate('ScreenName')` instead of `Actions.ScreenName()`
- Screen components receive `navigation` prop automatically
- Stack navigator handles screen transitions

### MobX Store Changes
The store uses the new MobX 6 API:
- `makeObservable()` in constructor defines observables and actions
- No more decorator syntax (@observable, @action)
- Class arrow functions for actions

### Removed Dependencies
- react-native-router-flux (replaced by React Navigation)
- react-native-iphone-x-helper (replaced by react-native-safe-area-context)
- react-native-navigation (no longer needed)
- Legacy babel plugins

## Current State
- Core configuration files updated for React Native 0.73
- MobX store migrated to v6 syntax
- Navigation rewritten for React Navigation 6
- Android build configuration updated
- iOS Podfile created for CocoaPods
- Full app testing requires local native build environment

## Known Issues
- Some component files may need updates for React Navigation prop changes
- Keycloak authentication library may need replacement (check compatibility)
- Full testing requires Xcode/Android Studio environment

## Resources
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [React Navigation Docs](https://reactnavigation.org/docs/getting-started)
- [MobX 6 Migration Guide](https://mobx.js.org/migrating-from-4-or-5.html)
- [Upgrade Helper](https://react-native-community.github.io/upgrade-helper/)
