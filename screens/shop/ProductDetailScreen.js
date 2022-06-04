import React, { useState } from "react";
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
import ModalPopUp from "../../components/UI/Modal";

const ProductDetailScreen = (props) => {
  const prodId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => {
      return prod.id === prodId;
    })
  );
  const dispatch = useDispatch();
  const [modalVisible,setModalVisible] = useState(false)
  const [initialProductCount,SetInitialProductCount] = useState(1)
  const [productItem,setProductItem] = useState()
  const itemCountHandler = (identifier) => {
    identifier == 1
      ? SetInitialProductCount((previousCount) => ++previousCount)
      : SetInitialProductCount((previousCount) => --previousCount);

  };
  return (
    <ScrollView>
      <ModalPopUp
        addProducts={true}
        intialItemCount={initialProductCount}
        itemCountHandler={itemCountHandler}
        isModalVisible={modalVisible}
        modalTitle="Add Items to cart?"
        modalHandler={(id) => {
          setModalVisible(false);
          SetInitialProductCount(1);
          if (id !== 0) {
            console.log("close Icon pressed!");
            dispatch(cartActions.addToCart(productItem,initialProductCount ));
          }
          props.navigation.navigate("ProductsOverview");
        }}
      />
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
            SetInitialProductCount(1)
            setModalVisible(true)
            setProductItem(selectedProduct)
            
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
