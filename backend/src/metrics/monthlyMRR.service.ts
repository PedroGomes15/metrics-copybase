import { Injectable } from '@nestjs/common';
import { Subscription } from '../file/file.service';
import { formatValuesToFixed2 } from '../file/formatValue.utils';
import { convertAndFillMissingMonths } from '../file/formatData.utils';

@Injectable()
export class MonthlyMRR {
  processMetric(data: Subscription[]): Record<string, Record<string, number>> {
    const monthlyMetrics: Record<string, Record<string, number>> = {};

    const distributeMonthlyValue = (
      yearKey: number,
      monthKey: number,
      monthlyValue: number,
      charges: number,
    ) => {
      monthlyMetrics[yearKey] = monthlyMetrics[yearKey] || {};
      monthlyMetrics[yearKey][monthKey] =
        monthlyMetrics[yearKey][monthKey] || 0;
      monthlyMetrics[yearKey][monthKey] += monthlyValue / charges;
    };

    data.forEach((subscription) => {
      const { billedEveryXDays, startDate, charges } = subscription;

      if (billedEveryXDays === 365) {
        // Annual subscription
        const monthsInYear = 12;
        const annualValue = parseFloat(subscription.amount.toString());

        for (let i = 0; i < monthsInYear; i++) {
          const monthKey = ((startDate.getMonth() + i) % monthsInYear) + 1;
          const yearKey =
            startDate.getFullYear() +
            Math.floor((startDate.getMonth() + i) / monthsInYear);

          distributeMonthlyValue(
            yearKey,
            monthKey,
            annualValue / monthsInYear,
            charges,
          );
        }
      } else {
        // Monthly subscription
        const monthlyValue = parseFloat(subscription.amount.toString());
        const monthKey = startDate.getMonth() + 1;
        const yearKey = startDate.getFullYear();

        distributeMonthlyValue(yearKey, monthKey, monthlyValue, charges);

        // Distribute to subsequent months
        for (let i = 1; i < charges; i++) {
          const nextMonthKey = (monthKey + i) % 12 || 12;
          const nextYearKey = yearKey + Math.floor((monthKey + i - 1) / 12);

          distributeMonthlyValue(
            nextYearKey,
            nextMonthKey,
            monthlyValue,
            charges,
          );
        }
      }
    });

    console.log('montlhy ', monthlyMetrics);

    return convertAndFillMissingMonths(formatValuesToFixed2(monthlyMetrics));
  }
}
