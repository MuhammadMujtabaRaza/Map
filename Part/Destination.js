import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function Destination({ navigation, route }) {
  const { pickup } = route.params;
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [destination, setDestination] = useState();
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const locationListener = Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        distanceInterval: 1,
        timeInterval: 1000
      }, (location) => {
        setLocation(location);
        setLoading(false); // Set loading to false once location is fetched
      });

      return () => {
        locationListener.remove();
      };
    })();
  }, []);

  if (!location || loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="6000" color="#0000ff" />
      </View>
    );
  }

  const searchPlaces = (text) => {
    setDestination();
    const { latitude, longitude } = location.coords;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'fsq3nFAD3ZQc0IAfM3nR6T9kV7D1tQ8dM/53YA3/8gH5dKY='
      }
    };

    fetch(`https://api.foursquare.com/v3/places/search?query=${text}&ll=${latitude},${longitude}&radius=3000`, options)
      .then(response => response.json())
      .then(response => {
        setPlaces(response.results);
      })
      .catch(err => console.error(err));
  };

  const getDestinationLocation = (item) => {
    setDestination(item);
  };

  return (
    <View>
      <Text>Your Pickup Location is {pickup.name} {pickup.location.address}</Text>
      <View>
        <TextInput style={styles.input} placeholder='Search Destination Location' onChangeText={searchPlaces}></TextInput>
        {!destination &&
          <View>
            {places.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => getDestinationLocation(item)}>
                <Text>{item.name} {item.location.address}</Text>
              </TouchableOpacity>
            ))}
          </View>
        }

        {destination &&
          <View>
            <Text style={styles.pickupLocation}>Your Destination Location Is {destination.name} {destination.location.address}</Text>
          </View>
        }
      </View>

      <View>
        <MapView style={styles.map} initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0001,
          longitudeDelta: 0.0001,
        }}>
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title={"Your Location"}
            description={"My Home"}
          />
        </MapView>
        <Button disabled={!destination} style={styles.button} title='Select Fare' onPress={() => navigation.navigate('select-fare', { pickup, destination })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '81%',
  },
  button: {
    backgroundColor: '#000',
    color: '#fff',
    fontSize: 20,
  },
  pickupLocation: {
    color: 'green',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    height: 40,
    paddingLeft: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
