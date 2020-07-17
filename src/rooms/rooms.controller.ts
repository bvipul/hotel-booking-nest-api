import {
    Controller,
    Get,
    Body,
    Post,
    Patch,
    UseGuards,
    Param,
    UseInterceptors,
    ClassSerializerInterceptor,
    Delete,
    UnprocessableEntityException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoomsService } from './rooms.service';
import { RoomDTO } from './room.dto';
import { Room } from './room.entity';
import { HotelsService } from 'src/hotels/hotels.service';

@Controller('rooms')
export class RoomsController {
    constructor(private roomsService: RoomsService, private hotelsService: HotelsService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(): Promise<Room[]> {
        return this.roomsService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() roomDto: RoomDTO): Promise<Room> {
        const hotel = await this.hotelsService.findById(roomDto.hotel);

        if (!hotel) {
            throw new UnprocessableEntityException(`Hotel with id : ${roomDto.hotel} is not present`);
        }

        return this.roomsService.createRoom(roomDto);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findById(@Param() params): Promise<Room> {
        return this.roomsService.findById(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param() params, @Body() roomDto: RoomDTO): Promise<Room> {
        return this.roomsService.updateRoom(params.id, roomDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param() params): Promise<any> {
        return this.roomsService.remove(params.id);
    }
}
