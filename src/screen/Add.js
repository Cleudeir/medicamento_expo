import DatePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { TextInput, Button } from 'react-native-paper';


export default function Add() {
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
    const backgroundColor = "rgba(48,112,226,0.05)"
    const color = "#666"
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', padding: 10, backgroundColor: '#fff' }}>
            <TouchableNativeFeedback onPress={() => { console.log('click'); setShow(!useShow) }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', borderRadius: 5, backgroundColor, margin: 5 }}>
                    <Text
                        style={{ fontSize: 18, alignSelf: 'flex-start', color, paddingLeft: 15, paddingTop: 5 }}
                    >{'Horario de Inicio'}</Text>
                    <Text
                        style={{ fontSize: 48, color }}>
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

            <TextInput style={{ height: 60, width: '100%', padding: 5, margin: 5, backgroundColor, color }}
                placeholderTextColor={color}
                label="Nome do Medicamento"
                right={<TextInput.Icon icon="pill" />}
            />
            <TextInput style={{ height: 60, width: '100%', padding: 5, margin: 5, backgroundColor, color }}
                placeholderTextColor={color}
                keyboardType='numeric'
                label="Quantida de comprimidos"
                right={<TextInput.Icon icon="numeric" />}
                onChangeText={() => { }}
            />
            <TextInput style={{ height: 60, width: '100%', padding: 5, margin: 5, backgroundColor, color }}
                placeholderTextColor={color}
                keyboardType='numeric'
                label="Intervalo de uso em Horas"
                right={<TextInput.Icon icon="numeric" />}
                onChangeText={() => { }}
            />
            <Button style={{ padding: 5, margin: 20 }}
                icon="alarm" mode="contained" onPress={() => console.log('Salvar')}>
                Salvar
            </Button>

        </View>
    )
}