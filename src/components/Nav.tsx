import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import { Link, NavLink } from "react-router-dom";

import logoDark from "../assets/logo-white.png";
import logoLight from "../assets/logo-black.png";
import menuIconDark from "../assets/icons/menu-white.svg";
import menuIconLight from "../assets/icons/menu-black.svg";
import themeIconDark from "../assets/icons/sun.svg";
import themeIconLight from "../assets/icons/moon.svg";
import favLight from "../assets/icons/star-black.svg";
import favDark from "../assets/icons/star-white.svg";

type navProps = {
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Nav({ setIsDark }: navProps) {
  const [isOpen, setIsOpen] = useState(false);
  let { isDark } = useContext(AppContext)!;
  return (
    <nav className=" relative  m-auto flex items-center  justify-between  p-4 px-6 font-semibold lg:w-3/4">
      <Link to={"/"}>
        <div className="flex items-center gap-2">
          <img
            alt="site logo"
            src={isDark ? logoDark : logoLight}
            className="h-10 w-8 lg:h-12 lg:w-10"
          />
          <h1 className="comf text-xl font-bold lg:text-2xl">
            CryptoWatch
          </h1>
        </div>
      </Link>

      {/* //dropdown menu */}
      <div onClick={() => setIsOpen(!isOpen)}>
        <img
          src={isDark ? menuIconDark : menuIconLight}
          className="cursor-pointer lg:hidden"
        />
        <ul
          className={`${
            isOpen ? "visible" : "hidden"
          }  absolute bottom-0 left-0 top-full h-fit w-screen space-y-4 border-b-2 border-slate-300 bg-slate-200 px-7 py-4 text-lg transition-all dark:border-slate-700 dark:bg-slate-900`}
        >
          <li>
            <NavLink to={"/"}>Coins</NavLink>
          </li>
          <li>
            <NavLink to={"/exchanges"}>Exchanges</NavLink>
          </li>

          <li className="flex gap-3">
            <Link to={"/favorites"}>
              <img src={isDark ? favDark : favLight} alt="" />
            </Link>
            <img
              className="cursor-pointer"
              onClick={() => setIsDark(!isDark)}
              src={isDark ? themeIconDark : themeIconLight}
              alt=""
            />
          </li>
        </ul>
      </div>

      {/* large menu */}
      <ul className="hidden items-center justify-around gap-7 text-lg lg:flex">
        <li>
          <NavLink to={"/"}>Coins</NavLink>
        </li>
        <li>
          <NavLink to={"/exchanges"}>Exchanges</NavLink>
        </li>

        <li className="flex items-center gap-2">
          <Link to={"/favorites"} className="inline-block p-0 ">
            <img src={isDark ? favDark : favLight} alt="" />
          </Link>
          <button onClick={() => setIsDark(!isDark)}>
            <img
              tabIndex={0}
              className="mode cursor-pointer"
              src={isDark ? themeIconDark : themeIconLight}
              alt="mode change icon"
            />
          </button>
        </li>
      </ul>
    </nav>
  );
}
