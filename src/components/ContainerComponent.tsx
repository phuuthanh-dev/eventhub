import { View, ImageBackground, ScrollView, SafeAreaView, TouchableOpacity, StatusBar, Platform } from 'react-native'
import React, { ReactNode } from 'react'
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';
import { fontFamilies } from '../constants/fontFamilies';
import { ArrowLeft, Status } from 'iconsax-react-native';
import { appColors } from '../constants/appColors';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';

interface Props {
    isImageBackground?: boolean;
    isScroll?: boolean;
    title?: string;
    children: ReactNode;
    back?: boolean;
    right?: ReactNode;
}

const ContainerComponent = (props: Props) => {
    const { children, isScroll, isImageBackground, title, back, right } = props;

    const navigation: any = useNavigation();

    const headerComponent = () => {
        return (
            <View style={{ flex: 1 }}>
                {(title || back || right) && (
                    <RowComponent
                        styles={{
                            paddingHorizontal: 16,
                            paddingVertical: 10,
                            minWidth: 48,
                            minHeight: 48,
                            justifyContent: 'flex-start',
                        }}>
                        {back && (
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{ marginRight: 12 }}>
                                <ArrowLeft size={24} color={appColors.text} />
                            </TouchableOpacity>
                        )}
                        <View
                            style={{
                                flex: 1,
                            }}>
                            {title ? (
                                <TextComponent
                                    text={title}
                                    size={16}
                                    font={fontFamilies.medium}
                                    flex={1}
                                />
                            ) : (
                                <></>
                            )}
                        </View>
                        {right && right}
                    </RowComponent>
                )}
                {returnContainer}
            </View>
        );
    };

    const returnContainer = isScroll ? (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {children}
        </ScrollView>
    ) : (
        <View style={{ flex: 1 }}>{children}</View>
    );

    return isImageBackground ? (
        <ImageBackground
            source={require('../assets/images/splash-img.png')}
            style={{ flex: 1 }}
            imageStyle={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                {headerComponent()}
            </SafeAreaView>
        </ImageBackground>
    ) : (
        <SafeAreaView style={[globalStyles.container]}>
            <StatusBar barStyle={'dark-content'} />
            <View style={[
                globalStyles.container,
                { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }
            ]}>{headerComponent()}
            </View>
        </SafeAreaView>
    )
}

export default ContainerComponent