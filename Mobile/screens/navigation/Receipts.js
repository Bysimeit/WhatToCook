import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import RecipeTile from '../../components/RecipeTile';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipe } from "../../redux/selectors";
import AsyncStorage from '@react-native-async-storage/async-storage';

import useFetchRecipe from '../../services/useFetchRecipe';
import useFetchCustomer from '../../services/useFetchCustomer';
import useFetchFridge from '../../services/useFetchFridge';
import useFetchAllergy from '../../services/useFetchAllergy';
import useFetchFavorite from '../../services/useFetchFavorite';
import { setRecipes } from '../../redux/actions/recipeList';
import { setProfile } from '../../redux/actions/profileList';
import { setFood } from '../../redux/actions/foodList';
import { setConnected } from "../../redux/actions/connectedStatus";
import { setAllergy } from '../../redux/actions/allergyList';
import { setFavorite } from '../../redux/actions/favoriteList';
import { getConnected } from "../../redux/selectors";

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';

export default function Receipts({navigation}) {
    const active = "middle";

    const recipe = useSelector(getRecipe);
    const connectedRedux = useSelector(getConnected);
    const { recipeFetch } = useFetchRecipe();
    const { profileFetch } = useFetchCustomer();
    const { foodFetch } = useFetchFridge();
    const { customerAllergyFetch } = useFetchAllergy();
    const { customerFavoriteFetch } = useFetchFavorite();

    const checkConnection = async () => {
        if (connectedRedux.length !== 0 && connectedRedux.length !== undefined) {
            profileFetch(await AsyncStorage.getItem("email")).then(async (result) => {
                if (result.status === 200) {
                    dispatch(setProfile(result.data));
                    let connection = {
                        id: result.data[0].id,
                        status: true
                    };
                    dispatch(setConnected(connection));
    
                    foodFetch(result.data[0].id).then((result) => {
                        if (result.status === 200) {
                            dispatch(setFood(result.data));
                        }
                    }).catch((e) => {
                        Alert.alert("Erreur !", e.message);
                    });

                    customerAllergyFetch(result.data[0].id).then((result) => {
                        if (result.status === 200) {
                            let pushAllergy = [];
                            for (let i = 0; i < result.data.length; i++) {
                              pushAllergy.push(result.data[i].idallergy);
                            }
                            dispatch(setAllergy(pushAllergy));
                        }
                      }).catch((e) => {
                          Alert.alert("Erreur !", e.message);
                      });

                    customerFavoriteFetch(result.data[0].id).then((result) => {
                        if (result.status === 200) {
                            dispatch(setFavorite(result.data));
                        }
                    }).catch((e) => {
                        console.error(e);
                        Alert.alert("Erreur !", e.message);
                    });
                }
            }).catch((e) => {
                Alert.alert("Erreur !", e.message);
            });
        }
    }
    checkConnection();

    const dispatch = useDispatch();

    useEffect(() => {
        recipeFetch().then((result) => {
            if (result.status === 200) {
                dispatch(setRecipes(result.data));
            }
        });
    }, []);
    
    const renderItem = ({item}) => {
        return (
            <RecipeTile recipe={item} navigation={navigation}/>
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