import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { users } from './data';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersSeederService {
    private SALT_ROUNDS = 10;
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    create(): Array<Promise<User>> {
        return users.map(async (user: User) => {
            return await this.usersRepository
                .findOne({ email: user.email })
                .then(async dbUser => {
                    if (dbUser) {
                        return Promise.resolve(null);
                    }
                    user.password = await this.getHash(user.password);

                    delete user.id;
                    delete user.created_at;
                    delete user.updated_at;

                    return Promise.resolve(
                        await this.usersRepository.save(user)
                    )
                })
                .catch(error => Promise.reject(error));
        })
    }

    async getHash(password: string | undefined): Promise<any> {
        return bcrypt.hash(password, this.SALT_ROUNDS);
    }
}
