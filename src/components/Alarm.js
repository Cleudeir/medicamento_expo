import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import { Avatar, Card, IconButton, Title, Paragraph } from 'react-native-paper';

export default function ({ data, remove }) {

    function hora(date) {
        const useTime = new Date(date)
        const dia = useTime.getDate();
        const mes = (useTime.getMonth() + 1);
        const ano = useTime.getFullYear();
        const horas = useTime.getHours();
        const minutos = useTime.getMinutes();
        return ((dia < 10 ? '0' + dia : dia) + "/" + (mes < 10 ? '0' + mes : mes) + ' ' + (horas < 10 ? '0' + horas : horas) + ":" + (minutos < 10 ? '0' + minutos : minutos) + "h")
    }


    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const showAlert = () =>
        Alert.alert(
            `${data.name.toUpperCase()}`,
            "Tem certeza que deseja excluir",
            [
                {
                    text: "Não",
                    style: "cancel",
                },
                {
                    text: "Sim",
                    onPress: () => remove(data),
                    style: "ok",
                },
            ]
        );

    const backgroundColor = "rgba(48,112,226,0.04)"
    const color = "#666"
    return (
        data && <View style={
            { flexDirection: 'row', justifyContent: 'space-around', width: '100%', backgroundColor, margin: 5, padding: 8, borderRadius: 8 }
        }>
            <Avatar.Icon icon="alarm-multiple" style={{ width: 50, height: 50 }} />
            <View style={{ fontSize: 5, marginTop: -15, flexDirection: 'column', justifyContent: 'space-around' }}>
                <View>
                    <Text style={{ fontSize: 18, marginTop: 5, flexDirection: 'column', justifyContent: 'space-around' }}>
                        {String(data.name.toUpperCase())}
                    </Text>
                    <Text style={{ fontSize: 10 }}>Finaliza em {String(hora(data.startDate + data.interval * data.repeat))}</Text>
                    <Text style={{ fontSize: 10 }}>{'Faltam ' + (data.repeat - Math.ceil((Date.now() - data.startDate) / data.interval, 0)) + ' doses/comprimidos'}</Text>
                </View>
            </View>
            <IconButton icon="close-circle" onPress={showAlert} color={'blue'} />
        </View>
    )
};