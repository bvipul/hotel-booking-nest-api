import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { HotelsModule } from 'src/hotels/hotels.module';
import { RoomsModule } from 'src/rooms/rooms.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), HotelsModule, RoomsModule, UsersModule],
  providers: [BookingsService],
  controllers: [BookingsController]
})
export class BookingsModule { }
