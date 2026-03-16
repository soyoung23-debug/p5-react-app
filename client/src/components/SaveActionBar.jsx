export const SaveActionBar = ({ cityName, onSave }) => (
  <div className="save-action-bar">
    <div className="text-center md:text-left">
      <h4 className="font-black text-white text-xl uppercase tracking-tighter">Track this city?</h4>
      <p className="text-emerald-100 text-sm font-medium">Add {cityName} to your dashboard profile.</p>
    </div>
    <button onClick={onSave} className="btn-save-outline w-full md:w-auto">
      Save Location
    </button>
  </div>
);