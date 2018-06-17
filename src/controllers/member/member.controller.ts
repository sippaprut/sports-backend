import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  UseGuards
} from '@nestjs/common';
import { MemberService } from '../../services/member.service';
import { MemberCreateDto } from '../../dtos/member-dto/member-dto';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('member')
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly authService: AuthService
  ) {}

  @Post()
  create(@Body() data: MemberCreateDto, @Res() res) {
    this.memberService
      .create(data)
      .then(result => {
        result.token = this.authService
          .generateToken({
            email: result.email,
            _id: result._id,
            type: result.type
          })
          .then(token => {
            res.status(HttpStatus.CREATED).send({ token });
          });
      })
      .catch(err => {
        res.status(HttpStatus.BAD_REQUEST).send({
          err
        });
      });
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Res() res) {
    res.status(HttpStatus.ACCEPTED).send({ message: 'Login success' });
  }

  //  @UseGuards(AuthGuard('jwt'))
}
