import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import api from '../../services/api';
import styles from './styles';

const Login = ({ navigation }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    api.post('/users/authenticate', {
      username: user,
      password,
    })
      .then(response => {
        const { token, user_id } = response.data;
        AsyncStorage.multiSet([['user_token', token], ['user_id', user_id.toString()]])
          .then(() => {
            navigation.navigate('RouterScreen');
          })
          .catch(err => {
            ToastAndroid.show(`Unable to login - ${err}`, ToastAndroid.LONG);
          })
      })
      .catch(err => {
        const { message } = err.response.data;
        ToastAndroid.show(`Unable to login - ${message.toLowerCase()}`, ToastAndroid.LONG);
      });
  };

  const handleSignUp = () => {
    api.post('/users', {
      username: user,
      password,
    })
      .then(() => handleLogin())
      .catch(err => {
        const { message } = err.response.data;
        ToastAndroid.show(`Unable to register user - ${message.toLowerCase()}`, ToastAndroid.LONG);
      });
  }

  return(
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        value={user}
        onChangeText={setUser}
        style={styles.input} />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        autoCapitalize="none"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        style={styles.input} />

      <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        onPress={handleLogin}
        activeOpacity={0.8} >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.signinButton]}
        onPress={handleSignUp}
        activeOpacity={0.8} >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

Login.navigationOptions = {
  title: 'Login',
};

export default Login;
