import {StyleSheet} from 'react-native';
import {getFontFamily} from '../../../assets/fonts/helper';

export const styles = StyleSheet.create({
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 10,
    marginBottom: 10,
  },
  labelText: {
    fontSize: 18,
    fontFamily: getFontFamily('Inter', '600'),
  },
  iconWrapper: {
    marginLeft: 6,
  },
  bookImage: {
    width: 112,
    height: 168,
    backgroundColor: '#bdc3c7',
    marginRight: 12,
  },
  bookTitle: {
    fontSize: 14,
    fontFamily: getFontFamily('Inter', '400'),
    width: 100,
  },
});
