import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtPayload } from './../interfaces/jwt-payload.interface';
import { SECRET_TOKEN } from '../configs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Member') private readonly memberSchema: Model<any>
  ) {}

  async generateToken(payload: JwtPayload) {
    return jwt.sign(payload, SECRET_TOKEN, { expiresIn: 3600 });
  }

  async validateMember(payload: JwtPayload): Promise<any> {
    return await this.memberSchema.findOne(payload);
  }
}
