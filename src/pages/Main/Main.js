import React, { useState, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import TaskNote from '../../components/TaskNote';
import Toolbar from '../../components/Toolbar';
import api from '../../services/api';
import styles from './styles';

const Main = ({ navigation }) => {
  const isCancelled = useRef(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, user, id } = navigation.state.params;

  useEffect(() => {
    return () => {
      isCancelled.current = true;
    }
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await api.get('/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (!isCancelled.current) {
        setTasks(response.data);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [tasks]);

  const taskPriorityOrder = {
    'pending': 1,
    'active': 2,
    'finished': 3,
  };

  const orderTasks = (t1, t2) => taskPriorityOrder[t1.task_status] - taskPriorityOrder[t2.task_status];

  return(
    <SafeAreaView style={styles.container}>
      <Toolbar
        title={'Tarefas'}
        navigation={navigation} />

      <ScrollView style={styles.scrollContainer} >
        { loading ? (
          <ActivityIndicator
            style={{marginTop: 20}}
            animating={loading}
            size="large"
            color="#0000ff" />
        ) : tasks.length > 0 ?
          tasks
            .sort(orderTasks)
            .map((task, key) => (
            <TaskNote
              key={key}
              keyVal={key}
              task={task}
              navigation={navigation} />
          )) : (
            <Text
              style={styles.noTask}>
              Nenhuma tarefa cadastrada...
            </Text>
          )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => { navigation.navigate('NewTask', navigation.state.params); }}
        activeOpacity={0.7} >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

Main.navigationOptions = {
  title: 'Main',
  header: null
};

export default Main;
