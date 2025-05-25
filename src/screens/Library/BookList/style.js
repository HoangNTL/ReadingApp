import {StyleSheet} from 'react-native';
import {getFontFamily} from '../../../assets/fonts/helper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  listContainer: {
    gap: 12,
    paddingBottom: 20,
  },
  columnWrapper: {
    alignContent: 'space-between',
    gap: 8,
  },
  bookCard: {
    width: 112,
    height: 186,
    margin: 4,
  },
  bookImage: {
    width: 112,
    height: 168,
  },
  bookTitle: {
    // width: 100,
    fontSize: 14,
    color: '#000',
    fontFamily: getFontFamily('Inter', '500'),
  },
});
