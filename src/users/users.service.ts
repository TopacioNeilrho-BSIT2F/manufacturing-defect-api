import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      10,
    );

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(user);

    const { password, ...safeUser } = savedUser;
    return safeUser;
  }

  findAll() {
    return this.usersRepository.find({
      select: {
        user_id: true,
        full_name: true,
        email: true,
        role: true,
      },
    });
  }

  findOne(id: number) {
    return this.usersRepository.findOne({
      where: { user_id: id },
      select: {
        user_id: true,
        full_name: true,
        email: true,
        role: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const data = { ...updateUserDto };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.usersRepository.update(id, data);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}