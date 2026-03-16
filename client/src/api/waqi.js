const TOKEN = import.meta.env.VITE_WAQI_TOKEN;
const SEARCH_URL = "https://api.waqi.info/search";
const FEED_URL = "https://api.waqi.info/feed";

// Use this for the list (Search.jsx)
export const getAirQuality = async (city) => {
  const response = await fetch(`${SEARCH_URL}/?keyword=${city}&token=${TOKEN}`);
  const data = await response.json();
  return data.data; // Returns an Array
};

// ADD THIS: Use this for the detailed page (StationDetail.jsx)
// We use the @ symbol or UID to get the specific feed
export const getStationFeed = async (uid) => {
  const response = await fetch(`${FEED_URL}/@${uid}/?token=${TOKEN}`);
  const data = await response.json();
  
  if (data.status === "ok") {
    return data.data; // Returns a single Object with pollutants
  } else {
    throw new Error("Station details not found");
  }
};