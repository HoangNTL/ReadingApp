import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import globalStyle from '../../assets/styles/GlobalStyle';
import {getFontFamily} from '../../assets/fonts/helper';

const LibraryScreen = ({navigation}) => {
  return (
    <SafeAreaView style={globalStyle.androidSafeArea}>
      <Text
        style={{
          fontFamily: getFontFamily('Inter', '600'),
          fontSize: 20,
        }}>
        Library
      </Text>
    </SafeAreaView>
  );
};

export default LibraryScreen;
