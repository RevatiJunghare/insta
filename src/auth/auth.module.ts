import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthEntity } from "src/auth/auth.entity";
import { JwtAuthGuard } from "./auth.guard";

@Module({
    imports:[TypeOrmModule.forFeature([AuthEntity])],
    controllers:[AuthController],
    providers:[AuthService
        // ,JwtAuthGuard
    ]
})
export class AuthModule{}