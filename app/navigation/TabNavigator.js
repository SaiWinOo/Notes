import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();


import React from 'react'
import NoteNavigator from "./NoteNavigator";
import TodoNavigator from "./TodoNavigator";

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Note" component={NoteNavigator} />
      <Tab.Screen name='Todo' component={TodoNavigator} />
    </Tab.Navigator>
  )
}

export default TabNavigator;