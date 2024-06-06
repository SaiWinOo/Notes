import { useSQLiteContext } from "expo-sqlite";
import React from 'react';




const useDB = () => {

  const db = useSQLiteContext();
  const createNoteTable = () => {
    return db.execAsync(
      `CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        modification_date TEXT NOT NULL
      );`
    );
  }

  const fetchNotes = () => {
    return db.getAllAsync('select * from notes');
  }

  const storeNote = (title, content, modification_date) => {
    return db.execAsync(
      `INSERT INTO notes (title, content,modification_date) VALUES ('${title}','${JSON.stringify(content)}', '${modification_date}');
`
    );
  }

  const updateNote = (data) => {
    return db.execAsync(
      `UPDATE notes SET title = '${data.title}', content = '${JSON.stringify(data.content)}', modification_date = '${new Date().toISOString()}' where id =  ${data.id}`
    )
  }

  const deleteByIds = (ids) => {
    ids.forEach(id => {
      db.execSync(`DELETE FROM notes WHERE id = ${id}`)
    });
  }

  return {
    createNoteTable,
    db,
    storeNote,
    fetchNotes,
    updateNote,
    deleteByIds,
  }
}

export default useDB;