import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import * as cartActions from "../../store/actions/cart";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";

const ProductStartScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => {
        return (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onViewDetail={() => {
              props.navigation.navigate("ProductDetail", {
                productId: itemData.item.id,
                productTitle: itemData.item.title,
              });
            }}
            onAddToCart={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        );
      }}
    />
  );
};
ProductStartScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",
    headerStyle:{
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
          color={Colors.primary}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName="md-cart"
          onPress={() => {
            console.log("Pressed");
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductStartScreen;
