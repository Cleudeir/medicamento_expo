import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Switch from '../components/Switch';

export default function Home() {

    return (
        <View style={styles.container}>
            <Switch />
        </View>);
};


const backgroundColor = "rgba(48,112,226,0.05)"
const color = "#666"

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', padding: 10, backgroundColor: '#fff' }
})