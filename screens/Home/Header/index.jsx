import React, {useState, useContext} from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';
import {UserContext} from '../../../contexts/UserContext';
import {useNavigation} from '@react-navigation/native';
import {styles} from './style';

export const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const {user, logout} = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reading app</Text>
      <View>
        <TouchableOpacity onPress={() => setShowDropdown(prev => !prev)}>
          <View style={styles.avatarWrapper}>
            <Text style={styles.avatarText}>
              {user ? user.username.charAt(0).toUpperCase() : '?'}
            </Text>
          </View>
        </TouchableOpacity>

        {showDropdown && (
          <View style={styles.dropdown}>
            <Text style={styles.greeting}>Hi, {user?.username}!</Text>
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={() => {
                setShowDropdown(false);
                Alert.alert('Logout', 'Are you sure?', [
                  {
                    text: 'Cancel',
                    onPress: () => setShowDropdown(false),
                    style: 'cancel',
                  },
                  {
                    text: 'Yes',
                    onPress: () => {
                      setShowDropdown(false);
                      logout();
                      navigation.navigate('Login');
                    },
                  },
                ]);
              }}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
