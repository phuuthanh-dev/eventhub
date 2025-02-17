import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, ChoiceLocation, ContainerComponent, InputComponent, SectionComponent, TextComponent } from '../components';
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authReducer';

const initValues = {
  title: '',
  description: '',
  locationTitle: '',
  locationAddress: '',
  position: {
    lat: '',
    long: '',
  },
  photoUrl: '',
  users: [],
  authorId: '',
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
  price: '',
  category: '',
};

const AddNewScreen = () => {
  const auth = useSelector(authSelector);
  const [eventData, setEventData] = useState<any>({ ...initValues, authorId: auth.id });


  const handleChangeValue = (key: string, value: string) => {
    const items = { ...eventData };
    items[key] = value;

    setEventData(items);
  }

  const handleAddEvent = async () => {
    console.log('eventData', eventData);
  }
  
  const handleLocation = (val: any) => {
    const items = {...eventData};
    items.position = val.postion;
    items.locationAddress = val.address;

    setEventData(items);
  };
  
  return (
    <ContainerComponent back isScroll title="Add New">
      <SectionComponent>
        <TextComponent text="Add new" title />
      </SectionComponent>
      <SectionComponent>
        <InputComponent
          placeholder='Title'
          value={eventData.title}
          allowClear
          onChange={val => handleChangeValue('title', val)}
        />
        <InputComponent
          placeholder='Description'
          multiline
          numberOfLines={3}
          allowClear
          value={eventData.description}
          onChange={val => handleChangeValue('description', val)}
        />
        <ChoiceLocation onSelect={val => handleLocation(val)} />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent text='Add Event' onPress={handleAddEvent} type='primary' />
      </SectionComponent>
    </ContainerComponent>
  )
}

export default AddNewScreen