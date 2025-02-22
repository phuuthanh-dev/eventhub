import React, { useEffect, useRef, useState } from 'react'
import MapboxGL from '@rnmapbox/maps';
import { appInfo } from '../../constants/appInfos';
import { Point } from 'geojson';
import Geolocation from '@react-native-community/geolocation';
import { FlatList, StatusBar, TouchableOpacity, View } from 'react-native';
import { CardComponent, CategoriesList, EventItem, InputComponent, MarkerCustom, RowComponent, SpaceComponent } from '../../components';
import { globalStyles } from '../../styles/globalStyles';
import { appColors } from '../../constants/appColors';
import { ArrowLeft2 } from 'iconsax-react-native';
import { MaterialIcons } from '@expo/vector-icons';
import eventAPI from '../../apis/eventApi';
import { EventModel } from '../../models/EventModel';

MapboxGL.setAccessToken(process.env.MAPBOX_ACCESS_TOKEN);

const MapScreen = ({ navigation }: any) => {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    long: number;
  }>();
  const cameraRef = useRef<MapboxGL.Camera>(null);
  const [events, setEvents] = useState<EventModel[]>([]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        if (position.coords) {
          setCurrentLocation({
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

  useEffect(() => {
    currentLocation && getNearbyEvents();
  }, [currentLocation]);

  const getNearbyEvents = async () => {
    const api = `/get-events?lat=${currentLocation?.lat}&long=${currentLocation?.long
      }&distance=${5}`;
    try {
      const res = await eventAPI.HandleEvent(api);

      setEvents(res.data);
    } catch (error) {
      console.log(error)

    }
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      {currentLocation ? (
        <MapboxGL.MapView
          styleURL={MapboxGL.StyleURL.Outdoors}
          style={{
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT
          }}
          logoEnabled={false}
          onPress={(event) => {
            const pointGeometry = event.geometry as Point;
            const coordinates = {
              latitude: pointGeometry.coordinates[1],
              longitude: pointGeometry.coordinates[0],
            };
            // handleGetAddressFromPosition(coordinates);
          }}
        >
          <MapboxGL.Camera
            ref={cameraRef}
            zoomLevel={14}
            centerCoordinate={[
              currentLocation.long ?? 0,
              currentLocation.lat ?? 0
            ]}
            animationMode="none"
            animationDuration={1000}
          />
          <MapboxGL.UserLocation />
          {events.length > 0 &&
            events.map((event, index) => (
              <MapboxGL.MarkerView
                key={`event-${index}`}
                id="marker"
                coordinate={[
                  event.position.long,
                  event.position.lat
                ]}
              >
                  <MarkerCustom type="sport" onPress={() => console.log('Marker pressed:', event.title)} />
              </MapboxGL.MarkerView>
            ))}
        </MapboxGL.MapView>
      ) : <></>}
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          top: 0,
          right: 0,
          left: 0,
          padding: 20,
          paddingTop: 48,
        }}>
        <RowComponent>
          <View style={{ flex: 1 }}>
            <InputComponent
              styles={{ marginBottom: 0 }}
              affix={
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Explore', {
                      screen: 'HomeScreen',
                    })
                  }>
                  <ArrowLeft2 size={24} color={appColors.text} />
                </TouchableOpacity>
              }
              placeholder="Search"
              value=""
              onChange={val => console.log(val)}
            />
          </View>
          <SpaceComponent width={12} />
          <CardComponent
            onPress={getNearbyEvents}
            styles={[globalStyles.noSpaceCard, { width: 56, height: 56 }]}
            color={appColors.white}>
            <MaterialIcons
              name="my-location"
              size={28}
              color={appColors.primary}
            />
          </CardComponent>
        </RowComponent>
        <SpaceComponent height={20} />
        <CategoriesList />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          right: 0,
          left: 0,
        }}>
        <FlatList
          initialScrollIndex={0}
          data={events}
          renderItem={({ item }) => <EventItem item={item} type="list" />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export default MapScreen