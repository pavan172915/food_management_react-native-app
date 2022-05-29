import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDER = "SET_ORDER"

export const fetchOrders = ()=>{
  return async (dispatch)=>{
    try {
      const response = await fetch(`${fireBaseUrl}/orders/u1.json`, {
        method: "GET", // fetch is a default get request so we do not need to set method,headers and body
      });
      if (!response.ok) {
        throw new Error("Something Went Wrong!!");
      }
      const responseData = await response.json();
      const loadedProductsFromDB = [];
      for (const key in responseData) {
        loadedProductsFromDB.push(
          new Order(key,responseData[key].cartItems,responseData[key].totalAmount,new Date(responseData[key].date))
        );
      }
      console.log(loadedProductsFromDB)
      dispatch({ type: SET_ORDER, orders: loadedProductsFromDB });
    } catch (err) {
      throw err;
    }
  }
}
const fireBaseUrl = "https://local-shop-app-default-rtdb.firebaseio.com/";
export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const date = new Date()
    const response = await fetch(`${fireBaseUrl}/orders/u1.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date.toISOString(),
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error("Somethig Went Wrong!");
    }
    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: responseData.name,
        items: cartItems,
        amount: totalAmount,
        date:date
      },
    });
  };
};
