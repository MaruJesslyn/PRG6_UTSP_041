import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';
import { createTracker, getPeoples } from '../services/api';

export default function FormTrackerScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [latLoc, setLatLoc] = useState("");
  const [ingLoc, setIngLoc] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getPeoples();
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching peoples:", err);
      }
    })();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let loc = await Location.getCurrentPositionAsync({});
        setLatLoc(loc.coords.latitude.toString());
        setIngLoc(loc.coords.longitude.toString());
      }
    })();
  }, []);

  const saveData = async () => {
    try {
      if (!selectedUser) {
        alert("Pilih user terlebih dahulu");
        return;
      }
      const data = {
        peoples: { idUser: selectedUser },
        ingLoc,
        latLoc  
      };
      console.log("Sending tracker data:", data);
      await createTracker(data);
      navigation.goBack();
    } catch (err) {
      console.error("Error saving tracker:", err.response?.data || err.message);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Picker
        selectedValue={selectedUser}
        onValueChange={(value) => setSelectedUser(value)}
      >
        <Picker.Item label="-- Pilih User --" value={null} />
        {users.map((u) => (
          <Picker.Item key={u.idUser} label={u.namaUser} value={u.idUser} />
        ))}
      </Picker>

      <TextInput placeholder="Latitude" value={latLoc} editable={false} />
      <TextInput placeholder="Longitude" value={ingLoc} editable={false} />

      <Button title="Simpan Tracker" onPress={saveData} />
    </View>
  );
}
