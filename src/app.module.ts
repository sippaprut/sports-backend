import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PbTransportController } from './pb-transport/pb-transport.controller';
import { PbTransportService } from './pb-transport/pb-transport.service';

@Module({
  imports: [],
  controllers: [AppController, PbTransportController],
  providers: [ AppService, PbTransportService ]
})
export class AppModule {}
