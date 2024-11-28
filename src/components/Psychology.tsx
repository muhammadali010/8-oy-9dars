import React, { FC, useEffect, useState } from "react";

const Psychology: FC = () => {
  const [text1, setText1] = useState<string>("");
  const [text2, setText2] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://trello.vimlc.uz/psychologic");
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        const result = await response.json();

        if (result.text1 && result.text2) {
          setText1(result.text1);
          setText2(result.text2);
        } else {
          throw new Error("API noto'g'ri formatda ma'lumot qaytardi.");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-xl">Yuklanmoqda...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-xl">Xatolik: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-20 bg-[#F7F7F7] mb-20 px-20 py-10 border border-gray-300">
      <div className="flex items-center mb-6">
        <div className="bg-blue-800 w-2 h-10 mr-4"></div>
        <h2 className="text-black font-bold text-3xl">Психологик диагностика</h2>
      </div>
      <div className="flex justify-between gap-6">
        <p className="w-[50%] font-normal text-gray-700">{text1}</p>
        <p className="w-[50%] font-normal text-gray-700">{text2}</p>
      </div>
    </div>
  );
};

export default Psychology;
