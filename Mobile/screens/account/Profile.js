import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Alert, TextInput, Pressable, Image } from 'react-native';
import CheckBox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { getProfile } from '../../redux/selectors';

import useFetchCustomer from '../../services/useFetchCustomer';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import ProfileInfos from '../../components/ProfileInfos';

export default function Profile({ navigation }) {
    const [newsletterSelected, setNewletterSelection] = React.useState(false);

    const handlePressPassword = () => {
        navigation.navigate('ChangePassword');
    }

    const { deleteCustomer } = useFetchCustomer();
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
                    onPress: async () => {
                        const idUser = await AsyncStorage.getItem("infoUser");
                        const jsonUser = JSON.parse(idUser);
                        deleteCustomer(jsonUser.id).then(async (result) => {
                            if (result.status === 204) {
                                Alert.alert("Supprimé !", "Votre compte a bien été supprimé.\nÀ bientôt !");
                                navigation.navigate("Login");
                            }
                        }).catch((e) => {
                            Alert.alert("Erreur !", e.message);
                        });
                    }
                }
            ]
        );
    }

    const active = "none";

    const [image, setImage] = React.useState(null);
    
    const getImage = async () => {
        await AsyncStorage.getItem("profilImg").then((img) => {
            setImage(img);
        });
    };
    
    if (newsletterSelected) {
        console.log("Veut la newsletter");
    } else {
        console.log("Ne veut pas la newsletter");
    }

    const profile = useSelector(getProfile);

    useEffect(() => {
        getImage();
    }, [navigation]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        });

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
                <ProfileInfos profile={profile}/>
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
        height: 30,
        color: 'black'
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