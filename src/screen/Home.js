import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Notification from '../components/Notification';
import Alarm from '../components/Alarm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Button, IconButton } from 'react-native-paper';

export default function Home({ navigation }) {
    const [useNotification, setNotification] = useState(false);
    const [useAlarms, setAlarms] = useState(false);

    useEffect(() => {
        navigation.addListener('focus', start);
        async function start() {
            await Notification()

            Notifications.addNotificationReceivedListener(async ({ request }) => {
                console.log(request.identifier)
            });
            Notifications.addNotificationResponseReceivedListener(response => {
                console.log(response);
            });

            const saved = JSON.parse(await AsyncStorage.getItem('save'))

            // clean
            // Notifications.cancelAllScheduledNotificationsAsync()
            if (saved && saved.length > 0) {
                const filter = saved.filter(data => (data.repeat - Math.ceil((Date.now() - data.startDate) / data.interval, 0)) > 0)
                await AsyncStorage.setItem('save', JSON.stringify(filter))
                setAlarms(saved)
            }
            console.log('Carregado!')
        }

    }, [])

    async function remove(data) {
        const saved = JSON.parse(await AsyncStorage.getItem('save'))
        const filter = saved.filter(x => x.indetifers[0] !== data.indetifers[0])
        for (let i = 0; i < data.indetifers.length; i++) {
            const indetifer = data.indetifers[i];
            try {
                const rm = await Notifications.cancelScheduledNotificationAsync(String(indetifer))
                console.log(indetifer, rm)
            } catch (error) {
                console.log(error)
            }
        }
        await AsyncStorage.setItem('save', JSON.stringify(filter))
        setAlarms(filter)
    }

    return (
        <View style={styles.container}>
            {useAlarms && useAlarms.map((data, index) => <Alarm data={data} remove={remove} key={index} />)}
            {!useAlarms && <View style={[styles.container, { justifyContent: 'flex-start', alignItems: 'center' }]}>
                <IconButton icon="arrow-top-right-thin" size={100} View style={ {alignSelf: 'flex-end' }}/>
                <Text style={styles.text} >Adicione alarme </Text>
            </View>}
        </View>);
};


const backgroundColor = "rgba(48,112,226,0.04)"
const color = "#666"

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', padding: 10, backgroundColor: '#fff' },
    button: { padding: 5, margin: 20 },
    text: { fontSize: 30 }
})