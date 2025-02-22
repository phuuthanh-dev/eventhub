import { Image, ImageBackground, StyleProp, View, ViewStyle } from 'react-native';
import React from 'react';
import CardComponent from './CardComponent';
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';
import { globalStyles } from '../styles/globalStyles';
import { appColors } from '../constants/appColors';
import { fontFamilies } from '../constants/fontFamilies';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { appInfo } from '../constants/appInfos';
import { EventModel } from '../models/EventModel';
import { useNavigation } from '@react-navigation/native';
import SpaceComponent from './SpaceComponent';
import { Location } from 'iconsax-react-native';
import AvatarGroup from './AvatarGroup';
import { DateTime } from '../utils/DateTime';
import { useSelector } from 'react-redux';
import { authSelector, AuthState } from '../redux/reducers/authReducer';
import { numberToString } from '../utils/numberToString';

interface Props {
    item: EventModel;
    type: 'list' | 'card';
    onPress?: () => void;
    styles?: StyleProp<ViewStyle>;
}

const EventItem = (props: Props) => {
    const { item, type, onPress, styles } = props;
    const navigation: any = useNavigation();
    const auth: AuthState = useSelector(authSelector);

    return (
        <CardComponent
            isShadow
            styles={[{
                width: type === 'card' ? appInfo.sizes.WIDTH * 0.7 : appInfo.sizes.WIDTH * 0.8
            }, styles]}
            onPress={() => navigation.navigate('EventDetail', { item })}
        >
            {type === 'card' ? (
                <>

                    <ImageBackground
                        style={{ flex: 1, marginBottom: 12, height: 131, padding: 10 }}
                        source={{ uri: item.photo }}
                        imageStyle={{
                            resizeMode: 'cover',
                            borderRadius: 12,
                        }}>
                        <RowComponent justify="space-between">
                            <CardComponent styles={[globalStyles.noSpaceCard]} color="#ffffffB3">
                                <TextComponent
                                    color={appColors.danger2}
                                    font={fontFamilies.bold}
                                    size={18}
                                    text={numberToString(new Date(item.date).getDate())}
                                />
                                <TextComponent
                                    color={appColors.danger2}
                                    font={fontFamilies.semiBold}
                                    size={10}
                                    text={appInfo.monthNames[
                                      new Date(item.date).getMonth()
                                    ].substring(0, 3).toUpperCase()}
                                />
                            </CardComponent>
                            {auth.follow_events && auth.follow_events.includes(item._id) && (
                                <CardComponent
                                    styles={[globalStyles.noSpaceCard]}
                                    color="#ffffffB3">
                                    <MaterialIcons
                                        name="bookmark"
                                        color={appColors.danger2}
                                        size={22}
                                    />
                                </CardComponent>
                            )}
                        </RowComponent>
                    </ImageBackground>
                    <TextComponent numberOfLine={1} text={item.title} title size={18} />
                    <AvatarGroup userIds={item.users}/>
                    <RowComponent>
                        <Location size={18} color={appColors.text3} variant="Bold" />
                        <SpaceComponent width={8} />
                        <TextComponent
                            flex={1}
                            numberOfLine={1}
                            text={item.locationAddress}
                            size={12}
                            color={appColors.text2}
                        />
                    </RowComponent>
                </>
            ) : (
                <>
                    <RowComponent>
                        <Image
                            source={{ uri: item.photo }}
                            style={{
                                width: 79,
                                height: 92,
                                borderRadius: 12,
                                resizeMode: 'cover',
                            }}
                        />
                        <SpaceComponent width={12} />
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'space-between',
                                height: '100%',
                            }}>
                            <TextComponent
                                color={appColors.primary}
                                text={`${DateTime.GetDayString(item.date)} • ${DateTime.GetTime(
                                    new Date(item.startAt),
                                )}`}
                            />
                            <TextComponent text={item.title} title size={19} numberOfLine={2} />
                            <RowComponent>
                                <Location size={18} color={appColors.text3} variant="Bold" />
                                <SpaceComponent width={8} />
                                <TextComponent
                                    flex={1}
                                    numberOfLine={1}
                                    text={item.locationAddress}
                                    size={12}
                                    color={appColors.text2}
                                />
                            </RowComponent>
                        </View>
                    </RowComponent>
                </>
            )}
        </CardComponent>
    );
};

export default EventItem;