import React, { useCallback, useContext, useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Alert } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import colors from "../../config/colors";
import AntDesign from '@expo/vector-icons/AntDesign';
import LottieView from 'lottie-react-native';
import useDB from "../../../db/useDB";
import dayjs from "dayjs";
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import constants from 'expo-constants';


const NoteHomeScreen = ({ navigation }) => {

  const { fetchNotes, deleteByIds } = useDB();
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);


  const getAllNotes = async () => {
    try {
      let res = await fetchNotes();
      setNotes(res);
    } catch (error) {
      console.log('error', error);
      alert(error);
    }
  }

  useEffect(() => {
    if (notes.length && notes.length === selectedNotes.length) {
      setIsSelectedAll(true);
    }
  }, [selectedNotes]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchData = async () => {
        if (isActive) {
          await getAllNotes();
        }
      }
      fetchData();
      return () => {
        isActive = false;
      }
    }, [])
  );


  const handleLongPress = (note) => {
    if (isSelecting) return;
    setIsSelecting(true);
    setSelectedNotes(pre => [...pre, note.id]);
  }

  const handlePress = (note) => {
    if (!isSelecting) {
      navigation.navigate('NoteFormScreen', { ...note, content: note.content?.startsWith('"') ? JSON.parse(note.content) : note.content });
      return;
    };
    if (selectedNotes.includes(note.id)) {
      setSelectedNotes(pre => {
        let selectedItems = pre.filter(item => item !== note.id);
        selectedItems.length === 0 && setIsSelecting(false);
        return selectedItems;
      });
      setIsSelectedAll(false);
    } else {
      setSelectedNotes(pre => [...pre, note.id]);
    }
  }


  const handleCancelSelect = () => {
    setIsSelecting(false);
    setSelectedNotes([]);
    setIsSelectedAll(false);
  }

  const handleSelectAll = () => {
    let noteIds = [];
    notes.forEach(note => {
      noteIds.push(note.id);
    });
    setSelectedNotes(noteIds);
    setIsSelecting(true);
  }


  const handleDelete = async () => {
    try {
      deleteByIds(selectedNotes);
      setIsSelecting(false);
      setSelectedNotes([]);
      getAllNotes();
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <>
        <View style={{ opacity: isSelecting ? 1 : 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, }}>
          <TouchableOpacity style={{ padding: 5 }} onPress={handleCancelSelect}>
            <Feather name="x" size={30} color={colors.white} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <TouchableOpacity style={{ padding: 5 }} onPress={handleDelete}>
              <Ionicons name="trash-outline" size={30} color={colors.danger} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 5 }} onPress={handleSelectAll}>
              {
                isSelectedAll ?
                  <AntDesign name="checksquare" size={30} color={colors.primary} />
                  :
                  <AntDesign name="checksquareo" size={30} color={colors.white} />

              }
            </TouchableOpacity>
          </View>
        </View>
      </>

      <TouchableOpacity onPress={() => navigation.navigate('NoteFormScreen')} style={styles.plusButton}>
        <AntDesign name="plus" size={28} color="white" />
      </TouchableOpacity>
      <ScreenWrapper>
        <ScrollView showsVerticalScrollIndicator={false}>

          {
            isSelecting ?
              <Text style={{ fontSize: 20, color: colors.white, padding: 10, fontWeight: '600', opacity: isSelecting ? 1 : 0 }}>{selectedNotes.length} item selected.</Text>
              :
              <Text style={styles.title}>Note</Text>
          }
          {
            notes.map((item) => (
              <TouchableWithoutFeedback
                onPress={() => handlePress(item)}
                key={item.id} onLongPress={() => handleLongPress(item)}
              >
                <View style={styles.noteContainer}>
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
                              source={require('../../../assets/lottie/right.json')}
                            /> : null
                        }
                      </> : null
                  }
                  <Text style={styles.noteTitle}>{item.title}</Text>
                  <Text style={styles.noteDescription}>
                    {item.content?.startsWith('"') ? JSON.parse(item.content) : item.content}
                  </Text>
                  <Text style={styles.noteDate}>{dayjs(item.modification_date).format('MMM DD')}</Text>
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
    backgroundColor: colors.black,
    paddingTop: constants.statusBarHeight,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 15,
    color: colors.white,
  },
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