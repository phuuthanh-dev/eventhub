import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonComponent, ContainerComponent, LoadingComponent } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { authSelector, AuthState, removeAuth } from '../../redux/reducers/authReducer';
import { HandleNotification } from '../../utils/handleNotification';
import { LoadingModal } from '../../modals';

const ProfileScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const auth: AuthState = useSelector(authSelector)

  const handleLogout = async () => {
    setIsLoading(true);
    const fcmToken = await AsyncStorage.getItem('fcmtoken');
    if (fcmToken) {
      if (auth.fcmTokens 
        // && auth.fcmTokens.length > 0
      ) {
        const items = [...auth.fcmTokens];
        const index = items.findIndex((token) => token === fcmToken);
        if (index !== -1) {
          items.splice(index, 1);
        }
        await HandleNotification.Update(auth.id, items);
      }
    }
    await GoogleSignin.signOut();
    await AsyncStorage.removeItem('auth');
    dispatch(removeAuth({}));
    setIsLoading(false);
  }
  return (
    <ContainerComponent back>
      <Text>Profile Screen</Text>
      <ButtonComponent type='primary' text="Logout" onPress={handleLogout} />
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
}

export default ProfileScreen;
