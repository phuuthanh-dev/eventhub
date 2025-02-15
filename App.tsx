import React, { useEffect } from 'react'
import SplashScreen from './src/screens/SplashScreen'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { useFonts } from 'expo-font'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import AppRouters from './src/navigators/AppRouters'

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
    <Provider store={store}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <NavigationContainer>
        <AppRouters />
      </NavigationContainer>
    </Provider>
  </>
}

export default App