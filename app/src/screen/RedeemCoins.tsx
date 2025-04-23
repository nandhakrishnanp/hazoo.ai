import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const RedeemCoins = () => {
  const data = [
    {
      brand: 'Amazon',
      icon: '🛍️',
      gift_card_value: '₹100',
      uyir_coins: 500,
    },
    {
      brand: 'Flipkart',
      icon: '🎁',
      gift_card_value: '₹200',
      uyir_coins: 1000,
    },
    {
      brand: 'Swiggy',
      icon: '🍔',
      gift_card_value: '₹150',
      uyir_coins: 750,
    },
    {
      brand: 'Zomato',
      icon: '🍕',
      gift_card_value: '₹250',
      uyir_coins: 1250,
    },
    {
      brand: 'Myntra',
      icon: '👕',
      gift_card_value: '₹300',
      uyir_coins: 1500,
    },
    {
      brand: 'BigBasket',
      icon: '🛒',
      gift_card_value: '₹400',
      uyir_coins: 2000,
    },
    {
      brand: 'Tata Cliq',
      icon: '👜',
      gift_card_value: '₹500',
      uyir_coins: 2500,
    },
    {
      brand: 'Uber',
      icon: '🚖',
      gift_card_value: '₹600',
      uyir_coins: 3000,
    },
    {
      brand: 'BookMyShow',
      icon: '🎬',
      gift_card_value: '₹750',
      uyir_coins: 3750,
    },
    {
      brand: 'Decathlon',
      icon: '🏋️',
      gift_card_value: '₹1000',
      uyir_coins: 5000,
    },
  ];

  return (
    <ScrollView
      style={{
        width:"100%",
        marginRight:8
      }}>
      <Text
        style={{
          padding: 10,
          fontSize: 19,
          fontWeight: '800',
        }}>
        {' '}
        Redeem Uyir Coins
      </Text>

      <View
        style={{
          width: '100%',
          justifyContent: 'space-between',
        }}>
        {data.map(item => (
          <View
            style={{
              backgroundColor: '#4c1f8e',
              padding: 10,
              width: '100%',
              margin: 4,
              borderRadius: 14,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 19,
               
                fontWeight: '800',
              }}>
              {item.brand}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 19,
                fontWeight: '800',
              }}>
              {item.icon}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                margin:8
              }}>
              <Text
                style={{
                  backgroundColor: 'white',
                  fontSize: 19,
                  fontWeight: '800',
                  padding: 3,
                  paddingHorizontal:9,
                  borderRadius: 100,
                }}>
                {item.gift_card_value}
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 19,
                  fontWeight: '800',
                  paddingHorizontal: 10,
                }}>
                {' '}
                {item.uyir_coins} Coins
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default RedeemCoins;

const styles = StyleSheet.create({});
