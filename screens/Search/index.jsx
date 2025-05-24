import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Alert, ActivityIndicator} from 'react-native';
import globalStyle from '../../assets/styles/GlobalStyle';
import {getBooks} from '../../api/bookApi';
import {SearchBar} from './SearchBar';
import {BookList} from './BookList';
import {useLoading} from '../../hooks/useLoading';

const SearchScreen = ({navigation}) => {
  const [books, setBooks] = useState([]);
  const {loading, setLoading} = useLoading();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const data = await getBooks();
        setBooks(data);
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
    <View style={globalStyle.androidSafeArea}>
      <SearchBar setBooks={setBooks} />
      <View style={styles.contentContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        ) : (
          <BookList books={books} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchScreen;
