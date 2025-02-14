import React, { useEffect, useState } from 'react'
import SplashScreen from './src/screens/SplashScreen'
import AuthNavigator from './src/navigators/AuthNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true)
  const [fontLoaded] = useFonts({
    'AirbnbCereal_W_Lt': require('./assets/fonts/AirbnbCereal_W_Lt.otf'),
    'AirbnbCereal_W_Md': require('./assets/fonts/AirbnbCereal_W_Md.otf'),
    'AirbnbCereal_W_Bd': require('./assets/fonts/AirbnbCereal_W_Bd.otf'),
    'AirbnbCereal_W_XBd': require('./assets/fonts/AirbnbCereal_W_XBd.otf')
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [])

  if (!fontLoaded) {
    return <AppLoading />
  }

  return <>
    <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
    {isShowSplash ? (
      <SplashScreen />
    ) : (
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    )}
  </>
}

export default App