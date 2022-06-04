import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Animated,
  SafeAreaView,
} from "react-native";
import Header from "../../components/UI/Header";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/product";
import { useEffect } from "react";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import MainButton from "../../components/UI/MainButton";
import ModalPopUp from "../../components/UI/Modal";
import BottomCard from "../../components/UI/BottomNavigator";
const CONTAINER_HEIGHT = 50;
const ProductStartScreen = (props) => {
  console.log("Start");
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 50);
  const translatedY = diffClamp.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 50],
  });
  const [isDataFetched, setDataIsFetched] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
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
  useEffect(() => {
    console.log("Cart count from dispatch func", global.numberOfCartItems);
  }, [global.numberOfCartItems]);
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
  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch]);
  useEffect(() => {
    const willFocustSubscription = props.navigation.addListener(
      "willFocus",
      loadProducts
    );
    return () => {
      willFocustSubscription.remove(); // with useEffect we can return a function where we can do cleanup hence it is called a cleanUp function
      // this cleanUp function executes before the component is being destroyed...
    };
  }, [loadProducts]);
  useEffect(() => {
    loadProducts().then(() => {
      setDataIsFetched(true);
    });
  }, [dispatch, loadProducts]);
  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };
  const [modalVisibility, setModalVisibility] = useState(false);
  const [productCount, setProductCount] = useState(1);
  const [productItem, setproductItem] = useState();
  const itemCountHandler = (identifier) => {
    identifier == 1
      ? setProductCount((previousCount) => ++previousCount)
      : setProductCount((previousCount) => --previousCount);
    console.log("products count", productCount);
  };
  if (error) {
    return (
      <View style={styles.loader}>
        <Text>An Error Occured!!</Text>
        <Button
          title="Try Again?"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }
  if (!isDataFetched) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }
  if (isDataFetched && products.length === 0) {
    return (
      <View style={styles.loader}>
        <Text>No Products Found!!</Text>
      </View>
    );
  }
  let cartCount = global.numberOfCartItems;

  return (
    <View style={styles.container}>
      <ModalPopUp
        addProducts={true}
        intialItemCount={productCount}
        itemCountHandler={itemCountHandler}
        isModalVisible={modalVisibility}
        modalTitle="Add Items to cart?"
        modalHandler={(id) => {
          setModalVisibility(false);
          setProductCount(1);
          console.log("Final products", productCount);
          console.log(productItem);
          if (id !== 0) {
            console.log("close Icon pressed!");
            dispatch(cartActions.addToCart(productItem, productCount));
            props.navigation.push("ProductsOverview");
          }
          
        }}
      />
      <FlatList
        ListHeaderComponentStyle={{ elevation: 0.1, zIndex: 1 }}
        refreshing={isRefreshing}
        onRefresh={loadProducts}
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
                  setProductCount(1);
                  setModalVisibility(true);
                  setproductItem(itemData.item);
                  //dispatch(cartActions.addToCart(itemData.item));
                }}
              />
            </ProductItem>
          );
        }}
      />

    </View>
  );
};
ProductStartScreen.navigationOptions = (navData) => {
  console.log(
    "NavOptions executed!!",
    navData.navigation.getParam("headerTitle")
  );
  const cartCount = global.numberOfCartItems;
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
            navData.navigation.toggleDrawer();
          }}
          color={Colors.primary}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
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

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {},
  cartCount: {
    width: "100%",
    height: CONTAINER_HEIGHT,
    backgroundColor: "#EE5407",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", //Here is the trick
    bottom: 0, //Here is the trick
  },
  contentContainerStyle: {
    marginTop: CONTAINER_HEIGHT,
  },
});

export default ProductStartScreen;
