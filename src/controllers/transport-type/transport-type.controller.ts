import { Controller, Get, Request, Res, Post, Body, HttpStatus } from '@nestjs/common';
import { TransportTypeCreateDto } from '../../dtos/src/transport-type-dto/transport-type-dto';
import { TransportTypeService } from '../../src/transport-type.service';

@Controller('transport-type')
export class TransportTypeController {
    constructor(private readonly trasportService: TransportTypeService){}

    @Get()
    find(@Request() req, @Res() res) {
    }

    @Get(':id/')
    findById(@Request() req, @Res() res) {
    }

    @Post()
    create(@Body() data: TransportTypeCreateDto, @Res() res){
        this.trasportService.create(data).then((res) => {

        });
        res.status(HttpStatus.CREATED).send(data);
    }
}
