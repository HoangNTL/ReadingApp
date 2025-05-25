import {StyleSheet} from 'react-native';
import {getFontFamily} from '../../../assets/fonts/helper';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 18,
    fontFamily: getFontFamily('Inter', '600'),
  },
  activeTabText: {
    color: '#000',
  },
  inactiveTabText: {
    color: '#888',
  },
});
