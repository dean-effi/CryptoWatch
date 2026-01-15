import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TimeChangeBox from "../components/TimeChangeBox";
import { formatNum } from "../util/nums";

export default function SingleCoinPage() {
  let pathId = useParams().id;

  let [currentCoin, setCurrentCoin] = useState<any>(null);
  useEffect(() => {
    async function getCoin() {
      let response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${pathId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      );
      let data = await response.json();

      setCurrentCoin(data);
    }

    getCoin();
  }, []);

  function createTimeChangeBoxes() {
    let timeVars = [
      [
        "1h",
        currentCoin.market_data.price_change_percentage_1h_in_currency
          .usd,
      ],
      ["24h", currentCoin.market_data.price_change_percentage_24h],
      ["7d", currentCoin.market_data.price_change_percentage_7d],
      ["14d", currentCoin.market_data.price_change_percentage_14d],
      ["30d", currentCoin.market_data.price_change_percentage_30d],
      ["60d", currentCoin.market_data.price_change_percentage_60d],

      ["200d", currentCoin.market_data.price_change_percentage_200d],
      ["1y", currentCoin.market_data.price_change_percentage_1y],
    ];

    return timeVars.map(time => {
      return (
        <TimeChangeBox key={time[0]} num={time[1]}>
          {time[0]}
        </TimeChangeBox>
      );
    });
  }

  let descHtml = { __html: "placeholder" };
  if (currentCoin !== null) {
    descHtml = { __html: currentCoin.description.en };
  }
  return currentCoin !== null ? (
    <div className="rounded-md bg-gray-100 p-6 dark:bg-slate-600">
      <section className="justify-around space-y-6 text-center ">
        <div className="justify-around space-y-6 md:flex">
          <div className=" flex items-center justify-center gap-2">
            <img className="w-10" src={currentCoin.image.large} />
            <h1 className="text-3xl font-semibold">
              {currentCoin.name}
            </h1>
          </div>

          <div>
            <h2 className="text-lg ">Current Price</h2>
            <span className="text-4xl font-semibold">
              ${formatNum(currentCoin.market_data.current_price.usd)}
            </span>
          </div>
        </div>
        <hr />
        <div className="flex justify-around">
          <div className=" text-left ">
            <h2 className=" lg:text-lg">Total Volume</h2>
            <span className="text-lg font-semibold lg:text-xl">
              ${formatNum(currentCoin.market_data.total_volume.usd)}
            </span>
          </div>
          <div className="text-left">
            <h2 className="lg:text-lg">Total Supply</h2>
            <span className="text-lg font-semibold lg:text-xl">
              ${formatNum(currentCoin.market_data.total_supply)}
            </span>
          </div>
        </div>

        <hr />
        <h2 className=" text-xl font-medium">
          Price Changes In The Last
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {createTimeChangeBoxes()}
        </div>
        <hr />
      </section>
      <section className="mt-6 space-y-6 ">
        <h2 className="text-center text-xl font-medium">
          Description
        </h2>

        <p className=" m-auto  p-2 text-sm lg:text-base">
          <span className="mt-8" dangerouslySetInnerHTML={descHtml} />
        </p>
      </section>
    </div>
  ) : (
    <h1></h1>
  );
}
