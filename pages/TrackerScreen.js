import React, { useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { getTrackers } from '../services/api';
import { useFocusEffect } from '@react-navigation/native';

export default function TrackerScreen({ navigation }) {
  const [trackers, setTrackers] = useState([]);

  const loadData = async () => {
    const res = await getTrackers();
    setTrackers(res.data);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <View style={{ padding: 16 }}>
      <Button title="Tambah Tracker" onPress={() => navigation.navigate('FormTracker')} />
      <FlatList
        data={trackers}
        keyExtractor={(item) => item.idTrs.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.ingLoc}</Text>
            <Text>{item.latLoc}</Text>
            <Text>User ID: {item.idUser}</Text>
          </View>
        )}
      />
    </View>
  );
}
