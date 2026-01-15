import TimeChangeBox from "./TimeChangeBox";

export default function TimeBoxes({ currentCoin }: any) {
  const timeVars = currentCoin && [
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
  return (
    <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
      {timeVars.map((time: any) => {
        return (
          <TimeChangeBox key={time[0]} num={time[1]}>
            {time[0]}
          </TimeChangeBox>
        );
      })}
    </div>
  );
}
