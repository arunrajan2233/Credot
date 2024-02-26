import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from './header/Header';
import CartProducts from './cartProductsListing/CartProducts';
import Spacer from '../../assets/general/emptySpacer/Spacer';
import {colors} from '../../assets/general/colors/Colors';
import Recommended from './recommended/Recommended';
import {verticalScale} from '../../assets/general/dimension/Dimension';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';

const CheckOutScreen = () => {
 
   return (
    <View style={styles.container}>
      <Header />
      {/* <=========cart Products=========> */}
      <Spacer height={20} />
      <CartProducts />
      <Spacer height={20} />
      <Recommended />
      <Spacer height={20} />

      <View
        style={styles.mainView}>
        <View
          style={styles.delivery}>
          <Entypo name="flash" size={30} color={colors.green_level2 } />

          <Text>Instant delivery</Text>
        </View>

        <View
          style={styles.scheduledContainer}>
          <Entypo name="clock" size={30} color="##D8D8D8" />

          <Text>Scheduled delivery</Text>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  
  scheduledContainer:{

    width: '45%',
    // backgroundColor: 'red',
    height: '70%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:2,
    borderColor:"#D8D8D8"
  },
  delivery:{
    width: '45%',
    height: '70%',
   borderRadius: 20,
   justifyContent: 'center',
   alignItems: 'center',
   borderWidth:2,
   borderColor:colors.green_level2
  },

  mainView:{
    width: '100%',
    flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   height: verticalScale(200),
   gap: 10,
  }




});


export default CheckOutScreen;
