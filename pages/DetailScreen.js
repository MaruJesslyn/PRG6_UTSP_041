import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import axios from 'axios';

export default function DetailScreen({ route, navigation }) {
  const data = route.params?.data;

  const [pemilik, setPemilik] = useState(data?.namaPemilik || '');
  const [jenisHewan, setJenisHewan] = useState(data?.jenisHewan || '');
  const [kandang, setKandang] = useState(data?.kandangHewan || '');
  const [berat, setBerat] = useState(data?.beratHewan?.toString() || '');

  const saveData = async () => {
    const payload = {
      pemilikHewan: pemilik,
      jenisHewan: jenisHewan,
      kandangHewan: kandang,
      beratHewan: parseInt(berat),
    };

    try {
      await axios.post('http://10.1.11.206:8080/api/farms', payload);
      Alert.alert('Sukses', 'Data berhasil ditambahkan');
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Terjadi kesalahan saat menambahkan data');
    }
  };

  const deleteData = async () => {
    try {
      await axios.delete(`http://10.1.11.206:8080/api/farms/${data.idHewan}`);
      Alert.alert('Sukses', 'Data berhasil dihapus');
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Terjadi kesalahan saat menghapus data');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {data ? 'Detail Data' : 'Tambah Data'}
      </Text>

        <TouchableOpacity
            style={styles.kembali}
            onPress={() => navigation.navigate('Dashboard')}
          >
        <Text>Kembali</Text>
        </TouchableOpacity>

      <Text>Pemilik</Text>
      <TextInput
        style={styles.input}
        value={pemilik}
        onChangeText={setPemilik}
        placeholder="Masukkan nama pemilik"
      />

      <Text>Jenis Hewan</Text>
      <TextInput
        style={styles.input}
        value={jenisHewan}
        keyboardType='numeric'
        maxLength={1}
        onChangeText={setJenisHewan}
        placeholder="Masukkan jenis hewan"
      />

      <Text>Kandang</Text>
      <TextInput
        style={styles.input}
        value={kandang}
        onChangeText={setKandang}
        placeholder="Masukkan kandang"
      />

      <Text>Berat</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={berat}
        onChangeText={setBerat}
        placeholder="Masukkan berat"
      />

      {!data ? (
        <TouchableOpacity style={styles.button} onPress={saveData}>
          <Text style={styles.buttonText}>+ Add Data</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.deleteButton} onPress={deleteData}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    height: 45
  },
  button: {
    backgroundColor: '#c8ecff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: 'bold'
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  kembali: {
    backgroundColor: '#ddd',
    width: '30%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  }
});
