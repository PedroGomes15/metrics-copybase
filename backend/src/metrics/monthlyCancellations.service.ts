import { Injectable } from '@nestjs/common';
import { Subscription } from '../file/file.service';
import { convertAndFillMissingMonths } from '../file/formatData.utils';

@Injectable()
export class MonthlyCancellation {
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
