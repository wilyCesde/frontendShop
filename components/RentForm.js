import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';

function RentForm() {
  const [cars, setCars] = useState([]); // Estado para almacenar la lista de vehículos
  const [selectedCar, setSelectedCar] = useState(null); // Estado para almacenar el vehículo seleccionado
  const [clients, setClients] = useState([]); // Estado para almacenar la lista de clientes
  const [selectedClient, setSelectedClient] = useState(null); // Estado para almacenar el cliente seleccionado
  const [plateNumber, setPlateNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Realizar una solicitud al backend para obtener la lista de vehículos
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/cars');
        const carList = response.data;
        setCars(carList);
      } catch (error) {
        setErrorMessage('Error al obtener la lista de vehículos');
        console.log(error);
      }
    };

    // Realizar una solicitud al backend para obtener la lista de clientes
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/clientes');
        const clientList = response.data;
        setClients(clientList);
      } catch (error) {
        setErrorMessage('Error al obtener la lista de clientes');
        console.log(error);
      }
    };

    fetchCars();
    fetchClients();
  }, []);

  const handleSelectCar = (car) => {
    setSelectedCar(car);
    setPlateNumber(car.plateNumber);
  };

  const handleSelectClient = (client) => {
    setSelectedClient(client);
  };

  const handleRent = async () => {
    if (!selectedCar) {
      setErrorMessage('Por favor, selecciona un vehículo');
      return;
    }

    if (!selectedClient) {
      setErrorMessage('Por favor, selecciona un cliente');
      return;
    }

    if (selectedCar.state !== 'disponible') {
      setErrorMessage('El vehículo seleccionado no está disponible para alquilar');
      return;
    }

    const rentData = {
      car: selectedCar,
      client: selectedClient,
      plateNumber: plateNumber,
    };

    try {
      const response = await axios.post('http://127.0.0.1:3000/api/createReturnCar', rentData);
      setSuccessMessage('Vehículo alquilado correctamente');
      setPlateNumber('');
      setSelectedCar(null);
      setSelectedClient(null);
    } catch (error) {
      setErrorMessage('Error al alquilar el vehículo');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alquilar Vehículo</Text>
      {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <FlatList
        data={cars}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.carItem, selectedCar?._id === item._id ? styles.selectedCarItem : null]}
            onPress={() => handleSelectCar(item)}
          >
            <Text>{item.plateNumber}</Text>
            <Text>{item.brand}</Text>
            <Text>{item.state}</Text>
            <Text>{item.dailyValue}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.sectionTitle}>Seleccionar Cliente</Text>
      <FlatList
        data={clients}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.clientItem, selectedClient?._id === item._id ? styles.selectedClientItem : null]}
            onPress={() => handleSelectClient(item)}
          >
            <Text>{item.nombre}</Text>
            <Text>{item.apellidos}</Text>
          </TouchableOpacity>
        )}
      />
      <TextInput
        style={styles.input}
        value={plateNumber}
        onChangeText={setPlateNumber}
        placeholder="Número de placa"
      />
      <TouchableOpacity style={styles.button} onPress={handleRent}>
        <Text style={styles.buttonText}>Alquilar</Text>
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
  carItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  selectedCarItem: {
    backgroundColor: 'yellow',
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  clientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  selectedClientItem: {
    backgroundColor: 'yellow',
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
    backgroundColor: 'yellow',
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

export default RentForm;
