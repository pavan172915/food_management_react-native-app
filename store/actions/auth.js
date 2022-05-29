import AsyncStorage from "@react-native-async-storage/async-storage";
export const SIGN_UP = "SIGN_UP";
export const SIGN_IN = "SIGN_IN";
export const AUTHENTICATE = "AUTHENTICATE";
let timer;
export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
    });
  };
};
export const fireBaseUserStoreUrl =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAx7ec2_Cic86ANI0s4qvRynWHsSf1omOA";
export const fireBaseUserAuthenticateUrl =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAx7ec2_Cic86ANI0s4qvRynWHsSf1omOA";
export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(fireBaseUserStoreUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    });
    if (!response.ok) {
      console.log("not ok");
      const errorResponse = await response.json();
      const errorId = errorResponse.error.message;
      let message = "Something Went Wrong!";
      if (errorId === "EMAIL_EXISTS") {
        message = "Provided Email Is Already Taken!";
      }
      throw new Error(message);
    }
    const responseData = await response.json();
    console.log(responseData);
    dispatch(
      authenticate(
        responseData.localId,
        responseData.idToken,
        parseInt(responseData.expiresIn)*1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(responseData.expiresIn)*1000
    );
    saveDataOnReload(
      responseData.idToken,
      responseData.localId,
      expirationDate
    );
  };
};
export const signIn = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(fireBaseUserAuthenticateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    });
    if (!response.ok) {
      console.log("not ok");
      const errorResponse = await response.json();
      const errorId = errorResponse.error.message;
      let message = "Something Went Wrong!";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "Provided Email Is Invalid!";
      }
      if (errorId === "INVALID_PASSWORD") {
        message = "Invalid Credentials";
      }
      throw new Error(message);
    }
    const responseData = await response.json();
    console.log(responseData);
    dispatch(
      authenticate(
        responseData.localId,
        responseData.idToken,
        parseInt(responseData.expiresIn)*1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(responseData.expiresIn)*1000
    );
    saveDataOnReload(
      responseData.idToken,
      responseData.localId,
      expirationDate
    );
  };
};

export const LOGOUT = "LOGOUT";

export const logout = () => {
  clearTimeOutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime); // to see if we are actually logging out after expirty time just divide 
    // expirationTime by 1000 which will convert it to second hence after few seconds you will be logged out..
  };
};

const clearTimeOutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const saveDataOnReload = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
