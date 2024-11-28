import React, { useEffect, useState } from "react";

type DataItem = {
  percentage: number;
  label: string;
};

const Professional: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://trello.vimlc.uz/professional");
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        const result = await response.json();

        if (result.percents && Array.isArray(result.percents)) {
          setData(result.percents);
        } else {
          throw new Error("API noto'g'ri formatda ma'lumot qaytardi.");
        }
      } catch (error: any) {
        setError(error.message);
        
      } finally {
        setLoading(loading);
      }
    };

    fetchData();
  }, []);
  console.log(error);

  const leftData = data.slice(0, Math.ceil(data.length / 2));
  const rightData = data.slice(Math.ceil(data.length / 2));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
     
     <div className="flex items-center justify-start mr-[800px] mb-4">
        <div className="w-3 h-11 bg-[#0956AF] mr-3"></div>
         <h1 className="text-2xl font-bold mb-6 "> Shaxsiy va Kasbiy Xususiyatlar</h1>
      </div>
      <div className="w-full max-w-6xl  rounded-lg shadow-md p-8 grid grid-cols-2 gap-6">
        <div>
          {leftData.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-gray-700">{item.label}</span>
                <span className="text-gray-700 font-bold">{item.percentage}%</span>
              </div>
              <div className="relative w-full bg-gray-200 rounded-full h-4">
                <div
                  className="absolute top-0 left-0 h-4 rounded-full bg-blue-500"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div>
          {rightData.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-gray-700">{item.label}</span>
                <span className="text-gray-700 font-bold">{item.percentage}%</span>
              </div>
              <div className="relative w-full bg-gray-200 rounded-full h-4">
                <div
                  className="absolute top-0 left-0 h-4 rounded-full bg-blue-500"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Professional;
