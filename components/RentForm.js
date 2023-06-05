import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';




function RentForm() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [plateNumber, setPlateNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [rentNumber,setrentNumber] = useState("");
  const [username,setusername]=useState("");

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
    setPlateNumber(client.username) ;
  };

  const handleRent = async () => {
    
    if(rentNumber,plateNumber,username === ''){
      setErrorMessage("campos obligatorios");
    }

    if (!selectedCar) {
      setErrorMessage('Por favor, selecciona un vehículo');
    
    }

    if (!selectedClient) {
      setErrorMessage('Por favor, selecciona un cliente');
    
    }

    if (selectedCar.state !== 'disponible') {
      setErrorMessage('El vehículo seleccionado no está disponible para alquilar');
      
    }
 

    try {
      // Actualizar el estado del vehículo a "alquilado" en el frontend
      const updatedCars = cars.map((car) =>
        car._id === selectedCar._id ? { ...car, state: 'alquilado' } : car
      );
      setCars(updatedCars);

      // Enviar la solicitud POST para crear el estado del vehículo a "alquilado" en el backend

      await axios.post(`http://127.0.0.1:3000/api/createReturnCars`,{
        rentNumber,
        plateNumber,
        username
      } );

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
      state: 'disponible'
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
       value={username}
       onChangeText={setrentNumber}
       placeholder='número de renta'
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
                <Text>{item.plateNumber}</Text>
                <Text>{item.brand}</Text>
                <Text>{item.state}</Text>
                <Text>{item.dailyValue}</Text>
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
    paddingHorizontal: 40, 
    fontSize: 24,
    marginBottom: 20,
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
  carItemSeparator: {
    height: 1,
    backgroundColor: 'lightgray',
    marginVertical: 5,
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
  clientItemSeparator: {
    height: 1,
    backgroundColor: 'lightgray',
    marginVertical: 5,
  },
  selectedClientItem: {
    backgroundColor: 'yellow',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
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
    width: '100%',
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 10,
    marginBottom: 10,
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  updateButton: {
    width: '100%',
    backgroundColor: 'green',
    borderRadius: 5,
    paddingVertical: 10,
    marginBottom: 10,
  },
  updateButtonText: {
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
