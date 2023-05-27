import { View, Text, FlatList } from 'react-native'
import { styles } from "../assets/styles/styles"
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button } from 'react-native-paper'




export default function ListCustomer() {


  const [data, setData] = useState([]);


  const getCustomers = async () => {
    const response = await axios.get(`http://127.0.0.1:3000/api/clientes`)
    setData(response.data)
    console.log(data);
  }


  useEffect(() => {
    //getCustomers();
    //console.log(data);
  })



  return (
    <View style={styles.container}>
      <Button
        style={{ backgroundColor: 'red', marginLeft: 10, marginBottom: 10 }}
        icon="card-search-outline"
        mode="contained"
        onPress={getCustomers}
      >
        Listar Clientes
      </Button>
      <Text>Listado de Clientes</Text>
      <FlatList
        data={data}
        renderItem={({ item }) =>
          <Text style={{backgroundColor:'gary', borderRadius:5, padding:10, textAlign:'center',marginTop:5}}>{item.nombre}{item.apellido}
          </Text>}
      />
    </View>
  );
}