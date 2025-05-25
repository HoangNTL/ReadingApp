import {StyleSheet} from 'react-native';
import {getFontFamily} from '../../assets/fonts/helper';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 18,
    fontFamily: getFontFamily('Inter', '600'),
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});
