import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, StatusBar, Image } from 'react-native';
import Alarm from '../components/Alarm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Button, IconButton } from 'react-native-paper';
import showAlert from '../components/Alert';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function Home({ navigation }) {
    const [useNotification, setNotification] = useState(false);
    const [useAlarms, setAlarms] = useState(false);
    const [useError, setError] = useState(false)


    useEffect(() => {
        navigation.addListener('focus', start);
        async function start() {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            console.log(existingStatus, finalStatus)
            try {
                const saved = JSON.parse(await AsyncStorage.getItem('save'))
                if (saved && saved.length > 0) {
                    const filter = saved.filter(data => (data.repeat - Math.ceil((Date.now() - data.startDate) / data.interval, 0)) > 0)
                    await AsyncStorage.setItem('save', JSON.stringify(filter))
                    setAlarms(saved)
                }
                console.log(saved.length, 'Carregado!')
            } catch (error) {
                console.log('error Home: ', error)
            }
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

    async function clear() {
        await AsyncStorage.clear()
        await Notifications.cancelAllScheduledNotificationsAsync()
        setAlarms(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.containerAlarm}>
                    <Image style={styles.logo}
                        source={{
                            uri: 'https://images-platform.99static.com/hlU1zl-N6WHdvixNeZHU7oRXiXY=/96x96:864x864/500x500/top/smart/99designs-contests-attachments/110/110332/attachment_110332211',
                        }} />
                    {useAlarms &&
                        <View>
                            {useAlarms.map((data, index) => <Alarm data={data} remove={remove} key={index} />)}
                            <Button style={styles.button} icon="alarm" mode="contained" onPress={() => { showAlert('Voce excluirá todos os alarms', clear) }}>
                                limpar
                            </Button>
                        </View>
                    }
                    {!useAlarms && <View style={[styles.containerAlarm, { justifyContent: 'flex-start', alignItems: 'center' }]}>
                        <IconButton icon="arrow-top-right-thin" size={100} View style={{ alignSelf: 'flex-end' }} />
                        <Text style={styles.text} >Adicione alarme </Text>
                    </View>}
                    {useError && <Text style={{ color: 'red', margin: 10 }}>
                        {useError}
                    </Text>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


const backgroundColor = "rgba(48,112,226,0.04)"
const color = "#666"

const styles = StyleSheet.create({
    container: {
        flex: 1,


    },
    scrollView: {
        marginHorizontal: 0,
        marginVertical: 0,
    },
    containerAlarm: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        backgroundColor: '#fff',
        minHeight: Dimensions.get('window').height - StatusBar.currentHeight
    },
    button: {
        padding: 5,
        margin: 20,
        width: 200,
        alignSelf: 'center'
    },
    text: { fontSize: 30 },
    logo: {
        width: '100%',
        height: 90,
        resizeMode: 'cover'
    },
})