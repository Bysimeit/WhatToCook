import React from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, Pressable, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import useFetchCustomer from '../../services/useFetchCustomer';

import Header from '../../components/Header';
import NavBar from '../../components/NavBar';

export default function Login({ navigation }) {
  const [email, onChangeEMail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const handlePressButtonPW = () => {
    navigation.navigate('PasswordForget');
  };

  const { loginFetch } = useFetchCustomer();
  const handlePressConnect = () => {
    loginFetch(email, password).then(async (result) => {
      if (result.status === 200) {
        Alert.alert("Connexion réussie !");
        await AsyncStorage.setItem("token", result.data);
        await AsyncStorage.setItem("eMail", email);
        navigation.navigate("Profile");
      } else {
        onChangePassword(null);
        Alert.alert("EMail ou mot de passe incorrect !");
      }
    }).catch((e) => {
      switch (e.response.status) {
        case 404:
          onChangePassword(null);
          Alert.alert("EMail ou mot de passe incorrect !");
      }
    })
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
          <TextInput style={[styles.input, styles.shadowBox]} secureTextEntry={true} onChangeText={onChangePassword}/>
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