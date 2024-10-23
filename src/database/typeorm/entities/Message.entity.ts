import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./Profile.entity";
import { ChatRoom } from "./ChatRoom.entity";

@Entity({ name: "messages" })
export class Message {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "text" })
    content: string

    @ManyToOne(() => Profile, (profile) => profile.messages)
    profile: Profile

    @ManyToOne(() => ChatRoom, (chatroom) => chatroom.messages)
    chatroom: ChatRoom

    @CreateDateColumn()
    createdAt: Date;
}