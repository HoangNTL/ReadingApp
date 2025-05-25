import {StyleSheet} from 'react-native';
import {getFontFamily} from '../../assets/fonts/helper';

export const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingBottom: 16,
  },
  coverContainer: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginBottom: 12,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontFamily: getFontFamily('Inter', '700'),
    marginBottom: 12,
  },
  author: {
    fontSize: 16,
    color: '#535c68',
    fontFamily: getFontFamily('Inter', '500'),
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: getFontFamily('Inter', '500'),
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#000',
    fontFamily: getFontFamily('Inter', '400'),
    borderWidth: 1,
    borderColor: '#95a5a6',
    borderRadius: 8,
    padding: 12,
  },
});
