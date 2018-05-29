import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { TransportTypeController } from './controllers/transport-type/transport-type.controller';
import { TransportTypeSchema } from './models/transportType.schema';
import { TransportTypeService } from './services/transport-type.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/sport-dev'),
    MongooseModule.forFeature([{
      name: 'TransportType',
      schema: TransportTypeSchema,
    }]),
  ],
  controllers: [AppController, TransportTypeController],
  providers: [AppService, TransportTypeService],
})
export class AppModule {}
