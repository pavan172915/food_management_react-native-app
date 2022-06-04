import React, { useReducer, useCallback, useState,useEffect, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Alert
} from "react-native";
import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import * as AuthActions from "../../store/actions/auth";
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type == FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidates,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    console.log(updatedValidities);
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    console.log("final check for form validity", updatedFormIsValid);
    return {
      isFormValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidates: updatedValidities,
    };
  }
  return state;
};


const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error,setError] = useState()
  const dispatch = useDispatch();

  const inputChangeHandler = useCallback(
    (inputIdentifer, inputValue, inputValidity) => {
      console.log("In input change handler...", inputValue);
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifer,
      });
    },
    [dispatchFormState]
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidates: {
      email: false,
      password: false,
    },
    isFormValid: false,
  });

useEffect(()=>{
    if(error){
        Alert.alert('An Error Occured!',error,[{text:'Okay!'}])
    }
},[error])

  const authenticationHandler = async () => {
    let action;
    if (isSignUp) {
      action = AuthActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = AuthActions.signIn(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null)
    setIsLoading(true);
    try{
    await dispatch(action);
    props.navigation.navigate('Shop')
    }catch(err){
        setError(err.message)
        setIsLoading(false);
    }
    
  };
  const passwordRef = useRef(null)
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior="padding"
      keyboardVerticalOffset={50}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              returnKeyType='next'
              required
              email
              autoCapitalize="none"
              errorText="Please Enter a Valid E-Mail Address.."
              onInputChange={inputChangeHandler}
              intitalValue=""

            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please Enter a Valid Password.."
              onInputChange={inputChangeHandler}
              intitalValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={isSignUp ? " Sign Up" : "Login"}
                  color={Colors.primary}
                  onPress={authenticationHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignUp ? "Login?" : "Sign Up?"}`}
                color={Colors.blue}
                onPress={() => {
                  setIsSignUp((previousState) => !previousState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Hola Welcome!",
};

const styles = StyleSheet.create({
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  screen: {
    flex: 1,
  },
  gradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
