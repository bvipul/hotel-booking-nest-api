import { Moment } from 'moment';
import { IsNotEmpty } from 'class-validator';

export class HotelDTO {
    id: number;

    @IsNotEmpty({
        message: "Name must be present and not empty"
    })
    name: string;

    @IsNotEmpty({
        message: "Address must be present and not empty"
    })
    address: string;

    @IsNotEmpty({
        message: "Pincode must be present and not empty"
    })
    pincode: string;

    @IsNotEmpty({
        message: "Phone must be present and not empty"
    })
    phone: string;

    created_at: Moment;
    updated_at: Moment;
}