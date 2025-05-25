import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {styles} from './style';
import PropTypes from 'prop-types';

const TextInputCustom = props => {
  return (
    <>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={props.value}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
          autoCapitalize="none"
        />
      </View>
    </>
  );
};

TextInputCustom.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default TextInputCustom;
