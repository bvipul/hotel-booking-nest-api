import { Moment } from 'moment';

export class UserDTO {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	created_at: Moment;
	updated_at: Moment;
}
