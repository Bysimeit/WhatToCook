import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Image, Pressable, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from 'expo-checkbox';

import { useDispatch, useSelector } from 'react-redux';
import { getFavorite } from '../redux/selectors';

export default function ComFavData({recipe}) {
    const recipeJSON = JSON.parse(recipe).data;

    const [isFavorite, setIsFavorite] = React.useState(false);

    const allergyRedux = useSelector(getFavorite);

    useEffect(() => {
        
    }, [allergyRedux]);

    return (
        <View style={styles.content}>
            <Text style={styles.titleRecipe}>{recipeJSON.namerecipe}</Text>
            <View style={styles.favoriteView}>
                <CheckBox value={isFavorite} onValueChange={setIsFavorite} color='grey'/>
                <Text style={styles.favoriteText}>Recette favorite</Text>
            </View>
            <View style={styles.commentView}>
                <Text>Commentaires :</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        //marginLeft: 20
    },
    titleRecipe: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20
    },
    favoriteView: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 30
    },
    favoriteText: {
        marginLeft: 10
    },
    commentView: {
        marginLeft: 20
    }
});