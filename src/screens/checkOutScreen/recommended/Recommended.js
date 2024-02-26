import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../../assets/general/colors/Colors';
import productData from '../../../assets/general/data/productData';
import recommendedData from '../../../assets/general/data/recommendedData';
import {
  horizontalScale,
  verticalScale,
} from '../../../assets/general/dimension/Dimension';
import Spacer from '../../../assets/general/emptySpacer/Spacer';

const Recommended = () => {
  const [active, setActive] = useState(0);
  const handleImageClick = index => {
    setActive(index);
  };

  const handleButtonPress = () => {
    console.warn('pressed');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Recommended</Text>
      <Spacer height={15}/>
      <FlatList
        horizontal={true}
        contentContainerStyle={{gap: 20, padding: 10}}
        showsHorizontalScrollIndicator={false}
        data={recommendedData}
        renderItem={({item, index}) => (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={[active === index && styles.activeStyle]}
              onPress={() => handleImageClick(index)}>
              <Image style={styles.productImage} source={item.product_image} />
            </TouchableOpacity>

            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.priceText}>₹{item.price}</Text>

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleButtonPress}>
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  headingText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Lexend-Regular',
    color: colors.black_Text,
  },
  productName: {
    fontFamily: 'Lexend-Regular',
    color: colors.black_Text,
  },
  priceText: {
    fontFamily: 'Lexend-Regular',
    color: colors.black_Text,
  },
  activeStyle: {
    borderWidth: 2,
    borderColor: colors.defalt_green,
    borderRadius: 10,
  },
  addButton: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.defalt_green,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  productImage: {
    width: horizontalScale(100),
    height: verticalScale(100),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  addText: {
    fontFamily: 'Lexend-Regular',
    fontSize: 15,
    color: colors.white,
  },
});



export default Recommended;
