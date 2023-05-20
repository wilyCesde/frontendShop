import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form';

import {styles} from '../assets/styles/styles'

export default function Customer() {
  // configuración del formulario
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      firstName: '',
      lastName: ''
    }
  });

  const onSubmit = data => console.log(data);

  return (
    <View style={styles.container}>
      <Text>Actualización de Clientes</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Nombre Completo"
            mode="outlined"
            style={{ backgroundColor: 'powderblue' }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      {errors.firstName && <Text style={{ color: 'red' }}>El nombre es obligatorio</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Apellidos"
            mode="outlined"
            style={{ marginTop: 10 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />
      {errors.lastName && <Text style={{ color: 'red' }}>El apellido es obligatorio</Text>}
      <View style={{marginTop:20, flexDirection:'row'}}>
        <Button 
          icon="content-save" 
          mode="contained" onPress={() => console.log('Pressed')}>
          Guardar
        </Button>
        <Button 
          style={{backgroundColor:'orange',marginLeft:10}}
          icon="card-search-outline" 
          mode="contained" onPress={() => console.log('Pressed')}>
          Buscar
        </Button>
      </View>
      <View style={{marginTop:20, flexDirection:'row'}}>
        <Button 
          icon="pencil-outline" 
          mode="contained" onPress={() => console.log('Pressed')}>
          Actualizar
        </Button>
        <Button 
          style={{backgroundColor:'red',marginLeft:10}}
          icon="delete-outline" 
          mode="contained" onPress={() => console.log('Pressed')}>
          Eliminar
        </Button>
      </View>
    
    </View>
  );
}

