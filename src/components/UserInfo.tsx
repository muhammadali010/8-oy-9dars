import { FC, useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";

interface PersonInfo {
  firstName: string;
  lastName: string;
  birthday: string;
  address: string;
  height: number;
  weight: number;
  index: number;
  position: string;
  candidate: string;
}

const UserInfo: FC = () => {
  const [personInfo, setPersonInfo] = useState<PersonInfo | null>(null);

  useEffect(() => {
    fetch("https://trello.vimlc.uz/get-personal-info")
      .then((response) => response.json())
      .then((data: PersonInfo) => {
        setPersonInfo(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className="flex justify-around items-start mt-20 bg-white">
        <div className="flex gap-8">
          <div>
            <img
              className="w-[216px] h-[288px]"
              src="http://trello.vimlc.uz/images/user.png"
              alt=""
            />
          </div>
          <div>
            <h3 className="font-semibold text-5xl">{personInfo?.firstName}</h3>
            <h3 className="font-normal text-5xl mb-8">{personInfo?.lastName}</h3>
            <p className="text-lg mb-1">Тугилган сана: {personInfo?.birthday}</p>
            <p className="text-lg mb-6">Тугилган жой: {personInfo?.address}</p>
            <div className="flex items-center">
              <div className="mb-4">
                <div className="flex gap-3 mb-1">
                  <p className="text-base">Буйи:</p>
                  <p className="text-base">Вазни:</p>
                  <p className="text-base">Индекс:</p>
                </div>
                <div className="flex gap-3">
                  <p className="font-bold text-lg">{personInfo?.height}</p>
                  <p className="font-bold text-lg">{personInfo?.weight}</p>
                  <p className="font-bold text-lg">{personInfo?.index}</p>
                </div>
              </div>
              <div className="w-[200px]">
                <ReactSpeedometer
                  width={150}
                  height={80}
                  needleHeightRatio={0.7}
                  minValue={0}
                  maxValue={70}
                  value={personInfo?.index || 0}
                  customSegmentStops={[0, 10, 20, 30, 40, 50, 60, 70]}
                  segmentColors={[
                    "#3399CC",
                    "#99CC33",
                    "#669900",
                    "#FFCC00",
                    "#FF9900",
                    "#FF6600",
                    "#B01616",
                  ]}
                  ringWidth={30}
                  needleColor="#000000"
                  textColor="transparent"
                />
                <h3 className="text-center text-xl font-normal text-[#0956AF] mr-7">
                  НОРМА
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-gray-500 mb-2 text-base">Лавозими:</h4>
          <p className="w-96 font-normal mb-20 text-xl text-gray-800">
            {personInfo?.position}
          </p>
          <h4 className="text-gray-500 mb-2 text-base">Номзод:</h4>
          <p className="w-96 font-normal text-xl text-gray-800">
            {personInfo?.candidate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
