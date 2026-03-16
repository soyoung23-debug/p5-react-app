export const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-100 pt-12 pb-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        
       
        <div className="flex flex-col gap-2">
          <p className="font-black text-slate-900 text-lg uppercase tracking-tighter italic">
            Breathe! Project
          </p>
          <p className="text-slate-500 text-xs font-medium max-w-50">
            A real-time Air Quality Index monitoring app.
          </p>
          <p className="text-slate-400 text-[10px] mt-2">© 2026 Chareen Guzman</p>
        </div>

        {/* Mandatory Data Attribution Section */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-slate-800 text-[10px] font-black uppercase tracking-widest mb-1">
              Data Origin
            </p>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              All data on this website is fetched from the 
              <a href="https://aqicn.org/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline mx-1 font-bold">
                World Air Quality Index Project API
              </a> 
              with credits to the worldwide Environmental Protection Agencies.
            </p>
          </div>
        </div>

        
        <div className="flex flex-col gap-3">
          <p className="text-slate-800 text-[10px] font-black uppercase tracking-widest mb-1">
            Resources
          </p>
          
          <a href="https://aqicn.org/scale/" target="_blank" rel="noopener noreferrer" 
             className="group flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100 hover:border-emerald-200 transition-all">
            <span className="text-slate-600 text-[11px] font-bold">AQI Scale Reference</span>
            <span className="text-emerald-500 group-hover:translate-x-1 transition-transform">→</span>
          </a>

          <a href="https://www.who.int/teams/environment-climate-change-and-health/air-quality-and-health/health-impacts/types-of-pollutants" 
             target="_blank" rel="noopener noreferrer" 
             className="group flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100 hover:border-emerald-200 transition-all">
            <span className="text-slate-600 text-[11px] font-bold">WHO Health Standards(Pollutants)</span>
            <span className="text-emerald-500 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

      </div>
    </footer>
  );
};