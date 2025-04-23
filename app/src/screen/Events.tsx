import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomStyle from '../CustomStyle'

const Events = () => {
  const news =[
    {
      "title": "Stray cattle impounded in Coimbatore, owners to be penalised",
      "date": "2025-03-18",
      "summary": "Authorities in Coimbatore have impounded stray cattle found obstructing traffic, and owners are set to face penalties to improve road safety.",
      "url": "https://timesofindia.indiatimes.com/city/coimbatore/stray-cattle-impounded-in-coimbatore-owners-to-be-penalised/articleshow/98690000.cms"
    },
    {
      "title": "TN may sanction ₹235 crore for phase II of Sanganoor canal revamp project",
      "date": "2025-03-13",
      "summary": "The Tamil Nadu government is considering approving ₹235 crore for the second phase of the Sanganoor canal revamp project, which could impact traffic during construction.",
      "url": "https://timesofindia.indiatimes.com/city/coimbatore/tn-may-sanction-235-crore-for-phase-ii-of-sanganoor-canal-revamp-project/articleshow/98550000.cms"
    },
    {
      "title": "Mini truck overturns, traffic disrupted",
      "date": "2025-03-06",
      "summary": "A mini truck overturned in Coimbatore, causing significant traffic disruptions in the area.",
      "url": "https://timesofindia.indiatimes.com/city/coimbatore/mini-truck-overturns-traffic-disrupted/articleshow/98410000.cms"
    },
    {
      "title": "4 speed breakers installed around Central bus stand",
      "date": "2025-03-06",
      "summary": "Four new speed breakers have been installed around the Central bus stand in Coimbatore to enhance pedestrian safety.",
      "url": "https://timesofindia.indiatimes.com/city/coimbatore/4-speed-breakers-installed-around-central-bus-stand/articleshow/98420000.cms"
    },
    {
      "title": "Land survey for Coimbatore metro work begins today",
      "date": "2025-03-05",
      "summary": "The land survey for the Coimbatore metro project has commenced, marking a significant step towards improving urban transportation.",
      "url": "https://timesofindia.indiatimes.com/city/coimbatore/land-survey-for-coimbatore-metro-work-begins-today/articleshow/98390000.cms"
    },
    {
      "title": "Coimbatore corporation starts installing green net shades at major traffic junctions ahead of summer",
      "date": "2025-02-27",
      "summary": "To provide relief from the summer heat, the Coimbatore corporation has begun installing green net shades at major traffic junctions.",
      "url": "https://timesofindia.indiatimes.com/city/coimbatore/coimbatore-corporation-starts-installing-green-net-shades-at-major-traffic-junctions-ahead-of-summer/articleshow/98250000.cms"
    },
    {
      "title": "Three stalls encroaching upon Coimbatore corporation’s land evicted",
      "date": "2025-02-26",
      "summary": "Authorities have evicted three stalls that were encroaching on Coimbatore corporation land, aiming to reduce traffic congestion and reclaim public space.",
      "url": "https://timesofindia.indiatimes.com/city/coimbatore/three-stalls-encroaching-upon-coimbatore-corporations-land-evicted/articleshow/98240000.cms"
    }
  ]
  
  return (
    <ScrollView>
      
      <Text style={{
        padding:20,
        fontSize: 20,
        fontWeight: 'bold',
      }}>Local Updates</Text>
      {news.map((item, index) => (
        <View key={index} style={{
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
        }}>
          <Text style={{
            color:CustomStyle.primary,
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 5
          }}>{item.title}</Text>
          <Text  style={{
            color: '#666',
            marginBottom: 5
          }}>{item.date}</Text>
          <Text style={CustomStyle.cardSummary}>{item.summary}</Text>
        </View>
      ))}
    
       
    </ScrollView>
  )
}

export default Events

const styles = StyleSheet.create({})