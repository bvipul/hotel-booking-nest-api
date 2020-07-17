import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hotels } from './data';
import { Hotel } from 'src/hotels/hotel.entity';

@Injectable()
export class HotelsSeederService {
    constructor(@InjectRepository(Hotel) private hotelsRepository: Repository<Hotel>) { }

    create(): Array<Promise<Hotel>> {
        return hotels.map(async (hotel: Hotel) => {
            return await this.hotelsRepository
                .findOne({ name: hotel.name })
                .then(async dbHotel => {
                    if (dbHotel) {
                        return Promise.resolve(null);
                    }

                    delete hotel.id;
                    delete hotel.created_at;
                    delete hotel.updated_at;

                    return Promise.resolve(
                        await this.hotelsRepository.save(hotel)
                    )
                })
                .catch(error => Promise.reject(error));
        })
    }

    async findById(id: any | undefined): Promise<Hotel> {
        return await this.hotelsRepository.findOne(id);
    }
}
