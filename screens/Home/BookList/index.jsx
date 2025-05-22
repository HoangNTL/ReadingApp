import React from 'react';
import {Text, TouchableOpacity, View, FlatList, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './style';

export const BookList = ({label, books, icon}) => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.label}>
        <Text style={styles.labelText}>{label}</Text>
        {icon && <View>{icon}</View>}
      </View>

      <View>
        <FlatList
          data={books}
          horizontal
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('BookDetail', {bookId: item.id})
              }>
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
            </TouchableOpacity>
          )}
          // contentContainerStyle={{
          //   paddingHorizontal: 16
          // }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
};
