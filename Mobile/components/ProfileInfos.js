import * as React from 'react';
import { Text, View, StyleSheet, TextInput} from 'react-native';

export default function ProfileInfos({profile}) {
    return (
        <View>
            <View style={styles.inputView}>
                <Text>Nom :</Text>
                <TextInput editable={false} style={[styles.input, styles.shadowBox]} value={profile.name}/>
            </View>
            <View style={styles.inputView}>
                <Text>Prénom :</Text>
                <TextInput editable={false} style={[styles.input, styles.shadowBox]} value={profile.firstname}/>
            </View>
            <View style={styles.inputView}>
                <Text>EMail :</Text>
                <TextInput editable={false} style={[styles.input, styles.shadowBox]} value={profile.email}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputView: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 25
    },
    input: {
        backgroundColor: "#D9D9D9",
        width: 300,
        height: 30,
        color: 'black'
    },
    shadowBox: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7
    },
});