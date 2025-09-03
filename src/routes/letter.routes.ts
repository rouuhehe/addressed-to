import { Body, Controller, Get, Post, QueryParam } from "routing-controllers";
import {
  database,
  insertLetter,
  getAllLetters,
  getAllLettersAddressedTo,
} from "../config/database";

@Controller("/")
export class LetterController {
  @Post("/new")
  async postLetter(@Body() body: { addressedTo: string; content: string }) {
    try {
      insertLetter.run(body.content, body.addressedTo, 0); // content, addressedTo, hidden=0
      return { msg: "Letter created successfully" };
    } catch (error) {
      console.error("Error creating letter:", error);
      return { msg: "Error creating letter" };
    }
  }

  @Get("/")
  async getLetters(@QueryParam("name") name?: string) {
    try {
      let letters;

      if (name) {
        letters = getAllLettersAddressedTo.all(name);
      } else {
        letters = getAllLetters
          .all()
          .filter((letter: any) => letter.hidden === 0);
      }

      if (letters.length === 0) {
        return { msg: "No letters were found!" };
      }

      return letters;
    } catch (error) {
      console.error("Error fetching letters:", error);
      return { msg: "Error fetching letters" };
    }
  }
}
