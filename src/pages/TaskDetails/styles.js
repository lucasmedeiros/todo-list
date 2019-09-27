import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  taskContainer: {
    flex: 1,
    padding: 15,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noteTextTitle: {
    fontSize: 20,
    color: '#00171f',
    fontWeight: 'bold',
  },
  paddingLeftText: {
    color: '#aaa',
    fontSize: 12,
    paddingLeft: 15,
  },
  noteTextDescription: {
    paddingTop: 20,
  },
});

export default styles;
