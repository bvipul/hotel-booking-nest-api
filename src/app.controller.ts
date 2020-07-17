import { Controller, Get, Post, Request, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
	constructor(private readonly authService: AuthService) { }

	@UseGuards(LocalAuthGuard)
	@Post('auth/login')
	async login(@Res() res, @Request() req) {
		return this.authService.login(req.user, res);
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		return req.user;
	}
}
