import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Notification from '../components/Notification';
import Switch from '../components/Switch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Button } from 'react-native-paper';

export default function Home({ navigation }) {
    const [useNotification, setNotification] = useState(false);
    const [useAlarms, setAlarms] = useState(false);

    useEffect(() => {
        navigation.addListener('focus', start);
        async function start() {
            await Notification()
            Notifications.addNotificationReceivedListener(async ({ request }) => {
                const id = request.identifier
                console.log(request.identifier)
                const saved = JSON.parse(await AsyncStorage.getItem('save'))
            });
            Notifications.addNotificationResponseReceivedListener(response => {
                console.log(response);
            });
            const saved = JSON.parse(await AsyncStorage.getItem('save'))

            if (saved) {
                console.log(saved.length);
                setAlarms(saved)
            }

            console.log('Carregado!')
        }

    }, [])

    function clear() {
        AsyncStorage.clear()
        Notifications.cancelAllScheduledNotificationsAsync()
        setAlarms(false)
    }

    return (
        <View style={styles.container}>
            {useAlarms && useAlarms.map((data, index) => <Switch data={data} key={index} />)}
            <Button style={styles.button} mode="contained" onPress={clear}>Clear</Button>
        </View>);
};


const backgroundColor = "rgba(48,112,226,0.05)"
const color = "#666"

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', padding: 10, backgroundColor: '#fff' },
    button: { padding: 5, margin: 20 }
})