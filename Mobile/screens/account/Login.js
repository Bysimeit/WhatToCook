import React from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';

export default function Login({ navigation }) {
  const [eMail, onChangeEMail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const handlePressButtonPW = () => {
    navigation.navigate('PasswordForget');
  };
  const handlePressConnect = () => {
    console.log("Connexion");
  };

  const active = "none";

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Connexion</Text>
        <View style={styles.inputView}>
          <Text>EMail :</Text>
          <TextInput style={[styles.input, styles.shadowBox]} onChangeText={onChangeEMail} value={eMail}/>
        </View>
        <View style={styles.inputView}>
          <Text>Mot de passe :</Text>
          <TextInput style={[styles.input, styles.shadowBox]} onChangeText={onChangePassword} value={password}/>
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