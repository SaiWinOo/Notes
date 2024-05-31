import React, { useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import colors from "../../config/colors";
import AntDesign from '@expo/vector-icons/AntDesign';
import LottieView from 'lottie-react-native';


const NoteHomeScreen = ({ navigation }) => {

  const [selectedNotes, setSelectedNotes] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);


  const handleLongPress = (index) => {
    if (isSelecting) return;
    setIsSelecting(true);
    setSelectedNotes(pre => [...pre, index]);
  }

  const handlePress = (index) => {
    if (!isSelecting) return;
    if (selectedNotes.includes(index)) {
      setSelectedNotes(pre => {
        let selectedItems = pre.filter(item => item !== index);
        selectedItems.length === 0 && setIsSelecting(false);
        return selectedItems;
      });
    } else {
      setSelectedNotes(pre => [...pre, index]);
    }

  }



  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('NoteFormScreen')} style={styles.plusButton}>
        <AntDesign name="plus" size={28} color="white" />
      </TouchableOpacity>
      <ScreenWrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Note</Text>
          {
            [...new Array(10)].map((item, index) => (
              <TouchableWithoutFeedback
                onPress={() => handlePress(index)}
                key={index} onLongPress={() => handleLongPress(index)}
              >
                <View style={styles.noteContainer}>
                  {
                    !selectedNotes.includes(index) ?
                      <View style={styles.checked}></View> : null
                  }
                  {
                    selectedNotes.includes(index) ?
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
                        source={require('../../../assets/lottie/right.json')}
                      /> : null
                  }
                  <Text style={styles.noteTitle}>Relationship</Text>
                  <Text style={styles.noteDescription}>I miss you so much baby</Text>
                  <Text style={styles.noteDate}>May 19</Text>
                </View>
              </TouchableWithoutFeedback>
            ))
          }
        </ScrollView>
      </ScreenWrapper>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 15,
  },
  checked: {
    backgroundColor: '#00000020',
    borderRadius: 12,
    width: 24,
    height: 24,
    position: 'absolute',
    right: 20,
    top: 40,
  },
  noteContainer: {
    display: 'block',
    backgroundColor: '#00000020',
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
  },
  noteDescription: {
    fontSize: 15,
    fontWeight: '300',
    color: "#00000090"
  },
  noteDate: {
    fontSize: 13,
    fontWeight: '200',
  },
  plusButton: {
    position: 'absolute',
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    right: 50,
    backgroundColor: colors.primary,
    borderRadius: 25,
    height: 50,
    width: 50,
    zIndex: 1,
  }
});

export default NoteHomeScreen;