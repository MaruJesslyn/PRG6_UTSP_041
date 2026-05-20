import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default function LoginScreen({ navigation }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    if (username === 'Sga' && password === '12345') {
      navigation.replace('Dashboard');
    } else {
      alert('Login gagal');
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Farm Apps 041</Text>

      <Text>Username</Text>

      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <Text>Password</Text>

      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.row}>

        <TouchableOpacity style={styles.button} onPress={login}>
          <Text>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setUsername('');
            setPassword('');
          }}
        >
          <Text>Clear</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    padding:20,
    backgroundColor:'#fff'
  },

  title:{
    fontSize:24,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:40
  },

  input:{
    borderWidth:1,
    borderRadius:8,
    marginBottom:15,
    paddingHorizontal:10
  },

  row:{
    flexDirection:'row',
    justifyContent:'space-between'
  },

  button:{
    backgroundColor:'#c8ecff',
    width:'45%',
    padding:15,
    borderRadius:10,
    alignItems:'center'
  }
});