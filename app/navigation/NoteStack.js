import React, { useEffect } from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NoteHomeScreen from "../screens/note/NoteHomeScreen";
import NoteFormScreen from "../screens/note/NoteFormScreen";


const Stack = createNativeStackNavigator();

const NoteStack = ({ }) => {

  return (
    <Stack.Navigator screenOptions={{
    }}>
      <Stack.Screen name='NoteHomeScreen' component={NoteHomeScreen} />
      <Stack.Screen options={{
        headerTitle: '',
      }} name='NoteFormScreen'
        component={NoteFormScreen} />
    </Stack.Navigator>
  )
}

export default NoteStack;