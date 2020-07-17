import { Room } from "src/rooms/room.entity";
import moment = require('moment');
import { Hotel } from "src/hotels/hotel.entity";

export const rooms: Room[] = [
    {
        id: 1,
        name: 'Test Hotel',
        hotel: new Hotel(),
        max_guests: 5,
        created_at: moment(),
        updated_at: moment()
    }
];