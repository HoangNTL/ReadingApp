import {StyleSheet} from 'react-native';
import {getFontFamily} from '../../assets/fonts/helper';

export const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 24,
    paddingHorizontal: 48,
    paddingVertical: 12,
  },
  solidButton: {
    backgroundColor: '#000',
    borderWidth: 0,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#000',
  },
  disabled: {
    opacity: 0.5,
  },
  iconMargin: {
    marginRight: 5,
  },
  label: {
    fontSize: 16,
    fontFamily: getFontFamily('Inter', '600'),
  },
  solidLabel: {
    color: '#FFF',
  },
  outlineLabel: {
    color: '#000',
  },
});
