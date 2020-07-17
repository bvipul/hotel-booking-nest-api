import { Moment } from 'moment';
import { Hotel } from '../hotels/hotel.entity';
import { IsNotEmpty, IsInt, Min, Max, IsIn } from 'class-validator';

export class RoomDTO {
    id: number;

    @IsNotEmpty({
        message: "Name must be present and not empty"
    })
    name: string;

    @IsNotEmpty({
        message: "Max guests must be present and not empty"
    })
    @IsInt({
        message: "Max guest must only be a number"
    })
    max_guests: number;

    @IsNotEmpty({
        message: "Hotel must be present and not empty"
    })
    hotel: Hotel;

    created_at: Moment;
    updated_at: Moment;
}
