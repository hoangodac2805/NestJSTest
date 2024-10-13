import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from './entities/User.entity';
import { join } from 'path';
import { Profile } from "./entities/Profile.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User,Profile],
    migrations: [join(__dirname, 'migrations/*.{ts,js}')],
    synchronize: true,
};
