import React, { useState } from 'react'
import { ButtonComponent, ContainerComponent, InputComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors';
import { ArrowRight, Sms } from 'iconsax-react-native';
import { LoadingModal } from '../../modals';
import { Validate } from '../../utils/validate';
import authenticationAPI from '../../apis/authApi';
import { Alert } from 'react-native';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isDisable, setIsDisable] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckEmail = () => {
        const isValidEmail = Validate.email(email);
        setIsDisable(!isValidEmail);
    };

    const handleForgotPassword = async () => {
        const api = `/forgotPassword`;
        setIsLoading(true);
        try {
            const res: any = await authenticationAPI.HandleAuthentication(
                api,
                { email },
                'post',
            );

            console.log(res);
            Alert.alert('Send mail', 'We sended a email includes new password!!!');
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(`Can not create new password api forgot password, ${error}`);
        }
    };

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
                    onEnd={handleCheckEmail}
                />
            </SectionComponent>
            <SectionComponent>
                <ButtonComponent
                    onPress={handleForgotPassword}
                    disable={isDisable}
                    text="Send"
                    type="primary"
                    icon={<ArrowRight size={20} color={appColors.white} />}
                    iconFlex="right"
                />
            </SectionComponent>
            <LoadingModal visible={isLoading} />
        </ContainerComponent>
    )
}

export default ForgotPassword