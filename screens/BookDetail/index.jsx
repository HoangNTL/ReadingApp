import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import globalStyle from '../../assets/styles/GlobalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEye,
  faHeart,
  faList,
  faBookOpen,
  faPlus,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import {getBookById} from '../../api/bookApi';
import {Alert} from 'react-native';

const BookDetailScreen = ({navigation}) => {
  const route = useRoute();
  const {bookId} = route.params;
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      setIsLoading(true);
      try {
        const data = await getBookById(bookId);
        if (!data) {
          throw new Error('Book not found');
        }
        setBook(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
        Alert.alert('Error', 'Unable to load book details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleRead = () => {
    if (!book) {
      Alert.alert('Error', 'Book details are not loaded yet.');
      return;
    }
    navigation.navigate('Reading', {id: bookId, title: book.title});
  };

  if (isLoading) {
    return (
      <SafeAreaView
        style={[
          globalStyle.androidSafeArea,
          {flex: 1, justifyContent: 'center', alignItems: 'center'},
        ]}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={{marginTop: 10, fontSize: 16, color: '#333'}}>
          Loading...
        </Text>
      </SafeAreaView>
    );
  }

  if (!book) {
    return (
      <SafeAreaView
        style={[
          globalStyle.androidSafeArea,
          {flex: 1, justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Text style={{fontSize: 18, color: '#333'}}>Book not found.</Text>
        <TouchableOpacity
          style={{
            marginTop: 20,
            padding: 10,
            backgroundColor: '#007AFF',
            borderRadius: 5,
          }}
          onPress={() => navigation.goBack()}>
          <Text style={{color: '#fff', fontSize: 16}}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyle.androidSafeArea}>
      {/* Header */}
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
        }}>
        <TouchableOpacity
          style={{padding: 10}}
          onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} color="black" />
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: 'bold', flex: 1}}>
          {book.title}
        </Text>
      </View>

      <View style={{flex: 1, paddingBottom: 16}}>
        {/* Book Cover */}
        <View
          style={{
            backgroundColor: '#f0f0f0',
            height: 200,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 12,
          }}>
          <Image
            source={{
              uri: book.cover_image || 'https://via.placeholder.com/150',
            }}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
          />
        </View>

        {/* Book Title */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 12,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{book.title}</Text>
        </View>

        {/* Book Author */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 12,
          }}>
          <Text style={{fontSize: 16, color: '#666'}}>{book.author}</Text>
        </View>

        {/* Book Views, Likes, Chapters */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 18,
          }}>
          <View style={{flexDirection: 'row', gap: 20}}>
            {/* Views */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesomeIcon
                icon={faEye}
                size={16}
                color="#95a5a6"
                style={{marginRight: 5}}
              />
              <Text style={{fontSize: 12, color: '#95a5a6'}}>
                {book.views_count} Reads
              </Text>
            </View>
            {/* Likes */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesomeIcon
                icon={faHeart}
                size={16}
                color="#95a5a6"
                style={{marginRight: 5}}
              />
              <Text style={{fontSize: 12, color: '#95a5a6'}}>
                {book.total_likes} Likes
              </Text>
            </View>
            {/* Chapters */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesomeIcon
                icon={faList}
                size={16}
                color="#95a5a6"
                style={{marginRight: 5}}
              />
              <Text style={{fontSize: 12, color: '#95a5a6'}}>
                {book.total_chapters} Chapters
              </Text>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 24,
          }}>
          <View style={{flexDirection: 'row', gap: 16}}>
            {/* Read Button */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                backgroundColor: '#000',
                borderRadius: 24,
                paddingHorizontal: 48,
                paddingVertical: 12,
              }}
              onPress={handleRead}>
              <FontAwesomeIcon
                icon={faBookOpen}
                size={18}
                color="#fff"
                style={{marginRight: 5}}
              />
              <Text style={{color: '#fff', fontSize: 16, fontWeight: '600'}}>
                Read
              </Text>
            </TouchableOpacity>
            {/* Add to Library Button */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                backgroundColor: '#fff',
                borderColor: '#000',
                borderWidth: 1,
                borderRadius: 24,
                paddingHorizontal: 48,
                paddingVertical: 12,
              }}
              onPress={() => console.log('Add to library')}>
              <FontAwesomeIcon
                icon={faPlus}
                size={18}
                color="#000"
                style={{marginRight: 5}}
              />
              <Text style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Genre */}
        <View style={{marginBottom: 24, paddingHorizontal: 16}}>
          <Text style={{fontSize: 20, fontWeight: '600', marginBottom: 8}}>
            Genre
          </Text>
          <FlatList
            horizontal
            data={book.genres}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View
                style={{
                  backgroundColor: '#ecf0f1',
                  borderRadius: 20,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  marginRight: 8,
                }}>
                <Text
                  style={{fontSize: 12, fontWeight: 'bold', color: '#7f8c8d'}}>
                  {item.name}
                </Text>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Description */}
        <View style={{marginBottom: 24, paddingHorizontal: 16}}>
          <Text style={{fontSize: 20, fontWeight: '600', marginBottom: 8}}>
            Description
          </Text>
          <Text
            style={{
              fontSize: 14,
              borderRadius: 8,
              borderColor: '#f0f0f0',
              borderWidth: 1,
              padding: 12,
              color: '#333',
            }}>
            {book.description || 'No description available.'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BookDetailScreen;
