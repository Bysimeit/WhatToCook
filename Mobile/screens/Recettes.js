import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Recettes({ navigation }) {
    const handlePressRecherche = () => {
        navigation.navigate('Recherche');
    };

    return (
        <View style={styles.page}>
            <ScrollView style={styles.mainPage}>
                <Text>Ici les recettes</Text>
            </ScrollView>
            <View style={styles.buttons}>
                <Pressable style={styles.searchButtonLeft} onPress={ handlePressRecherche }>
                    <Ionicons name='search-outline' size={25} style={styles.iconsLeft} />
                </Pressable>
                <Pressable style={styles.searchButtonActive}>
                    <Ionicons name='stats-chart-outline' size={25} style={styles.iconsActive} />
                </Pressable>
                <Pressable style={styles.searchButtonRight}>
                    <Ionicons name='compass-outline' size={25} style={styles.iconsRight} />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        width: "100%",
    },
    mainPage: {
        flex: 1,
        backgroundColor: '#C9BEBE',
    },
    searchButtonActive: {
        backgroundColor: "#3F3838", 
        height: 40, 
        width: 40, 
        borderRadius: 20,
        left: 130,
    },
    searchButtonLeft: {
        backgroundColor: "#D9D9D9",
        height: 40, 
        width: 40, 
        borderRadius: 20,
        left: 70,
    },
    searchButtonRight: {
        backgroundColor: "#D9D9D9",
        height: 40, 
        width: 40, 
        borderRadius: 20,
        left: 200,
    },
    iconsActive: {
        color: '#FFFFFF',
        textAlign: 'center',
        top: 6,
    },
    iconsLeft: {
        color: 'black',
        textAlign: 'center',
        top: 6,
    },
    iconsRight: {
        color: 'black',
        textAlign: 'center',
        top: 6,
    },
    buttons: {
        height: 50,
        position: 'absolute',
        flexDirection: 'row',
        bottom: 30,
    }
});