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
