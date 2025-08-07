"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    jwtService;
    pool;
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.pool = new pg_1.Pool({
            connectionString: process.env.DATABASE_URL,
        });
    }
    async register(createUserDto) {
        const { email, password, username } = createUserDto;
        const userExists = await this.pool.query('SELECT id FROM "User" WHERE email = $1 OR username = $2', [email, username]);
        if (userExists.rowCount > 0) {
            throw new common_1.BadRequestException('Usuário com este e-mail ou nome de usuário já existe.');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await this.pool.query('INSERT INTO "User" (email, password, username) VALUES ($1, $2, $3) RETURNING id', [email, hashedPassword, username]);
        return { id: result.rows[0].id, message: 'Usuário registrado com sucesso!' };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const userResult = await this.pool.query('SELECT id, password, username FROM "User" WHERE email = $1', [email]);
        if (userResult.rowCount === 0) {
            throw new common_1.UnauthorizedException('E-mail ou senha inválidos.');
        }
        const user = userResult.rows[0];
        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) {
            throw new common_1.UnauthorizedException('E-mail ou senha inválidos.');
        }
        const payload = { id: user.id, username: user.username };
        const accessToken = this.jwtService.sign(payload);
        return {
            message: 'Login realizado com sucesso!',
            access_token: accessToken,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map