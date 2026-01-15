export default async function fetchData(url: string) {
  console.log("fetching", url);
  try {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
    });
    if (response.status == 200 || response.status == 201) {
      return response.json();
    } else {
      throw new Error(
        "Error. Refresh the page or try at a different time."
      );
    }
  } catch (error) {
    throw new Error(
      "Error. Refresh the page or try at a different time."
    );
  }
}
