import {StyleSheet} from 'react-native';
import {getFontFamily} from '../../assets/fonts/helper';

export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  chapterTitle: {
    color: '#000',
    fontSize: 20,
    fontFamily: getFontFamily('Inter', '600'),
    marginBottom: 10,
  },
  pageContent: {
    color: '#000',
    fontSize: 18,
    fontFamily: getFontFamily('Inter', '400'),
  },
});
