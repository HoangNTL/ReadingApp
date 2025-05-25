import {StyleSheet} from 'react-native';
import {getFontFamily} from '../../assets/fonts/helper';

export const styles = StyleSheet.create({
  genreContainer: {
    backgroundColor: '#ecf0f1',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  genreText: {
    fontSize: 12,
    color: '#535c68',
    fontFamily: getFontFamily('Inter', '400'),
  },
});
