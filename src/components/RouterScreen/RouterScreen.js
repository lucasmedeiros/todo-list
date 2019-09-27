import React, {useEffect} from 'react';
import { View, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

const RouterScreen = ({ navigation }) => {
  useEffect(() => {
    AsyncStorage.multiGet(['user_token', 'user_id'])
      .then(response => {
        const token = response[0][1];
        const id = response[1][1];
        if (!token || !id)
          navigation.navigate('Login');
        else {
          api.get(`/users/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }).then(response => {
              const { user_username: user } = response.data;
              navigation.navigate('Main', {token, id, user});
            })
            .catch((err) => {
              navigation.navigate('Login')
            });
        }
      })
  }, [])
  return(<View />);
}

RouterScreen.navigationOptions = {
  title: 'RouterScreen',
}

export default RouterScreen;
