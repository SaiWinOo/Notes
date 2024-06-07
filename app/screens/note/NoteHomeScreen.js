import React, { useCallback, useContext, useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Alert, Animated } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import colors from "../../config/colors";
import AntDesign from '@expo/vector-icons/AntDesign';
import useDB from "../../../db/useDB";
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import constants from 'expo-constants';
import NoteCard from "../../components/NoteCard";
import { plusButtonStyle } from "../../styles/styles";


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
    if (isSelectedAll) {
      setSelectedNotes([]);
      setIsSelecting(true);
      setIsSelectedAll(false);
    } else {
      let noteIds = [];
      notes.forEach(note => {
        noteIds.push(note.id);
      });
      setSelectedNotes(noteIds);
      setIsSelecting(true);
    }
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
      <TouchableOpacity onPress={() => navigation.navigate('NoteFormScreen')} style={plusButtonStyle}>
        <AntDesign name="plus" size={28} color="white" />
      </TouchableOpacity>
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
      <ScreenWrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            isSelecting ?
              <Text style={{ fontSize: 20, color: colors.white, padding: 10, fontWeight: '600', opacity: isSelecting ? 1 : 0 }}>{selectedNotes.length} item selected.</Text>
              :
              <Text style={styles.title}>Note</Text>
          }

          {
            notes.length == 0 ?
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: colors.gray, marginTop: 100, fontSize: 20 }}>No notes</Text>
              </View> :
              <>
                {
                  notes.map((item) => (
                    <NoteCard key={item.id} selectedNotes={selectedNotes} handleLongPress={handleLongPress}
                      handlePress={handlePress} isSelecting={isSelecting} item={item} />
                  ))
                }
              </>
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
});

export default NoteHomeScreen;