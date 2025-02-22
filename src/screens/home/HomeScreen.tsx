import { View, Text, Button, StatusBar, Platform, TouchableOpacity, ScrollView, FlatList, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { globalStyles } from '../../styles/globalStyles'
import { appColors } from '../../constants/appColors'
import { CategoriesList, CircleComponent, EventItem, LoadingComponent, RowComponent, SectionComponent, SpaceComponent, TabBarComponent, TextComponent } from '../../components'
import { HambergerMenu, Notification, SearchNormal1, Sort } from 'iconsax-react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { fontFamilies } from '../../constants/fontFamilies'
import GeoLocation from '@react-native-community/geolocation'
import axios from 'axios'
import { AddressModel } from '../../models/AddressModel'
import { EventModel } from '../../models/EventModel'
import eventAPI from '../../apis/eventApi'

const HomeScreen = ({ navigation }: any) => {
  const [currentLocation, setCurrentLocation] = useState<AddressModel>();
  const [events, setEvents] = useState<EventModel[]>([]);
  const [nearbyEvents, setNearbyEvents] = useState<EventModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [eventData, setEventData] = useState<EventModel[]>([]);

  useEffect(() => {
    handleGetCurrentLocation()
    getEvents()
    getEventsData()
  }, [])

  useEffect(() => {
    getNearByEvents();
  }, [currentLocation]);

  const getNearByEvents = () => {
    currentLocation &&
      currentLocation.position &&
      getEvents(currentLocation.position.lat, currentLocation.position.lng);
  };

  const handleGetCurrentLocation = async () => {
    GeoLocation.getCurrentPosition(position => {
      console.log('position', position);
      if (position && position.coords) {
        handleReverseGeocode({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      }
    });
  };

  const handleReverseGeocode = async ({ lat, long }: {
    lat: number;
    long: number;
  }) => {
    const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&lang=en-US&apiKey=ND_BCtN0BgNSPdQHs6flCyEqiQWpW4zDUx6x7oeZUIY`;
    await axios
      .get(api)
      .then(res => {
        if (res && res.status === 200 && res.data) {
          const items = res.data.items

          items.length > 0 && setCurrentLocation(items[0]);
        }
      })
      .catch(e => {
        console.log('Error in getAddressFromCoordinates', e);
      });
  };

  const getEvents = async (lat?: number, long?: number, distance?: number) => {
    const api = `${lat && long
      ? `/get-events?lat=${lat}&long=${long}&distance=${distance ?? 5
      }&limit=5&isUpcoming=true`
      : `/get-events?limit=5&isUpcoming=true`
      }`;
      //&date=${new Date().toISOString()}`;

    if (events.length === 0 || nearbyEvents.length === 0) {
      setIsLoading(true);
    }
    try {
      const res: any = await eventAPI.HandleEvent(api);

      setIsLoading(false);
      res &&
        res.data &&
        (lat && long ? setNearbyEvents(res.data) : setEvents(res.data));
    } catch (error) {
      setIsLoading(false);
      console.log(`Get event error in home screen line 74 ${error}`);
    }
  };

  const getEventsData = async (
    lat?: number,
    long?: number,
    distance?: number,
  ) => {
    const api = `/get-events`;
    try {
      const res = await eventAPI.HandleEvent(api);

      const data = res.data;

      const items: EventModel[] = [];

      data.forEach((item: any) => items.push(item));

      setEventData(items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle={'light-content'} />

      <View
        style={{
          backgroundColor: appColors.primary,
          height: Platform.OS === 'android' ? 166 : 182,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 52,
        }}>

        <View style={{ paddingHorizontal: 16 }}>
          <RowComponent>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <HambergerMenu size={24} color={appColors.white} />
            </TouchableOpacity>
            <View style={[{ flex: 1, alignItems: 'center' }]}>
              <RowComponent>
                <TextComponent
                  text='Current Location'
                  color={appColors.white2}
                  size={12} />
                <MaterialIcons
                  name="arrow-drop-down"
                  size={18}
                  color={appColors.white}
                />
              </RowComponent>
              {currentLocation && (
                <TextComponent
                  text={`${currentLocation.address.city}, ${currentLocation.address.countryName}`}
                  flex={0}
                  color={appColors.white}
                  font={fontFamilies.medium}
                  size={13}
                />
              )}
            </View>
            <CircleComponent color="#524CE0" size={36}>
              <View>
                <Notification size={18} color={appColors.white} />
                <View
                  style={{
                    backgroundColor: '#02E9FE',
                    width: 10,
                    height: 10,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: '#524CE0',
                    position: 'absolute',
                    top: -2,
                    right: -2,
                  }}
                />
              </View>
            </CircleComponent>
          </RowComponent>
          <SpaceComponent height={20} />
          <RowComponent>
            <RowComponent
              styles={{ flex: 1 }}
              onPress={() =>
                navigation.navigate('SearchEvents', {
                  isFilter: false,
                })
              }>
              <SearchNormal1
                variant="TwoTone"
                size={22}
                color={appColors.white}
              />
              <View
                style={{
                  width: 1,
                  height: 18,
                  marginHorizontal: 12,
                  backgroundColor: '#A29EF0',
                }}
              />
              <TextComponent text="Search..." color={`#A29EF0`} flex={1} />
            </RowComponent>
            <RowComponent
              onPress={() =>
                navigation.navigate('SearchEvents', {
                  isFilter: true,
                })
              }
              styles={{
                backgroundColor: '#5D56F3',
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 100,
              }}>
              <CircleComponent size={19.3} color={`#A29EF0`}>
                <Sort size={12} color={appColors.primary} />
              </CircleComponent>
              <SpaceComponent width={8} />
              <TextComponent text="Filters" color={appColors.white} />
            </RowComponent>
          </RowComponent>
          <SpaceComponent height={20} />
        </View>
        <View style={{ marginBottom: -16 }}>
          <CategoriesList isFill />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          {
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 22 : 18,
          },
        ]}>
        <SectionComponent styles={{ paddingHorizontal: 0, paddingTop: 24 }}>
          <TabBarComponent title="Upcoming Events" onPress={() => { }} />

          {events.length > 0 ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={events}
              renderItem={({ item, index }) => (
                <EventItem key={`event${index}`} item={item} type="card" />
              )}
            />
          ) : (
            <LoadingComponent isLoading={isLoading} values={events.length} />
          )}
        </SectionComponent>
        <SectionComponent>
          <ImageBackground
            source={require('../../assets/images/invite-image.png')}
            style={{ flex: 1, padding: 16, minHeight: 127 }}
            imageStyle={{
              resizeMode: 'cover',
              borderRadius: 12,
            }}>
            <TextComponent styles={{ marginBottom: 6 }} text="Invite your friends" size={20} font={fontFamilies.medium} />
            <TextComponent text="Get $20 for ticket" />

            <RowComponent justify="flex-start">
              <TouchableOpacity
                style={[
                  globalStyles.button,
                  {
                    marginTop: 12,
                    backgroundColor: '#00F8FF',
                    paddingHorizontal: 28,
                  },
                ]}>
                <TextComponent
                  text="INVITE"
                  font={fontFamilies.bold}
                  color={appColors.white}
                />
              </TouchableOpacity>
            </RowComponent>
          </ImageBackground>
        </SectionComponent>

        <SectionComponent styles={{ paddingHorizontal: 0, paddingTop: 24 }}>
          <TabBarComponent title="Nearby You" onPress={() => { }} />
          {nearbyEvents.length > 0 ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={nearbyEvents}
              renderItem={({ item, index }) => (
                <EventItem key={`event${index}`} item={item} type="card" />
              )}
            />
          ) : (
            <LoadingComponent
              isLoading={isLoading}
              values={nearbyEvents.length}
            />
          )}
        </SectionComponent>
      </ScrollView>
    </View >
  )
}

export default HomeScreen