import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface RankCardProps {
  title: string;
  data: number[];
}

const Position: React.FC<RankCardProps> = ({ title, data }) => {
  const positionData = {
    labels: ["탑", "정글", "미드", "원딜", "서폿"],
    datasets: [
      {
        data: data,
        backgroundColor: ["#ff8a00", "#ff3c00", "#00ccff", "#00ff00", "#ff00ff"],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateRotate: true, // 회전 애니메이션
      animateScale: true, // 스케일 애니메이션
      duration: 1500, // 애니메이션 시간 설정
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 14,
            family: "font-blackHanSans",
          },
          padding: 10,
          boxWidth: 13,
          color: "#fff",
        },
      },
      datalabels: {
        display: true,
        color: "#fff",
        font: {
          weight: "bold",
          size: 14,
        },
        formatter: (value: number) => `${value}%`,
      },
    },
  };

  return (
    <div className="flex flex-col items-center bg-gray-800 text-white p-6 rounded-lg font-blackHanSans border-4 border-[rgb(200, 155, 60)]">
      <div className="text-center text-lg font-semibold text-white mb-4 font-blackHanSans">
        {title}
      </div>

      <div className="relative w-full h-full" style={{ maxHeight: "250px" }}>
        {/* 도넛 차트 */}
        <Doughnut data={positionData} options={options} />
      </div>
    </div>
  );
};

export default Position;
