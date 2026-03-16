export const PollutantGrid = ({ iaqi }) => (
  <div className="pollutant-container">
    <div className="pollutant-grid">
      <PollutantBox label="PM 2.5" value={iaqi?.pm25?.v} />
      <PollutantBox label="PM 10" value={iaqi?.pm10?.v} />
      <PollutantBox label="NO2" value={iaqi?.no2?.v} />
      <PollutantBox label="SO2" value={iaqi?.so2?.v} />
    </div>
  </div>
);

const PollutantBox = ({ label, value }) => (
  <div className="pollutant-box">
    <span className="pollutant-label">{label}</span>
    <span className="pollutant-value">{value || '--'}</span>
  </div>
);