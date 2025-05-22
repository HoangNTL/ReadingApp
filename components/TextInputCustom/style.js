import {StyleSheet} from 'react-native';
import {getFontFamily} from '../../assets/fonts/helper';

export const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
    fontFamily: getFontFamily('Inter', '400'),
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 12,
    borderRadius: 4,
    fontFamily: getFontFamily('Inter', '400'),
  },
});
