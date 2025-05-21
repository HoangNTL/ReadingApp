import React, {useEffect, useState, useContext} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import globalStyle from '../../assets/styles/GlobalStyle';
import {getFontFamily} from '../../assets/fonts/helper';
import {getTopViewedBooks, getLatestBooks} from '../../api/bookApi';
import {UserContext} from '../../contexts/UserContext';

const HomeScreen = ({navigation}) => {
  const [topViewedBooks, setTopViewedBooks] = useState([]);
  const [latestBooks, setLatestBooks] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const {user, logout} = useContext(UserContext);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const topBooks = await getTopViewedBooks();
        const latestBooks = await getLatestBooks();

        setTopViewedBooks(topBooks);
        setLatestBooks(latestBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
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
          position: 'relative',
        }}>
        <Text
          style={{
            fontFamily: getFontFamily('Inter', '600'),
            fontSize: 24,
          }}>
          Reading app
        </Text>
        <View>
          <TouchableOpacity onPress={() => setShowDropdown(prev => !prev)}>
            <View
              style={{
                backgroundColor: '#e67e22',
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: getFontFamily('Inter', '600'),
                  fontSize: 12,
                  color: '#000',
                }}>
                {user ? user.username.charAt(0).toUpperCase() : '?'}
              </Text>
            </View>
          </TouchableOpacity>

          {showDropdown && (
            <View
              style={{
                position: 'absolute',
                top: 50, // khoảng cách dưới avatar
                right: 0,
                width: 180,
                backgroundColor: '#fff',
                borderRadius: 8,
                padding: 12,
                shadowColor: '#000',
                shadowOpacity: 0.2,
                shadowOffset: {width: 0, height: 2},
                shadowRadius: 4,
                elevation: 5,
                zIndex: 10,
              }}>
              <Text
                style={{
                  paddingBottom: 8,
                }}>
                Xin chào, {user?.username}!
              </Text>
              <TouchableOpacity
                style={{
                  paddingVertical: 8,
                  // paddingHorizontal: 12,
                  borderRadius: 8,
                  alignItems: 'center',
                  backgroundColor: '#e74c3c',
                }}
                onPress={() => {
                  // TODO: thêm logic đăng xuất
                  setShowDropdown(false);
                  Alert.alert(
                    'Đăng xuất',
                    'Bạn có chắc chắn muốn đăng xuất không?',
                    [
                      {
                        text: 'Hủy',
                        onPress: () => setShowDropdown(false),
                        style: 'cancel',
                      },
                      {
                        text: 'Đăng xuất',
                        onPress: () => {
                          setShowDropdown(false);
                          logout();
                          navigation.navigate('Login');
                        },
                      },
                    ],
                  );
                }}>
                <Text style={{}}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Content */}
      <View style={{paddingHorizontal: 20}}>
        {/* book list */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 10,
            marginTop: 10,
          }}>
          Hot
        </Text>
        <View>
          <FlatList
            data={topViewedBooks}
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
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 10,
            marginTop: 10,
          }}>
          New
        </Text>
        <View>
          <FlatList
            data={latestBooks}
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
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
