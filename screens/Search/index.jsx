import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import globalStyle from '../../assets/styles/GlobalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {faList} from '@fortawesome/free-solid-svg-icons';
import {getBookByKeyword, getBooks} from '../../api/bookApi';

const SearchScreen = ({navigation}) => {
  const [books, setBooks] = React.useState([]);
  const [keyword, setKeyword] = useState('');

  React.useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = async () => {
    if (!keyword.trim()) return;
    try {
      const response = await getBookByKeyword(keyword);
      console.log('Search results:', response);
      setBooks(response);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      Keyboard.dismiss();
    }
  };

  return (
    <SafeAreaView style={globalStyle.androidSafeArea}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          paddingBottom: 56,
        }}>
        {/* Search Bar */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 40,
            borderColor: '#95a5a6',
            borderWidth: 1,
            margin: 10,
            paddingLeft: 10,
            borderRadius: 24,
            backgroundColor: '#fff',
          }}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size={20}
            color="#95a5a6"
            style={{marginRight: 10}}
          />
          <TextInput
            style={{
              flex: 1,
              height: '100%',
            }}
            value={keyword}
            onChangeText={setKeyword}
            placeholder="Search for books..."
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
        </View>

        {/* List of Books */}
        <View
          style={{
            paddingHorizontal: 8,
            marginBottom: 60,
          }}>
          <FlatList
            data={books}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('BookDetail', {bookId: item.id})
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: 120,
                    margin: 8,
                  }}>
                  <Image
                    source={{
                      uri: item?.cover_image,
                    }}
                    style={{
                      width: 80,
                      height: '100%',
                      backgroundColor: '#ddd',
                      marginRight: 10,
                    }}
                  />
                  {/* Book information */}
                  <View
                    style={{
                      // display: 'flex',
                      justifyContent: 'space-between',
                    }}>
                    {/* Title */}
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#2c3e50',
                      }}>
                      {item?.title}
                    </Text>

                    {/* Author */}
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#95a5a6',
                      }}>
                      {item?.author}
                    </Text>

                    {/* Book description */}
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 10,
                      }}>
                      {/* Views */}
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <FontAwesomeIcon
                          icon={faEye}
                          size={16}
                          color="#95a5a6"
                          style={{
                            marginRight: 5,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#95a5a6',
                          }}>
                          {item?.views_count}
                        </Text>
                      </View>

                      {/* Likes */}
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <FontAwesomeIcon
                          icon={faHeart}
                          size={16}
                          color="#95a5a6"
                          style={{
                            marginRight: 5,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#95a5a6',
                          }}>
                          {item?.total_likes}
                        </Text>
                      </View>

                      {/* Chapters */}
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <FontAwesomeIcon
                          icon={faList}
                          size={16}
                          color="#95a5a6"
                          style={{
                            marginRight: 5,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#95a5a6',
                          }}>
                          {item?.total_chapters}
                        </Text>
                      </View>
                    </View>

                    {/* Genre */}
                    <View>
                      <FlatList
                        horizontal={true}
                        data={item.genres}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => (
                          <View
                            style={{
                              backgroundColor: '#ecf0f1',
                              borderRadius: 12,
                              paddingHorizontal: 8,
                              paddingVertical: 4,
                              marginRight: 8,
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#7f8c8d',
                              }}>
                              {item.name}
                            </Text>
                          </View>
                        )}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
