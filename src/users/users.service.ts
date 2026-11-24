
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
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

  private handleDatabaseError(error: unknown): never {
    if (error instanceof QueryFailedError) {
      const driverError = error.driverError as {
        code?: string;
      };

      if (driverError.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      }
    }

    throw error;
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      10,
    );

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    try {
      const savedUser = await this.usersRepository.save(user);

      const { password, ...safeUser } = savedUser;
      return safeUser;
    } catch (error) {
      this.handleDatabaseError(error);
    }
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

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { user_id: id },
      select: {
        user_id: true,
        full_name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    const data = { ...updateUserDto };

    if (data.email) {
      const existingUser = await this.usersRepository.findOneBy({
        email: data.email,
      });

      if (existingUser && existingUser.user_id !== id) {
        throw new ConflictException('Email already exists');
      }
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    try {
      return await this.usersRepository.update(id, data);
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.usersRepository.delete(id);
  }
}
