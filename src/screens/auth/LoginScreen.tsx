import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { InputComponent } from '../../components'
import { Lock, Sms } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <View
      style={[
        globalStyles.container,
        {
          justifyContent: 'center',
          alignItems: 'center',
        }
      ]}>
      <InputComponent
        value={email}
        onChange={val => setEmail(val)}
        placeholder='Email'
        allowClear
        affix={<Sms size={22} color={appColors.gray} />}
      />
      <InputComponent
        value={password}
        onChange={val => setPassword(val)}
        placeholder='Password'
        allowClear
        isPassword
        affix={<Lock size={22} color={appColors.gray} />}
      />
    </View>
  )
}

export default LoginScreen