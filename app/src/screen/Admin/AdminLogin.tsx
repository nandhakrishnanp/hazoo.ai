import {Image, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View} from 'react-native';
import React from 'react';

const AdminLogin = ({navigation}:any) => {
  return (
    <View
      style={{
        width: 385,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#fff',
      }}>
      <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            backgroundColor: '#fff',
            borderRadius: 10
      }}>
        <Image  style={{
            width: 200,
            height: 200,
            borderRadius: 100,
        }} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEqkdCELv9Gkt6-U9DyQyeFsuoV7itoHqMRA&s"}}/>
          <Text
                    style={{
                      fontSize: 27,
                      fontWeight: 'bold',
                      color: '#000',
                      textAlign: 'center',
                    }}>
                    Login into{' '}
                    <Text
                      style={{
                        color: 'red',
                      }}>
                      Hazoo.ai
                    </Text>
                  </Text>
      </View>
      <View>
           <TextInput
                      style={{
                        width: 300,
                        height: 50,
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 10,
                        padding: 10,
                        margin: 10,
                      }}
                      placeholder="Username"
                    />
                    <TextInput
                      style={{
                        width: 300,
                        height: 50,
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 10,
                        padding: 10,
                        margin: 10,
                      }}
                      placeholder="Password"
                      secureTextEntry
                    />
                    <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate('AdminHome')
                    }}
                      style={{
                        width: 300,
                        height: 50,
                        backgroundColor: 'black',
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 17,
                          color: '#fff',
                        }}>
                        Login
                      </Text>
                    </TouchableOpacity>
                    
      </View>
    </View>
  );
};

export default AdminLogin;

const styles = StyleSheet.create({});
