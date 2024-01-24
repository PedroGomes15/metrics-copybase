import { Injectable } from '@nestjs/common';
import { Subscription } from '../file/file.service';
import { convertAndFillMissingMonths } from '../file/formatData.utils';

@Injectable()
export class MonthlyActiveUsersService {
  calculateActiveUsers(
    data: Subscription[],
  ): Record<string, Record<string, number>> {
    // Inicializar um objeto para armazenar os resultados do número de usuários ativos
    const activeUsers: Record<string, Record<string, number>> = {};

    // Iterar sobre os dados fornecidos para calcular os usuários ativos em cada mês
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

        // Se a assinatura for anual, somar como um usuário ativo nos próximos 12 meses
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
          // Caso contrário, somar como um usuário ativo no mês atual
          activeUsers[yearKey][monthKey] += 1;
        }

        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    });

    return convertAndFillMissingMonths(activeUsers);
  }
}
