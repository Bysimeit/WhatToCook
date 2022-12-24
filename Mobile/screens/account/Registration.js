import React from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, Pressable, Alert } from 'react-native';
import CheckBox from 'expo-checkbox';

import useFetchCustomer from '../../services/useFetchCustomer';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';

export default function Registration({ navigation }) {
  const [lastName, onChangeName] = React.useState('');
  const [firstName, onChangeFirstName] = React.useState('');
  const [eMail, onChangeEMail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [passwordConfirm, onChangePasswordConfirm] = React.useState('');

  const [newsletterSelected, setNewletterSelection] = React.useState(false);

  const { newCustomer } = useFetchCustomer();
  const handlePressSignIn = () => {
    if (lastName !== '') {
      if (firstName !== '') {
        if (eMail !== '') {
          let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
          if (reg.test(eMail)) {
            if (password !== '') {
              if (passwordConfirm !== '') {
                if (password === passwordConfirm) {
                  newCustomer(lastName, firstName, password, eMail).then(async (result) => {
                    if (result.status === 201) {
                      Alert.alert("Bienvenue !", "Votre compte à été crée avec succès !\nPour pouver maintenant vous connecter.");
                      onChangeName('');
                      onChangeFirstName('');
                      onChangeEMail('');
                      onChangePassword('');
                      onChangePasswordConfirm('');
                      navigation.navigate('Login');
                    } else {
                      Alert.alert("Erreur !", "Veuillez réessayer !");
                    }
                  }).catch((e) => {
                    Alert.alert("Erreur !", e.message);
                  });
                } else {
                  Alert.alert("Erreur !", "Veuillez faire correspondre vos mots de passe !");
                }
              } else {
                Alert.alert("Erreur !", "Veuillez confirmer votre mot de passe.");
              }
            } else {
              Alert.alert("Erreur !", "Veuillez insérer un mot de passe.");
            }
          } else {
            Alert.alert("Erreur !", "Veuillez insérer une adresse mail valide !");
          }
        } else {
          Alert.alert("Erreur !", "Veuillez insérer une adresse mail.");
        }
      } else {
        Alert.alert("Erreur !", "Veuillez insérer un prénom.");
      }
    } else {
      Alert.alert("Erreur !", "Veuillez insérer un nom de famille.");
    }
  };

  const active = "none";

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Inscription</Text>
        <View style={styles.inputView}>
          <Text>Nom :</Text>
          <TextInput style={[styles.input, styles.shadowBox]} onChangeText={onChangeName} value={lastName}/>
        </View>
        <View style={styles.inputView}>
          <Text>Prénom :</Text>
          <TextInput style={[styles.input, styles.shadowBox]} onChangeText={onChangeFirstName} value={firstName}/>
        </View>
        <View style={styles.inputView}>
          <Text>EMail :</Text>
          <TextInput style={[styles.input, styles.shadowBox]} autoCapitalize='none' onChangeText={onChangeEMail} value={eMail}/>
        </View>
        <View style={styles.inputView}>
          <Text>Mot de passe :</Text>
          <TextInput style={[styles.input, styles.shadowBox]} secureTextEntry={true} onChangeText={onChangePassword} value={password}/>
        </View>
        <View style={styles.inputView}>
          <Text>Confirmer mot de passe :</Text>
          <TextInput style={[styles.input, styles.shadowBox]} secureTextEntry={true} onChangeText={onChangePasswordConfirm} value={passwordConfirm}/>
        </View>
        <View style={[styles.inputView, styles.newsletter]}>
          <Text>Recevoir la newsletter : </Text>
          <CheckBox onValueChange={setNewletterSelection} value={newsletterSelected} color="grey"/>
        </View>
        <Pressable style={[styles.buttonConnect, styles.shadowBox]} onPress={handlePressSignIn}>
            <Text style={styles.textButton}>S'inscrire</Text>
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
  newsletter: {
    flexDirection: 'row'
  },
  buttonConnect: {
    marginTop: 60,
    height: 35,
    width: 140,
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