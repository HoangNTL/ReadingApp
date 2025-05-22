import React from 'react';
import {Text, View, FlatList} from 'react-native';
import {styles} from './style';

export const GenreList = ({book}) => {
  return (
    <FlatList
      horizontal={true}
      data={book.genres}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <View style={styles.genreContainer}>
          <Text style={styles.genreText}>{item.name}</Text>
        </View>
      )}
    />
  );
};
