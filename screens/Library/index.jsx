import React, {useEffect, useContext, useState, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import globalStyle from '../../assets/styles/GlobalStyle';
import {getFontFamily} from '../../assets/fonts/helper';
import {getLikedBooks, getSavedBooks} from '../../api/bookApi';
import {UserContext} from '../../contexts/UserContext';
import {useLoading} from '../../hooks/useLoading';

const LibraryScreen = ({navigation}) => {
  const [books, setBooks] = useState([]);
  const [activeTab, setActiveTab] = useState('Liked');

  const {user} = useContext(UserContext);
  const {loading, setLoading} = useLoading();
  const userId = user?.id;
  const tabs = ['Liked', 'Saved'];

  const fetchBooks = useCallback(
    async tab => {
      setLoading(true);
      try {
        let response = [];
        if (tab === 'Liked') {
          response = await getLikedBooks(userId);
        } else if (tab === 'Saved') {
          response = await getSavedBooks(userId);
        }
        setBooks(response || []);
      } catch (error) {
        console.error(`Error fetching ${tab} books:`, error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    },
    [userId, setLoading],
  );

  useEffect(() => {
    if (userId) {
      fetchBooks(activeTab);
    }
  }, [userId, activeTab, fetchBooks]);

  return (
    <SafeAreaView style={globalStyle.androidSafeArea}>
      <Text
        style={{
          fontSize: 24,
          color: '#000',
          fontFamily: getFontFamily('Inter', '700'),
          marginLeft: 20,
        }}>
        Library
      </Text>
      {/* Tabs */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
        }}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={{
              paddingVertical: 10,
              borderBottomWidth: 3,
              borderBottomColor: activeTab === tab ? '#000' : 'transparent',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: activeTab === tab ? '#000' : '#888',
                fontFamily: getFontFamily('Inter', '600'),
              }}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List book */}
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
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
      )}
    </SafeAreaView>
  );
};

export default LibraryScreen;
