import { Injectable, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) { }

	async validateUser(username: string, password: string): Promise<any> {
		const user = await this.usersService.findOne(username);

		if (
			user &&
			(await this.usersService.compareHash(password, user.password))
		) {
			const { password, ...result } = user;
			return result;
		}

		return null;
	}

	async login(user: any, res: any) {
		const payload = { username: user.name, sub: user.id };

		res.json({
			statusCode: HttpStatus.OK,
			accessToken: this.jwtService.sign(payload),
			user,
		});
	}
}
