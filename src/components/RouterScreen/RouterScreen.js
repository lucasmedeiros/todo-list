import React, {useEffect} from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const RouterScreen = ({ navigation }) => {
  useEffect(() => {
    AsyncStorage.getItem('user_token')
      .then(token => {
        navigation.navigate(token ? 'Main' : 'Login', { token });
      });
  }, [])
  return(<View />);
}

RouterScreen.navigationOptions = {
  title: 'RouterScreen',
}

export default RouterScreen;
