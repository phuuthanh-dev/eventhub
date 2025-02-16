import { Dimensions, ImageBackground } from 'react-native';
import React from 'react';
import CardComponent from './CardComponent';
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';
import { globalStyles } from '../styles/globalStyles';
import { appColors } from '../constants/appColors';
import { fontFamilies } from '../constants/fontFamilies';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { appInfo } from '../constants/appInfos';

interface Props {
    item: any;
    type: 'list' | 'card';
    onPress?: () => void;
}

const EventItem = (props: Props) => {
    const { item, type, onPress } = props;

    return type === 'card' ? (
        <CardComponent
            isShadow
            styles={{ width: appInfo.sizes.WIDTH * 0.7 }}
        >
            <ImageBackground
                style={{ flex: 1, marginBottom: 12, height: 131, padding: 10 }}
                source={require('../assets/images/event-image.png')}
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
                            text="10"
                        />
                        <TextComponent
                            color={appColors.danger2}
                            font={fontFamilies.semiBold}
                            size={10}
                            text="JUNE"
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
            <TextComponent
                numberOfLine={1}
                title
                size={18}
                text="International Band Music Concert"
            />
        </CardComponent>
    ) : (
        <></>
    );
};

export default EventItem;