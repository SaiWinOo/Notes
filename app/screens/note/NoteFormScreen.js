import React from 'react'
import { SafeAreaView, View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Button } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import colors from "../../config/colors";
import Editor from "../../components/Editor";
import dayjs from "dayjs";

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
          <TextInput style={{
            fontSize: 24,
            marginVertical: 15,
          }} placeholder="Title" />
          <Text style={{ color: colors.black, marginBottom: 10 }}>{dayjs().format('L LT')}</Text>
          <Editor />
        </ScreenWrapper>
      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
  )
}

export default NoteFormScreen;