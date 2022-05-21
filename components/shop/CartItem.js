import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
//import { TouchableOpacity } from "react-native-gesture-handler";

const CartItem = (props) => {
  console.log("Quantity",props.quantity);
  return (
    <View style={styles.cartItem}>
      <Text style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity} </Text>
        <Text style={styles.title}>{props.title}</Text>
      </Text>
      <View style={styles.itemData}>
        <Text style={styles.title1}>${props.amount.toFixed(2)}</Text>
        {props.deletable && (
          <TouchableOpacity
            onPress={props.onRemove}
            style={styles.deleteButton}
          >
            {props.quantity > 1 ? <Ionicons
              name="remove-circle-outline"
              size={23}
              color="red"
            />: <Ionicons name="trash-outline" size={23} color="red"/>}
            
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
    marginRight:20
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    color:"black",
    marginHorizontal:20
  },
  title1: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    color: "red",
    marginLeft:20
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
