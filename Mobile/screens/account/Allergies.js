import React from 'react';
import { Text, View, StyleSheet, Alert, ScrollView, Pressable } from 'react-native';
import CheckBox from 'expo-checkbox';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';

export default function Allergies({ navigation }) {
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

    const handlePressUpdate = () => {
        Alert.alert("Mise à jour réussie !", "Vos allergies ont bien été mise à jour.");
    };

    const active = "none";

    return (
        <View style={styles.page}>
            <View style={styles.content}>
                <Text style={styles.title}>Mes allergies</Text>
                <ScrollView style={styles.separeView}>
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