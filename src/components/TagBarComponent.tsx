import { ArrowRight2 } from 'iconsax-react-native';
import React from 'react';
import { appColors } from '../constants/appColors';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';

interface Props {
  title: string;
  onPress?: () => void;
}

const TagBarComponent = (props: Props) => {
  const { title, onPress } = props;

  return (
    <RowComponent
      styles={{
        marginBottom: 20,
        paddingHorizontal: 16
      }}>
      <TextComponent numberOfLine={1} size={18} title text={title} flex={1} />
      {
        onPress && (
          <RowComponent onPress={onPress}>
            <TextComponent text="See All " color={appColors.text2} />
            <ArrowRight2 variant="Bold" size={14} color={appColors.text2} />
          </RowComponent>
        )
      }
    </RowComponent>
  );
};

export default TagBarComponent;