import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MemberCreateDto } from 'dtos/member-dto/member-dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel('Member') private readonly memberSchema: Model<any>
  ) {}

  async create(data: MemberCreateDto): Promise<any> {
    const created = new this.memberSchema(data);
    return await created.save();
  }
}
