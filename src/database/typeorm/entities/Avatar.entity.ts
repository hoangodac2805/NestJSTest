import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./Profile.entity";

@Entity({ name: "avatars" })
export class Avatar {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @ManyToOne(()=>Profile,profile=>profile.usedAvatars)
    profile:Profile

    @CreateDateColumn()
    createdAt: Date;
}