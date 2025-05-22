import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {UserContext} from '../../contexts/UserContext';
import {TextInputCustom} from '../../components/TextInputCustom';
import {PasswordInput} from '../../components/PasswordInput';
import {ButtonCustom} from '../../components/ButtonCustom';
import {styles} from './style';
import {useLoading} from '../../hooks/useLoading';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login} = useContext(UserContext);
  const {loading, setLoading} = useLoading();

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const success = await login(email, password);
      if (!success) {
        Alert.alert('Login failed. Please check your credentials.');
        return;
      }
      navigation.navigate('App');
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
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
