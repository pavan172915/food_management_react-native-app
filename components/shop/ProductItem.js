import React from "react";
import { View, Text, StyleSheet, Image, Button, Platform,TouchableNativeFeedback } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
//import TouchableNativeFeedback from "react-native-gesture-handler/lib/typescript/components/touchables/TouchableNativeFeedback.android";
import Colors from "../../constants/Colors";

const ProductItem = (props) => {
  let Comp = TouchableOpacity;
  if(Platform.OS === 'android' && Platform.Version >=21){
     Comp =  TouchableNativeFeedback;
  }
  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
    <Comp onPress={props.onViewDetail} useForeground>
      <View>
        <View style={styles.imageContainer}>
      <Image style={styles.image} source={{ uri: props.image }} />
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.price}>${props.price.toFixed(2)}</Text>
      </View>
      <View style={styles.actions}>
        <Button color={Colors.primary} title="Details" onPress={props.onViewDetail} />
        <Button color={Colors.primary}title="To Cart" onPress={props.onAddToCart} />
      </View>
      </View>
      </Comp>
      </View> 
    </View>
    
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "white",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontFamily:'open-sans-bold',
    fontSize: 18,
    marginVertical: 2,
    overflow:"hidden"
  },
  touchable:{
    overflow:"hidden",
    borderRadius:10
  },
  price: {
    fontFamily:'open-sans',
    fontSize: 14,
    color: "#888",
  },
  imageContainer:{
      width:"100%",
      height:"60%",
      borderTopLeftRadius:10,
      borderTopRightRadius:10,
      overflow:"hidden"
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height:"25%",
    paddingHorizontal:20
  },
  details:{
      alignItems:"center",
      height:"15%",
      padding:10
  }
});

export default ProductItem;
