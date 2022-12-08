import * as React from 'react';
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { useDispatch } from "react-redux";
import { deleteFood } from "../redux/actions/foodList";

export default function FoodTile({food}) {
    const dispatch = useDispatch();

    const onDeleteTask = () => {
        dispatch(deleteFood(food.id));
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