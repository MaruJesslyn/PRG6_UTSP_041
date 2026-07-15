import React, { useState } from 'react';
import { View, Text, Button, FlatList, Image } from 'react-native';
import { getPeoples, deletePeople } from '../services/api';
import { useFocusEffect } from '@react-navigation/native';

export default function PeopleScreen({ navigation }) {
  const [peoples, setPeoples] = useState([]);

  const loadData = async () => {
    const res = await getPeoples();
    setPeoples(res.data);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <View style={{ padding: 16 }}>
      <Button title="Tambah People" onPress={() => navigation.navigate('FormPeople')} />
      <FlatList
        data={peoples}
        keyExtractor={(item) => item.idUser.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 12, padding: 12, borderWidth: 1, borderRadius: 8 }}>
            {item.fotoUser ? (
              <Image source={{ uri: item.fotoUser }} style={{ width: 100, height: 100, marginBottom: 8 }} />
            ) : null}
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.namaUser}</Text>
            <Text>{item.jenisUser}</Text>
            <Text>{item.hubunganUser}</Text>
            <Button title="Edit" onPress={() => navigation.navigate('FormPeople', { people: item })} />
            <Button title="Delete" onPress={() => deletePeople(item.idUser).then(loadData)} />
          </View>
        )}
      />
    </View>
  );
}
