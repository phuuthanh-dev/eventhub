import React, { useState } from 'react'
import { ButtonComponent, ContainerComponent, InputComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors';
import { ArrowRight, Sms } from 'iconsax-react-native';

const Verification = () => {
    const [email, setEmail] = useState('');
    return (
        <ContainerComponent back isImageBackground isScroll>
            <SectionComponent>
                <TextComponent text="Reset Password" title />
                <SpaceComponent height={12} />
                <TextComponent text="Please enter your email address to request a password reset" />
                <SpaceComponent height={26} />
                <InputComponent
                    value={email}
                    onChange={val => setEmail(val)}
                    affix={<Sms size={20} color={appColors.gray} />}
                    placeholder="abc@gmail.com"
                //   onEnd={handleCheckEmail}
                />
            </SectionComponent>
            <SectionComponent>
                <ButtonComponent
                    //   onPress={handleForgotPassword}
                    //   disable={isDisable}
                    text="Send"
                    type="primary"
                    icon={<ArrowRight size={20} color={appColors.white} />}
                    iconFlex="right"
                />
            </SectionComponent>
            {/* <LoadingModal visible={isLoading} /> */}
        </ContainerComponent>
    )
}

export default Verification