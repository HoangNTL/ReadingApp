import {StyleSheet} from 'react-native';
import {getFontFamily} from '../../../assets/fonts/helper';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    position: 'relative',
  },
  title: {
    fontSize: 24,
    color: '#000',
    fontFamily: getFontFamily('Inter', '700'),
  },
  avatarWrapper: {
    backgroundColor: '#e67e22',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: getFontFamily('Inter', '600'),
    fontSize: 12,
    color: '#000',
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    right: 0,
    width: 180,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  greeting: {
    paddingBottom: 8,
  },
  logoutBtn: {
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#e74c3c',
  },
  logoutText: {
    fontSize: 14,
    fontFamily: getFontFamily('Inter', '400'),
    color: '#fff',
  },
});
