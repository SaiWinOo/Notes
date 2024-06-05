import React, { useContext, useEffect } from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NoteHomeScreen from "../screens/note/NoteHomeScreen";
import NoteFormScreen from "../screens/note/NoteFormScreen";
import { AppContext } from "../provider/AppProvider";


const Stack = createNativeStackNavigator();

const NoteStack = ({ }) => {



  return (
    <Stack.Navigator

      screenOptions={{
        headerShown: false,

      }}>
      <Stack.Screen
        options={{
          headerTitle: '',
        }}
        name='NoteHomeScreen' component={NoteHomeScreen} />

      <Stack.Screen options={{
        // headerTitle: '',
      }} name='NoteFormScreen'
        component={NoteFormScreen} />


    </Stack.Navigator>
  )
}

export default NoteStack;