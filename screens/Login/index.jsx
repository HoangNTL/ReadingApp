import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import TextInputCustom from '../../components/TextInputCustom';
import PasswordInput from '../../components/PasswordInput';
import ButtonCustom from '../../components/ButtonCustom';
import {styles} from './style';
import {useSelector, useDispatch} from 'react-redux';
import {login} from '../../redux/slices/userSlice';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isValidEmail = value => /\S+@\S+\.\S+/.test(value);

  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.loading);

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Please fill in all fields.');
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert('Please enter a valid email address.');
      return;
    }

    try {
      const result = await dispatch(login({email, password})).unwrap();
      if (result) {
        navigation.navigate('App');
      }
    } catch (error) {
      Alert.alert('Login failed', error?.message || 'Something went wrong');
      setPassword('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email */}
      <View style={styles.inputGroup}>
        <TextInputCustom
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
      </View>

      {/* Password */}
      <View style={styles.inputGroup}>
        <PasswordInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
      </View>

      {/* Button */}
      <View style={styles.buttonGroup}>
        <ButtonCustom
          label="Login"
          onPress={handleSubmit}
          isLoading={loading}
        />
      </View>

      {/* register link */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <TouchableOpacity>
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate('Register')}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
