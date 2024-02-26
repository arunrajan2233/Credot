import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../../assets/general/colors/Colors';
import {useSelector} from 'react-redux';
 
const CartProducts = () => {
  const cart = useSelector(state => state.cart);
  console.warn("checkOut page",cart);
  const cartItemsWithQuantity = cart.filter(item => item.quantity >= 1);

 
  return (
    <View>
     
          <View style={styles.container}>
            <View style={styles.secondMainView}>
               <View style={styles.nameView}>
                <Text style={styles.productName} numberOfLines={1}>
                  Siamese Hybrid Chicken
                </Text>
              </View>
              <View style={styles.quntyView}>
                <View style={styles.actionButton}>
                  <Entypo name="minus" size={30} color={colors.defalt_green} />
                </View>
                <Text style={styles.qutnumberText}> 5 </Text>
                <View style={styles.actionButton}>
                  <Entypo name="plus" size={30} color={colors.defalt_green} />
                </View>
              </View>
            </View>

            {/* ==============products details =============== */}

            <View style={styles.productDetailsMainView}>
              <View style={styles.priceSectionView}>
                <View style={styles.priceView}>
                  <Text style={styles.productPriceText}>200/kg</Text>
                  <Text style={styles.mrpText}>300</Text>

                  <View style={styles.offerView}>
                    <Text style={styles.offerText}>-20%</Text>
                  </View>
                </View>
              </View>
              <View style={styles.totalAmtView}>
                <View style={styles.cardAmtSection}>
                  <Text style={styles.totalAmtText}>400</Text>
                </View>
              </View>
            </View>
          </View>
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  secondMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    gap: 10,
  },
  nameView: {
    // backgroundColor: 'blue',
    width: '50%',
    justifyContent: 'center',
    // paddingLeft: 5,
  },
  quntyView: {
    backgroundColor: colors.gray_textbox,
    flexDirection: 'row',
    width: '45%',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
  },
  actionButton: {
    backgroundColor: colors.white,
    borderRadius: 5,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productDetailsMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    gap: 10,
  },
  priceSectionView: {
    // backgroundColor: 'blue',
    width: '50%',
    justifyContent: 'center',
    paddingLeft: 5,
  },
  priceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  offerView: {
    backgroundColor: colors.yellow,
    marginRight: 5,
    width: '31%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 10,
  },
  totalAmtView: {
    // backgroundColor: colors.gray_textbox,
    flexDirection: 'row',
    width: '45%',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
  },
  cardAmtSection: {
    // backgroundColor: 'blue',
    flex: 1,
    alignItems: 'flex-end',
  },
  productName: {
    fontFamily: 'Lexend-Regular',
    fontSize: 18,
    fontWeight: '400',
    // lineHeight: 15,
    color: colors.black_Text,
  },
  qutnumberText: {
    fontFamily: 'Lexend-Regular',
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'center',
    lineHeight: 17,
  },
  productPriceText: {
    fontFamily: 'Lexend-SemiBold',
    fontWeight: '500',
    fontSize: 16,
    color: colors.black_Text,
  },
  mrpText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontSize: 18,
    fontFamily: 'Lexend-Regular',
    color: colors.gray_Text,
  },
  offerText: {
    fontFamily: 'Lexend-Regular',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 15,
    color: colors.white,
  },
  totalAmtText: {
    fontSize: 20,
    color: colors.black_Text,
  },
});

export default CartProducts;
