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
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HotelsService } from './hotels.service';
import { HotelDTO } from './hotel.dto';
import { Hotel } from './hotel.entity';

@Controller('hotels')
export class HotelsController {
    constructor(private hotelsService: HotelsService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(): Promise<Hotel[]> {
        return this.hotelsService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() hotelDto: HotelDTO): Promise<Hotel> {
        return this.hotelsService.createHotel(hotelDto);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findById(@Param() params): Promise<Hotel> {
        return this.hotelsService.findById(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param() params, @Body() hotelDto: HotelDTO): Promise<Hotel> {
        return this.hotelsService.updateHotel(params.id, hotelDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param() params): Promise<any> {
        return this.hotelsService.remove(params.id);
    }
}
