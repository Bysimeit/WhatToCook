import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../components/Header';

export default function Connexion({ navigation }) {
    const handlePressResearch = () => {
        navigation.navigate('Recherche');
    };
  
    const handlePressRecipe = () => {
        navigation.navigate('Recettes');
    };

    return (
        <View style={styles.page}>
            <Header/>
            <View style={styles.content}>
                <Text style={styles.title}>Découverte</Text>
            </View>
            <View style={styles.buttons}>
                <Pressable style={styles.searchButtonLeft} onPress={ handlePressResearch }>
                    <Ionicons name='search-outline' size={25} style={styles.iconsNoActive} />
                </Pressable>
                <Pressable style={styles.searchButtonMiddle} onPress={ handlePressRecipe }>
                    <Ionicons name='stats-chart-outline' size={25} style={styles.iconsNoActive} />
                </Pressable>
                <Pressable style={styles.searchButtonActive}>
                    <Ionicons name='compass-outline' size={25} style={styles.iconsActive} />
                </Pressable>
            </View>
        </View>
  );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        width: '100%',
        backgroundColor: '#C9BEBE',
        elevation: -1
    },
    content: {
        position: 'relative',
        elevation: -1
    },
    title: {
        textAlign: 'center',
        paddingTop: 30,
        fontSize: 25
    },
    buttons: {
        height: 50,
        position: 'absolute',
        flexDirection: 'row',
        bottom: 30,
    },
    searchButtonLeft: {
        backgroundColor: "#D9D9D9", 
        height: 40, 
        width: 40, 
        borderRadius: 20,
        left: 70,
    },
    searchButtonMiddle: {
        backgroundColor: "#D9D9D9", 
        height: 40, 
        width: 40, 
        borderRadius: 20,
        left: 130,
    },
    searchButtonActive: {
        backgroundColor: "#3F3838", 
        height: 40, 
        width: 40, 
        borderRadius: 20,
        left: 200,
    },
    iconsNoActive: {
        color: 'black',
        textAlign: 'center',
        top: 6,
    },
    iconsActive: {
        color: '#FFFFFF',
        textAlign: 'center',
        top: 6,
    },
});