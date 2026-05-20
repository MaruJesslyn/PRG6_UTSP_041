import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

export default function DashboardScreen({ navigation }) {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get('http://10.1.11.206:8080/api/farms');
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

  const totalHewan = data.length;

  const totalHarga = data.reduce((total, item) => {
    return total + (item.hargaHewan || 0);
  }, 0);

  const sapiCount = data.filter(item => item.jenisHewan == '1').length;
  const dombaCount = data.filter(item => item.jenisHewan == '2').length;
  const kambingCount = data.filter(item => item.jenisHewan == '3').length;

  let jenisTerbanyak = 'Sapi';
  let maxCount = sapiCount;

  if (dombaCount > maxCount) {
    jenisTerbanyak = 'Domba';
    maxCount = dombaCount;
  }

  if (kambingCount > maxCount) {
    jenisTerbanyak = 'Kambing';
    maxCount = kambingCount;
  }

  const hargaTermahal =
    data.length > 0
      ? Math.max(...data.map(item => item.hargaHewan || 0))
      : 0;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Farm Apps 041
      </Text>

      <View style={styles.row}>
        <View style={styles.blueBox}>
          <Text style={styles.bigText}>
            {totalHewan} Ekor
          </Text>
          <Text>Total Hewan</Text>
        </View>

        <View style={styles.redBox}>
          <Text style={styles.bigText}>
            Rp {totalHarga}
          </Text>
          <Text>Total Harga</Text>
        </View>
      </View>

      <View style={styles.rowSecond}>
        <View style={styles.redBox}>
          <Text style={styles.bigText}>
            {jenisTerbanyak}
          </Text>
          <Text>Terbanyak</Text>
        </View>

        <View style={styles.blueBox}>
          <Text style={styles.bigText}>
            Rp {hargaTermahal}
          </Text>
          <Text>Termahal</Text>
        </View>
      </View>

      <Text style={styles.feature}>
        Feature
      </Text>

      <View style={styles.menuRow}>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => navigation.navigate('Sapi')}
        >
          <Text style={styles.menuText}>Sapi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menu}
          onPress={() => navigation.navigate('Domba')}
        >
          <Text style={styles.menuText}>Domba</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menu}
          onPress={() => navigation.navigate('Kambing')}
        >
          <Text style={styles.menuText}>Kambing</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.formdata}>
          Form Data
        </Text>

        <View style={styles.formdataRow}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('Detail')}
          >
            <Text>+ Add Data</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },

  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },

  addButton: {
    backgroundColor: '#c8ecff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },

  rowSecond: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
  },

  blueBox: {
    backgroundColor: '#5ab0ff',
    width: '48%',
    padding: 25,
    borderRadius: 12,
    alignItems: 'center'
  },

  redBox: {
    backgroundColor: '#ff9b82',
    width: '48%',
    padding: 25,
    borderRadius: 12,
    alignItems: 'center'
  },

  bigText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },

  feature: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
  },

  formdata: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
  },

  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
  },

  formdataRow: {
    marginBottom: 30
  },

  menu: {
    backgroundColor: '#ddd',
    width: '30%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  },

  menuText: {
    fontWeight: 'bold'
  }
});
