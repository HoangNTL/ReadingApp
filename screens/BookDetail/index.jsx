import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import {useRoute} from '@react-navigation/native';
import globalStyle from '../../assets/styles/GlobalStyle';
import {
  faEye,
  faHeart,
  faList,
  faBookOpen,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {getBookById, saveBook, getSaveStatus} from '../../api/bookApi';
import {Alert} from 'react-native';
import {BookStatItem} from '../../components/BookStatItem';
import {IconButton} from '../../components/IconButton';
import {GenreList} from '../../components/GenreList';
import {Header} from './Header';
import {styles} from './style';
import {useLoading} from '../../hooks/useLoading';
import {UserContext} from '../../contexts/UserContext';

const BookDetailScreen = ({navigation}) => {
  const route = useRoute();
  const {bookId} = route.params;
  const [book, setBook] = useState(null);
  const {loading, setLoading} = useLoading();
  const {user} = useContext(UserContext);
  const [save, setSave] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      try {
        const data = await getBookById(bookId);
        if (!data) {
          throw new Error('Book not found');
        }
        setBook(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
        Alert.alert('Error', 'Unable to load book details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const checkSaveStatus = async () => {
      try {
        const status = await getSaveStatus(bookId, user.id);
        setSave(status.is_saved);
      } catch (error) {
        console.error('Error checking save status:', error);
        Alert.alert('Error', 'Failed to check save status. Please try again.');
      }
    };

    fetchBookDetails();
    checkSaveStatus();
  }, [bookId, setLoading, setSave, user.id]);

  const handleRead = () => {
    if (!book) {
      Alert.alert('Error', 'Book details are not loaded yet.');
      return;
    }
    navigation.navigate('Reading', {id: bookId, title: book.title});
  };

  const handleSave = async () => {
    try {
      const savedBooks = await saveBook(bookId, user.id);
      console.log('Book saved successfully:', savedBooks);
      setSave(savedBooks.is_saved);
    } catch (error) {
      console.error('Error saving book:', error);
      Alert.alert('Error', 'Failed to save the book. Please try again.');
    }
  };

  return (
    <View style={globalStyle.androidSafeArea}>
      {loading || !book ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
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
                  label={save ? 'Saved' : 'Save'}
                  onPress={handleSave}
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
