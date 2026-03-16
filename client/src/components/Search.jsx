import { useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getAirQuality } from "../api/waqi";

import { SaveActionBar } from "../components/SaveActionBar";
import { Footer } from "../components/Footer";
import { getAqiTheme } from "../utils/aqiHelpers";


const initialState = {
  data: null,
  loading: false,
  error: null,
};

// This centralizes how the "Search" state changes based on API results
function aqiReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null, data: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export const Search = () => {
  const [city, setCity] = useState("");
  const [state, dispatch] = useReducer(aqiReducer, initialState);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4559/api/users/logout", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    
    const savedResults = sessionStorage.getItem("lastSearch");
    if (savedResults) {
      dispatch({ type: "FETCH_SUCCESS", payload: JSON.parse(savedResults) });
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    dispatch({ type: "FETCH_START" });

    try {
      const result = await getAirQuality(city);
      sessionStorage.setItem("lastSearch", JSON.stringify(result));

      dispatch({ type: "FETCH_SUCCESS", payload: result });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  };

  const handleSaveLocation = async (station) => {
    const cityData = {
      name: station.station.name,
      uid: station.uid,
      aqi: station.aqi,
      geo: station.station.geo,
    };

    try {
      const response = await fetch("http://localhost:4559/api/stations/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cityData),
        credentials: "include",
      });

      if (response.ok) {
        alert(`${cityData.name} saved to your profile!`);
      } else {
        console.error("Failed to save city");
      }
    } catch (err) {
      console.error("Error saving city:", err);
    }
  };

  const theme = state.data ? getAqiTheme(state.data.aqi) : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="grow p-4 md:p-10 max-w-6xl mx-auto w-full">
        {/* Navigation */}
        <div className="flex justify-end gap-4 mb-10">
          <button
            onClick={() => navigate("/saved-cities")}
            className="text-slate-500 hover:text-emerald-600 font-semibold text-sm transition-colors"
          >
            Saved Places
          </button>
          <button
            onClick={handleLogout}
            className="bg-white text-red-500 border border-red-100 px-4 py-2 rounded-xl hover:bg-red-50 transition-colors font-bold text-xs shadow-sm"
          >
            Log Out
          </button>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <h2 className="text-2xl md:text-4xl font-black text-slate-800 mb-6 text-center tracking-tight leading-tight">
            Check the real-time air quality index (AQI) in your city.
          </h2>
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="text"
              placeholder="Type a city or country..."
              className="flex-1 px-5 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm bg-white"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              type="submit"
              className="bg-emerald-600 text-white px-8 py-4 rounded-2xl hover:bg-emerald-700 font-black transition-all shadow-md uppercase text-[10px] tracking-widest"
            >
              Search
            </button>
          </form>
        </div>

        {/* Dynamic Status Display */}
        {state.loading && (
          <p className="text-center text-emerald-600 animate-pulse font-medium">
            Fetching real-time data from The World Air Quality Index Project...
          </p>
        )}
        {state.error && (
          <p className="text-center text-red-500 font-bold bg-red-50 p-4 rounded-xl inline-block w-full">
            ⚠️ {state.error}
          </p>
        )}

        {/* Dashboard Result */}

        {/* Map through the array of stations found */}
        {state.data && Array.isArray(state.data) && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {state.data.length > 0 ? (
              state.data.map((station) => {
                const isInactive = station.aqi === "-";
                const theme = getAqiTheme(station.aqi);

                return (
                  <div
                    key={station.uid}
                    className={`aqi-card ${theme.border} ${theme.bg}`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      {/* Left Side: Name and Main Score */}
                      <div className="aqi-stat-panel flex flex-col items-center py-6">
                        {/* Station Name */}
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-4 text-center">
                          {station.station.name}
                        </h3>

                        {/* AQI Value with Label */}
                        <div className="flex flex-col items-center mb-4">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                            AQI Score
                          </span>
                          <span className="text-3xl md:text-4xl font-black text-slate-900 leading-none">
                            {isInactive ? "No recent data." : station.aqi}
                          </span>
                        </div>

                        {/* Pollution Level with Label */}
                        <div className="flex flex-col items-center">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                            Pollution Level
                          </span>
                          <p
                            className={`text-xs font-black uppercase tracking-widest ${theme.text}`}
                          >
                            {theme.label}
                          </p>
                        </div>
                      </div>

                      {/* Right Side: Description */}
                      <div className="aqi-desc-panel">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                          Health Implications
                        </h4>
                        <p className="text-slate-700 italic mb-4 leading-relaxed text-md">
                          "{theme.desc}"
                        </p>
                        <div className="pt-4 border-t border-slate-200/50">
                          <p className="text-[9px] font-black text-slate-400 uppercase mb-1">
                            Last Updated
                          </p>
                          <p className="text-slate-500 font-medium text-xs">
                            {station.time.stime}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/station/${station.uid}`)}
                      className="mt-4 w-full py-3 bg-white/50 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-50 hover:border-emerald-200 transition-all"
                    >
                      View priority pollutants values →
                    </button>

                    {/* Simple Action Bar */}
                    <SaveActionBar
                      cityName={station.station.name}
                      onSave={() => handleSaveLocation(station)}
                    />
                  </div>
                );
              })
            ) : (
              <div className="text-center p-12 bg-white rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">
                  No results found for your search.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
