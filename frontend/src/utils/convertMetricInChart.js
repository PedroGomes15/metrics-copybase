const configMetrics = [
  {
    key: "monthlyMRR",
    label: "Monthly MRR",
    backgroundColor: "#f87979",
  },
  {
    key: "monthlyCancellation",
    label: "Monthly Cancelations",
    backgroundColor: "#382432",
  },
];

export function convertMetricInChart(metrics) {
  const chartData = [];

  configMetrics.forEach((metric, index) => {
    const metrictKey = metric.key;

    chartData.push({
      metric: metrictKey,
      labels: [],
      datasets: [
        {
          label: metric.label,
          backgroundColor: metric.backgroundColor,
          data: [],
        },
      ],
    });

    const allMonths = new Set();
    Object.keys(metrics[metrictKey] || {}).forEach((year) => {
      Object.keys(metrics[metrictKey][year]).forEach((month) => {
        allMonths.add(`${year}-${month}`);
      });
    });

    allMonths.forEach((month) => {
      const [year, monthNum] = month.split("-");
      chartData[index].labels.push(month);
      const value = metrics[metrictKey]?.[year]?.[monthNum] || 0;
      chartData[index].datasets[0].data.push(value);
    });
  });

  console.log("chartData ", chartData);

  return chartData;
}
