import {StyleSheet} from 'react-native';
import {getFontFamily} from '../../../assets/fonts/helper';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontFamily: getFontFamily('Inter', '700'),
  },
});
