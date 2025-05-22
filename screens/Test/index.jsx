import {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {runOnJS} from 'react-native-reanimated';
import globalStyle from '../../assets/styles/GlobalStyle';
import BackButton from '../../components/BackButton';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

export default function TestScreen() {
  const navigation = useNavigation();
  // State to control header visibility
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // Single tap with left/middle/right differentiation
  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(1)
    .onStart(event => {
      const leftThreshold = width * 0.3; // 30% = 36px
      const rightThreshold = width * 0.7; // 70% = 84px

      if (event.x < leftThreshold) {
        console.log('Left tap! (x: ' + event.x + ')');
      } else if (event.x >= rightThreshold) {
        console.log('Right tap! (x: ' + event.x + ')');
      } else {
        console.log('Middle tap! (x: ' + event.x + ')');
        runOnJS(setIsHeaderVisible)(!isHeaderVisible); // Run state update on JS thread
      }
    });

  // Double tap
  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      console.log('Double tap!');
    });

  // Combine gestures, allowing simultaneous detection
  const combinedGesture = Gesture.Simultaneous(doubleTap, singleTap);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: globalStyle.androidSafeArea.paddingTop,
      }}>
      {isHeaderVisible && (
        <View style={styles.header}>
          {/* <BackButton navigation={navigation} /> */}
        </View>
      )}
      <GestureDetector gesture={combinedGesture}>
        <View style={styles.content} />
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 10,
    top: globalStyle.androidSafeArea.paddingTop,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  content: {
    // height: '100%',
    // width: '100%',
    flex: 1,
    // backgroundColor: '#b58df1',
  },
});
