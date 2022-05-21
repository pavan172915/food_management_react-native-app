import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";
import Colors from "../../constants/Colors";
import Card from '../../components/UI/Card'

const CartScreen = (props) => {
    //console.log(props.navigation)
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
      <Card style={styles.itemsummary}>
        <Text style={styles.sumText}>
          {/* to ensure we don't get -values in place of amount we perform round*100/100 */}
          Total:<Text style={styles.amount}> ${Math.round(cartTotalAmount.toFixed(2) *100)/100}</Text>
        </Text>
        <Button
        style={{borderRadius:20}}
          title="Order Now?"
          onPress={() => {
            console.log("ok");
            //props.navigation.actions[1].state.params.cartCount = 0;
            // console.log(props.navigation.state);
            // if(props.navigation.state.params){
            //     console.log("Ordered ",props.navigation.state.params.cartCount);
            //     props.navigation.state.params.cartCount = 0;
            // }
            // else{
            //     console.log("Nothing Change");
            // }
    
            dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
            props.navigation.navigate("ProductsOverview",{
              cartCount:0
            })
          }}
          disabled={cartItems.length === 0}
        />
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
    marginLeft:20,
    paddingLeft:20
  },
  itemsummary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
});

export default CartScreen;
