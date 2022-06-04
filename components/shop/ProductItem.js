import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import MainButton from "../UI/MainButton";
import { TouchableOpacity } from "react-native";
//import TouchableNativeFeedback from "react-native-gesture-handler/lib/typescript/components/touchables/TouchableNativeFeedback.android";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";

const ProductItem = (props) => {
  const selectItemHandler = (id, title) => {
    console.log('here')
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };
  let Comp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    Comp = TouchableNativeFeedback;
  }
  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <Comp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              {props.children}
              {/* <Button
              color={Colors.primary}
              title="Details"
              onPress={() => {
                console.log("Item selected");
                selectItemHandler(pr.id, itemData.item.title);
              }}
            /> */}
            </View>
          </View>
        </Comp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 2,
    overflow: "hidden",
    marginBottom: -10,
  },
  touchable: {
    overflow: "hidden",
    borderRadius: 10,
  },
  price: {
    fontFamily: "open-sans-bold",
    fontSize: 14,
    color: "#888",
    marginTop:10
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20,
    overflow: "hidden",
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
});

export default ProductItem;
