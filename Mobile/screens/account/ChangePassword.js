import React from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { getProfile } from '../../redux/selectors';

import useFetchCustomer from '../../services/useFetchCustomer';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';

export default function ChangePassword({ navigation }) {
    const [oldPassword, onChangeOldPassword] = React.useState('');
    const [newPassword, onChangeNewPassword] = React.useState('');
    const [newPasswordConfirm, onChangeNewPasswordConfirm] = React.useState('');

    const profile = useSelector(getProfile);

    const { changePassword } = useFetchCustomer();
    const handlePressChangePassword = () => {
        if (oldPassword !== '') {
            if (newPassword !== '') {
                if (newPasswordConfirm !== '') {
                    if (newPassword === newPasswordConfirm) {
                        changePassword(oldPassword, newPassword, profile[0].email).then(async (result) => {
                            if (result.status === 204) {
                                Alert.alert("Mot de passe changé !", "Votre mot de passe a bien été mis à jour.");
                                onChangeOldPassword('');
                                onChangeNewPassword('');
                                onChangeNewPasswordConfirm('');
                                navigation.navigate('Profile');
                            }
                        }).catch((e) => {
                            Alert.alert("Erreur !", e.message);
                        });
                    } else {
                        Alert.alert("Erreur !", "Votre nouveau mot de passe ne correspond pas avec la confirmation.");
                    }
                } else {
                    Alert.alert("Erreur !", "Veuillez confirmer votre nouveau mot de passe.");
                }
            } else {
                Alert.alert("Erreur !", "Veuillez insérer votre nouveau mot de passe.");
            }
        } else {
            Alert.alert("Erreur !", "Veuillez insérer votre ancien mot de passe.");
        }
    }
    const handlePressBack= () => {
        navigation.navigate('Profile');
    }

    const active = "none";

    return (
        <View style={styles.page}>
            <View style={styles.content}>
                <Text style={styles.title}>Changement de mot de passe</Text>
                <View style={styles.inputView}>
                    <Text>Ancien mot de passe :</Text>
                    <TextInput style={[styles.input, styles.shadowBox]} secureTextEntry={true} onChangeText={onChangeOldPassword} value={oldPassword}/>
                </View>
                <View style={styles.inputView}>
                    <Text>Nouveau mot de passe :</Text>
                    <TextInput style={[styles.input, styles.shadowBox]} secureTextEntry={true} onChangeText={onChangeNewPassword} value={newPassword}/>
                </View>
                <View style={styles.inputView}>
                    <Text>Confirmer mot de passe :</Text>
                    <TextInput style={[styles.input, styles.shadowBox]} secureTextEntry={true} onChangeText={onChangeNewPasswordConfirm} value={newPasswordConfirm}/>
                </View>
                <Pressable style={[styles.buttonPassword, styles.shadowBox]} onPress={handlePressChangePassword}>
                    <Text style={styles.textButton}>Changer de mot de passe</Text>
                </Pressable>
                <Pressable style={[styles.buttonBack, styles.shadowBox]} onPress={handlePressBack}>
                    <Text style={styles.textButton}>Retour</Text>
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
    buttonBack: {
        marginTop: 50,
        height: 35,
        width: 70,
        backgroundColor: "#D9D9D9",
        marginRight: 'auto',
        marginLeft: 'auto'
    }
});