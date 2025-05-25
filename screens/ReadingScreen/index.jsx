import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import {faHeart as faHeartRegular} from '@fortawesome/free-regular-svg-icons';

import {
  getFirstChapter,
  getPagesByChapterId,
  getNextChapter,
  getPreviousChapter,
  likeBook,
  getLikeStatus,
} from '../../api/bookApi';
import globalStyle from '../../assets/styles/GlobalStyle';
import {BackButton} from '../../components/BackButton';
import {getFontFamily} from '../../assets/fonts/helper';
import {LoadingIndicator} from '../../components/LoadingIndicator';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../../redux/slices/loadingSlice';

const {width} = Dimensions.get('window');

const ReadingScreen = ({navigation}) => {
  const route = useRoute();
  const {id, title} = route.params || {}; // bookId and title
  const user = useSelector(state => state.user.user);

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [currentPages, setCurrentPages] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const loading = useSelector(state => state.loading.global);
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);

  const fetchInitialChapter = React.useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const chapter = await getFirstChapter(id);
      const pages = await getPagesByChapterId(chapter.id);
      setCurrentChapter(chapter);
      setCurrentPages(pages);
      setCurrentPageIndex(0);
    } catch (error) {
      console.error('Error loading initial chapter:', error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [id, dispatch]);

  const fetchLikeStatus = React.useCallback(async () => {
    try {
      const likeStatus = await getLikeStatus(id, user.id);
      setLike(likeStatus.is_liked);
    } catch (error) {
      console.error('Error fetching like status:', error);
    }
  }, [id, user.id]);

  useEffect(() => {
    if (id) {
      fetchInitialChapter();
    }
    fetchLikeStatus();
  }, [id, fetchInitialChapter, fetchLikeStatus]);

  const changeChapter = async chapter => {
    try {
      dispatch(setLoading(true));
      const pages = await getPagesByChapterId(chapter.id);
      setCurrentChapter(chapter);
      setCurrentPages(pages);
      setCurrentPageIndex(0);
    } catch (error) {
      console.error('Error changing chapter:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const goToNextPage = async () => {
    const isLastPage = currentPageIndex === currentPages.length - 1;

    if (isLastPage) {
      try {
        dispatch(setLoading(true));
        const nextChapter = await getNextChapter(
          id,
          currentChapter?.chapter_order,
        );
        if (nextChapter) {
          await changeChapter(nextChapter);
        } else {
          console.log('Reached the last chapter');
        }
      } catch (error) {
        console.error('Error going to next chapter:', error);
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const goToPreviousPage = async () => {
    const isFirstPage = currentPageIndex === 0;

    if (isFirstPage) {
      try {
        dispatch(setLoading(true));
        const previousChapter = await getPreviousChapter(
          id,
          currentChapter?.chapter_order,
        );
        if (previousChapter) {
          const pages = await getPagesByChapterId(previousChapter.id);
          setCurrentChapter(previousChapter);
          setCurrentPages(pages);
          setCurrentPageIndex(pages.length - 1);
        } else {
          console.log('Reached the first chapter');
        }
      } catch (error) {
        console.error('Error going to previous chapter:', error);
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const handleLikePress = async () => {
    try {
      const result = await likeBook(id, user.id);
      setLike(result.is_liked);
    } catch (error) {
      console.error('Error liking book:', error);
    }
  };

  const toggleHeader = () => {
    setIsHeaderVisible(prev => {
      const next = !prev;
      return next;
    });
  };

  // TAP gesture - Xử lý tap trái/phải giữa
  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(1)
    .onStart(event => {
      const leftThreshold = width * 0.3; // 30%
      const rightThreshold = width * 0.7; // 70%

      if (event.x < leftThreshold) {
        // Tap vùng trái màn hình => trang trước
        runOnJS(goToPreviousPage)();
      } else if (event.x >= rightThreshold) {
        // Tap vùng phải màn hình => trang tiếp
        runOnJS(goToNextPage)();
      } else {
        // Tap giữa => ẩn/hiện header
        // runOnJS(setIsHeaderVisible)(prev => !prev);
        runOnJS(toggleHeader)();
      }
    });

  // PAN gesture - Xử lý vuốt trái/phải để chuyển trang
  const panGesture = Gesture.Pan().onEnd(event => {
    const swipeThreshold = 50; // ngưỡng vuốt tối thiểu
    if (event.translationX < -swipeThreshold) {
      // Vuốt sang trái => trang tiếp theo
      runOnJS(goToNextPage)();
    } else if (event.translationX > swipeThreshold) {
      // Vuốt sang phải => trang trước
      runOnJS(goToPreviousPage)();
    }
  });

  // Kết hợp Gesture để xử lý tap + pan đồng thời
  const combinedGesture = Gesture.Simultaneous(singleTap, panGesture);

  return (
    <View style={globalStyle.androidSafeArea}>
      {isHeaderVisible && (
        <View
          style={{
            height: 56,
            width: '100%',
            backgroundColor: '#FFF',
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center',
            zIndex: 10,
            top: globalStyle.androidSafeArea.paddingTop,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}>
          <BackButton navigation={navigation} />
          <View>
            <Text
              style={{
                fontSize: 18,
                color: '#000',
                fontFamily: getFontFamily('Inter', '600'),
                marginLeft: 10,
              }}>
              {title}
            </Text>
          </View>
          <TouchableOpacity onPress={handleLikePress} style={{marginLeft: 10}}>
            <FontAwesomeIcon
              icon={like ? faHeartSolid : faHeartRegular}
              size={25}
              color={like ? '#e74c3c' : '#95a5a6'}
            />
          </TouchableOpacity>
        </View>
      )}

      <GestureDetector gesture={combinedGesture}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <View>
              <Text
                style={{
                  color: '#000',
                  fontSize: 20,
                  fontFamily: getFontFamily('Inter', '600'),
                  marginBottom: 10,
                }}>
                {currentChapter?.title && currentPageIndex === 0
                  ? currentChapter.title
                  : ''}
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                  fontFamily: getFontFamily('Inter', '400'),
                }}>
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
