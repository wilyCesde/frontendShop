import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

function RegisterCar() {
  const [plateNumber, setPlateNumber] = useState('');
  const [brand, setBrand] = useState('');
  const [state, setState] = useState('');
  const [dailyValue, setDailyValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/cars', {
        plateNumber,
        brand,
        state,
        dailyValue,
      });

      if (response.data) {
        setSuccessMessage('Vehículo registrado correctamente');
        setPlateNumber('');
        setBrand('');
        setState('');
        setDailyValue('');
      } else {
        setErrorMessage('Error al registrar el vehículo');
      }
    } catch (error) {
      setErrorMessage('Error al registrar el vehículo');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Vehículo</Text>
      {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <TextInput
        style={styles.input}
        value={plateNumber}
        onChangeText={setPlateNumber}
        placeholder="Número de placa"
      />
      <TextInput
        style={styles.input}
        value={brand}
        onChangeText={setBrand}
        placeholder="Marca"
      />
      <TextInput
        style={styles.input}
        value={state}
        onChangeText={setState}
        placeholder="Estado"
      />
      <TextInput
        style={styles.input}
        value={dailyValue}
        onChangeText={setDailyValue}
        placeholder="Valor diario"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
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
  successMessage: {
    color: 'green',
    marginTop: 10,
  },
});

export default RegisterCar;
