import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axiosInstance from '../../../axiosConfig';
import {format} from 'date-fns';

const Notification = () => {
  const [hazards, setHazards] = useState(null);

  const fetchHazards = async () => {
    try {
      const response = await axiosInstance.get('/hazard/getallhazards');
      const data = await response.data;
      setHazards(
        data.data.filter(hazard => hazard.status === 'verification pending'),
      );
    } catch (error) {
      console.error('Failed to fetch hazards:', error);
    }
  };

  useEffect(() => {
    fetchHazards();
  }, []);

  return (
    <View>
      <Text
        style={{
          fontSize: 19,
          fontWeight: 'bold',
          color: '#000',
          padding: 12,
          //  textAlign: 'center',
        }}>
        Notification
      </Text>
      {hazards &&
        hazards.map((hazard: any, index: number) => (
          <View
            key={index}
            style={{
              padding: 10,
              margin: 10,
              backgroundColor: '#fff',
              borderRadius: 10,
              borderColor: 'gray',
            }}>
            <Text>New Hazard Identified</Text>
            <Text>{format(hazard.created_at, 'dd-MM-yyyy hh-mm a')}</Text>
          </View>
        ))}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
