import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {getFontFamily} from '../../assets/fonts/helper';

export const IconButton = ({variant = 'solid', icon, label, onPress}) => {
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: isOutline ? 'transparent' : '#000',
        borderWidth: isOutline ? 1.5 : 0,
        borderRadius: 24,
        paddingHorizontal: 48,
        paddingVertical: 12,
      }}
      onPress={onPress}>
      <FontAwesomeIcon
        icon={icon}
        size={18}
        color={isOutline ? '#000' : '#fff'}
        style={{marginRight: 5}}
      />
      <Text
        style={{
          color: isOutline ? '#000' : '#fff',
          fontSize: 16,
          fontFamily: getFontFamily('Inter', '600'),
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
