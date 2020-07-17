import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { rooms } from './data';
import { Room } from 'src/rooms/room.entity';
import { HotelsSeederService } from '../hotels/hotels.service';

@Injectable()
export class RoomsSeederService {
    constructor(@InjectRepository(Room) private roomsRepository: Repository<Room>, private hotelsService: HotelsSeederService) { }

    create(): Array<Promise<Room>> {
        return rooms.map(async (room: Room) => {
            return await this.roomsRepository
                .findOne({ name: room.name })
                .then(async dbRoom => {
                    if (dbRoom) {
                        return Promise.resolve(null);
                    }

                    delete room.id;
                    delete room.created_at;
                    delete room.updated_at;

                    room.hotel = await this.hotelsService.findById(1);

                    return Promise.resolve(
                        await this.roomsRepository.save(room)
                    )
                })
                .catch(error => Promise.reject(error));
        })
    }
}
