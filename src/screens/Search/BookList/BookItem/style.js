import {StyleSheet} from 'react-native';
import {getFontFamily} from '../../../../assets/fonts/helper';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 120,
    margin: 8,
  },
  bookImage: {
    width: 80,
    height: '100%',
    backgroundColor: '#ddd',
    marginRight: 10,
  },
  infoContainer: {
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontFamily: getFontFamily('Inter', '600'),
    color: '#00',
  },
  author: {
    fontSize: 12,
    fontFamily: getFontFamily('Inter', '400'),
    color: '#535c68',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});
