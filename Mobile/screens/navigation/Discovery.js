import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Pressable, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RecipeData from '../../components/RecipeData';

import useFetchRecipe from '../../services/useFetchRecipe';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';

export default function Discovery({navigation}) {
    const active = "right";

    const { randomRecipeFetch } = useFetchRecipe();
    const [randomRecipe, setRandomRecipe] = React.useState();
    
    useEffect(() => {
        randomRecipeFetch().then((result) => {
            if (result.status === 200) {
                setRandomRecipe(result.data[0]);
            }
        }).catch((e) => {
            console.error(e);
            Alert.alert("Erreur !", "Une erreur est survenue lors de la récupération de la recette.");
        });
    }, []);

    const getRandom = () => {
        if (randomRecipe !== undefined) return <RecipeData recipeData={randomRecipe}/>
    };

    return (
        <View style={styles.page}>
            <View style={styles.content}>
                <Text style={styles.title}>Découverte</Text>
                <Text style={styles.subTitle}>Nous vous proposons de découvrir la recette suivante :</Text>
                {getRandom()}
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
        backgroundColor: '#C9BEBE',
        elevation: -1
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
    subTitle: {
        marginLeft: 20,
        marginRight: 20
    }
});