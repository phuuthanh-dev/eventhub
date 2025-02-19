import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DateTimePicker, ButtonComponent, ChoiceLocation, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent, DropdownPicker } from '../components';
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authReducer';
import { SelectModel } from '../models/SelectModel';
import { appColors } from '../constants/appColors';
import userAPI from '../apis/userApi';
import ButtonImagePicker from '../components/ButtonImagePicker';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import { Validate } from '../utils/validate';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from '@react-native-firebase/storage';
import { getApp } from '@react-native-firebase/app';
import { EventModel } from '../models/EventModel';
import eventAPI from '../apis/eventApi';

const initValues = {
  title: '',
  description: '',
  locationTitle: '',
  locationAddress: '',
  position: {
    lat: '',
    long: '',
  },
  photo: '',
  users: [],
  authorId: '',
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
  price: '',
  category: '',
};

const AddNewScreen = ({ navigation }: any) => {
  const auth = useSelector(authSelector);
  const [eventData, setEventData] = useState<any>({ ...initValues, authorId: auth.id });
  const [usersSelects, setUsersSelects] = useState<SelectModel[]>([]);
  const [fileSelected, setFileSelected] = useState<any>();
  const [errorsMess, setErrorsMess] = useState<string[]>([]);

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  useEffect(() => {
    const mess = Validate.EventValidation(eventData);

    setErrorsMess(mess);
  }, [eventData]);

  const handleChangeValue = (key: string, value: string | Date | string[]) => {
    const items = { ...eventData };
    items[`${key}`] = value;

    setEventData(items);
  };

  const handleGetAllUsers = async () => {
    const api = `/get-all`;

    try {
      const res: any = await userAPI.HandleUser(api);

      if (res && res.data) {
        const items: SelectModel[] = [];

        res.data.forEach(
          (item: any) =>
            item.email &&
            items.push({
              label: item.email,
              value: item.id,
              photo: item.photo,
              fullName: item.fullName,
            }),
        );

        setUsersSelects(items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddEvent = async () => {
    if (fileSelected) {
      const filename = `${fileSelected.filename ?? `image-${Date.now()}`}`;
      const path = `images/${filename}`;
      const app = getApp();
      const storage = getStorage(app);
      const storageRef = ref(storage, path);
      const response = await fetch(fileSelected.path);
      const blob = await response.blob();
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          console.log(snapshot.bytesTransferred);
        },
        (error) => {
          console.error(error);
        },
        async () => {
          if (uploadTask.snapshot) {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            eventData.photo = url;
            handlePushEvent(eventData);
          }
        }
      );
    } else {
      handlePushEvent(eventData);
    }
  }

  const handlePushEvent = async (event: EventModel) => {
    const api = `/add-new`;
    try {
      const res = await eventAPI.HandleEvent(api, event, 'post');
      navigation.navigate('Explore', {
        screen: 'HomeScreen',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocation = (val: any) => {
    const items = { ...eventData };
    items.position = val.position;
    items.locationAddress = val.address;

    setEventData(items);
  };

  const handleFileSelected = (val: ImageOrVideo) => {
    setFileSelected(val);
    handleChangeValue('photo', val.path);
  };

  return (
    <ContainerComponent isScroll>
      <SectionComponent>
        <TextComponent text="Add new" title />
      </SectionComponent>
      <SectionComponent>
        {eventData.photo || fileSelected ? (
          <Image
            source={{
              uri: eventData.photo ? eventData.photo : fileSelected.uri,
            }}
            style={{ width: '100%', height: 250, marginBottom: 12 }}
            resizeMode="cover"
          />
        ) : (
          <></>
        )}
        <ButtonImagePicker
          onSelect={(val: any) =>
            val.type === 'url'
              ? handleChangeValue('photo', val.value as string)
              : handleFileSelected(val.value)
          }
        />
        <SpaceComponent height={20} />
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
        <DropdownPicker
          selected={eventData.category}
          values={[
            {
              label: 'Sport',
              value: 'sport',
            },
            {
              label: 'Food',
              value: 'food',
            },
            {
              label: 'Art',
              value: 'art',
            },
            {
              label: 'Music',
              value: 'music',
            },
          ]}
          onSelect={val => handleChangeValue('category', val)}
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
        <DropdownPicker
          label="Invited users"
          values={usersSelects}
          onSelect={(val: string | string[]) =>
            handleChangeValue('users', val as string[])
          }
          selected={eventData.users}
          multiple
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
        <ButtonComponent
          disable={errorsMess.length > 0}
          text="Add Event"
          onPress={handleAddEvent}
          type="primary"
        />
      </SectionComponent>
    </ContainerComponent>
  )
}

export default AddNewScreen