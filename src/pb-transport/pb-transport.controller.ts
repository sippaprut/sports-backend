import { PbTransportService } from './pb-transport.service';
import { Controller, Get, Param, Post, Body, Res, HttpStatus, Request } from '@nestjs/common';
import { PublicTransportDto } from 'models/pb-transport.dto';

@Controller('pb-transport')
export class PbTransportController {
    constructor(private pbService: PbTransportService) {}

    @Get()
    find(@Request() req, @Res() res) {
        res.send(req.query);
    }

    @Get(':id/')
    findOne(@Param('id') id) {
        return `This action returns a #${id} page pb`;
    }

    @Post()
    create(@Body() data: PublicTransportDto, @Res() res ) {
        res.status(HttpStatus.CREATED).send(data);
    }
}
