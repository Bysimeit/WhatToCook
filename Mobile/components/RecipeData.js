import * as React from 'react';
import { Text, View, StyleSheet, Image, Pressable, TextInput, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IP_API } from '../services/config';

export default function RecipeData({recipeData, navigation}) {
    const [numberPerson, onChangeNumber] = React.useState('1');
    
    const starOne = () => {
        if (recipeData.quoting >= 1) {
            return <Ionicons name='star' size={20} style={styles.fillStar}/>;
        } else {
            return <Ionicons name='star-outline' size={20}/>;
        }
    }
    const starTwo = () => {
        if (recipeData.quoting >= 2) {
            return <Ionicons name='star' size={20} style={styles.fillStar}/>;
        } else {
            return <Ionicons name='star-outline' size={20}/>;
        }
    }
    const starThree = () => {
        if (recipeData.quoting >= 3) {
            return <Ionicons name='star' size={20} style={styles.fillStar}/>;
        } else {
            return <Ionicons name='star-outline' size={20}/>;
        }
    }
    const starFour = () => {
        if (recipeData.quoting >= 4) {
            return <Ionicons name='star' size={20} style={styles.fillStar}/>;
        } else {
            return <Ionicons name='star-outline' size={20}/>;
        }
    }
    const starFive = () => {
        if (recipeData.quoting >= 5) {
            return <Ionicons name='star' size={20} style={styles.fillStar}/>;
        } else {
            return <Ionicons name='star-outline' size={20}/>;
        }
    }

    const steps = () => {
        let stringOutput = '';
        if (recipeData.steps === null) {
            stringOutput += `Il n'y a pas d'étape pour cette recette.`;
        } else {
            for (let i = 0; i < recipeData.steps.length; i++) {
                stringOutput += `${i+1}. ${recipeData.steps[i]}\n\n`;
            }
        }

        return stringOutput;
    };

    const foods = (numberPerson) => {
        if (numberPerson <= 1) {
            numberPerson = 1;
        }

        let data = [];

        const newString = recipeData.foods.replace(regex, '"');

        const regex = /\((\d+),(.*?),(.*?)\)/g;
        const regex2 = /\\"/g;
        let match;

        while ((match = regex.exec(newString)) !== null) {
            const value = match[1];
            const characters = match[2].replace(regex2, '');
            const name = match[3].replace(regex2, '');
            
            data.push({ value, characters, name });
        }

        let stringOutput = '';
        for (let i = 0; i < data.length; i++) {
            stringOutput += `• ${data[i].value * numberPerson} ${data[i].characters} ${data[i].name}\n`;
        }

        return stringOutput;
        
    };

    const favotitePress = () => {
        navigation.navigate("RecipeComFav", {
            data: recipeData
        });
    };

    return (
        <ScrollView style={styles.content}>
            <Text style={styles.titleRecipe}>Nom : {recipeData.namerecipe}</Text>
            <Text style={styles.titleRecipe}>Durée : {recipeData.time} minutes</Text>
            <Text style={styles.rateRecipe}>Notes :</Text>
            <View style={styles.rateStar}>
                {starOne()}
                {starTwo()}
                {starThree()}
                {starFour()}
                {starFive()}
            </View>
            <Image style={styles.image} source={{uri: `${IP_API}/upload/${recipeData.id}.jpeg`}}/>
            <View style={styles.numberPerson}>
                <Text>Nombre de personne :</Text>
                <TextInput keyboardType='numeric' style={styles.input} maxLength={2} onChangeText={onChangeNumber} value={numberPerson}/>
                <Pressable style={styles.reviewButton} onPress={favotitePress}>
                    <Ionicons name='bookmark-outline' size={25} style={styles.reviewIcon}/>
                </Pressable>
            </View>
            <View style={styles.foodView}>
                <Text style={styles.titleRequired}>Aliments requis :</Text>
                <Text style={styles.foodAndSteps}>{foods(numberPerson)}</Text>
            </View>
            <View style={styles.stepsView}>
                <Text style={styles.titleRequired}>Étapes :</Text>
                <Text style={styles.foodAndSteps}>{steps()}</Text>
            </View>
        </ScrollView>
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
    fillStar: {
        color: '#FFCE31'
    },
    image: {
        height: 100,
        width: 100,
        position: 'absolute',
        right: 20
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
        marginTop: 10,
        marginRight: 20,
        paddingBottom: 200
    }
});