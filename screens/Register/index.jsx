import React, {useState, useContext} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {UserContext} from '../../contexts/UserContext';
import {Alert} from 'react-native';

const RegisterScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //   const [dob, setDob] = useState(new Date());

  const {register} = useContext(UserContext);

  const handleSubmit = () => {
    if (!username || !email || !password) {
      Alert.alert('Please fill in all fields.');
      return;
    }

    const success = register(username, email, password);

    if (!success) {
      Alert.alert('Registration failed. Please check your credentials.');
      return;
    }

    navigation.navigate('App');
  };

  return (
    <>
      <TouchableOpacity
        style={{
          padding: 10,
          position: 'absolute',
          top: 40,
          left: 4,
        }}
        onPress={() => navigation.goBack()}>
        <FontAwesomeIcon icon={faArrowLeft} size={24} />
      </TouchableOpacity>

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
          Register
        </Text>

        {/* Username */}
        <View style={{marginTop: 20}}>
          <Text>Username</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#000000',
              padding: 12,
            }}
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
          />
        </View>

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

        {/* Date of Birth */}
        {/* <View style={{marginTop: 20, marginBottom: 24}}>
          <Text>Date of Birth</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#000000',
              padding: 12,
            }}
            value={dob.toDateString()}
            onChangeText={text => setDob(new Date(text))}
            placeholder="YYYY-MM-DD"
          />
        </View> */}

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
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RegisterScreen;
