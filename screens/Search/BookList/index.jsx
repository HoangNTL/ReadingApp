import React from 'react';
import {FlatList} from 'react-native';
import {BookItem} from './BookItem';

export const BookList = ({books}) => {
  return (
    <FlatList
      data={books}
      keyExtractor={item => item.id}
      renderItem={({item}) => <BookItem book={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
};
