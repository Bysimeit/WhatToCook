import React from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, Button, Alert, Pressable } from 'react-native';
import { RadioButton } from 'react-native-paper';
import CheckBox from 'expo-checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../components/Header';

export default function Recherche({ navigation }) {
    const [value, setValue] = React.useState('starter');
    const [number, onChangeNumber] = React.useState('');

    const [fridgeSelected, setFridgeSelection] = React.useState(false);

    const [glutenSelected, setGlutenSelection] = React.useState(false);
    const [crustaceanSelected, setCrustaceanSelection] = React.useState(false);
    const [eggsSelected, setEggsSelection] = React.useState(false);
    const [peanutsSelected, setPeanutsSelection] = React.useState(false);
    const [fishSelected, setFishSelection] = React.useState(false);
    const [soySelected, setSoySelection] = React.useState(false);
    const [lactoseSelected, setLactoseSelection] = React.useState(false);
    const [nutsSelected, setNutsSelection] = React.useState(false);
    const [celerySelected, setCelerySelection] = React.useState(false);
    const [mustardSelected, setMustardSelection] = React.useState(false);
    const [sesameSeedSelected, setSesameSeedSelection] = React.useState(false);
    const [anhydrideSelected, setAnhydrideSelection] = React.useState(false);
    const [lupinSelected, setLupinSelection] = React.useState(false);
    const [molluscSelected, setMolluscSelection] = React.useState(false);

    const handlePressRecipe = () => {
        navigation.navigate('Recettes');
    };

    const handlePressDiscovery = () => {
        navigation.navigate('Decouverte');
    };

    return (
        <View style={styles.page}>
            <Header />
            <ScrollView style={styles.mainPage}>
                <View style={styles.container}>
                    <View>
                        <Text>Quelle type de plat cherchez-vous ?</Text>
                        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                            <View style={styles.buttonLabel}>
                                <Text style={{marginTop: '2.8%'}} >Entrée</Text>
                                <RadioButton value="starter" color='grey' />
                            </View>
                            <View style={styles.buttonLabel}>
                                <Text style={{marginTop: '2.8%'}} >Plat</Text>
                                <RadioButton value="dish" color='grey' />
                            </View>
                            <View style={styles.buttonLabel}>
                                <Text style={{marginTop: '2.8%'}} >Dessert</Text>
                                <RadioButton value="dessert" color='grey' />
                            </View>
                        </RadioButton.Group>
                    </View>
                    <View style={styles.separeView}>
                        <Text>Combien de temps pouvez-vous cuisiner ?</Text>
                        <View style={styles.numericField}>
                            <TextInput keyboardType='numeric' onChangeText={onChangeNumber} value={number} style={styles.input} placeholder='0' maxLength={3} />
                            <Text style={{marginTop: '3.5%'}} > minutes</Text>
                        </View>
                    </View>
                    <View style={styles.separeView}>
                        <View>
                            <View style={styles.loginRequireLabel}>
                                <Ionicons name="lock-closed-outline" size={25} />
                                <Text style={{margin: 4}}>Connexion requise</Text>
                            </View>
                            <View style={styles.loginRequire}>
                                <Text>Uniquement les recettes faisable avec le frigo ?</Text>
                                <View style={styles.checkBoxContainer}>
                                    <CheckBox value={fridgeSelected} onValueChange={setFridgeSelection} style={styles.checkbox} color='grey' disabled />
                                    <Text style={styles.checkBoxLabel}>Oui</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.separeView}>
                        <Text>Avez-vous des allergies ?</Text>
                        <View style={styles.checkBoxContainer}>
                            <CheckBox value={glutenSelected} onValueChange={setGlutenSelection} style={styles.checkbox} color='grey' />
                            <Text style={styles.checkBoxLabel}>Gluten</Text>
                        </View>
                        <View style={styles.checkBoxContainer}>
                            <CheckBox value={crustaceanSelected} onValueChange={setCrustaceanSelection} style={styles.checkbox} color='grey' />
                            <Text style={styles.checkBoxLabel}>Crustacés</Text>
                        </View>
                        <View style={styles.checkBoxContainer}>
                            <CheckBox value={eggsSelected} onValueChange={setEggsSelection} style={styles.checkbox} color='grey' />
                            <Text style={styles.checkBoxLabel}>Œufs</Text>
                        </View>
                        <View style={styles.checkBoxContainer}>
                            <CheckBox value={peanutsSelected} onValueChange={setPeanutsSelection} style={styles.checkbox} color='grey' />
                            <Text style={styles.checkBoxLabel}>Arachides</Text>
                        </View>
                        <View style={styles.checkBoxContainer}>
                            <CheckBox value={fishSelected} onValueChange={setFishSelection} style={styles.checkbox} color='grey' />
                            <Text style={styles.checkBoxLabel}>Poisson</Text>
                        </View>
                        <View style={styles.checkBoxContainer}>
                            <CheckBox value={soySelected} onValueChange={setSoySelection} style={styles.checkbox} color='grey' />
                            <Text style={styles.checkBoxLabel}>Soja</Text>
                        </View>
                        <View style={styles.checkBoxContainer}>
                            <CheckBox value={lactoseSelected} onValueChange={setLactoseSelection} style={styles.checkbox} color='grey' />
                            <Text style={styles.checkBoxLabel}>Lactose</Text>
                        </View>
                        <View style={styles.checkBoxContainer}>
                            <CheckBox value={nutsSelected} onValueChange={setNutsSelection} style={styles.checkbox} color='grey' />
                            <Text style={styles.checkBoxLabel}>Fruits à coques</Text>
                        </View>
                        <View style={styles.checkBoxContainer}>
                            <CheckBox value={celerySelected} onValueChange={setCelerySelection} style={styles.checkbox} color='grey' />
                            <Text style={styles.checkBoxLabel}>Céleri</Text>
                        </View>
                        <View style={styles.checkBoxContainer}>
                            <CheckBox value={mustardSelected} onValueChange={setMustardSelection} style={styles.checkbox} color='grey' />
                            <Text style={styles.checkBoxLabel}>Moutarde</Text>
                        </View>
                        <View style={styles.checkBoxContainer}>
                            <CheckBox value={sesameSeedSelected} onValueChange={setSesameSeedSelection} style={styles.checkbox} color='grey' />
                            <Text style={styles.checkBoxLabel}>Graine de sésame</Text>
                        </View>
                        <View style={styles.checkBoxContainer}>
                            <CheckBox value={anhydrideSelected} onValueChange={setAnhydrideSelection} style={styles.checkbox} color='grey' />
                            <Text style={styles.checkBoxLabel}>Anhydride sulfureux et sulfites</Text>
                        </View>
                        <View style={styles.checkBoxContainer}>
                            <CheckBox value={lupinSelected} onValueChange={setLupinSelection} style={styles.checkbox} color='grey' />
                            <Text style={styles.checkBoxLabel}>Lupin</Text>
                        </View>
                        <View style={[styles.checkBoxContainer, styles.lastCheckBox]}>
                            <CheckBox value={molluscSelected} onValueChange={setMolluscSelection} style={styles.checkbox} color='grey' />
                            <Text style={styles.checkBoxLabel}>Mollusques</Text>
                        </View>
                    </View>
                    <View>
                        <Button title='Rechercher' color="#787474" onPress={() => Alert.alert('Ptdr, il n\'y a pas encore l\'API.')} />
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttons}>
                <Pressable style={styles.searchButtonActive}>
                    <Ionicons name='search-outline' size={25} style={styles.iconsActive} />
                </Pressable>
                <Pressable style={styles.searchButtonMiddle} onPress={ handlePressRecipe } >
                    <Ionicons name='stats-chart-outline' size={25} style={styles.iconsNoActive} />
                </Pressable>
                <Pressable style={styles.searchButtonRight} onPress={ handlePressDiscovery } >
                    <Ionicons name='compass-outline' size={25} style={styles.iconsNoActive} />
                </Pressable>
            </View>
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
        elevation: -1,
    },
    container: {
        margin: '5%',
        marginBottom: 110,
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
        flexDirection: 'row',
    },
    searchButtonActive: {
        backgroundColor: "#3F3838", 
        height: 40, 
        width: 40, 
        borderRadius: 20,
        left: 70,
    },
    searchButtonMiddle: {
        backgroundColor: "#D9D9D9",
        height: 40, 
        width: 40, 
        borderRadius: 20,
        left: 130,
    },
    searchButtonRight: {
        backgroundColor: "#D9D9D9",
        height: 40, 
        width: 40, 
        borderRadius: 20,
        left: 200,
    },
    iconsActive: {
        color: '#FFFFFF',
        textAlign: 'center',
        top: 6,
    },
    iconsNoActive: {
        color: 'black',
        textAlign: 'center',
        top: 6,
    },
    buttons: {
        height: 50,
        position: 'absolute',
        flexDirection: 'row',
        bottom: 30,
    },
});