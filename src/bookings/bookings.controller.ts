import {
    Controller,
    Get,
    Body,
    Post,
    UseGuards,
    Param,
    UseInterceptors,
    ClassSerializerInterceptor,
    Delete,
    UnprocessableEntityException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BookingsService } from './bookings.service';
import { BookingDTO } from './booking.dto';
import { Booking } from './booking.entity';
import { HotelsService } from 'src/hotels/hotels.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { UsersService } from 'src/users/users.service';
import moment = require('moment');


@Controller('bookings')
export class BookingsController {
    constructor(private bookingsService: BookingsService, private hotelsService: HotelsService, private roomsService: RoomsService, private usersService: UsersService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(): Promise<Booking[]> {
        return this.bookingsService.getAll();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() bookingDto: BookingDTO): Promise<Booking | Error> {
        const hotel = await this.hotelsService.findById(bookingDto.hotel);
        const room = await this.roomsService.findById(bookingDto.room);
        const customer = await this.usersService.findById(bookingDto.customer);

        console.log({
            hotel
        })
        if (!hotel) {
            throw new UnprocessableEntityException(`Hotel with id : ${bookingDto.hotel} is not present`);
        }

        if (!room) {
            throw new UnprocessableEntityException(`Room with id : ${bookingDto.room} is not present`);
        }

        if (!customer) {
            throw new UnprocessableEntityException(`Customer with id : ${bookingDto.customer} is not present`);
        }

        if (bookingDto.guests > room.max_guests) {
            throw new UnprocessableEntityException(`Room does not allow more than ${room.max_guests} guest(s)`);
        }

        const checkInDate = moment(bookingDto.check_in_date);
        const checkOutDate = moment(bookingDto.check_out_date);
        const currentDateTime = moment();

        if (!checkInDate.isSameOrAfter(currentDateTime)) {
            throw new UnprocessableEntityException(`Check In Date cannot be a previous date or time`);
        }

        if (!checkOutDate.isSameOrAfter(currentDateTime)) {
            throw new UnprocessableEntityException(`Check Out Date cannot be a previous date or time`);
        }

        if (checkInDate.isSameOrAfter(checkOutDate)) {
            throw new UnprocessableEntityException(`Check Out Date cannot be before Check In Date`);
        }

        const bookingsForRoom = await this.bookingsService.findByRoom(room);

        for (const booking of bookingsForRoom) {
            const bookingCheckInDate = moment(booking.check_in_date);
            const bookingCheckOutDate = moment(booking.check_out_date);

            console.log({
                checkInDate,
                checkOutDate,
                bookingCheckInDate,
                bookingCheckOutDate
            })

            if (checkInDate.isSameOrAfter(bookingCheckInDate) && checkOutDate.isSameOrBefore(bookingCheckOutDate)) {
                throw new UnprocessableEntityException(`Room is already booked for this time`);
            }

            if (bookingCheckOutDate.isBetween(checkInDate, checkOutDate)) {
                throw new UnprocessableEntityException(`Room is already booked for this time`);
            }
        }

        return this.bookingsService.createBooking(bookingDto);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findById(@Param() params): Promise<Booking> {
        return this.bookingsService.findById(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param() params): Promise<any> {
        return this.bookingsService.remove(params.id);
    }
}
