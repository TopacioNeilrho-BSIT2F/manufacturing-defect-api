import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../users/entities/user.entity.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isBcryptHash = /^\$2[aby]\$\d{2}\$/.test(user.password);

    let passwordMatch = false;

    if (isBcryptHash) {
      passwordMatch = await bcrypt.compare(password, user.password);
    } else {
      passwordMatch = password === user.password;
    }

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Automatically hash an old plain-text password
    if (!isBcryptHash) {
      user.password = await bcrypt.hash(password, 10);
      await this.usersRepository.save(user);
    }

    const payload = {
      sub: user.user_id,
      email: user.email,
      role: user.role,
    };

    return {
      message: 'Login successful',
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}