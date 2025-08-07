// src/auth/auth.controller.ts
import { 
  Controller, 
  Post, 
  Body, 
  UsePipes, 
  ValidationPipe, 
  HttpCode, 
  HttpStatus, 
  Get, 
  UseGuards, 
  Request,
  BadRequestException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return this.authService.register(createUserDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Não foi possível registrar o usuário.');
    }
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Request() req) {

    return {
      message: 'Bem-vindo!',
      user: req.user,
    };
  }
}