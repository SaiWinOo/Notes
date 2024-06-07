import React, { useRef, useState } from 'react'
import { View, Text, Animated, TouchableWithoutFeedback, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import constants from 'expo-constants';
import ScreenWrapper from "../../components/ScreenWrapper";
import colors from "../../config/colors";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { plusButtonStyle } from "../../styles/styles";
import AntDesign from '@expo/vector-icons/AntDesign';


const TodoScreen = ({ navigation }) => {



  return (
    <SafeAreaView style={{ paddingTop: constants.statusBarHeight, flex: 1, backgroundColor: colors.black }}>
      <TouchableOpacity onPress={() => navigation.navigate('TodoFormModal')} style={plusButtonStyle}>
        <AntDesign name="plus" size={28} color="white" />
      </TouchableOpacity>
      <ScreenWrapper>
        <TouchableWithoutFeedback >
          <Animated.View style={styles.todo}>
            <BouncyCheckbox style={{ width: 40 }} onPress={(isChecked) => { }} />
            <Text style={{ color: colors.white }}>Animate me</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </ScreenWrapper>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  todo: {
    backgroundColor: '#ffffff30',
    padding: 20,
    borderRadius: 10,
    margin: 10,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default TodoScreen;