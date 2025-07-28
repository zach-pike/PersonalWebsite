import { Module } from '@nestjs/common';
import { LogbookController } from './logbook.controller';
import { LogbookService } from './logbook.service';

@Module({
  controllers: [LogbookController],
  providers: [LogbookService]
})
export class LogbookModule {}
