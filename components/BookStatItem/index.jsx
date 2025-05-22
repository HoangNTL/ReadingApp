import React from 'react';
import {Text, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {styles} from './style';

export const BookStatItem = ({icon, value, text}) => {
  return (
    <View style={styles.container}>
      <FontAwesomeIcon
        icon={icon}
        size={16}
        color="#535c68"
        style={styles.icon}
      />
      <Text style={styles.text}>
        {value} {text}
      </Text>
    </View>
  );
};
