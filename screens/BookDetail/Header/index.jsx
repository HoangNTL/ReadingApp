import React from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BackButton} from '../../../components/BackButton';
import {styles} from './style';

export const Header = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
