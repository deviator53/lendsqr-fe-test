import React from "react";
import Logo from "../images/lend-logo.png";

const Header = () => {
  return (
    <>
      <div className="w-full bg-white h-24 px-4 justify-between items-center border-b border-gray-200">
        <div className="p-6">
          <div className="w-[145px] h-[30px]">
            <img src={Logo} alt="logo" className="w-full h-full object-fit" />
          </div>
        </div>
        <div></div>
        <div className="flex justify-end"></div>
      </div>
    </>
  );
};

export default Header;
