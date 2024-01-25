interface ConvertData {
  [year: string]: {
    [month: string]: number;
  };
}

/**
 * Converte e preenche os meses faltantes nos dados de entrada.
 *
 * @param inputData - Os dados de entrada a serem convertidos e preenchidos.
 * @returns Os dados convertidos com os meses faltantes preenchidos.
 */
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

/**
 * Retorna o nome do mês correspondente ao número do mês fornecido.
 *
 * @param month - O número do mês (1-12).
 * @returns O nome do mês.
 */
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
