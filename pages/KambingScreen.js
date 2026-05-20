import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

export default function KambingScreen({ navigation }) {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get('http://10.1.11.206:8080/api/farms/type/3');
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Pemilik Kambing</Text>

      <TouchableOpacity
        style={styles.kembali}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text>Kembali</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('Detail', {
                data: item,
                jenis: '3',
              })
            }
          >
            <Text style={styles.name}>{item.namaPemilik}</Text>
            <Text>{item.kandangHewan}</Text>
            <Text>Rp {item.hargaHewan}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  card: {
    padding: 15,
    borderBottomWidth: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
  },
  kembali: {
    backgroundColor: '#ddd',
    width: '30%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
