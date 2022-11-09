import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

import Accueil from './screens/Accueil';
import Connexion from './screens/Connexion';
import Inscription from './screens/Inscription';
import Recherche from './screens/Recherche';
import Recettes from './screens/Recettes';
import Decouverte from './screens/Decouverte';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Drawer.Navigator 
        initialRouteName='Recherche' 
        screenOptions={{
          // tabBarStyle: { display: 'none' },
          // headerShown: false
          swipeEdgeWidth: 300,
          drawerType: 'back',
          drawerPosition: 'right'
      }}>
        <Drawer.Screen name="Recherche" component={Recherche} />
        <Drawer.Screen name="Recettes" component={Recettes} />
        <Drawer.Screen name="Decouverte" component={Decouverte} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
