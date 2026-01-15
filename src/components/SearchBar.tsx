import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import searchIcon from "../assets/icons/search.svg";
import { Coin } from "../types";
type SearchBarProps = {
  displayPage: (num?: number, arr?: Coin[]) => void;
  itemsList: Coin[];
};
export default function SearchBar({
  displayPage,
  itemsList,
}: SearchBarProps) {
  const [searchText, setSearchText] = useState("");
  const appContext = useContext(AppContext);
  if (appContext == undefined) return <h1>Something Went Wrong</h1>;

  let originArr = itemsList;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
    let search = e.target.value.toLowerCase();
    let filteredArr = originArr.filter((coin: any) => {
      let name = coin.name.substring(0, search.length).toLowerCase();
      return search === name;
    });
    filteredArr && displayPage(filteredArr?.length, filteredArr);
  }
  return (
    <label className=" relative ">
      <div className="absolute bottom-0.5 left-2 flex items-center">
        <img className=" w-5   opacity-40" src={searchIcon} alt="" />
      </div>
      <input
        type="text"
        placeholder="Search"
        className={`w-full rounded-md bg-slate-100 bg-left p-2 pl-3 indent-6  dark:bg-slate-500 dark:placeholder-gray-50 md:text-lg
       
    `}
        onChange={e => handleChange(e)}
        value={searchText}
      />
    </label>
  );
}
