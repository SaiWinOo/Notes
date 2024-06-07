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

  const deleteNotesByIds = (ids) => {
    ids.forEach(id => {
      db.execSync(`DELETE FROM notes WHERE id = ${id}`)
    });
  }

  const createTodoTable = () => {
    return db.execAsync(
      `CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        todo TEXT NOT NULL,
        is_done BOOLEAN NOT NULL DEFAULT 0,
        modification_date TEXT NOT NULL
      );`
    );
  }

  const fetchTodos = () => {
    return db.getAllAsync('select * from todos');
  }

  const storeTodo = (data) => {
    return db.execAsync(
      `INSERT INTO todos (todo, is_done,modification_date) VALUES ('${data.todo}',${data.is_done},'${data.modification_date}')
      `
    );
  }

  const updateDoneStatus = (isDone, id) => {
    return db.execAsync(
      `UPDATE todos SET is_done = ${isDone} where id = ${id}`
    )
  }

  const deleteTodoByIds = (ids) => {
    ids.forEach(id => {
      db.execSync(`DELETE FROM todos WHERE id = ${id}`)
    });
  };




  return {
    createNoteTable,
    db,
    storeNote,
    fetchNotes,
    updateNote,
    deleteNotesByIds,

    createTodoTable,
    fetchTodos,
    storeTodo,
    updateDoneStatus,
    deleteTodoByIds,
  }
}

export default useDB;
