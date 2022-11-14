import React from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../components/Header';

export default function Connexion({ navigation }) {
  const handlePressResearch = () => {
    navigation.navigate('Recherche');
  };
  const handlePressRecipe = () => {
    navigation.navigate('Recettes');
  };
  const handlePressDiscovery = () => {
    navigation.navigate('Decouverte');
  };

  const [text, setText] = React.useState();

  const handlePressButtonPW = () => {
    console.log("MDP Oublié");
  };
  const handlePressConnect = () => {
    console.log("Connexion");
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Connexion</Text>
        <View style={styles.inputView}>
          <Text>EMail :</Text>
          <TextInput style={[styles.input, styles.shadowBox]}/>
        </View>
        <View style={styles.inputView}>
          <Text>Mot de passe :</Text>
          <TextInput style={[styles.input, styles.shadowBox]}/>
        </View>
        <Pressable style={[styles.buttonPWForget, styles.shadowBox]} onPress={ handlePressButtonPW }>
            <Text style={styles.textPWForget}>Mot de passe oublié</Text>
        </Pressable>
        <Pressable style={[styles.buttonConnect, styles.shadowBox]} onPress={ handlePressConnect }>
            <Text style={styles.textPWForget}>Se connecter</Text>
        </Pressable>
      </View>
      <Header navigation={navigation}/>
      <View style={styles.buttons}>
        <Pressable style={styles.searchButtonLeft} onPress={ handlePressResearch }>
            <Ionicons name='search-outline' size={25} style={styles.iconsNoActive} />
        </Pressable>
        <Pressable style={styles.searchButtonMiddle} onPress={ handlePressRecipe }>
            <Ionicons name='stats-chart-outline' size={25} style={styles.iconsNoActive} />
        </Pressable>
        <Pressable style={styles.searchButtonRight} onPress={ handlePressDiscovery }>
            <Ionicons name='compass-outline' size={25} style={styles.iconsNoActive} />
        </Pressable>
      </View>
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
  buttons: {
    height: 50,
    position: 'absolute',
    flexDirection: 'row',
    bottom: 30,
  },
  searchButtonLeft: {
    backgroundColor: "#D9D9D9", 
    height: 40, 
    width: 40, 
    borderRadius: 20,
    left: 70,
  },
  searchButtonMiddle: {
    backgroundColor: "#D9D9D9", 
    height: 40, 
    width: 40, 
    borderRadius: 20,
    left: 130,
  },
  searchButtonRight: {
    backgroundColor: "#D9D9D9", 
    height: 40, 
    width: 40, 
    borderRadius: 20,
    left: 200,
  },
  iconsNoActive: {
    color: 'black',
    textAlign: 'center',
    top: 6,
  },
  input: {
    backgroundColor: "#D9D9D9",
    width: 300,
    height: 30,
  },
  shadowBox: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7
  },
  inputView: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 25,
  },
  buttonPWForget: {
    marginTop: 55,
    height: 35,
    width: 180,
    backgroundColor: "#D9D9D9",
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  textPWForget: {
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
  },
});