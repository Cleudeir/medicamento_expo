import * as React from 'react';
import { View, Text } from 'react-native';
import { Switch } from 'react-native-paper';

export default function () {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    return (<View style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignContent: 'center',
        width: '100%',
        borderRadius: 5,
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 5
    }}>
        <Text style={{
            marginLeft: 10,
            height: 50,
            textAlignVertical: 'center'
        }}>asa</Text>
        <Switch value={isSwitchOn} style={{ width: 50 }} onValueChange={onToggleSwitch} />
    </View>

    )
};