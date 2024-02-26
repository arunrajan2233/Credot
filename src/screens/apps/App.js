import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../login/Login';
import SplashScreen from '../splashScreen/SplashScreen';
import {Provider, useSelector} from 'react-redux';
import {store} from '../../redux/store/Store';
import HomeScreen from '../homeScreen/HomeScreen';
import CheckOutScreen from '../checkOutScreen/CheckOutScreen';
import {SheetProvider} from 'react-native-actions-sheet';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const [loading, setLoading] = useState(true);

  const isLoggedIn = useSelector(state => state.isLoggedIn);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {loading ? (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        ) : isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />

            <Stack.Screen name="CheckOutScreen" component={CheckOutScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <SheetProvider>
        <StackNavigation />
      </SheetProvider>
    </Provider>
  );
};

export default App;
