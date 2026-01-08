# React Native Upgrade Plan: 0.58.4 → 0.76+

## Current State Assessment

### Package Versions (Current)
| Package | Current Version | Status |
|---------|----------------|--------|
| react-native | 0.58.4 | Outdated (2019) |
| react | 16.6.3 | Outdated |
| mobx | 4.3.1 | Major upgrade needed (v6) |
| mobx-react | 5.1.0 | Major upgrade needed |
| react-native-router-flux | 4.0.6 | Deprecated - migrate to React Navigation |
| react-native-navigation | 1.1.459 | Major upgrade needed |
| react-native-vector-icons | 6.2.0 | Upgrade needed |
| react-native-device-info | 2.1.2 | Upgrade needed |
| react-native-login-keycloak | 1.0.2 | Check compatibility |
| react-native-iphone-x-helper | 1.2.0 | May be deprecated |
| axios | 0.17.1 | Upgrade needed |

### Android Configuration (Current)
- Gradle: 4.7 (needs 8.x)
- Build Tools: 28.0.3 (needs 35.0.0)
- compileSdkVersion: 28 (needs 35)
- minSdkVersion: 16 (needs 24)
- targetSdkVersion: 27 (needs 35)
- Android Gradle Plugin: 3.2.1 (needs 8.x)

### iOS Configuration (Current)
- No Podfile (pre-CocoaPods era)
- Objective-C AppDelegate
- No Swift support configured

### Babel Configuration (Current)
- Uses legacy babel plugins
- metro-react-native-babel-preset: 0.51.1

---

## Upgrade Strategy: Incremental Approach

### Phase 1: Preparation (Current)
- [x] Audit current dependencies
- [x] Document current state
- [ ] Create git backup branch

### Phase 2: Upgrade to React Native 0.63
**Target:** First stable version with Fast Refresh, Flipper support

**Changes Required:**
1. Update package.json:
   - react-native: 0.63.4
   - react: 16.13.1
   - metro-react-native-babel-preset: 0.63.0

2. Add iOS Podfile (required from 0.60+)

3. Update Android:
   - Gradle: 6.2
   - Android Gradle Plugin: 4.0.1
   - compileSdkVersion: 29

4. Update babel.config.js

5. Enable autolinking (replaces react-native link)

### Phase 3: Upgrade to React Native 0.70
**Target:** Hermes becomes default JS engine

**Changes Required:**
1. Update package.json:
   - react-native: 0.70.x
   - react: 18.1.0

2. Android:
   - Gradle: 7.5.1
   - compileSdkVersion: 33
   - minSdkVersion: 21

3. Enable Hermes for both platforms

4. Update Metro configuration

### Phase 4: Upgrade to React Native 0.76+
**Target:** New Architecture, Swift AppDelegate

**Changes Required:**
1. Update package.json:
   - react-native: 0.76.x
   - react: 18.3.x

2. iOS:
   - Create Swift AppDelegate
   - Update Podfile for New Architecture
   - Minimum iOS: 15.1

3. Android:
   - Gradle: 8.x
   - compileSdkVersion: 35
   - minSdkVersion: 24
   - Enable Kotlin support

4. Enable New Architecture (bridgeless mode)

---

## Third-Party Library Migration

### Navigation (Critical Change)
**Current:** react-native-router-flux 4.0.6
**Issue:** This library is deprecated and not maintained
**Solution:** Migrate to React Navigation 6.x

Migration steps:
1. Install @react-navigation/native, @react-navigation/stack
2. Rewrite router.js using React Navigation patterns
3. Update all navigation calls in components

### State Management
**Current:** mobx 4.3.1, mobx-react 5.1.0
**Target:** mobx 6.x, mobx-react 7.x

Migration steps:
1. Update to mobx 6.x (uses makeAutoObservable instead of @observable)
2. Update decorators to use new syntax
3. Test store functionality

### Icons
**Current:** react-native-vector-icons 6.2.0
**Target:** react-native-vector-icons 10.x (or per-family packages)

### Device Info
**Current:** react-native-device-info 2.1.2
**Target:** react-native-device-info 10.x+

### iPhone X Helper
**Current:** react-native-iphone-x-helper 1.2.0
**Status:** Deprecated - use react-native-safe-area-context instead

### Keycloak
**Current:** react-native-login-keycloak 1.0.2
**Status:** Check if still maintained, may need alternative

---

## Files Requiring Changes

### JavaScript Files
- package.json - All dependencies
- babel.config.js - Babel plugins
- metro.config.js - Create new (doesn't exist)
- index.js - Create unified entry point
- App.js - Update imports

### Component Updates
- js/App.js - Device info API changes
- js/router.js - Complete rewrite for React Navigation
- js/store/index.js - MobX 6 syntax
- All components using @observer decorator

### iOS Files (Complete Rebuild)
- Create Podfile
- Update/replace AppDelegate
- Update Info.plist
- Update project.pbxproj

### Android Files
- android/build.gradle - Gradle version, SDK versions
- android/gradle-wrapper.properties - Gradle distribution
- android/app/build.gradle - All dependencies
- android/gradle.properties - New properties

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Navigation rewrite | High | Comprehensive testing of all screens |
| MobX migration | Medium | Incremental store updates |
| Native module compatibility | High | Check each library's compatibility |
| Build failures | High | Incremental upgrades with testing |
| Keycloak integration | Medium | May need alternative library |

---

## Testing Checklist

After each phase:
- [ ] iOS builds successfully (Xcode)
- [ ] Android builds successfully (Android Studio)
- [ ] App launches without crashes
- [ ] Navigation works between all screens
- [ ] Authentication flow works
- [ ] Product listing displays
- [ ] Order management works
- [ ] Device orientation changes work
- [ ] Back button behavior correct (Android)

---

## Upgrade Status: COMPLETE (Configuration Phase)

The following configuration changes have been applied:

### Completed
- [x] package.json updated with React Native 0.73.4 and all dependencies
- [x] babel.config.js updated with reanimated plugin
- [x] metro.config.js created for modern Metro
- [x] index.js unified entry point created
- [x] MobX store migrated to v6 syntax
- [x] Router rewritten for React Navigation 6 with drawer support
- [x] Android build.gradle files updated (Gradle 8.6, SDK 34)
- [x] iOS Podfile created for CocoaPods
- [x] App.js updated with modern React patterns

### Remaining Work (Component Updates)
Individual components may need updates to:
- Replace `Actions.screenName()` calls with `navigation.navigate('ScreenName')`
- Update `@observer` decorators to use `observer()` HOC from mobx-react
- Handle navigation prop in each screen component

### To Complete the Upgrade (Local Development)
1. Run `npm install` to install all dependencies
2. For iOS: `cd ios && pod install && cd ..`
3. For Android: `cd android && ./gradlew clean && cd ..`
4. Test build: `npx react-native run-ios` or `npx react-native run-android`

---

## Resources

- [Upgrade Helper Tool](https://react-native-community.github.io/upgrade-helper/)
- [React Native Releases](https://github.com/facebook/react-native/releases)
- [React Navigation Migration](https://reactnavigation.org/docs/upgrading-from-4.x)
- [MobX 6 Migration](https://mobx.js.org/migrating-from-4-or-5.html)
