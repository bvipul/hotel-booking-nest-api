import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomsSeederService } from "./rooms.service";
import { Room } from "src/rooms/room.entity";
import { HotelsSeederModule } from "../hotels/hotels.module";

@Module({
    imports: [TypeOrmModule.forFeature([Room]), HotelsSeederModule],
    providers: [RoomsSeederService],
    exports: [RoomsSeederService]
})

export class RoomsSeederModule { }