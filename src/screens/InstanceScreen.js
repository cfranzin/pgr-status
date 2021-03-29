import React, { Component, useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import health from '../api/health';

const InstanceScreen = (props) => {

  //console.log(props.instance);

  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      var time = new Date();
      time.setHours(time.getHours() - 1);

      await health.get('/api/datasources/proxy/1/api/v1/query_range', {
        params: { 
          probe_success: "probe_success{instance=~" + props.instance + "}",
          start: Date.parse(time),
          end: Date.parse(new Date())
        }})
        .then((res) => {
          setResults(res.data.data.result[0].values);
        })
        .catch((e) => console.error(e));
        
    };
    
    fetchData();
  }, []);

  const statusColor = (status) => {
    //console.log(status);
    if (status=="1") {
      return {
        flex: 1,
        backgroundColor: '#4caf50',
        color: '#ffffff',
        padding: 20,
        marginVertical: 6,
        marginHorizontal: 12
          }
    } else {
      return {
        flex: 1,
        backgroundColor: '#FF0000',
        color: '#ffffff',
        padding: 20,
        marginVertical: 6,
        marginHorizontal: 12
      }
    }
  }

  return (
    <View style={statusColor(results[0][1])}>
        <Text style={styles.item}>{props.instance}</Text>
        <Text style={styles.item}>{results[0][1]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    color: '#ffffff',
  },
});

export default InstanceScreen;
