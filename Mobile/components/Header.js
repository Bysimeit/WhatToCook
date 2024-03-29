import React from 'react';
import { View, Text, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import { useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setConnected } from "../redux/actions/connectedStatus";
import { getConnected } from "../redux/selectors";
import { setAllergy } from '../redux/actions/allergyList';
import { setFood } from '../redux/actions/foodList';
import { setFavorite } from '../redux/actions/favoriteList';
import { setProfile } from '../redux/actions/profileList';

export default function Header({ navigation }) {
    const [isMenuVisible, setMenuVisible] = useState(false);

    const connectedRedux = useSelector(getConnected);

    const handlePressLogin = () => {
        navigation.navigate('Login');
        setMenuVisible(false);
    };
    const handlePressSignIn = () => {
        navigation.navigate('Registration');
        setMenuVisible(false);
    };
    const handlePressAccount = () => {
        navigation.navigate('Profile');
        setMenuVisible(false);
    };
    const handlePressFavorites = () => {
        navigation.navigate('Favorite');
        setMenuVisible(false);
    };
    const handlePressMyFridge = () => {
        navigation.navigate('Fridge');
        setMenuVisible(false);
    };
    const handlePressAllergy = () => {
        navigation.navigate('Allergies');
        setMenuVisible(false);
    };

    const dispatch = useDispatch();
    const handlePressLogOut = async () => {
        dispatch(setConnected([]));
        dispatch(setProfile([]));
        dispatch(setAllergy([]));
        dispatch(setFood([]));
        dispatch(setFavorite([]));
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("infoUser");
        await AsyncStorage.removeItem("email");
        navigation.navigate('Login');
        setMenuVisible(false);
    };

    const showMenu = () => {
        if (!connectedRedux.status) {
            return (
                <View style={[
                    { display: isMenuVisible ? "flex" : "none" },
                    styles.accountMenu,
                    ]}>
                    <Pressable onPress={ handlePressLogin }>
                        <Text style={styles.accountMenuItem}>Se connecter</Text>
                    </Pressable>
                    <Pressable onPress={ handlePressSignIn }>
                        <Text style={styles.accountMenuItem}>S'enregistrer</Text>
                    </Pressable>
                </View>
            );
        } else {
            return (
                <View style={[
                    { display: isMenuVisible ? "flex" : "none" },
                    styles.accountMenu,
                    ]}>
                    <Pressable onPress={ handlePressAccount }>
                        <Text style={styles.accountMenuItem}>Compte</Text>
                    </Pressable>
                    <Pressable onPress={ handlePressFavorites }>
                        <Text style={styles.accountMenuItem}>Favoris</Text>
                    </Pressable>
                    <Pressable onPress={ handlePressMyFridge }>
                        <Text style={styles.accountMenuItem}>Mon Frigo</Text>
                    </Pressable>
                    <Pressable onPress={ handlePressAllergy }>
                        <Text style={styles.accountMenuItem}>Mes allergies</Text>
                    </Pressable>
                    <Pressable onPress={ handlePressLogOut }>
                        <Text style={styles.accountMenuItem}>Se déconnecter</Text>
                    </Pressable>
                </View>
            );
        }
    }

  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.text}>WhatToCook</Text>
        </View>

        <View style={styles.buttonMenu}>
            <Pressable
                style={({ pressed }) => [{
                    opacity: pressed ? 0.2 : 1,
                },
                ]}
                onPress={() => {
                    if (isMenuVisible) {
                        setMenuVisible(false);
                    } else {
                        setMenuVisible(true);
                    }
                }}
            >
                { () => {
                    if (!isMenuVisible) {
                        return <Ionicons name='menu-outline' size={40} style={styles.iconsRight} />;
                    } else {
                        return <Ionicons name='close-outline' size={40} style={styles.iconsRight} />;
                    }
                } }
            </Pressable>
            { showMenu() }
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 110,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#3F3838",
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 15,
        paddingBottom: 10,
        position: "absolute"
    },
    text: {
        color: "white",
        fontSize: 20
    },
    accountMenu: {
        position: "absolute",
        top: 75,
        left: -165,
        width: 150,
        shadowColor: '#000'
    },
    accountMenuItem: {
        backgroundColor: "#D9D9D9",
        paddingVertical: 6,
        borderWidth: 0.9,
        borderRadius: 2,
        textAlign: "center"
    },
    buttonMenu: {
        backgroundColor: "#D9D9D9",
        borderRadius: 100,
        height: 50,
        width: 50
    },
    iconsRight: {
        textAlign: 'center',
        top: 4,
        left: 1
    }
});