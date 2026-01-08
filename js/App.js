import React, {Component} from 'react';
import Router from './router';
import {
    StatusBar,
    View,
    ActivityIndicator,
    StyleSheet,
    BackHandler,
    Alert,
    Dimensions
} from 'react-native';
import {globalColors, setToken, saveKey, getKey} from './helper';
import DeviceInfo from './helper/deviceCompat';
import store from './store';
import stylecust from './component/helper/resfont';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasToken: false,
            hasNoAccess: false,
            isLoaded: true,
            isLandscape: false,
            isTablet: false,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            backhardware: false
        };
        this.backhardware = false;
        this.handleBackButton = this.handleBackButton.bind(this);
    }

    componentDidMount() {
        this.dimensionSubscription = Dimensions.addEventListener('change', this.handleDimensionChange);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        this.loadDeviceInfo();
        this.loadData();
    }

    componentWillUnmount() {
        if (this.dimensionSubscription) {
            this.dimensionSubscription.remove();
        }
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleDimensionChange = () => {
        this.setState({
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
        });
        this.loadDeviceInfo();
    };

    loadDeviceInfo = async () => {
        try {
            const isLandscape = DeviceInfo.isLandscape();
            const isTablet = DeviceInfo.isTablet();
            this.setState({isLandscape, isTablet});
        } catch (e) {
            console.log('Error loading device info:', e);
        }
    };

    handleBackButton = () => {
        if (this.backhardware) {
            Alert.alert(
                'Exit',
                'Exiting the application?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => {
                            this.backhardware = false;
                            return true;
                        },
                        style: 'cancel'
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                            BackHandler.exitApp();
                            this.backhardware = false;
                            return false;
                        }
                    }
                ],
                {cancelable: false}
            );
            return true;
        } else {
            this.backhardware = true;
            return true;
        }
    };

    loadData = async () => {
        this.setState({isLoaded: true});
        try {
            const userString = await getKey('isLogged');
            const user = userString ? JSON.parse(userString) : null;
            const loginDataString = await getKey('loginData');
            const loginData = loginDataString ? JSON.parse(loginDataString) : null;

            if (user && loginData) {
                setToken(user);
                store.updateUser(loginData);
                store.hasNoAccess = loginData.isAccess ? false : true;
                store.hasNoAccessMsg = loginData.isAccessMsg
                    ? loginData.isAccessMsg
                    : "You currently have no access to Envision Mobile, please contact your company management to request access";
                this.setState({
                    isLoaded: false,
                    hasToken: true,
                    hasNoAccess: loginData.isAccess ? false : true
                });
            } else {
                store.hasNoAccess = false;
                store.hasNoAccessMsg = "You currently have no access to Envision Mobile, please contact your company management to request access";
                this.setState({hasToken: false, isLoaded: false, hasNoAccess: false});
            }
        } catch (e) {
            console.log('Error loading data:', e);
            this.setState({isLoaded: false});
        }
    };

    render() {
        if (this.state.isLoaded) {
            return (
                <View style={styles.loaderContainer}>
                    <StatusBar barStyle="dark-content" />
                    <ActivityIndicator
                        animating={true}
                        size="large"
                        color="#000000"
                        style={styles.loader}
                    />
                </View>
            );
        } else {
            return (
                <>
                    <StatusBar barStyle="dark-content" />
                    <Router
                        randmId={Math.random()}
                        hasToken={this.state.hasToken}
                        hasNoAccess={this.state.hasNoAccess}
                    />
                </>
            );
        }
    }
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    loader: {},
    backgroundImage: {
        backgroundColor: 'transparent',
        overflow: 'hidden',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: stylecust.em(1),
        fontFamily: 'Roboto-Regular',
        fontWeight: 'normal'
    },
    btn: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: globalColors.headerBck
    },
    txtBtn: {
        fontSize: stylecust.em(1),
        fontFamily: 'Roboto-Regular',
        fontWeight: 'normal'
    }
});
