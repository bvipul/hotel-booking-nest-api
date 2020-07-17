import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HotelsSeederService } from "./hotels.service";
import { Hotel } from "src/hotels/hotel.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Hotel])],
    providers: [HotelsSeederService],
    exports: [HotelsSeederService]
})

export class HotelsSeederModule { }