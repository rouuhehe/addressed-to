import "reflect-metadata";
// import { DataSource } from "typeorm"
// import { Admin } from "../models/admin.entity"
// import { Letter } from "../models/letter.entity"

// Temporarily commenting out TypeORM due to native module issues
// export const DataBaseSource = new DataSource({
//   type: "sqlite",
//   database: "db.sqlite",
//   synchronize: true,
//   logging: true,
//   entities: [Admin, Letter],
//   migrations: [],
//   subscribers: []
// })

// Using Node.js built-in SQLite instead
const { DatabaseSync } = require("node:sqlite");
const database = new DatabaseSync("db.sqlite");

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
  "INSERT INTO letter (content, addressedTo, hidden) VALUES (?, ?, ?)" // content, addressedTo, hidden
);

const getAllLetters = database.prepare(
  "SELECT * FROM letter" // email, password, role
);

const getAllLettersAddressedTo = database.prepare(
  "SELECT * FROM letter WHERE addressedTo = ? AND hidden = 0;" // addressedTo
);

const deleteLetter = database.prepare(
  "DELETE FROM letter WHERE id  = ?" // id
);

const insertAdmin = database.prepare(
  "INSERT INTO admin (email, password) VALUES (?, ?)" // email, password
);

const deleteAdmin = database.prepare(
  "DELETE FROM admin WHERE email = ?" // email
);

export {
  database,
  insertLetter,
  getAllLetters,
  getAllLettersAddressedTo,
  deleteLetter,
  insertAdmin,
  deleteAdmin,
};
