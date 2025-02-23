import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { ProfileModel } from '../../models/ProfileModel';
import {
    AvatarComponent,
    ButtonComponent,
    ContainerComponent,
    InputComponent,
    RowComponent,
    SectionComponent,
    SpaceComponent,
    TextComponent,
} from '../../components';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from '@react-native-firebase/storage';
import { LoadingModal } from '../../modals';
import userAPI from '../../apis/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { addAuth, authSelector, AuthState } from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonImagePicker from '../../components/ButtonImagePicker';
import { getApp } from '@react-native-firebase/app';

const EditProfileScreen = ({ navigation, route }: any) => {
    const { profile }: { profile: ProfileModel } = route.params;

    const [fileSelected, setFileSelected] = useState<any>();
    const [profileData, setProfileData] = useState<ProfileModel>(profile);
    const [isLoading, setIsLoading] = useState(false);

    const auth: AuthState = useSelector(authSelector);
    const dispatch = useDispatch();

    const handleFileSelected = (val: ImageOrVideo) => {
        setFileSelected(val);
        handleChangeValue('photo', val.path);
    };

    const handleChangeValue = (key: string, value: string | Date | string[]) => {
        const items: any = { ...profileData };

        items[`${key}`] = value;

        setProfileData(items);
    };

    const onUpdateProfile = async () => {
        if (fileSelected) {
            const filename = `${fileSelected.filename ?? `image-${Date.now()}`}`;
            const path = `images/${filename}`;
            const app = getApp();
            const storage = getStorage(app);
            const storageRef = ref(storage, path);
            const response = await fetch(fileSelected.path);
            const blob = await response.blob();

            const uploadTask = uploadBytesResumable(storageRef, blob);

            uploadTask.on(
                'state_changed',
                snapshot => {
                    console.log(snapshot.bytesTransferred);
                },
                error => {
                    console.log(error);
                },
                async () => {
                    if (uploadTask.snapshot) {
                        const url = await getDownloadURL(uploadTask.snapshot.ref);

                        profileData.photo = url;
                        handleUpdateProfile(profileData);
                    }
                },
            );
        } else {
            handleUpdateProfile(profileData);
        }
    };

    const handleUpdateProfile = async (data: ProfileModel) => {
        const api = `/update-profile?uid=${profile.uid}`;

        const newData = {
            bio: data.bio ?? '',
            fullName: data.fullName ?? '',
            photo: data.photo ?? '',
        };

        setIsLoading(true);

        try {
            const res = await userAPI.HandleUser(api, newData, 'put');
            setIsLoading(false);

            const authData = { ...auth, photo: data.photo ?? '' };

            await AsyncStorage.setItem('auth', JSON.stringify(authData));
            dispatch(addAuth(authData));

            navigation.navigate('ProfileScreen', {
                isUpdated: true,
                id: profile.uid,
            });
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    return (
        <ContainerComponent isScroll back title={profile.fullName}>
            <SectionComponent>
                <RowComponent>
                    <AvatarComponent
                        photoURL={profileData.photo}
                        name={profileData.fullName ? profileData.fullName : profileData.email}
                        size={120}
                    />
                </RowComponent>
                <SpaceComponent height={16} />
                <RowComponent>
                    <ButtonImagePicker
                        onSelect={(val: any) =>
                            val.type === 'url'
                                ? handleChangeValue('photo', val.value as string)
                                : handleFileSelected(val.value)
                        }
                    />
                </RowComponent>
                <TextComponent text='Họ và tên' size={14} styles={{ marginBottom: 8 }} />
                <InputComponent
                    placeholder="Full name"
                    allowClear
                    value={profileData.fullName}
                    onChange={val => handleChangeValue('fullName', val)}
                />
                <TextComponent text='Giới thiệu' size={14} styles={{ marginBottom: 8 }} />
                <InputComponent
                    placeholder="Giới thiệu"
                    allowClear
                    value={profileData.bio}
                    multiline
                    numberOfLines={5}
                    onChange={val => handleChangeValue('bio', val)}
                />
            </SectionComponent>
            <ButtonComponent
                disable={profileData === profile}
                text="Update"
                onPress={onUpdateProfile}
                type="primary"
            />

            <LoadingModal visible={isLoading} />
        </ContainerComponent>
    );
};

export default EditProfileScreen;