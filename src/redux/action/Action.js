import {LOGIN, SIGNOUT,ADD_TO_CART,UPDATE_QUANTITY } from '../constance/Constance';

export const login = data => ({
  type: LOGIN,
  payload: {
    email: data.mobile,
    userId:data.userId
   },
});
export const signout = data => ({
  type: SIGNOUT,
  payload: {},
});

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const updateQuantity = (productId, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: {
    productId,
    quantity,
  },
});
 
