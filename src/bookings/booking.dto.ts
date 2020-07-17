import { Moment } from 'moment';
import { IsNotEmpty, IsDate, IsDateString } from 'class-validator';
import { Hotel } from 'src/hotels/hotel.entity';
import { Room } from 'src/rooms/room.entity';
import { User } from 'src/users/user.entity';

export class BookingDTO {
    id: number;

    @IsNotEmpty({
        message: "Hotel must be present and not empty"
    })
    hotel: Hotel;

    @IsNotEmpty({
        message: "Room must be present and not empty"
    })
    room: Room;

    @IsNotEmpty({
        message: "Customer must be present and not empty"
    })
    customer: User;

    @IsNotEmpty({
        message: "Check In Date must be present and not empty"
    })
    @IsDateString({
        message: "Check In Date must be in format of YYYY-MM-DDTHH:mm:ss"
    })
    check_in_date: Moment;

    @IsNotEmpty({
        message: "Check Out Date must be present and not empty"
    })
    @IsDateString({
        message: "Check In Date must be in format of YYYY-MM-DDTHH:mm:ss"
    })
    check_out_date: Moment;

    @IsNotEmpty({
        message: "Total guests must be present and not empty"
    })
    guests: number;

    created_at: Moment;
    updated_at: Moment;
}