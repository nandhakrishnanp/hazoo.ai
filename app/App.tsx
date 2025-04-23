import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import Login from './src/components/Login';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
const App = () => {
  const [showRealApp, setShowRealApp] = useState(false);

  const slides = [
    {
      id: 1,
      headline: 'Stay Safe on the Roads',
      subheading:
        'Get instant notifications about road hazards like accidents, potholes, and fallen debris.',
      image:
        'https://img.freepik.com/premium-vector/comprehensive-guide-traffic-signs-enhancing-road-safety_1300528-7867.jpg?semt=ais_hybrid',
      bgColor: '#f56f0a',
    },
    {
      id: 2,
      headline: 'Report Hazards Easily',
      subheading: 'See a hazard? Report it in seconds with just a few taps.',
      image:
        'https://img.freepik.com/premium-vector/user-feedback-website-rating-abstract-concept-vector-illustration_107173-25105.jpg',
      bgColor: '#0a90f5',
    },
    {
      id: 3,
      headline: 'Join the Community for Safer Roads',
      subheading:
        'Collaborate with fellow citizens to ensure safer and better-maintained roads.',
      image:
        'https://media.istockphoto.com/id/1412778148/vector/online-meeting.jpg?s=612x612&w=0&k=20&c=bTK4nlDMQE-MBPzxVbzGt_FJYvkVVVmitVRW17zWXiI=',
      bgColor: '#7233d8',
    },
  ];
  const onDone = () => {
    setShowRealApp(true);
  };

  useEffect(()=>{
    const data = AsyncStorage.getItem("user")
    .then((dat)=>{
   if(dat){
       setShowRealApp(true)
   }
    })
  },[])

  const RenderSlides = ({item}: any) => {
    return (
      <View style={{flex: 1, width: '100%', backgroundColor: item.bgColor}}>
        <Text
          style={{
            fontSize: 27,
            fontWeight: 'bold',
            paddingTop: 10,
            color: '#fff',
            paddingHorizontal: 15,
          }}>
          Hazoo.ai
        </Text>
        <View
          style={{
            flex: 1,
            backgroundColor: item.bgColor,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <Image
            source={{uri: item.image}}
            style={{width: 200, height: 200, borderRadius: 100}}
          />
          <Text
            style={{
              fontSize: 27,
              fontWeight: 'bold',
              paddingTop: 10,
              color: '#fff',
              textAlign: 'center',
            }}>
            {item.headline}
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              padding: 10,
              color: '#fff',
              textAlign: 'center',
            }}>
            {item.subheading}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        width: '100%',
        flex: 1,
      }}>
      {showRealApp ? (
        <Login />
      ) : (
        <AppIntroSlider
          data={slides}
          showSkipButton={true}
          onSkip={onDone}
          renderItem={RenderSlides}
          onDone={onDone}></AppIntroSlider>
      )}

      <Toast visibilityTime={1300} />
    </View>
  );
};

export default App;
const styles = StyleSheet.create({});
