import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';
import globalStyle from '../../assets/styles/GlobalStyle';
import {LoadingIndicator} from '../../components/LoadingIndicator';
import {useDispatch, useSelector} from 'react-redux';

import {
  fetchFirstChapter,
  fetchNextChapter,
  fetchPreviousChapter,
  setCurrentPageIndex,
} from '../../redux/slices/readingSlice';
import {Header} from './Header';
import {styles} from './style';

const {width} = Dimensions.get('window');

const ReadingScreen = ({navigation}) => {
  const route = useRoute();
  const {id, title} = route.params || {}; // bookId and title
  const user = useSelector(state => state.user.user);

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const dispatch = useDispatch();
  const currentChapter = useSelector(state => state.reading.currentChapter);
  const currentPages = useSelector(state => state.reading.currentPages);
  const currentPageIndex = useSelector(state => state.reading.currentPageIndex);
  // const like = useSelector(state => state.reading.like);
  const loading = useSelector(state => state.reading.loading);

  useEffect(() => {
    if (id && user?.id) {
      dispatch(fetchFirstChapter(id));
      // dispatch(fetchLikeStatus({bookId: id, userId: user.id}));
    }
  }, [id, user?.id, dispatch]);

  const goToNextPage = () => {
    const isLastPage = currentPageIndex === currentPages.length - 1;
    if (isLastPage) {
      dispatch(
        fetchNextChapter({
          bookId: id,
          chapterOrder: currentChapter?.chapter_order,
        }),
      );
    } else {
      dispatch(setCurrentPageIndex(currentPageIndex + 1));
    }
  };

  const goToPreviousPage = () => {
    const isFirstPage = currentPageIndex === 0;
    if (isFirstPage) {
      dispatch(
        fetchPreviousChapter({
          bookId: id,
          chapterOrder: currentChapter?.chapter_order,
        }),
      );
    } else {
      dispatch(setCurrentPageIndex(currentPageIndex - 1));
    }
  };

  const toggleHeader = () => {
    setIsHeaderVisible(prev => !prev);
  };

  // TAP gesture
  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(1)
    .onStart(event => {
      const leftThreshold = width * 0.3; // 30%
      const rightThreshold = width * 0.7; // 70%

      if (event.x < leftThreshold) {
        // Tap left
        runOnJS(goToPreviousPage)();
      } else if (event.x >= rightThreshold) {
        // Tap right
        runOnJS(goToNextPage)();
      } else {
        // Tap middle
        runOnJS(toggleHeader)();
      }
    });

  // PAN gesture
  const panGesture = Gesture.Pan().onEnd(event => {
    const swipeThreshold = 50; // 50 pixels threshold for swipe detection
    if (event.translationX < -swipeThreshold) {
      // Swipe left => next page
      runOnJS(goToNextPage)();
    } else if (event.translationX > swipeThreshold) {
      // Swipe right => previous page
      runOnJS(goToPreviousPage)();
    }
  });

  const combinedGesture = Gesture.Simultaneous(singleTap, panGesture);

  return (
    <View style={globalStyle.androidSafeArea}>
      {isHeaderVisible && (
        <Header title={title} bookId={id} userId={user?.id} />
      )}

      <GestureDetector gesture={combinedGesture}>
        <View style={styles.contentContainer}>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <View>
              <Text style={styles.chapterTitle}>
                {currentChapter?.title && currentPageIndex === 0
                  ? currentChapter.title
                  : ''}
              </Text>
              <Text style={styles.pageContent}>
                {currentPages[currentPageIndex]?.content}
              </Text>
            </View>
          )}
        </View>
      </GestureDetector>
    </View>
  );
};

export default ReadingScreen;
