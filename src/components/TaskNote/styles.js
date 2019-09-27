import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  note: {
    position: 'relative',
    padding: 15,
    paddingRight: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#EDEDED',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noteContainer: {
    height: 140,
    borderLeftWidth: 10,
    borderLeftColor: '#4c243b',
  },
  noteText: {
    paddingLeft: 20,
  },
  noteTextTitle: {
    fontSize: 20,
    color: '#00171f',
    fontWeight: 'bold',
  },
  paddingLeftText: {
    color: '#aaa',
    paddingLeft: 10,
    fontSize: 12,
  },
  noteTextDescription: {
    paddingTop: 20,
  },
});

export default styles;
