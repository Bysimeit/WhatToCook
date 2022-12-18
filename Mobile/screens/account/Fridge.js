import React, { useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, Pressable, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { addFood } from "../../redux/actions/foodList";
import { getFood } from "../../redux/selectors";
import Dialog from "react-native-dialog";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FoodTile from '../../components/FoodTile';

import useFetchFridge from '../../services/useFetchFridge';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';

export default function Fridge({ navigation }) {
    const dispatch = useDispatch();

    const [visibleTitle, setVisibleTitle] = React.useState(false);
    const [foodTitle, setFoodTitle] = React.useState('');
    const [visibleQuantity, setVisibleQuantity] = React.useState(false);
    const [foodQuantity, setFoodQuantity] = React.useState('');
    const [visibleWeight, setVisibleWeight] = React.useState(false);
    const [foodWeight, setFoodWeight] = React.useState('');
    const [foodExpirationDateRelay, setFoodExpirationDateRelay] = React.useState(new Date());
    const [visibleExpirationDateInfo, setVisibleExpirationDateInfo] = React.useState(false);
    const [visibleExpirationDate, setVisibleExpirationDate] = React.useState(false);

    const showDialogTitle = () => {
        setVisibleTitle(true);
    };
    
    const handleCancelTitle  = () => {
        setFoodTitle('');
        setVisibleTitle(false);
    };

    const handleNextTitle  = () => {
        if (foodTitle !== '') {
            setVisibleTitle(false);
            setVisibleQuantity(true);
        } else {
            setFoodTitle('');
            Alert.alert("Erreur !", "Veuillez mettre un nom à votre aliment.");
        }
    };
    
    const handleCancelQuantity  = () => {
        setFoodTitle('');
        setFoodQuantity('');
        setVisibleQuantity(false);
    };

    const handleNextQuantity   = () => {
        if (foodQuantity !== '') {
            setVisibleQuantity(false);
            setVisibleWeight(true);
        } else {
            setFoodTitle('');
            setFoodQuantity('');
            Alert.alert("Erreur !", "Veuillez insérer une quantitée.");
        }
    };
    
    const handleCancelWeight = () => {
        setFoodTitle(''),
        setFoodQuantity('');
        setFoodWeight('');
        setVisibleWeight(false);
    };

    const handleNextWeight  = () => {
        if (foodWeight !== '') {
            setVisibleWeight(false);
            setVisibleExpirationDateInfo(true);
        } else {
            setFoodTitle(''),
            setFoodQuantity('');
            setFoodWeight('');
            Alert.alert("Erreur !", "Veuillez insérer un poids.");
        }
    };

    const handleCancelExpirationDateInfo = () => {
        setFoodTitle(''),
        setFoodQuantity('');
        setFoodWeight('');
        setVisibleExpirationDateInfo(false);
    };

    const handleNextExpirationDateInfo  = () => {
        setVisibleExpirationDateInfo(false);
        setVisibleExpirationDate(true);
    };

    const { addFoodFetch } = useFetchFridge();
    const onAddNewFood = async (dateConversion) => {
        addFoodFetch(JSON.parse(await AsyncStorage.getItem("infoUser")).id, foodTitle, foodQuantity, foodWeight, dateConversion).then(async (result) => {
            if (result.status === 200) {
                dispatch(addFood(result.data, foodTitle, foodQuantity, foodWeight, dateConversion));
                Alert.alert("Ajouté");
            }
        }).catch((e) => {
            Alert.alert("Erreur !", e.message);
        });
        setFoodTitle('');
        setFoodQuantity('');
        setFoodWeight('');
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        let dateConversion = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();
        setVisibleExpirationDate(false);
        onAddNewFood(dateConversion);
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
        if (visibleExpirationDate) {
            return (
                <View>
                    <DateTimePicker
                        value={foodExpirationDateRelay}
                        mode="date"
                        onChange={onChange}
                        pointerEvents = {"none"}
                    />
                </View>
            );
        }
    }

    const active = "none";
    const foods = useSelector(getFood);

    const renderItem = ({item}) => {
        return (
            <FoodTile food={item} />
        );
    }

    return (
        <View style={styles.page}>
            <View style={styles.content}>
                <Text style={styles.title}>Frigo</Text>
                <Pressable style={styles.addButton} onPress={showDialogTitle}>
                    <Ionicons name='add-outline' size={25} style={styles.addIcon}/>
                </Pressable>
                <View style={styles.foodTitles}>
                    <Text style={styles.foodTitle}>Nom aliment</Text>
                    <Text>Qté</Text>
                    <Text>Poids (g)</Text>
                    <Text style={styles.foodExpirationDate}>Date limite</Text>
                </View>
                <FlatList
                    nestedScrollEnabled
                    contentContainerStyle = {styles.containerFood}
                    data={foods}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
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
        marginBottom: 290
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
    },
    containerFood: {
        paddingTop: 10,
        justifyContent : "space-between"
    },
    foodTitles: {
        display: "flex",
        paddingTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent : "space-between",
    },
    foodTitle: {
        marginLeft: 10
    },
    foodExpirationDate: {
        marginRight: 10
    }
});