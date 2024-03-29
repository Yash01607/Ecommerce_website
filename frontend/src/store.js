import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Cookies from "js-cookie";
import {
  productListReducer,
  reviewCreateReducer,
  productDetailsReducer,
  productDeleteReducer,
  productSavesReducer,
} from "./reducers/productReducer";
import CartReducers from "./reducers/CartReducers";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSignInReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDetailReducer,
  orderListReducer,
  orderMineListReducer,
  orderDeliverReducer,
  orderPayReducer,
  orderPackReducer,
  orderDispatchReducer,
  orderSummaryReducer,
} from "./reducers/orderReducers";
import {
  categoryDeleteReducer,
  categoryListsReducer,
  categorySavesReducer,
} from "./reducers/CategoryReducers";

let cartItems = [];
if (Cookies.get("cartItems")) {
  cartItems = JSON.parse(Cookies.get("cartItems"));
}
let userInfo = null;
if (Cookies.get("userInfo")) {
  userInfo = JSON.parse(Cookies.get("userInfo"));
}
let shippingAddress = {};
if (Cookies.get("shippingAddress")) {
  shippingAddress = JSON.parse(Cookies.get("shippingAddress"));
}

const initialState = {
  cartDetails: {
    cartItems: cartItems,
    shippingAddress: shippingAddress,
    paymentMethod: {},
  },
  userSignIn: { userInfo: userInfo },
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cartDetails: CartReducers,
  userSignIn: userSignInReducer,
  userRegister: userRegisterReducer,
  productSave: productSavesReducer,
  productDelete: productDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  orderPack: orderPackReducer,
  orderDispatch: orderDispatchReducer,
  orderPay: orderPayReducer,
  orderSummary: orderSummaryReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  categoryList: categoryListsReducer,
  categorySave: categorySavesReducer,
  categoryDelete: categoryDeleteReducer,
  productReviewCreate: reviewCreateReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
