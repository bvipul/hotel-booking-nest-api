import { User } from "src/users/user.entity";
import moment = require('moment');

export const users: User[] = [
    {
        id: 1,
        username: 'bvipul',
        firstName: 'Vipul',
        lastName: 'Basapati',
        email: 'customer@gmail.com',
        password: 'root',
        created_at: moment(),
        updated_at: moment()
    }
];