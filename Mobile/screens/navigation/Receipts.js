import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RecipeTile from '../../components/RecipeTile';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipe } from "../../redux/selectors";

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';

export default function Receipts({ navigation }) {
    const active = "middle";

    const recipe = useSelector(getRecipe);
    const renderItem = ({item}) => {
        return (
            <RecipeTile recipe={item} />
        );
    }
    
    return (
        <View style={styles.page}>
            <View style={styles.mainPage}>
                <Text style={styles.title}>Recettes</Text>
                <FlatList 
                    nestedScrollEnabled
                    data={recipe}
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