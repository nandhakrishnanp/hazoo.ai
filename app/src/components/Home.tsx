import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Hazards from './Hazards';
import Report from '../screen/Report';
import Map from '../screen/Map';
import Events from '../screen/Events';
import Profile from '../screen/Profile';
import CustomStyle from '../CustomStyle';

const Home = ({navigation}: any) => {

  const news = [
    {
      "heading": "Road Safety Hackathon 2025",
      "date": "2025-01-01",
      "body": "Uyir is thrilled to announce the Road Safety Hackathon 2025, an event designed to bring innovative solutions to road safety challenges. With prizes totaling ₹6.50 lakh, the hackathon encourages participation from developers, engineers, and innovators from across the country."
    },
    {
      "heading": "Kutty Cops Project Inauguration",
      "date": "2023-10-13",
      "body": "The Tamil Nadu State Government, in collaboration with Uyir, has officially launched the Kutty Cops Road Safety Curriculum. This groundbreaking initiative aims to educate schoolchildren about the importance of road safety"
    },
    {
      "heading": "Kutty Cops Book Release Function",
      "date": "2023-10-13",
      "body": "On a momentous day for road safety education, the Kutty Cops Road Safety Curriculum's Student Workbook and Faculty Guide were officially released. This event, held at the Corporation Kalai Arangam in R.S. Puram, Coimbatore, marked a major milestone in equipping schools with structured tools for teaching road safety."
    },
    {
      "heading": "Kutty Cops Teachers Training Program",
      "date": "2023-07-14",
      "body": "The Kutty Cops Teachers Training Program, organized by Uyir, is a vital step in preparing educators to deliver the newly introduced Road Safety Curriculum effectively. Held on July 14, 2023, the program provided a comprehensive orientation to both private and government school teachers, ensuring they are well-equipped to teach this essential subject"
    },
    {
      "heading": "Model Traffic Junction Initiative",
      "date": "2023-01-01",
      "body": "Uyir has embarked on an ambitious project to develop a Model Traffic Junction equipped with state-of-the-art surveillance systems. This initiative aims to demonstrate the potential of technology in improving traffic management and enforcing road safety regulations."
    }
  ]
  

  return (
    <ScrollView
      style={{
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
      }}>
      <View>
        <Text
          style={{
            fontSize: 25,
            padding: 10,
            paddingHorizontal: 18,
            fontWeight: 'bold',
            color: CustomStyle.accent,
          }}>
          Hazoo.ai
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: 180,
            width: '95%',
            backgroundColor: CustomStyle.primary,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
          }}>
          <Text
            style={{
              color: '#f5f3f4',
              fontSize: 38,
              fontWeight: 'bold',
            }}>
            100+
          </Text>
          <Text
            style={{
              color: '#f5f3f4',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Hazards Resolved
          </Text>
          <Text
            style={{
              color: '#f5f3f4',
              fontSize: 16,
              fontWeight: '',
            }}>
            Tech and Community Driven Road Safety
          </Text>
        </View>
      </View>

      <View>
        <Text
          style={{
            fontSize: 18,
            padding: 18,
            paddingHorizontal: 18,
            fontWeight: 'bold',
            color: CustomStyle.accent,
          }}>
          Quick Links
        </Text>

        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
          style={{
            // backgroundColor: CustomStyle.accent,
            margin: 18,
            gap:15,
            flexDirection: 'row',
          }}>
          <TouchableOpacity style={{
            alignItems:"center",
            justifyContent:"center",
            paddingHorizontal:10
          }}>
            <Image
              style={{
                width: 80,
                height: 80,
                borderRadius:100
              }}
              source={{
                uri: 'https://img.freepik.com/free-vector/city-map-illustration-background_23-2147619495.jpg',
              }}
            />
            <Text style={{
              paddingTop:10,
            }}>Nearby Hazards</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            alignItems:"center",
            justifyContent:"center",
            paddingHorizontal:10
          }}>
            <Image
              style={{
                width: 80,
                height: 80,
                borderRadius:100,
                borderColor:CustomStyle.accent,
                borderWidth:1
              }}
              source={{
          uri:"https://img.freepik.com/free-vector/alert-concept-illustration_114360-388.jpg"              }}
            />
            <Text style={{
              paddingTop:10,
            }}>Report a Hazard</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            alignItems:"center",
            justifyContent:"center",
            paddingHorizontal:10
          }}>
            <Image
              style={{
                width: 80,
                height: 80,
                borderRadius:100
              }}
              source={{
                uri: 'https://cdn.dribbble.com/users/1862996/screenshots/4409959/media/9092d246fb22c29dfc4cbf3b71d97367.jpg?resize=400x0',
              }}
            />
            <Text style={{
              paddingTop:10,
            }}>Volunteer Events</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            alignItems:"center",
            justifyContent:"center",
            paddingHorizontal:10
          }}>
            <Image
              style={{
                width: 80,
                height: 80,
                borderRadius:100
              }}
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK6B7BzZiVpd4AMu-njPyhxt_VaEpQ--2oRw&s',
              }}
            />
            <Text style={{
              paddingTop:10,
            }}>My Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <Text
          style={{
            fontSize: 18,
            padding: 18,
            paddingHorizontal: 18,
            fontWeight: 'bold',
            color: CustomStyle.accent,
          }}>
        News and Events
        </Text>

      <View>
        {news.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                backgroundColor: CustomStyle.primary,
                margin: 10,
                borderRadius: 15,
                padding: 15,
               
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                {item.heading}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#fff',
                }}>
                {item.date}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#fff',
                  padding: 10,
                }}>
                {item.body}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const HomeTab = () => {
  const tab = createBottomTabNavigator();

  return (
    <tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
        
          // position: 'absolute',
          // bottom: 25,
          // elevation: 0,
          backgroundColor: '#f7f7f7',
          // borderRadius: 15,
          alignItems: 'center',
          // marginHorizontal: 20,
          justifyContent: 'center',
          
        },
      }}>
      <tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={{
                  uri: 'https://images.vexels.com/media/users/3/223204/isolated/preview/a603755020e70576e1f4a08b012835d4-home-icon-flat-design.png?w=360',
                }}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'blue' : 'black',
                }}
              />
            </View>
          ),
        }}
        name="Home"
        component={Home}
      />
      <tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/3082/3082383.png',
                }}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'blue' : 'black',
                }}
              />
            </View>
          ),
        }}
        name="Hazards"
        component={Hazards}
      />
      <tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={{
                  uri: 'https://static.thenounproject.com/png/3644031-200.png',
                }}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'blue' : 'black',
                }}
              />
            </View>
          ),
        }}
        name="Report"
        component={Report}
      />
      <tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={{
                  uri: 'https://static.thenounproject.com/png/135499-200.png',
                }}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'blue' : 'black',
                }}
              />
            </View>
          ),
        }}
        name="Events"
        component={Events}
      />
      <tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={{
                  uri: 'https://i.pinimg.com/originals/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.png',
                }}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'blue' : 'black',
                }}
              />
            </View>
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </tab.Navigator>
  );
};

export default HomeTab;

const styles = StyleSheet.create({});
