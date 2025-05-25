import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setUser} from '@redux/slices/userSlice';
import LoadingIndicator from '@components/LoadingIndicator';

export default function AuthLoading({navigation}) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkUser() {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          dispatch(setUser(user));
          navigation.replace('App');
        } else {
          navigation.replace('Login');
        }
      } catch (e) {
        console.log('Failed to load user', e);
        navigation.replace('Login');
      }
    }
    checkUser();
  }, [dispatch, navigation]);

  return <LoadingIndicator />;
}
