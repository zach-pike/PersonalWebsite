import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { LogbookModule } from './logbook/logbook.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [BlogModule, LogbookModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
