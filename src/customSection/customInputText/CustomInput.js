import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../assets/general/colors/Colors';

const InputTextBox = props => {
  const {pText, width, fontSize, icon, eyePress, secureEntry,onChangeText} = props;

  return (
    <View
      // elevation={1}
      style={{
        borderWidth: 1,
        borderColor: colors.gray_border,
        borderRadius: 10,
        marginTop: 20,
        padding: 5,
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <TextInput
        style={{
          paddingLeft: 10,
          fontFamily: 'OpenSans-Regular',
          fontSize: fontSize,
          width: '90%',
          overflow: 'hidden',
         }}
        placeholder={pText}
        secureTextEntry={secureEntry}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={eyePress}>{icon}</TouchableOpacity>
    </View>
  );
};

export default InputTextBox;
