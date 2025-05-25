import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import {faHeart as faHeartRegular} from '@fortawesome/free-regular-svg-icons';
import {BackButton} from '../../../components/BackButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchLikeStatus,
  toggleLikeBook,
} from '../../../redux/slices/readingSlice';
import {styles} from './style';

export const Header = ({title, bookId, userId}) => {
  const dispatch = useDispatch();

  const like = useSelector(state => state.reading.like);

  useEffect(() => {
    if (bookId && userId) {
      dispatch(fetchLikeStatus({bookId, userId}));
    }
  }, [bookId, userId, dispatch]);

  const handleLikePress = () => {
    if (bookId && userId) {
      dispatch(toggleLikeBook({bookId, userId}));
    }
  };
  return (
    <View style={styles.container}>
      <BackButton />
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity onPress={handleLikePress} style={styles.likeButton}>
        <FontAwesomeIcon
          icon={like ? faHeartSolid : faHeartRegular}
          size={25}
          color={like ? '#e74c3c' : '#95a5a6'}
        />
      </TouchableOpacity>
    </View>
  );
};
