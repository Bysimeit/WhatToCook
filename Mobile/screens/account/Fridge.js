import React from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { addFood } from "../../redux/actions/foodList";
import Dialog from "react-native-dialog";
import DateTimePicker from '@react-native-community/datetimepicker';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';

export default function Fridge({ navigation }) {
    const dispatch = useDispatch();
    const [title, setTitle] = React.useState('');
    const onChangeText = (val) => { setNewTitle(val) }
    const onAddNewFood = () => {
        if (title === "") return;
        dispatch(addFood(title))
        setTitle("");
    }

    const [visibleTitle, setVisibleTitle] = React.useState(false);
    const [foodTitle, setFoodTitle] = React.useState('');
    const [visibleQuantity, setVisibleQuantity] = React.useState(false);
    const [foodQuantity, setFoodQuantity] = React.useState('');
    const [visibleWeight, setVisibleWeight] = React.useState(false);
    const [foodWeight, setFoodWeight] = React.useState('');
    const [visibleExpirationDate, setVisibleExpirationDate] = React.useState(false);
    const [foodExpirationDate, setFoodExpirationDate] = React.useState(new Date());
    const [visibleExpirationDateInfo, setVisibleExpirationDateInfo] = React.useState(false);

    const showDialogTitle = () => {
        setVisibleTitle(true);
    };
    
    const handleCancelTitle  = () => {
        setVisibleTitle(false);
    };

    const handleNextTitle  = () => {
        setVisibleTitle(false);
        setVisibleQuantity(true);
    };
    
    const handleCancelQuantity  = () => {
        setVisibleQuantity(false);
    };

    const handleNextQuantity   = () => {
        setVisibleQuantity(false);
        setVisibleWeight(true);
    };
    
    const handleCancelWeight = () => {
        setVisibleWeight(false);
    };

    const handleNextWeight  = () => {
        setVisibleWeight(false);
        setVisibleExpirationDateInfo(true);
    };

    const handleCancelExpirationDateInfo = () => {
        setVisibleExpirationDateInfo(false);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setFoodExpirationDate(currentDate);
        setVisibleExpirationDate(false);
    };

    const handleNextExpirationDateInfo  = () => {
        setVisibleExpirationDateInfo(false);
        showAddFoodExpirationDate()
    };

    function showAddFoodTitle() {
        return (
            <View>
                <Dialog.Container visible={visibleTitle}>
                    <Dialog.Title>Ajouter un aliment au frigo</Dialog.Title>
                    <Dialog.Description>Entrez le nom de l'aliment :</Dialog.Description>
                    <Dialog.Input onChangeText={setFoodTitle} placeholder="Écrivez ici..."/>
                    <Dialog.Button label="Annuler" onPress={handleCancelTitle} />
                    <Dialog.Button label="Suivant" onPress={handleNextTitle} />
                </Dialog.Container>
            </View>
        );
    }

    function showAddFoodQuantity() {
        return (
            <View>
                <Dialog.Container visible={visibleQuantity}>
                    <Dialog.Title>Ajouter un aliment au frigo</Dialog.Title>
                    <Dialog.Description>Entrez la quantitée :</Dialog.Description>
                    <Dialog.Input onChangeText={setFoodQuantity} placeholder="Écrivez ici..." keyboardType='numeric'/>
                    <Dialog.Button label="Annuler" onPress={handleCancelQuantity} />
                    <Dialog.Button label="Suivant" onPress={handleNextQuantity} />
                </Dialog.Container>
            </View>
        );
    }

    function showAddFoodWeight() {
        return (
            <View>
                <Dialog.Container visible={visibleWeight}>
                    <Dialog.Title>Ajouter un aliment au frigo</Dialog.Title>
                    <Dialog.Description>Entrez le poids :</Dialog.Description>
                    <Dialog.Input onChangeText={setFoodWeight} placeholder="Écrivez ici..." keyboardType='numeric'/>
                    <Dialog.Button label="Annuler" onPress={handleCancelWeight} />
                    <Dialog.Button label="Suivant" onPress={handleNextWeight} />
                </Dialog.Container>
            </View>
        );
    }

    function showAddFoodExpirationDateInfo() {
        return (
            <View>
                <Dialog.Container visible={visibleExpirationDateInfo}>
                    <Dialog.Title>Ajouter un aliment au frigo</Dialog.Title>
                    <Dialog.Description>Choisissez la date de péremption après avoir appuyer sur "Suivant".</Dialog.Description>
                    <Dialog.Button label="Annuler" onPress={handleCancelExpirationDateInfo} />
                    <Dialog.Button label="Suivant" onPress={handleNextExpirationDateInfo} />
                </Dialog.Container>
            </View>
        );
    }

    function showAddFoodExpirationDate() {
        return (
            <View>
                <DateTimePicker
                    style={{display: 'none'}}
                    value={foodExpirationDate}
                    mode="date"
                    onChange={onChange}
                    pointerEvents = {"none"}
                />
            </View>
        );
    }

    const active = "none";

    return (
        <View style={styles.page}>
            <View style={styles.content}>
                <Text style={styles.title}>Frigo</Text>
                <Pressable style={styles.addButton} onPress={showDialogTitle}>
                    <Ionicons name='add-outline' size={25} style={styles.addIcon}/>
                </Pressable>
                { showAddFoodTitle() }
                { showAddFoodQuantity() }
                { showAddFoodWeight() }
                { showAddFoodExpirationDateInfo() }
                { showAddFoodExpirationDate() }
            </View>
            <Header navigation={navigation}/>
            <NavBar navigation={navigation} active={active}/>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        width: '100%',
        backgroundColor: '#C9BEBE',
    },
    content: {
        position: 'relative',
        elevation: -1,
        marginTop: 110,
    },
    title: {
        textAlign: 'center',
        paddingTop: 30,
        fontSize: 25
    },
    addButton: {
        backgroundColor: "#D9D9D9",
        height: 40,
        width: 40,
        borderRadius: 20,
        marginRight: 40,
        borderColor: "black",
        borderWidth: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 25
    },
    addIcon: {
        top: 6,
        left: 7.6
    },
    addFood: {
        //elevation: 5
    }
});