import React from 'react';
import { StyleSheet, View, Button, Image } from 'react-native';

export default function Dashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://media.istockphoto.com/id/1410780007/photo/meeting-family-at-the-bus-stop.jpg?s=1024x1024&w=is&k=20&c=0kR0eXeG1QqRaqV8EUBild-LozH8L76dKCaGvbSCqrE=' }}
          style={styles.logo}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title='Open Map' onPress={() => navigation.navigate('user-pickup')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 900, // Increased width
    height: 600, // Increased height
    resizeMode: 'contain',
  },
  buttonContainer: {
    marginBottom: 20,
  },
});
