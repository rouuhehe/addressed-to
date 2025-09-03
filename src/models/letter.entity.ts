import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("letter")
export class Letter {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ type: "text" })
  content: string = "";

  @Column({ type: "text" })
  addressedTo: string = "";

  @Column({ type: "boolean", default: false })
  hidden!: boolean;
}