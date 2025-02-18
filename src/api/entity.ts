import { TEntityPromise } from "../models/types";

export const fetchEntityData = async <T>(
  urls: string[]
): Promise<TEntityPromise<T>> => {
  let errors: string[] = [];

  try {
    const results = await Promise.allSettled(
      urls.map(async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${url}`);
        }
        return response.json();
      })
    );

    // Process results
    const responses: T[] = results
      .map((result, index) => {
        if (result.status === "fulfilled") {
          return result.value;
        } else {
          errors.push(index.toString());
        }

        return null;
      })
      .filter((res) => res !== null);

    return { responses, errors: errors.length > 0 ? errors : null };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
};
