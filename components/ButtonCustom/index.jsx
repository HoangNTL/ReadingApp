import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import {styles} from './style';

export const ButtonCustom = ({label, onPress, isLoading = false}) => {
  return (
    <TouchableOpacity
      style={[styles.button, isLoading && styles.buttonDisabled]}
      onPress={onPress}
      disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};
