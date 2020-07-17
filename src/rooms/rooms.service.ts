import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(Room) private roomsRepository: Repository<Room>
    ) { }

    getAll(): Promise<Room[]> {
        return this.roomsRepository.find();
    }

    async getCount(): Promise<any> {
        return this.roomsRepository.count();
    }

    async findById(id: any | undefined): Promise<Room> {
        return await this.roomsRepository.findOne(id);
    }

    async findOne(name: string): Promise<Room> {
        return await this.roomsRepository.findOne({ name: name });
    }

    async createRoom(room: Room): Promise<Room> {
        return this.roomsRepository.save(room);
    }

    async updateRoom(id: number, room: Room): Promise<any> {
        const roomFromDB = await this.roomsRepository.findOne(id);

        this.roomsRepository.merge(roomFromDB, room);

        return await this.roomsRepository.save(roomFromDB);
    }

    async remove(id: string): Promise<void> {
        await this.roomsRepository.delete(id);
    }
}
