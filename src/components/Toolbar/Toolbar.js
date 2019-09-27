import React from 'react';
import {View, StatusBar, TouchableOpacity, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';

const Toolbar = ({ title, navigation }) => {
  const logout = () => {
    AsyncStorage.clear().then(() => {
      navigation.navigate('RouterScreen');
    });
  };

  return(
    <View>
      <StatusBar
        barStyle='light-content'
        hidden={false}
        backgroundColor="#4c243b" />

      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <TouchableOpacity
          onPress={logout}
          style={styles.logout} >
          <Text style={styles.logoutText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Toolbar;
