import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { LogbookModule } from './logbook/logbook.module';

@Module({
  imports: [BlogModule, LogbookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
