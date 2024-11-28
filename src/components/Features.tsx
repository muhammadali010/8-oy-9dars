import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import qr from "../images/QR-cod.svg"
interface FeatureData {
  percentage: number;
  label: string;
  color: string;
}

const Features: React.FC = () => {
  const [data, setData] = useState<FeatureData[]>([]);

  useEffect(() => {
    fetch("https://trello.vimlc.uz/competence")
      .then((response) => response.json())
      .then((result: FeatureData[]) => {
        setData(result);
      })
      .catch((error) => console.error("API xatosi:", error));
  }, []);

  return (
    <div className="mt-20 bg-white mb-20 px-12 py-12">
      <div className="flex items-center mb-8">
        <div className="bg-blue-800 w-2 h-10 mr-4"></div>
        <h2 className="text-black font-bold text-3xl lg:text-4xl"> Компетенцияларинг намоён бўлиши  </h2>
      </div>
      <div className="flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <Chart
                options={{
                  plotOptions: {
                    radialBar: {
                      track: {
                        background: "#f2f2f2",
                        strokeWidth: "97%",
                      },
                      dataLabels: {
                        name: { show: false },
                        value: {
                          fontSize: "16px",
                          offsetY: 5,
                        },
                         total: { 
                            show: false,
                        },
                      },
                    },
                  },   colors: [item.color],
                }}
                series={[item.percentage]}
                type="radialBar"
                width="150"
              />
              <p className="mt-4 text-center text-sm lg:text-lg font-medium">
                {item.label}
              </p>
            </div>
          ))}
        </div>
        <div className="ml-7">
          <img src={qr} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Features;
