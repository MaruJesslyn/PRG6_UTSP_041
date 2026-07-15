import React, { useState } from 'react';
import { View, TextInput, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { createPeople, updatePeople } from '../services/api';

export default function FormPeopleScreen({ route, navigation }) {
  const people = route.params?.people;
  const [namaUser, setNamaUser] = useState(people?.namaUser || "");
  const [jenisUser, setJenisUser] = useState(people?.jenisUser || "");
  const [hubunganUser, setHubunganUser] = useState(people?.hubunganUser || "");
  const [fotoUser, setFotoUser] = useState(people?.fotoUser || null);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert("Camera permission denied");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({ allowsEditing: true });
    if (!result.canceled) {
      setFotoUser(result.assets[0].uri);
    }
  };

  const saveData = async () => {
    try {
      const data = { namaUser, jenisUser, hubunganUser, fotoUser };
      if (people) {
        await updatePeople(people.idUser, data);
      } else {
        await createPeople(data);
      }
      navigation.goBack();
    } catch (err) {
      console.error("Error saving people:", err);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput placeholder="Nama" value={namaUser} onChangeText={setNamaUser} />
      <TextInput placeholder="Jenis" value={jenisUser} onChangeText={setJenisUser} />
      <TextInput placeholder="Hubungan" value={hubunganUser} onChangeText={setHubunganUser} />

      <Button title="Ambil Foto" onPress={takePhoto} />
      {fotoUser && <Image source={{ uri: fotoUser }} style={{ width: 200, height: 200 }} />}

      <Button title="Simpan" onPress={saveData} />
    </View>
  );
}
