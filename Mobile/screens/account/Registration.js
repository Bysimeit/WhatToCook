import React from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, Pressable, Alert } from 'react-native';
import CheckBox from 'expo-checkbox';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';

export default function Registration({ navigation }) {
  const [name, onChangeName] = React.useState('');
  const [firstName, onChangeFirstName] = React.useState('');
  const [eMail, onChangeEMail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [passwordConfirm, onChangePasswordConfirm] = React.useState('');

  const [newsletterSelected, setNewletterSelection] = React.useState(false);

  const handlePressSignIn = () => {
    console.log("S'inscrire");
    Alert.alert("Inscription bien prise en compte.", "Vous pouvez maintenant vous connecter.");
  };

  const active = "none";

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Inscription</Text>
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
        <View style={styles.inputView}>
          <Text>Mot de passe :</Text>
          <TextInput style={[styles.input, styles.shadowBox]} onChangeText={onChangePassword} value={password}/>
        </View>
        <View style={styles.inputView}>
          <Text>Confirmer mot de passe :</Text>
          <TextInput style={[styles.input, styles.shadowBox]} onChangeText={onChangePasswordConfirm} value={passwordConfirm}/>
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