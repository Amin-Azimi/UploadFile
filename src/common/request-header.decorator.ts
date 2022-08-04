
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import { plainToClass, plainToInstance } from 'class-transformer';
// import { ClassType } from 'class-transformer/ClassTransformer';
import { validateOrReject } from 'class-validator';
import { HeaderDTO } from './header.dto';

export const RequestHeader = createParamDecorator(
  async (value:  any, ctx: ExecutionContext) => {

    // extract headers
    const headers = ctx.switchToHttp().getRequest().headers;
    // Convert headers to DTO object
    const dto = plainToInstance(value, headers, { excludeExtraneousValues: true });
    // Validate 
    await validateOrReject(dto);
    // return header dto object 
    return dto;
  },
);
