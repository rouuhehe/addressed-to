import { useExpressServer } from "routing-controllers";
import { AuthMiddleware } from "./config/authMiddleware";
import { LetterController } from "./routes/letter.routes";
import { AdminController } from "./routes/admin.routes";
import express from "express";

async function main() {
  const PORT = process.env.PORT || 3000;

  try {
    console.log("Database connected!"); 

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
