import { navigationRef } from '../router';

export { navigationRef };

export const Actions = {
  navigate: (name, params) => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(name, params);
    }
  },
  
  pop: () => {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  },
  
  home: () => {
    if (navigationRef.isReady()) {
      navigationRef.navigate('Home');
    }
  },
  
  login: () => {
    if (navigationRef.isReady()) {
      navigationRef.navigate('Login');
    }
  },
  
  NoAccess: () => {
    if (navigationRef.isReady()) {
      navigationRef.navigate('NoAccess');
    }
  },
  
  productDetails: (params) => {
    if (navigationRef.isReady()) {
      navigationRef.navigate('ProductDetails', params);
    }
  },
  
  orderDetails: (params) => {
    if (navigationRef.isReady()) {
      navigationRef.navigate('OrderDetails', params);
    }
  },
  
  drawerOpen: () => {
    if (navigationRef.isReady()) {
      navigationRef.getParent()?.openDrawer?.();
    }
  },
  
  DrawerClose: () => {
    if (navigationRef.isReady()) {
      navigationRef.getParent()?.closeDrawer?.();
    }
  }
};

export default Actions;
