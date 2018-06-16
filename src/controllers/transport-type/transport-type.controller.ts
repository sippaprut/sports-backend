import {
  Controller,
  Get,
  Request,
  Res,
  Post,
  Body,
  HttpStatus
} from '@nestjs/common';
import { TransportTypeCreateDto } from '../../dtos/transport-type-dto/transport-type-dto';
import { TransportTypeService } from './../../services/transport-type.service';

@Controller('transport-type')
export class TransportTypeController {
  constructor(private readonly trasportService: TransportTypeService) {}

  @Get()
  find(@Request() req, @Res() res) {}

  @Get(':id/')
  findById(@Request() req, @Res() res) {}

  @Post()
  create(@Body() data: TransportTypeCreateDto, @Res() res) {
    this.trasportService.create(data).then(
      _id => {
        res.status(HttpStatus.CREATED).send(_id);
      },
      ({ message }) => {
        res.status(HttpStatus.BAD_REQUEST).send({
          status: false,
          message
        });
      }
    );
  }
}
