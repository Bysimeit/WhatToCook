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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator screenOptions={({route}) => ({ tabBarIcon: ({focused, color, size}) => { 
          let iconName; 
          if (route.name == 'Recherche') {
            iconName = 'search-outline';
          } else if (route.name == 'Recettes') {
            iconName = 'stats-chart-outline';
          } else {
            iconName = 'compass-outline';
          }

          return <Ionicons name={iconName} size={25} />
        } 
        })}>
        <Tab.Screen name="Recherche" component={Recherche} />
        <Tab.Screen name="Recettes" component={Recettes} />
        <Tab.Screen name="Découverte" component={Decouverte} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
