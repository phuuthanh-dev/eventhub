import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { DateTimePicker, ButtonComponent, ChoiceLocation, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../components';
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authReducer';
import { SelectModel } from '../models/SelectModel';
import { appColors } from '../constants/appColors';

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
  const [usersSelects, setUsersSelects] = useState<SelectModel[]>([]);
  const [errorsMess, setErrorsMess] = useState<string[]>([]);

  const handleChangeValue = (key: string, value: string | Date | string[]) => {
    const items = { ...eventData };
    items[`${key}`] = value;

    setEventData(items);
  };

  const handleAddEvent = async () => {
    console.log('eventData', eventData);
  }

  const handleLocation = (val: any) => {
    const items = { ...eventData };
    items.position = val.postion;
    items.locationAddress = val.address;

    setEventData(items);
  };

  return (
    <ContainerComponent isScroll>
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
        <RowComponent>
          <DateTimePicker
            label="Start at: "
            type="time"
            onSelect={val => handleChangeValue('startAt', val)}
            selected={eventData.startAt}
          />
          <SpaceComponent width={20} />
          <DateTimePicker
            label="End at:"
            type="time"
            onSelect={val => handleChangeValue('endAt', val)}
            selected={eventData.endAt}
          />
        </RowComponent>
        <DateTimePicker
          label="Date:"
          type="date"
          onSelect={val => handleChangeValue('date', val)}
          selected={eventData.date}
        />
        <InputComponent
          placeholder="Title Address"
          allowClear
          value={eventData.locationTitle}
          onChange={val => handleChangeValue('locationTitle', val)}
        />
        <ChoiceLocation onSelect={val => handleLocation(val)} />
        <InputComponent
          placeholder="Price"
          allowClear
          type="number-pad"
          value={eventData.price}
          onChange={val => handleChangeValue('price', val)}
        />
      </SectionComponent>
      {errorsMess.length > 0 && (
        <SectionComponent>
          {errorsMess.map(mess => (
            <TextComponent
              text={mess}
              key={mess}
              color={appColors.danger}
              styles={{ marginBottom: 12 }}
            />
          ))}
        </SectionComponent>
      )}
      <SectionComponent>
        <ButtonComponent text='Add Event' onPress={handleAddEvent} type='primary' />
      </SectionComponent>
    </ContainerComponent>
  )
}

export default AddNewScreen