import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

import React, { useContext, useEffect, useRef } from 'react'
import NoteStack from "./NoteStack";
import TodoStack from "./TodoStack";
import colors from "../config/colors";
import TodoScreen from "../screens/todo/TodoScreen";

const hideBottomTabScreens = ['NoteFormScreen'];

const AppNavigator = ({ routeName }) => {

  const hide = hideBottomTabScreens.includes(routeName);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveBackgroundColor: colors.black,
        tabBarActiveBackgroundColor: colors.black,
        tabBarHideOnKeyboard: true,
      }}

    >

      <Tab.Screen name='Todo' component={TodoStack} />

      <Tab.Screen name="Notes"
        options={{
          tabBarStyle: {
            display: hide ? 'none' : 'flex'
          },
          tabBarIcon: ({ focused, color, size }) => <MaterialIcons name="sticky-note-2" size={size} color={color} />
        }} component={NoteStack} />

    </Tab.Navigator>
  )
}



export default AppNavigator;