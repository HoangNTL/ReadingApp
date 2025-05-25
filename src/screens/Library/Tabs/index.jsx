import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {styles} from './style';

export const Tabs = ({activeTab, onTabChange}) => {
  const tabs = ['Liked', 'Saved'];

  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab}
          onPress={() => onTabChange(tab)}
          style={[styles.tab, activeTab === tab && styles.activeTab]}>
          <Text
            style={[
              styles.tabText,
              activeTab === tab ? styles.activeTabText : styles.inactiveTabText,
            ]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
