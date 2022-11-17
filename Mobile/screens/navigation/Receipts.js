import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';

export default function Receipts({ navigation }) {
    const active = "middle";

    return (
        <View style={styles.page}>
            <ScrollView style={styles.mainPage}>
                <Text style={styles.title}>Recettes</Text>
            </ScrollView>
            <Header navigation={navigation}/>
            <NavBar navigation={navigation} active={active}/>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        width: "100%",
        elevation: -1,
    },
    mainPage: {
        backgroundColor: '#C9BEBE',
        position: 'relative',
        elevation: -1,
        marginTop: 110
    },
    title: {
        textAlign: 'center',
        paddingTop: 30,
        fontSize: 25
    }
});