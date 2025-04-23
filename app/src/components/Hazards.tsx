import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Map from '../screen/Map'
const Hazards = ({navigation}) => {
  return (
    <View>
        <Map navigation={navigation} />
       
    </View>
  )
}

export default Hazards

const styles = StyleSheet.create({})