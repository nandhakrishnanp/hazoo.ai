import {StyleSheet, Text, View, Image, Pressable, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomStyle from '../CustomStyle';

const Profile = ({navigation}:any) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = AsyncStorage.getItem('user');
    data.then(dat => {
      setUser(JSON.parse(dat));
    });
  }, []);

  return (
    <View>
      <Image
        style={{
          height: 200,
        }}
        source={{
          uri: 'https://t4.ftcdn.net/jpg/06/72/44/33/360_F_672443348_bE4sPvUKjyQyYGjuOcdaT3wguBQsXdow.jpg',
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          padding: 10,
        }}>
        <Image
          style={{
            height: 100,
            width: 100,
          }}
          source={{
            uri: 'https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png',
          }}
        />

        {user && (
          <View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              {user._id}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              {user.username}
            </Text>
          </View>
        )}
      </View>
      <View style={{
        width:100,
        marginHorizontal:10,
        flexDirection:"row"
      }}>
           <TouchableOpacity  onPress={()=>{
        navigation.navigate("UyirCoins")
      }}> 
      <View style={{
        padding:10,
        alignItems:"center",
        justifyContent:"center",
      }}>


      <Image 
      style={{height:50 , width:50}}
      source={{
        uri:"https://cdn-icons-png.flaticon.com/512/5957/5957125.png"
      }}/>
      <Text style={{fontSize:12 , padding:8}}>Uyir Coins</Text>
      <Text style={{fontSize:18}}>0</Text>
      </View>
     </TouchableOpacity> 

      <View style={{
        padding:10,
        alignItems:"center",
        justifyContent:"center",
      
      }}>


      <Image 
      style={{height:50 , width:50}}
      source={{
        uri:"https://cdn-icons-png.flaticon.com/512/5501/5501160.png"
      }}/>

      <Text style={{fontSize:12 , padding:8}}>Hazards Reported</Text>
      <Text style={{fontSize:18}}>0</Text>
      </View>
  
      </View>
      

      <TouchableOpacity onPress={()=>{
    navigation.replace("Login")
     AsyncStorage.removeItem("user")
      }}>
        <Text style={{
          backgroundColor:"black",
          padding:8,
          margin:10,
          textAlign:"center",
          color:"white",
          borderRadius:9,
        }}>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
