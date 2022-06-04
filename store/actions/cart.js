export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";

export const addToCart = (product,quantity) => {
  return { type: ADD_TO_CART, product: product,quantity:quantity };
};

export const removeFromCart = (productId,isRemove) => {
  return { type: REMOVE_FROM_CART, pid: productId,remove:isRemove };
};

export const clearCart = ()=>{
  return {type:CLEAR_CART}
}
