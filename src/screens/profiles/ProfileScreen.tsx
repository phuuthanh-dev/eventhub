import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AvatarComponent, ButtonComponent, ContainerComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components';
import { authSelector, AuthState } from '../../redux/reducers/authReducer';
import { LoadingModal } from '../../modals';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { appColors } from '../../constants/appColors';
import { globalStyles } from '../../styles/globalStyles';
import { ProfileModel } from '../../models/ProfileModel';
import userAPI from '../../apis/userApi';
import AboutProfile from './components/AboutProfile';
import EditProfile from './components/EditProfile';

const ProfileScreen = ({ navigation, route }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileModel>();
  const [profileId, setProfileId] = useState('');
  const [userFollowers, setUserFollowers] = useState<string[]>([]);
  const dispatch = useDispatch();
  const auth: AuthState = useSelector(authSelector)
  
  useEffect(() => {
    if (route.params) {
      const { id } = route.params;
      
      setProfileId(id);

      if (profileId && route.params.isUpdated) {
        getProfile();
      }
    } else {
      setProfileId(auth.id);
    }
  }, [route.params]);

  useEffect(() => {
    if (profileId) {
      getProfile();
      getFollowersByUid();
    }
  }, [profileId]);


  const getProfile = async () => {
    const api = `/get-profile?uid=${profileId}`;

    setIsLoading(true);
    try {
      const res = await userAPI.HandleUser(api);
      res && res.data && setProfile(res.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getFollowersByUid = async () => {
    const api = `/get-followers?uid=${profileId}`;

    try {
      const res = await userAPI.HandleUser(api);
      
      setUserFollowers(res.data);
    } catch (error) {
      console.log();
    }
  };
  
  return (
    <ContainerComponent
      back
      title={route.params ? '' : 'Profile'}
      right={
        <ButtonComponent
          icon={
            <MaterialIcons
              name="more-vert"
              size={24}
              color={appColors.text}
              onPress={() => { }}
            />
          }
        />
      }>
      {isLoading ? (
        <ActivityIndicator />
      ) : profile ? (
        <>
          <SectionComponent styles={[globalStyles.center]}>
            <RowComponent>
              <AvatarComponent
                photoURL={profile.photo}
                name={profile.fullName ? profile.fullName : profile.email}
                size={120}
              />
            </RowComponent>
            <SpaceComponent height={16} />
            <TextComponent
              text={
                profile.fullName
                  ? profile.fullName
                  : profile.email
              }
              title
              size={24}
            />
            <SpaceComponent height={16} />
            <RowComponent>
              <View style={[globalStyles.center, { flex: 1 }]}>
                <TextComponent
                  title
                  text={`${profile.following.length}`}
                  size={20}
                />
                <SpaceComponent height={8} />
                <TextComponent text="Following" />
              </View>
              <View
                style={{
                  backgroundColor: appColors.gray2,
                  width: 1,
                  height: '100%',
                }}
              />
              <View style={[globalStyles.center, { flex: 1 }]}>
                <TextComponent
                  title
                  text={`${userFollowers.length}`}
                  size={20}
                />
                <SpaceComponent height={8} />
                <TextComponent text="Followers" />
              </View>
            </RowComponent>
          </SectionComponent>
          {auth.id !== profileId ? (
            <AboutProfile profile={profile} />
          ) : (
            <EditProfile profile={profile} />
          )}
        </>
      ) : (
        <TextComponent text="profile not found!" />
      )}
    </ContainerComponent>
  );
}

export default ProfileScreen;
