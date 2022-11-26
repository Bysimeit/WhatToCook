import * as React from 'react';
import { Text, View, StyleSheet, Image, Pressable, TextInput } from 'react-native';
import { useDispatch } from "react-redux";
//import { deleteFood } from "../redux/actions/foodList";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function DiscoveryTile({recipe}) {
    const [number, onChangeNumber] = React.useState('1');
    
    return (
        <View style={styles.content}>
            <Text style={styles.titleRecipe}>Nom recette</Text>
            <Text style={styles.titleRecipe}>30 minutes</Text>
            <Text style={styles.rateRecipe}>Notes :</Text>
            <View style={styles.rateStar}>
                <Ionicons name='star-outline' size={20}/>
                <Ionicons name='star-outline' size={20}/>
                <Ionicons name='star-outline' size={20}/>
                <Ionicons name='star-outline' size={20}/>
                <Ionicons name='star-outline' size={20}/>
            </View>
            <View style={styles.numberPerson}>
                <Text>Nombre de personne :</Text>
                <TextInput keyboardType='numeric' style={styles.input} maxLength={2} onChangeText={onChangeNumber} value={number}/>
                <View style={styles.reviewButton}>
                    <Ionicons name='bookmark-outline' size={25} style={styles.reviewIcon}/>
                </View>
            </View>
            <View style={styles.foodView}>
                <Text style={styles.titleRequired}>Aliments requis :</Text>
                <Text style={styles.foodAndSteps}>• 100g de jambon</Text>
                <Text style={styles.foodAndSteps}>• 250g de farine</Text>
                <Text style={styles.foodAndSteps}>• 5ml de vanille concentré</Text>
                <Text style={styles.foodAndSteps}>• 2 oeufs</Text>
            </View>
            <View style={styles.stepsView}>
                <Text style={styles.titleRequired}>Aliments requis :</Text>
                <Text style={styles.foodAndSteps}>1. Préchauffer le four à 200°</Text>
                <Text style={styles.foodAndSteps}>2. Faire chauffer de l'eau</Text>
                <Text style={styles.foodAndSteps}>3. Casser les oeufs dans un récipient</Text>
                <Text style={styles.foodAndSteps}>4. Couper en petit morceau votre jambon</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        marginLeft: 20
    },
    titleRecipe: {
        marginTop: 10
    },
    rateRecipe: {
        marginTop: 25
    },
    rateStar: {
        flexDirection: 'row'
    },
    numberPerson: {
        marginTop: 20,
        flexDirection: 'row'
    },
    input: {
        width: '10%',
        backgroundColor: '#D9D9D9',
        padding: 2,
        top: -5,
        marginLeft: 5,
        textAlign: 'center'
    },
    reviewButton: {
        backgroundColor: '#D9D9D9',
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 25,
        position: 'absolute',
        right: 25
    },
    reviewIcon: {
        textAlign: 'center',
        marginTop: 10
    },
    titleRequired: {
        marginBottom: 5
    },
    foodAndSteps: {
        marginLeft: 5
    },
    stepsView: {
        marginTop: 10
    }
});