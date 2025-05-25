import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {styles} from './style';

export const IconButton = ({
  variant = 'solid',
  icon,
  label,
  onPress,
  disabled = false,
  loading = false,
}) => {
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isOutline ? styles.outlineButton : styles.solidButton,
        disabled || loading ? styles.disabled : null,
      ]}
      onPress={disabled || loading ? null : onPress}
      activeOpacity={disabled || loading ? 1 : 0.7}
      disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={isOutline ? '#000' : '#FFF'}
          style={styles.iconMargin}
        />
      ) : (
        <FontAwesomeIcon
          icon={icon}
          size={18}
          color={isOutline ? '#000' : '#FFF'}
          style={styles.iconMargin}
        />
      )}

      <Text
        style={[
          styles.label,
          isOutline ? styles.outlineLabel : styles.solidLabel,
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
