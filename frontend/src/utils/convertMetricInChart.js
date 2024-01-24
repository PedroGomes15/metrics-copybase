const configMetrics = [
  {
    key: "monthlyMRR",
    label: "Monthly MRR",
    backgroundColor: "#92BFB1",
  },
  {
    key: "monthlyCancellation",
    label: "Monthly Cancelations",
    backgroundColor: "#A61C3C",
  },
  {
    key: "monthlyActiveUsers",
    label: "Monthly Active Users",
    backgroundColor: "#5EEB5B",
  },
  {
    key: "monthlyChurnRate",
    label: "Monthly Churn Rate",
    backgroundColor: "#F4AC45",
    formatType: "percent",
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
      formatType: metric.formatType || "",
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
