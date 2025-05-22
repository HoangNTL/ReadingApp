import React from 'react';
import {Text, TextInput} from 'react-native';
import {styles} from './style';

export const TextInputCustom = ({label, value, onChangeText, placeholder}) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </>
  );
};
