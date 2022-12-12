import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Pressable, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RecipeTile from '../../components/RecipeTile';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipe } from "../../redux/selectors";
import AsyncStorage from '@react-native-async-storage/async-storage';

import useFetchRecipe from '../../services/useFetchRecipe';
import useFetchCustomer from '../../services/useFetchCustomer';
import useFetchFridge from '../../services/useFetchFridge';
import { setRecipes } from '../../redux/actions/recipeList';
import { setProfile } from '../../redux/actions/profileList';
import { setFood } from '../../redux/actions/foodList';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';

export default function Receipts({navigation}) {
    const active = "middle";

    const recipe = useSelector(getRecipe);
    const { recipeFetch } = useFetchRecipe();
    const { profileFetch } = useFetchCustomer();
    const { foodFetch } = useFetchFridge();

    const [connected, setConnected] = React.useState(null);
    const checkConnection = async () => {

        setConnected(await AsyncStorage.getItem("token") !== null);
        if (connected) {
            profileFetch(await AsyncStorage.getItem("email")).then(async (result) => {
                if (result.status === 200) {
                    dispatch(setProfile(result.data));
    
                    foodFetch(result.data[0].id).then((result) => {
                        if (result.status === 200) {
                            dispatch(setFood(result.data));
                        }
                    });
                }
            }).catch((e) => {
                console.error(e);
                Alert.alert("Erreur !", "Une erreur est survenue lors de la récupération du profil.");
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