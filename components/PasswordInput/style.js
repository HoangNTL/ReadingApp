import {StyleSheet} from 'react-native';
import {getFontFamily} from '../../assets/fonts/helper';

export const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
    fontFamily: getFontFamily('Inter', '400'),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontFamily: getFontFamily('Inter', '400'),
  },

});
