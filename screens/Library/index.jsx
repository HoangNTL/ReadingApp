import React, {useEffect, useContext, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import globalStyle from '../../assets/styles/GlobalStyle';
import {getFontFamily} from '../../assets/fonts/helper';
import {getLikedBooks} from '../../api/bookApi';
import {UserContext} from '../../contexts/UserContext';
import {useLoading} from '../../hooks/useLoading';

const LibraryScreen = ({navigation}) => {
  const [books, setBooks] = useState([]);

  const {user} = useContext(UserContext);
  // const {loading, setLoading} = useLoading();
  const userId = user?.id;

  useEffect(() => {
    const fetchLikedBooks = async () => {
      try {
        const response = await getLikedBooks(userId);
        if (response && response.length > 0) {
          setBooks(response);
        } else {
          console.log('No liked books found.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchLikedBooks();
  }, [userId]);

  return (
    <SafeAreaView style={globalStyle.androidSafeArea}>
      <Text
        style={{
          fontSize: 24,
          color: '#000',
          fontFamily: getFontFamily('Inter', '600'),
        }}>
        Library
      </Text>
      <Text>List book you liked</Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          paddingHorizontal: 20,
          marginTop: 20,
        }}>
        <FlatList
          numColumns={3}
          contentContainerStyle={{
            gap: 12,
            paddingBottom: 20,
          }}
          columnWrapperStyle={{
            alignContent: 'space-between',
            gap: 8,
          }}
          data={books}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('BookDetail', {bookId: item.id});
              }}>
              <View
                style={{
                  width: 112,
                  height: 186,
                  margin: 4,
                }}>
                <Image
                  source={{
                    uri: item.cover_image,
                  }}
                  style={{
                    // width: '100%',
                    // height: '90%'
                    width: 112,
                    height: 168,
                  }}
                />

                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{width: 100}}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default LibraryScreen;
