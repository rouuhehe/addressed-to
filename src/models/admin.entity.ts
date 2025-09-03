import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("admin")
export class Admin {
  @PrimaryGeneratedColumn({ type: "integer"})
  id: number = 1;

  @Column({ type: "text", unique: true })
  email: string = "";

  @Column({ type: "text" })
  password: string = "";
}