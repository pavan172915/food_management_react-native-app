import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../UI/HeaderButton";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements/dist/icons/Icon";
const Header = (props) => {
  const cartCount = 3;
  return (
    <View style={styles.container}>
      <View>
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName="md-menu"
            onPress={() => {
              //navData.navigation.toggleDrawer();
            }}
            color={Colors.primary}
          />
        </HeaderButtons>
      </View>
      <View>
        <Text>{props.title}</Text>
      </View>
      <View>
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity
              onPress={() => {
                console.log("Pressed");
                //navData.navigation.navigate("Cart");
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
                  containerStyle={{
                    marginHorizontal: 15,
                    position: "relative",
                  }}
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        backgroundColor:Colors.primary,
        height:60,
        position:'absolute',
        width:'100%',
    }
});

export default Header;
