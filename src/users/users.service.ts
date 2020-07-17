import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
	private SALT_ROUNDS = 10;

	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>
	) { }

	getAll(
		page: number | undefined,
		pageLimit: number | undefined,
	): Promise<User[]> {
		if (!page) {
			return this.usersRepository.find();
		}
		return this.usersRepository.find({
			skip: (page - 1) * pageLimit,
			take: pageLimit,
		});
	}

	async getCount(): Promise<any> {
		return this.usersRepository.count();
	}

	async findById(id: any | undefined): Promise<User> {
		return await this.usersRepository.findOne(id);
	}

	async findOne(username: string): Promise<User> {
		return await this.usersRepository.findOne({ username: username });
	}

	async createUser(user: User): Promise<User> {
		user.password = await this.getHash(user.password);

		// user.password = undefined;
		return this.usersRepository.save(user);
	}

	async updateUser(id: number, user: User): Promise<any> {
		const userFromDB = await this.usersRepository.findOne(id);

		this.usersRepository.merge(userFromDB, user);

		return await this.usersRepository.save(userFromDB);
	}

	async getHash(password: string | undefined): Promise<any> {
		return bcrypt.hash(password, this.SALT_ROUNDS);
	}

	async compareHash(
		password: string | undefined,
		hash: string | undefined,
	): Promise<any> {
		return bcrypt.compare(password, hash);
	}

	async remove(id: string): Promise<void> {
		await this.usersRepository.delete(id);
	}
}
