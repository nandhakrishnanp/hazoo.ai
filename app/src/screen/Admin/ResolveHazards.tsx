import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../axiosConfig'

const ResolveHazards = ({navigation}:any) => {
 
      const [hazards, setHazards] = useState(null);
    const fetchHazards = async () => {
        try {
          const response = await axiosInstance.get('/hazard/getallhazards');
          const data = await response.data;
          setHazards(
            data.data.filter(hazard => hazard.status === 'Active'),
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

      <Text style={{
        padding:10,
        fontSize: 20,
        fontWeight: 'bold',
      }}>Active Hazards</Text>

      <View>
           {
            hazards && hazards.map((hazard, index) => (
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('CompleteHazard', {hazard})
                }} >
                <View key={index} style={{
                    padding: 10,
                    margin: 5,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 10,
                }}>
                    <Text style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    }}>Hazard Type: {hazard.hazard_type}</Text>
                    <Text style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    }}>Status: {hazard.status}</Text>
                </View>
                </TouchableOpacity>
                ))
           }
      </View>
    </View>
  )
}

export default ResolveHazards

const styles = StyleSheet.create({})