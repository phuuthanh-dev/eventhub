import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import { Lock, Sms, User } from 'iconsax-react-native'
import SocialLogin from './components/SocialLogin'

const initValue = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpScreen = ({navigation}: any) => {
    const [values, setValues] = useState(initValue);

    const handleChangeValue = (key: string, value: string) => {
        const data: any = { ...values };

        data[`${key}`] = value;

        setValues(data);
    };

    return (
        <>
            <ContainerComponent isImageBackground isScroll back>
                <SectionComponent>
                    <TextComponent size={24} title text="Sign up" />
                    <SpaceComponent height={21} />
                    <InputComponent
                        value={values.username}
                        placeholder="Full name"
                        onChange={val => handleChangeValue('username', val)}
                        allowClear
                        affix={<User size={22} color={appColors.gray} />}
                    />
                    <InputComponent
                        value={values.email}
                        placeholder="abc@email.com"
                        onChange={val => handleChangeValue('email', val)}
                        allowClear
                        affix={<Sms size={22} color={appColors.gray} />}
                        // onEnd={() => formValidator('email')}
                    />
                    <InputComponent
                        value={values.password}
                        placeholder="Password"
                        onChange={val => handleChangeValue('password', val)}
                        isPassword
                        allowClear
                        affix={<Lock size={22} color={appColors.gray} />}
                        // onEnd={() => formValidator('password')}
                    />
                    <InputComponent
                        value={values.confirmPassword}
                        placeholder="Confirm password"
                        onChange={val => handleChangeValue('confirmPassword', val)}
                        isPassword
                        allowClear
                        affix={<Lock size={22} color={appColors.gray} />}
                        // onEnd={() => formValidator('confirmPassword')}
                    />
                </SectionComponent>

                {/* {errorMessage && (
                    <SectionComponent>
                        {Object.keys(errorMessage).map(
                            (error, index) =>
                                errorMessage[`${error}`] && (
                                    <TextComponent
                                        text={errorMessage[`${error}`]}
                                        key={`error${index}`}
                                        color={appColors.danger}
                                    />
                                ),
                        )}
                    </SectionComponent>
                )} */}
                <SpaceComponent height={16} />
                <SectionComponent>
                    <ButtonComponent
                        // onPress={handleRegister}
                        text="SIGN UP"
                        // disable={isDisable}
                        type="primary"
                    />
                </SectionComponent>
                <SocialLogin />
                <SectionComponent>
                    <RowComponent justify="center">
                        <TextComponent text="Don’t have an account? " />
                        <ButtonComponent
                            type="link"
                            text="Sign in"
                            onPress={() => navigation.navigate('LoginScreen')}
                        />
                    </RowComponent>
                </SectionComponent>
            </ContainerComponent>
            {/* <LoadingModal visible={isLoading} /> */}
        </>
    )
}

export default SignUpScreen