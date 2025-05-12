import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import globalStyle from '../../assets/styles/GlobalStyle';
import {getFontFamily} from '../../assets/fonts/helper';
import {getBooks} from '../../api/bookApi';

const HomeScreen = ({navigation}) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getBooks();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  return (
    <SafeAreaView style={globalStyle.androidSafeArea}>
      <View
        style={{
          // flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            fontFamily: getFontFamily('Inter', '600'),
            fontSize: 24,
          }}>
          Reading app
        </Text>
        <View
          style={{
            backgroundColor: '#e67e22',
            padding: 10,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: getFontFamily('Inter', '600'),
              fontSize: 12,
              color: '#000000',
            }}>
            HN
          </Text>
        </View>
      </View>

      {/* Content */}
      <View
        style={
          {
            //   flex: 1,
          }
        }>
        {/* book list */}
        <Text>Host</Text>
        <View>
          <FlatList
            data={books}
            horizontal
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity>
                <Image
                  source={{
                    uri: item.cover_image,
                  }}
                  style={{
                    width: 112,
                    height: 168,
                    backgroundColor: '#ddd',
                    marginRight: 12,
                  }}
                />
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{width: 100}}>
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
        <Text>New</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
