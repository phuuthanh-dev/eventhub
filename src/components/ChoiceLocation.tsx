import React, { useEffect, useState } from 'react'
import RowComponent from './RowComponent'
import { globalStyles } from '../styles/globalStyles'
import TextComponent from './TextComponent'
import { ArrowRight2, Location } from 'iconsax-react-native'
import { appColors } from '../constants/appColors'
import SpaceComponent from './SpaceComponent'
import { LocationModal } from '../modals'

interface Props {
  values: any;
  onSelect: (val: any) => void;
}

const ChoiceLocation = (props: Props) => {
  const {onSelect, values} = props;
  const [isVisibleModalLocation, setIsVisibleModalLocation] = useState(false);
  const [addressSelected, setAddressSelected] = useState<{
    address: string;
    position?: {
      lat: number;
      long: number;
    };
  }>();
  
  useEffect(() => {
    setAddressSelected({
      address: values.locationAddress
    });
  }, [values.locationAddress]);
  
  return (
    <>
      <RowComponent
        onPress={() => setIsVisibleModalLocation(!isVisibleModalLocation)}
        styles={[globalStyles.inputContainer]}
      >
        <Location variant="Bold" size={22} color={`${appColors.primary}80`} />
        <SpaceComponent width={12} />
        <TextComponent
          numberOfLine={1}
          text={addressSelected?.address ? addressSelected?.address : 'Choice'}
          flex={1}
        />
        <ArrowRight2 color={appColors.primary} size={22} />
      </RowComponent>

      <LocationModal
        visible={isVisibleModalLocation}
        onClose={() => setIsVisibleModalLocation(false)}
        onSelect={val => {
          setAddressSelected(val);
          onSelect(val);
        }}
      />
    </>
  )
}

export default ChoiceLocation