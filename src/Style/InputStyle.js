import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    height: 65,
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    borderRadius: 12,
  },
  focusedCard: {
    borderColor: '#00B0FF',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eyeButton: {
    // justifyContent: 'center',
    // paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    top: 10,
    left: 15,
    fontSize: 11,
    color: '#aaa',
    fontFamily: 'Metropolis',
  },
  activeLabel: {
    top: 2,
    fontSize: 12,
    color: '#00B0FF',
  },
  input: {
    width: '85%',
    height: 40,
    fontSize: 16,
    fontFamily: 'Metropolis',
    paddingTop: 15,
    paddingBottom: 0,
    marginBottom: 0,
    marginTop: 10,
  },
});

export default styles;
