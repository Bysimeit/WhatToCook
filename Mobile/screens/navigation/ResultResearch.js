import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Pressable, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import RecipeTile from '../../components/RecipeTile';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';

export default function ResultResearch({route, navigation}) {
    const active = "none";

    const dataJSON = route.params;
    
    const renderItem = ({item}) => {
        return (
            <RecipeTile recipe={item} navigation={navigation}/>
        );
    }
    
    return (
        <View style={styles.page}>
            <View style={styles.mainPage}>
                <Text style={styles.title}>Résultat de la recherche</Text>
                <FlatList 
                    nestedScrollEnabled
                    data={dataJSON.data}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            </View>
            <Header navigation={navigation}/>
            <NavBar navigation={navigation} active={active}/>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        width: "100%",
        backgroundColor: '#C9BEBE'
    },
    mainPage: {
        backgroundColor: '#C9BEBE',
        position: 'relative',
        marginTop: 110,
        marginBottom: 95
    },
    title: {
        textAlign: 'center',
        paddingTop: 30,
        paddingBottom: 30,
        fontSize: 25
    }
});