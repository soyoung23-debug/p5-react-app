// client/src/utils/aqiHelpers.js
export const getAqiTheme = (aqi) => {
    if (aqi <= 50) {
      return { 
        bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-500', 
        label: 'Good', 
        desc: 'Air quality is satisfactory, and air pollution poses little or no risk.',
        caution: 'None.'
      };
    }
    if (aqi <= 100) {
      return { 
        bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-500', 
        label: 'Moderate', 
        desc: 'Air quality is acceptable; however, there may be a risk for some people who are unusually sensitive to air pollution.',
        caution: 'Sensitive groups should limit prolonged outdoor exertion.'
      };
    }
    if (aqi <= 150) {
      return { 
        bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-500', 
        label: 'Unhealthy for Sensitive Groups', 
        desc: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.',
        caution: 'Everyone else should limit prolonged outdoor exertion.'
      };
    }
    if (aqi <= 200) {
      return { 
        bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-500', 
        label: 'Unhealthy', 
        desc: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.',
        caution: 'Everyone should limit outdoor exertion.'
      };
    }
    if (aqi <= 300) {
      return { 
        bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-500', 
        label: 'Very Unhealthy', 
        desc: 'Health warnings of emergency conditions. The entire population is more likely to be affected.',
        caution: 'Everyone should avoid all outdoor exertion.'
      };
    }

    if (aqi === "-" || isNaN(parseInt(aqi))) {
      return { 
        bg: 'bg-slate-50', 
        text: 'text-slate-400', 
        border: 'border-slate-100', 
        desc: 'This station is currently inactive or not reporting real-time data.',
        caution: 'Check back later or try a different station nearby.'
      };
    }

    return { 
      bg: 'bg-rose-900/10', text: 'text-rose-900', border: 'border-rose-900', 
      label: 'Hazardous', 
      desc: 'Health alert: everyone may experience more serious health effects.',
      caution: 'Everyone should avoid all outdoor exertion.'
    };
};