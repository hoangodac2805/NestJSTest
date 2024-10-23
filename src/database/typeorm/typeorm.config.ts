import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from './entities/User.entity';
import { join } from 'path';
import { Profile } from "./entities/Profile.entity";
import { RefreshToken } from "./entities/Refresh-token.entity";
import { Message } from "./entities/Message.entity";
import { ChatRoom } from "./entities/ChatRoom.entity";
import { Avatar } from "./entities/Avatar.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User,Avatar,Profile,RefreshToken,Message,ChatRoom],
    migrations: [join(__dirname, 'migrations/*.{ts,js}')],
    synchronize: true,
};
