import React, { useRef, useState } from 'react'
import { View, Text, Animated, TouchableWithoutFeedback, StyleSheet } from "react-native";
import constants from 'expo-constants';

const TodoScreen = () => {

  const [scaleValue] = useState(new Animated.Value(1));

  const animateButton = () => {
    Animated.timing(scaleValue, {
      toValue: 0.8,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    })
  }


  return (
    <View style={{ paddingTop: constants.statusBarHeight }}>
      <Text>hello world</Text>
      <TouchableWithoutFeedback onPress={animateButton}>
        <Animated.View style={[styles.button, { transform: [{ scale: scaleValue }] }]}>
          <Text>Animate me </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fefefe',
    padding: 20,
    borderRadius: 5,
    margin: 10,
    elevation: 5,
  }
});

export default TodoScreen;