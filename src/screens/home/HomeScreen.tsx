import { View, Text, Button, StatusBar, Platform, TouchableOpacity, ScrollView, FlatList, ImageBackground } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { globalStyles } from '../../styles/globalStyles'
import { appColors } from '../../constants/appColors'
import { CategoriesList, CircleComponent, EventItem, RowComponent, SectionComponent, SpaceComponent, TabBarComponent, TextComponent } from '../../components'
import { HambergerMenu, Notification, SearchNormal1, Sort } from 'iconsax-react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { fontFamilies } from '../../constants/fontFamilies'

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch()

  const itemEvents = [
    {
      title: 'International Band Music Concert',
      description:
        'Enjoy your favorite dishes and a lovely time with your friends and family. Have a great experience with live music. Food from local food trucks will be available for purchase.',
      location: {
        title: 'Gala Convention Center',
        address: '36 Guild Street, London, UK',
      },
      imageUrl: 'https://i.pinimg.com/736x/81/0e/58/810e5804b55b1e536bca5a336c1a08c3.jpg',
      users: [],
      authorId: '',
      startAt: '2025-08-14',
      endAt: Date.now(),
      date: Date.now(),
    },
    {
      title: 'Jo Malone London Pop-Up Event',
      description:
        'Experience a variety of gourmet dishes and exquisite wines from top chefs and sommeliers.',
      location: {
        title: 'Central Park',
        address: 'New York, USA',
      },
      imageUrl: 'https://i.ytimg.com/vi/RSUzD1hrytg/sddefault.jpg',
      users: [],
      authorId: '',
      startAt: '2025-03-17',
      endAt: Date.now(),
      date: Date.now(),
    },
    {
      title: 'Chill Afternoon & Study',
      description:
        'Relax and unwind with a warm cup of coffee, soothing music, and great company in a cozy atmosphere.',
      location: {
        title: 'Cozy Beans Café',
        address: 'Seattle, USA',
      },
      imageUrl: 'https://i.pinimg.com/originals/7d/07/a2/7d07a255678962d30d8717dcf5dbd266.gif',
      users: [],
      authorId: '',
      startAt: '2025-07-25',
      endAt: Date.now(),
      date: Date.now(),
    },
    {
      title: 'Bar & Dance Night 2025',
      description:
        'Join us for an electrifying night of music, dance, and cocktails at the city’s hottest venue!',
      location: {
        title: 'Skyline Lounge & Club',
        address: 'New York City, USA',
      },
      imageUrl: 'https://i.pinimg.com/736x/da/b2/84/dab2846a8be6b98c2add048da972da31.jpg',
      users: [],
      authorId: '',
      startAt: '2025-02-25',
      endAt: Date.now(),
      date: Date.now(),
    },
    {
      title: 'Bolero Music Festival 2024',
      description:
        'Experience the soulful melodies of Bolero music performed by renowned artists in a mesmerizing atmosphere.',
      location: {
        title: 'Hồ Chí Minh City Opera House',
        address: 'Hồ Chí Minh City, Vietnam',
      },
      imageUrl: 'https://i.pinimg.com/736x/da/09/f3/da09f3fc0a419afffdaefc36e148cb0d.jpg',
      users: [],
      authorId: '',
      startAt: '2025-04-29',
      endAt: Date.now(),
      date: Date.now(),
    }
  ];
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
              <TextComponent
                text="New York, USA"
                flex={0}
                color={appColors.white}
                font={fontFamilies.medium}
                size={13}
              />
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
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={itemEvents}
            renderItem={({ item, index }) => (
              <EventItem key={`event${index}`} type="card" item={item} />
            )}
          />
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
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={itemEvents}
            renderItem={({ item, index }) => (
              <EventItem key={`event${index}`} item={item} type="card" />
            )}
          />
        </SectionComponent>
      </ScrollView>
    </View >
  )
}

export default HomeScreen