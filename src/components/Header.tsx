import { FC } from "react";
import logo from "../assets/logo.svg";
import number from "../images/number.png";

const Header: FC = () => {
    return (
        <div className="flex justify-around items-center bg-white ">
            <div className="flex justify-between items-center gap-[100px]">
                <div>
                    <img className="ml-20" src={logo} alt="" />
                    <h3 className="w-[214px] font-semibold text-sm h-[51px] text-center ml-5">Давлат хизматининг ягона электрон ахборот-таҳлил тизими</h3>
                </div>
                <div>
                    <h2 className="text-3xl ml-20 font-semibold  h-[51px] text-center mr-5">Республика Ассессмент маркази <br /> онлайн платформаси</h2>
                </div>
                <div>
                    <img className="ml-20" src={number} alt="" />
                </div>
            </div>
            <div>
            </div>
        </div>
    );
};

export default Header;
