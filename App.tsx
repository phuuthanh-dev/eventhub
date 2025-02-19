import React from 'react'
import SplashScreen from './src/screens/SplashScreen'
import { NavigationContainer } from '@react-navigation/native'
import { LogBox, StatusBar } from 'react-native'
import { useFonts } from 'expo-font'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import AppRouters from './src/navigators/AppRouters'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Host } from 'react-native-portalize'
LogBox.ignoreLogs([
  'Mapbox [error] ViewTagResolver | view:'
]);
const App = () => {
  const [fontLoaded] = useFonts({
    'AirbnbCereal_W_Lt': require('./assets/fonts/AirbnbCereal_W_Lt.otf'),
    'AirbnbCereal_W_Md': require('./assets/fonts/AirbnbCereal_W_Md.otf'),
    'AirbnbCereal_W_Bd': require('./assets/fonts/AirbnbCereal_W_Bd.otf'),
    'AirbnbCereal_W_XBd': require('./assets/fonts/AirbnbCereal_W_XBd.otf'),
    'Lobster-Regular': require('./assets/fonts/Lobster-Regular.ttf')
  })

  if (!fontLoaded) {
    return <SplashScreen />
  }

  return <>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <Host>
          <NavigationContainer>
            <AppRouters />
          </NavigationContainer>
        </Host>
      </Provider>
    </GestureHandlerRootView>
  </>
}

export default App