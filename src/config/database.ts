import "reflect-metadata";
import Database from "better-sqlite3";

const database = new Database("db.sqlite");

database.exec(`
    CREATE TABLE IF NOT EXISTS admin(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    ) STRICT;

    CREATE TABLE IF NOT EXISTS letter(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      addressedTo TEXT NOT NULL,
      hidden INTEGER DEFAULT 0
    ) STRICT;
    
    CREATE INDEX IF NOT EXISTS idx_letter_addressedTo ON letter(addressedTo);
`);

const insertLetter = database.prepare(
  "INSERT INTO letter (content, addressedTo, hidden) VALUES (?, ?, ?)"
);

const getAllLetters = database.prepare("SELECT * FROM letter");

const getAllLettersAddressedTo = database.prepare(
  "SELECT * FROM letter WHERE addressedTo = ? AND hidden = 0;"
);

const deleteLetter = database.prepare("DELETE FROM letter WHERE id  = ?");

const insertAdmin = database.prepare(
  "INSERT INTO admin (email, password) VALUES (?, ?)"
);

const deleteAdmin = database.prepare("DELETE FROM admin WHERE email = ?");

export {
  database,
  insertLetter,
  getAllLetters,
  getAllLettersAddressedTo,
  deleteLetter,
  insertAdmin,
  deleteAdmin,
};
