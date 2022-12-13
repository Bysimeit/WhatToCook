import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import NetInfo from '@react-native-community/netinfo';

import Home from './screens/Home';
import Research from './screens/navigation/Research';
import Receipts from './screens/navigation/Receipts';
import Discovery from './screens/navigation/Discovery';
import Login from './screens/account/Login';
import Registration from './screens/account/Registration';
import Profile from './screens/account/Profile';
import ChangePassword from './screens/account/ChangePassword';
import PasswordForget from './screens/account/PasswordForget';
import Allergies from './screens/account/Allergies';
import Fridge from './screens/account/Fridge';
import RecipeDetail from './screens/navigation/RecipeDetail';
import ResultResearch from './screens/navigation/ResultResearch';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from "react-redux";
import { store } from "./redux/store";


const Tab = createBottomTabNavigator();

export default function App() {
  const netInfo = NetInfo.useNetInfo();

  if (netInfo.isConnected === null) {
    console.log("Démarrage");
  } else {
    if (!netInfo.isConnected) {
      Alert.alert("Attention !", "Vous n'êtes pas connecté à internet !\nVérifier votre connexion.");
    }
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Tab.Navigator 
          initialRouteName='Receipts'
          screenOptions={{
            tabBarStyle: { display: 'none' },
            headerShown: false
        }}>
          <Tab.Screen name="Receipts" component={ Receipts } />
          <Tab.Screen name="Research" component={ Research } />
          <Tab.Screen name="Discovery" component={ Discovery } />
          <Tab.Screen name="Login" component={ Login } />
          <Tab.Screen name="PasswordForget" component={ PasswordForget } />
          <Tab.Screen name="Registration" component={ Registration } />
          <Tab.Screen name="Profile" component={ Profile } />
          <Tab.Screen name="ChangePassword" component={ ChangePassword } />
          <Tab.Screen name="Fridge" component={ Fridge } />
          <Tab.Screen name="Allergies" component={ Allergies } />
          <Tab.Screen name="RecipeDetail" component={ RecipeDetail } />
          <Tab.Screen name="ResultResearch" component={ ResultResearch } />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
