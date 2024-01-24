import { Injectable } from '@nestjs/common';

interface ConvertHeaderMap {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
}

@Injectable()
export class ConvertHeaderUtils {
  private readonly numberMap: ConvertHeaderMap = {
    0: 'charges',
    1: 'billedEveryXDays',
    2: 'startDate',
    3: 'status',
    4: 'statusDate',
    5: 'cancellationDate',
    6: 'amount',
    7: 'nextCycle',
    8: 'subscriberId',
  };

  convertHeader(number: number): string {
    return this.numberMap[number] || 'unknown';
  }
}
