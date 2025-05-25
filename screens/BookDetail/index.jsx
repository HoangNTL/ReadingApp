import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';
import globalStyle from '../../assets/styles/GlobalStyle';
import {
  faEye,
  faHeart,
  faList,
  faBookOpen,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {Alert} from 'react-native';
import BookStatItem from '../../components/BookStatItem';
import IconButton from '../../components/IconButton';
import GenreList from '../../components/GenreList';
import {Header} from './Header';
import {styles} from './style';
import {useSelector, useDispatch} from 'react-redux';
import LoadingIndicator from '../../components/LoadingIndicator';
import {
  fetchBookDetail,
  toggleSaveBook,
  clearBookDetail,
} from '../../redux/slices/bookDetailSlice';

const BookDetailScreen = ({navigation}) => {
  const route = useRoute();
  const {bookId} = route.params;

  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const {book, isSaved, loading, saving, error} = useSelector(
    state => state.bookDetail,
  );

  useEffect(() => {
    if (user?.id && bookId) {
      dispatch(fetchBookDetail({bookId, userId: user.id}));
    }

    return () => {
      dispatch(clearBookDetail());
    };
  }, [bookId, user?.id, dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  const handleRead = () => {
    if (!book) {
      Alert.alert('Error', 'Book details are not loaded yet.');
      return;
    }
    navigation.navigate('Reading', {id: bookId, title: book.title});
  };

  const handleSave = () => {
    if (!user?.id) {
      Alert.alert('Error', 'You must be logged in to save books.');
      return;
    }
    dispatch(toggleSaveBook({bookId, userId: user.id}));
  };

  return (
    <View style={globalStyle.androidSafeArea}>
      {loading || !book ? (
        <LoadingIndicator />
      ) : (
        <>
          <Header title={book?.title} />

          <View style={styles.content}>
            {/* Book Cover */}
            <View style={styles.coverContainer}>
              <Image
                source={{
                  uri: book.cover_image,
                }}
                style={styles.coverImage}
              />
            </View>

            {/* Book Title */}
            <View style={styles.center}>
              <Text style={styles.title}>{book?.title}</Text>
            </View>

            {/* Book Author */}
            <View style={styles.center}>
              <Text style={styles.author}>{book.author}</Text>
            </View>

            {/* Book Views, Likes, Chapters */}
            <View style={styles.center}>
              <View style={styles.statsRow}>
                {/* Views */}
                <BookStatItem
                  icon={faEye}
                  value={book.views_count}
                  text="Reads"
                />

                {/* Likes */}
                <BookStatItem
                  icon={faHeart}
                  value={book.total_likes}
                  text="Likes"
                />

                {/* Chapters */}
                <BookStatItem
                  icon={faList}
                  value={book.total_chapters}
                  text="Chapters"
                />
              </View>
            </View>

            {/* Buttons */}
            <View style={styles.center}>
              <View style={styles.buttonRow}>
                {/* Read Button */}
                <IconButton
                  variant="solid"
                  icon={faBookOpen}
                  label="Read"
                  onPress={handleRead}
                />

                {/* Save Button */}
                <IconButton
                  variant="outline"
                  icon={faPlus}
                  label={isSaved ? 'Saved' : 'Save'}
                  onPress={handleSave}
                  loading={saving}
                />
              </View>
            </View>

            {/* Genre */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Genre</Text>
              <GenreList book={book} />
            </View>

            {/* Description */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>
                {book.description || 'No description available.'}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default BookDetailScreen;
