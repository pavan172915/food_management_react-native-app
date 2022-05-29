import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import * as AuthAction from "../store/actions/auth";

const StartUpScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLoggingIn = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
          console.log('No user DAta found')
        props.navigation.navigate("Auth");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);
      if (expirationDate <= new Date() || !token || !userId) {
          console.log('expiry,token')
        props.navigation.navigate("Auth");
        return;
      }
      const expirationTime = expirationDate.getTime() - new Date().getTime()
      console.log('All fetched loggedin success')
      props.navigation.navigate("Shop");
      dispatch(AuthAction.authenticate(userId, token,expirationTime));
    };
    tryLoggingIn();
  }, [dispatch]);
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartUpScreen;
