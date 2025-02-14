import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ForgotPassword, LoginScreen, OnboardingScreen, SignUpScreen, Verification } from '../screens';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();

  // const [isExistingUser, setIsExistingUser] = useState(false);

  // useEffect(() => {
  //   checkUserExisting();
  // }, []);

  // const checkUserExisting = async () => {
  //   const res = await AsyncStorage.getItem('auth');

  //   res && setIsExistingUser(true);
  // };

  // console.log(isExistingUser);

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      {/* {
        !isExistingUser && */}
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      {/* } */}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  )
}

export default AuthNavigator