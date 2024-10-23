import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./Message.entity";

@Entity({ name: "chatrooms" })
export class ChatRoom {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "text" })
    name: string

    @OneToMany(() => Message, (message) => message.chatroom)
    messages: Message[]

    @CreateDateColumn()
    createdAt: Date;
}