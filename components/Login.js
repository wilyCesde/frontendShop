import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [showRegisterForm, setShowRegisterForm] = useState(false); // Estado para controlar la visibilidad del formulario de registro

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/users/login', { username, password });
      // aquí puedes guardar la respuesta en el estado de la aplicación o en el almacenamiento local si la autenticación es exitosa
      // la respuesta probablemente contendrá un token de autenticación que puedes usar para futuras solicitudes autenticadas
    } catch (error) {
      // si hay un error (por ejemplo, credenciales incorrectas), puedes establecer un mensaje de error para mostrar en el formulario
      setErrorMessage('Las credenciales son incorrectas. Por favor, intenta de nuevo.');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/users', {
        username: newUsername,
        password: newPassword,
        name: newName,
        role: newRole
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
      setNewRole('');
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
          <TextInput
            style={styles.input}
            value={newRole}
            onChangeText={setNewRole}
            placeholder='Rol'
          />
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
});

export default Login;

