import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getStationFeed } from "../api/waqi";
import { PollutantGrid } from "../components/PollutantGrid";
import { getAqiTheme } from "../utils/aqiHelpers";
import { Footer } from "../components/Footer";

// WHO Pollutant Definitions and Health Impacts
const pollutantDefinitions = [
  {
    code: "PM2.5",
    name: "Fine Particulate Matter",
    desc: "Particles with a diameter of 2.5 microns or less. These can penetrate deep into the lungs and enter the bloodstream, potentially causing cardiovascular and respiratory diseases.",
  },
  {
    code: "PM10",
    name: "Coarse Particulate Matter",
    desc: "Particles with a diameter of 10 microns or less. These can be inhaled into the lungs and are primarily linked to the aggravation of respiratory diseases like asthma.",
  },
  {
    code: "NO2",
    name: "Nitrogen Dioxide",
    desc: "Results from high-temperature fuel combustion (traffic/industry). Chronic exposure can irritate airways and increase susceptibility to respiratory infections.",
  },
  {
    code: "SO2",
    name: "Sulfur Dioxide",
    desc: "It is predominantly derived from the combustion of fossil fuels for domestic heating, industries and power generation. Exposure to SO2 is associated with asthma hospital admissions and emergency room visits.",
  }
];

export const StationDetail = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [stationData, setStationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getStationFeed(uid);
        setStationData(data);
      } catch (err) {
        console.error("Error fetching details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [uid]);

  if (loading) return <div className="p-10 text-center text-emerald-600 font-bold animate-pulse">Fetching real-time data from The World Air Quality Index Project...</div>;
  if (!stationData) return <div className="p-10 text-center">Station data unavailable.</div>;

  const theme = getAqiTheme(stationData.aqi);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <div className="grow p-6 md:p-12">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-8 text-slate-400 hover:text-emerald-600 font-bold flex items-center gap-2 transition-all uppercase text-[10px] tracking-widest outline-none"
        >
          ← Back to Results
        </button>

        <div className={`max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border ${theme.border}`}>
          {/* Header Section */}
          <div className={`p-8 ${theme.bg} border-b ${theme.border}`}>
            <h1 className="text-xl md:text-2xl font-black text-slate-800 uppercase tracking-tight">
              {stationData.city.name}
            </h1>
            <div className="flex items-end gap-6 mt-6">
              <span className="text-8xl font-black text-slate-900 leading-none tracking-tighter">
                {stationData.aqi}
              </span>
              <div className="pb-2">
                <p className={`font-black uppercase tracking-[0.2em] text-sm ${theme.text}`}>
                  {theme.label}
                </p>
                <p className="text-xs text-slate-500 italic mt-1 max-w-xs leading-tight">
                  "{theme.desc}"
                </p>
              </div>
            </div>
          </div>

          {/* Data Section */}
          <div className="p-8">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">
              Available Pollutant Concentrations
            </h2>
            
            <PollutantGrid iaqi={stationData.iaqi} />
            
            {/* WHO Health Impact Section with Clickable Reference */}
            <div className="mt-16 pt-10 border-t border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">
                  What are these pollutants?
                </h3>
                <a 
                  href="https://www.who.int/teams/environment-climate-change-and-health/air-quality-and-health/health-impacts/types-of-pollutants" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 underline underline-offset-4 flex items-center gap-1 transition-colors"
                >
                  WHO Reference Guide ↗
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {pollutantDefinitions.map((p) => (
                  <div key={p.code} className="group">
                    <p className="text-xs font-black text-emerald-600 mb-1">{p.code} • {p.name}</p>
                    <p className="text-[13px] text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  <span className="font-bold">Disclaimer:</span> Health impact descriptions are based on the World Health Organization (WHO) Global Air Quality Guidelines. Consult local health authorities for specific safety protocols in your region.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center text-[10px]">
                <div>
                  <p className="font-black text-slate-400 uppercase mb-1 tracking-widest">Source Agency of Pollutant Concentrations</p>
                  <p className="font-bold text-slate-600 uppercase">
                    {stationData.attributions?.[0]?.name || "Environmental Monitoring Network"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-400 uppercase mb-1 tracking-widest">Last Updated</p>
                  <p className="font-bold text-slate-600">{stationData.time.s}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};