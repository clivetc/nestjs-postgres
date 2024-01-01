import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signIn')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ data: { accessToken: string; user: User } }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
