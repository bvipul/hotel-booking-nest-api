import { User } from "src/users/user.entity";
import moment = require('moment');

export const users: User[] = [
    {
        id: 1,
        username: 'bvipul',
        firstName: 'Vipul',
        lastName: 'Basapati',
        email: 'vipul.basapati@contentcreation.com.my',
        password: 'root',
        created_at: moment(),
        updated_at: moment()
    }
];