import {
    View,
    StyleSheet,
    Platform,
    StatusBar,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import React from 'react';
import { AvatarComponent, RowComponent, SpaceComponent, TextComponent } from '.';
import { globalStyles } from '../styles/globalStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, AuthState, removeAuth } from '../redux/reducers/authReducer';
import { appColors } from '../constants/appColors';
import {
    Bookmark2,
    Calendar,
    Logout,
    Message2,
    MessageQuestion,
    Setting2,
    Sms,
    User,
} from 'iconsax-react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fontFamilies } from '../constants/fontFamilies';
import { HandleNotification } from '../utils/handleNotification';

const DrawerCustom = ({ navigation }: any) => {
    const auth: AuthState = useSelector(authSelector);
    const dispatch = useDispatch();
    const size = 20;
    const color = appColors.gray;
    const profileMenu = [
        {
            key: 'MyProfile',
            title: 'My Profile',
            icon: <User size={size} color={color} />,
        },
        {
            key: 'Message',
            title: 'Message',
            icon: <Message2 size={size} color={color} />,
        },
        {
            key: 'Calendar',
            title: 'Calendar',
            icon: <Calendar size={size} color={color} />,
        },
        {
            key: 'Bookmark',
            title: 'Bookmark',
            icon: <Bookmark2 size={size} color={color} />,
        },
        {
            key: 'ContactUs',
            title: 'Contact Us',
            icon: <Sms size={size} color={color} />,
        },
        {
            key: 'Settings',
            title: 'Settings',
            icon: <Setting2 size={size} color={color} />,
        },
        {
            key: 'HelpAndFAQs',
            title: 'Help & FAQs',
            icon: <MessageQuestion size={size} color={color} />,
        },
        {
            key: 'SignOut',
            title: 'Sign Out',
            icon: <Logout size={size} color={color} />,
        },
    ];

    const handleSignOut = async () => {
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
    };

    const handleNavigate = (key: string) => {
        switch (key) {
            case 'SignOut':
                handleSignOut();
                break;
            case 'MyProfile':
                navigation.navigate('HomeNavigator', {
                    screen: 'Profile',
                    params: {
                        id: auth.id,
                    },
                });
                break;
            default:
                break;
        }
        navigation.closeDrawer();
    }

    return (
        <View style={[localStyles.container]}>
            <AvatarComponent
                onPress={() => handleNavigate('MyProfile')}
                photoURL={auth.photo}
                name={auth.fullName ? auth.fullName : auth.email}
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={profileMenu}
                style={{ flex: 1, marginVertical: 20 }}
                renderItem={({ item, index }) => (
                    <RowComponent
                        styles={[localStyles.listItem]}
                        onPress={() => handleNavigate(item.key)}>
                        {item.icon}
                        <TextComponent
                            text={item.title}
                            styles={localStyles.listItemText}
                        />
                    </RowComponent>
                )}
            />
            <RowComponent justify="flex-start">
                <TouchableOpacity
                    style={[
                        globalStyles.button,
                        { backgroundColor: '#00F8FF33', height: 'auto' },
                    ]}>
                    <MaterialCommunityIcons name="crown" size={22} color={'#00F8FF'} />
                    <SpaceComponent width={8} />
                    <TextComponent color="#00F8FF" text="Upgrade Pro" font={fontFamilies.semiBold} />
                </TouchableOpacity>
            </RowComponent>
        </View>
    );
};

export default DrawerCustom;

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingVertical: Platform.OS === 'android' ? StatusBar.currentHeight : 48,
    },

    avatar: {
        width: 52,
        height: 52,
        borderRadius: 100,
        marginBottom: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    listItem: {
        paddingVertical: 12,
        justifyContent: 'flex-start',
    },

    listItemText: {
        paddingLeft: 12,
    },
});