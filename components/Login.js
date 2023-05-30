import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';



function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [showRegisterForm, setShowRegisterForm] = useState(false); // Estado para controlar la visibilidad del formulario de registro
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/login', {
        username,
        password,
      });
      const userRole = response.data.role;

      if (response.data.success) {
        navigation.navigate('Home');
      } else {
        setErrorMessage('Las credenciales son incorrectas. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      setErrorMessage('Error en el servidor. Por favor, intenta de nuevo más tarde.');
      console.log(error);
    }
  };
  

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/users', {
        username: newUsername,
        password: newPassword,
        name: newName,
        role,
      });


      if (response.data) {
        setMessage('Usuario registrado correctamente');
      } else {
        setMessage('Error al registrar el usuario');
      }


      // Restablecer los campos del formulario
      setNewUsername('');
      setNewPassword('');
      setNewName('');
      setRole('');

    } catch (error) {
      setMessage('Error al registrar el usuario');
      console.log(error);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder='Nombre de usuario'
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder='Contraseña'
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      {!showRegisterForm ? (
        <TouchableOpacity style={styles.button} onPress={() => setShowRegisterForm(true)}>
          <Text style={styles.buttonText}>Registrar usuario</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TextInput
            style={styles.input}
            value={newUsername}
            onChangeText={setNewUsername}
            placeholder='Nuevo nombre de usuario'
          />

          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder='Nueva contraseña'
            secureTextEntry
          />
          
          <TextInput
            style={styles.input}
            value={newName}
            onChangeText={setNewName}
            placeholder='Nombre'
          />
          
          <View style={styles.radioContainer}>
            <Text style={styles.label}>Rol:</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setRole('administrador')}
              >
                <Text style={styles.radioText}>Administrador</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setRole('usuario')}
              >
                <Text style={styles.radioText}>Usuario</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrar usuario</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setShowRegisterForm(false)}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>

          {message ? <Text style={styles.message}>{message}</Text> : null}
        </>
      )}

      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '80%',
    backgroundColor: 'orange',
    borderRadius: 5,
    paddingVertical: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
  message: {
    color: 'green',
    marginTop: 10,
  },
  radioContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  radioGroup: {
    flexDirection: 'row',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  radioText: {
    marginLeft: 5,
  },
});

export default Login;
