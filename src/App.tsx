import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import CoinsPage from "./pages/CoinsPage";
import ExchangesPage from "./pages/ExchangesPage";
import Favorites from "./pages/Favorites";
import SingleCoinPage from "./pages/SingleCoinPage";
import { AppContextType, Coin } from "./types";

export const AppContext = createContext<AppContextType>(null);

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(
    JSON.parse(localStorage.getItem("isDark")!) || false
  );

  const [favsList, setFavsList] = useState<Coin[]>([
    ...(JSON.parse(localStorage.getItem("favs")!) || []),
  ]);

  function toggleFavs(coin: Coin) {
    let newFavs: Coin[] = [];
    if (favsList.find(c => c.id == coin.id)) {
      newFavs = favsList.filter((favCoin: Coin) => {
        return favCoin.id !== coin.id;
      });
    } else {
      newFavs = [...favsList, coin];
    }
    localStorage.setItem("favs", JSON.stringify(newFavs));
    setFavsList(newFavs);
  }
  useEffect(() => {
    let root = document.querySelector("#root")!;
    if (isDark) {
      root.className = "dark";
    } else {
      root.className = "";
    }

    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  return (
    <div
      className="min-h-screen max-w-full bg-gradient-to-b from-white  to-slate-300 text-blue-950 dark:from-slate-900
     dark:to-slate-950   dark:text-gray-200	"
    >
      <AppContext.Provider
        value={{
          isDark: isDark,
          favsList: favsList,
          toggleFavs: toggleFavs,
        }}
      >
        <header className=" sticky top-0 z-10  bg-white shadow-lg dark:bg-slate-950">
          <Nav setIsDark={setIsDark} />
        </header>
        <main className=" z-1 overflow-x-hidden    p-6 lg:m-auto lg:mt-4 lg:w-3/4	">
          <Routes>
            <Route path="/" element={<CoinsPage />} />
            <Route path="/exchanges" element={<ExchangesPage />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/coin/:id" element={<SingleCoinPage />} />
          </Routes>
        </main>
      </AppContext.Provider>
    </div>
  );
}
