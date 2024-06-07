import React, { useState } from 'react'
import { TouchableWithoutFeedback, StyleSheet, View, Text, Animated } from "react-native";
import LottieView from 'lottie-react-native';
import colors from "../config/colors";
import dayjs from "dayjs";


const NoteCard = ({ item, isSelecting, handleLongPress, selectedNotes, handlePress }) => {
  const [scaleValue] = useState(new Animated.Value(1));

  const onPress = (item) => {
    animateButton();
    handlePress(item);
  }

  const onLongPress = (item) => {
    animateButton();
    handleLongPress(item);
  }

  const animateButton = () => {
    Animated.timing(scaleValue, {
      toValue: 0.9,
      duration: 50,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }).start()
    })
  }


  return (
    <TouchableWithoutFeedback
      onPress={() => onPress(item)}
      onLongPress={() => onLongPress(item)}
    >
      <Animated.View style={[styles.noteContainer, { transform: [{ scale: scaleValue }] }]}>
        {/* <View > */}
        {
          isSelecting ?
            <>
              {
                !selectedNotes.includes(item.id) ?
                  <View style={styles.checked}></View> : null
              }
              {
                selectedNotes.includes(item.id) ?
                  <LottieView
                    autoPlay
                    loop={false}
                    style={{
                      width: 31,
                      height: 31,
                      position: 'absolute',
                      right: 20,
                      top: 38,
                    }}
                    source={require('../../assets/lottie/right.json')}
                  /> : null
              }
            </> : null
        }
        <Text style={styles.noteTitle}>{item.title}</Text>
        <Text style={styles.noteDescription}>
          {item.content?.startsWith('"') ? JSON.parse(item.content) : item.content}
        </Text>
        <Text style={styles.noteDate}>{dayjs(item.modification_date).format('MMM DD')}</Text>
        {/* </View> */}
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}


const styles = StyleSheet.create({
  checked: {
    backgroundColor: '#ffffff50',
    borderRadius: 12,
    width: 23,
    height: 23,
    position: 'absolute',
    right: 24,
    top: 42,
  },
  noteContainer: {
    display: 'block',
    backgroundColor: '#ffffff30',
    width: '100%',
    height: 100,
    borderRadius: 10,
    padding: 16,
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white
  },
  noteDescription: {
    fontSize: 15,
    fontWeight: '400',
    color: '#ffffff99'
  },
  noteDate: {
    fontSize: 13,
    fontWeight: '200',
    color: '#ffffff99'
  },
})

export default NoteCard;