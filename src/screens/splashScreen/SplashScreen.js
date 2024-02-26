import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
        <Image style={styles.logo} source={require("../../assets/images/logo.png")}/>
     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo:{
    width:"80%",
    height:100,
    resizeMode:"cover"
  }
});

export default SplashScreen;