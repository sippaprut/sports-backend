import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TransportTypeCreateDto } from '../dtos/src/transport-type-dto/transport-type-dto';

@Injectable()
export class TransportTypeService {
    constructor(@InjectModel('TransportType') private transportModel: Model<any>){}

    async create(data: TransportTypeCreateDto): Promise<any> {
        const created = new this.transportModel(data);
        return await created.save();
    }
}
