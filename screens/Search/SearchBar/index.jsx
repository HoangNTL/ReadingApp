import React, {useState} from 'react';
import {View, TextInput, Keyboard, Alert, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass, faTimes} from '@fortawesome/free-solid-svg-icons';
import {getBookByKeyword, getBooks} from '../../../api/bookApi';
import {styles} from './style';
import {useLoading} from '../../../hooks/useLoading';

export const SearchBar = ({setBooks}) => {
  const [keyword, setKeyword] = useState('');
  const {setLoading} = useLoading();

  const handleSearch = async () => {
    if (!keyword.trim()) {
      Alert.alert('Error', 'Please enter a search keyword.');
      return;
    }

    setLoading(true);
    try {
      const response = await getBookByKeyword(keyword);
      setBooks(response || []);
    } catch (error) {
      console.error('Search error:', error);
      Alert.alert('Error', 'Failed to search books. Please try again.');
    } finally {
      setLoading(false);
      Keyboard.dismiss();
    }
  };

  const handleClear = async () => {
    setKeyword('');
    setLoading(true);
    try {
      const data = await getBooks();
      setBooks(data || []);
    } catch (error) {
      console.error('Error fetching books:', error);
      Alert.alert('Error', 'Failed to load books. Please try again.');
    } finally {
      setLoading(false);
      Keyboard.dismiss();
    }
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
      />
      {keyword.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <FontAwesomeIcon icon={faTimes} size={18} color="#000" />
        </TouchableOpacity>
      )}
    </View>
  );
};
