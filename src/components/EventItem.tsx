import { ImageBackground } from 'react-native';
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

interface Props {
    item: EventModel;
    type: 'list' | 'card';
    onPress?: () => void;
}

const EventItem = (props: Props) => {
    const { item, type, onPress } = props;
    const navigation: any = useNavigation();

    const startAt = new Date(item.startAt); 
    const day = startAt.getDate();
    const month = startAt.toLocaleString("en-US", { month: "short" }).toUpperCase();

    return type === 'card' ? (
        <CardComponent
            isShadow
            styles={{ width: appInfo.sizes.WIDTH * 0.7 }}
            onPress={() => navigation.navigate('EventDetail', { item })}
        >
            <ImageBackground
                style={{ flex: 1, marginBottom: 12, height: 131, padding: 10 }}
                source={{ uri: item.imageUrl }}
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
                            text={day.toString()}
                        />
                        <TextComponent
                            color={appColors.danger2}
                            font={fontFamilies.semiBold}
                            size={10}
                            text={month}
                        />
                    </CardComponent>
                    <CardComponent styles={[globalStyles.noSpaceCard]} color="#ffffffB3">
                        <MaterialIcons
                            name="bookmark"
                            color={appColors.danger2}
                            size={22}
                        />
                    </CardComponent>
                </RowComponent>
            </ImageBackground>
            <TextComponent numberOfLine={1} text={item.title} title size={18} />
            <AvatarGroup />
            <RowComponent>
                <Location size={18} color={appColors.text3} variant="Bold" />
                <SpaceComponent width={8} />
                <TextComponent
                    flex={1}
                    numberOfLine={1}
                    text={item.location.address}
                    size={12}
                    color={appColors.text2}
                />
            </RowComponent>
        </CardComponent>
    ) : (
        <></>
    );
};

export default EventItem;