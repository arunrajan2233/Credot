import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, ImageBackground} from 'react-native';
import {verticalScale} from '../../assets/general/dimension/Dimension';
import InputTextBox from '../../customSection/customInputText/CustomInput';
import {colors} from '../../assets/general/colors/Colors';
import Spacer from '../../assets/general/emptySpacer/Spacer';
import Button from '../../customSection/customButton/CustomButton';
import Entypo from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import {useNavigation} from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/action/Action';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);
  const [userDetails, setUserDetails] = useState([]);

  const navigation = useNavigation();
  const dispatch=useDispatch();
 
  useEffect(()=>{
    getUsersData();
  },[])
  
    // <=============get userId============>
  
  const getUsersData = async () => {
    await firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(snapshot => {
          let data = snapshot.data();
          setUserDetails(data);
          
        });
      });
  };


  // <=========eye button Chanhe===========>
  const eyePress = () => {
    setSecureEntry(!secureEntry);
  };

  // <===========Login check==============>

  const handleBtnPress = async () => {
    if (userName.trim() !== '' && password.trim() !== '') {
      try {
        const loginResult = await firestore()
          .collection('users')
          .where('mobile', '==', userName.trim())
          .where('password', '==', password.trim())
          .get();

        if (!loginResult.empty) {
          Snackbar.show({
            text: 'User successfully logged in',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.defalt_green,
            textColor: 'white',
          });


          dispatch(login({
              mobile:userName.trim(),
               
          }))

          navigation.navigate('Home');
        } else {
          Snackbar.show({
            text: 'Invalid email or password',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: 'red',
            textColor: 'white',
          });
        }
      } catch (error) {
        console.error('Error:', error);
        Snackbar.show({
          text: 'An error occurred while processing your request',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: 'red',
          textColor: 'white',
        });
      }
    } else {
      Snackbar.show({
        text: 'Please Fill All Details',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'red',
        textColor: 'white',
      });
    }
  };

  return (
    <View style={styles.MainView}>
      <ImageBackground
        style={styles.loginImages}
        source={require('../../assets/images/login-2.png')}>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>LOGIN</Text>
          <InputTextBox
            onChangeText={text => setUserName(text)}
            width={'90%'}
            pText={'Mobile'}
            fontSize={18}

          />

          <InputTextBox
            onChangeText={text => setPassword(text)}
            secureEntry={secureEntry}
            eyePress={eyePress}
            width={'90%'}
            fontSize={18}
            pText={'password'}
            icon={
              secureEntry ? (
                <Entypo
                  name="eye-with-line"
                  size={20}
                  color={colors.black_Text}
                />
              ) : (
                <Entypo name="eye" size={20} color={colors.black_Text} />
              )
            }
          />
          <Spacer height={30} />
          <Button
            fColor={colors.white}
            fontSize={25}
            width={'50%'}
            bgColor={colors.defalt_green}
            pText={'Login'}
            padding={10}
            onpress={handleBtnPress}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  loginImages: {
    width: '100%',
    height: verticalScale(450),
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: '85%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    fontFamily: 'Lexend-Bold',
    fontSize: 20,
    color: colors.green_level2,
  },
});

export default Login;
