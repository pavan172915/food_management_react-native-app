import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ModalPopUp = (props) => {
    console.log('product count from modal',props.intialItemCount)
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isModalVisible && (props.notItemScreen || props.intialItemCount>0)}
      >
          
        <View style={styles.centeredView}>
        
          <View style={styles.modalView}>
              <View style={styles.closeIcon}>
          <Ionicons name="close" size={23} onPress={props.modalHandler.bind(this,0)} ></Ionicons>
          </View>
            <Text style={styles.modalText}>{props.modalTitle}</Text>
            {props.addProducts && (
              <View style={{ flexDirection: "row" }}>
                {props.intialItemCount > 1 ? (
                  <Ionicons
                    name="remove-circle-outline"
                    style={styles.modalTextNumber}
                    onPress={props.itemCountHandler.bind(this, 0)}
                  ></Ionicons>
                ) : (
                  null
                )}
                {/* <Text style={styles.modalTextNumber} onPress={props.itemCountHandler.bind(this,0)}>-</Text> */}
                <Text style={styles.itemCount}>{props.intialItemCount}</Text>
                <Ionicons
                  name="add-circle-outline"
                  style={styles.modalTextNumber}
                  onPress={props.itemCountHandler.bind(this, 1)}
                ></Ionicons>
              </View>
            )}
            <Button title="Done" onPress={props.modalHandler} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: "100%",
    height: "100%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeIcon:{
      position:'absolute',
      right:2,
      top:2
  },
  itemCount: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 7,
    paddingBottom: 0,
    fontSize: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalTextNumber: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 30,
  },
  modalText_Number: {
    marginBottom: 0,
    textAlign: "center",
    fontSize: 25,
    marginTop: 4,
  },
});

export default ModalPopUp;
