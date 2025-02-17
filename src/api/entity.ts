export const fetchEntityData = async <T>(urls: string[]): Promise<T[]> => {
  try {
    const responses = await Promise.all(
      urls.map((url) => fetch(url).then((res) => res.json()))
    );

    return responses;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
};
