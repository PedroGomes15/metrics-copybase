// app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileService } from './file/file.service';
import { FileModule } from './file/file.module';
import { ConvertHeaderUtils } from './file/convertHeader.utils';
import { MetricsService } from './metrics/metrics.service';

@Module({
  imports: [FileModule],
  controllers: [AppController],
  providers: [AppService, FileService, ConvertHeaderUtils, MetricsService],
})
export class AppModule {}
