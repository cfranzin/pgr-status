import React, { Component, useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import InstanceScreen from '../screens/InstanceScreen';
import health from '../api/health';

const SeriesScreen = () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    var time = new Date();
    time.setHours(time.getHours() - 1);

    const fetchData = async () => {
      try {
        const response = await health.get('/api/datasources/proxy/1/api/v1/series', { 
          params: { 
            match: "{job=~'galicia-rural'}",
            start: Date.parse(time),
            end: Date.parse(new Date())
          }});
          setResults(response.data.data);
          console.log('fetchData OK ' + Date.parse(new Date()));
      } catch (error) {
        setErrorMessage('Ups, algo salió mal.');
      }
    };

    const timer = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearTimeout(timer);
  }, [results]);

  return (
    <View style={styles.container}>
        {errorMessage ? <Text>{errorMessage}</Text> : null}
        <FlatList 
            data={results}
            keyExtractor={result => result.instance}
            numColumns={2}
            renderItem={({ item }) => {
              //console.log(item.instance);
              return <InstanceScreen 
                instance={item.instance}
                key={item.instance} />
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
