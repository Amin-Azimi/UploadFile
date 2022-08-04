import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "src/config/configuration";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";

@Module({
    imports:[ConfigModule.forRoot({
        load:[configuration]
    }),],
    providers : [FileService],
    controllers: [ FileController]
})

export class FileModule{}