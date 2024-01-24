import { Injectable } from '@nestjs/common';
import { Subscription } from '../file/file.service';
import { MonthlyMRR } from './monthlyMRR.service';
import { MonthlyCancellation } from './monthlyCancellations.service';

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

    return {
      metrics: {
        monthlyMRR,
        monthlyCancellation,
      },
    };
  }
}
