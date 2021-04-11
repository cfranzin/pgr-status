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
          console.log('fetchData OK ' + Date.parse(new Date()));
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
    };

    const timer = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearTimeout(timer);
  }, [results]);

  return (
    <View style={styles.container}>
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
