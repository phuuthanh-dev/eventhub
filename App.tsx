import React, { useEffect, useState } from 'react'
import SplashScreen from './src/screens/SplashScreen'
import AuthNavigator from './src/navigators/AuthNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [])

  return <>
    <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent/>
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