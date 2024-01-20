import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService, GlobalMetrics, MonthlyMetrics } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file,
  ): Promise<{ monthlyMetrics: MonthlyMetrics; globalMetrics: GlobalMetrics }> {
    const { monthlyMetrics, globalMetrics } =
      await this.fileService.processFile(file.buffer);
    return { monthlyMetrics, globalMetrics };
  }
}
