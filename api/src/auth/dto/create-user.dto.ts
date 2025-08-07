// src/auth/dto/create-user.dto.ts
import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'E-mail inválido.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  email: string;

  @IsString({ message: 'O nome de usuário deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome de usuário é obrigatório.' })
  username: string;

  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  password: string;
}