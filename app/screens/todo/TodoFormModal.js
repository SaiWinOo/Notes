import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import { Controller, useForm } from "react-hook-form";
import useDB from "../../../db/useDB";

const TodoFormModal = () => {

  const { storeTodo } = useDB();
  const { control, handleSubmit } = useForm({});

  const onSave = async (data) => {
    data.modification_date = new Date().toISOString();
    data.is_done = false;
    try {
      let res = await storeTodo(data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <View style={{ backgroundColor: '#161B22', flex: 1, padding: 20 }}>
      <Controller
        name="todo"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextInput style={{
            fontSize: 20,
            color: colors.white,
          }}
            value={value}
            onChangeText={onChange}
            placeholder="buy milk"
            placeholderTextColor={colors.gray}
          />
        )}
      />

      <TouchableOpacity onPress={handleSubmit(onSave)} style={{ backgroundColor: colors.primary, padding: 8, width: 90, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginTop: 30, alignSelf: 'flex-end' }}>
        <Text style={{ color: colors.white, fontSize: 17 }}>Save</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TodoFormModal;