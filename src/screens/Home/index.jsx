import React, {useEffect} from 'react';
import {View, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import globalStyle from '@assets/styles/GlobalStyle';
import {Header} from './Header';
import {BookList} from './BookList';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFire} from '@fortawesome/free-solid-svg-icons';
import {useSelector, useDispatch} from 'react-redux';
import {fetchTopViewedBooks, fetchLatestBooks} from '@redux/slices/bookSlice';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {topViewed, latest, loading, error} = useSelector(state => state.books);

  useEffect(() => {
    dispatch(fetchTopViewedBooks());
    dispatch(fetchLatestBooks());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  return (
    <View style={globalStyle.androidSafeArea}>
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
              books={topViewed}
              icon={<FontAwesomeIcon icon={faFire} size={20} color="#d35400" />}
            />

            {/* New Books */}
            <BookList label="New" books={latest} />
          </>
        )}
        {/* Hot Books */}
      </View>
    </View>
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
