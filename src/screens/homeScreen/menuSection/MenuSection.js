import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  horizontalScale,
  verticalScale,
} from '../../../assets/general/dimension/Dimension';
import {colors} from '../../../assets/general/colors/Colors';
import productData from '../../../assets/general/data/productData';
import Spacer from '../../../assets/general/emptySpacer/Spacer';
import Entypo from 'react-native-vector-icons/Entypo';
import ActionSheet from 'react-native-actions-sheet';
import {addToCart, updateQuantity} from '../../../redux/action/Action';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const MenuSection = () => {
  const [active, setActive] = useState(null);
  const [activeData, setActiveData] = useState([]);
  const [cardActive, setCardActive] = useState(null);
  const [actionsheetData, setActionSheetData] = useState({
    qunt: 0,
    price: 0,
    offer: 0,
    name: '',
    mrp: 0,
  });

  const [productName,setProductName]=useState('');
  const [qunt,setQunt]=useState('');
  const[price,setPrice]=useState('');
  const[mrp,setMrp]=useState('');
  const [offer,setOffer]=useState('');
  const[pid,setPid]=useState("");

 

 
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userId = useSelector(state => state.userId);

 
  const handleMinusQunt = index => {
    setActiveData(prevState => {
      const newData = [...prevState];
      if (newData[index].quantity > 0) {
        newData[index].quantity -= 1;
        // dispatch(updateQuantity(newData[index].id, newData[index].quantity));
      }
      return newData;
    });
  };

  const handlePlusQunt = index => {
    setActiveData(prevState => {
      const newData = [...prevState];
      newData[index].quantity += 1;
      // dispatch(updateQuantity(newData[index].id, newData[index].quantity));
      return newData;
    });
  };

  const actionSheetRef = useRef();
  useEffect(() => {
    if (productData.length > 0) {
      setActive(productData[0].name);
      // setActiveData(productData[0]?.product || []);
      setActiveData(
        productData[0]?.product?.map(item => ({...item, quantity: 0})) || [],
      );
    }
  }, []);

  const handleMenuPress = item => {

    setMrp(item.mrp);
    setOffer(item.offer);
    setPrice(item.price);
    setProductName(item.name);
    setQunt(item.quantity);
 
    setActive(item.name);
     // setActiveData(item.product || []);
    setActiveData(item.product?.map(item => ({...item, quantity: 0})) || []);
  };

  // *****************************

  const handleCardTouch = item => {
    setCardActive(item.name);
    setActionSheetData({
      qunt: item.quantity,
      price: item.price * item.quantity,
      name: item.name,
      offer: item.offer,
    });
    actionSheetRef.current?.show();
  };

  // <============= Add To Cart================>

  const handleAddToCart = async() => {
 

console.warn( actionsheetData.price);


    await firestore()
    .collection('cart')
    .where('userId', '==', userId)
     .get()
    .then(snapshot => {
       snapshot.docs.length
      if (snapshot.empty) {
        firestore()
          .collection('cart')
          .add({
            created: Date.now(),
            updated: Date.now(),
              price:price,
            quantity: qunt,
            userId: userId,
             offer:offer,
             mrp:mrp
          })
          .catch(err => console.warn(err));
        // dispatch(updateCartCount(cartCount + 1));
      } else {
        firestore()
          .collection('cart')
          .doc(snapshot?.docs[0].id)
          .update({
            qunt:
              parseInt(snapshot?.docs[0].data().quantity, 10) + qunt,
          });
      }
    });

    dispatch(addToCart(activeData));

    navigation.navigate('CheckOutScreen');
  };


  
 

  return (
    <View>
      <ActionSheet
        containerStyle={{backgroundColor: colors.green_level2}}
        ref={actionSheetRef}>
        <View
          style={styles.actionSheetView}>
          <View style={styles.secondView}>
            <Text style={styles.itemqunt}>
              {actionsheetData.qunt}items
            </Text>
            <Text
              style={styles.priceText}>
              ₹ {actionsheetData.price}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleAddToCart}
            style={styles.checkOutbtn}>
            <Text
              style={{
                fontFamily: 'Lexend-SemiBold',
                fontSize: 18,
                fontWeight: '400',
                color: colors.black_Text,
              }}>
              Check-Out
            </Text>
            <Entypo name="shopping-cart" size={25} color="green" />
          </TouchableOpacity>
        </View>
      </ActionSheet>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListStyle}
        data={productData}
        renderItem={({item}) => (
          <View style={styles.menuContainer}>
            <TouchableOpacity
              onPress={() => handleMenuPress(item)}
              style={[
                styles.menuImageContainer,
                active === item.name && styles.activeMenuImageContainer,
              ]}>
              <Image style={styles.menuImage} source={item.image} />
            </TouchableOpacity>
            <Text style={styles.menuName}>{item.name}</Text>
          </View>
        )}
      />
      {/* <================product Listing===============> */}
      <Spacer height={20} />

      <View style={styles.cardMainView}>
        {activeData.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              handleCardTouch(item);
            }}
            style={[
              cardActive === item.name
                ? styles.cardSecondActiveView
                : styles.cardSecondView,
            ]}
            key={index}>
            <View style={styles.productImageView}>
              <Image style={styles.productImage} source={item.product_image} />
            </View>

            <View>
              <Text style={styles.productName}>{item?.name}</Text>
              <View style={styles.productDetailsView}>
                <View style={styles.priceView}>
                  <Text style={styles.priceText}>
                    ₹ {item?.price}/<Text>{item?.unit}</Text>
                  </Text>
                  <Text style={styles.mprText}>₹ {item?.mrp}</Text>
                </View>
                <View style={styles.offerSectionView}>
                  <Text style={styles.offerText}>-{item?.offer}</Text>
                </View>
              </View>

              {/* <============cart Section==========> */}
              <View style={styles.productQuntView}>
                <TouchableOpacity
                  onPress={() => {
                    handleMinusQunt(index);
                  }}
                  style={styles.productQuntBtn}>
                  <Entypo name="minus" size={25} color={colors.defalt_green} />
                </TouchableOpacity>
                <Text style={styles.quntText}>{item?.quantity} Nos</Text>

                <TouchableOpacity
                  onPress={() => {
                    handlePlusQunt(index);
                  }}
                  style={styles.productQuntBtn}>
                  <Entypo name="plus" size={25} color={colors.defalt_green} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  menuContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  menuImageContainer: {
    borderRadius: 15,
  },
  activeMenuImageContainer: {
    borderWidth: 3,
    borderColor: colors.defalt_green,
    // backgroundColor: colors.defalt_green,
  },
  menuImage: {
    width: horizontalScale(70),
    height: verticalScale(70),
    resizeMode: 'cover',
    borderRadius: 10,
  },
  flatListStyle: {
    gap: 15,
  },
  menuName: {
    fontFamily: 'Lexend-Regular',
    fontSize: 13,
    fontWeight: '400',
    color: colors.black_Text,
  },
  productImage: {
    width: horizontalScale(100),
    height: verticalScale(90),
    resizeMode: 'contain',
  },
  cardMainView: {
    gap: 20,
  },
  cardSecondView: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    borderRadius: 20,
    padding: 10,
    // borderWidth: 1,
  },
  cardSecondActiveView: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    borderRadius: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: colors.defalt_green,
  },
  productImageView: {
    // backgroundColor: 'red',
    borderRadius: 20,
  },
  productDetailsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'blue',
    width: '85%',
  },
  mprText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontSize: 16,
    fontFamily: 'Lexend-Regular',
    color: colors.gray_Text,
  },
  offerSectionView: {
    backgroundColor: colors.yellow,
    width: '18%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderRadius: 10,
    opacity: 0.9,
  },
  productQuntView: {
    width: '80%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.gray_textbox,
    padding: 10,
    borderRadius: 10,
  },
  productQuntBtn: {
    backgroundColor: colors.white,
    width: '20%',
    padding: 4,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productName: {
    fontFamily: 'Lexend-Regular',
    fontWeight: '400',
    fontSize: 16,
    color: colors.black_Text,
    lineHeight: 15,
  },
  priceText: {
    fontFamily: 'Lexend-SemiBold',
    fontWeight: '500',
    fontSize: 16,
    color: colors.black_Text,
  },
  offerText: {
    fontFamily: 'Lexend-Regular',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 15,
    color: colors.white,
  },
  priceView: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 5,
  },
  buttontext: {
    fontFamily: 'Lexend-Bold',
    fontSize: 20,
    color: colors.defalt_green,
  },
  quntText: {
    fontFamily: 'Lexend-Regular',
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'center',
    lineHeight: 17,
  },
  actionSheetView: {
    flexDirection: 'row',
    paddingBottom: 20,
    paddingTop: 20,
    borderRadius: 25,
  },
  secondView: {
    width: '45%',
    marginLeft: 20,
  },
  itemqunt: {
    fontSize: 20,
    color: colors.white,
  },
  priceText: {
    fontSize: 24,
    color: colors.white,
    fontWeight: '800',
  },
  checkOutbtn:{
    backgroundColor: colors.white,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    borderRadius: 15,
  }
});


export default MenuSection;
