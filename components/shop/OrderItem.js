import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Colors from "../../constants/Colors";

const OrderItem = (props) => {
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button title="Show Details" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "white",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    padding:10,
    margin: 20,
    alignItems:'center'
  },
  summary:{
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      width:"100%"
  },
  amount:{
      fontFamily:'open-sans-bold',
      fontSize:16
  },
  date:{
      fontSize:16
  }
});

export default OrderItem;
