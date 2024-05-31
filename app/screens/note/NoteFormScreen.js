import React from 'react'
import { SafeAreaView, View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Button } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import colors from "../../config/colors";

const NoteFormScreen = () => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScreenWrapper style={{
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }} >
        </ScreenWrapper>
      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
  )
}

export default NoteFormScreen;