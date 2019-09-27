import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  View,
  Text,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Toolbar from '../../components/Toolbar';
import styles from './styles';
import api from '../../services/api';

const NewTask = ({ navigation }) => {
  const [ taskName, setTaskName ] = useState('');
  const [ taskDescription, setTaskDescription ] = useState('');
  const [ taskStatus, setTaskStatus ] = useState('active');
  const { tasks, setTasks, parameters } = navigation.state.params;
  const { token, user, id } = parameters;

  const updateTasksOnScreen = (newTask) => {
    setTasks(oldTasksArray => [...oldTasksArray, newTask]);
  }

  const handleNewTask = () => {
    api.post('/tasks', {
      name: taskName,
      description: taskDescription,
      status: taskStatus,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        updateTasksOnScreen(response.data);
        navigation.pop();
      })
      .catch(err => {
        const { message } = err.response.data;
        ToastAndroid.show(`Não foi possível cadastrar nova tarefa - ${message.toLowerCase()}`, ToastAndroid.LONG);
      });
  };

  // ToastAndroid.show(`${id}`, ToastAndroid.LONG);

  return(
    <SafeAreaView style={styles.container}>
      <Toolbar
        title={'Nova tarefa'}
        navigation={navigation} />

      <View
        style={styles.textsContainer} >
        <TextInput
          style={[styles.input, styles.titleInput]}
          placeholder="Título da tarefa"
          placeholderTextColor="#999"
          value={taskName}
          onChangeText={setTaskName} />

        <TextInput
          style={styles.input}
          placeholder="Descrição da tarefa"
          placeholderTextColor="#999"
          multiline={true}
          numberOfLines={3}
          value={taskDescription}
          onChangeText={setTaskDescription} />

        <RNPickerSelect
          placeholder={{label: 'Selecione o status da tarefa'}}
          onValueChange={(value) => setTaskStatus(value)}
          items={[
            { label: 'FAZENDO', value: 'active' },
            { label: 'PENDENTE', value: 'pending' },
            { label: 'CONCLUÍDA', value: 'finished' },
          ]}
        />

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleNewTask} >
            <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

NewTask.navigationOptions = {
  title: 'NewTask',
  header: null
};

export default NewTask;
