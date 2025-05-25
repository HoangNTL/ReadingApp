import globalStyle from '../../../assets/styles/GlobalStyle';
import {getFontFamily} from '../../../assets/fonts/helper';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 56,
    width: '100%',
    backgroundColor: '#FFF',
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    top: globalStyle.androidSafeArea.paddingTop,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    paddingHorizontal: 10,
  },

  title: {
    fontSize: 18,
    color: '#000',
    fontFamily: getFontFamily('Inter', '600'),
    marginLeft: 10,
  },
  likeButton: {
    marginLeft: 10,
  },
});
