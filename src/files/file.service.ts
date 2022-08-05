import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3 } from "aws-sdk";
import CreatedFileDto from "./created.file.dto";
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import { Stream } from "stream";
import * as fs from 'fs';
import * as sharp from "sharp";

@Injectable()
export class FileService{
    private  resizedImageWidth = 300;

    constructor(private readonly configService:ConfigService){}
    checkHealth(){

        return 'Ok';
    }
    //uploading file to S3 by stream
    async uploadFileStream(req : Request,fileName:string) : Promise<CreatedFileDto>{

        const fileNameParts = fileName.split('.');
        const fileNameExtenstion = fileNameParts[fileNameParts.length-1];
        const { writeStream, promise } = await  this.uploadStream(fileName);
        //if the input file is an image it will resized.
        if((this.configService.get('VALID_FILE_EXTENSIONS')as string[]).includes(fileNameExtenstion)){        

            const transform = sharp().resize({ width: this.resizedImageWidth, height: this.resizedImageWidth })

            req.pipe(transform).pipe(writeStream);
        }
        else
            req.pipe(writeStream);
        try {
            const uploadedFile = await promise.promise();
            console.log('upload completed successfully',uploadedFile);
            return {
                key :uploadedFile.Key,
                fileUrl : uploadedFile.Location};
            } 
            catch (error) {
            console.log('upload failed.', error.message);
        }
    }

   //Uploading  stream to S3 
    private async  uploadStream(fileName:string) {
        const s3 = new S3();
        const pass = new Stream.PassThrough();
        return {
            writeStream: pass,
            promise : await s3.upload({
                    Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
                    Body : pass,
                    Key: uuidv4()+"-"+fileName
                })
        }        
    }


}