import React, { useEffect, useCallback, useReducer, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as productsActions from "../../store/actions/product";
import Input from "../../components/UI/Input";

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

const EditProductScreen = (props) => {
  const [isDataNotFetched, setisDataNotFetched] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const productId = props.navigation.getParam("productId");
  console.log("ID", productId);
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === productId)
  );
  //console.log('Edit Product!',editedProduct)

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidates: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    isFormValid: editedProduct ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("Error Occured!", error, [{ text: "OK" }]);
    }
    //setisDataNotFetched(false)
  }, [error]);

  const submitHandler = useCallback(async () => {
    console.log("Form Submitting...");
    console.log("Form Valid", formState.isFormValid);
    if (!formState.isFormValid) {
      Alert.alert(
        "Wrong Input",
        "Please check the input fields and try again!",
        [{ text: "Ok" }]
      );
      return;
    }
    setisDataNotFetched(true);
    setError(null);
    try {
      if (editedProduct) {
        await dispatch(
          productsActions.updateProduct(
            productId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl
          )
        );
      } else {
        await dispatch(
          productsActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setisDataNotFetched(false);
  }, [formState]);
  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);
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
  ); // using useCallBack with dispatchFormState as dependecy since the function inside it need not trigger every time the component re-builds
  if (isDataNotFetched) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please Enter A Valid Title!"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ""}
            initialValid={!!editedProduct}
            value={"pavanr"}
            required
          />
          <Input
            id="imageUrl"
            label="ImageUrl"
            errorText="Please Enter A Valid Image URL!"
            returnKeyType="next"
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            initialValid={!!editedProduct}
            required
            onInputChange={inputChangeHandler}
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="price"
              errorText="Please Enter A Valid Price!"
              returnKeyType="next"
              keyboardType="decimal-pad"
              required
              min={1}
              onInputChange={inputChangeHandler}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please Enter A Valid Description!"
            returnKeyType="done"
            multiline
            numberOfLines={3}
            initialValue={editedProduct ? editedProduct.description : ""}
            initialValid={!!editedProduct}
            required
            minLength={5}
            onInputChange={inputChangeHandler}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFunction = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerTintColor: "white",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFunction}
          color={Colors.primary}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProductScreen;
