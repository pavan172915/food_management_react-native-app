import { createAppContainer, createSwitchNavigator } from "react-navigation";
import React from "react";
import { Text, SafeAreaView, Button, View } from "react-native";
import StartUpScreen from "../screens/StartUpScreen";
import { createStackNavigator } from "react-navigation-stack";
//import { createDrawerNavigator } from "react-navigation-drawer";
import { useDispatch } from "react-redux";
import { createDrawerNavigator } from "react-navigation-drawer";
import { DrawerItems } from "react-navigation-drawer";
//import { createDrawerNavigator } from "@react-navigation/drawer";
import Colors from "../constants/Colors";
import ProductStartScreen from "../screens/shop/ProductStartScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrdersScreen";
import { Ionicons } from "@expo/vector-icons";
import UserProductScreen from "../screens/user/UserProductScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import * as AuthActions from "../store/actions/auth"

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
      drawerLabel: (
        <Text style={{ fontSize: 16, marginTop: 20 }}>Your Orders</Text>
      ),
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name="gift-outline"
          color={drawerConfig.tintColor}
          style={{ marginTop: 20 }}
          size={23}
        />
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
    EditProducts: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerLabel: (
        <Text style={{ fontSize: 16, marginTop: 20 }}>Your Items</Text>
      ),
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name="ios-create"
          color={drawerConfig.tintColor}
          style={{ marginTop: 20 }}
          size={23}
        />
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
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
      drawerLabelStyle: {
        marginTop: 20,
      },
    },
    contentComponent: (props) => {
      const dispatch = useDispatch()

      return (
        <View style={{ flex: 1,padding:20 }}>
          <SafeAreaView forceInset={{ top: "always", horizonal: "never" }}>
            <DrawerItems {...props} />
            <Button title="Logout" color={Colors.primary} onPress={() => {
              console.log('logge out clikced!')
              dispatch(AuthActions.logout())
              //props.navigation.navigate('Auth')
            }} />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);
const MainNavigator = createSwitchNavigator({
  StartUp: StartUpScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
