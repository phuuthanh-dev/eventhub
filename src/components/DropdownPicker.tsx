import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SelectModel } from '../models/SelectModel';
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';
import { globalStyles } from '../styles/globalStyles';
import SpaceComponent from './SpaceComponent';
import { appColors } from '../constants/appColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ArrowDown2, SearchNormal1 } from 'iconsax-react-native';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import ButtonComponent from './ButtonComponent';
import InputComponent from './InputComponent';
import { fontFamilies } from '../constants/fontFamilies';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
    label?: string;
    values: SelectModel[];
    selected?: string | string[];
    onSelect: (val: string | string[]) => void;
    multiple?: boolean;
}

const DropdownPicker = (props: Props) => {
    const { onSelect, selected, values, label, multiple } = props;
    const [searchKey, setSearchKey] = useState('');
    const [isVisibleModalize, setIsVisibleModalize] = useState(false);
    const modalieRef = useRef<Modalize>();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    useEffect(() => {
        if (isVisibleModalize) {
            modalieRef.current?.open();
        }
    }, [isVisibleModalize]);

    useEffect(() => {
        if (isVisibleModalize && selected) {
            setSelectedItems(multiple ? (selected as string[]) : []);
        }
    }, [isVisibleModalize, selected, multiple]);

    const handleSelectItem = (id: string) => {
        if (selectedItems.includes(id)) {
            const data = [...selectedItems];

            const index = selectedItems.findIndex(element => element === id);

            if (index !== -1) {
                data.splice(index, 1);
            }

            console.log('data', data);
            setSelectedItems(data);
            console.log('data', selectedItems);
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const renderSelectedItem = (id: string) => {
        const item = values.find(element => element.value === id);

        return item ? (
            <RowComponent key={id} styles={[localStyles.selectedItem]}>
                <TextComponent
                    text={`${item.label.includes('@') ? item.label.split('@')[0] : item.label
                        }`}
                    color={appColors.primary}
                />
                <SpaceComponent width={8} />
                <TouchableOpacity
                    onPress={() => {
                        console.log(selectedItems);

                        handleSelectItem(id);
                        onSelect(selectedItems);
                    }}>
                    <AntDesign name="close" size={18} color={appColors.text} />
                </TouchableOpacity>
            </RowComponent>
        ) : (
            <></>
        );
    };

    const renderSelectItem = (item: SelectModel) => {
        return (
            <RowComponent
                onPress={
                    multiple
                        ? () => handleSelectItem(item.value)
                        : () => {
                            onSelect(item.value);
                            modalieRef.current?.close();
                        }
                }
                key={item.value}
                styles={[localStyles.listItem]}>
                <View style={{ marginRight: 8 }}>
                    {item.photo ? (

                        <Image
                            source={{ uri: item.photo }}
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: 100,
                                borderWidth: 1,
                                borderColor: appColors.white,
                            }}
                        />
                    ) : (
                        <View
                            style={[localStyles.avatar, { backgroundColor: appColors.danger2 }]}>
                            <TextComponent
                                title
                                size={14}
                                color={appColors.white}
                                text={
                                    item.fullName
                                        ? item.fullName.toUpperCase()
                                            .split(' ')
                                        [item.fullName.split(' ').length - 1].substring(0, 1)
                                        : ''
                                }
                            />
                        </View>
                    )}
                </View>
                <TextComponent
                    text={item.fullName ?? item.label}
                    flex={1}
                    font={
                        selectedItems?.includes(item.value)
                            ? fontFamilies.medium
                            : fontFamilies.regular
                    }
                    color={
                        selectedItems?.includes(item.value)
                            ? appColors.primary
                            : appColors.text
                    }
                />
                {selectedItems.includes(item.value) && (
                    <MaterialCommunityIcons
                        name="checkbox-marked-circle-outline"
                        size={22}
                        color={appColors.primary}
                    />
                )}
            </RowComponent>
        );
    };

    return (
        <View style={{ marginBottom: 8 }}>
            {label && <TextComponent text={label} styles={{ marginBottom: 8 }} />}
            <RowComponent
                styles={[globalStyles.inputContainer, { alignItems: selectedItems.length > 0 ? 'flex-start' : 'center' }]}
                onPress={() => setIsVisibleModalize(true)}>
                <RowComponent styles={{ flex: 1, flexWrap: 'wrap' }}>
                    {selected ? (
                        selectedItems.length > 0 ? (
                            selectedItems.map(item => renderSelectedItem(item))
                        ) : (
                            <TextComponent
                                text={
                                    values.find(element => element.value === selected)?.label ??
                                    ''
                                }
                            />
                        )
                    ) : (
                        <TextComponent text="Select" />
                    )}
                </RowComponent>
                <ArrowDown2 size={22} color={appColors.gray} />
            </RowComponent>
            <Portal>
                <Modalize
                    adjustToContentHeight
                    childrenStyle={{ height: 800 }}
                    handlePosition="inside"
                    ref={modalieRef}
                    FooterComponent={
                        multiple && (
                            <View style={{ paddingHorizontal: 20, paddingBottom: 30 }}>
                                <ButtonComponent
                                    text="Agree"
                                    type="primary"
                                    onPress={() => {
                                        onSelect(selectedItems);
                                        modalieRef.current?.close();
                                    }}
                                />
                            </View>
                        )
                    }
                    scrollViewProps={{ showsVerticalScrollIndicator: false }}
                    HeaderComponent={
                        <RowComponent
                            styles={{
                                marginBottom: 12,
                                paddingHorizontal: 20,
                                paddingTop: 30,
                            }}>
                            <View style={{ flex: 1 }}>
                                <InputComponent
                                    styles={{ marginBottom: 0 }}
                                    placeholder="Search..."
                                    value={searchKey}
                                    onChange={val => setSearchKey(val)}
                                    allowClear
                                    affix={<SearchNormal1 size={22} color={appColors.text} />}
                                />
                            </View>
                            <SpaceComponent width={20} />
                            <ButtonComponent
                                type="link"
                                text="Cancel"
                                onPress={() => modalieRef.current?.close()}
                            />
                        </RowComponent>
                    }
                    onClose={() => setIsVisibleModalize(false)}
                >
                    <View style={{ paddingHorizontal: 20, paddingVertical: 30 }}>
                        {values.map(item => renderSelectItem(item))}
                    </View>
                </Modalize>
            </Portal>
        </View>
    )
}

export default DropdownPicker

const localStyles = StyleSheet.create({
    listItem: {
        marginBottom: 20,
    },
    selectedItem: {
        borderWidth: 0.5,
        borderColor: appColors.gray,
        padding: 4,
        marginBottom: 8,
        marginRight: 8,
        borderRadius: 8,
    },

    avatar: {
        width: 28,
        height: 28,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
});