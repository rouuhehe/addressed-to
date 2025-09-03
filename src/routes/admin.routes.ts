import "reflect-metadata";
import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Body,
  UseBefore,
  Param,
  UnauthorizedError,
} from "routing-controllers";
import {
  database,
  insertAdmin,
  deleteAdmin,
  getAllLetters,
  deleteLetter,
} from "../config/database";
import { register, login } from "../services/authService";
import { AuthMiddleware } from "../config/authMiddleware";

@Controller("/admin")
export class AdminController {
  @Post("/register")
  async registerAdmin(@Body() body: { email: string; password: string }) {
    const admin = await register(body.email, body.password);
    return { msg: "Admin was created successfully" };
  }

  @Post("/login")
  async loginAdmin(@Body() body: { email: string; password: string }) {
    const token = await login(body.email, body.password);
    if (!token) throw new UnauthorizedError("Invalid credentials");
    return { token };
  }

  @Get("/posts/info")
  @UseBefore(AuthMiddleware)
  async getAllPosts() {
    try {
      const posts = getAllLetters.all();
      return posts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return { msg: "Error fetching posts" };
    }
  }

  @Get("/posts/:id/info")
  @UseBefore(AuthMiddleware)
  async getPost(@Param("id") id: number) {
    try {
      const stmt = database.prepare("SELECT * FROM letter WHERE id = ?");
      const post = stmt.get(id);
      if (!post) return { msg: "Letter not found" };
      return post;
    } catch (error) {
      console.error("Error fetching post:", error);
      return { msg: "Error fetching post" };
    }
  }

  @Put("/post/:id/visibility")
  @UseBefore(AuthMiddleware)
  async changeVisibility(
    @Param("id") id: number,
    @Body() body: { hidden: boolean }
  ) {
    try {
      const stmt = database.prepare("SELECT * FROM letter WHERE id = ?");
      const post = stmt.get(id);
      if (!post) return { msg: "Letter not found" };

      const updateStmt = database.prepare(
        "UPDATE letter SET hidden = ? WHERE id = ?"
      );
      updateStmt.run(body.hidden ? 1 : 0, id);

      const updatedPost = stmt.get(id);
      return { msg: "Visibility updated successfully", post: updatedPost };
    } catch (error) {
      console.error("Error updating visibility:", error);
      return { msg: "Error updating visibility" };
    }
  }

  @Delete("/posts/:id/delete")
  @UseBefore(AuthMiddleware)
  async deletePost(@Param("id") id: number) {
    try {
      const stmt = database.prepare("SELECT * FROM letter WHERE id = ?");
      const letter = stmt.get(id);
      if (!letter) return { msg: "Letter not found" };

      deleteLetter.run(id);
      return { msg: "Letter was deleted successfully" };
    } catch (error) {
      console.error("Error deleting letter:", error);
      return { msg: "Error deleting letter" };
    }
  }
}
