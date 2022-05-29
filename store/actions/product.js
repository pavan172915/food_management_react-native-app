import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    // before we dispatch the event as show in fig 1 we can do any async functionalities here
    // if we do not use redux-thunk and this syntax this code breaks
    try {
      
      console.log('USER',userId)
      const response = await fetch(`${fireBaseUrl}/products.json`, {
        method: "GET", // fetch is a default get request so we do not need to set method,headers and body
      });
      if (!response.ok) {
        throw new Error("Something Went Wrong!!");
      }
      const responseData = await response.json();
      console.log("res",responseData)
      const loadedProductsFromDB = [];
      for (const key in responseData) {
        loadedProductsFromDB.push(
          new Product(
            key,
            responseData[key].ownerId,
            responseData[key].title,
            responseData[key].imageURL,
            responseData[key].description,
            responseData[key].price
          )
        );
      }
      const temp = loadedProductsFromDB.filter(
        prod => prod.ownerId === userId
      )
      console.log("GET DAta", userId);
      dispatch({
        type: SET_PRODUCTS,
        products: loadedProductsFromDB,
        userProducts: loadedProductsFromDB.filter(
          prod => prod.ownerId === userId
        ),
      });
    } catch (err) {
      throw err;
    }
  };
};
const fireBaseUrl = "https://local-shop-app-default-rtdb.firebaseio.com/";

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const responseData = await fetch(
      `${fireBaseUrl}/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );
    if (!responseData.ok) {
      throw new Error("Something Went wrong !!");
    }
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};
// instead of directly dispatching the event we can bind it to a function which receives dispatch as a parameter
//when we do this redux-thunk kicks in and do necessary functions as before
export const createProduct = (title, description, imageURL, price) => {
  return async (dispatch, getState) => {
    // before we dispatch the event as show in fig 1 we can do any async functionalities here
    // if we do not use redux-thunk and this syntax this code breaks
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    console.log('CREATE USER:',userId)
    const response = await fetch(`${fireBaseUrl}/products.json?auth=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        imageURL,
        price,
        ownerId: userId,
      }),
    });

    const responseData = await response.json();
    //console.log('product Id created by firebase',responseData.name);
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: responseData.name,
        title,
        description,
        imageURL,
        price,
        ownerId: userId,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageURL) => {
  return async (dispatch, getState) => {
    // console.log(getState()) in addtion to providing dispatch( from which we can use async code to run before dispatching like dbchanges,api calls etc)
    //redux thunk also provides second parameter say getState which provides with current snapshot of our reudcer state..
    const token = getState().auth.token;
    const responseData = await fetch(
      `${fireBaseUrl}/products/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, imageURL }),
      }
    );
    if (!responseData.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageURL,
      },
    });
  };
};
