import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { MemberService } from '../../services/member.service';
import { MemberCreateDto } from '../../dtos/member-dto/member-dto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  create(@Body() data: MemberCreateDto, @Res() res) {
    this.memberService.create(data).then(
      _id => {
        res.status(HttpStatus.CREATED).send({
          _id
        });
      },
      ({ message }) => {
        res.status(HttpStatus.BAD_REQUEST).send({
          message
        });
      }
    );
  }
}
