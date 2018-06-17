import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { TransportTypeController } from './controllers/transport-type/transport-type.controller';
import { TransportTypeSchema } from './models/transportType.schema';
import { TransportTypeService } from './services/transport-type.service';
import { MemberController } from './controllers/member/member.controller';
import { MemberService } from './services/member.service';
import { memberSchema } from 'models/member.schema';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/sport-dev'),
    MongooseModule.forFeature([
      {
        name: 'TransportType',
        schema: TransportTypeSchema
      },
      {
        name: 'Member',
        schema: memberSchema
      }
    ])
  ],
  controllers: [AppController, TransportTypeController, MemberController],
  providers: [
    AppService,
    TransportTypeService,
    MemberService,
    AuthService,
    JwtStrategy
  ]
})
export class AppModule {}
