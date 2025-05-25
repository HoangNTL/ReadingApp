import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import globalStyle from '../../assets/styles/GlobalStyle';
import {getFontFamily} from '../../assets/fonts/helper';
import {useDispatch, useSelector} from 'react-redux';
import {Tabs} from './Tabs';
import LoadingIndicator from '../../components/LoadingIndicator';
import {BookList} from './BookList';
import {
  fetchLikedBooks,
  fetchSavedBooks,
} from '../../redux/slices/librarySlice';

const LibraryScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Liked');
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const {books, loading, error} = useSelector(state => state.library);

  useEffect(() => {
    if (user && user.id) {
      if (activeTab === 'Liked') {
        dispatch(fetchLikedBooks(user.id));
      } else if (activeTab === 'Saved') {
        dispatch(fetchSavedBooks(user.id));
      }
    }
  }, [user, activeTab, dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  return (
    <View style={globalStyle.androidSafeArea}>
      <Text style={styles.header}>Library</Text>

      <Tabs activeTab={activeTab} onTabChange={tab => setActiveTab(tab)} />

      {/* List book */}
      {loading ? <LoadingIndicator /> : <BookList books={books} />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    color: '#000',
    fontFamily: getFontFamily('Inter', '700'),
    marginLeft: 20,
  },
});

export default LibraryScreen;
