import CartItem from "../../models/cart-item";
import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/product";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const addedQuantity = action.quantity;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;
      if (state.items[addedProduct.id]) {
        const updatedCartItem = new CartItem(
          state.items[addedProduct.id].quantity + addedQuantity,
          productPrice * addedQuantity,
          productTitle,
          state.items[addedProduct.id].sum + productPrice * addedQuantity
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedCartItem },
          totalAmount: state.totalAmount + productPrice * addedQuantity,
        };
      } else {
        const newCartItem = new CartItem(
          addedQuantity,
          productPrice,
          productTitle,
          productPrice * addedQuantity
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: newCartItem },
          totalAmount: state.totalAmount + productPrice * addedQuantity,
        };
      }
    case REMOVE_FROM_CART:
      const selected = state.items[action.pid];
      const currentQty = selected.quantity;
      let updatedCartItems;
      if (action.remove) {
        if (currentQty > 1) {
          const updatedCartItem = new CartItem(
            selected.quantity - 1,
            selected.productPrice,
            selected.productTitle,
            selected.sum - selected.productPrice
          );
          updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
        } else {
          updatedCartItems = { ...state.items };
          delete updatedCartItems[action.pid];
        }
      } else {
        const updatedCartItem1 = new CartItem(
          selected.quantity + 1,
          selected.productPrice,
          selected.productTitle,
          selected.sum + selected.productPrice
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem1 };
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: action.remove
          ? state.totalAmount - selected.productPrice
          : state.totalAmount + selected.productPrice,
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemsTotal = state.items[action.pid].sum;
      delete updatedItems[action.pid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemsTotal,
      };
    case CLEAR_CART:
      return {
        items: {},
        totalAmount: 0,
      };
  }
  return state;
};
