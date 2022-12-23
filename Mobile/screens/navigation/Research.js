import React, {useEffect} from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, Button, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import CheckBox from 'expo-checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { getAllergies, getConnected } from "../../redux/selectors";

import useFetchAllergy from '../../services/useFetchAllergy';
import useFetchRecipe from '../../services/useFetchRecipe';
import useFetchFridge from '../../services/useFetchFridge';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';

export default function Research({ navigation }) {
    const [valueType, setValueType] = React.useState('1');
    const [numberTime, onChangeNumberTime] = React.useState();

    const [fridgeSelected, setFridgeSelection] = React.useState(false);

    const active = "left";

    const connectedRedux = useSelector(getConnected);

    const { allAllergyFetch, customerAllergyFetch } = useFetchAllergy();

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

    const { recipeSearchFetch } = useFetchRecipe();
    const { foodFetch } = useFetchFridge();
    const startResearch = () => {
        if (numberTime === undefined) {
            Alert.alert("Erreur !", "Veuillez indiquer la durée durant laquelle vous pouvez cuisiner.");
        } else {
            let idAllergies = [];
            if (selectedAllergy.length === 0) {
                idAllergies.push(0);
            } else {
                for (let i = 0; i < selectedAllergy.length; i++) {
                    for (let y = 0; y < allAllergy.length; y++) {
                        if (selectedAllergy[i] === allAllergy[y].name) {
                            idAllergies.push(allAllergy[y].id);
                        }
                    }
                }
            }

            if (fridgeSelected) {
                foodFetch(connectedRedux.id).then((result) => {
                    if (result.status === 200) {
                        let foodsNameFridge = "";
                        for (let i = 0; i < result.data.length; i++) {
                            if (i < result.data.length - 1) {
                                foodsNameFridge += result.data[i].name + ",";
                            } else {
                                foodsNameFridge += result.data[i].name;
                            }
                        }
                        recipeSearchFetch(valueType, numberTime, idAllergies, foodsNameFridge).then((result) => {
                            if (result.status === 200) {
                                navigation.navigate("ResultResearch", {
                                    data: result.data
                                })
                            }
                        }).catch((e) => {
                            Alert.alert("Erreur !", e.message);
                        });
                        setFridgeSelection(false);
                    }
                }).catch((e) => {
                    Alert.alert("Erreur !", e.message);
                });
            } else {
                recipeSearchFetch(valueType, numberTime, idAllergies, "").then((result) => {
                    if (result.status === 200) {
                        navigation.navigate("ResultResearch", {
                            data: result.data
                        })
                    }
                }).catch((e) => {
                    Alert.alert("Erreur !", e.message);
                });
            }
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
            Alert.alert("Erreur !", e.message);
        });
    }, [allergyRedux]);

    return (
        <View style={styles.page}>
            <ScrollView style={styles.mainPage}>
                <Text style={styles.title}>Recherche</Text>
                <View style={styles.container}>
                    <View>
                        <Text>Quelle type de plat cherchez-vous ?</Text>
                        <RadioButton.Group onValueChange={newValue => setValueType(newValue)} value={valueType}>
                            <View style={styles.buttonLabel}>
                                <Text style={{marginTop: '2.8%'}} >Entrée</Text>
                                <RadioButton value="1" color='grey' />
                            </View>
                            <View style={styles.buttonLabel}>
                                <Text style={{marginTop: '2.8%'}} >Plat</Text>
                                <RadioButton value="2" color='grey' />
                            </View>
                            <View style={styles.buttonLabel}>
                                <Text style={{marginTop: '2.8%'}} >Dessert</Text>
                                <RadioButton value="3" color='grey' />
                            </View>
                        </RadioButton.Group>
                    </View>
                    <View style={styles.separeView}>
                        <Text>Combien de temps pouvez-vous cuisiner ?</Text>
                        <View style={styles.numericField}>
                            <TextInput keyboardType='numeric' onChangeText={onChangeNumberTime} value={numberTime} style={styles.input} placeholder='0' maxLength={3} />
                            <Text style={{marginTop: '3.5%'}} > minutes</Text>
                        </View>
                    </View>
                    <View style={styles.separeView}>
                        <View>
                            <View style={connectedRedux.status ? styles.loginAllowedLabel : styles.loginRequireLabel}>
                                <Ionicons name="lock-closed-outline" size={25} />
                                <Text style={{margin: 4}}>Connexion requise</Text>
                            </View>
                            <View style={connectedRedux.status ? styles.loginAllowed : styles.loginRequire}>
                                <Text>Uniquement les recettes faisable avec votre frigo ?</Text>
                                <View style={styles.checkBoxContainer}>
                                    <CheckBox value={fridgeSelected} onValueChange={setFridgeSelection} style={styles.checkbox} color='grey' disabled={!connectedRedux.status} />
                                    <Text style={styles.checkBoxLabel}>Oui</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.separeView}>
                        <Text>Avez-vous des allergies ?</Text>
                        {forAllergy()}
                    </View>
                    <View style={styles.buttonSearch}>
                        <Button title='Rechercher' color="#787474" onPress={startResearch} />
                    </View>
                </View>
            </ScrollView>
            <Header navigation={navigation}/>
            <NavBar navigation={navigation} active={active}/>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        width: '100%'
    },
    mainPage: {
        flex: 1,
        backgroundColor: '#C9BEBE',
        position: 'relative',
        marginTop: 110
    },
    title: {
        textAlign: 'center',
        paddingTop: 30,
        fontSize: 25,
        paddingBottom: 10
    },
    container: {
        margin: '5%',
        marginBottom: 110
    },
    buttonLabel: {
        flexDirection: 'row-reverse',
        alignSelf: 'flex-start',
    },
    input: {
        borderWidth: 1,
        width: '15%',
        borderColor: '#D9D9D9',
        padding: 5,
    },
    numericField: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginTop: '1%',
        marginLeft: '3%',
    },
    separeView: {
        marginTop: '3%',
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
    lastCheckBox: {
        marginBottom: '5%',
    },
    loginRequire: {
        left: 0,
        top: 0,
        opacity: 0.35,
        backgroundColor: '#A39C9C',
        borderColor: 'black',
        borderWidth: 1,
    },
    loginRequireLabel: {
        position: 'absolute',
        opacity: 1,
        paddingVertical: 20,
        paddingHorizontal: 70,
        flexDirection: 'row'
    },
    loginAllowed: {
        left: 0,
        top: 0
    },
    loginAllowedLabel: {
        display: 'none'
    },
    buttonSearch: {
        marginTop: 10
    }
});