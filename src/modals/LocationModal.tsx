import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, TouchableOpacity, View } from 'react-native';
import { ButtonComponent, InputComponent, RowComponent, SpaceComponent, TextComponent } from '../components';
import { Location, SearchNormal1 } from 'iconsax-react-native';
import { appColors } from '../constants/appColors';
import axios from 'axios';
import { LocationModel } from '../models/LocationModel';
import MapboxGL from '@rnmapbox/maps';
import { appInfo } from '../constants/appInfos';
import Geolocation from '@react-native-community/geolocation';
import { Point } from 'geojson';
MapboxGL.setAccessToken('sk.eyJ1IjoicGh1dXRoYW5oMjAwMyIsImEiOiJjbTc5Y2Z4ODYwM2V1MmpzYnI2cWlwczk4In0.HCFxP4ZSrH1-rxPAAZQcvA');
interface Props {
    visible: boolean;
    onClose: () => void;
    onSelect: (val: {
        address: string;
        postion?: {
            lat: number;
            long: number;
        };
    }) => void;
}

const LocationModal = (props: Props) => {
    const { visible, onClose, onSelect } = props;
    const [searchKey, setSearchKey] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [locations, setLocations] = useState<LocationModel[]>([]);
    const [addressSelected, setAddressSelected] = useState('');
    const cameraRef = useRef<MapboxGL.Camera>(null);
    const [myLocation, setMyLocation] = useState<{
        lat: number;
        long: number;
    }>();
    const [currentLocation, setCurrentLocation] = useState<{
        lat: number;
        long: number;
    }>();

    useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                if (position.coords) {
                    setCurrentLocation({
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                    });
                    setMyLocation({
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                    });
                }
            },
            error => {
                console.log(error);
            },
            {},
        );
    }, []);

    // useEffect(() => {
    //     GeoCoder.from(addressSelected)
    //         .then(res => {
    //             const position = res.results[0].geometry.location;

    //             setCurrentLocation({
    //                 lat: position.lat,
    //                 long: position.lng,
    //             });
    //         })
    //         .catch(error => console.log(error));
    // }, [addressSelected]);
    useEffect(() => {
        if (addressSelected) {
            axios
                .get(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(addressSelected)}.json?access_token=sk.eyJ1IjoicGh1dXRoYW5oMjAwMyIsImEiOiJjbTc5Y2Z4ODYwM2V1MmpzYnI2cWlwczk4In0.HCFxP4ZSrH1-rxPAAZQcvA`
                )
                .then(res => {
                    const position = res.data.features[0]?.geometry.coordinates;

                    if (position) {
                        setCurrentLocation({
                            lat: position[1],
                            long: position[0],
                        });
                    }
                })
                .catch(error => console.log('Error fetching location:', error));
        }
    }, [addressSelected]);

    useEffect(() => {
        if (!searchKey) {
            setLocations([]);
        }
    }, [searchKey]);

    const handleClose = () => {
        onClose();
    }

    const handleSearchLocation = async () => {
        const api = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${searchKey}&limit=20&apiKey=ND_BCtN0BgNSPdQHs6flCyEqiQWpW4zDUx6x7oeZUIY`;
        try {
            setIsLoading(true);
            const res = await axios.get(api);

            if (res && res.data && res.status === 200) {
                setLocations(res.data.items);
            }

            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const handleGetAddressFromPosition = async ({
        latitude,
        longitude,
    }: {
        latitude: number;
        longitude: number;
    }) => {
        try {
            const res = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=sk.eyJ1IjoicGh1dXRoYW5oMjAwMyIsImEiOiJjbTc5Y2Z4ODYwM2V1MmpzYnI2cWlwczk4In0.HCFxP4ZSrH1-rxPAAZQcvA`
            );

            const address = res.data.features[0]?.place_name || 'Unknown Address';
            onSelect({
                address,
                postion: { lat: latitude, long: longitude },
            });
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    const goToCurrentLocation = () => {
        if (cameraRef.current) {
            cameraRef.current.flyTo(
                [myLocation?.long ?? 0, myLocation?.lat ?? 0],
                1000
            );
        }
    };
    return (
        <Modal animationType="slide" visible={visible} style={{ flex: 1 }}>
            <View style={{ paddingVertical: 42 }}>
                <RowComponent
                    justify="flex-end"
                    styles={{ marginVertical: 20, paddingHorizontal: 20 }}>
                    <View style={{ flex: 1 }}>
                        <InputComponent
                            styles={{ marginBottom: 0 }}
                            affix={<SearchNormal1 size={20} color={appColors.gray} />}
                            placeholder="Search"
                            value={searchKey}
                            allowClear
                            onChange={val => setSearchKey(val)}
                            onEnd={handleSearchLocation}
                        />
                    </View>

                    <View style={{
                        position: 'absolute',
                        top: 56,
                        right: 10,
                        left: 10,
                        backgroundColor: appColors.white,
                        zIndex: 5,
                        padding: 20,
                    }}>
                        {isLoading ? <ActivityIndicator /> : locations.length > 0 ? (
                            <FlatList
                                data={locations}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={{ marginBottom: 12 }}
                                        onPress={() => {
                                            setAddressSelected(item.address.label);
                                            setSearchKey('');
                                        }}>
                                        <TextComponent text={item.address.label} />
                                    </TouchableOpacity>
                                )}
                            />
                        ) : (
                            <View>
                                <TextComponent
                                    text={searchKey ? 'Location not found' : 'Search location'}
                                />
                            </View>
                        )}
                    </View>
                    <SpaceComponent width={12} />
                    <ButtonComponent text="Cancel" type="link" onPress={handleClose} />
                </RowComponent>
                {currentLocation && (

                    <MapboxGL.MapView
                        style={{
                            width: appInfo.sizes.WIDTH,
                            height: appInfo.sizes.HEIGHT - 220,
                            marginVertical: 40,
                            zIndex: -1,
                        }}
                        logoEnabled={false}
                        onPress={(event) => {

                            const pointGeometry = event.geometry as Point;
                            const coordinates = {
                                latitude: pointGeometry.coordinates[1],
                                longitude: pointGeometry.coordinates[0],
                            };
                            handleGetAddressFromPosition(coordinates);
                        }}
                    >
                        <MapboxGL.Camera
                            ref={cameraRef}
                            zoomLevel={14}
                            centerCoordinate={[
                                currentLocation?.long ?? 0,
                                currentLocation?.lat ?? 0
                            ]}
                            animationMode="flyTo"
                            animationDuration={1000}
                        />
                        <MapboxGL.UserLocation />
                    </MapboxGL.MapView>
                )}
                <View
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        left: 0,
                        right: 0,
                    }}>
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            bottom: 120,
                            right: 20,
                            backgroundColor: appColors.primary,
                            padding: 10,
                            borderRadius: 25,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 2,
                            elevation: 5,
                        }}
                        onPress={goToCurrentLocation}>
                        <Location size="32" color={appColors.white} />
                    </TouchableOpacity>
                    <ButtonComponent
                        styles={{ marginBottom: 40 }}
                        text="Confirm"
                        onPress={() => {
                            onSelect({
                                address: addressSelected,
                                postion: currentLocation,
                            });

                            onClose();
                        }}
                        type="primary"
                    />
                </View>
            </View>
        </Modal>
    );
};

export default LocationModal;