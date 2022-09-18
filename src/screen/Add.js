import DatePicker from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as Notifications from 'expo-notifications';

export default function Add({ navigation }) {
    const [useTime, setTime] = useState(new Date())
    const [useShow, setShow] = useState(false)

    function hora() {
        const dia = useTime.getDate();
        const mes = (useTime.getMonth() + 1);
        const ano = useTime.getFullYear();
        const horas = useTime.getHours();
        const minutos = useTime.getMinutes();
        console.log("Hoje é dia " + dia + "/" + mes + " de " + ano + ". Agora são " + horas + ":" + minutos + "h");
        // saída: Hoje é dia 15/7 de 2020. Agora são 14:59h.
        return ((horas < 10 ? '0' + horas : horas) + ":" + (minutos < 10 ? '0' + minutos : minutos) + "h")
    }
    async function save() {
        const identifer = await Notifications.scheduleNotificationAsync({
            content: {
                title: "You've got mail! 📬",
                body: 'Here is the notification body',
                data: { data: 'goes here' },
                sound: true,
            },
            trigger: { seconds: 30 , repeats: true},
        });
        // Notifications.cancelAllScheduledNotificationsAsync()
        Notifications.getAllScheduledNotificationsAsync()
        console.log(Notifications.getAllScheduledNotificationsAsync())
        navigation.navigate('Home')
    }

return (
    <View style={styles.container}>

        <TouchableNativeFeedback onPress={() => { console.log('click'); setShow(!useShow) }}>
            <View style={styles.time}>
                <Text style={styles.textTime}>
                    {'Horario de Inicio'}
                </Text>
                <Text style={styles.pickerTime}>
                    {hora()}
                </Text>
            </View>
        </TouchableNativeFeedback>

        {useShow && <DatePicker placeholder="select date"
            format="YYYY-MM-DD"
            isVisible={useShow}
            mode="time"
            onChange={(e) => {
                console.log(new Date(e.nativeEvent.timestamp));
                setShow(!useShow);
                setTime(new Date(e.nativeEvent.timestamp))
            }}
            value={useTime} is24Hour={true}
            locale="pt-BR" />}

        <TextInput style={styles.imputText}
            placeholderTextColor={color}
            label="Nome do Medicamento"
            right={<TextInput.Icon icon="pill" />}
        />
        <TextInput style={styles.imputText}
            placeholderTextColor={color}
            keyboardType='numeric'
            label="Quantida de comprimidos"
            right={<TextInput.Icon icon="numeric" />}
            onChangeText={() => { }}
        />
        <TextInput style={styles.imputText}
            placeholderTextColor={color}
            keyboardType='numeric'
            label="Intervalo de uso em Horas"
            right={<TextInput.Icon icon="numeric" />}
            onChangeText={() => { }}
        />
        <Button style={styles.button} icon="alarm" mode="contained" onPress={save}>
            Salvar
        </Button>
    </View>
)
}

const backgroundColor = "rgba(48,112,226,0.05)"
const color = "#666"

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', padding: 10, backgroundColor: '#fff' },
    time: { justifyContent: 'center', alignItems: 'center', width: '100%', borderRadius: 5, backgroundColor, margin: 5 },
    textTime: { fontSize: 18, alignSelf: 'flex-start', color, paddingLeft: 15, paddingTop: 5 },
    pickerTime: { fontSize: 48 },
    imputText: { height: 60, width: '100%', padding: 5, margin: 5, backgroundColor, color },
    button: { padding: 5, margin: 20 }
})