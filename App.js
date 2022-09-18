import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Add from './src/screen/Add';
import Home from './src/screen/Home';
 


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}
          options={params => ({
            ...headerStyles,
            title: 'Alarms',
            headerRight: () => (
              <TouchableOpacity
                style={styles.button}
                onPress={() => { console.log('click'); params.navigation.navigate('add') }
                }
                underlayColor='#fff'>
                <Text style={styles.buttonText}>{' + '}</Text>
              </TouchableOpacity>
            )
          })}
        />
        <Stack.Screen name="add" component={Add} />
        {/*<Stack.Screen name="Edit" component={Settings} options={{ ...headerStyles, title: 'Alarm' }} />
        <Stack.Screen name="Ring" component={Ring} options={{ headerShown: false }} />*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const headerStyles = {
  headerStyle: {
    elevation: 0,
  },
  headerTintColor: '#000',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    padding: 10
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25
  },
});
