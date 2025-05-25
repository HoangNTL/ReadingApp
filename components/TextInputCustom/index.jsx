import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {styles} from './style';

export const TextInputCustom = ({label, value, onChangeText, placeholder}) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          autoCapitalize="none"
        />
      </View>
    </>
  );
};
