import React from 'react';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
Chart.register(CategoryScale);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Biểu đồ thể hiện số lượng sản phẩm đã bán',
    },
  },
  scales: {
    x: {
      display: false,
    },
  },
};

const BarChart = ({ data }: any) => {
  const labels = [];
  const values = [];

  for (const dt of data) {
    labels.push(dt.name);
    values.push(dt.amount);
  }

  return (
    <Bar
      options={options}
      data={{
        labels: labels,
        datasets: [
          {
            label: 'Số lượng',
            data: values,
            // data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            // backgroundColor: [
            //   "rgba(255, 99, 132, 0.2)",
            //   "rgba(255, 159, 64, 0.2)",
            //   "rgba(255, 205, 86, 0.2)",
            //   "rgba(75, 192, 192, 0.2)",
            //   "rgba(54, 162, 235, 0.2)",
            //   "rgba(153, 102, 255, 0.2)",
            //   "rgba(201, 203, 207, 0.2)",
            // ],
            borderColor: 'rgb(153, 102, 255)',
            // borderColor: [
            //   "rgb(255, 99, 132)",
            //   "rgb(255, 159, 64)",
            //   "rgb(255, 205, 86)",
            //   "rgb(75, 192, 192)",
            //   "rgb(54, 162, 235)",
            //   "rgb(153, 102, 255)",
            //   "rgb(201, 203, 207)",
            // ],
            borderWidth: 1,
          },
        ],
      }}
    />
  );
};
export default BarChart;
