import { Injectable } from '@nestjs/common';
import { Subscription } from '../file/file.service';
import { MonthlyActiveUsersService } from './monthlyUsers.service';
import { MonthlyCancellation } from './monthlyCancellations.service';

@Injectable()
export class MonthlyChurnRateService {
  calculateChurnRate(
    data: Subscription[],
  ): Record<string, Record<string, number>> {
    const churnRates: Record<string, Record<string, number>> = {};

    const monthlyActiveUsersService = new MonthlyActiveUsersService();
    const activeUsers = monthlyActiveUsersService.calculateActiveUsers(data);

    const monthlyCancellation = new MonthlyCancellation();
    const canceledUsers = monthlyCancellation.extractCancelledMonths(data);

    for (const year in canceledUsers) {
      churnRates[year] = {};

      // Iterar sobre os meses
      for (const month in canceledUsers[year]) {
        const active = activeUsers[year][month];
        const canceled = canceledUsers[year][month];

        // Calcular a taxa de churn
        const churnRate = (canceled / active) * 100 || 0;

        // Adicionar à lista de taxas de churn
        churnRates[year][month] = churnRate;
      }
    }
    return churnRates;
  }
}
