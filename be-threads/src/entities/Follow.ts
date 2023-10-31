import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity({ name: "follows" })
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.followers, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  followers: User;
  
  @ManyToOne(() => User, (user) => user.following, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  following: User;
}