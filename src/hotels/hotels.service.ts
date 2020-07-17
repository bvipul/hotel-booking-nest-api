import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './hotel.entity';

@Injectable()
export class HotelsService {
    constructor(
        @InjectRepository(Hotel) private hotelsRepository: Repository<Hotel>
    ) { }

    getAll(): Promise<Hotel[]> {
        return this.hotelsRepository.find();
    }

    async getCount(): Promise<any> {
        return this.hotelsRepository.count();
    }

    async findById(id: any | undefined): Promise<Hotel> {
        return await this.hotelsRepository.findOne(id);
    }

    async findOne(name: string): Promise<Hotel> {
        return await this.hotelsRepository.findOne({ name: name });
    }

    async createHotel(hotel: Hotel): Promise<Hotel> {
        return this.hotelsRepository.save(hotel);
    }

    async updateHotel(id: number, user: Hotel): Promise<any> {
        const hotelFromDB = await this.hotelsRepository.findOne(id);

        this.hotelsRepository.merge(hotelFromDB, user);

        return await this.hotelsRepository.save(hotelFromDB);
    }

    async remove(id: string): Promise<void> {
        await this.hotelsRepository.delete(id);
    }
}
