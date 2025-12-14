import fetch from 'node-fetch';

interface YahooFeature {
  Id: string;
  Name: string;
  Geometry: {
    Coordinates: string; // "longitude,latitude"
  };
  Property: {
    Address: string;
  };
}

export interface SearchResult {
  latitude: number;
  longitude: number;
  message: string;
}

/**
 * Calls the Yahoo! Local Search API and returns the results.
 * @param query The search term.
 * @returns A promise that resolves to an array of search result objects.
 */
export const searchLocal = async (query: string): Promise<SearchResult[]> => {
  // Provided Client ID. Should ideally be in an environment variable.
  const YAHOO_CLIENT_ID = 'dj00aiZpPThhTDNJcHFqTTd4RCZzPWNvbnN1bWVyc2VjcmV0Jng9ZmU-';

  const searchCenter = '35.01244,135.76773'; // Kyoto City Hall
  const radius = '1'; // 1km
  const count = 6;

  const yahooApiUrl = `https://map.yahooapis.jp/search/local/V1/localSearch?appid=${YAHOO_CLIENT_ID}&query=${encodeURIComponent(
    query,
  )}&lat=${searchCenter.split(',')[0]}&lon=${searchCenter.split(',')[1]}&dist=${radius}&results=${count}&output=json`;

  try {
    const response = await fetch(yahooApiUrl);
    if (!response.ok) {
      console.error(`Yahoo API Error: ${response.statusText}`);
      const text = await response.text();
      console.error(`Response Body: ${text}`);
      throw new Error(`Yahoo API request failed with status ${response.status}`);
    }
    const data: any = await response.json();

    if (!data.Feature) {
      return [];
    }

    // Format the Yahoo API response
    const results: SearchResult[] = data.Feature.map((feature: YahooFeature) => {
      const [longitude, latitude] = feature.Geometry.Coordinates.split(',').map(Number);
      return {
        latitude,
        longitude,
        message: feature.Name,
      };
    });

    return results;
  } catch (error) {
    console.error('Failed to fetch or parse from Yahoo API:', error);
    return []; // Return empty array on error
  }
};
