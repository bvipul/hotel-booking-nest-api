import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { Room } from 'src/rooms/room.entity';

@Injectable()
export class BookingsService {
    constructor(
        @InjectRepository(Booking) private bookingsRepository: Repository<Booking>
    ) { }

    getAll(): Promise<Booking[]> {
        return this.bookingsRepository.find();
    }

    async getCount(): Promise<any> {
        return this.bookingsRepository.count();
    }

    async findById(id: number | undefined): Promise<Booking> {
        return await this.bookingsRepository.findOne(id);
    }

    async findByRoom(room: Room | undefined): Promise<Booking[]> {
        return await this.bookingsRepository.find({ room: room });
    }

    async createBooking(booking: Booking): Promise<Booking> {
        return this.bookingsRepository.save(booking);
    }

    async remove(id: string): Promise<void> {
        await this.bookingsRepository.delete(id);
    }
}
