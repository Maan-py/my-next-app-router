async function getData(url: string) {
  // const res = await fetch("https://fakestoreapi.com/products");
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default getData;
