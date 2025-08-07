import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private readonly jwtService;
    private pool;
    constructor(jwtService: JwtService);
    register(createUserDto: CreateUserDto): Promise<{
        id: any;
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        access_token: string;
    }>;
}
