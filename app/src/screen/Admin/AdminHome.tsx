import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Notification from './Notification';
import axiosInstance from '../../../axiosConfig';
import {useIsFocused} from '@react-navigation/native';
import CustomStyle from '../../CustomStyle';
import {formatDistanceToNow} from 'date-fns';
import {toast} from 'react-toastify';
import Toast from 'react-native-toast-message';
import ResolveHazards from './ResolveHazards';

const AdminHome = ({navigation}) => {
  const [hazards, setHazards] = useState(null);
  const [selectedHazard, setSelectedHazard] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState('');

  const isfocus = useIsFocused();

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

  const getAddress = async (latitude, longitude): string => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      );
      const data = await response.json();
      return data.display_name; // You can choose a specific property like `address` or `display_name`
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const verifyHazard = async hazardId => {
    const response = await axiosInstance.post('/hazard/verifyhazard', {
      id: hazardId,
    });
    const data = await response.data;
    console.log(data);
    if (data) {
      Toast.show({
        type: 'success',

        text1: 'Hazard Verified',
        text2: 'Hazard has been verified successfully',
      });
      fetchHazards();
    }
  };

  useEffect(() => {
    if (isfocus) {
      fetchHazards();
    }
  }, [isfocus]);

  return (
    <ScrollView>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          backgroundColor: '#fff',
          borderRadius: 10,
          flexDirection: 'row',
        }}>
        <Text>Authority Dashboard </Text>
        <TouchableOpacity
          style={{
            padding: 8,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text
            style={{
              fontSize: 17,
              color: 'red',
            }}>
            LogOut
          </Text>
        </TouchableOpacity>
      </View>
      <Image
        style={{width: '100%', height: 200}}
        source={{uri: 'https://img.lovepik.com/photo/40005/5899.jpg_wh860.jpg'}}
      />

      <Text
        style={{
          fontSize: 17,
          fontWeight: 'bold',
          color: CustomStyle.primary,
          padding: 10,
        }}>
        Hazards to be verified
      </Text>
      <View>
        {hazards?.map((hazard, index) => (
          <TouchableOpacity
            key={index}
            style={styles.hazardItem}
            onPress={() => {
              setSelectedHazard(hazard);
              setModalVisible(true);
            }}>
            <Text style={styles.hazardText}>{hazard.hazard_type}</Text>
            <Text>
              {formatDistanceToNow(new Date(hazard.created_at), {
                addSuffix: true,
              })}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedHazard && (
              <>
                <Text
                  style={{
                    padding: 8,
                  }}>
                  Hazard Type : {selectedHazard.hazard_type}
                </Text>

                <Image
                  style={styles.modalImage}
                  source={{uri: selectedHazard.image}}
                />
                {selectedHazard && (
                  <Text
                    style={{
                      padding: 10,
                    }}>
                    {getAddress(
                      selectedHazard.location.latitude,
                      selectedHazard.location.longitude,
                    )}
                  </Text>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                    }}>
                    Have You Seen This Area ?
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      verifyHazard(selectedHazard._id);
                      setModalVisible(false);
                    }}>
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                      }}
                      source={{
                        uri: 'https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/512/Tick_Mark-512.png',
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                    }}>
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                      }}
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/6659/6659895.png',
                      }}
                    />
                  </TouchableOpacity>
                  {/* <Button title="Close" onPress={() => setModalVisible(false)} /> */}
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const AdminTab = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image
              style={styles.tabIcon}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/25/25694.png',
              }}
            />
          ),
        }}
        name="AdminHome"
        component={AdminHome}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image
              style={styles.tabIcon}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/570/570170.png',
              }}
            />
          ),
        }}
        name="ResolveActive"
        component={ResolveHazards}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image
              style={styles.tabIcon}
              source={{
                uri: 'https://i.pinimg.com/736x/d8/e1/e5/d8e1e5a33fc9f00117f591a298e70eee.jpg',
              }}
            />
          ),
        }}
        name="Notification"
        component={Notification}
      />
    </Tab.Navigator>
  );
};

export default AdminTab;

const styles = StyleSheet.create({
  hazardItem: {
    backgroundColor: '#f8f8f8',
    margin: 10,
    borderRadius: 8,
    padding: 10,
  },
  hazardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  tabIcon: {
    width: 30,
    height: 30,
  },
});
