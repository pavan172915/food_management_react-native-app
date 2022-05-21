import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";
import CartItem from "./CartItem";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        title={showDetails?"Hide Details":"Show Details"}
        color={Colors.primary}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.detailItems }>
          {props.items.map((cartItem) => {
            return (
              <CartItem
                key={cartItem.productId}
                quantity={cartItem.quantity}
                amount={cartItem.sum}
                title={cartItem.productTitle}
              />
            );
          })}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    padding: 10,
    margin: 20,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  amount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
  },
  detailItems:{
      width:"100%"
  }
});

export default OrderItem;
