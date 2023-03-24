import 'react-native-gesture-handler';
import React from "react";
import WelcomeScreen from "./screens/welcomeScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ProfileScreen from "./screens/profile";
import ChatsScreen from "./screens/chats";
import ContactsScreen from "./screens/contacts";
import { AntDesign, Entypo } from '@expo/vector-icons';
import ChatScreen1 from './screens/chat'

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function ChatStack() {
  return(
    <Stack.Navigator 
      screenOptions={{
      headerShown: false }}>
      <Stack.Screen name="chats" component={ChatsScreen}/>
      <Stack.Screen name="chatScreen" component={ChatScreen1}/>
    </Stack.Navigator>
  )
}

function TabNavigator() {
  return(
    <Tab.Navigator>
      <Tab.Screen 
        name="contacts" 
        component={ContactsScreen}
        options={{
          tabBarIcon: () => {
            return <AntDesign name="contacts" size={28} color="green" />
          }
        }}
      />
      <Tab.Screen 
        name="chats" 
        component={ChatStack}
        options={{
          tabBarIcon: () => {
            return <Entypo name="chat" size={28} color="green" />
          }
        }}
      />
      <Tab.Screen 
        name="profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: () => {
            return <AntDesign name="profile" size={28} color="green" />
          }
        }}
      />
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

