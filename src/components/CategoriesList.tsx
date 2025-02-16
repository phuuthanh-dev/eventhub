import { FlatList } from 'react-native';
import React, { ReactNode } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { appColors } from '../constants/appColors';
import { ChefFork } from '../assets/svgs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TagComponent from './TagComponent';

interface Props {
  isFill?: boolean;
}

interface Category {
  key: string;
  label: string;
  icon: ReactNode;
  color: string;
}

const CategoriesList = (props: Props) => {
  const { isFill } = props;

  const categories: Category[] = [
    {
      key: 'sports',
      icon: (
        <FontAwesome5
          name="basketball-ball"
          color={isFill ? appColors.white : '#F0635A'}
          size={20}
        />
      ),
      color: '#EE544A',
      label: 'Sports',
    },
    {
      key: 'music',
      icon: (
        <FontAwesome5
          name="music"
          size={22}
          color={isFill ? appColors.white : '#F59762'}
        />
      ),
      color: '#F59762',
      label: 'Music',
    },
    {
      key: 'food',
      icon: <ChefFork color={isFill ? appColors.white : '#29D697'} />,
      color: '#29D697',
      label: 'Food',
    },
    {
      key: 'art',
      icon: (
        <Ionicons
          name="color-palette-sharp"
          size={22}
          color={isFill ? appColors.white : '#46CDFB'}
        />
      ),
      color: '#46CDFB',
      label: 'Art',
    },
  ];

  return (
    <FlatList
      style={{ paddingHorizontal: 16 }}
      showsHorizontalScrollIndicator={false}
      horizontal
      data={categories}
      renderItem={({ item, index }) =>
        <TagComponent
          styles={{
            marginRight: index === categories.length - 1 ? 28 : 12,
            minWidth: 82,
          }}
          bgColor={isFill ? item.color : appColors.white}
          onPress={() => { }}
          icon={item.icon}
          label={item.label}
        />}
    />
  );
};

export default CategoriesList;