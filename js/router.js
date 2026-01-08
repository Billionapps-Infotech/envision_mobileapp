import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import LoginPage from './component/login';
import Home from './views/home';
import ProductDetails from './component/home/product/details';
import OrderDetails from './component/home/order/details';
import NoAccess from './views/noAccess';
import DrawerContent from './component/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawer({hasNoAccess}) {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerType: 'front',
                swipeEnabled: false,
            }}
            initialRouteName={hasNoAccess ? 'NoAccess' : 'HomeStack'}
        >
            <Drawer.Screen name="HomeStack" options={{title: 'Home'}}>
                {(props) => <HomeStackNavigator {...props} />}
            </Drawer.Screen>
            <Drawer.Screen name="NoAccess" component={NoAccess} options={{title: 'No Access'}} />
        </Drawer.Navigator>
    );
}

function HomeStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen name="OrderDetails" component={OrderDetails} />
        </Stack.Navigator>
    );
}

export const navigationRef = React.createRef();

export default function NavRouter({hasToken, hasNoAccess}) {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                    initialRouteName={hasToken ? 'Main' : 'Login'}
                >
                    <Stack.Screen name="Login" component={LoginPage} />
                    <Stack.Screen name="Main">
                        {(props) => <MainDrawer {...props} hasNoAccess={hasNoAccess} />}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

export function goBack() {
    navigationRef.current?.goBack();
}

export function openDrawer() {
    navigationRef.current?.dispatch({type: 'OPEN_DRAWER'});
}

export function closeDrawer() {
    navigationRef.current?.dispatch({type: 'CLOSE_DRAWER'});
}
