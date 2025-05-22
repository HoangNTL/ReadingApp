import React, {useState, useContext} from 'react';
import {Text, View, Alert} from 'react-native';
import {UserContext} from '../../contexts/UserContext';
import {PasswordInput} from '../../components/PasswordInput';
import {ButtonCustom} from '../../components/ButtonCustom';
import {TextInputCustom} from '../../components/TextInputCustom';
import {styles} from './style';
import {BackButton} from '../../components/BackButton';
import {useLoading} from '../../hooks/useLoading';

const RegisterScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //   const [dob, setDob] = useState(new Date());

  const {register} = useContext(UserContext);
  const {loading, setLoading} = useLoading();

  const handleSubmit = async () => {
    if (!username || !email || !password) {
      Alert.alert('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const success = await register(username, email, password);
      if (!success) {
        Alert.alert('Registration failed. Please check your credentials.');
        return;
      }
      navigation.navigate('App');
    } catch (error) {
      Alert.alert('Error', 'An error occurred during registration.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View style={styles.backButton}>
        <BackButton navigation={navigation} />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>

        {/* Username */}
        <View style={styles.inputGroup}>
          <TextInputCustom
            label="Username"
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
          />
        </View>

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
        <View style={styles.passwordGroup}>
          <PasswordInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />
        </View>

        {/* Date of Birth */}

        {/* Button */}
        <ButtonCustom
          label="Register"
          onPress={handleSubmit}
          isLoading={loading}
        />
      </View>
    </>
  );
};

export default RegisterScreen;
