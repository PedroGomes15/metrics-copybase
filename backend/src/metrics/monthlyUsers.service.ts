import { Injectable } from '@nestjs/common';
import { Subscription } from '../file/file.service';
import { convertAndFillMissingMonths } from '../file/formatData.utils';

@Injectable()
export class MonthlyActiveUsersService {
  /**
   * Calcula o número de usuários ativos com base nos dados de assinatura fornecidos.
   *
   * @param data - Um array de objetos Subscription que representa os dados de assinatura.
   * @returns Um objeto aninhado contendo o número de usuários ativos para cada ano e mês.
   */
  calculateActiveUsers(
    data: Subscription[],
  ): Record<string, Record<string, number>> {
    const activeUsers: Record<string, Record<string, number>> = {};

    data.forEach((subscription) => {
      const { startDate, statusDate, billedEveryXDays } = subscription;

      const endYear = statusDate.getFullYear().toString();

      const currentDate = new Date(startDate);

      while (
        currentDate.getFullYear().toString() <= endYear &&
        (currentDate.getFullYear().toString() !== endYear ||
          currentDate.getMonth() <= statusDate.getMonth())
      ) {
        const yearKey = currentDate.getFullYear().toString();
        const monthKey = (currentDate.getMonth() + 1).toString();

        activeUsers[yearKey] ??= {};
        activeUsers[yearKey][monthKey] ??= 0;

        if (billedEveryXDays === 365) {
          for (let i = 0; i < 12; i++) {
            const futureMonthKey = ((currentDate.getMonth() + 1 + i) % 12) + 1;
            const futureYearKey =
              currentDate.getMonth() + 1 + i >= 12
                ? currentDate.getFullYear() + 1
                : currentDate.getFullYear();

            activeUsers[futureYearKey] ??= {};
            activeUsers[futureYearKey][futureMonthKey.toString()] ??= 0;
            activeUsers[futureYearKey][futureMonthKey.toString()] += 1;
          }
        } else {
          activeUsers[yearKey][monthKey] += 1;
        }

        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    });

    return convertAndFillMissingMonths(activeUsers);
  }
}
