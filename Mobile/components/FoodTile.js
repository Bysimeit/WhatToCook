import * as React from 'react';
import { Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useDispatch } from "react-redux";
import { deleteFood } from "../redux/actions/foodList";
import AsyncStorage from '@react-native-async-storage/async-storage';

import useFetchFridge from '../services/useFetchFridge';

export default function FoodTile({food}) {
    const dispatch = useDispatch();

    const { deleteFoodFetch } = useFetchFridge();
    const onDeleteTask = async () => {
        deleteFoodFetch(JSON.parse(await AsyncStorage.getItem("infoUser")).id, food.id).then((result) => {
            if (result.status === 204) {
                dispatch(deleteFood(food.id));
            }
        }).catch((e) => {
            Alert.alert("Erreur !", e.message);
        });
    }

    return (
        <Pressable style={styles.container} onLongPress={onDeleteTask}>
            <Text style={styles.title}>{ food.name }</Text>
            <Text>{ food.quantity }</Text>
            <Text>{ food.weight }</Text>
            <Text style={styles.expirationDate}>{ food.date }</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        backgroundColor: '#D9D9D9',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    title: {
        marginLeft: 10
    },
    expirationDate: {
        marginRight: 10
    }
});