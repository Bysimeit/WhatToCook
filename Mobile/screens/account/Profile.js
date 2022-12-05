import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Alert, TextInput, Pressable, Image } from 'react-native';
import CheckBox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useFetchCustomer from '../../services/useFetchCustomer';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';

export default function Profile({ navigation }) {
    const [name, onChangeName] = React.useState('');
    const [firstName, onChangeFirstName] = React.useState('');
    const [eMail, onChangeEMail] = React.useState('');

    const [newsletterSelected, setNewletterSelection] = React.useState(false);

    const { profileFetch } = useFetchCustomer();
    const fillProfile = async () => {
        profileFetch(await AsyncStorage.getItem("eMail")).then(async (result) => {
            if (result.status === 200) {
                console.log(result.data);
            } else {
                Alert.alert("Erreur !", "Un problème est survenu lors de la récupération des données.");
            }
        }).catch((e) => {
            console.error(e);
            Alert.alert("Erreur !", "Un problème est survenu lors de la récupération des données.");
        });
    };
    fillProfile();

    const handlePressPassword = () => {
        navigation.navigate('ChangePassword');
    }
    const handlePressDelete = () => {
        Alert.alert(
            "ATTENTION",
            "Voulez-vous supprimer votre compte ?\n\nAction irréversible.",
            [
                {
                    text: "Annuler",
                    onPress: () => {
                        console.log("Suppression annulée");
                    }
                },
                {
                    text: "Oui",
                    onPress: () => {
                        console.log("Supprimer le compte");
                    }
                }
            ]
        );
    }

    if (newsletterSelected) {
        console.log("Veut la newsletter");
    } else {
        console.log("Ne veut pas la newsletter");
    }

    const active = "none";

    const [image, setImage] = React.useState(null);
    
    useEffect(() => {
        AsyncStorage.getItem("profilImg").then((err,urlImage) => {
            setImage(urlImage);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        });
        console.log(result);
        if (!result.cancelled) {
            setImage(result.uri);
            await AsyncStorage.setItem("profilImg", JSON.stringify(result.uri));
        }
    }
    
    return (
        <View style={styles.page}>
            <View style={styles.content}>
                <Text style={styles.title}>Profil</Text>
                <Pressable onPress={pickImage}>
                    <Image style={styles.iconUser} source={!image ? require('../../assets/account/iconDefaultUser.png') : {uri: image} }/>
                </Pressable>
                <View style={styles.inputView}>
                    <Text>Nom :</Text>
                    <TextInput style={[styles.input, styles.shadowBox]} onChangeText={onChangeName} value={name}/>
                </View>
                <View style={styles.inputView}>
                    <Text>Prénom :</Text>
                    <TextInput style={[styles.input, styles.shadowBox]} onChangeText={onChangeFirstName} value={firstName}/>
                </View>
                <View style={styles.inputView}>
                    <Text>EMail :</Text>
                    <TextInput style={[styles.input, styles.shadowBox]} onChangeText={onChangeEMail} value={eMail}/>
                </View>
                <Pressable style={[styles.buttonPassword, styles.shadowBox]} onPress={handlePressPassword}>
                    <Text style={styles.textButton}>Changer de mot de passe</Text>
                </Pressable>
                <View style={styles.inputView}>
                    <Text>Préférence :</Text>
                    <View style={styles.newsletter}>
                        <Text>Recevoir la newsletter : </Text>
                        <CheckBox onValueChange={setNewletterSelection} value={newsletterSelected} color="grey"/>
                    </View>
                </View>
                <Pressable style={[styles.buttonDelete, styles.shadowBox]} onPress={handlePressDelete}>
                    <Text style={styles.textButton}>Supprimer mon compte</Text>
                </Pressable>
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
    input: {
        backgroundColor: "#D9D9D9",
        width: 300,
        height: 30
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
    inputView: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 25
    },
    buttonPassword: {
        marginTop: 30,
        height: 35,
        width: 200,
        backgroundColor: "#D9D9D9",
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    textButton: {
        textAlign: 'center',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    newsletter: {
        flexDirection: 'row'
    },
    buttonDelete: {
        top: 80,
        height: 35,
        width: 170,
        backgroundColor: "#D9D9D9",
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    iconUser: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
        height: 50,
        width: 50
    },
    test: {
        width: 100,
        height: 100,
        marginTop: 10
    }
});