import { useEffect, useState } from "react";
import CoinTableRow from "../components/CoinTableRow";
import PageBtns from "../components/PageBtns";
import PageTitle from "../components/PageTitle";
import SearchBar from "../components/SearchBar";
import CoinsTable from "../components/CoinsTable";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import fetchData from "../FetchData";

export default function CoinsPage() {
  const [displayedCoins, setDisplayedCoins] = useState([{}]);
  const [currentCoins, setCurrentCoins] = useState([{}]);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: coinsList,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["coins"],
    queryFn: () =>
      fetchData(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d&locale=en"
      ),
    staleTime: 1000 * 60 * 20,
  });
  function displayPage(num = 50, arr = coinsList, page = 1) {
    setCurrentPage(page);
    arr && setCurrentCoins(arr);
    let start = 50 * (page - 1);
    let end = (num >= 50 ? 50 : num) * page;
    let newDisplayList = [];
    for (let i = start; i < end; i++) {
      arr !== undefined && newDisplayList.push(arr[i]);
    }
    setDisplayedCoins(newDisplayList);
  }
  //initialaize first 50 coins
  useEffect(() => {
    displayPage();
  }, [coinsList]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p className="text-2xl ">{error.message}</p>;
  }

  let coinRowElems = displayedCoins.map((coin: any) => {
    if (coin == undefined || Object.keys(coin).length < 1) return;
    return <CoinTableRow coin={coin} key={coin.id} />;
  });

  return (
    <>
      <section className="space-y-8" id="section-top">
        <PageTitle>
          {" "}
          Cryptocurrency Prices By Current Market Cap
        </PageTitle>

        <SearchBar displayPage={displayPage} itemsList={coinsList} />
      </section>

      <CoinsTable children={coinRowElems} />

      <PageBtns
        currentList={currentCoins}
        displayPage={displayPage}
        currentPage={currentPage}
      />
    </>
  );
}
