import {Platform, StatusBar, StyleSheet} from 'react-native';

const isAndroid = Platform.OS === 'android';
const statusBarHeight = StatusBar.currentHeight;

const globalStyle = StyleSheet.create({
  androidSafeArea: {
    paddingTop: isAndroid ? statusBarHeight : 0,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
});

export default globalStyle;
