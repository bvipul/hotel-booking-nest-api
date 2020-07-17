import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Moment } from 'moment';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		unique: true,
	})
	username: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column({
		unique: true,
	})
	email: string;

	@Exclude()
	@Column()
	password: string;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Moment;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Moment;

	constructor(partial: Partial<User>) {
		Object.assign(this, partial);
	}
}
