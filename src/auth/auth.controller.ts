
import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service.js';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(
    @Body() body: { email: string; password: string },
  ) {
    return this.authService.login(
      body.email,
      body.password,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: any) {
    return req.user;
  }
}
