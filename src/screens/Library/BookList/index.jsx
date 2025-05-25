import React from 'react';
import {Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './style';

export const BookList = ({books}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={3}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
        data={books}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('BookDetail', {bookId: item.id});
            }}>
            <View style={styles.bookCard}>
              <Image
                source={{
                  uri: item.cover_image,
                }}
                style={styles.bookImage}
              />

              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.bookTitle}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
