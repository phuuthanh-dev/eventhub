import React, { useState } from 'react'
import { ButtonComponent, SectionComponent, SpaceComponent, TextComponent } from '../../../components'
import { appColors } from '../../../constants/appColors'
import { fontFamilies } from '../../../constants/fontFamilies'
import { Facebook, Google } from '../../../assets/svgs'
import { LoadingModal } from '../../../modals'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import authenticationAPI from '../../../apis/authApi'
import { useDispatch } from 'react-redux'
import { addAuth } from '../../../redux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Settings, Profile, LoginManager, AccessToken } from 'react-native-fbsdk-next'

GoogleSignin.configure({
  webClientId:
    '400448670928-sdlktvnumohhq05683m54hgee3vu03hb.apps.googleusercontent.com'
})
Settings.setAppID('886078313561951')

const SocialLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const api = `/google-signin`;
  const dispatch = useDispatch();

  const handleLoginWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo?.data?.user;
      setIsLoading(true);
      
      if (!user) {
        setIsLoading(false);
        return;
      }
      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        user,
        'post',
      );

      console.log(res);
      dispatch(addAuth(res.data));
      await AsyncStorage.setItem('auth', JSON.stringify(res.data));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  

  const handleLoginWithFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile'
      ]);

      if (result.isCancelled) {
        console.log('Login cancel');
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
          console.log('Something went wrong obtaining access token');
          return;
        }
        console.log(data);
        
        const profile = await Profile.getCurrentProfile();

        if (profile) {
          setIsLoading(true);
          const data = {
            name: profile.name,
            givenName: profile.firstName,
            familyName: profile.lastName,
            email: profile.userID,
            photo: profile.imageURL,
          };

          const res: any = await authenticationAPI.HandleAuthentication(
            api,
            data,
            'post',
          );

          dispatch(addAuth(res.data));

          await AsyncStorage.setItem('auth', JSON.stringify(res.data));

          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SectionComponent>
      <TextComponent
        styles={{ textAlign: 'center' }}
        text="OR"
        color={appColors.gray4}
        size={16}
        font={fontFamilies.medium}
      />
      <SpaceComponent height={16} />

      <ButtonComponent
        type="primary"
        onPress={handleLoginWithGoogle}
        color={appColors.white}
        textColor={appColors.text}
        text="Login with Google"
        textFont={fontFamilies.regular}
        iconFlex="left"
        icon={<Google />}
      />

      <ButtonComponent
        type="primary"
        color={appColors.white}
        textColor={appColors.text}
        text="Login with Facebook"
        textFont={fontFamilies.regular}
        onPress={handleLoginWithFacebook}
        iconFlex="left"
        icon={<Facebook />}
      />
      <LoadingModal visible={isLoading} />
    </SectionComponent>
  )
}

export default SocialLogin