import { Expose } from "class-transformer";
import { IsDefined, IsString } from "class-validator";

export class HeaderDTO {
    @IsString()
    @IsDefined()
    @Expose({ name: 'content-type' })        // required as headers are case insensitive
    contenttype : string;

    @IsString()
    @IsDefined()
    @Expose({ name: 'content-length' })
    contentlength : string;
}
