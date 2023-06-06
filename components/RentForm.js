import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';

function RentForm() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState('');
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [rentNumber, setRentNumber] = useState('');

  useEffect(() => {
    // Obtener la lista de vehículos al cargar el componente
    fetchCars();
    // Obtener la lista de clientes al cargar el componente
    fetchClients();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/api/cars');
      setCars(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/api/clientes');
      setClients(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectCar = (car) => {
    if (car.state === 'disponible') {
      setSelectedCar(car);
      setPlateNumber(car.plateNumber);
      setErrorMessage('');
    } else {
      setErrorMessage('El vehículo seleccionado no está disponible para alquilar');
    }
  };

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setPlateNumber(client.username);
  };

  const handleRent = async () => {
    if (rentNumber === '' || plateNumber === '' || selectedCar === null || selectedClient === null) {
      setErrorMessage('Por favor, completa todos los campos obligatorios');
      return;
    }
  
    if (selectedCar.state !== 'disponible') {
      setErrorMessage('El vehículo seleccionado no está disponible para alquilar');
      return;
    }
  
    try {
      // Obtener la fecha actual
      const rentalDate = new Date();
  
      // Actualizar el estado del vehículo a "alquilado" en el frontend
      const updatedCars = cars.map((car) =>
        car._id === selectedCar._id ? { ...car, state: 'alquilado' } : car
      );
      setCars(updatedCars);
  
      // Enviar la solicitud POST para crear el estado del vehículo a "alquilado" en el backend
      await axios.post(`http://127.0.0.1:3000/api/returnCars/${selectedCar._id}`, {
        rentNumber,
        plateNumber,
        username: selectedClient.username,
        rentalDate,
      });
  
      setSuccessMessage('Vehículo alquilado correctamente');
      setPlateNumber('');
      setSelectedCar(null);
      setSelectedClient(null);
    } catch (error) {
      setErrorMessage('Error al alquilar el vehículo');
      console.log(error);
    }
  };
  

  const handleUpdateState = async (carId) => {
    const updateData = {
      state: 'disponible',
    };

    try {
      await axios.put(`http://127.0.0.1:3000/api/cars/${carId}`, updateData);

      // Actualizar el estado del vehículo en el frontend
      const updatedCars = cars.map((car) =>
        car._id === carId ? { ...car, state: 'disponible' } : car
      );
      setCars(updatedCars);

      setSuccessMessage('Estado del vehículo actualizado correctamente');
    } catch (error) {
      setErrorMessage('Error al actualizar el estado del vehículo');
      console.log(error);
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/api/cars/${carId}`);

      // Eliminar el vehículo del estado en el frontend
      const updatedCars = cars.filter((car) => car._id !== carId);
      setCars(updatedCars);

      setSuccessMessage('Vehículo eliminado correctamente');
    } catch (error) {
      setErrorMessage('Error al eliminar el vehículo');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alquilar Vehículo</Text>
      {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <TextInput
        style={styles.input}
        value={rentNumber}
        onChangeText={setRentNumber}
        placeholder="Número de renta"
      />
      <FlatList
        data={cars}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.carItem, selectedCar?._id === item._id ? styles.selectedCarItem : null]}
            onPress={() => handleSelectCar(item)}
          >
            <View style={styles.carItemContent}>
              <View>
                <Text style={styles.carInfoText}>Placa: {item.plateNumber}</Text>
                <Text style={styles.carInfoText}>Marca: {item.brand}</Text>
                <Text style={styles.carInfoText}>Estado: {item.state}</Text>
                <Text style={styles.carInfoText}>Valor diario: {item.dailyValue}</Text>
              </View>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => handleUpdateState(item._id)}
              >
                <Text style={styles.updateButtonText}>Actualizar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteCar(item._id)}
              >
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
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
            <Text style={styles.userInfoText}>Nombre: {item.nombre}</Text>
            <Text style={styles.userInfoText}>Apellidos: {item.apellidos}</Text>
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
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  successMessage: {
    color: 'green',
    marginTop: 10,
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  carItem: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  carItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  carInfoContainer: {
    flex: 1,
    marginRight: 10,
  },
  carInfoText: {
    fontSize: 16,
  },
  carItemButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  selectedCarItem: {
    backgroundColor: 'yellow',
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  clientItem: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  selectedClientItem: {
    backgroundColor: 'yellow',
  },
  userInfoText: {
    fontSize: 16,
  },
  button: {
    width: '100%',
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
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    paddingVertical: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});


export default RentForm;
