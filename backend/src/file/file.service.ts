// file.service.ts
import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { ConvertHeaderUtils } from './convertHeader.utils';
import { Metrics, MetricsService } from '../metrics/metrics.service';

export interface Subscription {
  charges: number;
  billedEveryXDays: number;
  startDate: Date;
  status: string;
  statusDate: Date;
  cancellationDate: Date;
  amount: number;
  nextCycle: string;
  subscriberId: string;
}

@Injectable()
export class FileService {
  constructor(
    private readonly convertHeaderUtils: ConvertHeaderUtils,
    private readonly metricsService: MetricsService,
  ) {}

  /**
   * Processa a planilha fornecida e retorna um array de dados limpos.
   *
   * @param sheet - A planilha a ser processada.
   * @returns Um array de dados limpos.
   */
  private processSheet(sheet: xlsx.WorkSheet): any[] {
    const range = xlsx.utils.decode_range(sheet['!ref']);
    const cleanData: any[] = [];

    for (let row = range.s.r + 1; row <= range.e.r; row++) {
      const cleanRow: any = {};

      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = { r: row, c: col };
        const cell: xlsx.CellObject =
          sheet[xlsx.utils.encode_cell(cellAddress)];

        if (cell) {
          const header = this.convertHeaderUtils.convertHeader(col);

          if (cell.t === 'n') {
            if (cell.w && cell.w.includes(',')) {
              // Se o valor contém uma vírgula, remover a pontuação e converter para número
              const numericValue = parseFloat(cell.w.replace(',', '.'));
              cleanRow[header] = numericValue;
            } else {
              cleanRow[header] = cell.v;
            }
          } else if (cell.t === 'd') {
            cleanRow[header] =
              typeof cell.v === 'string' ? new Date(cell.v) : cell.v;
          } else {
            cleanRow[header] =
              typeof cell.v === 'string' && !isNaN(new Date(cell.v).getTime())
                ? new Date(cell.v)
                : cell.v;
          }
        }
      }

      cleanData.push(cleanRow);
    }

    return cleanData;
  }

  /**
   * Processa o buffer do arquivo fornecido e retorna as métricas processadas.
   *
   * @param fileBuffer - O buffer do arquivo a ser processado.
   * @returns Uma promise que resolve para um objeto contendo as métricas processadas.
   */
  async processFile(fileBuffer: Buffer): Promise<{ metrics: Metrics }> {
    const workbook = xlsx.read(fileBuffer, { type: 'buffer', cellDates: true });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const data = this.processSheet(sheet);
    const processedMetrics = this.metricsService.processAllMetrics(data);
    return processedMetrics;
  }
}
