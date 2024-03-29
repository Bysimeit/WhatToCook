import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert, TextInput, Pressable } from 'react-native';

import useFetchCustomer from '../../services/useFetchCustomer';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';

export default function PasswordForget({ navigation }) {
    const [eMail, onChangeEMail] = React.useState('');

    const { passwordForget } = useFetchCustomer();

    const handlePressSend = () => {
        if (eMail !== '') {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if (reg.test(eMail)) {
                passwordForget(eMail).then((result) => {
                    if (result.status === 204) {
                        onChangeEMail("");
                        Alert.alert("EMail envoyé !", "Nous vous invitons\nà regarder vos mails.");
                    }
                }).catch((e) => {
                    Alert.alert("Erreur !", e.message);
                });
            } else {
                Alert.alert("Erreur !", "Veuillez insérer une adresse mail valide !");
            }
        } else {
            Alert.alert("Erreur !", "Veuillez insérer une adresse eMail !");
        }
    }
    const handlePressBack = () => {
        navigation.navigate('Login');
    }

    const active = "none";

    useState(() => {
        //onChangeEMail('En cours de développement...');
    }, [])

    return (
        <View style={styles.page}>
            <View style={styles.content}>
                <Text style={styles.title}>Mot de passe oublié</Text>
                <View style={styles.inputView}>
                    <Text>EMail :</Text>
                    <TextInput style={[styles.input, styles.shadowBox]} onChangeText={onChangeEMail} value={eMail}/>
                </View>
                <Pressable style={[styles.buttonPassword, styles.shadowBox]} onPress={handlePressSend}>
                    <Text style={styles.textButton}>Envoyer</Text>
                </Pressable>
                <Pressable style={[styles.buttonBack, styles.shadowBox]} onPress={handlePressBack}>
                    <Text style={styles.textButton}>Retour</Text>
                </Pressable>
            </View>
            <Header navigation={navigation} />
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
        width: 80,
        backgroundColor: "#D9D9D9",
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    textButton: {
        textAlign: 'center',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    buttonBack: {
        marginTop: 50,
        height: 35,
        width: 70,
        backgroundColor: "#D9D9D9",
        marginRight: 'auto',
        marginLeft: 'auto'
    }
});