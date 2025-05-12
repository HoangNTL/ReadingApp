import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
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
} from '@fortawesome/free-solid-svg-icons';
import {getBookById} from '../../api/bookApi';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

const BookDetailScreen = ({navigation}) => {
  const route = useRoute();
  const {bookId} = route.params;
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const data = await getBookById(bookId);
        setBook(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  return (
    <SafeAreaView style={globalStyle.androidSafeArea}>
      {/* Header */}
      <View
        style={{
          // height: 40,
          backgroundColor: '#fff',
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
        }}>
        <TouchableOpacity
          style={{
            padding: 10,
            // position: 'absolute',
            // top: 40,
            left: 4,
          }}
          onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {book?.title}
        </Text>
      </View>

      <View>
        {/* Book Cover */}
        <View
          style={{
            backgroundColor: 'gray',
            height: 200,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 12,
          }}>
          <Image
            source={{
              uri: book?.cover_image,
            }}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>

        {/* Book Title */}
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 12,
          }}>
          <Text
            style={{
              fontSize: 20,
            }}>
            {book?.title}
          </Text>
        </View>

        {/* Book Author */}
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 12,
          }}>
          <Text>{book?.author}</Text>
        </View>

        {/* Book Views, likes, chapters*/}
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 18,
          }}>
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
                {book?.views_count} Reads
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
                {book?.total_likes} Likes
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
                {book?.total_chapters} Chapters
              </Text>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 24,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 16,
              marginBottom: 12,
            }}>
            {/* Read button */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 16,
              }}>
              <TouchableOpacity
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent: 'center',
                  gap: 4,
                  backgroundColor: '#000',
                  borderRadius: 24,
                  paddingHorizontal: 48,
                  paddingVertical: 8,
                }}>
                <FontAwesomeIcon
                  icon={faBookOpen}
                  size={18}
                  color="#fff"
                  style={{
                    marginRight: 5,
                  }}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                  }}>
                  Read
                </Text>
              </TouchableOpacity>
            </View>

            {/* Add to Library button */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 16,
              }}>
              <TouchableOpacity
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent: 'center',
                  gap: 4,
                  backgroundColor: '#fff',
                  borderColor: '#000',
                  borderWidth: 1,
                  borderRadius: 24,
                  paddingHorizontal: 48,
                  paddingVertical: 8,
                }}>
                <FontAwesomeIcon
                  icon={faPlus}
                  size={18}
                  color="#000"
                  style={{
                    marginRight: 5,
                  }}
                />
                <Text
                  style={{
                    color: '#000',
                    fontSize: 16,
                  }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Genre */}
        <View
          style={{
            display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            marginBottom: 24,
            paddingHorizontal: 16,
          }}>
          <Text
            style={{
              fontSize: 20,
              // fontWeight: 'bold',
              marginBottom: 4,
            }}>
            Genre
          </Text>
          <FlatList
            horizontal={true}
            data={book?.genres}
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
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: '#7f8c8d',
                  }}>
                  {item.name}
                </Text>
              </View>
            )}
          />
        </View>

        {/* Description */}
        <View
          style={{
            display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            marginBottom: 24,
            paddingHorizontal: 16,
          }}>
          <Text
            style={{
              fontSize: 20,
              // fontWeight: 'bold',
              marginBottom: 4,
            }}>
            Description
          </Text>
          <Text
            style={{
              fontSize: 14,
              borderRadius: 8,
              borderColor: '#f0f0f0',
              borderWidth: 1,
              padding: 8,
              // marginBottom: 24
            }}>
            {book?.description}
          </Text>
        </View>

        {/* Chapters */}
        {/* <View>
          <Text
            style={{
              fontSize: 20,
              // fontWeight: 'bold',
              marginBottom: 4,
              paddingHorizontal: 16
            }}
          >
            Chapters
          </Text>
          <FlatList
            data={[...Array(10).keys()]}
            renderItem={({ item }) => (
              <View
                style={{
                  padding: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: '#f0f0f0'
                }}
              >
                <Text>Chapter {item + 1}</Text>
              </View>
            )}
          />
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default BookDetailScreen;
