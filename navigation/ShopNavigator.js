import { createAppContainer } from "react-navigation";
import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
//import { createDrawerNavigator } from "react-navigation-drawer";
import { createDrawerNavigator } from "react-navigation-drawer";
//import { createDrawerNavigator } from "@react-navigation/drawer";
import Colors from "../constants/Colors";
import ProductStartScreen from "../screens/shop/ProductStartScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrdersScreen";
import { Ionicons } from "@expo/vector-icons";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: "white",
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductStartScreen,
    Cart: CartScreen,
    ProductDetail: ProductDetailScreen,
  },
  {
    navigationOptions: {
      drawerLabel: (
        <Text
          style={{ marginTop: 40, fontFamily: "open-sans-bold", fontSize: 16 }}
        >
          Food Items
        </Text>
      ),
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name="fast-food-outline"
          size={23}
          color="blue"
          style={{ marginTop: 40 }}
        />
      ),
    },
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);
const OrdersNavigator = createStackNavigator(
  {
    Orders: OrderScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  },
  {
    navigationOptions: {
      drawerLabel: "Food Orders",
      drawerIcon: (drawerConfig) => (
        <Ionicons name="md-list" color={drawerConfig.tintColor} />
      ),
    },
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
      drawerLabelStyle: {
        marginTop: 20,
      },
    },
  }
);

export default createAppContainer(ShopNavigator);
