import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

import Colors from '../../constants/Colors';



const iconColor = '#6c5ce7';
const BottomCard = (props) => {
  //const { name, categories, deliveryTime, distance, image } = info;

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Image style={styles.imageStyle} source={props.image}  />
        <View style={styles.infoStyle}>
          <Text style={styles.titleStyle}>{props.mainTitle}</Text>
          <Text style={styles.categoryStyle}>{props.secondTitle}</Text>

          <View style={styles.iconLabelStyle}>
            
          </View>
        </View>
      </View>
    </View>
  );
};

const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 40;
const radius = 20;
const styles = StyleSheet.create({
  container: {
      position:'absolute',
      bottom:0
  },
  cardContainer: {
    width: deviceWidth - offset,
    backgroundColor: 'white',
    height: 200,
    borderRadius: radius,

    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 9,
  },
  imageStyle: {
    height: 130,
    width: deviceWidth - offset,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    opacity: 0.9,
    alignContent: 'center',
    alignSelf: 'center',
  },
  titleStyle: {

    fontSize: 20,
    fontWeight: '800',
    alignItems:'center',
    justifyContent:'center'
  },
  categoryStyle: {
    fontWeight: '400',
  },
  infoStyle: {
    marginHorizontal: 10,
    marginVertical: 5,
    alignItems:'center',
    justifyContent:'center'
  },
  iconLabelStyle: {
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default BottomCard;