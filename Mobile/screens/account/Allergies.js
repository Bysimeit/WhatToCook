import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Alert, ScrollView, Pressable } from 'react-native';
import CheckBox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { getAllergies } from '../../redux/selectors';

import useFetchAllergy from '../../services/useFetchAllergy';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';

export default function Allergies({ navigation }) {
    const { allAllergyFetch, customerAllergyFetch, customerChangeAllergy } = useFetchAllergy();
    const [allAllergyName, setAllAllergyName] = React.useState();
    const [allAllergy, setAllAllergy] = React.useState();
    const [selectedAllergy, setSelectedAllergy] = React.useState([]);
    
    const forAllergy = () => {
        if (allAllergyName !== undefined) {
            return (
                <View>
                    {allAllergyName.map(allergy => (
                        <View key={allergy} style={styles.checkBoxContainer}>
                            <CheckBox
                                value={selectedAllergy.includes(allergy)}
                                onValueChange={() => {
                                    if (selectedAllergy.includes(allergy)) {
                                        setSelectedAllergy(selectedAllergy.filter(i => i !== allergy));
                                    } else {
                                        setSelectedAllergy([...selectedAllergy, allergy]);
                                    }
                                }} style={styles.checkbox} color='grey'/>
                            <Text style={styles.checkBoxLabel}>{allergy}</Text>
                        </View>
                    ))}
                </View>
            );
        }
    };

    const allergyRedux = useSelector(getAllergies);

    useEffect(() => {
        allAllergyFetch().then(async (result) => {
            if (result.status === 200) {
                let nameAllergy = [];
                for (let i = 0; i < result.data.length; i++) {
                    nameAllergy.push(result.data[i].name);
                }

                setAllAllergyName(nameAllergy);
                setAllAllergy(result.data);

                let allergyNamePush = [];
                for (let i = 0; i < allergyRedux.length; i++) {
                    for (let y = 0; y < result.data.length; y++) {
                        if (allergyRedux[i] === result.data[y].id) {
                            allergyNamePush.push(result.data[y].name);
                        }
                    }
                }
                setSelectedAllergy(allergyNamePush);
            }
        }).catch((e) => {
            console.error(e);
            Alert.alert("Erreur !", "Une erreur est survenue lors de la récupération des allergies.");
        });
    }, [allergyRedux]);

    const handlePressUpdate = async () => {
        let idAllergies = [];
        if (selectedAllergy.length !== 0) {
            for (let i = 0; i < selectedAllergy.length; i++) {
                for (let y = 0; y < allAllergy.length; y++) {
                    if (selectedAllergy[i] === allAllergy[y].name) {
                        idAllergies.push(allAllergy[y].id);
                    }
                }
            }
        }

        customerChangeAllergy(JSON.parse(await AsyncStorage.getItem("infoUser")).id, idAllergies).then((result) => {
            if (result.status === 201) {
                Alert.alert("Mise à jour réussie !", "Vos allergies ont bien été mise à jour.");
            }
        }).catch((e) => {
            console.error(e);
            Alert.alert("Erreur !", "Une erreur est survenue lors de la mise à jour de vos allergies.");
        });
    };

    const active = "none";

    return (
        <View style={styles.page}>
            <View style={styles.content}>
                <Text style={styles.title}>Mes allergies</Text>
                <ScrollView style={styles.separeView}>
                    {forAllergy()}
                    <Pressable style={[styles.buttonUpdate, styles.shadowBox]} onPress={handlePressUpdate}>
                        <Text style={styles.textButton}>Mettre à jour</Text>
                    </Pressable>
                </ScrollView>
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
        backgroundColor: '#C9BEBE'
    },
    content: {
        position: 'relative',
        elevation: -1,
        marginTop: 110
    },
    title: {
        textAlign: 'center',
        paddingTop: 30,
        fontSize: 25
    },
    separeView: {
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    checkBoxContainer: {
        flexDirection: 'row',
    },
    checkbox: {
        alignSelf: 'center',
        marginLeft: '3%',
    },
    checkBoxLabel: {
        margin: 8,
    },
    shadowBox: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7
    },
    buttonUpdate: {
        marginTop: 20,
        marginBottom: 15,
        height: 35,
        width: 150,
        backgroundColor: "#D9D9D9",
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    textButton: {
        textAlign: 'center',
        marginTop: 'auto',
        marginBottom: 'auto'
    }
});