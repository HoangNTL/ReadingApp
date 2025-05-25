import React, {useState} from 'react';
import {View, TextInput, Keyboard, Alert, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass, faTimes} from '@fortawesome/free-solid-svg-icons';
import {styles} from './style';
import {useDispatch, useSelector} from 'react-redux';
import {searchBooks, fetchBooks} from '@redux/slices/bookSlice';

export const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector(state => state.books.loading);

  const handleSearch = () => {
    if (!keyword.trim()) {
      Alert.alert('Error', 'Please enter a search keyword.');
      return;
    }
    dispatch(searchBooks(keyword));
    Keyboard.dismiss();
  };

  const handleClear = () => {
    setKeyword('');
    dispatch(fetchBooks());
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        size={18}
        color="#000"
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Search for books..."
        returnKeyType="search"
        onSubmitEditing={handleSearch}
        editable={!loading}
      />
      {keyword.length > 0 && (
        <TouchableOpacity
          onPress={handleClear}
          style={styles.clearButton}
          disabled={loading}>
          <FontAwesomeIcon icon={faTimes} size={18} color="#000" />
        </TouchableOpacity>
      )}
    </View>
  );
};
