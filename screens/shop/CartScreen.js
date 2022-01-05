import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";
import Colors from "../../constants/Colors";

const CartScreen = (props) => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCart = [];
    for (const key in state.cart.items) {
      transformedCart.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCart.sort((a, b) => {
      return a.productId > b.productId ? 1 : -1;
    });
  });
  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <View style={styles.itemsummary}>
        <Text style={styles.sumText}>
          Total:<Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          title="Order Now?"
          onPress={() => {
            console.log("ok");
            dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
          }}
          disabled={cartItems.length === 0}
        />
      </View>
      <View>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          renderItem={(itemData) => {
            return (
              <CartItem
                quantity={itemData.item.quantity}
                title={itemData.item.productTitle}
                amount={itemData.item.sum}
                onRemove={() => {
                  console.log("Removed");
                  dispatch(cartActions.removeFromCart(itemData.item.productId));
                }}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Your Cart",
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  sumText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
  itemsummary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
});

export default CartScreen;
