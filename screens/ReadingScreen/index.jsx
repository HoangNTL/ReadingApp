import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

import {
  getFirstChapter,
  getPagesByChapterId,
  getNextChapter,
  getPreviousChapter,
} from '../../api/bookApi';
import globalStyle from '../../assets/styles/GlobalStyle';

const {width} = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.2;

const ReadingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {id, title = 'Đang tải...'} = route.params || {};

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [pages, setPages] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const isMounted = useRef(true);
  const translateX = useSharedValue(0);

  useEffect(() => {
    isMounted.current = true;
    loadInitialChapter();

    return () => {
      isMounted.current = false;
    };
  }, [id]);

  const loadInitialChapter = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const chapter = await getFirstChapter(id);
      const pageList = await getPagesByChapterId(chapter.id);
      if (isMounted.current) {
        setCurrentChapter(chapter);
        setPages(pageList);
        setCurrentPageIndex(0);
      }
    } catch (err) {
      Alert.alert('Lỗi', 'Không thể tải chương đầu.');
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  };

  const changeChapter = async (chapterFn, fallbackMsg) => {
    setIsLoading(true);
    try {
      const chapter = await chapterFn();
      const pageList = await getPagesByChapterId(chapter.id);
      if (isMounted.current) {
        setCurrentChapter(chapter);
        setPages(pageList);
        setCurrentPageIndex(0);
        translateX.value = 0;
      }
    } catch {
      if (isMounted.current) Alert.alert('Thông báo', fallbackMsg);
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  };

  const goToNextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(i => i + 1);
    } else {
      changeChapter(
        () => getNextChapter(id, currentChapter.chapter_order),
        'Đây là chương cuối cùng.',
      );
    }
    translateX.value = 0;
  };

  const goToPrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(i => i - 1);
    } else {
      changeChapter(
        () => getPreviousChapter(id, currentChapter.chapter_order),
        'Đây là chương đầu tiên.',
      );
    }
    translateX.value = 0;
  };
  // NEW: Replace PanGestureHandler with Gesture.Pan
  const panGesture = Gesture.Pan().onEnd(event => {
    if (event.translationX < -SWIPE_THRESHOLD) {
      runOnJS(goToNextPage)();
    } else if (event.translationX > SWIPE_THRESHOLD) {
      runOnJS(goToPrevPage)();
    } else {
      translateX.value = withTiming(0);
    }
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const onTap = e => {
    const x = e.nativeEvent.locationX;
    if (x < width * 0.3) {
      goToPrevPage();
    } else if (x > width * 0.7) {
      goToNextPage();
    } else {
      setIsHeaderVisible(v => !v);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={globalStyle.androidSafeArea}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
          <Text style={{marginTop: 10}}>Đang tải...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyle.androidSafeArea}>
      <GestureHandlerRootView style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={onTap}>
          <View style={{flex: 1}}>
            <GestureDetector gesture={panGesture}>
              <Animated.View style={[{flex: 1}, animatedStyle]}>
                {/* Header */}
                {isHeaderVisible && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      zIndex: 10,
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      {title}
                    </Text>
                  </View>
                )}

                {/* Page Content */}
                <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
                  <Text
                    style={{
                      fontSize: 18,
                      lineHeight: 28,
                      textAlign: 'justify',
                    }}>
                    {pages[currentPageIndex]?.content || 'Không có nội dung.'}
                  </Text>
                </View>
              </Animated.View>
            </GestureDetector>
          </View>
        </TouchableWithoutFeedback>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default ReadingScreen;
