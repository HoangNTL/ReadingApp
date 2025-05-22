import {StyleSheet} from 'react-native';
import {getFontFamily} from '../../../assets/fonts/helper';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
    borderRadius: 24,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: getFontFamily('Inter', '400'),
  },
  clearButton: {
    padding: 8,
  },
});
