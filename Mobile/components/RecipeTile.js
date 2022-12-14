import * as React from 'react';
import { Text, View, StyleSheet, Image, Pressable, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP_API } from '../services/config';

import useFetchRecipe from '../services/useFetchRecipe';

export default function RecipeTile({recipe, navigation}) {
    const { recipeDataFetch } = useFetchRecipe();

    const consultData = async () => {
        recipeDataFetch(recipe.id).then(async (result) => {
            if (result.status === 200) {
                await AsyncStorage.removeItem("recipeData");
                navigation.navigate("RecipeDetail", {
                    data: result.data
                });
            }
        }).catch((e) => {
            Alert.alert("Erreur !", e.message);
        });
    }

    return (
        <Pressable style={styles.container} onPress={consultData}>
            <Image source={{uri: `${IP_API}/upload/${recipe.id}.jpeg`}} style={styles.recipeImage}/>
            <View style={styles.recipeDetails}>
                <Text style={styles.recipeTitle}>{recipe.namerecipe}</Text>
                <View style={styles.viewFav}>
                    <Text style={styles.favText}>{ recipe.quoting }</Text>
                    <Ionicons name='star' size={30} style={styles.starIcon}/>
                </View>
                <View style={styles.viewDuration}>
                    <Ionicons name='timer-outline' size={30} style={styles.timeIcon}/>
                    <Text style={styles.timeText}>{recipe.time} minutes</Text>
                </View>
                <View style={styles.viewPrice}>
                    <Ionicons name='cash-outline' size={30} style={styles.priceIcon}/>
                    <Text style={styles.priceText}>{recipe.total} euros</Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        marginBottom: 10
    },
    recipeImage: {
        height: 300,
        width: 300
    },
    recipeDetails: {
        backgroundColor: "#787474",
        width: 300,
        height: 100,
        position: 'absolute',
        opacity: 0.8,
        bottom: 0
    },
    recipeTitle: {
        color: 'white',
        marginTop: 10,
        marginLeft: 10,
        fontSize: 20
    },
    viewDuration: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 5,
        left: 5
    },
    timeIcon: {
        color: 'white',
    },
    timeText: {
        color: 'white',
        fontSize: 15,
        top: 5,
        left: 5
    },
    viewPrice: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 5,
        right: 5
    },
    priceIcon: {
        color: 'white'
    },
    priceText: {
        color: 'white',
        fontSize: 15,
        top: 5,
        left: 5,
        marginRight: 5
    },
    viewFav: {
        position: 'absolute',
        flexDirection: 'row',
        top: 5,
        right: 5
    },
    favText: {
        color: 'white',
        fontSize: 25,
        marginRight: 5
    },
    starIcon: {
        color: '#FFCE31'
    }
});