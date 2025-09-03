import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { database, insertAdmin } from "../config/database";

const JWT_SECRET = process.env.JWT_SECRET;

export async function register(email: string, password: string) {
  try {
    const hashedPasswd = await bcrypt.hash(password, 10);
    insertAdmin.run(email, hashedPasswd);
    return { email, id: database.prepare("SELECT last_insert_rowid()").get() };
  } catch (error) {
    throw new Error("Failed to register admin");
  }
}

export async function login(email: string, password: string) {
  try {
    const stmt = database.prepare("SELECT * FROM admin WHERE email = ?");
    const admin = stmt.get(email);

    if (!admin) throw Error("Email is not registered!");

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) throw Error("Passwords don't match!");

    const token = jwt.sign({ sub: admin.id }, JWT_SECRET || "", {
      expiresIn: "2h",
    });
    return token;
  } catch (error) {
    throw error;
  }
}
