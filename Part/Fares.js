import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

export default function Fares({ route }) {
  const { pickup, destination } = route.params;

  const fares = {
    bike: 70,
    rickshaw: 100,
    car: 250,
  };

  const calcCrow = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const toRad = (Value) => Value * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const lat1Rad = toRad(lat1);
    const lat2Rad = toRad(lat2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  const calculateFare = (vehicle) => {
    const { latitude: pickupLat, longitude: pickupLong } = pickup.geocodes.main;
    const { latitude: destinationLat, longitude: destinationLong } = destination.geocodes.main;

    const distance = calcCrow(pickupLat, pickupLong, destinationLat, destinationLong);

    const fare = fares[vehicle] * distance;
    alert('Rs. ' + fare.toFixed(2));
  };

  return (
    <View>
      <Text style={styles.pick}>Your Pickup Location is: {pickup.name} {pickup.location.address}</Text>
      <View style={styles.locationSeparator} />
      <Text style={styles.des}>Your Destination is: {destination.name} {destination.location.address}</Text>
      <Text style={styles.fare}>Select Fare</Text>

      <View>
        <TouchableOpacity onPress={() => calculateFare('bike')}>
          <ImageBackground
            style={styles.imageButton}
            source={{ uri: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
          >
            <Text style={styles.buttonText}>Bike | {fares.bike} Rs. / Km</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => calculateFare('rickshaw')}>
          <ImageBackground
            style={styles.imageButton}
            source={{ uri: 'https://media.istockphoto.com/id/1675688164/photo/indian-man-drives-auto-rickshaw-india.jpg?s=1024x1024&w=is&k=20&c=8CBxwhqDH5LUbIOVK8RMrnOl6WBbhmiHxKP89U4qb2o=' }}
          >
            <Text style={styles.buttonText}>Rickshaw | {fares.rickshaw} Rs. / Km</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => calculateFare('car')}>
          <ImageBackground
            style={styles.imageButton}
            source={{ uri: 'https://media.istockphoto.com/id/1478431022/photo/cars-for-sale-stock-lot-row.jpg?s=1024x1024&w=is&k=20&c=9Ia8cojAjkfVgft22bC_pt5NDko-_pWIu4JOYsjnAuY=' }}
          >
            <Text style={styles.buttonText}>Car | {fares.car} Rs. / Km</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageButton: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  locationSeparator: {
    // height: 20,
  },
  pick:{
    marginTop:15,
    textAlign:'center',
    fontWeight: 'bold',

  },
  des:{
    marginTop:15,
    textAlign:'center',
    fontWeight: 'bold',

  },
  fare:{
    marginTop:15,
    textAlign:'center',
    fontWeight: 'bold',
    backgroundColor: 'gray',

  }
});
