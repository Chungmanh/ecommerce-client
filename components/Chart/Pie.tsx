import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Biểu đồ thể hiện số lượng sản phẩm đã bán',
    },
  },
};

const PieChart = ({ data }: any) => {
  const labels = [];
  const values = [];
  const color = [];

  const dynamicColors = () => {
    const r = Math.floor(Math.random() * (235 - 52 + 1) + 52);
    const g = Math.floor(Math.random() * (235 - 52 + 1) + 52);
    // const b = Math.floor(Math.random() * (235 - 52 + 1) + 52);
    const b = Math.floor(Math.random() * 255);
    return 'rgba(' + r + ',' + g + ',' + b + '0.2)';
  };

  for (const dt of data) {
    labels.push(dt.name);
    values.push(dt.amount);
    color.push(dynamicColors());
  }

  return (
    <Pie
      options={options}
      data={{
        labels: labels,
        datasets: [
          {
            label: 'Số lượng',
            data: values,
            backgroundColor: color,
            borderColor: 'rgb(153, 102, 255)',
            borderWidth: 1,
          },
        ],
      }}
    />
  );
};
export default PieChart;
