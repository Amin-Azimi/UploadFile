import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3 } from "aws-sdk";
import CreatedFileDto from "./created.file.dto";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService{
    constructor(private readonly configService:ConfigService){}

    async uploadFile(data:Buffer, fileName:string) : Promise<CreatedFileDto>{
        const s3 = new S3();
        const uploadedFile = await s3.upload({
            Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
            Body: data,
            Key: uuidv4+"-"+fileName
        }).promise();
        return {
            key :uploadedFile.Key,
            fileUrl : uploadedFile.Location};
    }
}