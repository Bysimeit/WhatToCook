import React from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';

export default function Fridge({ navigation }) {
    const active = "none";

    return (
        <View style={styles.page}>
            <View style={styles.content}>
                <Text style={styles.title}>Frigo</Text>
                <Pressable style={styles.addButton}>
                    <Ionicons name='add-outline' size={25} style={styles.addIcon}/>
                </Pressable>
            </View>
            <Header navigation={navigation}/>
            <NavBar navigation={navigation} active={active}/>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        width: '100%',
        backgroundColor: '#C9BEBE'
    },
    content: {
        position: 'relative',
        elevation: -1,
        marginTop: 110
    },
    title: {
        textAlign: 'center',
        paddingTop: 30,
        fontSize: 25
    },
    addButton: {
        backgroundColor: "#D9D9D9",
        height: 40,
        width: 40,
        borderRadius: 20,
        marginRight: 40,
        borderColor: "black",
        borderWidth: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 25
    },
    addIcon: {
        top: 6,
        left: 7.6
    }
});