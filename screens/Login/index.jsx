import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSubmit = () => {
    console.log('Email:', email);
    console.log('Password:', password);

    navigation.navigate('App');
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
      }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
        }}>
        Login
      </Text>

      {/* Email */}
      <View style={{marginTop: 20}}>
        <Text>Email</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#000000',
            padding: 12,
          }}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
      </View>

      {/* Password */}
      <View style={{marginTop: 20, marginBottom: 24}}>
        <Text>Password</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#000000',
            padding: 12,
          }}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
      </View>

      {/* Button */}
      <TouchableOpacity
        style={{
          backgroundColor: '#000000',
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
          alignItems: 'center',
        }}
        onPress={handleSubmit}>
        <Text
          style={{
            color: '#ffff',
            fontSize: 18,
          }}>
          Login
        </Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity>
          <Text
            style={{
              color: '#0000ff',
              // fontWeight: 'bold',
            }}
            onPress={() => navigation.navigate('RegisterScreen')}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
