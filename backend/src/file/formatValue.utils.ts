/**
 * Formata os valores de um objeto para ter uma precisão fixa de 2 casas decimais.
 *
 * @param obj - O objeto a ser formatado.
 * @returns O objeto formatado com valores arredondados para 2 casas decimais.
 */
export const formatValuesToFixed2 = (obj: any): any => {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => formatValuesToFixed2(item));
  }

  const formattedObj: Record<string, any> = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      formattedObj[key] =
        typeof value === 'number'
          ? parseFloat(value.toFixed(2))
          : formatValuesToFixed2(value);
    }
  }

  return formattedObj;
};
