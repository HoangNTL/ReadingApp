import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import globalStyle from '../../assets/styles/GlobalStyle';
import {getTopViewedBooks, getLatestBooks} from '../../api/bookApi';
import {Header} from './Header';
import {BookList} from './BookList';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFire} from '@fortawesome/free-solid-svg-icons';
import {useLoading} from '../../hooks/useLoading';

const HomeScreen = ({navigation}) => {
  const [topViewedBooks, setTopViewedBooks] = useState([]);
  const [latestBooks, setLatestBooks] = useState([]);
  const {loading, setLoading} = useLoading();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const [topBooks, newBooks] = await Promise.all([
          getTopViewedBooks(),
          getLatestBooks(),
        ]);
        setTopViewedBooks(topBooks);
        setLatestBooks(newBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
        Alert.alert('Error', 'Failed to load books. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [setLoading]);

  return (
    <SafeAreaView style={globalStyle.androidSafeArea}>
      <Header />

      {/* Content */}
      <View style={styles.contentContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        ) : (
          <>
            <BookList
              label="Hot"
              books={topViewedBooks}
              icon={<FontAwesomeIcon icon={faFire} size={20} color="#d35400" />}
            />

            {/* New Books */}
            <BookList label="New" books={latestBooks} />
          </>
        )}
        {/* Hot Books */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
