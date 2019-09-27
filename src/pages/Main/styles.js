import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 85,
    backgroundColor: '#F5F5F5',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 50,
    backgroundColor: '#4c243b',
    width: 75,
    height: 75,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 25,
  },
  tasksContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noTask: {
    color: '#999',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 45,
    textAlign: 'center',
  },
});

export default styles;
