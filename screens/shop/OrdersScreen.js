import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet,ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import OrderItem from "../../components/shop/OrderItem";
import * as orderActions from "../../store/actions/orders";
import ModalCard from "../../components/UI/ModalCard";

const OrderScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    dispatch(orderActions.fetchOrders()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);
  if(isLoading){
    return (
      <View style={styles.loader}>
        <ActivityIndicator size='large' color={Colors.primary}/>
      </View>
    )
  }
  if(orders.length === 0){
    const img = require('../../components/UI/O.jpeg')
    return (
      <ModalCard image={img} mainTitle="No Orders Found" secondTitle="Book Some Delicious Food Items Now 🥤" navigation={props.navigation} />
    )
  }
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
            items={itemData.item.items}
          />
        );
      }}
    />
  );
};

OrderScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerTintColor: "white",
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
  loader:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});

export default OrderScreen;
