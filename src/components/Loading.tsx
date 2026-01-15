import loaderLight from "../assets/icons/loader-light.svg";
import loaderDark from "../assets/icons/loader-dark.svg";
import { useContext } from "react";
import { AppContext } from "../App";

export default function Loading() {
  let { isDark }: any = useContext(AppContext);

  return (
    <div className="w-full dark:text-white">
      <img
        className="m-auto w-12 animate-spin dark:text-white"
        src={isDark ? loaderDark : loaderLight}
        alt=""
      />
    </div>
  );
}
