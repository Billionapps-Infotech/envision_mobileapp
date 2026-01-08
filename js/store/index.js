import {action, observable, makeObservable} from 'mobx';

class Store {
    tokenLogin = {
        access_token: "",
        token_type: "",
        expires_in: "",
        resource: "",
        refresh_token: "",
        refresh_token_expires_in: "",
        scope: "",
        id_token: ""
    };
    hasToken = false;
    hasNoAccess = false;
    hasNoAccessMsg = "You currently have no access to Envision Mobile, please contact your company management to request access";
    product = {
        next_page: 0,
        active: 'item_num',
        activeTxt: 'Item Number',
        activeNumber: "",
        data: []
    };
    myorder = {
        next_page: 0,
        active: 'order_num',
        activeTxt: 'Order Number',
        activeNumber: "",
        data: []
    };
    orderItems = {
        next_page: 0,
        data: []
    };
    currentroute = "product";
    currentIndex = 0;

    constructor() {
        makeObservable(this, {
            tokenLogin: observable,
            hasToken: observable,
            hasNoAccess: observable,
            hasNoAccessMsg: observable,
            product: observable,
            myorder: observable,
            orderItems: observable,
            currentroute: observable,
            currentIndex: observable,
            updateRouteData: action,
            updateItemsData: action,
            updateUser: action
        });
    }

    updateRouteData = (route, data, active, activeTxtde, activeNumber) => {
        this[route] = {
            data: data.data && data.data.length ? data.data : [],
            active: active,
            activeTxt: activeTxtde,
            activeNumber: activeNumber,
            next_page: data.next_page
        };
    };

    updateItemsData = (route, data, next_page) => {
        console.log("route " + route + " data " + data.orderitems + " next_page " + next_page);
        this[route] = {
            data: data.orderitems && data.orderitems.length ? data.orderitems : [],
            next_page: next_page
        };
        console.log("store. " + (this[route].data.length));
    };

    updateUser = (user) => {
        this.tokenLogin = user;
    };

    getRouteData = (route) => {
        return this[route];
    };
}

export default new Store();
