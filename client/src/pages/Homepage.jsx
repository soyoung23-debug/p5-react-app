import { useNavigate } from "react-router";
import { Footer } from "../components/Footer";

export const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Hero Section */}
      <main className="grow flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-slate-100 text-center">
          
          {/* Logo & Branding */}
          <div className="mb-10">
            <h1 className="text-5xl font-black text-emerald-600 tracking-tight mb-4">
              Breathe!
            </h1>
            <p className="text-slate-500 leading-relaxed text-sm px-2">
              An environmental monitoring application that provides 
              localized air quality insights. View pollutant data, air pollution level, and 
              and health implications in real-time.
            </p>
          </div>

          {/* Action Buttons Group */}
          <div className="space-y-3">
            <button 
              onClick={() => navigate("/login")}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              LOGIN
            </button>

            <button 
              onClick={() => navigate("/register")}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
            >
              REGISTER
            </button>
          </div>

          {/* Secondary Action */}
          <div className="mt-8 pt-6 border-t border-slate-50">
            <button 
              onClick={() => navigate("/checklocation")}
              className="text-slate-400 font-semibold hover:text-slate-600 transition-colors text-sm underline underline-offset-4"
            >
              Continue without account
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};