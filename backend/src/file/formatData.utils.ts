interface ConvertData {
  [year: string]: {
    [month: string]: number;
  };
}

export function convertAndFillMissingMonths(
  inputData: ConvertData,
): ConvertData {
  const convertedData: ConvertData = {};

  for (const year in inputData) {
    if (inputData.hasOwnProperty(year)) {
      convertedData[year] = {};

      for (let month = 1; month <= 12; month++) {
        const monthName = getMonthName(month);
        const originalValue = inputData[year][month] || 0;

        convertedData[year][monthName] = originalValue;
      }
    }
  }

  return convertedData;
}

function getMonthName(month: number): string {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return monthNames[month - 1];
}
