import React from 'react';
import {View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const TaskNote = ({ keyVal, task, navigation }) => {
  const { createdAt, task_status, task_name, task_description } = task;

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
      paddingLeft: 20
    }
  };

  // task.task_status

  const [_, statusPt] = statuses[task_status];

  return(
    <TouchableOpacity
      key={keyVal}
      style={styles.note} >
      <View style={styles.noteContainer}>
        <Text style={[styles.noteText, styles.noteTextTitle]}>{task_name}</Text>
          <View style={styles.detailsContainer}>
            <Text style={jewelStyle()}>{statusPt}</Text>
            <Text style={styles.paddingLeftText}>•</Text>
            <Text style={styles.paddingLeftText}>{getFormatedDate()}</Text>
          </View>
        <Text
          style={[styles.noteText, styles.noteTextDescription]}
          numberOfLines={2} >
            {task_description}
          </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TaskNote;
