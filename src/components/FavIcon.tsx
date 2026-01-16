import React, { useContext } from "react";
import { AppContext } from "../App";

import favLight from "../assets/icons/star-black.svg";
import favDark from "../assets/icons/star-white.svg";

import favGold from "../assets/icons/star-gold.svg";
import { Coin } from "../types";

export default function FavIcon({ coin }: { coin: Coin }) {
  let { toggleFavs, isDark, favsList } = useContext(AppContext)!;
  let isFav = favsList.some((favCoin: any) => {
    return favCoin.id === coin.id;
  });

  return (
    <div className="cursor-pointer ">
      {isFav ? (
        <button onClick={() => toggleFavs(coin)}>
          <img className=" w-4" src={favGold} alt="" />
        </button>
      ) : (
        <button onClick={() => toggleFavs(coin)}>
          <img
            className=" w-4"
            src={isDark ? favDark : favLight}
            alt=""
          />
        </button>
      )}
    </div>
  );
}
