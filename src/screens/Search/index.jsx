import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import globalStyle from '@assets/styles/GlobalStyle';
import {SearchBar} from './SearchBar';
import {BookList} from './BookList';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBooks} from '@redux/slices/bookSlice';
import LoadingIndicator from '@components/LoadingIndicator';

const SearchScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const books = useSelector(state => state.books.list);
  const loading = useSelector(state => state.books.loading);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <View style={globalStyle.androidSafeArea}>
      <SearchBar />
      <View style={styles.contentContainer}>
        {loading ? <LoadingIndicator /> : <BookList books={books} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    flex: 1,
  },
});

export default SearchScreen;
