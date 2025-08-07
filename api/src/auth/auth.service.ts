import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { Pool } from "pg";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  private pool: Pool;

  constructor(private readonly jwtService: JwtService) {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  async register(createUserDto: CreateUserDto) {
    const { email, password, username } = createUserDto;

    const userExists = await this.pool.query(
      'SELECT id FROM "User" WHERE email = $1 OR username = $2',
      [email, username]
    );

    if (userExists.rowCount > 0) {
      throw new BadRequestException(
        "Usuário com este e-mail ou nome de usuário já existe."
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await this.pool.query(
      'INSERT INTO "User" (email, password, username) VALUES ($1, $2, $3) RETURNING id',
      [email, hashedPassword, username]
    );

    return {
      id: result.rows[0].id,
      message: "Usuário registrado com sucesso!",
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const userResult = await this.pool.query(
      'SELECT id, password, username FROM "User" WHERE email = $1',
      [email]
    );

    if (userResult.rowCount === 0) {
      throw new UnauthorizedException("E-mail ou senha inválidos.");
    }

    const user = userResult.rows[0];

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException("E-mail ou senha inválidos.");
    }

    const payload = { id: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload);

    return {
      message: "Login realizado com sucesso!",
      access_token: accessToken,
    };
  }
}
