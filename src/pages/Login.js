import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import api from '../services/api';

const Login = ({ navigation }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user_token')
      .then(token => token ? navigation.navigate('Main', { token }) : null)
      .catch();
  });

  const handleLogin = () => {
    api.post('/users/authenticate', {
      username: user,
      password,
    })
      .then(response => {
        const { token } = response.data;
        AsyncStorage.setItem('user_token', token)
          .then(() => {
            navigation.navigate('Main', { token });
          })
          .catch(err => {
            ToastAndroid.show(`Unable to login - ${err.message}`, ToastAndroid.LONG);
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
        onPress={handleLogin} >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.signinButton]}
        onPress={handleSignUp} >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

Login.navigationOptions = {
  title: 'Login',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  button: {
    height: 46,
    alignSelf: 'stretch',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#db162f',
  },
  signinButton: {
    backgroundColor: '#4c243b',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default Login;
