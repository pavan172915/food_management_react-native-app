import React from "react";
import { FlatList, Button, Platform, Alert } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import * as productsActions from "../../store/actions/product";

const UserProductScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const deleteHandler = (id) => {
    Alert.alert("Do you want to delete this item?",'', [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        },
      },
    ]);
  };
  const dispatch = useDispatch();
  const editProducutHandler = (id) => {
    props.navigation.navigate("EditProducts", { productId: id });
  };
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {}}
          onAddToCart={() => {}}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              console.log("Item selected", itemData.item.price);
              editProducutHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={deleteHandler.bind(this,itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Products",
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
            console.log("Pressed menu");
            navData.navigation.toggleDrawer();
          }}
          color={Colors.primary}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            console.log("Pressed");
            navData.navigation.navigate("EditProducts");
          }}
          color={Colors.primary}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductScreen;
