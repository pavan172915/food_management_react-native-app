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
import UserProductScreen from "../screens/user/UserProductScreen";
import EditProductScreen from "../screens/user/EditProductScreen";

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
          style={{ marginTop: 80, fontFamily: "open-sans-bold", fontSize: 16 }}
        >
          Food Items
        </Text>
      ),
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name="fast-food-outline"
          size={23}
          color="blue"
          style={{ marginTop: 80 }}
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
    navigationOptions: {
      drawerLabel:<Text style={{fontSize:16,marginTop:20}}>Your Orders</Text>,
      drawerIcon: (drawerConfig) => (
        <Ionicons name="gift-outline" color={drawerConfig.tintColor} style={{marginTop:20}} size={23}/>
      ),
    },
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    userProducts: UserProductScreen,
    EditProducts:EditProductScreen
  },
  {
    navigationOptions: {
      drawerLabel:<Text style={{fontSize:16,marginTop:20}}>Your Items</Text>,
      drawerIcon: (drawerConfig) => (
        <Ionicons name="ios-create" color={drawerConfig.tintColor} style={{marginTop:20}} size={23}/>
      ),
    },
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin:AdminNavigator
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
