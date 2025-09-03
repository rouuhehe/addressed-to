import { useExpressServer } from "routing-controllers";
// import { DataBaseSource } from "./config/database";
import { database } from "./config/database"; // Import the native SQLite database
import { AuthMiddleware } from "./config/authMiddleware";
import { LetterController } from "./routes/letter.routes";
import { AdminController } from "./routes/admin.routes";
import express from "express";

async function main() {
  const PORT = process.env.PORT || 3000;

  try {
    // DataBaseSource.initialize(); // Commented out TypeORM initialization
    console.log("Database connected!"); // Native SQLite is already initialized

    const app = express();
    app.use(express.json());

    useExpressServer(app, {
      controllers: [LetterController, AdminController],
      middlewares: [AuthMiddleware],
    });

    app.listen(PORT, () => {
      console.log("Server's running!");
    });
  } catch (err) {
    console.log("Error during data initialization!");
  }
}

main();
