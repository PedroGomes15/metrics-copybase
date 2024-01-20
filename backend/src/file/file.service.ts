// file.service.ts
import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';

export interface MonthlyMetrics {
  [year: number]: {
    [month: number]: {
      totalMRR: number;
      churnedMRR: number;
      netMRR: number;
    };
  };
}

export interface GlobalMetrics {
  totalMRR: number;
  churnedMRR: number;
  netMRR: number;
  churnRate: number;
}

@Injectable()
export class FileService {
  async processFile(
    fileBuffer: Buffer,
  ): Promise<{ monthlyMetrics: MonthlyMetrics; globalMetrics: GlobalMetrics }> {
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Extrair os dados da planilha
    const data: any[][] = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    // Encontrar os índices das colunas relevantes
    const header: string[] = data[0];
    const valueColumnIndex: number = header.indexOf('valor');
    const statusColumnIndex: number = header.indexOf('status');

    if (valueColumnIndex === -1 || statusColumnIndex === -1) {
      throw new Error(
        'As colunas "valor" e "status" são necessárias no arquivo.',
      );
    }

    // Inicializar um objeto para armazenar métricas globais por mês
    const monthlyMetrics: MonthlyMetrics = {};

    // Iterar sobre as linhas da tabela
    for (let i = 1; i < data.length; i++) {
      const status: string = data[i][statusColumnIndex];
      const value: number = parseFloat(
        data[i][valueColumnIndex].replace(',', '.'),
      ); // Converter o valor para número
      const date: Date = new Date(data[i][2]);
      const month: number = date.getMonth() + 1; // Meses começam do zero, adicionamos 1
      const year: number = date.getFullYear();

      // Inicializar métricas mensais se não existirem
      if (!monthlyMetrics[year]) {
        monthlyMetrics[year] = {};
      }

      if (!monthlyMetrics[year][month]) {
        monthlyMetrics[year][month] = {
          totalMRR: 0,
          churnedMRR: 0,
          netMRR: 0,
        };
      }

      // Atualizar métricas mensais com base no status da assinatura
      if (status === 'Ativa') {
        monthlyMetrics[year][month].totalMRR += value;
      } else if (status === 'Cancelada') {
        monthlyMetrics[year][month].churnedMRR += value;
      }
    }

    // Calcular métricas globais
    const globalMetrics: GlobalMetrics = {
      totalMRR: 0,
      churnedMRR: 0,
      netMRR: 0,
      churnRate: 0,
    };

    Object.keys(monthlyMetrics).forEach((year) => {
      Object.keys(monthlyMetrics[year]).forEach((month) => {
        globalMetrics.totalMRR += monthlyMetrics[year][month].totalMRR;
        globalMetrics.churnedMRR += monthlyMetrics[year][month].churnedMRR;
      });
    });

    globalMetrics.netMRR = globalMetrics.totalMRR - globalMetrics.churnedMRR;
    globalMetrics.churnRate =
      globalMetrics.totalMRR !== 0
        ? globalMetrics.churnedMRR / globalMetrics.totalMRR
        : 0;

    return {
      monthlyMetrics,
      globalMetrics,
    };
  }
}
