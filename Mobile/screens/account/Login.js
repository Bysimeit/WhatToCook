import React from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, Pressable, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch } from 'react-redux';
import { setProfile } from '../../redux/actions/profileList';
import { setFood } from '../../redux/actions/foodList';
import { setConnected } from '../../redux/actions/connectedStatus';
import { setAllergy } from '../../redux/actions/allergyList';
import { setFavorite } from '../../redux/actions/favoriteList';

import useFetchCustomer from '../../services/useFetchCustomer';
import useFetchFridge from '../../services/useFetchFridge';
import useFetchAllergy from '../../services/useFetchAllergy';
import useFetchFavorite from '../../services/useFetchFavorite';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';

export default function Login({ navigation }) {
  const [email, onChangeEMail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const handlePressButtonPW = () => {
    navigation.navigate('PasswordForget');
  };

  const { loginFetch, profileFetch } = useFetchCustomer();
  const { foodFetch } = useFetchFridge();
  const { customerAllergyFetch } = useFetchAllergy();
  const { customerFavoriteFetch } = useFetchFavorite();

  const dispatch = useDispatch();
  const handlePressConnect = () => {
      if (email !== '') {
        if (password !== '') {
          loginFetch(email, password).then(async (result) => {
            if (result.status === 200) {
              Alert.alert("Connexion réussie !");
              onChangeEMail('');
              onChangePassword('');
              await AsyncStorage.setItem("token", result.data);
              await AsyncStorage.setItem("email", email);

              profileFetch(email).then(async (result) => {
                if (result.status === 200) {
                  const jsonData = JSON.stringify(result.data[0]);
                  await AsyncStorage.setItem("infoUser", jsonData);
                  dispatch(setProfile(result.data));
                  let connected = {
                    id: result.data[0].id,
                    status: true
                  };
                  dispatch(setConnected(connected));

                  foodFetch(result.data[0].id).then((result) => {
                    if (result.status === 200) {
                      dispatch(setFood(result.data));
                    }
                  }).catch((e) => {
                    console.error(e);
                    Alert.alert("Erreur !", "Une erreur est survenue lors de la récupération du frigo");
                  });
                  
                  customerAllergyFetch(result.data[0].id).then((result) => {
                    if (result.status === 200) {
                        let pushAllergy = [];
                        for (let i = 0; i < result.data.length; i++) {
                          pushAllergy.push(result.data[i].idallergy);
                        }
                        dispatch(setAllergy(pushAllergy));
                    }
                  }).catch((e) => {
                      console.error(e);
                      Alert.alert("Erreur !", "Une erreur est survenue lors de la récupération des allergies de l'utilisateur.");
                  });

                  customerFavoriteFetch(result.data[0].id).then((result) => {
                    if (result.status === 200) {
                      dispatch(setFavorite(result.data));
                    }
                  }).catch((e) => {
                    console.error(e);
                    Alert.alert("Erreur !", "Une erreur est survenue lors de la récupération des recettes favorites !");
                  });

                  navigation.navigate("Profile");
                }
              }).catch((e) => {
                console.error(e);
                Alert.alert("Erreur !", "Une erreur est survenue lors de la récupération du profil.");
              });
            } else {
              onChangePassword('');
              Alert.alert("Erreur !", "Adresse eMail ou mot de passe incorrect !");
            }
          }).catch((e) => {
            switch (e.response.status) {
              case 404:
                onChangePassword('');
                Alert.alert("Erreur !", "Adresse eMail ou mot de passe incorrect !");
            }
          });
        } else {
          Alert.alert("Erreur !", "Veuillez insérer votre mot de passe !");
        }
      } else {
        Alert.alert("Erreur !", "Veuillez insérer votre adresse eMail !");
      }
  };

  const active = "none";

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Connexion</Text>
        <View style={styles.inputView}>
          <Text>EMail :</Text>
          <TextInput style={[styles.input, styles.shadowBox]} onChangeText={onChangeEMail} value={email}/>
        </View>
        <View style={styles.inputView}>
          <Text>Mot de passe :</Text>
          <TextInput style={[styles.input, styles.shadowBox]} secureTextEntry={true} onChangeText={onChangePassword} value={password}/>
        </View>
        <Pressable style={[styles.buttonPWForget, styles.shadowBox]} onPress={ handlePressButtonPW }>
            <Text style={styles.textButton}>Mot de passe oublié</Text>
        </Pressable>
        <Pressable style={[styles.buttonConnect, styles.shadowBox]} onPress={ handlePressConnect }>
            <Text style={styles.textButton}>Se connecter</Text>
        </Pressable>
      </View>
      <Header navigation={navigation}/>
      <NavBar navigation={navigation} active={active}/>
    </View>
  );
};

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
  buttonPWForget: {
    marginTop: 55,
    height: 35,
    width: 180,
    backgroundColor: "#D9D9D9",
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  textButton: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  buttonConnect: {
    marginTop: 100,
    height: 35,
    width: 140,
    backgroundColor: "#D9D9D9",
    marginRight: 'auto',
    marginLeft: 'auto'
  }
});