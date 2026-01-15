export default function PageBtns({
  currentList,
  displayPage,
  currentPage,
}: any) {
  function flipPage(page: number) {
    displayPage(currentList.length, currentList, page);
  }

  function createBtns() {
    let arr = [];
    for (let i = 0; i < Math.ceil(currentList.length / 50); i++) {
      arr.push(
        <a
          key={i}
          href="#section-top"
          className={` border border-blue-800 border-opacity-60 ${
            currentPage == i + 1
              ? "cursor-default bg-gray-400"
              : " bg-gray-200 dark:bg-gray-800"
          } rounded-sm p-1
            px-3 
            text-lg font-semibold shadow-sm hover:bg-gray-300 dark:border-gray-200  hover:dark:bg-gray-600`}
          onClick={() => flipPage(i + 1)}
        >
          {i + 1}
        </a>
      );
    }
    return arr;
  }
  let pageBtnElems = createBtns();

  return (
    <div className="m-auto mt-3 flex w-fit ">{pageBtnElems}</div>
  );
}
