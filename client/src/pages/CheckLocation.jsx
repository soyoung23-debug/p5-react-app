import { useReducer, useState } from "react";
import { useNavigate } from "react-router";
import { getAirQuality } from "../api/waqi";
import { Footer } from "../components/Footer";
import { getAqiTheme } from "../utils/aqiHelpers";

const initialState = { data: null, loading: false, error: null };

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

export const CheckLocation = () => {
  const [city, setCity] = useState("");
  const [state, dispatch] = useReducer(aqiReducer, initialState);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    dispatch({ type: "FETCH_START" });
    try {
      const result = await getAirQuality(city);
      dispatch({ type: "FETCH_SUCCESS", payload: result });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="grow p-4 md:p-10 max-w-6xl mx-auto w-full">
        {/* Simple Guest Navigation */}
        <div className="flex justify-end items-center mb-10">
          <button
            onClick={() => navigate("/register")}
            className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-all font-black text-[10px] tracking-widest shadow-md uppercase"
          >
            Register here to save your locations
          </button>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <h2 className="text-2xl md:text-4xl font-black text-slate-800 mb-6 text-center tracking-tight leading-tight">
            Check the real-time air quality index (AQI) in your city.
          </h2>
          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              type="text"
              placeholder="Type a city or country..."
              className="flex-1 px-5 py-4 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm bg-white"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              type="submit"
              className="bg-emerald-600 text-white px-8 py-4 rounded-2xl hover:bg-emerald-700 font-black uppercase text-[10px] tracking-widest"
            >
              Search
            </button>
          </form>
        </div>

        {/* Results */}
        {state.loading && (
          <p className="text-center text-emerald-600 animate-pulse font-bold text-xs uppercase tracking-widest">
            Fetching data...
          </p>
        )}

        {state.data && Array.isArray(state.data) && (
          <div className="flex flex-col gap-6">
            {state.data.map((station) => {
              const isInactive = station.aqi === "-";
              const theme = getAqiTheme(station.aqi);

              return (
                <div
                  key={station.uid}
                  className={`aqi-card ${theme.border} ${theme.bg}`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="aqi-stat-panel flex flex-col items-center py-6">
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-4 text-center">
                        {station.station.name}
                      </h3>

                      <div className="flex flex-col items-center mb-4">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                          AQI Score
                        </span>
                        <span className="text-3xl md:text-4xl font-black text-slate-900 leading-none">
                          {isInactive ? "No recent data." : station.aqi}
                        </span>
                      </div>

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

                          {station.time.s || station.time.stime}
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
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
