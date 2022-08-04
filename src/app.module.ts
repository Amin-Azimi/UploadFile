import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './files/file.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
