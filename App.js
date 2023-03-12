import 'react-native-gesture-handler';
import React from "react";
import WelcomeScreen from "./screens/welcomeScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ProfileScreen from "./screens/mainScreens/profile";
import ChatsScreen from "./screens/mainScreens/chats";
import ContactsScreen from "./screens/mainScreens/contacts";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function TabNavigator() {
  return(
    <Tab.Navigator>
      <Tab.Screen name="contacts" component={ContactsScreen}/>
      <Tab.Screen name="chats" component={ChatsScreen}/>
      <Tab.Screen name="profile" component={ProfileScreen}/>
    </Tab.Navigator>
  )
}

function StackNavigator(){
  return(
    <Stack.Navigator 
      screenOptions={{
      headerShown: false }}>
      <Stack.Screen name="root" component={WelcomeScreen}/>
      <Stack.Screen name="tabs" component={TabNavigator}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
  );
}

