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
  ];
  const [visibleScreens, setVisibleScreens] = useState({
    left: null,
    current: screens[0],
    right: screens[1],
  });

  const currentIndex = useSharedValue(0);
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);

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
    const newValue = -index * SCREEN_WIDTH;
    if (index >= 0 && index < screens.length && translateX.value !== newValue) {
      currentIndex.value = index;
      translateX.value = withTiming(newValue, {duration: 700}, isFinished => {
        if (isFinished) {
          runOnJS(getVisibleScreens)(index);
        }
      });
    }
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
    })
    .onUpdate(event => {
      const nextX = startX.value + event.translationX;
      const minX = -((screens.length - 1) * SCREEN_WIDTH);
      translateX.value = Math.max(Math.min(nextX, 0), minX);
    })
    .onEnd(event => {
      const threshold = SCREEN_WIDTH / 4;

      if (
        event.translationX < -threshold &&
        currentIndex.value < screens.length - 1
      ) {
        scrollToIndex(currentIndex.value + 1);
      } else if (event.translationX > threshold && currentIndex.value > 0) {
        scrollToIndex(currentIndex.value - 1);
      } else {
        translateX.value = withTiming(
          -SCREEN_WIDTH,
          {duration: 2000},
          finished => {
            if (finished) {
              console.log('Animation finished');
            }
          },
        );
      }
    });

  // Tạo tap gesture riêng cho vùng bên trái (trang trước)
  const leftTapGesture = Gesture.Tap().onEnd(() => {
    if (currentIndex.value > 0) {
      scrollToIndex(currentIndex.value - 1);
    }
  });

  // Tạo tap gesture riêng cho vùng bên phải (trang tiếp theo)
  const rightTapGesture = Gesture.Tap().onEnd(() => {
    if (currentIndex.value < screens.length - 1) {
      scrollToIndex(currentIndex.value + 1);
    }
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <View style={{flex: 1}}>
        {/* Vùng tap bên trái */}
        <GestureDetector gesture={leftTapGesture}>
          <View
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: SCREEN_WIDTH / 2,
              zIndex: 10,
            }}
          />
        </GestureDetector>

        {/* Vùng tap bên phải */}
        <GestureDetector gesture={rightTapGesture}>
          <View
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: SCREEN_WIDTH / 2,
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
