import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const SuccessScreee = ({navigation}:any) => {
  return (
    <View style={{
        width:"100%",
        height:"100%",
        backgroundColor:"#fce1e1",
        alignItems:"center",
        justifyContent:"center",

    }}>
        <Image style={{
            width:150,
            height:150
        }} source={{
            uri:"https://cdn2.iconfinder.com/data/icons/greenline/512/check-512.png"
        }}/>
      <Text style={{
        fontWeight:"semibold",
        fontSize:18
      }}>Reported Successfully</Text>
      <TouchableOpacity onPress={()=>{
        navigation.replace("Home")
      }} >
            <Text style={{
                width:"150%",
                padding:8,
                paddingHorizontal:20,
                backgroundColor:"black",
                color:"white",
                margin:10,
            }}>Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SuccessScreee

const styles = StyleSheet.create({})