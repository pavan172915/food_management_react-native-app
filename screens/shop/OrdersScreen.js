import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import OrderItem from "../../components/shop/OrderItem";

const OrderScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);

  return (
    //   <Text style={{marginLeft:50}}>{orders.length}</Text>
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => {
        return (
          <OrderItem
            amount={itemData.item.totalAmount}
            date={itemData.item.readableDate}
          />
        );
      }}
    />
  );
};

OrderScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName="md-menu"
          onPress={() => {
            console.log("Pressed");
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
});

export default OrderScreen;
