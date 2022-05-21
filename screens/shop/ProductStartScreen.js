import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { FlatList } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import * as cartActions from "../../store/actions/cart";
import { useEffect } from "react";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import MainButton from "../../components/UI/MainButton";

const ProductStartScreen = (props) => {
  console.log("Start");

  //const [cartCount,setCartCount] = useState(0);
  //const start = props.navigation.actions[1].state.params.cartCount;
  //console.log("start",start);
  //const [cartCount, setCartCount] = useState(start);
  global.cartItems = useSelector((state) => {
    const transformedCart = [];
    console.log(state.cart.items);
    for (const key in state.cart.items) {
      transformedCart.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCart;
  });
  //const {quantity:toUseInContextDependencies} = cartItems;
  global.numberOfCartItems = cartItems.reduce((currentNumber, item) => {
    return currentNumber + item.quantity;
  }, 0);
  //props.navigation.setParams({ cartCount:global.numberOfCartItems });
  const [cartVal, setCartVal] = useState(global.numberOfCartItems);
  const findCartCount = (cart) => {
    return cart.reduce((num, item) => {
      return num + item.quantity;
    }, 0);
  };
  console.log("Redux", numberOfCartItems);
  const products = useSelector((state) => state.products.availableProducts);

  const dispatch = useDispatch();
  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => {
        return (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            // onAddToCart={() => {
            //   //setCartCount(prevState=>prevState+1);
            //   //console.log("REDUX Ele",numberOfCartItems);
            //   console.log('Cart to select')
            //   props.navigation.setParams({
            //     cartCount: findCartCount(cartItems),
            //   });

            //   //setCartVal(global.numberOfCartItems);
            // }}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          >
            <Button
              color={Colors.primary}
              title="Details"
              onPress={() => {
                console.log("Item selected");
                selectItemHandler(itemData.item.id, itemData.item.title);
              }}
            />
            <Button
              color={Colors.primary}
              title="To Cart"
              onPress={() => {
                // props.navigation.setParams({
                //   cartCount: findCartCount(cartItems),
                // });
                console.log("Add to cart pressed");
                dispatch(cartActions.addToCart(itemData.item));
              }}
            />
          </ProductItem>
        );
      }}
    />
  );
};
ProductStartScreen.navigationOptions = (navData) => {
  //const cartCount = cartItems.length;
  //console.log(navData)
  //console.log(cartCount);
  const cartCount = global.numberOfCartItems;
  console.log("Global", cartCount);
  return {
    headerTitle: "All Products",
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
          color={Colors.primary}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        {/* <Item
          title="Add"
          iconName="ios-create"
          onPress={() => {
            console.log("Pressed");
            navData.navigation.navigate('EditProducts');
          }}
          color={Colors.primary}
        /> */}
        {/* <View>
        <Item
          title="Cart"
          iconName="md-cart"
          onPress={() => {
            console.log("Pressed");
            navData.navigation.navigate("Cart");
          }}
        />
        {cartCount > 0 ? (
                  <View>
                    <Text style={{color:"white"}}>{cartCount}</Text>
                  </View>
                ) : <Text>{10}</Text>}
        </View> */}
        
         <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => {
              console.log("Pressed");
              navData.navigation.navigate("Cart");
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                name="shoppingcart"
                type="antdesign"
                color={"#FFFFFF"}
                size={22}
                containerStyle={{ marginHorizontal: 15, position: "relative" }}
              />
              {cartCount > 0 ? (
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "red",
                    width: 16,
                    height: 16,
                    borderRadius: 15 / 2,
                    right: 10,
                    top: +10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                      fontSize: 8,
                    }}
                  >
                    {cartCount}
                  </Text>
                </View>
              ) : null}
              <View></View>
            </View>
          </TouchableOpacity>
        </View>
      </HeaderButtons>
    ),
  };
};

export default ProductStartScreen;
