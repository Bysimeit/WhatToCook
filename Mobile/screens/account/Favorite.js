import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Alert, ScrollView, Pressable, FlatList } from 'react-native';
import RecipeTile from '../../components/RecipeTile';
import { useSelector } from 'react-redux';
import { getFavorite } from '../../redux/selectors';

import useFetchFavorite from '../../services/useFetchFavorite';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';

export default function Favorite({ navigation }) {
    const favorites = useSelector(getFavorite);

    const active = "none";

    const renderItem = ({item}) => {
        return (
            <RecipeTile recipe={item} navigation={navigation}/>
        );
    }

    return (
        <View style={styles.page}>
            <View style={styles.content}>
                <Text style={styles.title}>Favoris</Text>
                <FlatList 
                    nestedScrollEnabled
                    data={favorites}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
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
        marginTop: 110,
        marginBottom: 95
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
        marginRight: 'auto',
    }
});