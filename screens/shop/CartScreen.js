import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";
import Colors from "../../constants/Colors";
import Card from "../../components/UI/Card";

const CartScreen = (props) => {
  //console.log(props.navigation)
  const [isLoading, setisLoading] = useState(false);
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
  const sendorderHandler = async () => {
    setisLoading(true);
    await dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
    setisLoading(false);
    props.navigation.navigate("ProductsOverview", {
      cartCount: 0,
    });
  };
  return (
    <View style={styles.screen}>
      <Card style={styles.itemsummary}>
        <Text style={styles.sumText}>
          {/* to ensure we don't get -values in place of amount we perform round*100/100 */}
          Total:
          <Text style={styles.amount}>
            {" "}
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : (
          <Button
            style={{ borderRadius: 20 }}
            title="Order Now?"
            // onPress={() => {
            //   props.navigation.navigate("ProductsOverview",{
            //     cartCount:0
            //   })
            // }}
            onPress={sendorderHandler}
            disabled={cartItems.length === 0}
          />
        )}
      </Card>
      <View>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          renderItem={(itemData) => {
            return (
              <CartItem
                deletable={true}
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
    marginLeft: 20,
    paddingLeft: 20,
  },
  itemsummary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default CartScreen;
