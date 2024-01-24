// file.module.ts

import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { ConvertHeaderUtils } from './convertHeader.utils';
import { MetricsService } from '../metrics/metrics.service';

@Module({
  controllers: [FileController],
  providers: [FileService, ConvertHeaderUtils, MetricsService],
})
export class FileModule {}
