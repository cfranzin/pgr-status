import React, { Component, useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import Dashboard from 'react-native-dashboard';
import InstanceScreen from '../screens/InstanceScreen';
import health from '../api/health';

const SeriesScreen = () => {
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    var time = new Date();
    time.setHours(time.getHours() - 1);

    const fetchData = async () => {
      await health.get('/api/datasources/proxy/1/api/v1/series', { 
        params: { 
          match: "{job=~'galicia-rural'}",
          start: Date.parse(time),
          end: Date.parse(new Date())
        }})
        .then((res) => {
          setResults(res.data.data);
        })
        .catch((e) => console.error(e));
    };

    const timer = setInterval(() => {
      fetchData();
      console.log('fetchData called ' + Date.parse(new Date()));
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
        <FlatList 
            data={results}
            keyExtractor={result => result.instance}
            numColumns={2}
            renderItem={({ item }) => {
              //console.log(item.instance);
              return <InstanceScreen instance={item.instance} />
            }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#ecf0f1',
  },
  title: {
    fontSize: 32,
  },
});

export default SeriesScreen;
