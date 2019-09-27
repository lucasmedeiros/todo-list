import React from 'react';
import {
  View,
  Text,
  ToastAndroid,
  SafeAreaView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Toolbar from '../../components/Toolbar';
import styles from './styles';
import api from '../../services/api';

const TaskDetails = ({ navigation }) => {
  const { tasksArray, setTasks, task, parameters } = navigation.state.params;
  const { createdAt, task_id, task_status, task_name, task_description } = task;
  const { token, user, id } = parameters;

  const convertIntegerValuesToString = (...intValues) => {
    let convertedValues = [];

    intValues.forEach((value, index) => {
      convertedValues[index] = (value < 10) ? `0${value}` : `${value}`;
    });

    return convertedValues;
  };

  const getFormatedDate = () => {
    const createdAtDate = new Date(createdAt);
    const yyyy = createdAtDate.getFullYear();

    let dd = createdAtDate.getDate();
    let mm = createdAtDate.getMonth() + 1;

    [dd, mm] = convertIntegerValuesToString(dd, mm);

    return `${dd}/${mm}/${yyyy}`;
  };

  const statuses = {
    'active': ['#064789', 'FAZENDO'],
    'pending': ['#ff1b1c', 'PENDENTE'],
    'finished': ['#04773b', 'CONCLUÍDA'],
  };

  const jewelStyle = () => {
    const [ color ] = statuses[task_status];

    return {
      color: color,
      fontSize: 12,
    }
  };

  const [_, statusPt] = statuses[task_status];

  const updateTasksOnScreen = (updatedTask, newStatus) => {
    setTasks(tasksArray.map(item => {
      let temp = Object.assign({}, item);

      if (item.task_id === parseInt(updatedTask.taskId))
        temp.task_status = newStatus

      return temp;
    }));
  };

  const handleChangeStatus = (newStatus) => {
    api.put('/tasks', {
      taskId: task_id,
      status: newStatus,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        updateTasksOnScreen(response.data, newStatus);
        navigation.pop();
      })
      .catch(err => {
        const { message } = err.response.data;
        ToastAndroid.show(`Não foi possível atualizar status - ${message.toLowerCase()}`, ToastAndroid.LONG);
      });
  }

  return(
    <SafeAreaView
      style={styles.container} >

      <Toolbar
        title={'Visualizar tarefa'}
        navigation={navigation} />

      <View style={styles.taskContainer}>
        <Text style={[styles.noteText, styles.noteTextTitle]}>{task_name}</Text>
          <View style={styles.detailsContainer}>
            <Text style={jewelStyle()}>{statusPt}</Text>
            <Text style={styles.paddingLeftText}>•</Text>
            <Text style={styles.paddingLeftText}>{getFormatedDate()}</Text>
          </View>
        <Text
          style={[styles.noteText, styles.noteTextDescription]} >
            {task_description}
        </Text>

        <RNPickerSelect
          placeholder={{label: 'Alterar status da tarefa'}}
          onValueChange={(value) => handleChangeStatus(value)}
          items={[
            { label: 'FAZENDO', value: 'active' },
            { label: 'PENDENTE', value: 'pending' },
            { label: 'CONCLUÍDA', value: 'finished' },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

TaskDetails.navigationOptions = {
  title: 'TaskDetails',
  header: null
};

export default TaskDetails;
