import React, { Component, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Dashboard from 'react-native-dashboard';
import health from '../api/health';

const HomeScreen = () => {
  const card = ({ name }) => console.log('Card: ' + name);

  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await health.get('/api/datasources/proxy/1/api/v1')
        .then((res) => setResults(res.data.data))
        .catch((e) => console.error(e));
    };

    const timer = setInterval(() => {
      fetchData();
      console.log('fetchData');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Dashboard data={results} background={true} card={card} column={3} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
});

export default HomeScreen;
