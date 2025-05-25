import React from 'react';
import {View, Text} from 'react-native';
import BackButton from '../../../components/BackButton';
import {styles} from './style';

export const Header = ({title}) => {
  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
