import { View, Text, Button } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { removeAuth } from '../../redux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

const HomeScreen = () => {
  const dispatch = useDispatch()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HomeScreen</Text>
      <Button
        title="Logout"
        onPress={async () => {
          const authData = await AsyncStorage.getItem('auth');
          if (authData) {
            const parsedAuth = JSON.parse(authData);
            parsedAuth.accessToken = '';
            await AsyncStorage.setItem('auth', JSON.stringify(parsedAuth));
          }
          await GoogleSignin.signOut();
          dispatch(removeAuth({}))
        }}
      />
    </View>
  )
}

export default HomeScreen