export const getData = async () => {
  const res = await fetch(
    "https://www.waze.com/row-partnerhub-api/feeds-tvt/?id=1747914316263",
    {
      next: { revalidate: 120 },
    }
  );
  return res.json();
};
