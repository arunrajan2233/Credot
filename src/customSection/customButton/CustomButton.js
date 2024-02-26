import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../assets/general/colors';

const Button = props => {
  const {pText, bgColor, icon, width, fontSize, fColor, padding, onpress} =
    props;
  return (
    <View style={{width: width,}}>
      <TouchableOpacity
        onPress={onpress}
        style={{
          backgroundColor: bgColor,
          padding: padding,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
        }}>
        <View>{icon}</View>
        <Text
          style={{
            fontFamily: 'Lexend-Regular',
            color: fColor,
            fontSize: fontSize,
            
          }}>
          {pText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
