import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  Modal,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Camera} from 'react-native-vision-camera';
import {useCameraDevice, useCameraPermission} from 'react-native-vision-camera';
import CustomStyle from '../CustomStyle';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Toast from 'react-native-toast-message';
import axiosInstance from '../../axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AddReport = ({navigation, route}: any) => {
  const {hazard} = route.params;

  const [cameraVisible, setCameraVisible] = useState(false);
  const [IsUploading, setIsuploading] = useState(false);
  const [url, setUrl] = useState<any>(null);
  const [address, setAddress] = useState(null);
  const device = useCameraDevice('back');
  const cameraRef = useRef<Camera>(null);
  const Cloudurl = 'https://api.cloudinary.com/v1_1/dftwre0on/image/upload';

  const [location, setLocation] = useState({
    latitude: 11.0168,
    longitude: 76.9558,
  });

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app needs access to your location to show your current position.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };


  // const getCurrentLocation = async () => {
  //   const hasPermission = await requestPermission();
  //   if (!hasPermission) {
  //     Alert.alert('Permission Denied', 'Location permission is required.');
  //     return;
  //   }

  //   Geolocation.getCurrentPosition(
  //     position => {
  //       setLocation(position);
  //     },
  //     error => {
  //       console.error(error);
  //       Alert.alert('Error', 'Failed to get location.');
  //     }
  //   );
  // };

  const handleImgToCloud = async (uri: string) => {
    const formData = new FormData();
    formData.append('file', {
      name: `image${Date.now()}`,
      type: 'image/jpg',
      uri: uri,
    });
    formData.append('upload_preset', 'User_imges');
    formData.append('cloud_name', 'dftwre0on');
    try {
      const Cloudresponse = await fetch(Cloudurl, {
        method: 'post',
        body: formData,
      });
      const res = await Cloudresponse.json();
      console.log('Cloudresponse', res);
      const url = res.url;
      return url;
    } catch (error) {
      console.log('error', error);

      return error;
    }
  };
  
  const handleSubmit = async () => {
    if (!url) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please capture an image',
      });
      return;
    }
    setIsuploading(true);
    const imgUrl = await handleImgToCloud(url);
    const user = await AsyncStorage.getItem('user');
    const user_id = JSON.parse(user)._id;
    const res = await axiosInstance.post('/hazard/createhazard', {
      isUser_reported: true,
      user_id,
      image: imgUrl,
      hazard_type: hazard,
      location,
    });
    const data = res.data;
    if (data) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Reported successfully',
      });
    }
    setIsuploading(false);
    navigation.navigate('success');
  };

  const getPermmisiion = async () => {
    const {hasPermission, requestPermission} = useCameraPermission();
    if (!hasPermission) {
      return (
        <View
          style={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: CustomStyle.primary,
            }}>
            Camera permission is required
          </Text>
          <Pressable
            onPress={() => requestPermission()}
            style={{
              padding: 10,
              margin: 20,
              backgroundColor: CustomStyle.primary,
            }}>
            <Text style={{}}>Enable Camera Access</Text>
          </Pressable>
        </View>
      );
    }
    if (!device) {
      return <Text>Device not found</Text>;
    }
  };

  const openCamera = () => {
    setCameraVisible(true);
  };

  const getAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      );
      const data = await response.json();
      setAddress(data.display_name);
      // You can choose a specific property like `address` or `display_name`
      return data.display_name;
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const captureImage = async () => {
    if (cameraRef.current && device) {
      const photo = await cameraRef.current.takePhoto();
      const photoUri = `file://${photo.path}`;
      setUrl(photoUri);
      setCameraVisible(false);
    }
  };
  useEffect(() => {
    getPermmisiion();
    // getCurrentLocation();
    getAddress(location.latitude, location.longitude);
  }, []);
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}>
        {
          IsUploading && (
            <View style={{
              position:"absolute",
              width:"100%",
              height:"100%",
              backgroundColor:CustomStyle.secondary,
              alignItems:"center",
              justifyContent:"center",
              zIndex:50
            }}>
           
              <Text style={{
              color:"white",
              fontWeight:"bold",
              fontSize:20
              }}>Submitting ... </Text>

            </View>
          )
        }
      <Text
        style={{
          padding: 20,
          fontSize: 20,
          fontWeight: 'bold',
          color: CustomStyle.primary,
        }}>
        Report the Hazard
      </Text>
      <View
        style={{
          padding: 20,
          backgroundColor: CustomStyle.primary,
          borderRadius: 10,
          margin: 10,
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Hazard Type : {hazard}
        </Text>

        <TouchableOpacity
          onPress={() => openCamera()}
          style={{
            padding: 10,
            backgroundColor: CustomStyle.accent,
            borderRadius: 10,
            margin: 10,
          }}>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 18,
            }}>
            {url && url.length > 1 ? 'Retake' : 'Capture Image'}
          </Text>
        </TouchableOpacity>
        {cameraVisible && (
          <Modal animationType="slide" visible={cameraVisible}>
            <View style={{flex: 1}}>
              <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={cameraVisible}
                photo={true}
                ref={cameraRef}
              />

              <TouchableOpacity
                onPress={captureImage}
                style={{
                  position: 'absolute',
                  bottom: 50,
                  left: '50%',
                  transform: [{translateX: -50}],
                  backgroundColor: 'white',
                  padding: 10,
                  borderRadius: 50,
                }}>
                <Text>Capture</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  position: 'absolute',
                  bottom: 60,
                  left: '80%',
                  transform: [{translateX: -50}],
                  backgroundColor: 'white',
                  padding: 10,
                  borderRadius: 30,
                }}
                onPress={() => {
                  setCameraVisible(false);
                }}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}

        {url && (
          <Image
            source={{uri: url}}
            style={{
              height: 200,
              width: 200,
              margin: 10,
            }}
          />
        )}
      </View>

      <View
        style={{
          margin: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            paddingVertical: 10,
            fontWeight: 'bold',
          }}>
          Location{' '}
        </Text>

        <View
          style={{
            borderRadius: 10,
            backgroundColor: CustomStyle.primary,
            padding: 8,
          }}>
          <MapView
            onPress={e => {
              const {latitude, longitude} = e.nativeEvent.coordinate;
              getAddress(latitude, longitude);
              setLocation({
                latitude,
                longitude,
              });
            }}
            style={{
              height: 200,
              width: '100%',
            }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: 11.0168,
              longitude: 76.9558,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker coordinate={location} />
          </MapView>
          <Text
            style={{
              paddingVertical: 10,
              fontSize: 18,
              fontWeight: 'bold',
              color: 'white',
            }}>
            {address ? address : 'Fetching Address...'}
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}>
          <Text
            style={{
              padding: 10,
              backgroundColor: CustomStyle.accent,
              borderRadius: 10,
              color: 'white',
              textAlign: 'center',
              fontSize: 18,
              marginHorizontal: 10,
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddReport;

const styles = StyleSheet.create({});
