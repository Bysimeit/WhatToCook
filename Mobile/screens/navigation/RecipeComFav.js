import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Alert, ScrollView, Pressable, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { getFavorite } from '../../redux/selectors';
import ComFavData from '../../components/ComFavData';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';

export default function RecipeComFav({route, navigation}) {
    const active = "none";

    const dataJSON = route.params;

    return (
        <View style={styles.page}>
            <View style={styles.content}>
                <Text style={styles.title}>Favoris et commentaire</Text>
                <ComFavData recipe={JSON.stringify(dataJSON)}/>
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
        fontSize: 25,
        paddingBottom: 30
    },
    separeView: {
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});