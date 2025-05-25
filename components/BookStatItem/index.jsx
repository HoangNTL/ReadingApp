import React from 'react';
import {Text, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {styles} from './style';
import PropTypes from 'prop-types';

const BookStatItem = props => {
  return (
    <View style={styles.container}>
      <FontAwesomeIcon
        icon={props.icon}
        size={16}
        color="#535c68"
        style={styles.icon}
      />
      <Text style={styles.text}>
        {props.value} {props.text}
      </Text>
    </View>
  );
};

BookStatItem.propTypes = {
  icon: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default BookStatItem;
