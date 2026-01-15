import { useParams } from "react-router-dom";
import { formatNum } from "../util/nums";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import fetchData from "../FetchData";
import TimeBoxes from "../components/TimeBoxes";
import { ExpandedCoin } from "../types";

export default function SingleCoinPage() {
  let pathId = useParams().id;

  const {
    data: currentCoin,
    isLoading,
    isError,
    error,
  } = useQuery<ExpandedCoin>({
    queryKey: [pathId],
    staleTime: 1000 * 60 * 20,
    queryFn: async () => {
      console.log(pathId);
      return fetchData(
        `https://api.coingecko.com/api/v3/coins/${pathId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      );
    },
  });
  if (isLoading) return <Loading />;
  if (isError) {
    return <p className="text-2xl ">{error.message}</p>;
  }
  if (!currentCoin) return;
  return (
    <div className="rounded-md bg-gray-100 p-6 dark:bg-slate-600">
      <section className="justify-around space-y-6 text-center ">
        <div className="items-center justify-around  space-y-6 md:flex md:space-y-0">
          <div className=" flex items-center justify-center gap-2 ">
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
        <TimeBoxes currentCoin={currentCoin} />
        <hr />
      </section>
      <section className="mt-6 space-y-3 ">
        <h2 className="text-center text-xl font-medium ">
          Description
        </h2>

        <p className=" m-auto whitespace-pre-line p-2 pl-2  text-base leading-loose tracking-wider lg:text-lg">
          {currentCoin.description.en}
        </p>
      </section>
    </div>
  );
}
