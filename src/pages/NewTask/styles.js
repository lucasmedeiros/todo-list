import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  textsContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  input: {
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 15,
    marginTop: 10,
    fontSize: 17,
  },
  titleInput: {
    height: 46,
  },
  button: {
    height: 46,
    backgroundColor: '#4c243b',
    alignSelf: 'stretch',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
