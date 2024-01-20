// app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileService } from './file/file.service';
import { FileModule } from './file/file.module'; // Importe o módulo FileModule aqui

@Module({
  imports: [FileModule], // Adicione o FileModule aqui
  controllers: [AppController],
  providers: [AppService, FileService],
})
export class AppModule {}
