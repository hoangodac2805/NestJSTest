import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity('refresh_tokens')
export class RefreshToken {
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(()=>User, user => user.refreshTokens)
    user:User;

    @Column({type:'varchar',length:255})
    token: string;

    @Column({type:"datetime"})
    expiresAt: Date;

    @Column({ default: false })
    revoked: boolean;

    @CreateDateColumn()
    createdAt: Date;
  
    
}
