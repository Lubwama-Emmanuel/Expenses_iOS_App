import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("expenses.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `
    CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        amount INTEGER NOT NULL,
        date TEXT NOT NULL
    )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject();
        }
      );
    });
  });

  return promise;
}
