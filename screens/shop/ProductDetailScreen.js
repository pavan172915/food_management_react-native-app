import React from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  Button,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../../store/actions/cart";
import Colors from "../../constants/Colors";

const ProductDetailScreen = (props) => {
  const prodId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => {
      return prod.id === prodId;
    })
  );
  const dispatch = useDispatch();
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      {/* <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add To Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct ));
          }}
        /> 
        </View>*/}
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.desc}>{selectedProduct.description}</Text>
      <View style={{flex:1,justifyContent:'flex-end',marginTop:200}}>
      <Button
          color={Colors.primary}
          title="Add To Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct ));
          }}
        />
        </View>
    </ScrollView>
  );
};
ProductDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
  };
};
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold",
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  desc: {
    fontFamily: "open-sans",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default ProductDetailScreen;
