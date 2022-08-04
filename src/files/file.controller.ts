import { Controller, Get, HttpException, HttpStatus, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileService } from "./file.service";
import { Request } from 'express';
import { FileInterceptor } from "@nestjs/platform-express";
import { RequestHeader } from "src/common/request-header.decorator";
import { HeaderDTO } from "src/common/header.dto";
import { ConfigService } from "@nestjs/config";


@Controller('files')
export class FileController{
    constructor(private readonly fileService:FileService,private readonly config: ConfigService){}

    @Post('*')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile( @Req() req : Request , @RequestHeader(HeaderDTO) headerDto : HeaderDTO){
        if(!(this.config.get('VALID_FILE_TYPES')as string[]).includes(headerDto.contenttype) )
            throw new HttpException('Forbidden file type',HttpStatus.FORBIDDEN);
            
        const fileNameParts = req.params[0].split('.');
        if(!(this.config.get('VALID_FILE_EXTENSIONS')as string[]).includes(fileNameParts[fileNameParts.length-1]) )
            throw new HttpException('Forbidden EXTENSION',HttpStatus.FORBIDDEN);

        if( Number(this.config.get('MAX_SIZE')) < Number(headerDto.contentlength)  )
            throw new HttpException('Max file size exceeded',HttpStatus.FORBIDDEN);

        return this.fileService.uploadFileStream(req,req.params[0]);
    }

    @Get()
    checkHealth(){
        return this.fileService.checkHealth();
    }
}


