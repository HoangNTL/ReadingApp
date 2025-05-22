import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {faList} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {GenreList} from '../../../../components/GenreList';
import {BookStatItem} from '../../../../components/BookStatItem';
import {styles} from './style';

export const BookItem = ({book}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('BookDetail', {bookId: book.id})}>
      <View style={styles.container}>
        <Image
          source={{
            uri: book?.cover_image,
          }}
          style={styles.bookImage}
        />
        {/* Book information */}
        <View style={styles.infoContainer}>
          {/* Title */}
          <Text style={styles.title}>{book?.title}</Text>

          {/* Author */}
          <Text style={styles.author}>{book?.author}</Text>

          {/* Book stats */}
          <View style={styles.statsContainer}>
            {/* Views */}
            <BookStatItem icon={faEye} value={book?.views_count} />

            {/* Likes */}
            <BookStatItem icon={faList} value={book?.total_likes} />

            {/* Chapters */}
            <BookStatItem icon={faHeart} value={book?.total_chapters} />
          </View>

          {/* Genre */}
          <View>
            <GenreList book={book} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
