import { Injectable } from '@nestjs/common';
import { Subscription } from '../file/file.service';
import { convertAndFillMissingMonths } from '../file/formatData.utils';

@Injectable()
export class MonthlyCancellation {
  /**
   * Extrai os meses de cancelamento do array fornecido de assinaturas.
   *
   * @param data - Um array de objetos Subscription.
   * @returns Um objeto aninhado representando os meses de cancelamento, onde a chave externa é o ano e a chave interna é o mês, com o valor correspondente sendo o número de cancelamentos naquele mês.
   */

  extractCancelledMonths(
    data: Subscription[],
  ): Record<string, Record<string, number>> {
    const cancelledMonths: Record<string, Record<string, number>> = {};

    data.forEach((subscription) => {
      const { cancellationDate } = subscription;

      if (cancellationDate) {
        const yearKey = cancellationDate.getFullYear().toString();
        const monthKey = (cancellationDate.getMonth() + 1).toString();

        cancelledMonths[yearKey] ??= {};
        cancelledMonths[yearKey][monthKey] ??= 0;
        cancelledMonths[yearKey][monthKey] += 1;
      }
    });

    return convertAndFillMissingMonths(cancelledMonths);
  }
}
