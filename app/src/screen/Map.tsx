import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  ToastAndroid,
  Alert,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Toast from 'react-native-toast-message';
import CustomStyle from '../CustomStyle';
import axiosInstance from '../../axiosConfig';
import {useIsFocused} from '@react-navigation/native';
import Geolocation, {
  getCurrentPosition,
} from 'react-native-geolocation-service';

const Map = ({navigation}: any) => {
  const [hazards, setHazards] = useState(null);
  const [selected, setSelected] = useState(null);
  const [address, setAddress] = useState(null);
  const isfocus = useIsFocused();
  const [location, setLocation] = useState({
    latitude: 11.0002,
    longitude: 76.9673,
  });

  const fetchHazards = async () => {
    try {
      const response = await axiosInstance.get('/hazard/getallhazards');
      const data = await response.data;
      setHazards(
        data.data.filter(hazard => hazard.status !== 'verification pending'),
      );
      // console.log(data.data);
    } catch (error) {
      console.error('Failed to fetch hazards:', error);
    }
  };

  const requestLocationPermission = async () => {
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const getAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      );
      const data = await response.json();
      setAddress(data.display_name); // You can choose a specific property like `address` or `display_name`
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
        console.log(position);
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message);
        setLocation(null);
        console.log(error);
      },
    );
  };

  useEffect(() => {
    if (isfocus) {
      fetchHazards();
    }
  }, [isfocus]);
  useEffect(() => {
    if (selected) {
      getAddress(selected.location.latitude, selected.location.longitude);
    }
  }, [selected]);

  // custom marker

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 11.0002,
          longitude: 76.9673,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Your Location"
            description="You are here">
            <Image
              source={{
                uri: 'https://icons.veryicon.com/png/o/miscellaneous/internet-of-things-map-icon/current-location-10.png',
              }}
              style={{height: 30, width: 30,}}
            />
          </Marker>
        )}
        {hazards &&
          hazards.map((hazard, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(hazard.location.latitude),
                longitude: parseFloat(hazard.location.longitude),
              }}
              onPress={() => setSelected(hazard)}
            />
          ))}
      </MapView>

      {
        // sliding up modal like uber
        selected && (
          <Modal animationType="slide" transparent={true} visible={true}>
            <View
              style={{
                backgroundColor: 'white',
                position: 'absolute',
                bottom: 0,
                zIndex: -1,
                width: '100%',
                borderTopStartRadius: 30,
                borderTopEndRadius: 30,
              }}>
              <View
                style={{
                  height: 450,
                  width: '100%',
                  padding: 8,
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: selected.image}}
                  style={{height: 200, width: '100%', borderRadius: 10}}
                />
                <View
                  style={{
                    paddingVertical: 10,
                  }}>
                  <Text style={styles.modalTitle}>{selected.hazard_type}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      gap: 2,
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                      }}>
                      {' '}
                      Source : {selected.cctv_id}
                    </Text>
                    <Text
                      style={{
                        color: 'green',
                        fontWeight: 'bold',
                      }}>
                      {' '}
                      Status : {selected.status}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      padding: 3,
                    }}>
                    {address}
                  </Text>
                </View>

                <TouchableOpacity
                  style={{
                    backgroundColor: CustomStyle.primary,
                    padding: 10,
                    width: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                  }}
                  onPress={() => setSelected(null)}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: CustomStyle.yello,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: CustomStyle.primary,
  },
  closeButton: {
    marginTop: 20,
    padding: 8,
    paddingHorizontal: 14,
    backgroundColor: CustomStyle.primary,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Map;
