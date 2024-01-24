import { Injectable } from '@nestjs/common';
import { Subscription } from '../file/file.service';
import { MonthlyMRR } from './monthlyMRR.service';
import { MonthlyCancellation } from './monthlyCancellations.service';
import { MonthlyActiveUsersService } from './monthlyUsers.service';
import { MonthlyChurnRateService } from './monthlyChurnRate.service';

export interface Metrics {
  monthlyMRR: Record<string, Record<string, number>>;
}

@Injectable()
export class MetricsService {
  processAllMetrics(data: Subscription[]) {
    const monthlyMrrService = new MonthlyMRR();
    const monthlyMRR = monthlyMrrService.processMetric(data);

    const monthlyCancellationService = new MonthlyCancellation();
    const monthlyCancellation =
      monthlyCancellationService.extractCancelledMonths(data);

    const monthlyActiveUsersService = new MonthlyActiveUsersService();
    const monthlyActiveUsers =
      monthlyActiveUsersService.calculateActiveUsers(data);

    const monthlyChurnRateService = new MonthlyChurnRateService();
    const monthlyChurnRate = monthlyChurnRateService.calculateChurnRate(data);

    return {
      metrics: {
        monthlyMRR,
        monthlyCancellation,
        monthlyActiveUsers,
        monthlyChurnRate,
      },
    };
  }
}
