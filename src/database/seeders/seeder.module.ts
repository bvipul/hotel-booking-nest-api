import { Module, Logger } from "@nestjs/common";
import { UsersSeederModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Seeder } from "./seeder";
import { User } from "src/users/user.entity";
import * as ormConfig from "../../../ormconfig.json";
import { Hotel } from "src/hotels/hotel.entity";
import { Room } from "src/rooms/room.entity";
import { HotelsSeederModule } from "./hotels/hotels.module";
import { RoomsSeederModule } from "./rooms/rooms.module";

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: ormConfig.host,
        port: ormConfig.port,
        username: ormConfig.username,
        password: ormConfig.password,
        database: ormConfig.database,
        entities: [
            User,
            Hotel,
            Room
        ],
        synchronize: ormConfig.synchronize
    }), UsersSeederModule, HotelsSeederModule, RoomsSeederModule],
    providers: [Seeder, Logger],
    exports: [Seeder]
})

export class SeederModule { }