import {StyleSheet} from 'react-native';
import {getFontFamily} from '../../assets/fonts/helper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: getFontFamily('Inter', '700'),
  },
  inputGroup: {
    marginBottom: 16,
  },
  buttonGroup: {
    marginTop: 20,
    marginBottom: 20,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#000',
    fontFamily: getFontFamily('Inter', '400'),
  },
  registerLink: {
    fontSize: 14,
    color: '#000fff',
    fontFamily: getFontFamily('Inter', '500'),
  },
});
