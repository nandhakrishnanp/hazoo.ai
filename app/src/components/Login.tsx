import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CustomStyle from '../CustomStyle';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import {NavigationContainer} from '@react-navigation/native';
import axiosInstance from '../../axiosConfig';
import Toast from 'react-native-toast-message';
import AddReport from '../screen/AddReport';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SuccessScreee from '../screen/SuccessScreee';
import RedeemCoins from '../screen/RedeemCoins';
import AdminLogin from '../screen/Admin/AdminLogin';
import AdminHome from '../screen/Admin/AdminHome';
import CompleteHazards from '../screen/Admin/CompleteHazards';
const Login = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobilenumber, setMobilenumber] = useState('+91');
  const [loginMode, setLoginMode] = useState(true);

  const onLogin = async () => {
    if (!loginMode) {
      if (username.length < 8) {
        Toast.show({
          type: 'error',
          text1: 'Username should be greater than 8 characters',
        });
        return;
      }
      if (mobilenumber.length < 13) {
        Toast.show({
          type: 'error',
          text1: 'Mobile Number should be 10 digits',
        });
        return;
      }
      if (password.length < 8) {
        Toast.show({
          type: 'error',
          text1: 'Password should be greater than 8 characters',
        });
        return;
      }

      try {
        const response = await axiosInstance.post('/user/registerUser', {
          username: username,
          password: password,
          mobilenumber: mobilenumber.slice(3),
        });
        const data = await response.data;
        if (data) {
          Toast.show({
            type: 'success',
            text1: data.message,
          });

          setLoginMode(true);
          setUsername('');
          setPassword('');
          setMobilenumber('+91');
        }
      } catch (e) {
        Toast.show({
          type: 'error',
          text1: 'User Already Exists',
        });
      }
    } else {
      if (username.length < 8) {
        Toast.show({
          type: 'error',
          text1: 'Username should be greater than 8 characters',
        });
        return;
      }
      if (password.length < 8) {
        Toast.show({
          type: 'error',
          text1: 'Password should be greater than 8 characters',
        });
        return;
      }
      try {
        const response = await axiosInstance.post('/user/loginUser', {
          username: username,
          password: password,
        });
        const data = await response.data;
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
        if (data.token) {
          Toast.show({
            type: 'success',
            text1: 'User Logged in Successfully',
          });
          navigation.replace('Home');
        }
      } catch (e) {
        console.log(e);

        Toast.show({
          type: 'error',
          text1: e.message,
        });
      }
    }
  };

  useEffect(() => {
    const data = AsyncStorage.getItem('user').then(dat => {
      if (dat) {
        navigation.replace('Home');
      }
    });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View>
        <Image
          source={{
            uri: 'https://cdni.iconscout.com/illustration/premium/thumb/login-security-illustration-download-in-svg-png-gif-file-formats--protection-password-nallow-set-04-pack-design-development-illustrations-7169452.png',
          }}
          style={{width: 270, height: 200, borderRadius: 100}}
        />
        {loginMode ? (
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
        ) : (
          <Text
            style={{
              fontSize: 27,
              fontWeight: 'bold',
              color: '#000',
              textAlign: 'center',
              maxWidth: 270,
            }}>
            Create Your Account{' '}
            <Text
              style={{
                color: 'red',
              }}>
              Hazoo.ai
            </Text>
          </Text>
        )}
      </View>
      <View
        style={{
          marginTop: 20,
        }}>
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
          value={username}
          onChangeText={text => setUsername(text)}
        />
        {username.length > 1 && username.length < 8 && (
          <Text
            style={{
              color: 'red',
              fontSize: 12,
              paddingLeft: 10,
            }}>
            Username should be greater than 8 characters
          </Text>
        )}
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
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        {!loginMode && (
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
            placeholder="Mobile Number"
            value={mobilenumber}
            onChangeText={text => setMobilenumber(text)}
            keyboardType="phone-pad"
          />
        )}

        {!loginMode && mobilenumber.length > 4 && mobilenumber.length < 13 && (
          <Text
            style={{
              color: 'red',
              fontSize: 12,
              paddingLeft: 10,
            }}>
            Mobile Number should be 10 digits
          </Text>
        )}
        <TouchableOpacity
          onPress={() => {
            onLogin();
          }}
          style={{
            width: 300,
            height: 50,
            backgroundColor: CustomStyle.accent,
            borderRadius: 10,
            padding: 10,
            margin: 10,
          }}>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 18,
            }}>
            {loginMode ? 'Login' : 'Register'}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          setLoginMode(!loginMode);
          setUsername('');
          setPassword('');
          setMobilenumber('+91');
        }}
        style={{
          padding: 10,
        }}>
        {loginMode ? (
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              color: '#000',
              textAlign: 'center',
            }}>
            Don't have an account?{' '}
            <Text
              style={{
                color: 'red',
              }}>
              Register
            </Text>
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              color: '#000',
              textAlign: 'center',
            }}>
            Already have an account?{' '}
            <Text
              style={{
                color: 'red',
              }}>
              Login
            </Text>
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>{
        navigation.replace('AdminLogin')
      }}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: 'bold',
            color: '#000',
            textAlign: 'center',
            paddingTop: 20,
          }}>
          Authority Login -{' '}
          <Text
            style={{
              color: 'red',
            }}>
            Click Here
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const LoginStack = () => {
  const stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Login">
          <stack.Screen name="Login" component={Login} />
          <stack.Screen name="Home" component={Home} />
          <stack.Screen name="AddReport" component={AddReport} />
          <stack.Screen name="success" component={SuccessScreee} />
          <stack.Screen name="UyirCoins" component={RedeemCoins} />
          <stack.Screen name="AdminLogin" component={AdminLogin} />
          <stack.Screen name="AdminHome" component={AdminHome} />
          <stack.Screen name="CompleteHazard" component={CompleteHazards} />
        </stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default LoginStack;
