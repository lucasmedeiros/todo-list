import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  SafeAreaView,
  TouchableOpacity, 
  View, 
  Text, 
  StyleSheet,
} from 'react-native';

const Main = ({ navigation }) => {

  const { token } = navigation.state.params;

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>Your Tasks</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          AsyncStorage.clear().then(() => {
            navigation.navigate('RouterScreen');
          });
        }} >
        <Text>CLEAR</Text>
      </TouchableOpacity>
      <Text>{token}</Text>
      <View />
    </SafeAreaView>
  );
}

Main.navigationOptions = {
  title: 'Main',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Main;
