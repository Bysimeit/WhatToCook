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
import Ionicons from 'react-native-vector-icons/Ionicons';

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

          let styles = {
            color: focused ? '#FFFFFF' : 'black', 
            backgroundColor: focused ? "#3F3838" : "#D9D9D9", 
            height: 40, 
            width: 40, 
            borderRadius: 20, 
            textAlign: 'center', 
            textAlignVertical: 'center'
          };

          return <Ionicons name={iconName} size={25} style={styles} />
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevations: 0,
          backgroundColor: 'transparent'
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
