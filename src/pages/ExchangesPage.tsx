import { useContext, useEffect, useState } from "react";
import PageBtns from "../components/PageBtns";
import PageTitle from "../components/PageTitle";
import SearchBar from "../components/SearchBar";
import ExchangeTableRow from "../components/ExchangeTableRow";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import fetchData from "../FetchData";

export default function ExchangesPage() {
  const [displayedExchanges, setDisplayedExchanges]: any = useState([
    {},
  ]);
  const [currentExchanges, setCurrentExchanges]: any = useState([{}]);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: exchangesList,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryFn: () =>
      fetchData(
        "https://api.coingecko.com/api/v3/exchanges?per_page=250"
      ),
    queryKey: ["exchanges"],
    staleTime: 1000 * 60 * 20,
  });
  function displayPage(num = 50, arr = exchangesList, page = 1) {
    setCurrentPage(page);
    arr && setCurrentExchanges(arr);
    let start = 50 * (page - 1);
    let end = num >= 50 ? 50 : num;
    end = end * page;
    let newDisplayList = [];
    for (let i = start; i < end; i++) {
      arr !== undefined && newDisplayList.push(arr[i]);
    }
    setDisplayedExchanges(newDisplayList);
  }
  //initialaize first 50 exchanges
  useEffect(() => {
    displayPage();
  }, [exchangesList]);

  let ExchangeRowElems = displayedExchanges.map((exc: any) => {
    if (exc == undefined || Object.keys(exc).length < 1) return;
    return <ExchangeTableRow exc={exc} key={exc.id} />;
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p className="text-2xl ">{error.message}</p>;
  }

  return (
    <>
      <section className="space-y-8" id="section-top">
        <PageTitle>
          {" "}
          Top Crypto Exchanges Ranked By Trust Score
        </PageTitle>

        <SearchBar
          displayPage={displayPage}
          itemsList={exchangesList}
        />
      </section>

      <div
        className="relative mt-6 w-full overflow-x-auto"
        id="table"
      >
        <table className="w-full text-left text-sm  ">
          <thead className="bg-gray-50 text-xs uppercase  dark:bg-gray-700 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>

              <th scope="col" className="px-6 py-3">
                name
              </th>
              <th scope="col" className="px-6 py-3">
                Trust Score
              </th>
              <th scope="col" className="px-6 py-3">
                Trade Volume (24hr)
              </th>

              <th scope="col" className=" px-6 py-3 ">
                Since
              </th>
            </tr>
          </thead>
          <tbody>{ExchangeRowElems}</tbody>
        </table>
      </div>

      <PageBtns
        currentList={currentExchanges}
        displayPage={displayPage}
        currentPage={currentPage}
      />
    </>
  );
}
