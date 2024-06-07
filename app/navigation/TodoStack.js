import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import { View, Text } from "react-native";
import TodoFormModal from "../screens/todo/TodoFormModal";
import TodoScreen from "../screens/todo/TodoScreen";

const Stack = createNativeStackNavigator();



const TodoStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
      }}
    >
      <Stack.Screen name="TodoScreen"
        component={TodoScreen} />
      <Stack.Screen name="TodoFormModal" component={TodoFormModal} />
    </Stack.Navigator>
  )
}

export default TodoStack;