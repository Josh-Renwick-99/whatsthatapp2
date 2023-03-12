import 'react-native-gesture-handler';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ProfileScreen from "./mainScreens/profile";
import ChatsScreen from "./mainScreens/chats";
import ContactsScreen from "./mainScreens/contacts";

const Tab = createMaterialBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="contacts" component={ContactsScreen}/>
      <Tab.Screen name="chats" component={ChatsScreen} />
      <Tab.Screen name="profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
export default TabNavigator
