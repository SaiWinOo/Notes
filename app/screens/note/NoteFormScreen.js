import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Button, SafeAreaView, TouchableOpacity } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import colors from "../../config/colors";
import Editor from "../../components/Editor";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import useDB from "../../../db/useDB";
import { useSQLiteContext } from "expo-sqlite";
import constants from 'expo-constants';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';


const NoteFormScreen = ({ navigation, route }) => {

  const { createNoteTable, storeNote, db } = useDB();
  const { setValue, handleSubmit, control } = useForm({});

  useEffect(() => {
    const migrate = async () => {
      try {
        let res = await createNoteTable();
        // console.log('Response', res);
      } catch (e) {
        // console.log(e);
      }
    }
    migrate();
  }, []);

  useEffect(() => {
    if (route.params?.id) {
      console.log('36', route?.params);
      setValue('title', route.params?.title);
      setValue('content', route.params?.content);
    }
  }, [route.params])

  const onSubmit = () => {
    // console.log('data');
  }


  const save = async (data) => {
    try {
      let res = await storeNote(data.title, data.content, new Date().toISOString());
      console.log(res);
      navigation.goBack();
    } catch (error) {
      alert(error);
    }
  }


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, backgroundColor: colors.black, }}
      keyboardVerticalOffset={80}
    >
      <SafeAreaView style={{ flex: 1, paddingTop: constants.statusBarHeight }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons style={{
              width: 35, height: 35
            }} name="keyboard-backspace" size={30} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={{
            width: 35, height: 35
          }} onPress={handleSubmit(save)}>
            <Ionicons name="checkmark-sharp" size={30} color={colors.white} />
          </TouchableOpacity>
        </View>
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
          <ScreenWrapper style={{ flexDirection: 'column', justifyContent: 'space-evenly', padding: 5, backgroundColor: colors.black }}>
            <View style={{ padding: 5, }}>
              <Controller
                control={control}
                name="title"
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    onChangeText={onChange}
                    value={value}
                    style={{ fontSize: 24, marginVertical: 15, color: colors.white, fontWeight: '700', }}
                    placeholder="Title"
                    placeholderTextColor={'#ffffff50'}
                  />
                )}
              />

              <Text style={{ color: '#ffffff90', marginBottom: 10 }}>{dayjs().format('L LT')}</Text>
            </View>
            <Controller
              control={control}
              name="content"
              render={({ field: { value, onChange } }) => (
                <Editor
                  placeholder={'I am having a great day today'}
                  onChange={onChange}
                  value={value}
                />
              )}
            />


          </ScreenWrapper>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default NoteFormScreen;