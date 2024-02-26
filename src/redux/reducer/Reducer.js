import {
  LOGIN,
  SIGNOUT,
  ADD_TO_CART,UPDATE_QUANTITY
   
} from '../constance/Constance';

const initialState = {
  mobile: '',
  isLoggedIn: false,
  cart: [],
userId:'',
 };

export const credotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        mobile: action.payload.email,
        userId: action.payload.email,

        isLoggedIn: true,
      };
    case SIGNOUT:
      return {
        ...state,
        email: '',
        isLoggedIn: false,
      };

      case ADD_TO_CART:
        // Check if the product is already in the cart
        const existingProductIndex = state.cart.findIndex(item => item.productId === action.payload.productId);
        
        if (existingProductIndex !== -1) {
          // Product already exists in the cart, update its quantity
          const updatedCart = [...state.cart];
          updatedCart[existingProductIndex].quantity += action.payload.quantity;
          return {
            ...state,
            cart: updatedCart,
          };
        } else {
          // Product is not in the cart, add it
          return {
            ...state,
            cart: [...state.cart, action.payload],
          };
        }
      case UPDATE_QUANTITY:
        const updatedCart = state.cart.map(item => {
          if (item.id === action.payload.productId) {
            return { ...item, quantity: action.payload.quantity };
          }
          return item;
        });
        return {
          ...state,
          cart: updatedCart,
        };

    default:
      return state;
  }
};
