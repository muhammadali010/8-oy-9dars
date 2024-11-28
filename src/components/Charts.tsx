import { FC, useEffect, useState } from "react";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,} from "recharts";
import diagram from "../images/diagram.png";

interface ChartData {
  percentage: number;
  label: string;
  color: string;
}

interface Charts {
  semicharts: ChartData[];
  lineChart: {
    labels: string[];
    data: number[];
  };
  overall: string;
  thanOthers: number;
}

const Chart: FC = () => {
  const [data, setData] = useState<Charts>({
    semicharts: [],
    lineChart: { labels: [], data: [] },
    overall: "0%",
    thanOthers: 0,
  });

  useEffect(() => {
    fetch("https://trello.vimlc.uz/knowlodge")
      .then((response) => response.json())
      .then((result: Charts) => {
        setData(result);
      })
      .catch((error) => console.error("API xatosi:", error));
  }, []);

  const lineChartData = data.lineChart.labels.map((label, index) => ({
    date: label,
    value: data.lineChart.data[index],
  }));

  return (
    <div className="flex items-center gap-5 bg-[#F7F7F7]">
      <div className="p-8 w-[644px] ml-24 relative font-sans">
        <div className="mb-8 flex items-center">
          <div className="w-[13px] h-[43px] bg-[#0956AF]"></div>
          <h2 className="text-[24px] ml-[150px] font-bold text-black">
            Билим тести
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.semicharts.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative">
                <svg
                  className="w-[140px] h-[70px]"
                  viewBox="0 0 36 18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 1 18 A 17 17 0 0 1 35 18"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M 1 18 A 17 17 0 0 1 35 18"
                    fill="none"
                    stroke={item.color}
                    strokeWidth="2.5"
                    strokeDasharray={`${(item.percentage / 100) * 53.38}, 53.38`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[32px] mt-7 font-bold text-black">
                    {item.percentage}%
                  </span>
                </div>
              </div>
              <p className="mt-4 text-center text-[14px] leading-[1.4] text-gray-700">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[60px]">
        <div className="h-[193px] w-[333px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2196F3"
                strokeWidth={2}
                dot={{ r: 4, fill: "#2196F3" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8">
          <div className="text-[48px] font-bold text-blue-600">
            {data.overall}
          </div>
          <div className="mt-4">
            <button className="px-4 py-2 bg-green-500 text-white rounded-md">
              Умумий натижа
            </button>
          </div>
        </div>
      </div>
      <div className="w-[287px] h-[384px] mt-[80px]">
        <img src={diagram} alt="Diagram" className="" />
      </div>
    </div>
  );
};

export default Chart;
