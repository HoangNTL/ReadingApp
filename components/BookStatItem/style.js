import {StyleSheet} from 'react-native';
import {getFontFamily} from '../../assets/fonts/helper';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  text: {
    fontSize: 12,
    color: '#535c68',
    fontFamily: getFontFamily('Inter', '400'),
  },
});
