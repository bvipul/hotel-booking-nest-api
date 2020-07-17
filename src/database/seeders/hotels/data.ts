import { Hotel } from "src/hotels/hotel.entity";
import moment = require('moment');

export const hotels: Hotel[] = [
    {
        id: 1,
        name: 'Test Hotel',
        address: 'Test Address',
        pincode: '63000',
        phone: '+601131202632',
        created_at: moment(),
        updated_at: moment()
    }
];