import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import {styles} from './style';
import PropTypes from 'prop-types';

const ButtonCustom = props => {
  return (
    <TouchableOpacity
      style={[styles.button, props.isLoading && styles.buttonDisabled]}
      onPress={props.onPress}
      disabled={props.isLoading}>
      {props.isLoading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <Text style={styles.label}>{props.label}</Text>
      )}
    </TouchableOpacity>
  );
};

ButtonCustom.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default ButtonCustom;
