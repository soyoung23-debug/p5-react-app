import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Footer } from "../components/Footer";

export const SavedCities = () => {
  const [stations, setStations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list we just saved to the database
    fetch("http://localhost:4559/api/stations/my-stations", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setStations(data))
      .catch((err) => console.error("Error fetching stations:", err));
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-10">

      <div className="flex justify-between items-center mb-10 max-w-4xl">
        <button
          onClick={() => navigate("/search")}
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all font-semibold text-sm"
        >
          🔍 Search Another Station
        </button>

        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-700 font-bold text-sm transition-colors"
        >
          Logout
        </button>
      </div>

      <h1 className="text-3xl font-black text-slate-800 mb-8">
        My Monitoring Stations
      </h1>

      <div className="grid gap-4 max-w-4xl">
        {stations.length > 0 ? (
          stations.map((s) => (
            <div
              key={s.uid}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg">{s.stationName}</h3>
                <p className="text-slate-500 text-xs">AQI: {s.aqi}</p>
              </div>
              <button
                onClick={() => navigate(`/station/${s.uid}`)}
                className="text-emerald-600 font-bold text-sm"
              >
                View Details →
              </button>
            </div>
          ))
        ) : (
          <p className="text-slate-400">You haven't saved any stations yet.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};
