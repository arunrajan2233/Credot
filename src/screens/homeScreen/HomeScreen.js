import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  horizontalScale,
  verticalScale,
} from '../../assets/general/dimension/Dimension';
import {colors} from '../../assets/general/colors/Colors';
import Spacer from '../../assets/general/emptySpacer/Spacer';
import MenuSection from './menuSection/MenuSection';
import {useDispatch, useSelector} from 'react-redux';
import {signout} from '../../redux/action/Action';
 
const HomeScreen = () => {
  const email = useSelector(state => state.email);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(
      signout({
        mobile: '',
      }),
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewStyle}>
        <>
          <View style={styles.addressView}>
            <View style={styles.locationView}>
              <Ionicons
                name="location-outline"
                size={35}
                color={colors.defalt_green}
              />
              <Text style={styles.workText}>Work</Text>
              <AntDesign name="down" size={20} color={colors.black_Text} />
            </View>

            <View style={styles.imageView}>
              <Image
                style={styles.userImage}
                source={require('../../assets/images/user.jpeg')}
              />
            </View>
          </View>
          <View style={{width: '90%', paddingLeft: 45}}>
            <Text style={styles.addressText}>
              P.O. Box 3625. Sheikh Khalifa Bin Saeed Street Dubai. P.O. Box 901
            </Text>
          </View>
        </>
        <Spacer height={10} />
        <View style={styles.lineSeperator} />
        <Spacer height={30} />

        {/* <=============store Details===========> */}

        <View style={styles.storeDetailsView}>
          <View style={{marginRight: 10}}>
            <Image
              style={styles.storeImage}
              source={require('../../assets/images/store-logo.png')}
            />
          </View>
          <View style={{width: '90'}}>
            <Text style={styles.storeName}>Store 1</Text>

            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </View>
        </View>
        <Spacer height={20} />

        {/* <=============== Offer Section=================> */}

        <View style={styles.offerView}>
          <View style={styles.offerBoxView}>
            <MaterialCommunityIcons
              name="brightness-percent"
              size={40}
              color={colors.defalt_green}
            />
            <View>
              <Text style={styles.offerText}>60% OFF up to Rs120</Text>
              <Text style={styles.offerCodeText}>Use code ZCRICKET</Text>
            </View>
          </View>

          <View style={styles.offerBoxView}>
            <MaterialCommunityIcons
              name="brightness-percent"
              size={40}
              color={colors.defalt_green}
            />
            <View>
              <Text style={styles.offerText}>60% OFF up to Rs120</Text>
              <Text style={styles.offerCodeText}>Use code 60%OFF</Text>
            </View>
          </View>
        </View>
        <Spacer height={20} />

        {/* <============menu Section==============> */}
        <MenuSection />
      </ScrollView>
      <TouchableOpacity onPress={handleSignOut} style={styles.signoutBtn}>
        <Text style={styles.outText}>Sign Out</Text>
      </TouchableOpacity>
      <Spacer height={10} />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
    backgroundColor: colors.white,
  },
  scrollViewStyle: {
    paddingBottom: 60,
  },
  addressView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: 5,
  },
  locationView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  userImage: {
    width: horizontalScale(40),
    height: verticalScale(40),
    resizeMode: 'cover',
    borderRadius: 20,
  },
  workText: {
    fontFamily: 'Lexend-Regular',
    fontWeight: '400',
    fontSize: 18,
    color: colors.black_Text,
  },
  imageView: {
    borderRadius: 20,

    borderWidth: 3,
    borderColor: colors.defalt_green,
  },
  addressText: {
    fontFamily: 'Lexend-Regular',
    fontWeight: '400',
    fontSize: 14,
    color: colors.gray_Text,
  },
  lineSeperator: {
    width: '100%',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.gray_Text,
  },
  storeImage: {
    width: horizontalScale(80),
    height: verticalScale(80),
    resizeMode: 'cover',
    borderRadius: 10,
  },
  storeDetailsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginLeft: 20,
  },
  storeName: {
    fontFamily: 'Lexend-Regular',
    fontSize: 18,
    color: colors.black_Text,
    paddingBottom: 5,
    fontWeight: '400',
  },

  offerView: {
    flexDirection: 'row',
    gap: 30,
  },
  offerBoxView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: 10,
  },
  offerText: {
    fontFamily: 'Lexend-Regular',
    fontSize: 12,
    fontWeight: '600',
    color: colors.black_Text,
  },
  offerCodeText: {
    fontFamily: 'Lexend-Regular',
    fontSize: 12,
    fontWeight: '600',
    color: colors.black_Text,
  },
  signoutBtn: {
    width: '100%',
    backgroundColor: colors.defalt_green,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outText: {
    color: colors.white,
    fontSize: 18,
  },
});


export default HomeScreen;
