import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);

    try {
      // save the new user in the db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      delete user.hash;

      // return the saved user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // unique constraint failed
          throw new ForbiddenException('Credentials taken');
        }
      }
    }
  }

  async signin(dto: AuthDto) {
    try {
      console.log({ dto });
      // find the user by email
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      // if not exists, throw exception
      if (!user) throw new ForbiddenException('Email does not exist');

      // else, compare password
      const pwMatches = await argon.verify(user.hash, dto.password);
      // if not match, throw exception
      if (!pwMatches) throw new ForbiddenException('Incorrect password');

      delete user.hash;
      // else, return user
      return user;
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }
}
