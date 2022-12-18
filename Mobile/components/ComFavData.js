import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Image, Pressable, TextInput, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from 'expo-checkbox';

import useFetchFavorite from '../services/useFetchFavorite';

import { useDispatch, useSelector } from 'react-redux';
import { getFavorite } from '../redux/selectors';
import { getProfile } from '../redux/selectors';
import { deleteFavorite } from '../redux/actions/favoriteList';
import { addFavorite } from '../redux/actions/favoriteList';

export default function ComFavData({recipe}) {
    const recipeJSON = JSON.parse(recipe).data;

    const [isFavorite, setIsFavorite] = React.useState(false);
    const [disable, setDisable] = React.useState(true);

    const favoriteRedux = useSelector(getFavorite);
    const profileRedux = useSelector(getProfile);
    const dispatch = useDispatch();

    const { changeCustomerFavorite } = useFetchFavorite();

    const checkBoxInteract = () => {
        if (isFavorite) {
            dispatch(deleteFavorite(recipeJSON.id));
            changeCustomerFavorite(profileRedux[0].id, recipeJSON.id, false).then((result) => {
                if (result.status === 204) {
                    Alert.alert("Ajouté !", "La recette a bien été ajoutée dans vos favoris.");
                }
            }).catch((e) => {
                Alert.alert("Erreur !", e.message);
            });
            setIsFavorite(false);
        } else {
            dispatch(addFavorite(recipeJSON.id, recipeJSON.namerecipe, recipeJSON.time, recipeJSON.total, recipeJSON.quoting, recipeJSON.picture));
            changeCustomerFavorite(profileRedux[0].id, recipeJSON.id, true).then((result) => {
                if (result.status === 204) {
                    Alert.alert("Ajouté !", "La recette a bien été ajoutée dans vos favoris.");
                }
            }).catch((e) => {
                Alert.alert("Erreur !", e.message);
            });
            setIsFavorite(true);
        }
    }

    useEffect(() => {
        setIsFavorite(false);
        if (profileRedux.length !== 0) {
            setDisable(false);
            if (favoriteRedux.length !== 0) {
                for (let i = 0; i < favoriteRedux.length; i++) {
                    if (favoriteRedux[i].id === recipeJSON.id) {
                        setIsFavorite(true);
                    }
                }
            }
        } else {
            setDisable(true);
        }
    }, [favoriteRedux, profileRedux]);

    return (
        <View style={styles.content}>
            <Text style={styles.titleRecipe}>{recipeJSON.namerecipe}</Text>
            <View style={styles.favoriteView}>
                <CheckBox value={isFavorite} onValueChange={checkBoxInteract} color='grey' disabled={disable}/>
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