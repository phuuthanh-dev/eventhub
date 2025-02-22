import { View, Text, Image } from 'react-native'
import React from 'react'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent'
import { appColors } from '../constants/appColors'
import { fontFamilies } from '../constants/fontFamilies'
import SpaceComponent from './SpaceComponent'

interface Props {
    size?: number;
    userIds: string[];
}

const AvatarGroup = (props: Props) => {
    const { size, userIds } = props;
    const photoUrl =
        'https://gamek.mediacdn.vn/133514250583805952/2022/5/18/photo-1-16528608926331302726659.jpg';
    return (
        <RowComponent justify='flex-start' styles={{ marginVertical: 12 }}>
            {userIds.length > 0 && (
                <>
                    {userIds.map((item, index) => (
                        <Image
                            key={`img${index}`}
                            source={{ uri: photoUrl }}
                            style={{
                                width: size ?? 24,
                                height: size ?? 24,
                                borderRadius: 100,
                                borderWidth: 1,
                                borderColor: appColors.white,
                                marginLeft: index > 0 ? -8 : 0,
                            }}
                        />
                    ))}
                    <SpaceComponent width={10} />
                    <TextComponent
                        text='+20 going'
                        size={12 + (size ? (size - 24) / 5 : 0)}
                        color={appColors.primary}
                        font={fontFamilies.semiBold}
                    />
                </>
            )}
        </RowComponent>
    )
}

export default AvatarGroup