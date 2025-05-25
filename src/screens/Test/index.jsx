import React, {useState} from 'react';
import {View, Dimensions, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const TestScreen = () => {
  const screens = [
    'Screen A',
    'Screen B',
    'Screen C',
    'Screen D',
    'Screen E',
    'Screen F',
    'Screen G',
    'Screen H',
  ];

  const [visibleScreens, setVisibleScreens] = useState({
    left: null,
    current: screens[0],
    right: screens[1],
  });

  const currentIndex = useSharedValue(0);
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);
  const isTransitioning = useSharedValue(false);

  const getVisibleScreens = index => {
    const visible = {
      left: index > 0 ? screens[index - 1] : null,
      current: screens[index],
      right: index < screens.length - 1 ? screens[index + 1] : null,
    };
    setVisibleScreens(visible);
  };

  const scrollToIndex = index => {
    'worklet';
    if (
      index >= 0 &&
      index < screens.length &&
      !isTransitioning.value &&
      translateX.value !== -index * SCREEN_WIDTH
    ) {
      isTransitioning.value = true;
      currentIndex.value = index;
      translateX.value = withTiming(
        -index * SCREEN_WIDTH,
        {duration: 700},
        isFinished => {
          if (isFinished) {
            runOnJS(getVisibleScreens)(index);
            isTransitioning.value = false;
          }
        },
      );
    }
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      if (isTransitioning.value) return;
      startX.value = translateX.value;
    })
    .onUpdate(event => {
      if (isTransitioning.value) return;
      const nextX = startX.value + event.translationX;
      const minX = -((screens.length - 1) * SCREEN_WIDTH);
      translateX.value = Math.max(Math.min(nextX, 0), minX);
    })
    .onEnd(event => {
      if (isTransitioning.value) return;
      const threshold = SCREEN_WIDTH / 4;

      if (
        event.translationX < -threshold &&
        currentIndex.value < screens.length - 1
      ) {
        scrollToIndex(currentIndex.value + 1);
      } else if (event.translationX > threshold && currentIndex.value > 0) {
        scrollToIndex(currentIndex.value - 1);
      } else {
        translateX.value = withTiming(-currentIndex.value * SCREEN_WIDTH, {
          duration: 700,
        });
      }
    });

  // Tap bên trái 30% màn hình, chỉ nhận tap nhanh, 1 lần
  const leftTapGesture = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(1)
    .onStart(() => {
      if (isTransitioning.value) return;
      if (currentIndex.value > 0) {
        scrollToIndex(currentIndex.value - 1);
      }
    });

  // Tap bên phải 30% màn hình, chỉ nhận tap nhanh, 1 lần
  const rightTapGesture = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(1)
    .onStart(() => {
      if (isTransitioning.value) return;
      if (currentIndex.value < screens.length - 1) {
        scrollToIndex(currentIndex.value + 1);
      }
    });

  const middleTapGesture = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(1)
    .onStart(() => {
      console.log('Middle tapped');
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <View style={{flex: 1}}>
        {/* Vùng tap bên trái (30% màn hình) */}
        <GestureDetector gesture={leftTapGesture}>
          <View
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: SCREEN_WIDTH * 0.3,
              zIndex: 10,
            }}
          />
        </GestureDetector>

        {/* Vùng tap bên giữa (40% màn hình) */}
        <GestureDetector gesture={middleTapGesture}>
          <View
            style={{
              position: 'absolute',
              left: SCREEN_WIDTH * 0.3,
              top: 0,
              bottom: 0,
              width: SCREEN_WIDTH * 0.4,
              zIndex: 10,
            }}
          />
        </GestureDetector>

        {/* Vùng tap bên phải (30% màn hình) */}
        <GestureDetector gesture={rightTapGesture}>
          <View
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: SCREEN_WIDTH * 0.3,
              zIndex: 10,
            }}
          />
        </GestureDetector>

        <Animated.View
          style={[
            {
              flexDirection: 'row',
              width: SCREEN_WIDTH * screens.length,
              height: '100%',
            },
            animatedStyle,
          ]}>
          {screens.map((screen, index) => (
            <View
              key={index}
              style={{
                width: SCREEN_WIDTH,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f0f0f0',
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderColor: '#000',
              }}>
              <Text style={{fontSize: 24}}>{screen}</Text>
            </View>
          ))}
        </Animated.View>

        <View style={{position: 'absolute', bottom: 30, padding: 20}}>
          <Text style={{fontWeight: 'bold'}}>Visible Screens:</Text>
          <Text>Left: {visibleScreens.left ?? 'None'}</Text>
          <Text>Current: {visibleScreens.current}</Text>
          <Text>Right: {visibleScreens.right ?? 'None'}</Text>
        </View>
      </View>
    </GestureDetector>
  );
};

export default TestScreen;
