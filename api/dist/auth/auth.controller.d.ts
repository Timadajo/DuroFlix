import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        id: any;
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        access_token: string;
    }>;
    getProfile(req: any): {
        message: string;
        user: any;
    };
}
