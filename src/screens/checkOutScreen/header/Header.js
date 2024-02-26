import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../../assets/general/colors/Colors';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  const handleBackButton = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackButton} style={styles.arrowView}>
        <AntDesign name="arrowleft" size={30} color={colors.white} />
      </TouchableOpacity>
      <View style={styles.headingView}>
        <Text style={styles.headingText}>Your order</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green_level2,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingView: {
    flex: 2,
    paddingLeft: 20,
  },
  arrowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  headingText: {
    fontSize: 22,
    fontFamily: 'Lexend-SmemiBold',
    fontWeight: '400',
    color: colors.white,
  },
});

export default Header;
