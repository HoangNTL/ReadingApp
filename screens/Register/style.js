import {StyleSheet} from 'react-native';
import {getFontFamily} from '../../assets/fonts/helper';

export const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 40,
    left: 4,
  },
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
  passwordGroup: {
    marginBottom: 32,
  },
});
