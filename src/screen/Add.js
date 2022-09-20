import DatePicker from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Add({ navigation }) {
    const [useTime, setTime] = useState(new Date(Date.now() + 30 * 1000))
    const [useShow, setShow] = useState(false)
    const [useName, setName] = useState('')
    const [useRepeat, setRepeat] = useState(28)
    const [useInterval, setInterval] = useState(8)
    const [useError, setError] = useState(false)
    const [startDate] = useState(Date.now())

    function hora(data, log) {
        const dia = data.getDate();
        const mes = (data.getMonth() + 1);
        const ano = data.getFullYear();
        const horas = data.getHours();
        const minutos = data.getMinutes();
        if (log) {
            console.log("Hoje é dia " + dia + "/" + mes + " de " + ano + ". Agora são " + horas + ":" + minutos + "h");
        }
        // saída: Hoje é dia 15/7 de 2020. Agora são 14:59h.
        return ((horas < 10 ? '0' + horas : horas) + ":" + (minutos < 10 ? '0' + minutos : minutos) + "h")
    }
    async function save() {

        let timeCorrection;
        if (useTime.getTime() > Date.now()) {
            timeCorrection = useTime.getTime()
        } else {
            timeCorrection = new Date(useTime);
            timeCorrection.setDate(timeCorrection.getDate() + 1);
            timeCorrection = timeCorrection.getTime()
        }
        hora(new Date(timeCorrection), true)
        console.log(timeCorrection)
        if (!useName) {
            // setError('Erro: Preencha o nome do Medicamento')
            // return
        }
        const startTimeSeconds = (timeCorrection - Date.now()) / 1000
        const intervalSeconds = useInterval * 60 * 60
        const times = []
        for (let i = 0; i < useRepeat; i++) {
            times.push(startTimeSeconds + intervalSeconds * i);
        }
        console.log('times ', times)
        const indetifers = []
        for (let i = 0; i < times.length; i++) {
            const count = useRepeat - i - 1
            for (let j = 0; j < 3; j++) {
                const notify = {
                    content: {
                        title: useName,
                        body: `É hora de tomar o Remédio, faltam somente ${count} unidades`,
                        data: { data: 'goes here' },
                        sound: true,
                        attachments: [{
                            url: 'https://cdn.icon-icons.com/icons2/1011/PNG/512/Google_Chrome_icon-icons.com_75711.png'
                        }]
                    },
                    trigger: {
                        seconds: times[i] + 20 * j
                    }
                }
                const indetifer = await Notifications.scheduleNotificationAsync(notify)
                indetifers.push(indetifer)
            }
        }
        const obj = {
            startDate: timeCorrection,
            indetifers,
            name: useName,
            interval: intervalSeconds * 1000,
            repeat: useRepeat,
            isAtive: true
        }
        try {
            const saved = JSON.parse(await AsyncStorage.getItem('save'))
            if (saved) {
                await AsyncStorage.setItem('save', JSON.stringify([obj, ...saved]))
            } else {
                await AsyncStorage.setItem('save', JSON.stringify([obj]))
            }
            // console.log(obj)
            navigation.navigate('Home')
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <View style={styles.container}>

            <TouchableNativeFeedback onPress={() => { console.log('click'); setShow(!useShow) }}>
                <View style={styles.time}>
                    <Text style={styles.textTime}>
                        {'Horario de Inicio'}
                    </Text>
                    <Text style={styles.pickerTime}>
                        {hora(useTime)}
                    </Text>
                </View>
            </TouchableNativeFeedback>

            {useShow && <DatePicker placeholder="select date"
                format="YYYY-MM-DD"
                isVisible={useShow}
                mode="time"
                onChange={(e) => {
                    setShow(!useShow);
                    const time = e.nativeEvent.timestamp
                    setTime(new Date(time))
                }}
                value={useTime}
                is24Hour={true}
                locale="pt-BR" />}

            <TextInput style={styles.imputText}
                placeholderTextColor={color}
                label="Nome do Medicamento"
                right={<TextInput.Icon icon="pill" />}
                onChangeText={(e) => { setName(e) }}
                value={String(useName)}
            />
            <TextInput style={styles.imputText}
                placeholderTextColor={color}
                keyboardType='numeric'
                label="Quantidade de doses/comprimidos"
                right={<TextInput.Icon icon="numeric" />}
                onChangeText={(e) => { setRepeat(e) }}
                value={String(useRepeat)}
            />
            <TextInput style={styles.imputText}
                placeholderTextColor={color}
                keyboardType='numeric'
                label="Intervalo de uso em Horas"
                right={<TextInput.Icon icon="numeric" />}
                onChangeText={(e) => { setInterval(e) }}
                value={String(useInterval)}
            />
            {useError && <Text style={{ height: 50, color: 'red', margin: 10 }}>
                {useError}
            </Text>
            }
            <Button style={styles.button} icon="alarm" mode="contained" onPress={save}>
                Salvar
            </Button>
        </View>
    )
}

const backgroundColor = "rgba(48,112,226,0.04)"
const color = "#666"

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', padding: 10, backgroundColor: '#fff' },
    time: { justifyContent: 'center', alignItems: 'center', width: '100%', borderRadius: 5, backgroundColor, margin: 5 },
    textTime: { fontSize: 18, alignSelf: 'flex-start', color, paddingLeft: 15, paddingTop: 5 },
    pickerTime: { fontSize: 48 },
    imputText: { height: 60, width: '100%', padding: 5, margin: 5, backgroundColor, color },
    button: { padding: 5, margin: 20 }
})