import React, {useState} from 'react';
import {Text, View, Alert} from 'react-native';
import {PasswordInput} from '../../components/PasswordInput';
import {ButtonCustom} from '../../components/ButtonCustom';
import {TextInputCustom} from '../../components/TextInputCustom';
import {styles} from './style';
import {BackButton} from '../../components/BackButton';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../../redux/slices/userSlice';

const RegisterScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //   const [dob, setDob] = useState(new Date());

  const isValidEmail = value => /\S+@\S+\.\S+/.test(value);

  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.loading);

  const handleSubmit = async () => {
    if (!username || !email || !password) {
      Alert.alert('Please fill in all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Please enter a valid email address.');
      return;
    }

    try {
      const result = await dispatch(
        register({username, email, password}),
      ).unwrap();
      if (result) {
        navigation.navigate('App');
      }
    } catch (error) {
      Alert.alert(
        'Registration failed',
        error?.message || 'An error occurred.',
      );
      console.error('Registration error:', error);
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
